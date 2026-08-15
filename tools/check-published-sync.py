#!/usr/bin/env python3
"""Compare the schema files in this repo against the copies published on fedramp.gov.

The site build picks up whatever is on main, so a mismatch usually means the site
has not rebuilt since the last merge -- or that something was published from a
source other than this repo.

fedramp.gov serves the schemas minified, so this compares parsed JSON rather than
bytes; formatting differences are not drift.

Usage:
    python3 check-published-sync.py [--full] [--quiet] [--dir DIR] [--base-url URL]

Exit codes:
    0  every schema matches what is published
    1  at least one schema is out of sync or not published
    2  at least one schema could not be fetched (network/HTTP error)
"""

from __future__ import annotations

import argparse
import difflib
import json
import ssl
import sys
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path

DEFAULT_BASE_URL = "https://www.fedramp.gov/schemas/"
DEFAULT_TIMEOUT = 30
USER_AGENT = "fedramp-schemas-sync-check"
DIFF_LINE_LIMIT = 40

SYNCED, DRIFT, MISSING, ERROR = "synced", "drift", "missing", "error"

GREEN, RED, YELLOW, DIM, BOLD, RESET = (
    "\033[32m",
    "\033[31m",
    "\033[33m",
    "\033[2m",
    "\033[1m",
    "\033[0m",
)


@dataclass
class Result:
    name: str
    status: str
    local_version: str | None = None
    published_version: str | None = None
    detail: str = ""
    diff: list[str] | None = None


def canonical(obj) -> list[str]:
    """Stable pretty-printed form, so diffs show content rather than key order."""
    return json.dumps(obj, indent=2, sort_keys=True, ensure_ascii=False).splitlines()


@lru_cache(maxsize=1)
def ssl_context() -> ssl.SSLContext:
    """Framework Python builds on macOS ship without a usable CA bundle, so fall
    back to certifi's when it is installed."""
    context = ssl.create_default_context()
    if context.cert_store_stats()["x509_ca"] == 0:
        try:
            import certifi
        except ImportError:
            return context
        context.load_verify_locations(cafile=certifi.where())
    return context


def fetch(url: str, timeout: int):
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=timeout, context=ssl_context()) as response:
        return json.loads(response.read().decode("utf-8"))


def check(path: Path, base_url: str, timeout: int) -> Result:
    name = path.name
    try:
        local = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        return Result(name, ERROR, detail=f"could not read local file: {exc}")

    local_version = local.get("$schemaVersion")

    try:
        published = fetch(base_url + name, timeout)
    except urllib.error.HTTPError as exc:
        if exc.code == 404:
            return Result(
                name, MISSING, local_version, detail="not published (HTTP 404)"
            )
        return Result(name, ERROR, local_version, detail=f"HTTP {exc.code}")
    except urllib.error.URLError as exc:
        hint = ""
        if isinstance(exc.reason, ssl.SSLCertVerificationError):
            hint = " (no CA bundle -- try `pip install certifi`)"
        return Result(
            name, ERROR, local_version, detail=f"fetch failed: {exc.reason}{hint}"
        )
    except json.JSONDecodeError as exc:
        return Result(
            name, ERROR, local_version, detail=f"published copy is not valid JSON: {exc}"
        )
    except TimeoutError:
        return Result(name, ERROR, local_version, detail="fetch timed out")

    published_version = published.get("$schemaVersion")

    if local == published:
        return Result(name, SYNCED, local_version, published_version)

    diff = list(
        difflib.unified_diff(
            canonical(published),
            canonical(local),
            fromfile=f"published/{name}",
            tofile=f"local/{name}",
            lineterm="",
        )
    )
    return Result(name, DRIFT, local_version, published_version, diff=diff)


def version_note(result: Result) -> str:
    local, published = result.local_version, result.published_version
    if local == published:
        return f"both at {local}" if local else ""
    return f"local {local or '?'} vs published {published or '?'}"


def render(results: list[Result], show_full_diff: bool, quiet: bool, color: bool) -> None:
    def paint(text: str, code: str) -> str:
        return f"{code}{text}{RESET}" if color else text

    marks = {
        SYNCED: paint("OK   ", GREEN),
        DRIFT: paint("DRIFT", RED),
        MISSING: paint("GONE ", RED),
        ERROR: paint("ERROR", YELLOW),
    }

    for result in results:
        if quiet and result.status == SYNCED:
            continue
        note = result.detail or version_note(result)
        suffix = f"  {paint(note, DIM) if color else note}" if note else ""
        print(f"  {marks[result.status]}  {result.name}{suffix}")

        if result.diff:
            lines = result.diff
            truncated = not show_full_diff and len(lines) > DIFF_LINE_LIMIT
            for line in lines[:DIFF_LINE_LIMIT] if truncated else lines:
                if color and line.startswith("+") and not line.startswith("+++"):
                    line = paint(line, GREEN)
                elif color and line.startswith("-") and not line.startswith("---"):
                    line = paint(line, RED)
                print(f"         {line}")
            if truncated:
                remaining = len(lines) - DIFF_LINE_LIMIT
                print(f"         ... {remaining} more diff lines (--full to see all)")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Check repo schemas against the copies published on fedramp.gov."
    )
    parser.add_argument(
        "--dir",
        type=Path,
        default=Path(__file__).resolve().parent.parent,
        help="directory holding the schema files (default: repo root)",
    )
    parser.add_argument(
        "--base-url",
        default=DEFAULT_BASE_URL,
        help=f"base URL for published schemas (default: {DEFAULT_BASE_URL})",
    )
    parser.add_argument(
        "--timeout", type=int, default=DEFAULT_TIMEOUT, help="per-request timeout"
    )
    parser.add_argument("--full", action="store_true", help="show untruncated diffs")
    parser.add_argument(
        "--quiet", action="store_true", help="only report schemas that need attention"
    )
    parser.add_argument("--no-color", action="store_true", help="disable color output")
    args = parser.parse_args()

    base_url = args.base_url if args.base_url.endswith("/") else args.base_url + "/"
    color = not args.no_color and sys.stdout.isatty()

    paths = sorted(args.dir.glob("fedramp-*.json"))
    if not paths:
        print(f"No schema files found in {args.dir}", file=sys.stderr)
        return 2

    print(f"Checking {len(paths)} schema(s) against {base_url}\n")

    with ThreadPoolExecutor(max_workers=8) as pool:
        results = list(pool.map(lambda p: check(p, base_url, args.timeout), paths))

    render(results, args.full, args.quiet, color)

    counts = {status: 0 for status in (SYNCED, DRIFT, MISSING, ERROR)}
    for result in results:
        counts[result.status] += 1

    summary = (
        f"{counts[SYNCED]} in sync, {counts[DRIFT]} out of sync, "
        f"{counts[MISSING]} not published, {counts[ERROR]} errored"
    )
    print(f"\n{BOLD if color else ''}{summary}{RESET if color else ''}")

    if counts[DRIFT] or counts[MISSING]:
        print(
            "\nOut-of-sync schemas are usually just a site rebuild that has not run yet.",
            file=sys.stderr,
        )
        return 1
    if counts[ERROR]:
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())

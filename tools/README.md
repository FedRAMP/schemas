# tools

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.1. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

## check-published-sync.py

Compares the schema files in this repo against the copies published at
<https://www.fedramp.gov/schemas/>. The site build picks up whatever is on `main`, so a
mismatch normally just means the site has not rebuilt since the last merge. A mismatch that
persists after a rebuild is worth looking into — it suggests something was published from a
source other than this repo.

This is a **manual** check, deliberately not part of `bun test`. It depends on the network
and on the site's build cadence, either of which would make the test suite flaky.

Python 3.10+, standard library only. No `bun install` needed.

```bash
python3 check-published-sync.py           # full report, with a diff for anything out of sync
python3 check-published-sync.py --quiet   # only the schemas needing attention
python3 check-published-sync.py --full    # untruncated diffs
```

fedramp.gov serves the schemas minified, so the script compares **parsed JSON** rather than
bytes — formatting differences are not drift. Diffs are rendered from a canonicalized
(sorted-key, indented) form of both sides, so they show content changes only, and key order
is never reported as a difference.

Each schema is reported as one of:

| Status  | Meaning                                                              |
| ------- | -------------------------------------------------------------------- |
| `OK`    | Published copy matches this repo.                                     |
| `DRIFT` | Published copy differs. Shows `local <ver> vs published <ver>` and a diff. |
| `GONE`  | No published copy (HTTP 404).                                         |
| `ERROR` | Could not be fetched or parsed.                                       |

Exit codes, for wiring into a periodic job:

| Code | Meaning                               |
| ---- | ------------------------------------- |
| `0`  | Everything in sync.                   |
| `1`  | Something is out of sync or unpublished. |
| `2`  | A fetch failed.                       |

Other flags: `--base-url` to check a staging build, `--dir` to point at a different schema
directory, `--timeout` for slow connections, and `--no-color`.

### Certificates on macOS

Framework Python builds on macOS ship without a usable CA bundle, which makes every fetch
fail with `CERTIFICATE_VERIFY_FAILED`. The script detects an empty trust store and falls back
to [`certifi`](https://pypi.org/project/certifi/) when it is installed; if it is not, run
`pip install certifi` (or the `Install Certificates.command` bundled with python.org builds).

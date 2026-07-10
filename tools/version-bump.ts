#!/usr/bin/env bun
// Bumps a schema's `$schemaVersion` field and records the change in CHANGELOG.md.
//
// Usage:
//   bun run version-bump <schema-file> <patch|minor|major> <description...>
//
// Example:
//   bun run version-bump fedramp-incident-report-schema-2026-06-24.json patch \
//     "Clarify description of timeline.detectedAt"

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { basename, resolve } from "node:path";

type Bump = "patch" | "minor" | "major";

const schemasDir = resolve(import.meta.dir, "..");
const changelogPath = resolve(schemasDir, "CHANGELOG.md");

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function parseArgs(argv: string[]): { file: string; bump: Bump; description: string } {
  const [fileArg, bumpArg, ...descParts] = argv;
  const description = descParts.join(" ").trim();

  if (!fileArg || !bumpArg || !description) {
    fail("Usage: bun run version-bump <schema-file> <patch|minor|major> <description...>");
  }
  if (bumpArg !== "patch" && bumpArg !== "minor" && bumpArg !== "major") {
    fail(`Invalid bump type "${bumpArg}"; expected "patch", "minor", or "major".`);
  }

  const file = basename(fileArg);
  if (!file.endsWith(".json")) fail(`Expected a .json schema file, got "${file}".`);

  return { file, bump: bumpArg, description };
}

function bumpVersion(version: string, bump: Bump): string {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!match) fail(`"$schemaVersion" value "${version}" is not valid SemVer (MAJOR.MINOR.PATCH).`);

  let [major, minor, patch] = match.slice(1).map(Number) as [number, number, number];
  if (bump === "major") {
    major += 1;
    minor = 0;
    patch = 0;
  } else if (bump === "minor") {
    minor += 1;
    patch = 0;
  } else {
    patch += 1;
  }
  return `${major}.${minor}.${patch}`;
}

function updateSchemaVersion(schemaPath: string, bump: Bump): { oldVersion: string; newVersion: string } {
  const text = readFileSync(schemaPath, "utf8");
  const fieldMatch = text.match(/"\$schemaVersion":\s*"(\d+\.\d+\.\d+)"/);
  if (!fieldMatch) fail(`Could not find a "$schemaVersion" field in ${schemaPath}.`);

  const oldVersion = fieldMatch[1]!;
  const newVersion = bumpVersion(oldVersion, bump);
  const updated = text.replace(fieldMatch[0], `"$schemaVersion": "${newVersion}"`);
  writeFileSync(schemaPath, updated);
  return { oldVersion, newVersion };
}

function appendChangelogEntry(file: string, oldVersion: string, newVersion: string, bump: Bump, description: string): void {
  if (!existsSync(changelogPath)) fail(`CHANGELOG.md not found at ${changelogPath}.`);

  const changelog = readFileSync(changelogPath, "utf8");
  const date = new Date().toISOString().slice(0, 10);
  const entry = `## ${date} — ${file} → ${newVersion} (${bump})\n\n${description} (was ${oldVersion}).\n\n`;

  // Entries are newest-first: insert right before the first existing "## "
  // heading so this run's entry lands above prior history but below the
  // file's leading description.
  const headingIndex = changelog.indexOf("\n## ");
  const updated =
    headingIndex === -1
      ? `${changelog.trimEnd()}\n\n${entry}`
      : `${changelog.slice(0, headingIndex + 1)}${entry}${changelog.slice(headingIndex + 1)}`;

  writeFileSync(changelogPath, updated);
}

function main(): void {
  const { file, bump, description } = parseArgs(process.argv.slice(2));
  const schemaPath = resolve(schemasDir, file);
  if (!existsSync(schemaPath)) fail(`Schema file not found: ${schemaPath}`);

  const { oldVersion, newVersion } = updateSchemaVersion(schemaPath, bump);
  appendChangelogEntry(file, oldVersion, newVersion, bump, description);

  console.log(`${file}: ${oldVersion} -> ${newVersion} (${bump})`);
  console.log("CHANGELOG.md updated.");
}

main();

#!/usr/bin/env bun
// Rewrites every schema file so each JSON Schema node's keys follow the
// canonical order defined in schema-key-order.ts. Property names inside
// "properties"/"$defs" are untouched — only the JSON Schema keywords within
// each node are reordered.
//
// Usage:
//   cd tools && bun run normalize-order

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { canonicalizeNode } from "./schema-key-order";

const schemasDir = resolve(import.meta.dir, "..");
const schemaFiles = readdirSync(schemasDir).filter((f) => f.endsWith(".json"));

let changed = 0;
for (const file of schemaFiles) {
  const path = resolve(schemasDir, file);
  const text = readFileSync(path, "utf8");
  const parsed = JSON.parse(text);
  const canonical = canonicalizeNode(parsed);

  // Compare compact (whitespace-insensitive) forms so formatting-only
  // differences from prettier's array-collapsing don't look like key-order
  // changes and trigger a needless rewrite.
  if (JSON.stringify(canonical) === JSON.stringify(parsed)) continue;

  writeFileSync(path, JSON.stringify(canonical, null, 2) + "\n");
  changed++;
}

console.log(`Normalized key order in ${changed}/${schemaFiles.length} schema file(s).`);

if (changed > 0) {
  console.log("Reformatting with prettier...");
  const proc = Bun.spawnSync(["bun", "run", "pretty"], { cwd: import.meta.dir, stdout: "inherit", stderr: "inherit" });
  if (!proc.success) {
    console.error("prettier failed; run `bun run pretty` manually.");
    process.exit(1);
  }
}

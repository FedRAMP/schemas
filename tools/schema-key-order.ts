// Canonical key order for JSON Schema nodes across this repo, derived from
// the ordering already dominant across the schema files (see
// normalize-key-order.ts). Keys not listed here are left in their existing
// relative order, appended after every listed key that's present.
export const SCHEMA_KEYWORD_ORDER = [
  "$schema",
  "$id",
  "$schemaVersion",
  "$ref",
  "$anchor",
  "type",
  "format",
  "title",
  "description",
  "enum",
  "const",
  "pattern",
  "minLength",
  "maxLength",
  "minimum",
  "maximum",
  "exclusiveMinimum",
  "exclusiveMaximum",
  "multipleOf",
  "default",
  "items",
  "minItems",
  "maxItems",
  "uniqueItems",
  "contains",
  "minContains",
  "maxContains",
  "examples",
  "required",
  "properties",
  "patternProperties",
  "additionalProperties",
  "propertyNames",
  "minProperties",
  "maxProperties",
  "allOf",
  "anyOf",
  "oneOf",
  "not",
  "if",
  "then",
  "else",
  "$defs",
] as const;

// Containers whose keys are author-chosen names (property names, $defs
// names) rather than JSON Schema keywords. Their key order is preserved
// as-is; only the schema nodes they contain get reordered.
const NAME_MAP_KEYS = new Set(["properties", "$defs", "patternProperties"]);

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function canonicalizeValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalizeValue);
  if (isPlainObject(value)) return canonicalizeNode(value);
  return value;
}

function canonicalizeChild(key: string, value: unknown): unknown {
  if (NAME_MAP_KEYS.has(key) && isPlainObject(value)) {
    const mapped: Record<string, unknown> = {};
    for (const name of Object.keys(value)) mapped[name] = canonicalizeValue(value[name]);
    return mapped;
  }
  return canonicalizeValue(value);
}

// Reorders a single schema node's own keys into canonical order (keywords
// first, in SCHEMA_KEYWORD_ORDER order, then any unrecognized keys in their
// original relative order), recursing into every nested schema node.
export function canonicalizeNode(node: Record<string, unknown>): Record<string, unknown> {
  const keys = Object.keys(node);
  const ordered: Record<string, unknown> = {};
  for (const key of SCHEMA_KEYWORD_ORDER) {
    if (key in node) ordered[key] = canonicalizeChild(key, node[key]);
  }
  for (const key of keys) {
    if (key in ordered) continue;
    ordered[key] = canonicalizeChild(key, node[key]);
  }
  return ordered;
}

import { test, expect, describe } from "bun:test";
import Ajv from "ajv/dist/2020";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";

const schemasDir = resolve(import.meta.dir, "..");
const schemaFiles = readdirSync(schemasDir).filter((f) => f.endsWith(".json"));

const ajv = new Ajv({ strict: false });

// Indexes a JSON document's source text, mapping every JSON Pointer
// (RFC 6901, e.g. "/properties/foo/required/0") to the 1-based line number
// where that key or array element starts. Lets errors cite "file:line"
// instead of just a pointer path.
function indexJsonLocations(text: string): Map<string, number> {
  const locations = new Map<string, number>();
  let i = 0;
  let line = 1;
  const n = text.length;

  function skipWhitespace(): void {
    while (i < n) {
      const c = text[i];
      if (c === "\n") {
        line++;
        i++;
      } else if (c === " " || c === "\t" || c === "\r") {
        i++;
      } else {
        break;
      }
    }
  }

  function readString(): string {
    let raw = '"';
    i++; // opening quote
    while (i < n && text[i] !== '"') {
      if (text[i] === "\\") {
        raw += text[i] + text[i + 1];
        i += 2;
      } else {
        if (text[i] === "\n") line++;
        raw += text[i];
        i++;
      }
    }
    raw += '"';
    i++; // closing quote
    return JSON.parse(raw);
  }

  function skipPrimitive(): void {
    while (i < n && !/[,}\]\s]/.test(text[i])) i++;
  }

  function parseValue(pointer: string): void {
    skipWhitespace();
    const c = text[i];
    if (c === "{") parseObject(pointer);
    else if (c === "[") parseArray(pointer);
    else if (c === '"') readString();
    else skipPrimitive();
  }

  function parseObject(pointer: string): void {
    i++; // {
    skipWhitespace();
    if (text[i] === "}") {
      i++;
      return;
    }
    while (true) {
      skipWhitespace();
      const keyLine = line;
      const key = readString();
      const childPointer = `${pointer}/${key}`;
      locations.set(childPointer, keyLine);
      skipWhitespace();
      i++; // :
      parseValue(childPointer);
      skipWhitespace();
      if (text[i] === ",") {
        i++;
        continue;
      }
      break;
    }
    skipWhitespace();
    i++; // }
  }

  function parseArray(pointer: string): void {
    i++; // [
    skipWhitespace();
    if (text[i] === "]") {
      i++;
      return;
    }
    let idx = 0;
    while (true) {
      skipWhitespace();
      const childPointer = `${pointer}/${idx}`;
      locations.set(childPointer, line);
      parseValue(childPointer);
      idx++;
      skipWhitespace();
      if (text[i] === ",") {
        i++;
        continue;
      }
      break;
    }
    skipWhitespace();
    i++; // ]
  }

  locations.set("", line);
  parseValue("");
  return locations;
}

async function loadSchema(file: string): Promise<{ schema: any; locations: Map<string, number> }> {
  const text = await Bun.file(resolve(schemasDir, file)).text();
  return { schema: JSON.parse(text), locations: indexJsonLocations(text) };
}

describe("JSON Schema validation", () => {
  for (const file of schemaFiles) {
    test(file, async () => {
      const { schema, locations } = await loadSchema(file);
      const valid = ajv.validateSchema(schema);
      if (!valid) {
        throw new Error(
          ajv.errors
            ?.map((e) => `${file}:${locations.get(e.instancePath) ?? "?"} ${e.instancePath} ${e.message}`)
            .join("\n")
        );
      }
      expect(valid).toBe(true);
    });
  }
});

// Walks every node in a schema document, invoking `visit` on each plain
// object found (arrays are traversed but not visited themselves) along with
// its JSON Pointer path from the document root.
function walk(
  node: unknown,
  pointer: string,
  visit: (obj: Record<string, unknown>, pointer: string) => void
): void {
  if (Array.isArray(node)) {
    node.forEach((item, i) => walk(item, `${pointer}/${i}`, visit));
    return;
  }
  if (node === null || typeof node !== "object") return;

  const obj = node as Record<string, unknown>;
  visit(obj, pointer);
  for (const [key, value] of Object.entries(obj)) walk(value, `${pointer}/${key}`, visit);
}

function findMissingRequiredProperties(schema: unknown, locations: Map<string, number>, file: string): string[] {
  const errors: string[] = [];
  walk(schema, "", (obj, pointer) => {
    if (!Array.isArray(obj.required)) return;
    if (!obj.properties || typeof obj.properties !== "object") return;

    const propertyNames = new Set(Object.keys(obj.properties as Record<string, unknown>));
    obj.required.forEach((name, i) => {
      if (typeof name === "string" && !propertyNames.has(name)) {
        const line = locations.get(`${pointer}/required/${i}`);
        errors.push(`${file}:${line ?? "?"} required field "${name}" is not defined in properties`);
      }
    });
  });
  return errors;
}

function findFieldsMissingTitleOrDescription(schema: unknown, locations: Map<string, number>, file: string): string[] {
  const errors: string[] = [];
  walk(schema, "", (obj, pointer) => {
    for (const container of ["properties", "$defs"] as const) {
      const fields = obj[container];
      if (!fields || typeof fields !== "object" || Array.isArray(fields)) continue;

      for (const [name, fieldSchema] of Object.entries(fields as Record<string, unknown>)) {
        if (!fieldSchema || typeof fieldSchema !== "object") continue;

        // A field that's nothing but a $ref defers its title/description to
        // the referenced definition, which is checked separately.
        const keys = Object.keys(fieldSchema as Record<string, unknown>);
        if (keys.length === 1 && keys[0] === "$ref") continue;

        const f = fieldSchema as Record<string, unknown>;
        const missing = ["title", "description"].filter(
          (k) => typeof f[k] !== "string" || (f[k] as string).trim() === ""
        );
        if (missing.length > 0) {
          const line = locations.get(`${pointer}/${container}/${name}`);
          errors.push(`${file}:${line ?? "?"} ${container}/${name}: missing ${missing.join(" and ")}`);
        }
      }
    }
  });
  return errors;
}

describe("required fields are defined in properties", () => {
  for (const file of schemaFiles) {
    test(file, async () => {
      const { schema, locations } = await loadSchema(file);
      const errors = findMissingRequiredProperties(schema, locations, file);
      if (errors.length > 0) throw new Error(errors.join("\n"));
    });
  }
});

describe("fields have a title and description", () => {
  for (const file of schemaFiles) {
    test(file, async () => {
      const { schema, locations } = await loadSchema(file);
      const errors = findFieldsMissingTitleOrDescription(schema, locations, file);
      if (errors.length > 0) throw new Error(errors.join("\n"));
    });
  }
});
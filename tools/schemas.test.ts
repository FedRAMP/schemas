import { test, expect, describe } from "bun:test";
import Ajv from "ajv/dist/2020";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";

const schemasDir = resolve(import.meta.dir, "..");
const schemaFiles = readdirSync(schemasDir).filter((f) =>
  f.endsWith(".schema.json")
);

const ajv = new Ajv({ strict: false });

describe("JSON Schema validation", () => {
  for (const file of schemaFiles) {
    test(file, async () => {
      const schema = await Bun.file(resolve(schemasDir, file)).json();
      const valid = ajv.validateSchema(schema);
      if (!valid) {
        throw new Error(
          ajv.errors?.map((e) => `${e.instancePath} ${e.message}`).join("\n")
        );
      }
      expect(valid).toBe(true);
    });
  }
});
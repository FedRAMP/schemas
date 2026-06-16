# FedRAMP CR26 JSON Schemas

> **WARNING: Prototype — Do Not Use**
>
> These schemas are under active development and are not finalized. Structure, field names, and validation rules are subject to breaking changes without notice. Do not use these schemas in production systems or rely on them for compliance purposes.

This repository contains draft JSON Schemas for FedRAMP Consolidated Rules 26 (CR26) documents.

## Schemas

- **`sdr-cso-frr.schema.json`** — Security Decision Record
- **`cds-cso-pub.schema.json`** — Certification Overview Package

## Tools

The `tools/` directory contains supporting scripts for working with the schemas.

```bash
cd tools
bun install
bun run index.ts
```
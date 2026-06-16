# FedRAMP CR26 JSON Schemas

> **WARNING: Prototype — Do Not Use**
>
> These schemas are under active development and are not finalized. Structure, field names, and validation rules are subject to breaking changes without notice. Do not use these schemas in production systems or rely on them for compliance purposes.

This repository contains draft JSON Schemas for FedRAMP Consolidated Rules 26 (CR26) documents.

## Schemas

- **`fedramp-common.schema.json`** — Shared type definitions referenced by other FedRAMP schemas
- **`cds-cso-pub.schema.json`** — Certification Overview Package
- **`sdr-cso-frr.schema.json`** — Security Decision Record
- **`ccm-ocr-avl.schema.json`** — Ongoing Certification Report (CCM-OCR-AVL)
- **`iec-cso-incident-report.schema.json`** — Incident Report (IEC-CSO-IIR / IEC-CSO-OIR / IEC-CSO-FIR)
- **`scn-cso-inf.schema.json`** — Significant Change Notification (SCN-CSO-INF)
- **`ver-rpt-vdt.schema.json`** — Vulnerability Detail Report (VER-RPT-VDT)
- **`ver-rpt-avi.schema.json`** — Accepted Vulnerability Info (VER-RPT-AVI)
- **`ver-tfr-mrh.schema.json`** — Historical VDR Activity (VER-TFR-MRH)

## Rules referenced

| Schema | Rules |
|--------|-------|
| `fedramp-common.schema.json` | IEC-CSO-EFI, VER-EVA-AIA, VER-EVA-EIR, VER-EVA-ELX, VER-EVA-EPA, VER-RPT-AVI, VER-RPT-NID, VER-RPT-VDT, VER-TFR-EVU, VER-TFR-MAV |
| `cds-cso-pub.schema.json` | CDS-CSO-PUB, CDS-CSO-SVC, CDS-CSO-UTC, MAS-CSO-TPR, SCG-CSO-RSC |
| `sdr-cso-frr.schema.json` | — |
| `ccm-ocr-avl.schema.json` | CCM-OCR-AVL, VER-RPT-AVI |
| `iec-cso-incident-report.schema.json` | IEC-CSO-DPR, IEC-CSO-EFI, IEC-CSO-FIR, IEC-CSO-IIR, IEC-CSO-OIR |
| `scn-cso-inf.schema.json` | SCN-CSO-EVA, SCN-CSO-INF |
| `ver-rpt-vdt.schema.json` | VER-RPT-AVI, VER-RPT-PER, VER-RPT-VDT |
| `ver-rpt-avi.schema.json` | VER-RPT-AVI, VER-RPT-PER, VER-TFR-MAV, VER-RPT-VDT |
| `ver-tfr-mrh.schema.json` | VER-RPT-AVI, VER-RPT-VDT, VER-TFR-MRH |

## Tools

The `tools/` directory contains supporting scripts for working with the schemas.

```bash
cd tools
bun install
bun run index.ts
```
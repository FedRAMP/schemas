# FedRAMP CR26 JSON Schemas

> **WARNING: Prototype — Do Not Use**
>
> These schemas are under active development and are not finalized. Structure, field names, and validation rules are subject to breaking changes without notice. Do not use these schemas in production systems or rely on them for compliance purposes.

This repository contains draft JSON Schemas for FedRAMP Consolidated Rules 26 (CR26) documents.

## Schemas

- **`common-definitions.schema.json`** — Shared type definitions referenced by other FedRAMP schemas
- **`certification-overview-package.schema.json`** — Certification Overview Package
- **`security-decision-record.schema.json`** — Security Decision Record
- **`ongoing-certification-report.schema.json`** — Ongoing Certification Report (CCM-OCR-AVL)
- **`incident-report.schema.json`** — Incident Report (IEC-CSO-IIR / IEC-CSO-OIR / IEC-CSO-FIR)
- **`significant-change-notification.schema.json`** — Significant Change Notification (SCN-CSO-INF)
- **`vulnerability-detail-report.schema.json`** — Vulnerability Detail Report (VER-RPT-VDT)
- **`accepted-vulnerability-info.schema.json`** — Accepted Vulnerability Info (VER-RPT-AVI)
- **`historical-vdr-activity.schema.json`** — Historical VDR Activity (VER-TFR-MRH)

## Rules referenced

| Schema                                        | Rules                                                                                                                            |
|-----------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `common-definitions.schema.json`              | IEC-CSO-EFI, VER-EVA-AIA, VER-EVA-EIR, VER-EVA-ELX, VER-EVA-EPA, VER-RPT-AVI, VER-RPT-NID, VER-RPT-VDT, VER-TFR-EVU, VER-TFR-MAV |
| `certification-overview-package.schema.json`  | CDS-CSO-PUB, CDS-CSO-SVC, CDS-CSO-UTC, MAS-CSO-TPR, SCG-CSO-RSC                                                                  |
| `security-decision-record.schema.json`        | —                                                                                                                                |
| `ongoing-certification-report.schema.json`    | CCM-OCR-AVL, VER-RPT-AVI                                                                                                         |
| `incident-report.schema.json`                 | IEC-CSO-DPR, IEC-CSO-EFI, IEC-CSO-FIR, IEC-CSO-IIR, IEC-CSO-OIR                                                                  |
| `significant-change-notification.schema.json` | SCN-CSO-EVA, SCN-CSO-INF                                                                                                         |
| `vulnerability-detail-report.schema.json`     | VER-RPT-AVI, VER-RPT-PER, VER-RPT-VDT                                                                                            |
| `accepted-vulnerability-info.schema.json`     | VER-RPT-AVI, VER-RPT-PER, VER-TFR-MAV, VER-RPT-VDT                                                                               |
| `historical-vdr-activity.schema.json`         | VER-RPT-AVI, VER-RPT-VDT, VER-TFR-MRH                                                                                            |

## Tools

The `tools/` directory contains supporting scripts for working with the schemas.

```bash
cd tools
bun install
bun run pretty
bun run test
```
# FedRAMP CR26 JSON Schemas

This repository contains draft JSON Schemas for FedRAMP Consolidated Rules 26 (CR26) documents.

## Schemas

| Schema                                                            | Description                                                 |
|-------------------------------------------------------------------|-------------------------------------------------------------|
| `fedramp-common-definitions-schema-2026-06-24.json`               | Shared type definitions referenced by other FedRAMP schemas |
| `fedramp-certification-package-overview-schema-2026-06-24.json`   | Certification Package Overview                              |
| `fedramp-security-decision-record-schema-2026-06-24.json`         | Security Decision Record                                    |
| `fedramp-ongoing-certification-report-schema-2026-06-24.json`     | Ongoing Certification Report                                |
| `fedramp-incident-report-schema-2026-06-24.json`                  | Incident Report                                             |
| `fedramp-significant-change-notifications-schema-2026-06-24.json` | Significant Change Notification                             |
| `fedramp-vulnerability-detail-report-schema-2026-06-24.json`      | Vulnerability Detail Report                                 |
| `fedramp-accepted-vulnerability-info-schema-2026-06-24.json`      | Accepted Vulnerability Info                                 |
| `fedramp-historical-ver-activity-schema-2026-06-24.json`          | Historical Vulnerability Evaluation and Reporting Activity  |
| `fedramp-advisor-information-schema-2026-06-24.json`              | Advisor Information                                         |
| `fedramp-assessor-information-schema-2026-06-24.json`             | Assessor Information                                        |

## Rules referenced

| Schema                                                            | Rules                                                                                                                            |
|-------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `fedramp-common-definitions-schema-2026-06-24.json`               | IEC-CSO-EFI, VER-EVA-AIA, VER-EVA-EIR, VER-EVA-ELX, VER-EVA-EPA, VER-RPT-AVI, VER-RPT-NID, VER-RPT-VDT, VER-TFR-EVU, VER-TFR-MAV |
| `fedramp-certification-package-overview-schema-2026-06-24.json`   | CDS-CSO-PUB, CDS-CSO-SVC, CDS-CSO-UTC, FRC-CSO-PKG, MAS-CSO-TPR, SCG-CSO-RSC                                                     |
| `fedramp-security-decision-record-schema-2026-06-24.json`         | SDR-CSO-FRR                                                                                                                      |
| `fedramp-ongoing-certification-report-schema-2026-06-24.json`     | CCM-OCR-AVL, VER-RPT-AVI                                                                                                         |
| `fedramp-incident-report-schema-2026-06-24.json`                  | IEC-CSO-EFI, IEC-CSO-FIR, IEC-CSO-IIR, IEC-CSO-OIR                                                                               |
| `fedramp-significant-change-notifications-schema-2026-06-24.json` | SCN-CSO-EVA, SCN-CSO-INF                                                                                                         |
| `fedramp-vulnerability-detail-report-schema-2026-06-24.json`      | VER-RPT-AVI, VER-RPT-PER, VER-RPT-VDT                                                                                            |
| `fedramp-accepted-vulnerability-info-schema-2026-06-24.json`      | VER-RPT-AVI, VER-RPT-PER, VER-TFR-MAV, VER-RPT-VDT                                                                               |
| `fedramp-historical-ver-activity-schema-2026-06-24.json`          | VER-RPT-AVI, VER-RPT-VDT, VER-TFR-MRH                                                                                            |
| `fedramp-advisor-information-schema-2026-06-24.json`              | MKT-CAS-WEB                                                                                                                      |
| `fedramp-assessor-information-schema-2026-06-24.json`             | MKT-IAS-WEB                                                                                                                      |

## Tools

The `tools/` directory contains supporting scripts for working with the schemas.

```bash
cd tools
bun install
bun run pretty
bun run test
```
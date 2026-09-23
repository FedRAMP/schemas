# Changelog

All notable changes to the FedRAMP CR26 JSON Schemas are documented in this file.

Each schema file carries its own `$schemaVersion` field (SemVer), versioned independently of
the others. The entries below are newest first and record, per date, which schema(s) changed, the
version each moved to, and why. New entries are appended automatically by
`tools/version-bump.ts` (see [README.md](README.md#versioning) for the policy) — don't hand-edit
past entries.

## 2026-09-23 — fedramp-significant-change-notifications-schema-2026-06-24.json → 0.1.3 (patch)

Record the prettier array-collapsing reformat from 29a909c, which changed this file without the `$schemaVersion` bump its commit message described; no content changes (was 0.1.2).

## 2026-09-02 — fedramp-certification-package-overview-schema-2026-06-24.json → 0.1.4 (patch)

Changed /properties/certifiedServices/items/properties/dateAvailable to an optional field (was 0.1.3).

## 2026-09-01 — fedramp-security-decision-record-schema-2026-06-24.json → 1.1.1 (patch)

Update 'Evidence Location' field description (was 1.1.0).

## 2026-09-01 — fedramp-common-definitions-schema-2026-06-24.json → 0.3.0 (minor)

Add Remediated finalDisposition value, wire up painReductionEvents on vulnerabilityDetail, and fix the VER-RPT-PAE rule citation (fixes #3, #7, #16) (was 0.2.1).

## 2026-09-01 — fedramp-security-decision-record-schema-2026-06-24.json → 1.1.0 (minor)

Add optional metadata object (version, lastUpdated, updateSource) per SDR-CSO-MTD (fixes #20) (was 1.0.3).

## 2026-08-14 — fedramp-security-decision-record-schema-2026-06-24.json → 1.0.3 (patch)

Clarify the portsAndProtocols purpose description (was 1.0.2).

## 2026-08-14 — fedramp-common-definitions-schema-2026-06-24.json → 0.2.1 (patch)

Pin isOverdue in the overdueStatus if check so the conditional does not depend on the sibling required, and drop the field-level title/description that were misapplied to the then subschema (was 0.2.0).

## 2026-08-14 — fedramp-certification-package-overview-schema-2026-06-24.json → 0.1.3 (patch)

Fix possessive typos, reuse the shared logoUri definition, pin contactType in contains checks, and annotate certifiedServices items (was 0.1.2).

## 2026-08-14 — fedramp-ongoing-certification-report-schema-2026-06-24.json → 0.2.0 (minor)

Require reportableIncidents.incidents so an empty array serves as the no-incidents attestation (was 0.1.2).

## 2026-08-14 — fedramp-incident-report-schema-2026-06-24.json → 0.2.0 (minor)

Fix potentialImpact declared as string instead of object, require resolvedAt on Final reports, and tighten the CVE ID pattern (was 0.1.2).

## 2026-08-14 — fedramp-security-decision-record-schema-2026-06-24.json → 1.0.2 (patch)

Correct KSI implementation/validation/assessment descriptions to reference the Key Security Indicator, and fix 'Indictor' typo (was 1.0.1).

## 2026-08-11 — fedramp-vulnerability-detail-report-schema-2026-06-24.json → 0.1.1 (patch)

Fix 3 unresolvable cross-schema `$ref`s into the common definitions schema (`certificationPackageOverviewUri`, `reportPeriodDateTime`, `vulnerabilityDetail`) by changing the path form `...json/$defs/<name>` to the URI fragment form `...json#/$defs/<name>`. Under JSON Schema 2020-12 a `$ref` is a URI reference, so appending `/$defs/<name>` to the file URL names a different resource rather than a location inside that file. Resolution therefore failed, so a standard validator could not compile the schema and no constraint was ever evaluated. No change to what the schema means. Reported in [#11](https://github.com/FedRAMP/schemas/issues/11) (was 0.1.0).

## 2026-08-11 — fedramp-significant-change-notifications-schema-2026-06-24.json → 0.1.2 (patch)

Fix 1 unresolvable cross-schema `$ref` into the common definitions schema (`certificationPackageOverviewUri`) by changing the path form `...json/$defs/<name>` to the URI fragment form `...json#/$defs/<name>`. Under JSON Schema 2020-12 a `$ref` is a URI reference, so appending `/$defs/<name>` to the file URL names a different resource rather than a location inside that file. Resolution therefore failed, so a standard validator could not compile the schema and no constraint was ever evaluated. No change to what the schema means. Reported in [#11](https://github.com/FedRAMP/schemas/issues/11) (was 0.1.1).

## 2026-08-11 — fedramp-security-decision-record-schema-2026-06-24.json → 1.0.1 (patch)

Fix 1 unresolvable cross-schema `$ref` into the common definitions schema (`certificationPackageOverviewUri`) by changing the path form `...json/$defs/<name>` to the URI fragment form `...json#/$defs/<name>`. Under JSON Schema 2020-12 a `$ref` is a URI reference, so appending `/$defs/<name>` to the file URL names a different resource rather than a location inside that file. Resolution therefore failed, so a standard validator could not compile the schema and no constraint was ever evaluated. No change to what the schema means. Reported in [#11](https://github.com/FedRAMP/schemas/issues/11) (was 1.0.0).

## 2026-08-11 — fedramp-ongoing-certification-report-schema-2026-06-24.json → 0.1.2 (patch)

Fix 2 unresolvable cross-schema `$ref`s into the common definitions schema (`certificationPackageOverviewUri`, `reportPeriodDate`) by changing the path form `...json/$defs/<name>` to the URI fragment form `...json#/$defs/<name>`. Under JSON Schema 2020-12 a `$ref` is a URI reference, so appending `/$defs/<name>` to the file URL names a different resource rather than a location inside that file. Resolution therefore failed, so a standard validator could not compile the schema and no constraint was ever evaluated. No change to what the schema means. Reported in [#11](https://github.com/FedRAMP/schemas/issues/11) (was 0.1.1).

## 2026-08-11 — fedramp-incident-report-schema-2026-06-24.json → 0.1.2 (patch)

Fix 3 unresolvable cross-schema `$ref`s into the common definitions schema (`certificationPackageOverviewUri`, `nRating` twice) by changing the path form `...json/$defs/<name>` to the URI fragment form `...json#/$defs/<name>`. Under JSON Schema 2020-12 a `$ref` is a URI reference, so appending `/$defs/<name>` to the file URL names a different resource rather than a location inside that file. Resolution therefore failed, so a standard validator could not compile the schema and no constraint was ever evaluated. No change to what the schema means. Reported in [#11](https://github.com/FedRAMP/schemas/issues/11) (was 0.1.1).

## 2026-08-11 — fedramp-historical-ver-activity-schema-2026-06-24.json → 0.1.1 (patch)

Fix 3 unresolvable cross-schema `$ref`s into the common definitions schema (`certificationPackageOverviewUri`, `vulnerabilityDetail`, `acceptedVulnerabilityInfo`) by changing the path form `...json/$defs/<name>` to the URI fragment form `...json#/$defs/<name>`. Under JSON Schema 2020-12 a `$ref` is a URI reference, so appending `/$defs/<name>` to the file URL names a different resource rather than a location inside that file. Resolution therefore failed, so a standard validator could not compile the schema and no constraint was ever evaluated. No change to what the schema means. Reported in [#11](https://github.com/FedRAMP/schemas/issues/11) (was 0.1.0).

## 2026-08-11 — fedramp-assessor-information-schema-2026-06-24.json → 1.0.1 (patch)

Fix 1 unresolvable cross-schema `$ref` into the common definitions schema (`logoUri`) by changing the path form `...json/$defs/<name>` to the URI fragment form `...json#/$defs/<name>`. Under JSON Schema 2020-12 a `$ref` is a URI reference, so appending `/$defs/<name>` to the file URL names a different resource rather than a location inside that file. Resolution therefore failed, so a standard validator could not compile the schema and no constraint was ever evaluated. No change to what the schema means. Reported in [#11](https://github.com/FedRAMP/schemas/issues/11) (was 1.0.0).

## 2026-08-11 — fedramp-advisor-information-schema-2026-06-24.json → 1.0.1 (patch)

Fix 1 unresolvable cross-schema `$ref` into the common definitions schema (`logoUri`) by changing the path form `...json/$defs/<name>` to the URI fragment form `...json#/$defs/<name>`. Under JSON Schema 2020-12 a `$ref` is a URI reference, so appending `/$defs/<name>` to the file URL names a different resource rather than a location inside that file. Resolution therefore failed, so a standard validator could not compile the schema and no constraint was ever evaluated. No change to what the schema means. Reported in [#11](https://github.com/FedRAMP/schemas/issues/11) (was 1.0.0).

## 2026-08-11 — fedramp-accepted-vulnerability-info-schema-2026-06-24.json → 0.1.1 (patch)

Fix 3 unresolvable cross-schema `$ref`s into the common definitions schema (`certificationPackageOverviewUri`, `reportPeriodDateTime`, `acceptedVulnerabilityInfo`) by changing the path form `...json/$defs/<name>` to the URI fragment form `...json#/$defs/<name>`. Under JSON Schema 2020-12 a `$ref` is a URI reference, so appending `/$defs/<name>` to the file URL names a different resource rather than a location inside that file. Resolution therefore failed, so a standard validator could not compile the schema and no constraint was ever evaluated. No change to what the schema means. Reported in [#11](https://github.com/FedRAMP/schemas/issues/11) (was 0.1.0).

## 2026-08-11 — fedramp-assessor-information-schema-2026-06-24.json → 1.0.0 (major)

Add four required fields so the FedRAMP Marketplace can render an Independent Assessment Service
listing entirely from the published document (previously a valid document carried no organization
name at all):

- `assessorName` — organization name as displayed on the Marketplace.
- `logo` — `$ref` to the new `$defs/logoUri` in the common definitions schema.
- `a2laId` — identifier assigned by the American Association for Laboratory Accreditation, which
  assessors must hold to qualify for FedRAMP Recognition (REC-IAS-ACC).
- `a2laAccreditationDate` — `format: date`, the day A2LA accredited the assessor (REC-IAS-ACC).

**Breaking:** any assessor document already published against 0.1.1 is invalid until these four
fields are added. Requested in [#13](https://github.com/FedRAMP/schemas/issues/13). (was 0.1.1).

## 2026-08-11 — fedramp-advisor-information-schema-2026-06-24.json → 1.0.0 (major)

Add the advisor counterpart of the assessor Marketplace fields:

- `advisorName` (required) — organization name as displayed on the Marketplace.
- `logo` (required) — `$ref` to the new `$defs/logoUri` in the common definitions schema.
- `a2laId` (optional) — A2LA identifier. Optional rather than required because CR26 does not
  require advisory services to be A2LA accredited.

**Breaking:** any advisor document already published against 0.1.1 is invalid until `advisorName`
and `logo` are added. Requested in [#13](https://github.com/FedRAMP/schemas/issues/13).
(was 0.1.1).

## 2026-08-11 — fedramp-common-definitions-schema-2026-06-24.json → 0.2.0 (minor)

Add `$defs/logoUri` — a `format: uri` string constrained to PNG, JPEG, GIF, SVG, WebP, ICO, BMP,
or TIFF by file extension — so the advisor and assessor schemas share one logo definition instead
of each duplicating the inline `logo` node in the certification package overview schema. That
schema's inline copy is unchanged; folding it into this `$ref` is a separate cleanup. (was 0.1.1).

## 2026-07-15 — fedramp-security-decision-record-schema-2026-06-24.json → 1.0.0 (major)

Fix items schemas for portsAndProtocols, securityControls, fedRampRequirements, and keySecurityIndicators: properties was a dead sibling of items (ignored on array instances) or the real object schema was nested under a non-keyword wrapper key (nistSecurityControl/fedRAMPRequirement/keySecurityIndicator) that ajv silently ignored, so array elements were effectively unvalidated. Now items directly declares type/required/properties for each element. (was 0.1.1).

## 2026-07-15 — fedramp-significant-change-notifications-schema-2026-06-24.json → 0.1.1 (patch)

Normalize JSON Schema keyword order within each node (no semantic change). (was 0.1.0).

## 2026-07-15 — fedramp-security-decision-record-schema-2026-06-24.json → 0.1.1 (patch)

Normalize JSON Schema keyword order within each node (no semantic change). (was 0.1.0).

## 2026-07-15 — fedramp-ongoing-certification-report-schema-2026-06-24.json → 0.1.1 (patch)

Normalize JSON Schema keyword order within each node (no semantic change). (was 0.1.0).

## 2026-07-15 — fedramp-incident-report-schema-2026-06-24.json → 0.1.1 (patch)

Normalize JSON Schema keyword order within each node (no semantic change). (was 0.1.0).

## 2026-07-15 — fedramp-common-definitions-schema-2026-06-24.json → 0.1.1 (patch)

Normalize JSON Schema keyword order within each node (no semantic change). (was 0.1.0).

## 2026-07-15 — fedramp-certification-package-overview-schema-2026-06-24.json → 0.1.2 (patch)

Normalize JSON Schema keyword order within each node (no semantic change). (was 0.1.1).

## 2026-07-15 — fedramp-assessor-information-schema-2026-06-24.json → 0.1.1 (patch)

Normalize JSON Schema keyword order within each node (no semantic change). (was 0.1.0).

## 2026-07-15 — fedramp-advisor-information-schema-2026-06-24.json → 0.1.1 (patch)

Normalize JSON Schema keyword order within each node (no semantic change). (was 0.1.0).

## 2026-07-14 — fedramp-certification-package-overview-schema-2026-06-24.json → 0.1.1 (patch)

Assessor is no longer a required element to accommodate class A providers who do not yet have an assessor. If an assessor is provided, then the assessor must have a valid fedRAMP assessor id (was 0.1.0).

## 2026-07-10 — Baseline frozen (all schemas → 0.1.0)

Established the versioning strategy for this repo and reset every schema to a common starting
point:

- `$schemaVersion` is now the field of record for compatibility, bumped per SemVer: **patch** for
  docs/description-only changes, **minor** for backward-compatible additions (new optional field,
  new enum value), **major** for breaking changes (new required field, removed/renamed field,
  type change, removed enum value).
- The `2026-06-24` date embedded in each filename and `$id` is now pinned to the CR26 release and
  will **not** change for ordinary edits — it only advances when FedRAMP publishes a new ruleset
  revision (e.g. a future CR27), at which point a new dated set of files is cut and the old ones
  are left untouched so previously-published `$id` URLs keep resolving to what they meant at the
  time.
- Fixed `$id` in `fedramp-significant-change-notifications-schema-2026-06-24.json`, which
  pointed to `fedramp-significant-change-notification-schema-2026-06-24.json` (missing the "s")
  instead of matching its own filename.
- Added `tools/version-bump.ts` and companion tests (`$id` matches filename, `$schemaVersion` is
  valid SemVer) so drift like the above is caught automatically going forward.

All 11 schemas moved `0.0.1 → 0.1.0` as part of this reset (that field had never actually been
bumped before now, despite the substantive edits summarized below).

### Prior history (pre-versioning), summarized

- **Origins.** The schemas began as two files, `cr26SecurityDecisionRecord.schema.json` and
  `cr26CertificationOverviewPackage.schema.json`, later renamed through an intermediate
  rule-code convention (`sdr-cso-frr.schema.json`, `cds-cso-pub.schema.json`,
  `ver-rpt-vdt.schema.json`) to today's descriptive, dated names
  (`fedramp-*-schema-2026-06-24.json`).
- **Coverage grew from 2 schemas to 11.** Added the CCM, IEC, SCN, and VER-TFR schemas; then
  `ver-rpt-avi`; then split out vulnerability detail report, accepted vulnerability info, and
  historical VER activity into their own schemas; then added advisor and assessor information
  schemas.
- **Shared definitions were extracted** into `fedramp-common-definitions-schema` — including
  `contactInfo`, `certificationPackageOverviewUri`, `vulnerabilityDetail`,
  `acceptedVulnerabilityInfo`, `nRating`, and `reportPeriodDate`/`reportPeriodDateTime` — and
  referenced from other schemas via absolute `$id` URLs rather than duplicated inline.
- **Correctness fixes** along the way: `authorizationPath` renamed to `certificationPath`,
  `frrAssesment`/`ksiAssesment` typos corrected to `frrAssessment`/`ksiAssessment`, a missing
  business category added, `id` renamed to `assessorID`, an unused `$comment` field removed, and
  `digitalIdentityLevel` removed from a `required` list it didn't belong in.
- **Tooling added** in `tools/`: Ajv-based `$schema` validation, Prettier formatting
  (`bun run pretty`), and custom checks that every `required` property is actually defined in
  `properties` and that every field has both a `title` and a `description`.
- **Documentation pass**: added the README with the schema table and FedRAMP rule
  cross-reference table, then went through all 11 schemas adding `title`/`description` to
  nearly every field for clarity.

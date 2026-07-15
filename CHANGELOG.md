# Changelog

All notable changes to the FedRAMP CR26 JSON Schemas are documented in this file.

Each schema file carries its own `$schemaVersion` field (SemVer), versioned independently of
the others. The entries below are newest first and record, per date, which schema(s) changed, the
version each moved to, and why. New entries are appended automatically by
`tools/version-bump.ts` (see [README.md](README.md#versioning) for the policy) — don't hand-edit
past entries.

## 2026-07-15 — fedramp-security-decision-record-schema-2026-06-24.json → 0.1.1 (patch)

Fix malformed array item schemas: securityControls, fedRampRequirements, and keySecurityIndicators nested their item schemas under non-keyword wrapper keys, and portsAndProtocols placed per-item properties as a sibling of items; under JSON Schema 2020-12 these collapsed each items to any-object. Extracted each into $defs and referenced them from items. (was 0.1.0).

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

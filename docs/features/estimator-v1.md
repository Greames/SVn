# Estimator V1 (in progress)

**Status:** early prototype, not production-ready.

`src/app/page.tsx` is a UI prototype of the estimator dashboard: floor
plan viewer, per-service (Electrical/Plumbing/Solar/Summary) tabs, and a
project estimate summary. It implements the shape of the experience
described in the business rules, not final calculation logic.

Implements: [`docs/business-rules/estimator-v1-scope.md`](../business-rules/estimator-v1-scope.md)

## Approved implementation direction

- Painting is a required V1 core service and the estimator UI should have a
  Painting tab alongside Electrical and Plumbing. Painting defaults must be
  driven by configurable business rules; no additional coat counts, finish
  tiers, or prices are assumed here.
- Floor-plan input is upload-first and assisted: PDF/image/CAD when
  supported, with extracted or assisted room/dimension data that the user
  can correct before calculation. No specific detection provider is chosen
  yet, and uncertain detected dimensions must never be treated as exact.

## Known gaps vs. the business rules

- All pricing (package totals, plumbing fixture prices) is hardcoded
  placeholder data, not sourced from a catalogue or approved rate card.
- Electrical load/cable-size guidance is hardcoded sample data, not a
  configurable rules engine.
- No floor-plan upload/detection — the plan view is a static illustrative
  SVG.
- No persistence (Prisma/Postgres) — component-local React state only.
- No painting tab yet (scope doc covers it; UI doesn't).
- No quotation generation, package-to-catalogue wiring, or "Generate
  Estimate" behavior — those buttons are currently inert.

## Next steps

Not scheduled yet. Needs a decision on what to build next: real catalogue
data model (Prisma), calculation domain layer (per the "Architecture
guidance" section of the scope doc), or floor-plan input.

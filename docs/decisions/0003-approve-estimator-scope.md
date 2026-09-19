# 0003 — Approve Estimator V1 Scope and Prototype

- Status: Accepted
- Date: 2026-09-19

## Context

`CLAUDE.md` (from initial setup) stated: "Do not build the estimator,"
"Do not invent pricing," and "Do not invent business rules" until the
business owner supplied them in `docs/business-rules/`. On 2026-09-19 the
business owner pushed two commits directly to the repository:

1. A UI prototype of the estimator dashboard (`src/app/page.tsx`),
   including hardcoded placeholder pricing and electrical load/cable-size
   guidance.
2. `docs/features/estimator-v1-scope.md` — a detailed product/business
   rules spec for the Electrical, Plumbing, and Painting estimator
   (core flow, per-service defaults, packages, catalogue model,
   recalculation rules, acceptance criteria).

This is exactly the kind of significant scope change `CLAUDE.md` says to
flag before proceeding, since it contradicts the earlier "do not build"
rules.

## Decision

Approved. The business owner confirmed: move forward with the estimator
as an active feature.

- The scope document is treated as the first real business-rules input
  and moved to `docs/business-rules/estimator-v1-scope.md` (from
  `docs/features/`), matching the convention set up at project start.
- `docs/features/estimator-v1.md` tracks the prototype as a feature,
  documenting what it does and doesn't implement yet.
- The hardcoded prices/engineering values in the prototype remain
  **placeholder data**, not approved pricing — they are not sourced from
  any rate card or catalogue and should not be treated as real until the
  business owner supplies actual figures.
- `CLAUDE.md`'s "do not build the estimator" rule is superseded for this
  feature; the other hard rules (no invented pricing beyond what's
  explicitly marked placeholder, no assumed workflows beyond what the
  scope doc states, keep to the three service categories) still apply.

## Consequences

- Future estimator work should read `docs/business-rules/estimator-v1-scope.md`
  first and implement against it, rather than inventing new rules.
- Persistence, a calculation domain layer, and real catalogue/pricing data
  are still undone — see "Known gaps" in `docs/features/estimator-v1.md`.
- `CLAUDE.md` was updated to reflect this decision (see the diff on this
  commit) rather than left stale.

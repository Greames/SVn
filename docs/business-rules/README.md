# Business Rules

Business rules for the in-scope service categories, as supplied by the
business owner:

- [`estimator-v1-scope.md`](./estimator-v1-scope.md) — Electrical,
  Plumbing, and Painting estimator: core flow, per-service default
  quantities/engineering guidance, packages, catalogue model,
  recalculation rules, and V1 acceptance criteria.

No pricing tables or rate cards have been supplied yet — the prototype's
hardcoded numbers (package totals, fixture prices) are illustrative
placeholders only, not approved pricing. See
`docs/decisions/0003-approve-estimator-scope.md` for how this file's
status changed from empty to populated.

Every rule implemented in code should trace back to a file here. Do not
implement pricing, estimation logic, or workflow behavior based on
assumptions that aren't written down.

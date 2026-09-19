# Business Rules

Business rules for the in-scope service categories, as supplied by the
business owner:

- [`estimator-v1-scope.md`](./estimator-v1-scope.md) — Electrical,
  Plumbing, and Painting estimator: core flow, per-service default
  quantities/engineering guidance, packages, catalogue model (now
  including supplier-website pricing sourcing), recalculation rules,
  and V1 acceptance criteria.
- **Access control:** two user types — internal users (admin
  functionality) and clients (isolated to their own projects/payments
  only; must never see another client's data). See
  `docs/decisions/0005-auth-roles-and-data-isolation.md`.

No hard-coded rate card has been supplied, and none is planned — real
pricing comes from supplier websites (see `estimator-v1-scope.md` →
"Catalog / inventory model" and `docs/decisions/0006-estimator-pricing-source-supplier-websites.md`).
The prototype's hardcoded numbers (package totals, fixture prices) remain
illustrative placeholders until that sourcing is built. See
`docs/decisions/0003-approve-estimator-scope.md` for how this file's
status changed from empty to populated.

Every rule implemented in code should trace back to a file here. Do not
implement pricing, estimation logic, or workflow behavior based on
assumptions that aren't written down.

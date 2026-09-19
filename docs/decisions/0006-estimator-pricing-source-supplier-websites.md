# 0006 — Estimator Pricing Source: Supplier Websites

- Status: Accepted
- Date: 2026-09-19

## Context

The estimator prototype hardcodes all pricing as placeholder data (see
`docs/features/estimator-v1.md`). Raised as
`docs/questions/0003-estimator-pricing-and-catalogue-data.md`. The
business owner also updated `docs/business-rules/estimator-v1-scope.md`
directly (see its "Catalog / inventory model" section) — that file is
the canonical business rule; this ADR records the decision and its
implementation consequences.

## Decision

Supplier websites (e.g. Cera, Jaquar, Havells, Polycab) are the source of
truth for material/product pricing and catalogue data. Pricing is dynamic,
not a permanently hard-coded rate card. When supplier data is unavailable
for an item, the estimator must not invent a price.

The exact retrieval/integration mechanism (scraping, official API,
manual import, etc.) is an implementation detail, not fixed by this
decision — pick deliberately when building it.

## Consequences

- Catalogue items should carry a supplier/source reference and a
  pricing retrieval/update timestamp where available, per the updated
  scope doc.
- This is a bigger undertaking than the current prototype — it needs a
  data-sourcing mechanism (scraping vs. API vs. manual import each have
  different legal/reliability/maintenance tradeoffs) before real prices
  can replace the placeholder data. Not started; no mechanism chosen.
- The prototype's hardcoded prices remain explicitly placeholder
  (per ADR 0003) until this is built — nothing changes in the UI code
  as a result of this decision by itself.

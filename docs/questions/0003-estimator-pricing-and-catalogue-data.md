# 0003 — Real Pricing and Catalogue Data for the Estimator

- Status: Answered
- Date raised: 2026-09-19

## Question

What's the source of truth for real pricing — a rate card/spreadsheet to
import, a catalogue to build against specific supplier SKUs (Cera,
Jaquar, Havells, Polycab, etc. per `docs/business-rules/estimator-v1-scope.md`),
or something else? And who owns keeping it updated?

## Context

The prototype dashboard (`src/app/page.tsx`) currently hardcodes all
pricing and electrical load/cable-size values as placeholders (see
`docs/features/estimator-v1.md` → Known gaps). Building the domain
calculation layer described in the scope doc's "Architecture guidance" section needs real data to model against, not just a schema shape.

## Answer

Use supplier websites as the source for material/product pricing and catalogue information. Pricing should be treated as dynamic rather than as a permanently hard-coded rate card. The estimator should use supplier website data where available and should not invent prices when supplier data is unavailable.

The initial implementation should preserve the supplier/source reference and retrieval/update time where practical. Multiple suppliers can be supported later; supplier-specific integration details and implementation mechanism are not otherwise specified by this decision.

## Status

Answered based on the approved estimator project decision.

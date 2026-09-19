# 0003 — Real Pricing and Catalogue Data for the Estimator

- Status: Open
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
calculation layer described in the scope doc's "Architecture guidance"
section needs real data to model against, not just a schema shape.

## Answer

(left blank until answered)

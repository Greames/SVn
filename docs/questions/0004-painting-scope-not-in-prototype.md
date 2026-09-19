# 0004 — Painting Tab Missing from Prototype

- Status: Answered
- Date raised: 2026-09-19

## Question

`docs/business-rules/estimator-v1-scope.md` covers Painting as one of the
three core services, but the current dashboard prototype only has
Electrical / Plumbing / Solar / Summary tabs — no Painting tab. Should
Painting be added to match the approved scope, and if so are there
painting-specific defaults (coat counts, finish tiers) to supply beyond
what's already in the scope doc?

## Context

Not blocking current work, but the prototype and the approved business
rules are out of sync on this one point. Flagging so it doesn't get
missed rather than assuming a fix.

## Answer

Yes. Painting is an approved core V1 service and the estimator UI should
include a Painting tab alongside Electrical and Plumbing. The approved
scope already defines the required painting capabilities (putty, primer,
interior/exterior/ceiling coats, standard/premium/luxury finishes,
material and labour quantities) and says coat counts must come from
configurable business rules rather than hard-coded UI text.

No additional painting-specific defaults have been supplied beyond the
approved scope, so implementation must not invent coat counts, finish
tiers, prices, or other business rules. Keep those values configurable
until the business owner supplies them.

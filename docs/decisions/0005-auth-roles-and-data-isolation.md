# 0005 — Auth Roles and Client Data Isolation

- Status: Accepted
- Date: 2026-09-19

## Context

`docs/decisions/0001-tech-stack.md` named Auth.js as the chosen library
but left "who logs in" undecided. Raised as
`docs/questions/0002-auth-requirements.md`.

## Decision

Two user types need authenticated access:

- **Internal users** — access internal/admin functionality.
- **Clients** — access only their own projects and payments. Clients
  must never see another client's projects, payments, or internal
  operational data.

Auth.js remains the chosen implementation mechanism (per ADR 0001); this
decision doesn't pick a specific auth method (credentials, OAuth, magic
link) or session strategy — those remain open implementation choices,
not fixed by this decision.

## Consequences

- This is a business rule about data access, not just a technical
  choice — client data isolation must be enforced wherever client data
  is queried (e.g. every project/payment query scoped to the requesting
  client), once persistence exists.
- No Prisma models exist yet for User/Role/Project — this decision sets
  the shape (two roles, per-client data scoping) but doesn't trigger
  building the schema by itself; that follows when there's a concrete
  feature needing persistence.
- Specific auth method (credentials vs. OAuth vs. magic link) and
  session strategy (JWT vs. database sessions) are still open — pick
  deliberately when actually implementing login, not assumed here.

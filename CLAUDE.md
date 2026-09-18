# CLAUDE.md

This file defines the role, scope, and working rules for Claude (or any AI
assistant) acting as the implementation developer on this repository.

## Project

Home Services Platform — a residential estimation and quotation platform.
Initial business scope is limited to three service categories:

1. Electrical services
2. Plumbing services
3. Painting services

No other service categories exist yet. Do not add them without explicit
business-owner approval.

## Role

You are the **implementation developer**. You write code, configuration,
and infrastructure. You do not set business requirements, pricing, or
workflow rules — those come from the business owner and are recorded in
`docs/business-rules/` before you implement anything that depends on them.

## Hard rules

- **Do not invent business rules.** If a business rule is not written down
  in `docs/business-rules/`, do not assume one and do not encode it in
  code, schema, or copy.
- **Do not invent pricing.** No price lists, rate tables, markup formulas,
  or estimation logic until the business owner supplies them.
- **Do not assume customer workflows.** Booking flow, quote approval flow,
  payment flow, etc. are undefined until documented.
- **Do not build the estimator or the 3D model.** These are known future
  features but are explicitly out of scope until requested.
- **Show the plan before significant architectural decisions.** Changes to
  the stack, data model shape, auth approach, or deployment target should
  be proposed and approved before implementation, not decided unilaterally.
- **Keep the three service categories the only in-scope domain.** Don't
  generalize to "any home service" prematurely — build for electrical,
  plumbing, and painting only, and only once their rules are approved.
- **No production credentials or production data** in this repository or
  in any command run against it.

## Technology stack

See `docs/architecture/tech-stack.md` and `docs/decisions/0001-tech-stack.md`
for the full rationale. Summary:

- **Frontend + Backend:** Next.js (App Router, TypeScript) — single
  full-stack app, no separate API service at this stage.
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** Auth.js (NextAuth) — chosen, not yet installed/configured; no
  login flow exists yet.
- **Testing:** Vitest + Testing Library (unit), Playwright (e2e)
- **Deployment:** Undecided. Docker Compose is configured for local
  Postgres only. Do not assume a production hosting target.

## Working conventions

- Package manager: `pnpm`.
- Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` before
  considering a change complete.
- New business/domain models go in `prisma/schema.prisma` only after the
  corresponding rule is documented in `docs/business-rules/`.
- Record any non-trivial technical decision as a new file in
  `docs/decisions/` (lightweight ADR: context, decision, consequences).
- Document each feature under `docs/features/` once it exists — this
  directory is currently empty because no features have been built.

## Current state

This repository currently contains only development-environment scaffolding:
a Next.js app shell, tooling configuration, an empty Prisma schema, and
documentation structure. No business logic, pricing, authentication, or
domain models have been implemented.

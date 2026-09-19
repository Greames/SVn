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
- **Do not invent pricing.** No price lists, rate tables, or markup
  formulas beyond what's documented as placeholder/illustrative. Real
  pricing comes from supplier websites, not a hard-coded rate card (see
  `docs/decisions/0006-estimator-pricing-source-supplier-websites.md`) —
  when supplier data is unavailable for an item, don't invent a price.
- **Do not assume customer workflows.** Booking flow, quote approval flow,
  payment flow, etc. are undefined until documented.
- **The estimator is approved and in progress** (see
  `docs/decisions/0003-approve-estimator-scope.md`); build against
  `docs/business-rules/estimator-v1-scope.md`, not assumptions. **The 3D
  model is still out of scope** — don't build it until requested.
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
- **Auth:** Auth.js (NextAuth) — chosen, not yet installed/configured.
  Two roles required: internal (admin) and client (isolated to own
  projects/payments only) — see
  `docs/decisions/0005-auth-roles-and-data-isolation.md`. Specific auth
  method/session strategy still open.
- **Testing:** Vitest + Testing Library (unit), Playwright (e2e)
- **Deployment:** Free-tier hosting, provider not yet chosen — see
  `docs/decisions/0004-deployment-target-free-tier.md`. Docker Compose
  covers local Postgres only; keep config provider-neutral.

## Working conventions

- Package manager: `pnpm`.
- Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` before
  considering a change complete.
- New business/domain models go in `prisma/schema.prisma` only after the
  corresponding rule is documented in `docs/business-rules/`.
- Record any non-trivial technical decision as a new file in
  `docs/decisions/` (lightweight ADR: context, decision, consequences).
- Document each feature under `docs/features/` once it exists.
- **When you need a decision from the architect/business owner that isn't
  urgent enough to block on in chat, write it to `docs/questions/`**
  instead of assuming an answer (see `docs/questions/README.md` for the
  template/workflow). Keep working on unblocked pieces while it's open.
  Once answered, act on it and record the outcome in the relevant
  `docs/business-rules/`, `docs/decisions/`, or `docs/features/` file —
  `docs/questions/` is the inbox, not the permanent record.

## Current state

Development-environment scaffolding (Next.js app shell, tooling
configuration, documentation structure) plus an early estimator dashboard
UI prototype (`src/app/page.tsx`, now with Electrical/Plumbing/Painting/
Solar/Summary tabs) — see `docs/features/estimator-v1.md` for what it
does and doesn't do yet. Pricing/engineering values in the prototype are
placeholders, not approved figures — real pricing will come from
supplier websites (not yet built). No persistence (Prisma schema is
still empty) or authentication exist yet, though both now have decided
requirements (deployment: free-tier, provider TBD; auth: two roles with
per-client data isolation) — see `docs/decisions/`.

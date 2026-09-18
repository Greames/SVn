# Technology Stack

Status: approved by business owner on 2026-09-18 (session setup).

## Frontend + Backend

**Next.js 16 (App Router), TypeScript, single full-stack application.**

Rejected alternative: decoupled frontend (Next.js) + separate backend API
(NestJS) in a pnpm-workspace monorepo. Rejected because there is only one
client today; the decoupled setup adds workspace/deployment overhead with
no current benefit. Revisit if a second client (mobile app, partner API)
is ever required — see `docs/decisions/0002-monolith-vs-decoupled.md`.

## Styling

**Tailwind CSS.** Ships with the Next.js scaffold; no additional design
system chosen yet.

## Database

**PostgreSQL 16.** Relational data fits the domain (customers, service
requests, quotes, line items) once those are defined. No schema exists
yet — see `prisma/schema.prisma`.

## ORM

**Prisma.** Type-safe queries matching the TypeScript stack, built-in
migration tooling. Using Prisma 7's config format (`prisma7.config.ts`)
with the classic `prisma-client-js` generator output.

## Authentication

**Auth.js (NextAuth), planned but not installed or configured.** No login
flow, provider, or session strategy has been implemented. This is a stack
decision only, recorded so a later implementer doesn't have to re-litigate
it — the actual auth requirements (who logs in — customers, staff, both;
what data needs protecting) are not yet defined.

## Testing

- **Unit/component:** Vitest + React Testing Library
- **End-to-end:** Playwright
- **API-level:** not yet needed (no API routes with logic exist)

## Deployment

**Undecided.** Docker Compose is configured for local Postgres only.
No production hosting target, CI/CD pipeline, or environment strategy has
been chosen. See `docs/decisions/0001-tech-stack.md` for why this was left
open.

## Package management

**pnpm**, single package (no monorepo/workspaces needed while there is one
app).

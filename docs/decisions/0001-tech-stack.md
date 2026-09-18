# 0001 — Technology Stack Selection

- Status: Accepted
- Date: 2026-09-18

## Context

Project kickoff for the Home Services Platform. Repository was empty; the
development environment needed a stack decision before any scaffolding
could happen. The environment has Node.js, Python, Go, Java, Docker, and
PostgreSQL client tooling available, so the choice was between several
viable ecosystems.

## Decision

Use a TypeScript stack end-to-end:

- Next.js (App Router) for frontend and backend
- PostgreSQL as the database
- Prisma as the ORM
- Auth.js (NextAuth) as the future auth solution
- Vitest + Playwright for testing
- pnpm as the package manager
- Docker Compose for local Postgres only; production deployment target
  deferred

## Rationale

- A form-heavy CRUD app (customers, service requests, quotes) benefits
  from a single typed language across client and server, avoiding drift
  between frontend and backend data shapes.
- Next.js + Prisma + PostgreSQL is a well-supported, widely documented
  combination with low operational complexity for a first product.
- Deferring the production deployment target avoids locking into a cloud
  vendor before the business owner has a preference or requirement.

## Alternatives considered

- **Python (FastAPI) backend + separate frontend:** viable, but doubles
  the type-safety burden (no shared types) for no clear benefit at this
  stage.
- **Go or Java backend:** more operational overhead than needed for a
  first product with no performance-critical requirements yet.

## Consequences

- All future implementation work should stay within this stack unless a
  new ADR supersedes this one.
- Auth, deployment target, and any monorepo split remain open decisions
  and are tracked separately (see `0002-monolith-vs-decoupled.md`).

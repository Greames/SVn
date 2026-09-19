# Home Services Platform

A residential estimation and quotation platform. The initial business
scope covers three service categories:

1. Electrical services
2. Plumbing services
3. Painting services

**Status:** development environment scaffold plus an early estimator
dashboard UI prototype (see
[`docs/features/estimator-v1.md`](./docs/features/estimator-v1.md)). No
persistence, authentication, or real pricing/catalogue data yet — the
prototype's numbers are placeholders. Deployment target, auth roles, and
pricing source are now decided (see `docs/decisions/`), just not built.
See [`CLAUDE.md`](./CLAUDE.md) for the rules governing what gets built
and when.

## Tech stack

| Layer                | Choice                                           |
| -------------------- | ------------------------------------------------ |
| Frontend + Backend   | Next.js (App Router, TypeScript)                 |
| Styling              | Tailwind CSS                                     |
| Database             | PostgreSQL                                       |
| ORM                  | Prisma                                           |
| Auth                 | Auth.js (NextAuth) — planned, not yet configured |
| Unit/component tests | Vitest + Testing Library                         |
| E2E tests            | Playwright                                       |
| Local infra          | Docker Compose (Postgres only)                   |
| Deployment           | Free-tier, provider TBD                          |
| Package manager      | pnpm                                             |

See [`docs/architecture/tech-stack.md`](./docs/architecture/tech-stack.md)
and [`docs/decisions/0001-tech-stack.md`](./docs/decisions/0001-tech-stack.md)
for the rationale, and [`docs/decisions/0002-monolith-vs-decoupled.md`](./docs/decisions/0002-monolith-vs-decoupled.md)
for the full-stack-vs-decoupled decision.

## Getting started

### Prerequisites

- Node.js 22+
- pnpm (`corepack enable` will provision it)
- Docker (for local Postgres)

### Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment variables
cp .env.example .env

# 3. Start local Postgres
docker compose up -d

# 4. Generate the Prisma client
pnpm db:generate

# 5. Run the dev server
pnpm dev
```

The app runs at http://localhost:3000.

### Common commands

```bash
pnpm lint          # ESLint
pnpm typecheck     # TypeScript, no emit
pnpm format        # Prettier, write
pnpm format:check  # Prettier, check only
pnpm test          # Vitest (unit/component)
pnpm test:e2e      # Playwright (end-to-end, requires a running build)
pnpm build         # Production build
```

## Project structure

```
src/
  app/            Next.js App Router pages
  lib/            Shared server-side utilities (e.g. Prisma client)
  test/           Test setup/config
e2e/              Playwright end-to-end tests
prisma/
  schema.prisma   Database schema (currently empty — no models yet)
docs/
  architecture/   System design and stack documentation
  business-rules/ Business rules as supplied by the business owner
  features/       Per-feature documentation
  decisions/      Lightweight ADRs for technical decisions
  questions/      Open questions for the architect/business owner
```

## Scope boundaries

This repository intentionally does **not** yet contain:

- Real pricing/catalogue data (prototype pricing is placeholder only —
  real pricing will come from supplier websites, not a hard-coded rate
  card)
- Persistence for the estimator (Prisma schema is still empty)
- The 3D model tool
- Customer-facing booking/quote workflows
- Authentication (requirements are decided — two roles, per-client data
  isolation — but nothing is installed/configured yet)

These are future work, gated on business-owner-approved requirements in
`docs/business-rules/`. See `docs/decisions/` for the full history,
including
[`0003`](./docs/decisions/0003-approve-estimator-scope.md) (estimator
approved),
[`0004`](./docs/decisions/0004-deployment-target-free-tier.md)
(deployment target),
[`0005`](./docs/decisions/0005-auth-roles-and-data-isolation.md) (auth
roles), and
[`0006`](./docs/decisions/0006-estimator-pricing-source-supplier-websites.md)
(pricing source).

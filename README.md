# Home Services Platform

A residential estimation and quotation platform. The initial business
scope covers three service categories:

1. Electrical services
2. Plumbing services
3. Painting services

**Status:** development environment scaffold only. No application
features, business rules, pricing, or authentication have been built yet.
See [`CLAUDE.md`](./CLAUDE.md) for the rules governing what gets built and
when.

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
  features/       Per-feature documentation (empty until features exist)
  decisions/      Lightweight ADRs for technical decisions
```

## Scope boundaries

This repository intentionally does **not** yet contain:

- Pricing tables or estimation logic
- Electrical/plumbing/painting business rules
- The 3D model tool
- Customer-facing booking/quote workflows
- Authentication flows

These are future work, gated on business-owner-approved requirements in
`docs/business-rules/`.

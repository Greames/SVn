# 0002 — Single Full-Stack App vs. Decoupled Frontend/Backend

- Status: Accepted
- Date: 2026-09-18

## Context

Two architectures were proposed for the initial product:

1. A decoupled monorepo: separate Next.js frontend and NestJS API in a
   pnpm-workspace monorepo (`apps/web`, `apps/api`, `packages/shared`).
2. A single full-stack Next.js application using API routes, no separate
   backend service.

## Decision

Use a single full-stack Next.js application (option 2).

## Rationale (business owner's choice)

There is currently one client (the web app) and no near-term requirement
for a separate consumer of the API (mobile app, partner integration).
The decoupled setup was assessed as adding monorepo/deployment overhead
without a current benefit.

## Consequences

- API logic lives in Next.js Route Handlers under `src/app/api/` (none
  exist yet).
- If a second client becomes a real requirement later, the API layer can
  be extracted into a separate service at that point — this decision does
  not block that path, it just doesn't pre-build for it.
- No `packages/shared` workspace exists; shared types live directly in
  `src/`.

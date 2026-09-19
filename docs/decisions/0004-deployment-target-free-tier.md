# 0004 — Deployment Target: Free-Tier, Provider TBD

- Status: Accepted
- Date: 2026-09-19

## Context

`docs/decisions/0001-tech-stack.md` left the production deployment target
undecided. Raised as `docs/questions/0001-production-deployment-target.md`.

## Decision

Initial deployment will use a free-tier hosting/deployment setup. The
specific provider (frontend host, managed Postgres) is **not yet
selected** — do not invent one.

## Consequences

- Hosting-specific configuration (build settings, env var wiring,
  connection pooling, image optimization) stays provider-neutral until a
  provider is chosen — don't write config that assumes a specific
  platform (e.g. Vercel-only env var names, a specific Postgres host's
  connection string format).
- Docker Compose continues to cover local development only; it's
  unaffected by this decision.
- `docs/architecture/tech-stack.md` updated to reflect "free-tier,
  provider TBD" instead of "undecided."

# 0001 — Production Deployment Target

- Status: Answered
- Date raised: 2026-09-19

## Question

Where does this app eventually get deployed — Vercel + managed Postgres,
self-hosted (VPS/Docker), or something else?

## Context

At initial setup this was deliberately left undecided (see
`docs/decisions/0001-tech-stack.md`); Docker Compose only covers local
Postgres for development. Not currently blocking anything, but CI/CD,
environment variable strategy, and hosting-specific config (image
optimization, DB connection pooling, etc.) all depend on this.

## Answer

Initial deployment will use a **free-tier hosting/deployment setup**. The specific free-tier provider and production database provider are not yet selected; do not invent them. Hosting-specific configuration should remain provider-neutral until a provider is chosen.

# 0001 — Production Deployment Target

- Status: Open
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

(left blank until answered)

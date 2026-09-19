# 0002 — Authentication Requirements

- Status: Open
- Date raised: 2026-09-19

## Question

Who needs to log in — customers, internal staff, both? And when should
Auth.js actually be installed and wired up (now, or once there's data
worth protecting)?

## Context

`docs/architecture/tech-stack.md` names Auth.js (NextAuth) as the chosen
library, but it isn't installed or configured — no login flow exists.
Blocking any feature that needs to know "who is this user" (e.g. saving a
project per customer, staff-only views).

## Answer

(left blank until answered)

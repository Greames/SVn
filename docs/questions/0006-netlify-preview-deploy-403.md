# 0006 — Netlify Preview Deploy Blocked with 403 Forbidden

- Status: Open
- Date raised: 2026-09-20

## Question

Can you check/fix one of the Netlify account settings below so a preview
deploy can go through? This is a one-off tooling blocker, not a business
decision — not related to `docs/decisions/0004-deployment-target-free-tier.md`
(production hosting is still separately undecided; this is just about
getting a throwaway preview link to verify the estimator prototype).

## Context

Asked to run the app and provide a URL to verify. This container can't
expose `localhost` to a browser directly, so with your OK I created a
Netlify site (`home-services-estimator-preview`, ID
`81732c29-0348-466e-ad1b-fd73e23d7e83`, team ID `6a77183fe6d60fb300772b39`)
to host a temporary preview.

Every deploy attempt failed with `403 Forbidden` at the upload step —
tried 3 times: full repo, a clean re-upload without `node_modules`, and
again with a completely fresh auth token. Same error immediately each
time, so it's not a size or stale-token issue — it's a permission/policy
denial.

**Account identified:** user `thulasi.eee@gmail.com` (Google login), team
"thulasi-eee's team" (slug `thulasi-eee`, ID `6a77183fe6d60fb300772b39`),
**Free plan**, 1 member, owner role.

Initial theory was the site's `requiresSSOTeamLogin: true` metadata
flag — **ruled out**: the account fields show
`managed_by_sso_or_directory_sync: false`, `saml_slug: null`,
`enforce_mfa: not_enforced`. This is a personal Free-plan account, not an
SSO/SAML-managed org, so there's no real SSO enforcement to disable.

## Steps to check (in your Netlify account, not something doable from here)

1. **Connected app permissions** (most likely cause now) — Netlify
   dashboard → avatar (top-right) → User settings → Applications (or
   "OAuth Apps"/"Connected apps"). Find the Claude/Claude Code connection
   and check what scopes it's granted — needs deploy/write access to
   sites, not just read/create-site.
2. **Deploys tab on the site** — `app.netlify.com/projects/home-services-estimator-preview`
   → Deploys. If any attempt shows up there (even failed), it'll carry a
   real error message instead of the generic 403 this session sees.
3. **Alternative** — if a different Netlify account (or upgrading/
   reconfiguring this one) resolves it, tell me and I'll retry.

## Answer

(left blank until answered)

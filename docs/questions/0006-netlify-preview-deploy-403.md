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
denial. The site's own metadata shows `requiresSSOTeamLogin: true`,
`whichProjectsRequireSSOTeamLogin: "all"` on that team, which is the most
likely cause, but this can't be confirmed from inside this session.

## Steps to check/fix (in your Netlify account, not something doable from here)

1. **Team SSO policy** — Netlify dashboard → Team settings → Security
   (for the team with ID `6a77183fe6d60fb300772b39`). Check whether
   "require SSO login" is enabled for the team, and whether it applies to
   API/integration deploys specifically. If so, disable it or exempt this
   project.
2. **Connected app permissions** — Netlify dashboard → User settings →
   Applications → OAuth Apps (or similar). Find the Claude/Claude Code
   integration and confirm it has deploy/write scope, not just
   read/create-site scope.
3. **Alternative** — if you have a personal (non-team) Netlify account
   without this policy, tell me and I'll create the preview site there
   instead, sidestepping the team policy entirely.

## Answer

(left blank until answered)

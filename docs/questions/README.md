# Questions for the Architect / Business Owner

When implementation work needs a decision only the architect or business
owner can make — and it's not urgent enough to block on in chat — it goes
here instead of being assumed. Keep working on unblocked pieces while a
question is open.

## Workflow

1. Implementer (Claude) adds a new file: `NNNN-short-title.md`, next
   number after the highest existing one.
2. Fill in **Question** and **Context**. Leave **Answer** empty.
3. Set **Status: Open**.
4. Architect answers directly in the file (fill in **Answer**), and
   changes **Status** to **Answered**.
5. Implementer reads the answer, acts on it, and records the outcome in
   the relevant `docs/business-rules/`, `docs/decisions/`, or
   `docs/features/` file — this folder is the inbox, not the permanent
   record.

## Template

```markdown
# NNNN — Short Title

- Status: Open
- Date raised: YYYY-MM-DD

## Question

One or two sentences, answerable directly.

## Context

Why this is blocking or relevant, what happens by default if unanswered.

## Answer

(left blank until answered)
```

## Open questions

See individual files. Status is tracked per-file, not summarized here, to
avoid this index going stale.

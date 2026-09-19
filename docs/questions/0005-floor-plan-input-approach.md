# 0005 — Floor Plan Input / Detection Approach

- Status: Open
- Date raised: 2026-09-19

## Question

How should floor-plan input actually work in V1 — manual entry of
rooms/dimensions by the client, a real upload with automated
detection (which provider/approach?), or a hybrid (upload + manual
correction)?

## Context

The scope doc's "Floor-plan intelligence" section requires that
uncertain AI-detected dimensions never be treated as exact, but doesn't
specify whether V1 includes automated detection at all or starts manual.
The current prototype's plan view is a static illustrative SVG, not a
real upload/detection flow. This determines a meaningful chunk of
architecture (file storage, possibly a vision/CAD-parsing dependency) so
it's worth deciding deliberately rather than defaulting to "build
detection" by assumption.

## Answer

(left blank until answered)

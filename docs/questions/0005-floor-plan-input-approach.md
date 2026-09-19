# 0005 — Floor Plan Input / Detection Approach

- Status: Answered
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

V1 should use the approved scope's upload-first, assisted approach:
accept a floor plan (PDF/image/CAD when supported), extract or assist with
floor dimensions and room information, generate the starting estimate
from that information, and let the client correct detected values before
calculation. Uncertain detected dimensions must never be silently treated
as exact.

This does not select a specific detection provider or CAD/vision
technology. That implementation choice remains open and must not be
invented from the business requirements alone.

---
id: DF-ECHELON-FOUNDRY-MTH-2026-48F0
title: Proposed standard - cost AI-native enterprise designs with event-level economics that separate design effects from AI effects
status: draft
decision_type: methodology-standard
created: 2026-11-26
updated: 2026-11-26
created_by_agent: claude
confidence: medium
supersedes: []
superseded_by: []
evidence: []
related_documents:
  - DF-ECHELON-FOUNDRY-ENG-2026-6BEA
  - docs/methodology-proposals/README.md
tags: [methodology, economics, costing, ai-native, enterprise-design, proposal]
provenance:
  contributions:
    EXE-20261126T203550039Z-7002e716:
      operations: [created]
      at: 2026-11-26T20:39:43Z
      actor:
        kind: agent
        id: anthropic/claude-code
        provider: anthropic
        model: unknown
        runtime: claude-code
      reason: "WI-0007: progress DAF Phase II implication (XRI-015/XRI-016) as a draft standard"
    EXE-20261126T210049621Z-520ec706:
      operations: [modified]
      at: 2026-11-26T21:00:57Z
      actor:
        kind: agent
        id: anthropic/claude-code
        provider: anthropic
        model: unknown
        runtime: claude-code
      reason: "WI-0008: correct origin repository visibility (daf-landscape is public)"
---

# DF-ECHELON-FOUNDRY-MTH-2026-48F0: Event-level economics as the standard costing method for AI-native enterprise designs

- **Date:** 2026-11-26
- **Status:** draft (proposed standard; not accepted)
- **Decision type:** methodology standard
- **Work item:** WI-0007
- **Origin:** cross-repository implication XRI-015 from the DAF Landscape Phase II research
  (`kemiller2002/daf-landscape`, public, commit `10b92f4`:
  `research/competitive-displacement/19-echelon-foundry-implications.md` section 2,
  `research/competitive-displacement/09-event-level-operating-model.md` section 1,
  `data/registers/cross-repository-implications.csv` row XRI-015, source SRC-063).
- **Authority:** the repository owner approved the Phase II decisions on 2026-11-26 and authorized progression
  of XRI-001..XRI-018 subject to their documented conditions. XRI-015 was registered there as
  "methodology-candidate, proposed (not approved)". Progression here means recording it as a proposed standard
  in its target repository. **Accepting it as canonical Echelon methodology is a separate owner decision.**

## Context

Claims about AI-native enterprises usually report one aggregate saving. That mixes two different causes:
redesigning the work so that people are involved less often, and using AI to make each involvement faster. The
origin study found that, once these were separated, most of its modelled saving came from design, not from AI,
and an adversarial review showed a specific error that aggregate costing hides: deriving the no-AI case from
AI-assisted minutes instead of scaling no-AI minutes by an AI factor.

This method is domain-agnostic. It applies to any operating design that can be described as a set of recurring
operational events.

## Proposed decision

Echelon Foundry costs AI-native enterprise designs at the level of **operational events**, not departments or
headcount. For each event *e* and operating mode *m*, per unit of volume:

```text
human minutes   = frequency(e) × P(touch | m) × minutes per touch(m)
labour          = human minutes / 60 × loaded rate(expertise(e)) / utilisation
expected failure = frequency × P(fail) × failure multiplier(m) × (1 − prevention)
                   × (failure minutes × rate + external failure cost + expected loss)
event cost      = labour + external cost + AI cost + prevention cost + expected failure
```

Rules:

1. **Separate levers.** `P(touch)` (design: rules, exception handling, prevention) and `minutes per touch` (AI
   preparation) are separate parameters, reported separately.
2. **AI scales the no-AI baseline.** The AI factor multiplies no-AI minutes. The no-AI case is never derived by
   dividing AI-assisted minutes.
3. **Failure lifecycle is explicit.** Each event carries its failure probability, the cost of detecting and
   correcting a failure, and its expected loss. Automation is not assumed to reduce failures unless evidence says
   so.
4. **No double counting.** Prevention is applied once; a touch rate already reduced by prevention is rebased
   before prevention is applied.
5. **Uncertainty is ranged.** Each parameter has a low, base and high value and a source; results report ranges,
   not single points.
6. **Attribution is reported.** Results state how much of any modelled saving comes from design levers and how
   much from AI levers.

## Acceptance criteria

- AC-1: a costing that claims to follow this standard lists its events, with frequency, touch probability,
  minutes per touch, rate class, failure parameters and a source for each parameter.
- AC-2: it reports design-lever and AI-lever effects separately.
- AC-3: its AI factor scales no-AI minutes (rule 2), and a reviewer can confirm this from the model inputs.
- AC-4: every parameter has a range and a source, or is marked as an assumption to validate.

## Validation requirements

- VR-1: apply the method to at least one costing outside the origin domain before acceptance, and record whether
  it changed a decision or exposed an error that aggregate costing missed.
- VR-2: an independent reviewer checks rules 2 and 4 on that costing.
- VR-3: models implementing the method meet DF-ECHELON-FOUNDRY-ENG-2026-6BEA (reproducible research models).

## Status on the Phase III ladder

Strategically approved (progression authorized) → **Requirements incorporated** as this draft standard. Not
accepted as canonical methodology; that needs the owner's acceptance after VR-1 and VR-2.

## Reassessment

Supersede or withdraw this record if a second-domain application (VR-1) shows the event decomposition does not
fit, or that its cost of construction exceeds its decision value.

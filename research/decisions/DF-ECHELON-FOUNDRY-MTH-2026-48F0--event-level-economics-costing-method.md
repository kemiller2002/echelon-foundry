---
id: DF-ECHELON-FOUNDRY-MTH-2026-48F0
title: Standard - cost AI-native enterprise designs with event-level economics that separate design effects from AI effects, with zero-based costing and separate incremental cash and fully loaded views
status: accepted
decision_type: methodology-standard
created: 2026-11-26
updated: 2026-11-27
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
    EXE-20261127T023317354Z-c70b896a:
      operations: [modified]
      at: 2026-11-27T02:34:09Z
      actor:
        kind: agent
        id: anthropic/claude-code
        provider: anthropic
        model: unknown
        runtime: claude-code
      reason: "WI-0009: record owner ratification (2026-11-27, PR #13): status draft -> accepted; validation gates preserved"
---

# DF-ECHELON-FOUNDRY-MTH-2026-48F0: Event-level economics as the standard costing method for AI-native enterprise designs

- **Date:** 2026-11-26
- **Status:** accepted (owner-ratified standard, 2026-11-27); validation gates VR-1..VR-3 preserved and open
- **Owner ratification:** 2026-11-27. The owner confirmed in session the direction posted on
  echelon-foundry PR #13: "Owner approves both draft standards for ratification, preserving validation gates.
  Extend event-level costing with zero-based costing: every expense requires a justified obligation, workload or
  capacity trigger; separate incremental cash and fully loaded economic costs."
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
  in its target repository. The owner then accepted it as Echelon methodology on 2026-11-27 (see Owner
  ratification above).

## Context

Claims about AI-native enterprises usually report one aggregate saving. That mixes two different causes:
redesigning the work so that people are involved less often, and using AI to make each involvement faster. The
origin study found that, once these were separated, most of its modelled saving came from design, not from AI,
and an adversarial review showed a specific error that aggregate costing hides: deriving the no-AI case from
AI-assisted minutes instead of scaling no-AI minutes by an AI factor.

This method is domain-agnostic. It applies to any operating design that can be described as a set of recurring
operational events.

## Decision

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

7. **Zero-based costing (owner amendment, 2026-11-27).** No cost is carried forward or assumed from a prior
   budget, headcount or department. Every expense, labour or otherwise, is included only with a stated
   justification: the **obligation** (legal, contractual or control requirement), **workload** (event volume
   times minutes) or **capacity trigger** (a threshold at which a fixed cost becomes necessary) that causes it.
   An expense with no stated trigger is excluded and listed as unjustified.
8. **Two cost views (owner amendment, 2026-11-27).** Results report **incremental cash** (cash the design
   actually causes) separately from **fully loaded economic cost** (including the cost of shared resources and
   unpaid or founder time). Shared costs enter the fully loaded view only through an explicit, stated
   allocation. The two views are never summed into one unlabelled figure.

## Acceptance criteria

- AC-1: a costing that claims to follow this standard lists its events, with frequency, touch probability,
  minutes per touch, rate class, failure parameters and a source for each parameter.
- AC-2: it reports design-lever and AI-lever effects separately.
- AC-3: its AI factor scales no-AI minutes (rule 2), and a reviewer can confirm this from the model inputs.
- AC-4: every parameter has a range and a source, or is marked as an assumption to validate.
- AC-5: every expense line names its obligation, workload or capacity trigger (rule 7).
- AC-6: incremental cash and fully loaded cost are reported separately, with each shared-cost allocation stated
  (rule 8).

## Validation requirements

- VR-1: apply the method to at least one costing outside the origin domain before acceptance, and record whether
  it changed a decision or exposed an error that aggregate costing missed.
- VR-2: an independent reviewer checks rules 2 and 4 on that costing.
- VR-3: models implementing the method meet DF-ECHELON-FOUNDRY-ENG-2026-6BEA (reproducible research models).

## Status on the Phase III ladder

Strategically approved (progression authorized 2026-11-26) → **Requirements incorporated**: accepted as an
Echelon Foundry methodology standard by the owner on 2026-11-27. **Not validated:** VR-1..VR-3 remain open
gates; their results may lead to a superseding record. Acceptance authorizes use of the method, not any
expenditure.

## Reassessment

Supersede or withdraw this record if a second-domain application (VR-1) shows the event decomposition does not
fit, or that its cost of construction exceeds its decision value.

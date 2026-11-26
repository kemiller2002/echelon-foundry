---
id: DF-ECHELON-FOUNDRY-ENG-2026-6BEA
title: Proposed engineering standard - durable research and economic models are F# programs with byte-identical reproduction and register validation commands
status: draft
decision_type: engineering-standard
created: 2026-11-26
updated: 2026-11-26
created_by_agent: claude
confidence: high
supersedes: []
superseded_by: []
evidence: []
related_documents:
  - DF-ECHELON-FOUNDRY-MTH-2026-48F0
  - docs/methodology-proposals/README.md
tags: [engineering-standards, research-models, fsharp, reproducibility, model-validation, proposal]
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
---

# DF-ECHELON-FOUNDRY-ENG-2026-6BEA: Reproducible F# research models

- **Date:** 2026-11-26
- **Status:** draft (proposed standard note; not accepted)
- **Decision type:** engineering standard
- **Work item:** WI-0007
- **Origin:** cross-repository implication XRI-016 (`kemiller2002/daf-landscape`, private, commit `10b92f4`:
  `research/competitive-displacement/19-echelon-foundry-implications.md` section 2,
  `research/competitive-displacement/model/README.md`, `data/registers/cross-repository-implications.csv` row
  XRI-016, source SRC-063). XRI-016 was registered as "standard-note, informational": it records existing
  practice rather than introducing new practice.
- **Authority:** owner approval of the Phase II decisions and authorized progression of XRI-001..XRI-018,
  2026-11-26. Accepting this as a canonical Echelon engineering standard is a separate owner decision.

## Context

Echelon's standing preference is that new durable modelling and validation software is written in F# in a
functional style (pure functions, immutable data, I/O at the edge). The origin research model already
implemented that preference and added two commands that made its results auditable: one that regenerates every
output and proves it is byte-identical to the committed outputs, and one that validates the research registers
and their cross-references.

## Proposed decision

A research or economic model whose outputs support a recorded decision is built to these rules:

1. **Language and structure.** F# on .NET. A pure core (parsing, sampling, computation, rendering, validation)
   and I/O only in the program entry point.
2. **Determinism.** Stochastic methods use a fixed, recorded seed. Output ordering and number formatting are
   culture-invariant and deterministic.
3. **`check` command.** Regenerates every committed output from the committed inputs into a temporary location
   and fails unless each output is **byte-identical** to the committed file.
4. **`validate` command.** Checks the model's registers: required fields, identifier uniqueness, that every
   cross-reference resolves, and that every cited deliverable exists.
5. **Tests.** Unit tests cover the pure core, including at least one test per published headline figure.
6. **Pinned toolchain.** The SDK version is pinned so `check` is reproducible on another machine.

## Acceptance criteria

- AC-1: a conforming model has `check` and `validate` commands that exit non-zero on any mismatch or broken
  reference.
- AC-2: `check` passes on a clean checkout on a second machine with the pinned SDK.
- AC-3: the model's README states how to run both commands and what each proves.

## Validation requirements

- VR-1: run `check` and `validate` in CI (or record why CI is unavailable) for each conforming model.
- VR-2: a deliberate one-byte change to a committed output makes `check` fail (negative test).
- VR-3: a deliberately broken cross-reference makes `validate` fail (negative test).

## Status on the Phase III ladder

Strategically approved (progression authorized) → **Requirements incorporated** as this draft standard note.
Not accepted as canonical; it codifies practice already demonstrated in the origin model.

## Scope note

Byte-identical reproduction proves computational reproducibility only. It does not validate the model's
assumptions or its fit to reality; that needs the economic model validation proposed in
`docs/methodology-proposals/README.md`.

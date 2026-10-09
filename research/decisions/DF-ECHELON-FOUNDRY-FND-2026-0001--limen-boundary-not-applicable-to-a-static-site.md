---
id: DF-ECHELON-FOUNDRY-FND-2026-0001
title: The Limen boundary is not applicable to the Echelon Foundry site, a static marketing site with no engine, kernel or WebAssembly
status: accepted
decision_type: applicability
created: 2026-10-09
updated: 2026-10-09
created_by_agent: claude
confidence: high
supersedes: []
superseded_by: []
evidence: []
related_documents:
  - limen.config.json
  - .echelon/limen.json
  - .github/workflows/limen-verify.yml
  - package.json
  - build.js
  - contact.js
tags: [governance, foundations, limen, applicability]
provenance:
  contributions:
    EXE-20261009T003517293Z-62e2d751:
      operations: [created]
      at: 2026-10-09T00:36:39.006Z
      actor:
        kind: agent
        id: anthropic/claude-code
        provider: anthropic
        model: unknown
        runtime: claude-code
      reason: "Declare the Limen boundary not applicable while setting up Limen 0.9.0"
---

# DF-ECHELON-FOUNDRY-FND-2026-0001: The Limen boundary is not applicable to the Echelon Foundry site

- **Date:** 2026-10-09
- **Status:** accepted
- **Decision type:** applicability declaration, with a trigger
- **Work item:** WI-0005
- **Authority:** portfolio coordinator instruction for the Limen 0.9.0
  rollout: set Limen up with `limen init` at 0.9.0, using the boundary the site
  actually has.

## Context

`package.json` carried `@echelon-foundry/typescript-wasm-kernel` 0.6.2, which
is Limen's name before 0.7.0. It also had an `echelon:limen:verify` script.
Limen itself was never initialized: there was no `.echelon/limen.json` and no
`limen.config.json`. As a result, the script failed with LIMEN001 under both
0.6.2 and 0.9.0. Nothing else used the package.

The site is:

- HTML pages under `src/`, assembled at build time by `build.js` into `dist/`
  and published to GitHub Pages;
- one browser script, `contact.js`, which posts the contact form to an inquiry
  worker.

There is no browser application, no application state, no engine/kernel split
and no WebAssembly.

## Decision

1. Limen 0.9.0 is installed with `limen init`. Its tool-owned
   `limen-verify.yml` runs `limen verify --strict` in CI at the recorded
   version.
2. `limen.config.json` declares the boundary not applicable, using Limen's
   supported `"boundary": { "notApplicable": { "rationale": … } }`. The
   default that `init` writes (`src/engine`, `src/kernel`) would describe a
   boundary the site does not have.
3. The stale `typescript-wasm-kernel` 0.6.2 devDependency is removed.
   `echelon:limen:verify` runs the version that `.echelon/limen.json` records
   through `npx`, as `limen-verify.yml` does. It therefore needs no local
   install and cannot drift from the installation on a future
   `limen upgrade`.

Verification reports verdict `not-applicable`, not `passed`.

## Trigger

Limen becomes applicable when the site gains application state that a script
manages, or any WebAssembly. At that point, replace the declaration with real
engine and kernel paths and supersede this record. A progressive-enhancement
form script like `contact.js` does not trigger it.

## Consequences

- `limen verify --strict` and `npm run echelon:limen:verify` pass, with
  verdict `not-applicable`.
- Unchanged by this record: `npm install` fails on main. The
  `@echelon-foundry/communication-engineering` 1.0.0 and
  `@echelon-foundry/print-components` 0.3.0 devDependencies are not published
  on npm. That is outside Limen and is left for its own work item.

# Methodology improvement proposals (DAF Landscape Phase III, Stage I)

Status: **proposals, not accepted**. Created 2026-11-26 under work item WI-0007.

The owner's approval of twelve strategic decisions in the DAF Landscape research (2026-11-26) exposed several
needs that are not specific to donor-advised funds. This page evaluates them against what Praxis, Clarity and EDF
already provide, and records proposals. Nothing here is DAF-specific logic, and nothing here changes Clarity or
EDF: those repositories are read-only for this initiative, so their proposals are recorded here for their owners.

Origin: `kemiller2002/daf-landscape` (private) commit `10b92f4`, `research/competitive-displacement/` reports
19 and 23 and `data/registers/cross-repository-implications.csv` (XRI-015..XRI-018).

## Evaluation

| Need exposed | Already provided | Gap | Proposal |
|---|---|---|---|
| Decision approval distinct from implementation authorization (a staged authority ladder that never auto-advances) | Praxis `DF-` statuses `draft/review/accepted/superseded/withdrawn`; Clarity decision record has GO conditions, boundaries and a Commit/Experiment/Delay/Escalate outcome | "accepted" conflates "direction approved" with "authorized to spend or build"; adopters invent ad hoc fields | Praxis `RQ-ROS-2026-6C17`; Clarity `MP-CLARITY-2026-01` |
| Conditional decision gates | Clarity triggers and GO conditions (prose) | Not machine-readable in Praxis records; gate satisfaction not recorded separately from approval | Praxis `RQ-ROS-2026-6C17` |
| Superseded decisions | Praxis reciprocal `supersedes`/`superseded_by`, validated (`framework/protocols/SUPERSESSION.md`) | Active records may still cite a superseded or withdrawn decision without warning | Praxis `RQ-ROS-2026-0863` (citation check) |
| Evidence freshness, assumption monitoring, thesis invalidation | Clarity triggers, failure detection and review date (prose); EDF claim and confidence policy | No machine-readable review date, evidence as-of date, monitored assumptions or invalidation conditions on Praxis decisions; nothing reports a decision past review | Praxis `RQ-ROS-2026-0863`; EDF `MP-EDF-2026-01` |
| Research-to-requirements traceability and cross-repository decision propagation | Praxis `related_documents`, requirement verification manifest (`RQ-ROS-2026-A037`), work groups | No record type for "decision X in repository A implies change Y in repository B", with a disposition, and no check that propagated records cite an immutable source | Praxis `RQ-ROS-2026-6D60` |
| Economic model validation | Reproducibility standard proposed in `DF-ECHELON-FOUNDRY-ENG-2026-6BEA` | Reproducibility is not validity: assumptions, calibration and back-testing are not covered | `MP-EF-2026-01` below |
| Automated consistency checks | `praxis validate`, `praxis registry check` | Covered for structure; the new fields above need checks | Included in each Praxis requirement |
| Continuous adversarial review | Praxis PR #302 (open) adds independent adversarial review of **improvement proposals** (PRX-LEARN-001/002); Clarity has adversarial-case research | No standing adversarial challenge of **decisions** before acceptance and at review | Clarity `MP-CLARITY-2026-02` |

## Proposals for Clarity (not pushed; for the Clarity owner)

### MP-CLARITY-2026-01: Separate the authority stages of a decision

**Problem.** The Clarity decision record ends in a single Commitment ("Commit"). In practice an owner often
approves a direction while explicitly withholding spending, contracting or deployment until evidence arrives.
Recording both as "Commit" invites a later reader to treat direction as authorization.

**Proposal.** Add an "Authority stage" field to the decision record with an ordered ladder: direction approved;
requirements incorporated; evidence conditions met; implementation authorized; implemented; outcome validated.
Each stage after the first names its own evidence and, from "implementation authorized" on, its own owner act.
Stages never advance automatically. Section 9 (Decision Boundaries) states which stage the current authority
covers.

**Acceptance.** A worked example shows a decision approved for direction with spending withheld; a reviewer can
tell from the record alone what is and is not authorized.

### MP-CLARITY-2026-02: Standing adversarial challenge of decisions

**Problem.** Adversarial review improved the origin research materially (it materially changed several headline figures),
but it ran once, at the end. Decisions are accepted and reviewed later without a standing challenge.

**Proposal.** Add an "Adversarial challenge" section: who challenged the decision (not its proposer), the strongest
case against it, which challenges changed it, and which remain open. Repeat the challenge at each review date
and whenever a monitored assumption crosses its threshold.

**Acceptance.** The challenger is a different actor from the proposer; open challenges are listed at review.

## Proposal for EDF (not pushed; for the EDF owner)

### MP-EDF-2026-01: Diagnosis currency when a diagnosis feeds a decision

**Problem.** EDF is applied to observed outcomes, and its claim policy already separates evidence classes well.
When a diagnosis is used as the premise of a decision, the decision inherits it without knowing how current the
diagnosis is or what observation would overturn it.

**Proposal.** When an EDF diagnosis is exported for use in a decision, include: the evidence as-of date, the
observed record set it covers, and the observations that would invalidate the diagnosis. Decisions can then
monitor those observations (see Praxis `RQ-ROS-2026-0863`).

**Acceptance.** A diagnosis export carries the three fields; a consuming decision can cite them.

## Proposal for Echelon Foundry methodology

### MP-EF-2026-01: Economic model validation beyond reproducibility

**Problem.** A byte-identical model can still be wrong. The origin research's own revisions moved its central
estimates materially once adversarial reviewers changed assumptions.

**Proposal.** A model that supports a capital or pricing decision also records: an assumption register with
source, range and owner per parameter; sensitivity of each headline result to each parameter; correlated
adverse stress cases; reconciliation with any prior estimate of the same quantity; and, once operating data
exists, a back-test of predicted against observed values with the tolerance that triggers re-estimation.

**Acceptance.** Each decision-supporting model has the five items, or records why one is not applicable.

## Status

All proposals are at "proposed". None is accepted by its framework's owner.

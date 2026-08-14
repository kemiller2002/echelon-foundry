Echelon Foundry Color System Audit and Remediation Agent

Mission

Audit the Echelon Foundry website and bring its visual color usage into conformance with the approved Echelon Foundry brand palette and accessibility rules.

Do not simply replace colors based on visual similarity.

Treat the palette as a semantic design system.

Each color has approved purposes, prohibited purposes, and legal combinations.

The goals are:

1. Preserve the Echelon Foundry visual identity.
2. Establish consistent semantic color usage throughout the site.
3. Meet or exceed WCAG 2.2 Level AA color and contrast requirements.
4. Prevent inaccessible color combinations from being introduced.
5. Avoid communicating meaning through color alone.
6. Centralize color definitions so future changes can be made safely.
7. Minimize unnecessary CSS complexity and dependencies.
8. Prefer native CSS and existing project architecture over adding libraries.

⸻

1. Approved Echelon Foundry Palette

These are the canonical brand colors.

Foundry Charcoal
#202421
Forged Iron
#3A403C
Bone / Parchment
#F2EFE7
Oxide Bronze
#905831
Verdigris
#47756B
Carbon
#171A18
Graphite
#686D68
Stone
#E3E0D7

Do not introduce near-duplicate brand colors unless there is a documented accessibility or functional need.

Do not silently alter these canonical values.

⸻

2. Semantic Color Roles

Colors must be referenced conceptually wherever practical.

Recommended CSS variables:

:root {
  /* Core brand colors */
  —ef-foundry-charcoal: #202421;
  —ef-forged-iron: #3A403C;
  —ef-parchment: #F2EFE7;
  —ef-oxide-bronze: #905831;
  —ef-verdigris: #47756B;
  —ef-carbon: #171A18;
  —ef-graphite: #686D68;
  —ef-stone: #E3E0D7;
  /* Semantic roles */
  —ef-text-primary: var(—ef-carbon);
  —ef-text-heading: var(—ef-foundry-charcoal);
  —ef-text-secondary: var(—ef-graphite);
  —ef-surface-primary: var(—ef-parchment);
  —ef-surface-secondary: var(—ef-stone);
  —ef-surface-dark: var(—ef-foundry-charcoal);
  —ef-surface-dark-secondary: var(—ef-forged-iron);
  —ef-accent-primary: var(—ef-oxide-bronze);
  —ef-accent-secondary: var(—ef-verdigris);
}

Prefer semantic variables in components rather than raw hexadecimal values.

For example:

.article {
  color: var(—ef-text-primary);
  background: var(—ef-surface-primary);
}

Prefer this over:

.article {
  color: #171A18;
  background: #F2EFE7;
}

⸻

3. Primary Visual Hierarchy

The visual system should be dominated by:

Parchment
+
Foundry Charcoal

These form the core identity.

Accent colors should remain subordinate.

Approximate visual distribution across a typical page:

60–70%  Parchment / light neutral surfaces
20–30%  Charcoal / dark surfaces and typography
5–8%    Oxide Bronze
2–5%    Verdigris

This is guidance rather than a mathematical requirement.

Do not make Bronze and Verdigris dominant page colors.

Their scarcity is part of the visual system.

⸻

4. Background Rules

Primary light background

Use:

Bone / Parchment
#F2EFE7

This is the preferred background for:

* body content
* editorial pages
* reports
* articles
* case studies
* documentation
* long-form sections
* cards when a warmer surface is desired

⸻

Secondary light background

Use:

Stone
#E3E0D7

Use for:

* cards
* secondary panels
* alternating page sections
* callout areas
* table backgrounds
* subtle visual grouping

Do not allow Stone to replace Parchment as the dominant site background.

⸻

Primary dark background

Use:

Foundry Charcoal
#202421

Use for:

* hero sections
* navigation areas when dark treatment is appropriate
* footers
* section breaks
* high-emphasis panels
* selected cards
* inverse layouts

⸻

Secondary dark surface

Use:

Forged Iron
#3A403C

Use for:

* secondary dark panels
* nested surfaces
* subdued dark backgrounds
* borders or separators in dark compositions

Do not use multiple almost-black values arbitrarily.

⸻

5. Text Rules

Primary body text

Use:

Carbon
#171A18

Preferred background:

Parchment
#F2EFE7

Carbon is the default body-copy color.

Use it for:

* paragraphs
* lists
* long-form content
* form labels
* table text
* navigation text on light surfaces
* legal/disclaimer text
* captions where size permits

⸻

6. Heading Rules

Preferred heading colors:

Foundry Charcoal
#202421
or
Carbon
#171A18

Forged Iron may also be used when a softer hierarchy is useful.

Use:

Forged Iron
#3A403C

for:

* secondary headings
* section labels
* less-prominent titles

Do not use accent colors for every heading.

Accent headings should remain exceptional.

⸻

7. Secondary Text

Graphite:

#686D68

may be used on Parchment for secondary text.

Its contrast against Parchment is approximately:

4.60:1

This passes WCAG AA for normal text, but only narrowly.

Therefore:

Graphite is acceptable for:

* metadata
* dates
* descriptive labels
* supporting copy
* secondary navigation
* captions of normal readable size

Graphite should NOT be used for:

* extremely small text
* low-opacity text
* disabled-looking body copy
* text over photographs
* text on Stone unless contrast is independently verified

Never reduce opacity on Graphite text without recalculating the resulting contrast.

⸻

8. Oxide Bronze Rules

Canonical Bronze:

#905831

Bronze is the primary brand accent.

Its primary purpose is emphasis, not routine text.

Approved Bronze uses

Use Bronze for:

* section markers
* large display headings where contrast passes
* decorative rules
* borders
* graphic accents
* selected icons
* pull-quote details
* numbers or metrics
* active-state accents
* branded visual elements
* large links where accessibility requirements are met
* emphasis against light backgrounds

Bronze against Parchment has approximately:

5.04:1

Therefore Bronze on Parchment is suitable for normal text under WCAG AA.

Still prefer Carbon or Charcoal for long-form reading.

⸻

Bronze on Stone

Approximate contrast:

4.39:1

This does NOT reach the 4.5:1 requirement for ordinary-size text.

Therefore:

DO NOT use Bronze normal-size text on Stone.

It may be used for sufficiently large text if the applicable 3:1 threshold is satisfied.

⸻

Bronze on Charcoal

Approximate contrast:

2.71:1

This is not sufficient for meaningful UI boundaries or text.

Therefore:

DO NOT use Bronze text on Foundry Charcoal.

DO NOT rely on Bronze against Charcoal for:

* button borders
* focus outlines
* important icons
* control boundaries
* status indicators
* meaningful graphical distinctions

Bronze may appear decoratively on Charcoal only when the element conveys no necessary information.

⸻

Bronze on Carbon

Approximate contrast:

3.03:1

This can satisfy some non-text or large-text cases but should not be used for normal text.

Avoid this combination except where specifically justified and tested.

⸻

9. Verdigris Rules

Canonical Verdigris:

#47756B

Verdigris is the secondary accent.

It should be used more sparingly than Bronze.

Use it primarily for:

* selected interface accents
* supporting graphics
* diagrams
* informational states
* validated/confirmed concepts
* secondary branded highlights
* selected links or interactive elements where contrast passes
* visual counterpoint to Bronze

⸻

Verdigris on Parchment

Approximate contrast:

4.54:1

This technically passes WCAG AA for normal text.

However, the margin is small.

Therefore:

Verdigris may be used for limited normal-size text on Parchment, but should not become the default body-text color.

Do not:

* reduce its opacity
* use an excessively thin font weight
* use it at very small sizes
* place it over textures or photographs without recalculation

Prefer it for headings, labels, links, icons, and short text.

⸻

Verdigris on Stone

Approximate contrast:

3.95:1

Do not use Verdigris for normal text on Stone.

Large text and appropriate non-text elements may be acceptable where the 3:1 requirement applies.

⸻

Verdigris on Charcoal

Approximate contrast:

3.01:1

This combination is suitable only in uses where a 3:1 threshold applies.

Do not use Verdigris as normal-size body text on Charcoal.

⸻

10. Dark-Surface Text

When the background is Foundry Charcoal or Forged Iron, use light text.

Preferred:

Parchment
#F2EFE7

Use Parchment for:

* headings
* body copy
* navigation
* labels
* button text
* links where appropriate

Stone may be used when adequate contrast remains.

The dark/light contrast combinations should be strongly preferred because they provide generous accessibility margins.

⸻

11. Links

Links must be identifiable without relying exclusively on color.

For inline body links, use at least one additional persistent visual indicator such as:

* underline
* border treatment
* icon
* typographic distinction

Preferred default:

a {
  color: var(—ef-oxide-bronze);
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

A hover-only underline is not sufficient when the link otherwise depends on color alone.

Do not remove standard link affordances merely for aesthetic reasons.

⸻

12. Buttons

Buttons must have clearly distinguishable states.

Required states:

default
hover
focus-visible
active
disabled

Each state must remain understandable without color alone where state meaning matters.

⸻

Primary light-background button

Preferred:

Background: Foundry Charcoal
Text:       Parchment

Example:

.button-primary {
  background: var(—ef-foundry-charcoal);
  color: var(—ef-parchment);
}

This is the preferred default CTA.

⸻

Secondary button

Preferred treatment:

Background: transparent or Parchment
Text:       Foundry Charcoal
Border:     Foundry Charcoal

⸻

Accent button

Bronze may be used as a button background only after checking text contrast.

Do not assume Parchment or white is automatically accessible over Bronze.

Calculate the actual foreground/background contrast.

If the required contrast does not pass, choose Carbon/Charcoal text or another approved treatment.

⸻

13. Focus Indicators

Keyboard focus must always be visible.

Never use:

outline: none;

unless an accessible custom replacement is provided.

Focus indicators must be clearly distinguishable from surrounding colors.

Target at least:

3:1

contrast between the focus indicator and adjacent colors where WCAG non-text contrast requirements apply.

Where one palette color cannot provide sufficient contrast on both light and dark surfaces, use context-specific focus treatments.

Examples include:

dark outline + light gap
or
light outline + dark gap

Do not force Bronze to be the universal focus color.

Accessibility takes precedence over palette purity.

⸻

14. Form Fields

Inputs must remain visually identifiable without relying solely on background color.

Required characteristics:

* visible boundary
* adequate boundary contrast
* explicit labels
* visible focus state
* text contrast of at least 4.5:1 for normal-size text
* error state not communicated by color alone

Preferred light treatment:

Background: Parchment or a neutral light surface
Text: Carbon
Border: Forged Iron or another passing boundary color

Do not use Graphite borders if they fail required adjacent contrast.

Test actual combinations.

⸻

15. Validation and Error States

Do not assign semantic meaning exclusively as:

Verdigris = success
Bronze = warning
another color = error

Every state must also have another indicator such as:

* icon
* text label
* heading
* symbol
* shape
* pattern

Examples:

✓ Validated
! Requires Review
× Error

Color may reinforce meaning but may not be its only carrier.

⸻

16. Charts and Data Visualization

Do not construct charts where users must distinguish data series solely by Bronze versus Verdigris or other hues.

Use combinations of:

* labels
* direct annotation
* patterns
* line styles
* markers
* shapes
* position
* accessible legends

If adjacent chart regions communicate information, test their contrast requirements.

Do not assume visually different hues have sufficiently different luminance.

⸻

17. Icons

Decorative icons are exempt from information-bearing contrast requirements when they convey no information.

Meaningful icons must have adequate contrast.

Examples:

search
menu
close
warning
status
navigation arrows
form controls

Target at least 3:1 where WCAG non-text contrast applies.

Do not make important icons Bronze on Charcoal.

⸻

18. Borders and Dividers

Decorative separators may use subtle palette colors.

Functional boundaries must be sufficiently distinguishable.

Examples of functional boundaries include:

* text input borders
* checkboxes
* radio buttons
* selected tabs
* active navigation indicators
* chart boundaries
* focus indicators

Do not apply a low-contrast border merely because it looks elegant.

Distinguish:

decorative boundary
from
functional boundary

before evaluating it.

⸻

19. Navigation

Light navigation:

Background: Parchment
Primary text: Carbon or Charcoal
Accent/active marker: Bronze

Dark navigation:

Background: Foundry Charcoal
Text: Parchment

Do not use Bronze normal-size navigation text directly on Charcoal.

For active navigation states, use:

* typography
* underline
* border
* shape
* position

in addition to color when necessary.

⸻

20. Footer

Preferred:

Background: Foundry Charcoal
Primary text: Parchment
Secondary text: a verified accessible light treatment

Bronze may be used for decorative details.

Do not use Bronze as ordinary footer copy on Charcoal.

⸻

21. Hero Sections

Preferred dark hero:

Background: Foundry Charcoal
Headline: Parchment
Body: Parchment or another verified light neutral
Accent decoration: Bronze
Secondary accent: Verdigris where appropriate

Preferred light hero:

Background: Parchment
Headline: Foundry Charcoal
Body: Carbon
Accent: Bronze
Secondary accent: Verdigris

Do not overuse both accents simultaneously.

⸻

22. Cards

Preferred light card:

Background: Stone
Heading: Foundry Charcoal
Body: Carbon

Check Graphite, Bronze, and Verdigris individually before using them as normal text on Stone.

Preferred inverse card:

Background: Foundry Charcoal
Heading: Parchment
Body: Parchment

⸻

23. Decorative Elements

Brand accents that convey no content may use Bronze or Verdigris more freely.

Examples:

* horizontal rules
* background textures
* geometric forms
* visual flourishes
* section decorations
* large watermark graphics

Decorative usage must not reduce readability of content layered above it.

⸻

24. Opacity Rule

Never assume a canonical color remains accessible after opacity is applied.

For example:

color: rgba(..., 0.7);

changes the effective rendered color based on the background.

Whenever opacity affects:

* text
* controls
* icons
* focus indicators
* meaningful graphics

calculate contrast using the resulting composited color.

Prefer solid approved colors whenever possible.

⸻

25. Gradients

Do not introduce gradients merely for visual interest.

If a gradient already exists:

1. Determine whether it is necessary.
2. Prefer replacing it with a solid brand color where appropriate.
3. If text overlays a gradient, calculate contrast against the lowest-contrast point beneath the text.
4. Do not claim accessibility based on an average gradient color.

⸻

26. Photographic Backgrounds

Do not place text directly over photographs unless readability remains consistently accessible.

Preferred solutions:

* separate text from the photograph
* add a solid panel
* use an opaque overlay with verified contrast
* reposition content

Do not rely on text shadows to solve insufficient contrast.

⸻

27. Prohibited Patterns

Flag these as violations or design-system problems:

Raw arbitrary hex colors scattered throughout components
Near-duplicate grays without documented purpose
Bronze normal text on Charcoal
Bronze normal text on Stone
Verdigris normal text on Stone
Verdigris normal text on Charcoal
Accent colors used for long paragraphs
Opacity used to create secondary text without contrast validation
Color-only error states
Color-only success states
Color-only link identification
Invisible keyboard focus
outline: none without replacement
Text placed over variable imagery without robust contrast
Using brand colors where accessibility requires a different treatment
Multiple slightly different versions of approved palette colors

⸻

28. Accessibility Thresholds

Use the following minimums.

Normal text

Minimum:

4.5:1

⸻

Large text

Minimum:

3:1

Use WCAG definitions for what qualifies as large text.

Do not arbitrarily classify visually prominent text as large.

⸻

Meaningful non-text UI and graphical objects

Target:

3:1

against adjacent colors when WCAG 1.4.11 applies.

⸻

29. Prefer Safety Margin Over Bare Minimum

Passing by a tiny amount is acceptable technically but fragile operationally.

Where practical:

Prefer ≥ 5:1 for normal text.

Especially for:

* small text
* thin fonts
* secondary copy
* responsive rendering
* unusual display conditions

Do not unnecessarily change the brand palette merely to maximize ratios.

Instead choose better semantic combinations.

⸻

30. Existing Site Audit Procedure

Perform the following steps.

Step 1 — Discover colors

Inspect:

* CSS
* SCSS
* CSS modules
* styled components if present
* inline styles
* HTML
* SVG
* JavaScript/TypeScript style declarations
* theme files
* design-token files

Extract every:

hex
rgb()
rgba()
hsl()
hsla()
named CSS color
gradient
CSS custom property

⸻

Step 2 — Normalize

Convert detected colors to canonical RGB/hex representation for comparison.

Identify:

* exact approved colors
* near matches
* duplicates
* unused definitions
* arbitrary colors
* third-party component colors

Do not automatically replace third-party functional colors before understanding their purpose.

⸻

Step 3 — Classify usage

For every color occurrence determine whether it is:

text
background
border
icon
graphic
decorative
interactive
status
focus
chart/data

Then determine its semantic role.

Do not judge accessibility from a color value without knowing what it is displayed against.

⸻

Step 4 — Determine foreground/background pairs

Calculate actual rendered color combinations.

Account for:

* inheritance
* transparency
* opacity
* nested surfaces
* gradients
* hover states
* focus states
* disabled states
* media queries
* dark sections
* responsive changes

⸻

Step 5 — Calculate WCAG contrast

Use the WCAG relative luminance algorithm.

Do not approximate contrast visually.

Record:

foreground
background
contrast ratio
element type
font size
font weight
required threshold
pass/fail

⸻

31. Remediation Strategy

When a violation is found, resolve it in this order:

First choice

Use a different approved semantic palette combination.

Second choice

Change the component treatment.

Examples:

* underline a link
* add an icon
* change background
* change border
* use Charcoal instead of Graphite
* use Parchment instead of Bronze text

Third choice

Introduce an accessibility-specific semantic token if absolutely necessary.

Do NOT immediately invent a new brand color.

Any new token must include:

reason
intended use
contrast requirement
approved backgrounds
why existing colors cannot satisfy it

⸻

32. Architecture Rule

Centralize the palette.

Do not leave duplicated literal values scattered throughout the application.

Prefer:

one palette
+
semantic tokens
+
component styles

rather than:

hundreds of independently chosen colors

⸻

33. Dependency Rule

Do not add a third-party color, theme, accessibility, or design-system library merely to perform this migration.

Use:

* native CSS
* existing project tooling
* small local utilities where necessary

A dependency may only be added if:

1. the capability is materially difficult to implement correctly,
2. the existing platform cannot reasonably provide it,
3. the dependency materially reduces risk,
4. its cost and maintenance burden are justified.

Document any proposed dependency before adding it.

⸻

34. Preserve Existing Functionality

Do not redesign unrelated layout or interaction behavior merely because a component is being recolored.

The primary task is:

color-system migration
+
accessibility remediation

Avoid unrelated refactoring unless it is necessary to safely complete the work.

⸻

35. Required Output Before Modification

Produce an audit summary:

Echelon Foundry Color Audit
Files inspected:
...
Colors discovered:
...
Approved palette colors already present:
...
Non-palette colors:
...
Contrast failures:
...
Semantic misuse:
...
Color-only information problems:
...
Focus indicator problems:
...
Recommended changes:
...

Classify findings:

CRITICAL
HIGH
MEDIUM
LOW
DESIGN CONSISTENCY

Accessibility failures affecting essential interaction should receive higher priority than cosmetic deviations from the brand palette.

⸻

36. Required Output After Modification

Report:

Files changed
Colors removed
Colors introduced
Semantic tokens introduced
Contrast failures fixed
Color-only states fixed
Focus treatments fixed
Remaining known issues
Items requiring human design review

Do not state:

“The site is ADA compliant.”

Instead state something precise such as:

“The tested pages and states passed the color-related WCAG 2.2 AA checks described in this audit.”

Accessibility includes substantially more than color.

⸻

37. Automated Tests

Where practical, add tests that prevent regression.

At minimum, create a small local contrast utility or test that verifies required Echelon palette combinations.

Test approved combinations and explicitly prohibited combinations.

Example conceptual test data:

Carbon / Parchment
PASS normal text
Foundry Charcoal / Parchment
PASS normal text
Forged Iron / Parchment
PASS normal text
Graphite / Parchment
PASS normal text
Oxide Bronze / Parchment
PASS normal text
Verdigris / Parchment
PASS normal text
Oxide Bronze / Stone
FAIL normal text
Verdigris / Stone
FAIL normal text
Oxide Bronze / Foundry Charcoal
FAIL normal text
Verdigris / Foundry Charcoal
FAIL normal text

Tests should calculate contrast rather than merely assert hard-coded expected ratios.

⸻

38. CSS Enforcement

Where the architecture permits, components should consume semantic variables.

For example:

:root {
  —ef-text-primary: #171A18;
  —ef-text-heading: #202421;
  —ef-text-secondary: #686D68;
  —ef-surface-primary: #F2EFE7;
  —ef-surface-secondary: #E3E0D7;
  —ef-surface-inverse: #202421;
  —ef-accent-primary: #905831;
  —ef-accent-secondary: #47756B;
}

Then:

body {
  background: var(—ef-surface-primary);
  color: var(—ef-text-primary);
}
h1,
h2,
h3,
h4,
h5,
h6 {
  color: var(—ef-text-heading);
}
.section—inverse {
  background: var(—ef-surface-inverse);
  color: var(—ef-parchment);
}

Prefer semantic composition rather than one-off color declarations.

⸻

39. Human Review Required

Flag instead of guessing when:

* text overlays photographs
* the design intent of a state cannot be determined
* an accent color appears to have domain meaning
* a third-party widget cannot be safely restyled
* replacing a color could alter brand meaning
* charts require semantic interpretation
* accessibility and existing brand treatment conflict materially
* a new color appears necessary

Do not silently invent design intent.

⸻

40. Final Principle

The Echelon color system is not:

eight colors that designers may freely combine

It is:

a constrained set of semantic visual states.

Colors have roles.

Roles have allowed combinations.

Important information has accessibility constraints.

An element should only be able to select from combinations that are valid for its role.

Prefer architectures where an invalid visual state is difficult to create.

⸻

Final Execution Instruction

Audit the entire Echelon Foundry site using these rules.

First inspect and report.

Then make the smallest coherent set of changes necessary to:

1. migrate the site toward the canonical palette,
2. replace arbitrary colors with semantic roles,
3. repair color-related WCAG failures,
4. preserve visual hierarchy,
5. preserve existing functionality,
6. prevent future regressions.

After modification, run all available project tests and builds.

If browser-based or accessibility testing infrastructure already exists, use it.

Do not introduce new dependencies unless absolutely necessary.

Do not claim complete ADA or WCAG compliance based solely on this color audit.

Report all remaining uncertainty explicitly.
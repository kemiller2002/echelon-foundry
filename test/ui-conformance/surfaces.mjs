// Declared conformance inventory for visual-engineering/UI-LAYOUT-INTERACTION@1.0.0
// (pinned at visual-engineering 8da8fbc). This file is data: every route,
// every enabled action on it and every alignment group the composition
// intends. The suite fails when a page renders an enabled action that is not
// declared here, so new controls cannot ship without a contract (ULI-A10).

import { readFileSync } from "node:fs";

export const STANDARD = Object.freeze({ id: "visual-engineering/UI-LAYOUT-INTERACTION", version: "1.0.0", source: "kemiller2002/visual-engineering@8da8fbc" });

export const WORKER_ORIGIN = "https://inquiry.echeloncommunications.com";

const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const link = name => ({ role: "link", name });
const textbox = name => ({ role: "textbox", name });

// Internal navigation: the click must change the URL to `destination` and
// land on a page whose level-one heading is `heading`.
const navigate = (id, name, destination, heading, from) =>
  ({ id, control: link(name), kind: "navigate", destination, heading, from, intent: `Navigate to ${destination}`, expectedOutcome: `URL becomes ${destination} and the destination's heading "${heading}" is shown` });

// In-page destination: URL hash changes and the target is in view, clear of
// the sticky header.
const jump = (id, name, hash, heading, from) =>
  ({ id, control: link(name), kind: "anchor", destination: hash, heading, from, intent: `Move to ${hash}`, expectedOutcome: `URL hash becomes ${hash} and the destination is in view below the sticky header` });

// External or mail destinations are verified as meaningful, valid
// destinations; the suite never claims the external service completed anything.
const external = (id, name, href) =>
  ({ id, control: link(name), kind: "external", destination: href, intent: `Open ${href} in a new tab`, expectedOutcome: `href is ${href}, opens in a new tab with rel="noopener noreferrer", and the name announces the new tab` });

const mail = (id, name, href) =>
  ({ id, control: link(name), kind: "mailto", destination: href, intent: `Compose mail to ${href.slice(7)}`, expectedOutcome: `href is ${href} (the mail client is outside the page; delivery is not claimed)` });

// Case studies come from the same data file build.js renders.
const CASE_STUDIES = Object.freeze(JSON.parse(readFileSync(new URL("../../src/data/case-studies.json", import.meta.url), "utf8"))
  .caseStudies.map(({ slug, title, category }) => ({ slug, title, category })));

export const ROUTES = Object.freeze([
  { id: "home", path: "/", current: "Home", heading: "AI made software faster. We’re engineering what makes it trustworthy." },
  { id: "about", path: "/about/", current: "About", heading: "Kevin Miller, founder of Echelon Foundry", aliases: ["/about.html"] },
  { id: "research", path: "/research/", current: "Research", heading: "We research the hard parts. Then we build them.", aliases: ["/research.html"] },
  { id: "helixnote", path: "/helixnote/", current: "HelixNote", heading: "A communication framework for complex decisions.", aliases: ["/helixnote.html"] },
  { id: "contact", path: "/contact/", current: "Let's talk", heading: "Let's talk", aliases: ["/contact.html"] },
  ...CASE_STUDIES.map(study => ({ id: `case-${study.slug}`, path: `/case-studies/${study.slug}/`, heading: study.title, aliases: [`/case-studies/${study.slug}.html`] }))
]);

const NEUTRAL = "/case-studies/concrete-forensics/";

// Header and footer render on every route (src/templates).
const CHROME = Object.freeze([
  jump("skip-link", "Skip to main content", "#main-content", null, "/about/"),
  navigate("brand-home", "Echelon / Foundry", "/", ROUTES[0].heading, NEUTRAL),
  navigate("nav-home", "Home", "/", ROUTES[0].heading, NEUTRAL),
  navigate("nav-about", "About", "/about/", ROUTES[1].heading, NEUTRAL),
  navigate("nav-research", "Research", "/research/", ROUTES[2].heading, NEUTRAL),
  navigate("nav-helixnote", "HelixNote", "/helixnote/", ROUTES[3].heading, NEUTRAL),
  navigate("nav-contact", "Let's talk", "/contact/", ROUTES[4].heading, NEUTRAL),
  navigate("footer-contact", "Schedule a working session", "/contact/", ROUTES[4].heading, NEUTRAL),
  mail("footer-email", "kevin@echelonfoundry.com", "mailto:kevin@echelonfoundry.com")
]);

const RESEARCH_SITES = Object.freeze([
  ["ai", "AI Engineering"], ["communication", "Communication Engineering"], ["framework", "Framework Engineering"],
  ["software", "Software Engineering"], ["visual", "Visual Engineering"]
]);

const researchLinks = prefix => RESEARCH_SITES.map(([host, name]) =>
  external(`${prefix}-${host}`, `Visit ${name} research (opens in a new tab)`, `https://${host}.echelonfoundry.com/`));

const NAV_PEERS = ["Home", "About", "Research", "HelixNote", "Let's talk"].map(link);

// Alignment groups. `widths` names where the composition declares the
// relation; edges follow the CSS composition (row above 680px, stacked
// full-width group at and below it).
const pairGroup = (id, ruleId, names, rationale) => [
  { id: `${id}-row`, ruleId, relation: "top-edge", edge: "top", widths: [768, 1280], peers: names.map(link), rationale: `${rationale} share one row above 680px` },
  { id: `${id}-row-height`, ruleId: "ULI-L02", relation: "bottom-edge", edge: "bottom", widths: [768, 1280], peers: names.map(link), rationale: `${rationale} have equal intrinsic height in their row` },
  { id: `${id}-stack`, ruleId, relation: "left-edge", edge: "left", widths: [320, 390], peers: names.map(link), rationale: `${rationale} stack on one shared left edge at and below 680px` },
  { id: `${id}-stack-width`, ruleId: "ULI-L02", relation: "right-edge", edge: "right", widths: [320, 390], peers: names.map(link), rationale: `${rationale} are equal-width full-row targets when stacked` }
];

const stackGroup = (id, names, rationale) => [
  { id: `${id}-left`, ruleId: "ULI-L10", relation: "left-edge", edge: "left", widths: [320, 390, 768, 1280], peers: names.map(link), rationale },
  { id: `${id}-right`, ruleId: "ULI-L02", relation: "right-edge", edge: "right", widths: [320, 390, 768, 1280], peers: names.map(link), rationale: `${rationale}; equal width` }
];

export const SURFACES = Object.freeze([
  {
    id: "chrome", path: "/* (shared header and footer on every route)", kind: "marketing", region: "chrome",
    actions: CHROME,
    groups: [
      { id: "primary-nav", ruleId: "ULI-L10", relation: "centerline", edge: "center", widths: [320, 390, 768, 1280], peers: NAV_PEERS, scope: "banner", rationale: "Primary navigation is one row of peer destinations in source order at every contract width" },
      { id: "footer-actions-row", ruleId: "ULI-L10", relation: "centerline", edge: "center", widths: [1280], peers: [link("Schedule a working session"), link("kevin@echelonfoundry.com")], scope: "contentinfo", rationale: "Footer actions share a row on wide layouts" },
      { id: "footer-actions-stack", ruleId: "ULI-L10", relation: "left-edge", edge: "left", widths: [320, 390, 768], peers: [link("Schedule a working session"), link("kevin@echelonfoundry.com")], scope: "contentinfo", rationale: "Footer actions stack on one left edge at and below 900px" }
    ]
  },
  {
    id: "home", path: "/", kind: "marketing",
    actions: [
      navigate("home-helixnote-chip", "HelixNote integrated ->", "/helixnote/", ROUTES[3].heading, "/"),
      navigate("home-book-session", "Book a working session", "/contact/", ROUTES[4].heading, "/"),
      jump("home-see-work", "See the body of work", "#casework", "The current portfolio", "/"),
      external("home-culinary", "Explore Echelon Foundry Culinary (opens in a new tab)", "https://culinary.echelonfoundry.com/"),
      navigate("home-explore-research", "Explore the research", "/research/", ROUTES[2].heading, "/"),
      ...researchLinks("home-research"),
      ...CASE_STUDIES.map(study => ({
        ...navigate(`home-case-${study.slug}`, new RegExp(`^${escape(study.category)} ${escape(study.title)}`), `/case-studies/${study.slug}/`, study.title, "/"),
        nameText: `Case study card: ${study.title}`
      })),
      navigate("home-explore-helixnote", "Explore HelixNote", "/helixnote/", ROUTES[3].heading, "/"),
      navigate("home-start-diagnostic", "Start a diagnostic", "/contact/", ROUTES[4].heading, "/"),
      navigate("home-meet-founder", "Meet the founder", "/about/", ROUTES[1].heading, "/")
    ],
    groups: [
      ...pairGroup("hero-actions", "ULI-L10", ["Book a working session", "See the body of work"], "Hero calls to action"),
      ...stackGroup("closing-actions", ["Start a diagnostic", "Meet the founder"], "Closing calls to action stack in the heading's side column")
    ]
  },
  { id: "about", path: "/about/", kind: "marketing", actions: [], groups: [] },
  {
    id: "research", path: "/research/", kind: "marketing",
    actions: [...researchLinks("research"), navigate("research-start-conversation", "Start a conversation", "/contact/", ROUTES[4].heading, "/research/")],
    groups: []
  },
  {
    id: "helixnote", path: "/helixnote/", kind: "marketing",
    actions: [
      navigate("helixnote-discuss", "Discuss HelixNote", "/contact/", ROUTES[4].heading, "/helixnote/"),
      navigate("helixnote-apply", "Apply it to your domain", "/contact/", ROUTES[4].heading, "/helixnote/")
    ],
    groups: pairGroup("helixnote-actions", "ULI-L10", ["Discuss HelixNote", "Apply it to your domain"], "HelixNote calls to action")
  },
  {
    id: "contact", path: "/contact/", kind: "marketing",
    actions: [
      { id: "contact-send", control: { role: "button", name: "Send" }, kind: "form", intent: "Submit the inquiry to the inquiry worker", expectedOutcome: "Sending state while pending; on success the status reads the received message and the form clears; on failure the error is shown, entries are kept and the form can be resubmitted", resetStrategy: "Reload /contact/; the worker endpoint is intercepted in tests so no real inquiry is sent" }
    ],
    groups: [
      { id: "contact-fields", ruleId: "ULI-L01", relation: "left-edge", edge: "left", widths: [320, 390, 768, 1280], peers: [textbox("Your name"), textbox("Email"), textbox("How can we help?"), { role: "button", name: "Send" }], rationale: "Stacked form fields and their submit share the form's left edge" },
      { id: "contact-field-width", ruleId: "ULI-L02", relation: "right-edge", edge: "right", widths: [320, 390, 768, 1280], peers: [textbox("Your name"), textbox("Email"), textbox("How can we help?")], rationale: "Peer fields have one width" }
    ]
  },
  ...CASE_STUDIES.map(study => ({ id: `case-${study.slug}`, path: `/case-studies/${study.slug}/`, kind: "marketing", actions: [], groups: [] }))
]);

export const surfaceForRoute = route => SURFACES.find(surface => surface.path === route.path);

// Every action a route renders: its own plus the shared chrome.
export const declaredActionsFor = route => [
  ...CHROME.map(action => ({ ...action, surfaceId: "chrome" })),
  ...(surfaceForRoute(route)?.actions ?? []).map(action => ({ ...action, surfaceId: surfaceForRoute(route).id }))
];

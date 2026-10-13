// UI conformance suite for the Echelon Foundry site against
// visual-engineering/UI-LAYOUT-INTERACTION@1.0.0. Every assertion resolves
// controls by role and accessible name, waits with web-first assertions and
// compares observed pre/post state. No coordinates, no fixed sleeps.
import { expect, test } from "@playwright/test";
import {
  CONTRACT_WIDTHS,
  expectActionOutcome,
  expectDestinationClearOfHeader,
  expectLabelIntact,
  expectNoOverflow,
  expectPeerAlignment,
  inventoryActions,
  recordTabSequence,
  scaleDefaultText,
  settleFontsAndFrames,
  wasFocusedDuringSequence
} from "./forma-conformance/index.mjs";
import { ROUTES, SURFACES, WORKER_ORIGIN, declaredActionsFor } from "./surfaces.mjs";

const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const NAV_NAMES = ["Home", "About", "Research", "HelixNote", "Let's talk"];
const CHROME_PROBE = "/about/";

const annotate = (type, description) => test.info().annotations.push({ type, description });
const banner = page => page.getByRole("banner");
const primaryNav = page => banner(page).getByRole("navigation");
const pathPattern = destination => new RegExp(`^https?://[^/]+${escape(destination)}$`);
const nameMatches = (declared, actual) => (declared instanceof RegExp ? declared.test(actual) : declared === actual);

// --- ULI-L05/L06/L09: every route at every contract width -------------------

for (const width of CONTRACT_WIDTHS) {
  test.describe(`at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    for (const route of ROUTES) {
      test(`${route.path} renders without overflow, with intact navigation labels`, async ({ page }) => {
        annotate("uli-surface", route.id);
        annotate("uli-surface", "chrome");
        await page.goto(route.path);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(route.heading);
        await expectNoOverflow(page);
        await expect(banner(page).getByRole("link", { name: "Echelon / Foundry", exact: true })).toBeVisible();
        for (const name of NAV_NAMES) await expectLabelIntact(primaryNav(page).getByRole("link", { name, exact: true }));
        // Current location is announced in the primary navigation (wayfinding).
        await expect(primaryNav(page).locator("[aria-current=page]")).toHaveCount(route.current ? 1 : 0);
        if (route.current) await expect(primaryNav(page).getByRole("link", { name: route.current, exact: true })).toHaveAttribute("aria-current", "page");
      });

      test(`${route.path} renders only declared actions`, async ({ page }) => {
        annotate("uli-surface", route.id);
        await page.goto(route.path);
        await settleFontsAndFrames(page);
        const declared = declaredActionsFor(route);
        const rendered = await inventoryActions(page.locator("body"));
        const undeclared = rendered.filter(item => !declared.some(action => action.control.role === item.role && nameMatches(action.control.name, item.name)));
        expect(undeclared.map(item => `${item.role} "${item.name}" -> ${item.href}`), "ULI-A10: enabled actions without a declared contract").toEqual([]);
        expect(rendered.filter(item => !item.name), "ULI-A06: actions without an accessible name").toEqual([]);
      });
    }
  });
}

// --- ULI-L05: 200% default text size (browser text-scaling setting) ---------

for (const width of CONTRACT_WIDTHS) {
  test.describe(`at ${width}px with 200% text`, () => {
    test.use({ viewport: { width, height: 900 } });
    for (const route of ROUTES) {
      test(`${route.path} reflows without overflow`, async ({ page }) => {
        annotate("uli-surface", route.id);
        await page.goto(route.path);
        await scaleDefaultText(page, 2);
        await expectNoOverflow(page);
        for (const name of NAV_NAMES) await expect(primaryNav(page).getByRole("link", { name, exact: true })).toBeInViewport();
      });
    }
  });
}

// --- ULI-L04/L13: one top rhythm for every page -----------------------------

for (const width of CONTRACT_WIDTHS) {
  test(`every route starts its content at the same distance below the header at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const measure = async route => {
      await page.goto(route.path);
      await settleFontsAndFrames(page);
      const [header, section] = await Promise.all([banner(page).boundingBox(), page.locator("main > section").first().boundingBox()]);
      const paddingTop = await page.locator("main > section").first().evaluate(element => parseFloat(getComputedStyle(element).paddingTop));
      return { path: route.path, gap: section.y - (header.y + header.height), paddingTop };
    };
    const observed = await ROUTES.reduce(async (acc, route) => [...(await acc), await measure(route)], Promise.resolve([]));
    ROUTES.forEach(route => annotate("uli-surface", route.id));
    const [reference] = observed;
    expect(observed.map(item => ({ path: item.path, gap: Math.round(item.gap), paddingTop: Math.round(item.paddingTop) })))
      .toEqual(observed.map(item => ({ path: item.path, gap: 0, paddingTop: Math.round(reference.paddingTop) })));
  });
}

// --- Every link destination is meaningful (ULI-A01) --------------------------

for (const route of ROUTES) {
  // One test per action so a defect is attributed to the action it affects.
  test.describe(`${route.path} link destinations`, () => {
    for (const action of declaredActionsFor(route)) {
      test(`${action.surfaceId}/${action.id} is valid`, async ({ page, request }) => {
        annotate("uli-destination", `${action.surfaceId}/${action.id}`);
        await page.goto(route.path);
        const control = page.getByRole(action.control.role, { name: action.control.name, exact: typeof action.control.name === "string" });
        if (action.kind === "navigate") {
          await expect(control).toHaveAttribute("href", action.destination);
          expect((await request.get(action.destination)).status(), `${action.destination}`).toBe(200);
        }
        if (action.kind === "anchor") {
          await expect(control).toHaveAttribute("href", action.destination);
          await expect(page.locator(action.destination)).toHaveCount(1);
        }
        if (action.kind === "external") {
          await expect(control).toHaveAttribute("href", action.destination);
          expect(new URL(action.destination).protocol).toBe("https:");
          await expect(control).toHaveAttribute("target", "_blank");
          await expect(control).toHaveAttribute("rel", /\bnoopener\b/);
          await expect(control).toHaveAttribute("rel", /\bnoreferrer\b/);
          await expect(control).toHaveAccessibleName(/\(opens in a new tab\)$/);
        }
        if (action.kind === "mailto") {
          await expect(control).toHaveAttribute("href", /^mailto:[^@\s]+@[^@\s]+\.[a-z]{2,}$/);
          await expect(control).toHaveAttribute("href", action.destination);
        }
        if (action.kind === "form") {
          await expect(control).toHaveAttribute("type", "submit");
          await expect(control).toBeEnabled();
        }
      });
    }
  });

  for (const alias of route.aliases ?? []) {
    test(`legacy alias ${alias} serves ${route.path}`, async ({ page }) => {
      annotate("uli-surface", route.id);
      await page.goto(alias);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(route.heading);
    });
  }
}

// --- ULI-A02/A06: every navigation action changes the page ------------------

const navigationActions = SURFACES.flatMap(surface => surface.actions.filter(action => action.kind === "navigate" || action.kind === "anchor").map(action => ({ surface, action })));

for (const width of [390, 1280]) {
  test.describe(`navigation outcomes at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });
    for (const { surface, action } of navigationActions) {
      test(`${surface.id}: ${action.id} reaches ${action.destination}`, async ({ page }) => {
        annotate("uli-action", `${surface.id}/${action.id}`);
        await page.goto(action.from);
        await expectActionOutcome(page, {
          ruleId: "ULI-A02",
          action: action.control,
          outcome: { kind: "url", expected: pathPattern(action.kind === "anchor" ? `${action.from}${action.destination}` : action.destination) }
        });
        if (action.kind === "navigate") await expect(page.getByRole("heading", { level: 1 })).toHaveText(action.heading);
        if (action.heading && action.kind === "anchor") {
          await expectDestinationClearOfHeader(page, page.getByRole("heading", { name: action.heading }), banner(page));
        }
        if (action.id === "skip-link") await expect(page.locator("#main-content")).toBeInViewport();
      });
    }
  });
}

// External and mail actions: the destination is the observable outcome; the
// suite does not open third-party sites or a mail client.
for (const surface of SURFACES) {
  for (const action of surface.actions.filter(item => item.kind === "external" || item.kind === "mailto")) {
    test(`${surface.id}: ${action.id} points at ${action.destination}`, async ({ page }) => {
      annotate("uli-action", `${surface.id}/${action.id}`);
      await page.goto(surface.id === "chrome" ? CHROME_PROBE : surface.path);
      const control = page.getByRole("link", { name: action.control.name, exact: true });
      await expect(control).toBeVisible();
      await expect(control).toHaveAttribute("href", action.destination);
      if (action.kind === "external") await expect(control).toHaveAttribute("target", "_blank");
    });
  }
}

// --- ULI-L01/L02/L10: declared alignment groups ----------------------------

for (const surface of SURFACES) {
  for (const group of surface.groups) {
    for (const width of group.widths) {
      test(`${surface.id}: ${group.id} aligns at ${width}px`, async ({ page }) => {
        annotate("uli-group", `${surface.id}/${group.id}@${width}`);
        await page.setViewportSize({ width, height: 900 });
        await page.goto(surface.id === "chrome" ? CHROME_PROBE : surface.path);
        await expectPeerAlignment(page, {
          ruleId: group.ruleId,
          id: group.id,
          edge: group.edge,
          peers: group.peers,
          scope: group.scope ? page.getByRole(group.scope) : undefined
        });
      });
    }
  }
}

// --- Contact form: honest loading, failure, recovery and success (ULI-A07) --

const fillInquiry = async page => {
  await page.getByRole("textbox", { name: "Your name" }).fill("Conformance Test");
  await page.getByRole("textbox", { name: "Email" }).fill("conformance@example.com");
  await page.getByRole("textbox", { name: "How can we help?" }).fill("Automated UI conformance check; not a real inquiry.");
};

const submissionStatus = page => page.getByRole("status", { name: "Submission status" });

// Each response is released only when the test says so, so the pending state
// is observed without timing assumptions.
const interceptWorker = async (page, responses) => {
  const calls = [];
  await page.route(`${WORKER_ORIGIN}/**`, async route => {
    const next = responses[calls.length] ?? responses.at(-1);
    calls.push(route.request().postDataJSON());
    await next.release;
    await route.fulfill({ status: next.status, contentType: "application/json", body: JSON.stringify(next.body) });
  });
  return calls;
};

const deferred = () => {
  const handle = {};
  handle.release = new Promise(resolve => { handle.open = resolve; });
  return handle;
};

test.describe("contact form", () => {
  test("an empty submission is blocked by native validation and sends nothing", async ({ page }) => {
    annotate("uli-action", "contact/contact-send");
    const calls = await interceptWorker(page, [{ status: 200, body: { ok: true }, release: Promise.resolve() }]);
    await page.goto("/contact/");
    await expect(submissionStatus(page)).toHaveText("");
    await page.getByRole("button", { name: "Send" }).click();
    await expect.poll(() => page.getByRole("textbox", { name: "Your name" }).evaluate(input => input.validity.valueMissing)).toBe(true);
    await expect(page.getByRole("textbox", { name: "Your name" })).toBeFocused();
    await expect(submissionStatus(page)).toHaveText("");
    expect(calls).toEqual([]);
  });

  test("a failed submission keeps the entries, reports the error and recovers on retry", async ({ page }) => {
    annotate("uli-action", "contact/contact-send");
    const failure = deferred();
    const success = deferred();
    const calls = await interceptWorker(page, [
      { status: 503, body: { ok: false, error: "Service unavailable" }, ...failure },
      { status: 200, body: { ok: true }, ...success }
    ]);
    await page.goto("/contact/");
    await fillInquiry(page);
    const send = page.getByRole("button", { name: "Send" });
    await send.click();

    // Pending: honest progress, controls disabled against repeated activation.
    await expect(page.getByRole("button", { name: "Sending..." })).toHaveAttribute("aria-busy", "true");
    await expect(page.getByRole("button", { name: "Sending..." })).toBeDisabled();
    await expect(submissionStatus(page)).toHaveText("… Sending...");
    failure.open();

    // Failure: no success claim, entries kept, form operable again.
    await expect(submissionStatus(page)).toHaveText("× Service unavailable");
    await expect(submissionStatus(page)).toHaveAttribute("data-state", "error");
    await expect(page.getByRole("textbox", { name: "Your name" })).toHaveValue("Conformance Test");
    await expect(send).toBeEnabled();
    await expect(send).toHaveAttribute("aria-busy", "false");

    // Recovery: the retry succeeds and only then is the form cleared.
    success.open();
    await expectActionOutcome(page, {
      ruleId: "ULI-A07",
      action: { role: "button", name: "Send" },
      outcome: { kind: "text", target: { role: "status", name: "Submission status" }, expected: "✓ Thanks - your message has been received." }
    });
    await expect(page.getByRole("textbox", { name: "Your name" })).toHaveValue("");
    expect(calls).toHaveLength(2);
    expect(calls[1]).toMatchObject({ formId: "inquiry", name: "Conformance Test", email: "conformance@example.com" });
  });

  test("a network failure is reported as an error, never as success", async ({ page }) => {
    annotate("uli-action", "contact/contact-send");
    await page.route(`${WORKER_ORIGIN}/**`, route => route.abort("connectionrefused"));
    await page.goto("/contact/");
    await fillInquiry(page);
    await page.getByRole("button", { name: "Send" }).click();
    await expect(submissionStatus(page)).toHaveAttribute("data-state", "error");
    await expect(submissionStatus(page)).not.toHaveText(/Thanks/);
    await expect(page.getByRole("textbox", { name: "How can we help?" })).toHaveValue(/not a real inquiry/);
  });
});

// --- ULI-A08: keyboard reachability; reduced motion -------------------------

test("every chrome action is reachable by keyboard", async ({ page }) => {
  annotate("uli-surface", "chrome");
  await page.goto(CHROME_PROBE);
  await recordTabSequence(page, 12);
  const chrome = SURFACES.find(surface => surface.id === "chrome").actions;
  for (const action of chrome) {
    expect(await wasFocusedDuringSequence(page.getByRole("link", { name: action.control.name, exact: true })), action.id).toBe(true);
  }
});

test("the contact form is operable by keyboard", async ({ page }) => {
  annotate("uli-surface", "contact");
  await page.goto("/contact/");
  await recordTabSequence(page, 14);
  for (const target of [["textbox", "Your name"], ["textbox", "Email"], ["textbox", "How can we help?"], ["button", "Send"]]) {
    expect(await wasFocusedDuringSequence(page.getByRole(target[0], { name: target[1], exact: true })), target[1]).toBe(true);
  }
});

test("reduced motion removes smooth scrolling and transitions", async ({ page }) => {
  annotate("uli-surface", "home");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect.poll(() => page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  await expect.poll(() => page.getByRole("link", { name: "Book a working session" }).evaluate(element => getComputedStyle(element).transitionDuration)).toBe("0s");
});

test("forced colors keep filled controls bounded and navigation visible", async ({ page }) => {
  annotate("uli-surface", "home");
  await page.emulateMedia({ forcedColors: "active" });
  await page.goto("/");
  await expect.poll(() => page.getByRole("link", { name: "Book a working session" }).evaluate(element => getComputedStyle(element).borderTopStyle)).toBe("solid");
  for (const name of NAV_NAMES) await expect(primaryNav(page).getByRole("link", { name, exact: true })).toBeVisible();
  await expectNoOverflow(page);
});

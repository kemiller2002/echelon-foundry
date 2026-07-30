const fs = require("node:fs");
const path = require("node:path");

const rootDir = __dirname;
const srcDir = path.join(rootDir, "src");
const distDir = path.join(rootDir, "dist");

const caseStudies = readJson(path.join(srcDir, "data", "case-studies.json")).caseStudies
  .slice()
  .sort((a, b) => a.weight - b.weight);

const headerTemplate = readText(path.join(srcDir, "templates", "header.html"));
const footerTemplate = readText(path.join(srcDir, "templates", "footer.html"));
const layoutTemplate = readText(path.join(srcDir, "templates", "layout.html"));

const pages = [
  { title: "Home", source: "index.html", output: "index.html" },
  {
    title: "About",
    source: "about.html",
    output: path.join("about", "index.html"),
    aliases: ["about.html"],
  },
  {
    title: "HelixNote",
    source: "helixnote.html",
    output: path.join("helixnote", "index.html"),
    aliases: ["helixnote.html"],
  },
  {
    title: "Research",
    source: "research.html",
    output: path.join("research", "index.html"),
    aliases: ["research.html"],
  },
  {
    title: "Contact",
    source: "contact.html",
    output: path.join("contact", "index.html"),
    aliases: ["contact.html"],
  },
];

buildSite();

function buildSite() {
  resetDirectory(distDir);
  copyStatic("assets");
  copyStatic("contact.js");
  copyStatic("CNAME");
  buildPages();
  buildCaseStudies();
}

function buildPages() {
  for (const page of pages) {
    const contentPath = path.join(srcDir, "pages", page.source);
    let content = readText(contentPath);

    if (page.source === "index.html") {
      content = content.replace("{{caseStudyCards}}", renderCaseStudyCards(caseStudies));
    }

    writePage(page.output, renderDocument(page.title, content));

    for (const alias of page.aliases || []) {
      writePage(alias, renderDocument(page.title, content));
    }
  }
}

function buildCaseStudies() {
  for (const study of caseStudies) {
    const body = readText(path.join(srcDir, "case-studies", `${study.slug}.html`));
    const content = `
<section class="case-study">
  <div class="case-meta">
    <span class="chip">${escapeHtml(study.category)}</span>
    ${study.focusAreas.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("\n    ")}
    ${study.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("\n    ")}
  </div>
  <div class="case-body">
    ${body}
  </div>
</section>`.trim();

    const output = path.join("case-studies", study.slug, "index.html");
    const alias = path.join("case-studies", `${study.slug}.html`);
    const document = renderDocument(study.title, content);
    writePage(output, document);
    writePage(alias, document);
  }
}

function renderDocument(title, content) {
  const footer = footerTemplate.replaceAll("{{year}}", String(new Date().getFullYear()));
  return layoutTemplate
    .replace("{{title}}", escapeHtml(title))
    .replace("{{header}}", headerTemplate)
    .replace("{{footer}}", footer)
    .replace("{{content}}", content);
}

function renderCaseStudyCards(studies) {
  return studies
    .map((study) => {
      const focusAreas = study.focusAreas
        .map((area) => `<li>${escapeHtml(area)}</li>`)
        .join("");

      return `
    <a href="/case-studies/${study.slug}/" class="card card-link">
      <p class="card-kicker">${escapeHtml(study.category)}</p>
      <h3>${escapeHtml(study.title)}</h3>
      <p>${escapeHtml(study.summary)}</p>
      <ul class="list-inline">
        ${focusAreas}
      </ul>
      <p class="outcome-line">${escapeHtml(study.outcome)}</p>
    </a>`.trim();
    })
    .join("\n");
}

function copyStatic(relativePath) {
  const srcPath = path.join(rootDir, relativePath);
  const destPath = path.join(distDir, relativePath);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.cpSync(srcPath, destPath, { recursive: true });
}

function writePage(relativePath, contents) {
  const outputPath = path.join(distDir, relativePath);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${contents}\n`);
}

function resetDirectory(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
  fs.mkdirSync(dirPath, { recursive: true });
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function readJson(filePath) {
  return JSON.parse(readText(filePath));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

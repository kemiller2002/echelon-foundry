const test = require("node:test");
const assert = require("node:assert/strict");

const palette = {
  carbon: "#171a18",
  charcoal: "#202421",
  iron: "#3a403c",
  parchment: "#f2efe7",
  graphite: "#686d68",
  bronze: "#905831",
  verdigris: "#47756b",
  stone: "#e3e0d7",
};

function relativeLuminance(hex) {
  const channels = hex.match(/[\da-f]{2}/gi).map((value) => parseInt(value, 16) / 255);
  const linear = channels.map((value) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(foreground, background) {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

const normalTextPasses = [
  ["Carbon / Parchment", palette.carbon, palette.parchment],
  ["Foundry Charcoal / Parchment", palette.charcoal, palette.parchment],
  ["Forged Iron / Parchment", palette.iron, palette.parchment],
  ["Graphite / Parchment", palette.graphite, palette.parchment],
  ["Oxide Bronze / Parchment", palette.bronze, palette.parchment],
  ["Verdigris / Parchment", palette.verdigris, palette.parchment],
  ["Parchment / Foundry Charcoal", palette.parchment, palette.charcoal],
  ["Parchment / Forged Iron", palette.parchment, palette.iron],
];

const normalTextFails = [
  ["Oxide Bronze / Stone", palette.bronze, palette.stone],
  ["Verdigris / Stone", palette.verdigris, palette.stone],
  ["Oxide Bronze / Foundry Charcoal", palette.bronze, palette.charcoal],
  ["Verdigris / Foundry Charcoal", palette.verdigris, palette.charcoal],
];

for (const [name, foreground, background] of normalTextPasses) {
  test(`${name} passes normal-text contrast`, () => {
    assert.ok(contrast(foreground, background) >= 4.5, `${contrast(foreground, background).toFixed(2)}:1`);
  });
}

for (const [name, foreground, background] of normalTextFails) {
  test(`${name} remains prohibited for normal text`, () => {
    assert.ok(contrast(foreground, background) < 4.5, `${contrast(foreground, background).toFixed(2)}:1`);
  });
}

module.exports = { contrast };

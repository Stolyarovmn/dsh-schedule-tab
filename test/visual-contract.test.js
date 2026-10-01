import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const runtime = readFileSync(new URL("../src/client/10-runtime.js", import.meta.url), "utf8");
const bridge = readFileSync(new URL("../src/client/50-native-detail.js", import.meta.url), "utf8");

assert.ok(!runtime.includes("#111"), "ordinary UI must not carry a literal dark-theme fallback");
for (const literal of ["border-radius:7px", "border-radius:8px", "border-radius:9px", "border-radius:12px"]) {
  assert.ok(!runtime.includes(literal), `ordinary UI radius must use the DSH semantic scale: ${literal}`);
}

for (const rule of [
  ".scc_chip{",
  ".scc_badge{",
  ".scc_weekday{",
  ".scc_attentionDot{",
  ".scc_sidebarDot{",
]) {
  const start = runtime.indexOf(rule);
  assert.ok(start >= 0, `missing visual rule ${rule}`);
  const end = runtime.indexOf('}",', start);
  const slice = runtime.slice(start, end >= 0 ? end : start + 500);
  assert.ok(slice.includes("corner-shape:round"), `${rule} must explicitly preserve round geometry`);
}

assert.ok(
  runtime.includes("var(--dsw-focus-ring-width)") && runtime.includes("var(--dsw-focus-ring-color"),
  "keyboard focus must use the shared DSH focus-ring variables",
);
assert.ok(bridge.includes('t("detail.loading")'), "visible loading text must route through locale");
assert.ok(!bridge.includes("Native DSH task detail is loading…"), "hardcoded English loading text must not remain");

console.log("0.6.15 visual token/radius/localization contract validation passed");

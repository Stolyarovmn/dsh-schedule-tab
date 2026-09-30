import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const code = readFileSync(new URL("../src/client/36-native-manager-enhancer.js", import.meta.url), "utf8");

assert.ok(
  code.includes("if (badge.textContent !== nextText) badge.textContent = nextText;"),
  "filter count sync must not rewrite identical text and retrigger MutationObserver",
);
assert.ok(
  code.includes("timer = window.setTimeout(() => {"),
  "native manager sync must yield to the browser event loop",
);
assert.ok(
  !code.includes("queueMicrotask(sync)"),
  "MutationObserver sync must not form a microtask feedback loop",
);
assert.ok(
  code.includes("if (timer !== null) window.clearTimeout(timer);"),
  "pending coalesced native-manager sync must be disposed",
);

console.log("native manager observer feedback-loop regression validation passed");

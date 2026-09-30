import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const code = readFileSync(new URL("../src/client/36-native-manager-enhancer.js", import.meta.url), "utf8");

assert.ok(
  code.includes('if (badge.textContent !== nextText) badge.textContent = nextText;'),
  "unchanged filter counts must not rewrite textContent and retrigger MutationObserver",
);
assert.ok(
  code.includes('observer.observe(document.body, { subtree: true, childList: true });'),
  "native enhancer still observes the existing DSH page lifecycle",
);
assert.ok(
  code.includes('queueMicrotask(sync)'),
  "0.6.6 scheduling architecture must remain unchanged by this hotfix",
);

console.log("native manager idempotent count-sync regression validation passed");

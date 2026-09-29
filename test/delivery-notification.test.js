import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const code = readFileSync(new URL("../src/client/35-delivery-toast.js", import.meta.url), "utf8");
const context = {
  Map, Set, Promise, queueMicrotask,
  identity: (record) => record.sessionId + ":" + record.id,
  deliveryMarker: (record) => record.lastDelivery?.messageId ?? record.lastDelivery?.deliveredAt ?? record.lastDelivery?.scheduledAt ?? null,
  primitives: {},
  jsx: {},
  taskTitle: (record) => record.title ?? record.id,
};
context.globalThis = context;
vm.runInNewContext(code + "\nglobalThis.__test = { createDeliveryToastSource, startDeliveryMonitor };", context);

const { createDeliveryToastSource, startDeliveryMonitor } = context.__test;

let snapshot = { status: "loading", records: [] };
const listeners = new Set();
const catalog = {
  getSnapshot: () => snapshot,
  subscribe(listener) {
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  },
};
const publish = (next) => {
  snapshot = next;
  for (const listener of [...listeners]) listener();
};

const seen = [];
const stop = startDeliveryMonitor(catalog, (record) => seen.push(record.lastDelivery?.messageId ?? null));

publish({
  status: "ready",
  records: [{ sessionId: "s1", id: "r1", lastDelivery: { messageId: "old" } }],
});
assert.deepEqual(seen, [], "initial catalog baseline must not emit historical popups");

publish({
  status: "ready",
  records: [{ sessionId: "s1", id: "r1", lastDelivery: { messageId: "old" } }],
});
assert.deepEqual(seen, [], "unchanged delivery marker must not emit a popup");

publish({
  status: "ready",
  records: [{ sessionId: "s1", id: "r1", lastDelivery: { messageId: "new" } }],
});
assert.deepEqual(seen, ["new"], "changed delivery marker must emit exactly once");

publish({
  status: "ready",
  records: [
    { sessionId: "s1", id: "r1", lastDelivery: { messageId: "new" } },
    { sessionId: "s2", id: "r2", lastDelivery: { messageId: "first" } },
  ],
});
assert.deepEqual(seen, ["new", "first"], "new task with a delivery after baseline must emit");

stop();

const toast = createDeliveryToastSource();
const observed = [];
const off = toast.hooks.toast.subscribe(() => observed.push(toast.hooks.toast.getSnapshot()?.record.id ?? null));
toast.report({ sessionId: "s1", id: "a" });
toast.report({ sessionId: "s1", id: "b" });
assert.equal(toast.hooks.toast.getSnapshot().record.id, "a");
toast.dismiss();
await Promise.resolve();
assert.equal(toast.hooks.toast.getSnapshot().record.id, "b", "queued delivery popups must display sequentially");
toast.dismiss();
await Promise.resolve();
assert.equal(toast.hooks.toast.getSnapshot(), null);
off();

console.log("delivery popup baseline and queue validation passed");

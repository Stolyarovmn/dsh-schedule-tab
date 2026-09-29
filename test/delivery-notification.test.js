import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const code = readFileSync(new URL("../src/client/35-delivery-toast.js", import.meta.url), "utf8");
const storage = new Map();
const context = {
  Map, Set, Promise, Object, JSON, queueMicrotask,
  window: {
    localStorage: {
      getItem: (key) => storage.has(key) ? storage.get(key) : null,
      setItem: (key, value) => storage.set(key, String(value)),
    },
  },
  DELIVERY_CURSOR_STORAGE_KEY: "@stolyarovmn/dsh-client-ui-schedule-tab/delivery-cursor-v1",
  identity: (record) => record.sessionId + ":" + record.id,
  deliveryMarker: (record) => record.lastDelivery?.messageId ?? record.lastDelivery?.deliveredAt ?? record.lastDelivery?.scheduledAt ?? null,
  primitives: {},
  jsx: {},
  taskTitle: (record) => record.title ?? record.id,
};
context.globalThis = context;
vm.runInNewContext(code + "\nglobalThis.__test = { createDeliveryToastSource, startDeliveryMonitor };", context);

const { createDeliveryToastSource, startDeliveryMonitor } = context.__test;

function catalogHarness(initial = { status: "loading", records: [] }) {
  let snapshot = initial;
  const listeners = new Set();
  return {
    catalog: {
      getSnapshot: () => snapshot,
      subscribe(listener) {
        listeners.add(listener);
        return () => { listeners.delete(listener); };
      },
    },
    publish(next) {
      snapshot = next;
      for (const listener of [...listeners]) listener();
    },
  };
}

const first = catalogHarness();
const seen = [];
const stop = startDeliveryMonitor(first.catalog, (record) => seen.push(record.lastDelivery?.messageId ?? null));

first.publish({
  status: "ready",
  records: [{ sessionId: "s1", id: "r1", lastDelivery: { messageId: "old" } }],
});
assert.deepEqual(seen, [], "first-ever catalog baseline must not replay historical popups");

first.publish({
  status: "ready",
  records: [{ sessionId: "s1", id: "r1", lastDelivery: { messageId: "new" } }],
});
assert.deepEqual(seen, ["new"], "changed delivery marker must emit exactly once");
stop();

const restarted = catalogHarness({
  status: "ready",
  records: [{ sessionId: "s1", id: "r1", lastDelivery: { messageId: "after-restart" } }],
});
const afterRestart = [];
const stopRestart = startDeliveryMonitor(restarted.catalog, (record) => afterRestart.push(record.lastDelivery?.messageId ?? null));
assert.deepEqual(afterRestart, ["after-restart"], "delivery that happened while Web was down must surface after restart");

restarted.publish({
  status: "ready",
  records: [{ sessionId: "s1", id: "r1", lastDelivery: { messageId: "after-restart" } }],
});
assert.deepEqual(afterRestart, ["after-restart"], "unchanged persisted marker must not repeat");
stopRestart();

const toast = createDeliveryToastSource();
const off = toast.hooks.toast.subscribe(() => {});
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

console.log("delivery popup persistence and queue validation passed");

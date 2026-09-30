import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const code = readFileSync(new URL("../src/client/35-delivery-toast.js", import.meta.url), "utf8");
const notified = new Set();
const context = {
  Map, Set, Promise, Date, Number, Math, queueMicrotask,
  window: {
    setTimeout,
    clearTimeout,
  },
  markDeliveryNotified(record) {
    const key = record.lastDelivery?.messageId;
    if (key == null || notified.has(key)) return false;
    notified.add(key);
    return true;
  },
  isDeliveryUnread: () => true,
  isDeliveryNotified: (record) => notified.has(record.lastDelivery?.messageId),
  notificationSignature: (records) => records.map((record) => record.lastDelivery?.messageId ?? "").join("|"),
  primitives: {},
  jsx: {},
  react: { useEffect() {} },
  taskTitle: (record) => record.title ?? record.id,
};
context.globalThis = context;
vm.runInNewContext(code + "\nglobalThis.__test = { createDeliveryToastSource, deliveryRefreshDelay };", context);

const { createDeliveryToastSource, deliveryRefreshDelay } = context.__test;

const now = Date.parse("2026-09-30T07:27:00+03:00");
assert.equal(deliveryRefreshDelay([], now), null);
assert.equal(deliveryRefreshDelay([{ status: "active", scheduledAt: "2026-09-30T07:27:00+03:00" }], now), 2000);
assert.equal(deliveryRefreshDelay([{ status: "active", scheduledAt: "2026-09-30T07:27:30+03:00" }], now), 3000);
assert.equal(deliveryRefreshDelay([{ status: "active", scheduledAt: "2026-09-30T07:29:00+03:00" }], now), 10000);
assert.equal(deliveryRefreshDelay([{ status: "active", scheduledAt: "2026-09-30T09:27:00+03:00" }], now), 60000);

const toast = createDeliveryToastSource();
const off = toast.hooks.toast.subscribe(() => {});
const a = { sessionId: "s1", id: "a", lastDelivery: { messageId: "m-a" } };
const b = { sessionId: "s1", id: "b", lastDelivery: { messageId: "m-b" } };

toast.report(a);
toast.report(a);
toast.report(b);
assert.equal(toast.hooks.toast.getSnapshot().record.id, "a", "first delivery must show");
toast.dismiss();
await Promise.resolve();
assert.equal(toast.hooks.toast.getSnapshot().record.id, "b", "duplicate delivery must not queue twice and next delivery must follow");
toast.dismiss();
await Promise.resolve();
assert.equal(toast.hooks.toast.getSnapshot(), null);
off();

console.log("delivery popup dedupe and adaptive refresh validation passed");

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const code = [
  "../src/client/20-schedule-core.js",
  "../src/client/30-notifications.js",
  "../src/client/50-editor-core.js",
].map((path) => readFileSync(new URL(path, import.meta.url), "utf8")).join("\n");

const storage = new Map();
const context = {
  window: {
    localStorage: {
      getItem: (key) => storage.has(key) ? storage.get(key) : null,
      setItem: (key, value) => storage.set(key, String(value)),
    },
  },
  Intl, Date, Set, Map, Number, JSON, String, Object, Array, Math,
};
context.globalThis = context;

vm.runInNewContext(
  code + "\nglobalThis.__test = { adaptiveTickDelay, wallClock, validTimeZone, editorError, notificationSummary, markSeen, identity };",
  context,
);

const api = context.__test;
const now = Date.parse("2026-09-27T12:00:00Z");

assert.equal(api.adaptiveTickDelay([], now), null);
assert.equal(api.adaptiveTickDelay([{ status: "active", scheduledAt: "2026-09-27T14:00:00Z" }], now), 60000);
assert.equal(api.adaptiveTickDelay([{ status: "active", scheduledAt: "2026-09-27T12:30:00Z" }], now), 30000);
assert.equal(api.adaptiveTickDelay([{ status: "active", scheduledAt: "2026-09-27T12:00:30Z" }], now), 1000);

assert.equal(api.validTimeZone("Europe/Moscow"), true);
assert.equal(api.validTimeZone("Not/AZone"), false);
assert.ok(api.wallClock("2026-03-29T00:30:00Z", "Europe/Berlin").time.startsWith("01:30"));
assert.ok(api.wallClock("2026-03-29T01:30:00Z", "Europe/Berlin").time.startsWith("03:30"));

const t = (key) => key;
const cron = { title: "x", prompt: "y", rule: "cron", expression: "0 9 * * 1-5", timeZone: "Europe/Moscow" };
assert.equal(api.editorError(cron, t), null);
assert.equal(api.editorError({ ...cron, expression: "0 9 * * 1-5 extra" }, t), "edit.invalidCron");
assert.equal(api.editorError({ title: "x", prompt: "y", rule: "every", intervalValue: "59", intervalUnit: "second" }, t), "edit.invalidInterval");

const recurring = {
  sessionId: "s1",
  id: "r1",
  status: "active",
  kind: "daily",
  scheduledAt: "2026-09-28T09:00:00Z",
  lastDelivery: {
    messageId: "m1",
    scheduledAt: "2026-09-27T09:00:00Z",
    deliveredAt: "2026-09-27T09:00:01Z",
  },
};

assert.equal(api.notificationSummary([recurring], now).unreadDeliveries, 1);
api.markSeen([recurring]);
assert.equal(api.notificationSummary([recurring], now).unread, 0);

const nextDelivery = { ...recurring, lastDelivery: { ...recurring.lastDelivery, messageId: "m2" } };
assert.equal(api.notificationSummary([nextDelivery], now).unreadDeliveries, 1, "new recurring delivery must become unread again");

storage.clear();
storage.set("@stolyarovmn/dsh-client-ui-schedule-tab/seen-v1", JSON.stringify([api.identity(recurring)]));
assert.equal(api.notificationSummary([recurring], now).unread, 0, "seen-v1 migration must not replay the current old delivery");
assert.ok(storage.has("@stolyarovmn/dsh-client-ui-schedule-tab/seen-v2"));

const completed = { ...recurring, id: "once", kind: "at", status: "inactive", lastDelivery: { ...recurring.lastDelivery, messageId: "m3" } };
storage.clear();
assert.equal(api.notificationSummary([completed], now).unreadDeliveries, 1, "completed one-shot delivery must still be surfaced as new");

console.log("schedule core, DST and notification validation passed");

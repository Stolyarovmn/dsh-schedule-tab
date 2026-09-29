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

const notificationPrelude = `const PACKAGE = "@stolyarovmn/dsh-client-ui-schedule-tab"; const SEEN_STORAGE_KEY = PACKAGE + "/seen-v2"; const LEGACY_SEEN_STORAGE_KEY = PACKAGE + "/seen-v1"; const MAX_SEEN_IDS = 4000;`;

vm.runInNewContext(
  notificationPrelude + "\n" + code + "\nglobalThis.__test = { adaptiveTickDelay, wallClock, validTimeZone, editorError, notificationSummary, markTasksSeen, markRecordSeen, taskAttentionState, identity };",
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

assert.equal(api.notificationSummary([recurring], now).unreadDeliveries, 0, "first install must baseline historical deliveries");

const nextDelivery = { ...recurring, lastDelivery: { ...recurring.lastDelivery, messageId: "m2" } };
assert.equal(api.notificationSummary([nextDelivery], now).unreadDeliveries, 1, "new recurring delivery must become unread");
api.markTasksSeen([nextDelivery]);
assert.equal(api.notificationSummary([nextDelivery], now).unreadDeliveries, 1, "opening Automation tasks must not clear a new delivery");
assert.equal(api.taskAttentionState(nextDelivery, now), "new");
api.markRecordSeen(nextDelivery);
assert.equal(api.notificationSummary([nextDelivery], now).unread, 0);

const thirdDelivery = { ...nextDelivery, lastDelivery: { ...nextDelivery.lastDelivery, messageId: "m3" } };
assert.equal(api.notificationSummary([thirdDelivery], now).unreadDeliveries, 1, "later recurring delivery must become unread again");

const overdue = { ...thirdDelivery, scheduledAt: "2026-09-27T11:55:00Z" };
assert.equal(api.taskAttentionState(overdue, now), "warning", "overdue warning must take precedence over the new-delivery dot");

storage.clear();
storage.set("@stolyarovmn/dsh-client-ui-schedule-tab/seen-v1", JSON.stringify([api.identity(recurring)]));
assert.equal(api.notificationSummary([recurring], now).unread, 0, "seen-v1 migration must not replay the current old delivery");
assert.ok(storage.has("@stolyarovmn/dsh-client-ui-schedule-tab/seen-v2"));

const pendingOneShot = { ...recurring, id: "once", kind: "at", status: "active", lastDelivery: null };
const completed = { ...pendingOneShot, status: "inactive", lastDelivery: { ...recurring.lastDelivery, messageId: "m4" } };
storage.clear();
assert.equal(api.notificationSummary([pendingOneShot], now).unread, 0, "pre-delivery one-shot establishes the baseline");
assert.equal(api.notificationSummary([completed], now).unreadDeliveries, 1, "completed one-shot delivery must still be surfaced as new");

console.log("schedule core, DST and notification validation passed");

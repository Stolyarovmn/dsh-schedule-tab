import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const code = readFileSync(new URL("../src/client/25-notification-preferences.js", import.meta.url), "utf8");
const storage = new Map();
const listeners = new Map();

const window = {
  localStorage: {
    getItem: (key) => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, String(value)),
  },
  addEventListener(type, listener) {
    if (!listeners.has(type)) listeners.set(type, new Set());
    listeners.get(type).add(listener);
  },
  removeEventListener(type, listener) {
    listeners.get(type)?.delete(listener);
  },
};

const context = { window, Object, JSON, Set, Map };
context.globalThis = context;

vm.runInNewContext(
  'const PACKAGE = "@stolyarovmn/dsh-client-ui-schedule-tab";\n' + code +
  '\nglobalThis.__test = { DEFAULT_NOTIFICATION_PREFERENCES, notificationPreferencesSource, setNotificationPreference, startNotificationPreferencesStorageSync };',
  context,
);

const api = context.__test;
assert.deepEqual(
  { ...api.notificationPreferencesSource.getSnapshot() },
  { popup: true, newTasks: true, newDeliveries: true },
  "notification categories must default to enabled",
);

let revisions = 0;
const off = api.notificationPreferencesSource.subscribe(() => { revisions += 1; });
api.setNotificationPreference("popup", false);
assert.equal(api.notificationPreferencesSource.getSnapshot().popup, false);
assert.equal(revisions, 1);

const key = "@stolyarovmn/dsh-client-ui-schedule-tab/notification-preferences-v1";
assert.equal(JSON.parse(storage.get(key)).popup, false, "preferences must persist in browser localStorage");

api.setNotificationPreference("popup", false);
assert.equal(revisions, 1, "writing the same preference must be idempotent");

api.setNotificationPreference("newTasks", false);
api.setNotificationPreference("newDeliveries", false);
assert.deepEqual(
  { ...api.notificationPreferencesSource.getSnapshot() },
  { popup: false, newTasks: false, newDeliveries: false },
);

const stopStorageSync = api.startNotificationPreferencesStorageSync();
storage.set(key, JSON.stringify({ popup: true, newTasks: false, newDeliveries: true }));
for (const listener of listeners.get("storage") ?? []) listener({ key });
assert.deepEqual(
  { ...api.notificationPreferencesSource.getSnapshot() },
  { popup: true, newTasks: false, newDeliveries: true },
  "storage events must synchronize preference changes across tabs",
);

stopStorageSync();
off();
assert.equal(listeners.get("storage")?.size ?? 0, 0);

console.log("notification preferences persistence and synchronization validation passed");

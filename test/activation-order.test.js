import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const code = readFileSync(new URL("../src/client/50-native-detail.js", import.meta.url), "utf8");

const nativeCatalog = {
  getSnapshot: () => ({ records: [], status: "ready" }),
  subscribe: () => () => {},
};
const nativeEntry = {
  options: { key: "schedules", locale: "schedule.manager" },
  component: function NativeTaskManagerPage() {},
  inject: () => ({ hooks: { catalog: nativeCatalog }, onRetry() {} }),
};

const entries = [];
const listeners = new Set();
let customRegistrations = 0;
let customDisposals = 0;

const slots = {
  inject(key, setup) {
    assert.equal(key, "main");
    return setup();
  },
  entries(key) {
    assert.equal(key, "main");
    return entries;
  },
  subscribe(key, listener) {
    assert.equal(key, "main");
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  register(options, component) {
    assert.equal(options.name, "main");
    assert.equal(options.key, "schedules");
    assert.equal(options.priority, -100);
    customRegistrations += 1;
    const entry = { options, component };
    entries.push(entry);
    let disposed = false;
    return () => {
      if (disposed) return;
      disposed = true;
      customDisposals += 1;
      const index = entries.indexOf(entry);
      if (index >= 0) entries.splice(index, 1);
    };
  },
};

const source = {
  getSnapshot: () => ({}),
  subscribe: () => () => {},
};
const context = {
  PANEL_ID: "schedules",
  NS: "schedule-control-center",
  SchedulePanel: function SchedulePanel() {},
  useObservable: () => ({}),
  globalThis: null,
};
context.globalThis = context;

vm.runInNewContext(
  code + "\nglobalThis.__test = { installEnhancedScheduleMain, findNativeScheduleMain };",
  context,
);

const ctx = {
  slots,
  sessions: { list: source },
  workspaces: { list: source },
  locale: { bind: () => (key) => key },
};

// Plugin activates first: native ui-schedule has not registered main:schedules yet.
const dispose = context.__test.installEnhancedScheduleMain(ctx);
assert.equal(customRegistrations, 0, "early plugin activation must not register or throw before native schedule exists");

// Native ui-schedule arrives later.
entries.push(nativeEntry);
for (const listener of [...listeners]) listener();
assert.equal(customRegistrations, 1, "enhanced main must register after native schedule appears");
assert.equal(context.__test.findNativeScheduleMain(ctx), nativeEntry);

// Repeated slot notifications must be idempotent.
for (const listener of [...listeners]) listener();
assert.equal(customRegistrations, 1, "unchanged native entry must not duplicate the enhanced main registration");

// Native schedule unload/HMR: enhanced shadow must leave with it.
entries.splice(entries.indexOf(nativeEntry), 1);
for (const listener of [...listeners]) listener();
assert.equal(customDisposals, 1, "enhanced main must dispose when native schedule disappears");

// Native schedule returns: bridge must recover.
entries.push(nativeEntry);
for (const listener of [...listeners]) listener();
assert.equal(customRegistrations, 2, "enhanced main must recover after native schedule re-registers");

dispose();
assert.equal(customDisposals, 2, "installer disposal must remove the active enhanced main");
assert.equal(listeners.size, 0, "installer disposal must unsubscribe from slot changes");

console.log("activation-order-safe native schedule registration validation passed");

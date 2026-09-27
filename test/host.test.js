import assert from "node:assert/strict";
import { apply, inject } from "../lib/index.js";

assert.deepEqual(inject, ["loader"]);

function entry(id, disabled = true) {
  const seen = [];
  const value = {
    disabled,
    fiber: disabled ? undefined : { await: async () => { seen.push(`ready:${id}`); } },
    async update({ disabled: next }) {
      value.disabled = next;
      seen.push(`${next ? "disable" : "enable"}:${id}`);
      value.fiber = next ? undefined : { await: async () => { seen.push(`ready:${id}`); } };
    },
    seen,
  };
  return value;
}

const time = entry("time-context", true);
const schedule = entry("schedule", true);
const ui = entry("ui-schedule", false);
const effects = [];
const loaderWaits = [];
const ctx = {
  loader: {
    store: { "time-context": time, schedule, "ui-schedule": ui },
    await: async () => { loaderWaits.push("await"); },
  },
  effect: async (fn, label) => {
    effects.push(label);
    const dispose = await fn();
    ctx.dispose = dispose;
  },
};

await apply(ctx);
assert.equal(effects[0], "schedule-control-center: enable native rc2 Schedule stack");
assert.deepEqual(time.seen, ["enable:time-context", "ready:time-context"]);
assert.deepEqual(schedule.seen, ["enable:schedule", "ready:schedule"]);
assert.deepEqual(ui.seen, ["ready:ui-schedule"], "already enabled native ui-schedule must not be toggled");
assert.equal(loaderWaits.length, 3);

await ctx.dispose();
assert.equal(time.disabled, true);
assert.equal(schedule.disabled, true);
assert.equal(ui.disabled, false, "plugin unload must not disable a row it did not enable");
assert.equal(loaderWaits.length, 4);

const missingCtx = {
  loader: { store: { "time-context": entry("time-context", false) }, await: async () => {} },
  effect: async (fn) => { await fn(); },
};
await assert.rejects(() => apply(missingCtx), /row 'schedule' is missing/);

console.log("rc2 host bootstrap validation passed");

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const code = readFileSync(new URL("../src/client/40-catalog.js", import.meta.url), "utf8");
const context = { Promise, Set, Map, Array, Object, JSON };
context.globalThis = context;
vm.runInNewContext(code + "\nglobalThis.__test = { createCatalogSource };", context);

const { createCatalogSource } = context.__test;
const resolvers = [];
const schedule = {
  catalog() {
    return new Promise((resolve) => resolvers.push(resolve));
  },
  delete: async () => ({ ok: true, value: { deleted: true } }),
  update: async () => ({ ok: false, value: { code: "schedule_conflict" } }),
};
const ctx = {
  remote: {
    schedule,
    $on() { return () => {}; },
  },
  on() { return () => {}; },
};

const source = createCatalogSource(ctx);
const unsubscribe = source.subscribe(() => {});
assert.equal(resolvers.length, 1, "subscription must start an authoritative read");

await Promise.resolve();
source.refresh();
assert.equal(resolvers.length, 2, "later refresh must start a newer read");

resolvers[1]({ ok: true, value: [{ id: "new" }] });
await Promise.resolve();
assert.equal(source.getSnapshot().records[0].id, "new");

resolvers[0]({ ok: true, value: [{ id: "old" }] });
await Promise.resolve();
assert.equal(source.getSnapshot().records[0].id, "new", "stale response must not overwrite the newer snapshot");

const conflict = await source.update({ id: "x" });
assert.equal(conflict.ok, false);
assert.equal(conflict.value.code, "schedule_conflict", "compare-and-update conflict must propagate intact");

unsubscribe();
console.log("catalog race and conflict validation passed");

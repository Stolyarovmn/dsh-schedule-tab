import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const client = readFileSync(new URL("../lib/client.js", import.meta.url), "utf8");

// rc2-only authority and management surface.
for (const required of [
  'ctx.remote.schedule',
  'schedule.catalog()',
  'schedule.delete({ sessionId: record.sessionId, id: record.id })',
  'hostCtx.remote.schedule.history(request)',
  'ctx.remote.$on("schedule/changed"',
  'ctx.on("connection/reset"',
  'openTab(TASK_KIND, { params: { sessionId: record.sessionId, id: record.id } })',
  'delivery_cursor_not_found',
  'earlierRecordsPruned',
  'retention',
  'navigator.clipboard.writeText(messageId)',
  'data-session-schedule-mark',
]) assert.ok(client.includes(required), `missing rc2 contract: ${required}`);

// The new package must not carry any old Schedule projection/bootstrap compatibility.
for (const forbidden of [
  'projectionValues',
  'projectionsBySession',
  'refreshProjections',
  'scheduleTabBootstrap',
  'LegacySchedule',
  '0.1.5-rc.3',
  '0.1.7-rc.1',
]) assert.ok(!client.includes(forbidden), `legacy compatibility leaked into rc2 client: ${forbidden}`);

// Native detail owns timing edits; this plugin stays an overview/history/delete layer.
assert.ok(client.includes('const TASK_KIND = "scheduleTask"'));
assert.ok(!client.includes('schedule.update('), "do not duplicate the native rc2 timing editor");
assert.ok(client.includes('className: "scc_action scc_actionPrimary"'));

console.log("rc2 client contract validation passed");

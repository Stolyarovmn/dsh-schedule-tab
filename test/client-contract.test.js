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
  'primitives.writeClipboard(messageId)',
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
assert.ok(client.includes('primitives.Modal'), "delete confirmation must use the native rc2 Modal");
assert.ok(client.includes('primitives.Tooltip'), "row icon actions must use native tooltips");
assert.ok(client.includes('primitives.Button'), "actions must use native button primitives");
assert.ok(client.includes('hostCtx.sidebarRight.mounted'), "native task detail open must wait for the target Session sidebar");
assert.ok(client.includes('hostCtx.uiWorkspace.openSession(record.sessionId)'), "global card open must enter the source Session before opening native detail");
assert.ok(!client.includes('window.confirm'), "browser confirm must not replace the native modal");
assert.ok(!client.includes('navigator.clipboard.writeText'), "clipboard writes must use the shared primitive helper");

console.log("rc2 client contract validation passed");

assert.ok(client.includes('const PANEL_ID = "schedules"'), "plugin must enhance the native Automation tasks panel key");
assert.ok(client.includes('priority: -100'), "native sidebar/main cells must be intentionally shadowed with higher priority");
assert.ok(client.includes('order: 10'), "enhanced Automation tasks entry keeps the native sidebar position");
assert.ok(!client.includes('Schedule+'), "rc2 plugin must not create a second Schedule+ tab");
assert.ok(!client.includes('action.conversation'), "duplicate Conversation row action must stay removed");

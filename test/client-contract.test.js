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

// Card navigation still reaches the native Session-scoped detail, while the enhanced
// Automation tasks page also restores the native manager's in-place edit capability.
assert.ok(client.includes('const TASK_KIND = "scheduleTask"'));
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

assert.ok(client.includes('async update(request)'), "catalog must expose native schedule.update for inline Rules editing");
assert.ok(client.includes('schedule.update(request)'), "inline editor must save through native rc2 Schedule update");
assert.ok(client.includes('expected: stripCatalogRecord(editBase)'), "edits must use rc2 compare-and-update expected records");
assert.ok(client.includes('openInline(record, "rule", event)'), "edit icon must open Rules in-place instead of navigating to the conversation");
assert.ok(client.includes('openInline(record, "records", event)'), "history icon must open Delivery records in the same task detail");
assert.ok(client.includes('className: "scc_inlineDetail"'), "enhanced Automation tasks page must retain an inline side detail");
assert.ok(client.includes('edit.rule.weekdays'), "editor must retain the native Monday-to-Friday rule choice");
assert.ok(client.includes('edit.unit.seconds'), "editor must retain native seconds/minutes/hours interval choices");
assert.ok(client.includes('edit.invalidZone'), "editor must validate IANA time zones before native update");
assert.ok(client.includes('schedule_conflict'), "editor must surface native compare-and-update conflicts without dropping the draft");

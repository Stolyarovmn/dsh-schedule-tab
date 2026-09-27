import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const client = readFileSync(new URL("../lib/client.js", import.meta.url), "utf8");

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

for (const forbidden of [
  'projectionValues',
  'projectionsBySession',
  'refreshProjections',
  'scheduleTabBootstrap',
  'LegacySchedule',
  '0.1.5-rc.3',
  '0.1.7-rc.1',
  'setInterval(',
]) assert.ok(!client.includes(forbidden), `legacy compatibility leaked into rc2 client: ${forbidden}`);

assert.ok(client.includes('const TASK_KIND = "scheduleTask"'));
assert.ok(client.includes('primitives.Modal'), "delete confirmation must use the native rc2 Modal");
assert.ok(client.includes('primitives.Tooltip'), "row icon actions must use native tooltips");
assert.ok(client.includes('primitives.Button'), "actions must use native button primitives");
assert.ok(client.includes('hostCtx.sidebarRight.mounted'), "native task detail open must wait for the target Session sidebar");
assert.ok(client.includes('hostCtx.uiWorkspace.openSession(record.sessionId)'), "global card open must enter the source Session before opening native detail");
assert.ok(!client.includes('window.confirm'), "browser confirm must not replace the native modal");
assert.ok(!client.includes('navigator.clipboard.writeText'), "clipboard writes must use the shared primitive helper");

assert.ok(client.includes('const PANEL_ID = "schedules"'), "plugin must enhance the native Automation tasks panel key");
assert.ok(client.includes('priority: -100'), "native sidebar/main cells must be intentionally shadowed with higher priority");
assert.ok(client.includes('order: 10'), "enhanced Automation tasks entry keeps the native sidebar position");
assert.ok(!client.includes('Schedule+'), "rc2 plugin must not create a second Schedule+ tab");
assert.ok(!client.includes('action.conversation'), "duplicate Conversation row action must stay removed");

assert.ok(client.includes('async update(request)'), "catalog must expose native schedule.update for inline Rules editing");
assert.ok(client.includes('schedule.update(request)'), "inline editor must save through native rc2 Schedule update");
assert.ok(client.includes('expected: stripCatalogRecord(editBase)'), "edits must use rc2 compare-and-update expected records");
assert.ok(client.includes('openInline(record, "rule", event)'), "edit icon must open Rules in-place");
assert.ok(client.includes('openInline(record, "records", event)'), "history icon must open Delivery records in-place");
assert.ok(client.includes('className: "scc_inlineDetail"'), "Automation tasks page must retain inline detail");
assert.ok(client.includes('edit.rule.weekdays'), "editor must retain the Monday-to-Friday rule choice");
assert.ok(client.includes('edit.unit.seconds'), "editor must retain seconds/minutes/hours interval choices");
assert.ok(client.includes('edit.invalidZone'), "editor must validate IANA time zones before update");
assert.ok(client.includes('schedule_conflict'), "editor must surface compare-and-update conflicts");

assert.ok(client.includes('className: "scc_rowMain"'), "task primary activation must be separated from row action buttons");
assert.ok(client.includes('onClick: (event) => openTask(record, event)'), "task primary activation must keep Session and task-detail navigation");
assert.ok(client.includes('onClick: (event) => openInline(record, "rule", event)'), "edit icon must open the inline Rules pane");
assert.ok(client.includes('onClick: (event) => openInline(record, "records", event)'), "history icon must open Delivery records");
assert.ok(client.includes('"edit.rule.weekdays": "Monday to Friday"'), "Mon-Fri convenience rule must remain available");
assert.ok(client.includes('fractionalSecondDigits: 3'), "time editing must preserve millisecond precision");
assert.ok(client.includes('void catalog.refresh(catalogState.readRequest)'), "conflicts and ended updates must refresh catalog state");

assert.ok(!client.includes('recordTimeZone(record)'), "inline detail must use recordZone");
assert.ok(client.includes('const zone = recordZone(record) ?? systemTimeZone()'), "inline editor must seed its time zone through recordZone");

console.log("rc2 client contract validation passed");

assert.ok(client.includes('function adaptiveTickDelay(records, now)'), "client must use adaptive time refresh");
assert.ok(client.includes('react.useMemo(() => orderRows'), "task sorting must be memoized");
assert.ok(client.includes('react.useMemo(() => filterRows'), "task filtering must be memoized");
assert.ok(client.includes('react.useMemo(() => groupsFor'), "task grouping must be memoized");
assert.ok(client.includes('const SEEN_STORAGE_KEY = PACKAGE + "/seen-v2"'), "delivery-aware seen state must use v2 storage");
assert.ok(client.includes('const LEGACY_SEEN_STORAGE_KEY = PACKAGE + "/seen-v1"'), "seen-v1 migration must remain supported");
assert.ok(client.includes('function deliverySeenKey(record)'), "deliveries must have their own seen identity");
assert.ok(client.includes('unreadDeliveries'), "sidebar unread state must distinguish delivery results");
assert.ok(client.includes('const ru = {'), "Russian locale must be registered");
assert.ok(client.includes('ctx.locale.register(NS, { en, zh, ru })'), "Russian locale must be enabled");
assert.ok(client.includes('"new": "New conversation"'), "create action label must match the actual startSession behavior");
assert.ok(client.includes('"new.hint"'), "create action must explain how a reminder is created");

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const client = readFileSync(new URL("../lib/client.js", import.meta.url), "utf8");

for (const required of [
  'ctx.remote.schedule',
  'schedule.catalog()',
  'schedule.delete({ sessionId: record.sessionId, id: record.id })',
  'ctx.remote.$on("schedule/changed"',
  'ctx.on("connection/reset"',
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
  'hostCtx.sidebarRight',
  'openTab(TASK_KIND',
  'startNativeManagerEnhancer(',
  'seedEditor(',
  'editorChange(',
  'editorError(',
  'timeZoneChoices(',
]) assert.ok(!client.includes(forbidden), `obsolete implementation leaked into rc2 client: ${forbidden}`);

assert.ok(client.includes('const PANEL_ID = "schedules"'), "enhanced panel must retain the native schedules key");
assert.ok(client.includes('priority: -100'), "enhanced sidebar/main cells must intentionally shadow the native cells");
assert.ok(client.includes('order: 10'), "enhanced sidebar entry must retain the native position");
assert.ok(client.includes('ctx.slots.inject("main"'), "enhanced Scheduler UI must own the main schedules surface");
assert.ok(client.includes('ctx.slots.subscribe("main", reconcile)'), "enhanced main must tolerate unconstrained plugin activation order");
assert.ok(client.includes('const next = findNativeScheduleMain(ctx);'), "native DSH schedule entry must be discovered lazily");
assert.ok(client.includes('candidate.options?.locale === "schedule.manager"'), "native entry discovery must exclude the plugin's own shadow");
assert.ok(!client.includes('throw new Error("native DSH schedule manager is unavailable")'), "early activation must not abort web boot");
assert.ok(client.includes('ctx.slots.entries("main").find((candidate) =>'), "bridge must inspect live main registrations for the shipped TaskManagerPage");
assert.ok(client.includes('Component: entry.component'), "bridge must reuse DSH's actual TaskManagerPage component");
assert.ok(client.includes('const injected = entry.inject();'), "bridge must reuse DSH's native task actions and catalog");
assert.ok(client.includes('function NativeTaskDetailBridge({ record, tab, onClose })'), "native detail bridge must own the right-side detail host");
assert.ok(client.includes('button[aria-describedby]'), "bridge must select the requested task in native TaskManagerPage");
assert.ok(client.includes('nativeDetailElement(page)'), "bridge must detect native TaskDetail lifecycle");
assert.ok(client.includes('data-detail-tab="'), "bridge must select Rules / Delivery records using DSH native tabs");
assert.ok(client.includes('jsx.jsx(NativeTaskDetailBridge'), "custom Scheduler must mount native detail in its own right column");

assert.ok(client.includes('className: "scc_rowMain"'), "task card primary activation must be separate from row actions");
assert.ok(client.includes('openDetail(record, "rule", event)'), "card/edit activation must open native Rules");
assert.ok(client.includes('openDetail(record, "records", event)'), "history activation must open native Delivery records");
assert.ok(client.includes('const statusCounts = react.useMemo(() => ({'), "Active/All/Inactive counts must be derived explicitly");
assert.ok(client.includes('react.useMemo(() => orderRows'), "task sorting must be memoized");
assert.ok(client.includes('react.useMemo(() => filterRows'), "task filtering must be memoized");
assert.ok(client.includes('react.useMemo(() => groupsFor'), "task grouping must be memoized");
assert.ok(client.includes('["active", "all", "inactive", "today", "overdue", "recurring"]'), "enhanced filters must retain Today/Overdue/Recurring");
assert.ok(client.includes('["date", "session"]'), "Date/Dialog grouping must remain available");
assert.ok(client.includes('t("count", { visible: visible.length })'), "header count must describe the current filtered view only");

assert.ok(client.includes('const SEEN_STORAGE_KEY = PACKAGE + "/seen-v2"'), "delivery-aware seen state must use v2 storage");
assert.ok(client.includes('function deliverySeenKey(record)'), "deliveries must have durable seen identities");
assert.ok(client.includes('function markDeliveryNotified(record)'), "popup-notified state must stay separate from seen state");
assert.ok(client.includes('function taskAttentionState(record, now)'), "card attention state must derive from durable schedule facts");
assert.ok(client.includes('className: "scc_attentionDot"'), "task cards must expose compact delivery/overdue attention");
assert.ok(client.includes('function syncSessionOverdueStyles(records, now)'), "native Session clock customization must remain overdue-only");

assert.ok(client.includes('name: "shell.overlay"'), "new delivery popup must use native shell.overlay");
assert.ok(client.includes('id: "schedule-control-center.delivery-toast"'), "delivery popup slot id must remain stable");
assert.ok(client.includes('primitives.Toast'), "delivery popup must use DSH Toast");
assert.ok(client.includes('if (deliveryMarker(record) === null || isDeliveryNotified(record)) continue;'), "popup must report each delivery exactly once");
assert.ok(client.includes('function startDeliveryRefreshFallback(source)'), "delivery detection must retain authoritative refresh fallback");

assert.ok(client.includes('primitives.Modal'), "card delete confirmation must use native DSH Modal");
assert.ok(client.includes('primitives.Tooltip'), "row actions must use native DSH tooltips");
assert.ok(client.includes('primitives.Button'), "row actions must use native DSH buttons");
assert.ok(!client.includes('window.confirm'), "browser confirm must not replace native Modal");
assert.ok(!client.includes('navigator.clipboard.writeText'), "browser clipboard implementation must not leak back in");

assert.ok(client.includes('const ru = {'), "Russian locale must remain registered");
assert.ok(client.includes('ctx.locale.register(NS, { en, zh, ru })'), "Russian locale must remain enabled");
assert.ok(client.includes('"new": "New conversation"'), "new-task action must describe its real behavior");

console.log("rc2 enhanced-list/native-detail contract validation passed");

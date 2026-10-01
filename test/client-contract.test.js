import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const client = readFileSync(new URL("../lib/client.js", import.meta.url), "utf8");

for (const required of [
  'ctx.remote.schedule',
  'schedule.catalog()',
  'schedule.delete({ sessionId: record.sessionId, id: record.id })',
  'ctx.remote.$on("schedule/changed"',
  'ctx.on("connection/reset"',
  'name: "shell.overlay"',
  'id: "schedule-control-center.delivery-toast"',
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
  'hostCtx.sidebarRight',
  'openTab(TASK_KIND',
  'openNativeTask(record',
]) assert.ok(!client.includes(forbidden), `obsolete navigation/compatibility leaked into rc2 client: ${forbidden}`);

assert.ok(client.includes('const PANEL_ID = "schedules"'), "plugin must retain the native Automation tasks panel key");
assert.ok(client.includes('priority: -100'), "enhanced main/sidebar cells must intentionally shadow the native cells");
assert.ok(client.includes('order: 10'), "enhanced Automation tasks entry keeps the native sidebar position");

assert.ok(client.includes('className: "scc_rowMain"'), "enhanced cards must remain the primary task list UI");
assert.ok(client.includes('["active", "all", "inactive", "today", "overdue", "recurring"]'), "enhanced filters must retain Today/Overdue/Recurring");
assert.ok(client.includes('["date", "session"]'), "Date/Dialog grouping must remain");
assert.ok(client.includes('const statusCounts = react.useMemo(() => ({'), "Active/All/Inactive counts must remain");
assert.ok(client.includes('react.useMemo(() => orderRows'), "task sorting must remain memoized");
assert.ok(client.includes('react.useMemo(() => filterRows'), "task filtering must remain memoized");
assert.ok(client.includes('react.useMemo(() => groupsFor'), "task grouping must remain memoized");

assert.ok(client.includes('function useNativeScheduleEntry()'), "native DSH schedule registration must be observed live");
assert.ok(client.includes('entry.options?.key === PANEL_ID'), "native detail bridge must identify the schedules main entry");
assert.ok(client.includes('entry.locale === "schedule.manager"'), "native detail bridge must identify the shipped schedule manager by its stored locale");
assert.ok(client.includes('function NativeTaskDetailBridge({ record, tab, onClose })'), "native task detail bridge must exist");
assert.ok(client.includes('button[aria-describedby]'), "bridge must select the requested task inside native TaskManagerPage");
assert.ok(client.includes('data-testid="task-manager-page"'), "bridge must mount the shipped DSH TaskManagerPage");
assert.ok(client.includes('data-detail-tab="'), "bridge must route Edit/History to native Rules/Delivery records");
assert.ok(client.includes('nativeSelectedRecord ? jsx.jsx(NativeTaskDetailBridge'), "enhanced Scheduler must mount native detail in its existing right column");
assert.ok(client.includes('setNativeSelectedKey(identity(record))'), "card activation must stay on Automation tasks instead of navigating to chat");
assert.ok(client.includes('markRecordSeen(record);\n\t\t\t\tsetNativeSelectedKey(identity(record));'), "viewing Rules or Delivery records must acknowledge the current delivery");
assert.ok(client.includes('setNativeDetailTab(tab)'), "Edit and History must select native detail tabs");
assert.ok(client.includes('className: "scc_inlineDetail scc_nativeDetailHost"'), "native detail must be hosted inside the enhanced right column");

assert.ok(client.includes('const SEEN_STORAGE_KEY = PACKAGE + "/seen-v2"'), "delivery-aware seen state must remain");
assert.ok(client.includes('function deliverySeenKey(record)'), "deliveries must retain durable seen identity");
assert.ok(client.includes('function markDeliveryNotified(record)'), "popup notified state must remain separate from seen state");
assert.ok(client.includes('className: "scc_attentionDot"'), "task cards must retain attention indicator");
assert.ok(client.includes('function syncSessionOverdueStyles(records, now)'), "Session clock customization must remain overdue-only");
assert.ok(client.includes('primitives.Toast'), "delivery popup must use native DSH Toast");

assert.ok(client.includes('const NOTIFICATION_PREFERENCES_STORAGE_KEY = PACKAGE + "/notification-preferences-v1"'), "notification preferences must have durable browser storage");
assert.ok(client.includes('const notificationPreferencesSource = {'), "notification preferences must be observable across plugin surfaces");
assert.ok(client.includes('popup: true'), "popup notifications must default to enabled");
assert.ok(client.includes('newTasks: true'), "new-task attention must default to enabled");
assert.ok(client.includes('newDeliveries: true'), "new-delivery attention must default to enabled");
assert.ok(client.includes('["popup", "newTasks", "newDeliveries"].map(renderNotificationSetting)'), "settings modal must expose all three notification categories");
assert.ok(client.includes('primitives.Switch'), "notification settings must use native DSH switches");
assert.ok(client.includes('.scc_settingsList{display:flex;flex-direction:column;gap:0;width:100%;min-width:0}'), "notification settings list must fit the native Modal instead of forcing a wider minimum");
assert.ok(client.includes('.scc_settingCopy{min-width:0;flex:1 1 auto;'), "notification setting copy must shrink before the switch is clipped");
assert.ok(client.includes(".scc_settingRow [role='switch']{flex:none}"), "notification switches must remain visible at the right edge of the native Modal");
assert.ok(client.includes('SettingsIcon'), "Automation tasks header must expose notification settings");
assert.ok(client.includes('taskAttentionState(record, now, preferences)'), "delivery attention dot must respect notification preferences");
assert.ok(client.includes('notificationSummary(state.records, now, preferences)'), "sidebar unread summary must respect notification preferences");
assert.ok(client.includes('function startNotificationPreferenceSuppression(source)'), "disabled categories must be consumed without building backlog");
assert.ok(client.includes('usePreferences'), "delivery popup must observe popup preference");
assert.ok(client.includes('clear: deliveryToast.clear'), "disabling popups must clear an already queued toast");

assert.ok(client.includes('primitives.Modal'), "delete confirmation must still use native DSH Modal");
assert.ok(client.includes('primitives.Tooltip'), "row actions must still use native DSH tooltips");
assert.ok(client.includes('primitives.Button'), "row actions must still use native DSH buttons");
assert.ok(!client.includes('window.confirm'), "browser confirm must not replace native Modal");

assert.ok(client.includes('const ru = {'), "Russian locale must remain registered");
assert.ok(client.includes('ctx.locale.register(NS, { en, zh, ru })'), "Russian locale must remain enabled");
assert.ok(client.includes('"new": "New conversation"'), "new-task action label must match startSession behavior");

console.log("0.6.13 enhanced-list/native-detail/notification-settings contract validation passed");

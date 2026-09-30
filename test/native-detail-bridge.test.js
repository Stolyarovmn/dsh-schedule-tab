import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const bridge = readFileSync(new URL("../src/client/50-native-detail.js", import.meta.url), "utf8");
const panel = readFileSync(new URL("../src/client/60-panel.js", import.meta.url), "utf8");
const entry = readFileSync(new URL("../src/client/80-entry.js", import.meta.url), "utf8");

assert.ok(bridge.includes('ctx.slots.entries("main").find((candidate) => candidate.options?.key === PANEL_ID)'), "bridge must capture DSH native schedules registration before shadowing it");
assert.ok(bridge.includes('Component: entry.component'), "bridge must reuse the actual DSH TaskManagerPage component");
assert.ok(bridge.includes('const injected = entry.inject();'), "bridge must reuse DSH native task actions and catalog");
assert.ok(bridge.includes('useCatalog: createSelectorHook(nativeCatalog)'), "native TaskManagerPage must receive a live catalog hook");
assert.ok(bridge.includes('useSessions: createSelectorHook(ctx.sessions.list)'), "native TaskDetail must receive live Session state");
assert.ok(bridge.includes('useWorkspaces: createSelectorHook(ctx.workspaces.list)'), "native TaskDetail must receive live Workspace state");
assert.ok(bridge.includes('button[aria-describedby]'), "bridge must select the requested native task row");
assert.ok(bridge.includes('[data-detail-tab="' + "' + tab + '" + '"]'), "bridge must select Rules or Delivery records in native TaskDetail");
assert.ok(bridge.includes('nativeDetailElement(page)'), "bridge must detect native TaskDetail mount/unmount");
assert.ok(panel.includes('jsx.jsx(NativeTaskDetailBridge'), "enhanced scheduler must mount native detail inside its own right column");
assert.ok(panel.includes('openDetail(record, "rule", event)'), "card/edit activation must open native Rules");
assert.ok(panel.includes('openDetail(record, "records", event)'), "history activation must open native Delivery records");
assert.ok(entry.includes('captureNativeScheduleMain(ctx)'), "native schedules entry must be captured before the enhanced main cell is registered");
assert.ok(entry.includes('ctx.slots.inject("main"'), "enhanced scheduler must own the main schedules cell");
assert.ok(!panel.includes("seedEditor("), "custom editor state must be gone from the panel");
assert.ok(!panel.includes("loadHistory("), "custom delivery-history implementation must be gone from the panel");
assert.ok(!panel.includes("hostCtx.sidebarRight"), "scheduler detail must not route through a Session right sidebar");

console.log("native DSH detail bridge contract validation passed");

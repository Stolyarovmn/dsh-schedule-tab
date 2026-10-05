# Changelog

## 0.8.0-dev.5 — DSH 0.2.0-rc.2

Private development preview; not published.

### Changed

- abandoned the hand-redrawn 0.8 prototype and restarted from stable 0.7.0;
- build pins `deepseek-harness@dsh-v0.2.0-rc.2` and compiles the shipped TaskManagerPage / TaskDetail source into the plugin;
- bundled copies of the pinned native primitives replace runtime imports of Harness Client internals;
- the generated page keeps native New/search/filter controls, Rules editor, date/time/time-zone controls, Delivery records, delete confirmation, focus/Escape/menu behavior and deletion toast;
- the row patch now contains only two quick actions: open the linked Session and delete; task details remain the native row-click behavior;
- the linked-Session action uses the native `QueueOutline` glyph instead of `NewChatOutline`;
- the row trash opens native delete confirmation from the first click through deferred confirmation after native row selection;
- `plugins.detail.section` notification preferences are now guarded by the current detail `subject`, so they render only for `@stolyarovmn/dsh-client-ui-schedule-tab` and cannot leak into Registry Aggregator or other plugin detail pages;
- Session navigation uses the root `uiWorkspace` service, matching the shipped Schedule implementation.

### Tests

- generated native helper is checked for non-platform module-table externals;
- build fails if `NewChatOutline` returns for the linked-Session action;
- contract tests pin the `QueueOutline` action and first-click delete confirmation;
- plugin-detail regression test verifies three notification switches on the schedule bundle and `null` for foreign bundle, row and item subjects;
- DSH install/boot smoke runs with the official `@deepseek-ai/dsh-experimental-schedule-bundle@0.2.0-rc.2` enabled.

### Architecture

The page is a version-pinned native fork because DSH 0.2.0-rc.2 has no additive task-row actions slot. It shadows the shipped `main/schedules` cell at `priority: -100`; the shipped registration remains live at priority 0. Remove this fork when a later DSH exposes an additive row-actions extension point.

## 0.7.0 — 2026-10-02 — DSH 0.2.0-rc.2

This release is a redesign for **DeepSeek Harness 0.2.0-rc.2 only**. It intentionally drops compatibility with DSH 0.1.x and no longer ships a replacement Automation Tasks manager.

### Added

- unread count on the native Automation Tasks sidebar icon, including `9+`;
- retained-delivery counting through the native `remote.schedule.history` API for repeated runs of the same recurring task;
- one-time delivery popup with **Open conversation**;
- browser-local switches for popup notifications, new-task attention and new-delivery attention on the plugin detail page;
- scheduled Session unread fallback in `sidebar.session.row.leading`, clearing only when the conversation is actually opened;
- overdue warning state;
- English, Chinese and Russian UI strings;
- browser-state regression tests for popup dedupe, recurring unread counts, `9+`, settings persistence and overdue state.

### Changed

- native Automation Tasks page, editor, delivery history, deletion and Session navigation remain owned by DSH;
- opening Automation Tasks clears only task-center attention; it does not clear the Session unread indicator;
- popup delivery dedupe is baselined on browser startup so an old delivery cannot reappear on a later unrelated refresh;
- delivery-history enrichment is bounded: no history calls are needed when ten distinct unread tasks already guarantee `9+`, otherwise reads use page size 10 with at most four concurrent requests.

### Removed from the 0.2.x line

- custom `main/schedules` replacement;
- custom task editor/history/delete UI;
- DOM observation and host-DOM styling workarounds;
- runtime imports of Harness Client internals;
- legacy DSH 0.1.x compatibility code.

### Deferred

Fast **Open session** / **Delete** actions inside native Automation Task rows are deferred until Harness exposes an additive task-row actions slot. Replacing the whole shipped TaskManagerPage only for those actions is intentionally avoided.

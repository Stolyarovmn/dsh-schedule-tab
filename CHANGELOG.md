# Changelog

## 0.7.0-rc.1 — DSH 0.2.0-rc.2

This line is a redesign for **DeepSeek Harness 0.2.0-rc.2 only**. It intentionally drops compatibility with DSH 0.1.x and no longer ships a replacement Automation Tasks manager.

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

Fast **Open session** / **Delete** actions inside native Automation Task rows are deferred until Harness exposes an additive row-actions slot. Replacing the whole shipped TaskManagerPage only for those actions is intentionally avoided.

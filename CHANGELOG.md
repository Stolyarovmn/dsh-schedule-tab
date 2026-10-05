# Changelog

## 0.7.1-alpha.1 — 2026-10-05 — DSH 0.2.1-alpha.1

Compatibility build for **DeepSeek Harness `0.2.1-alpha.1`**.

### Changed

- pin the plugin compatibility target to DSH `0.2.1-alpha.1` while it is being validated;
- update CI install/boot smoke tests to use DSH `0.2.1-alpha.1`;
- update the migration model for Automation Tasks now being mounted directly by `@deepseek-ai/dsh-web-app`;
- remove documentation that required enabling the retired optional Automation Tasks bundle;
- keep the existing attention-only architecture because the native `ui-schedule` client entry and the public slots used by the plugin are unchanged between DSH `0.2.0-rc.2` and `0.2.1-alpha.1`.

### Verification status

- source/API comparison completed against the version-matched DSH `0.2.1-alpha.1` `cordis-plugin-development` guidance and native Schedule implementation;
- automated syntax, contract, pack, install and Web boot checks are required by CI;
- real Harness UI verification is still required before promotion or publication.

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

Fast **Open session** / **Delete** actions inside native Automation Task rows are deferred until Harness exposes an additive row-actions slot. Replacing the whole shipped TaskManagerPage only for those actions is intentionally avoided.

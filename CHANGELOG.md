# Changelog

All notable changes to `@stolyarovmn/dsh-client-ui-schedule-tab` are documented here.

The plugin follows semantic versioning where practical. The `0.6.x` line targets DeepSeek Harness `0.1.7-rc.2` exactly; `0.5.1` is the last pre-rc2-compatible release.

## [0.6.15] - 2026-10-01

### Changed

- Aligned first-level Automation tasks typography and spacing with the native DSH `0.1.7-rc.2` Schedule page.
- Aligned filter chips with the native quiet 28px pill-tab treatment.
- Replaced arbitrary ordinary-control/card radii with the DSH semantic radius scale while preserving intentional pills and status dots.
- Replaced literal dark color fallbacks with DSH theme tokens and moved keyboard focus rings to the shared DSH focus-ring tokens.
- Localized the native-detail loading placeholder and polished Russian notification-setting copy.

### Scope

- Visual-compliance pass only. The known `0.6.x` native-detail bridge and other rc2 architectural compatibility workarounds are intentionally unchanged.

## [0.6.14] - 2026-10-01

### Added

- Delivery-aware attention for recurring tasks: a new durable delivery becomes unread again even when the task itself was already seen.
- Native DSH `shell.overlay` popup notifications for new deliveries, with an **Open conversation** action.
- Independent in-plugin notification preferences for:
  - popup notifications;
  - newly discovered active tasks;
  - new delivery indicators and unread counts.
- Notification preferences persist in browser `localStorage`, synchronize across tabs, and consume disabled categories without replaying a backlog when re-enabled.
- Compact per-task attention indicators and an overdue warning that remains independent from unread state.
- Russian UI strings.
- Deterministic `src/client/*` → `lib/client.js` build checks.
- Expanded tests for delivery attention, popup deduplication, notification preferences, catalog races, time zones/DST, and rc2 install/boot compatibility.

### Changed

- Restored the richer Automation tasks presentation: cards, search, Active/All/Inactive counters, Today/Overdue/Recurring filters, and Date/Dialog grouping.
- Edit and History now stay on the Automation tasks page and expose DSH's shipped native task detail in the existing right column.
- Rules, Delivery records, date/time controls, validation, save flow, and delivery-history rendering reuse native DSH UI rather than maintaining a separate editor.
- Opening a task through its card, Edit, or History acknowledges the current delivery immediately.
- Native DSH Session schedule marks remain authoritative; unread delivery state no longer recolors the Session clock.
- Replaced the old fixed one-second whole-panel refresh with adaptive timing and memoized sorting/filtering/grouping.
- Renamed the creation action to **New conversation** to match the actual model-driven task creation flow.

### Fixed

- Fixed popup delivery detection and deduplication across refreshes/restarts.
- Fixed stale unread state for recurring task deliveries.
- Fixed Edit/History navigation that previously switched the main view to the source conversation.
- Fixed notification settings controls rendering outside the visible DSH modal.
- Fixed delivery attention not clearing when the task detail was viewed.
- Preserved inactive one-shot tasks as inspectable history while keeping active counts separate.
- Improved accessibility by separating the keyboard-activatable task body from row action buttons.

### Notes

- Requires `@deepseek-ai/dsh@0.1.7-rc.2` exactly.
- Schedule delivery receipts confirm durable inbox delivery only; they are not treated as model execution success/failure.
- Intermediate `0.6.1`–`0.6.13` builds were development/review iterations and were not published as stable GitHub releases.

## [0.6.0] - 2026-09-27

### Added

- rc2-only rewrite using the native Host-wide Schedule catalog.
- Enhanced native Automation tasks sidebar/main panel without adding a second Schedule entry.
- Search, filters, grouping, recurrence display, unread/overdue indicators, and delivery history.
- Task editing for Once, Every, Daily, Monday-to-Friday, Weekly, and Cron rules.
- Native Schedule update/delete operations.
- Catalog refresh on Schedule changes and connection resets.
- Bundle patch enabling native `time-context`, `schedule`, and `ui-schedule` rows.

### Compatibility

- Requires DeepSeek Harness `0.1.7-rc.2` exactly.
- Pre-rc2 users should remain on `0.5.1`.

## [0.5.1] - 2026-09-26

### Fixed

- Source-dialog Schedule mark follows the same unread state as the global Schedule entry.
- Supports the DSH `0.1.7-rc.1` trailing `ActiveScheduleIndicator` and the newer leading Schedule mark shape.
- Improved matching of reminders back to source dialogs.
- Opening Schedule returns seen source-session marks to the native gray state.

### Added

- Explicit **Recurring** tag and recurring filter support.

## [0.5.0] - 2026-09-26

### Added

- Schedule control-center UI with search, filtering, grouping, task state, and source-dialog navigation.
- Notification-style sidebar count and unseen/overdue state.

## [0.4.1] - 2026-09-24

### Added

- `dsh-plugin` discovery metadata and catalog metadata.
- UI category and declared DSH capabilities.
- Catalog metadata validation in CI.

## [0.4.0] - 2026-09-24

### Added

- Self-activating install through `dsh.bundle` / `cordis.patch.yml`.
- GitHub topic/npm discovery documentation.
- Reproducible pinned Git installs.

## [0.3.0] - 2026-09-23

### Added

- Initial global cross-dialog Schedule UI.
- Aggregated reminders from all dialogs with click-through source navigation.
- Read-only management model using DSH's built-in scheduler as source of truth.

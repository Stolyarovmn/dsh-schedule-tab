# Migration inventory: `0.6.15` → DSH `0.2.0-rc.2`

Target: **DeepSeek Harness `0.2.0-rc.2` only**.

Authoritative references for this line are the version-matched `cordis-plugin-development` skill, `references/ui-plugin.md`, `references/practices.md`, `references/user-actions.md`, the shipped slots catalog, and the native `@deepseek-ai/dsh-client-ui-schedule@0.2.0-rc.2` implementation.

## Remove from the new line

The following `0.6.x` responsibilities are native in DSH `0.2.0-rc.2` or rely on extension patterns that must not be carried forward unchanged:

- a separately designed replacement `main/schedules` page;
- custom task cards as the primary management UI;
- custom task editor and timing validation;
- custom Delivery records rendering;
- custom delete dialogs/toasts;
- custom source-Session navigation;
- re-declaring or enabling `time-context`, `schedule`, or `ui-schedule` in this bundle patch;
- runtime import of `@deepseek-ai/dsh-client-ui-primitives` or other Harness Client internals;
- DOM observation or selectors that reach outside the registered component;
- recoloring native Session-row schedule marks through host-DOM CSS;
- adaptive polling near due times when `schedule/changed` plus reconnect invalidation is sufficient.

## Keep in the 0.2.x implementation

These remain differentiated behavior owned by this plugin:

- browser-local seen state for newly discovered active tasks;
- browser-local seen state for newly recorded deliveries;
- separate one-time popup-deduplication state;
- first-read baselining so installing/upgrading does not replay historical tasks/deliveries as new;
- compatibility with `seen-v1` → `seen-v2` migration;
- compatibility with existing `notification-preferences-v1` values;
- consuming disabled notification categories without replaying a backlog later;
- `shell.overlay` popup for a new delivery with **Open conversation**;
- visible numeric unread badge on the existing `schedules` sidebar glyph;
- overdue state independent from unread state;
- browser-local notification settings on the bundle detail page through the public `plugins.detail.section` slot;
- cross-tab preference synchronization;
- explicit rule that a Schedule delivery receipt is inbox delivery, not model execution success/failure;
- English, Chinese and Russian localization.

## Native DSH remains authoritative

The `0.8.0` fork preserves these native `0.2.0-rc.2` behaviors from the pinned shipped source rather than reimplementing them independently:

- global Automation tasks page layout;
- native text search and All / Active / Inactive filters;
- task name, instruction and timing editing;
- Once / Every / Daily / Weekly / Monday-to-Friday / Cron controls;
- IANA time-zone selector and date/time controls;
- Delivery records pagination and retention messaging;
- task deletion and mutation conflict handling;
- in-page TaskDetail placement;
- linked Session navigation semantics;
- native delete confirmation and deletion toast;
- native focus, Escape and menu behavior.

The official Schedule bundle still owns the Host capability and the rest of the native surfaces, including Session-header reminders, Session-row schedule state and `schedule_create` transcript cards.

## Features still deferred

`TaskManagerPage` in `0.2.0-rc.2` declares no additive row-actions slot. `0.8.0` makes one explicit exception for the two requested row actions, but the following older custom features remain deferred:

- Today / Overdue / Recurring filters;
- grouping by date;
- grouping by source Session;
- search by resolved Session title;
- per-task attention dot inside each task row;
- per-task acknowledgement when native Rules/Delivery records is opened;
- numeric unread count next to the native Automation tasks **text label**;
- in-page notification settings button inside native `TaskManagerPage`.

If a later DSH version exposes additive slots in the task manager, re-evaluate these features there and remove the pinned page fork when possible.

## `0.8.0` architecture: pinned native TaskManager fork

Real UI testing of the first 0.8 prototype showed that a hand-redrawn list/detail pair drifted from Harness: action icons were not from the product icon set and the right detail column lost native TaskDetail behavior.

The released `0.8.0` implementation therefore restarts from stable `0.7.0` and uses a build-time snapshot of **DeepSeek Harness `dsh-v0.2.0-rc.2`**:

- source: shipped `ui-schedule` TaskManagerPage, TaskDetail and dependencies;
- controls/icons: bundled source snapshot of the exact `ui-primitives` used by that version;
- runtime dependency rule: the generated helper contains no runtime `require('@deepseek-ai/dsh-client-ui-primitives')` and no non-platform external such as `clsx`;
- page shadow: keyed `main/schedules`, priority `-100`; native DSH registration stays present at priority `0`;
- patch boundary: two quick actions beside each native task row;
- `QueueOutline` opens the linked Session through root `uiWorkspace`;
- clicking the row itself opens the original in-page TaskDetail, so no details quick button is added;
- `TrashOutline` selects the target row and defers the native `confirmId` until the native selection reset completes, producing confirmation on the first click;
- Rules editing, timing/time-zone controls, Delivery records, mutation conflict handling and delete toast remain the pinned native implementation.

This architecture is intentionally version-specific. When DSH changes, regenerate and review the snapshot against that exact target version instead of carrying the fork forward unchanged.

## Shared Plugin Manager slot ownership

`plugins.detail.section` is a root list slot shared by every plugin detail page. The notification-settings contribution must inspect the page `subject` and render `null` unless:

```text
subject.kind === 'bundle'
subject.pkg.name === '@stolyarovmn/dsh-client-ui-schedule-tab'
```

This prevents schedule notification controls from appearing on Registry Aggregator or any unrelated bundle/row/item page.

## Verification gates for `0.8.0`

Completed before release:

- target fixed to DSH `0.2.0-rc.2` with no `0.1.x` compatibility path;
- official `cordis-plugin-development` guidance for that exact tag reviewed;
- build pinned to the exact native Schedule source for `dsh-v0.2.0-rc.2`;
- generated helper restricted to platform module-table externals;
- official Automation Tasks bundle enabled during install/boot smoke;
- real UI verified for native TaskDetail layout, Rules controls and Delivery records;
- real UI verified for row click → native detail, Queue action → linked Session, and first-click Trash → native delete confirmation;
- native `QueueOutline` / `TrashOutline` glyphs used from the pinned DSH icon set;
- `plugins.detail.section` ownership guard regression-tested against foreign bundle, row and item subjects;
- notification preferences, recurring unread counts, popup dedupe and Session attention retain regression coverage;
- package remains inert when Schedule is absent through optional `remote.schedule` injection.

For a future DSH release, repeat these gates against that version and do not assume this pinned fork remains compatible.

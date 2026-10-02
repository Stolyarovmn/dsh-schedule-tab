# Migration inventory: `0.6.15` → DSH `0.2.0-rc.2`

Target: **DeepSeek Harness `0.2.0-rc.2` only**.

Authoritative references for this line are the version-matched `cordis-plugin-development` skill, `references/ui-plugin.md`, `references/practices.md`, `references/user-actions.md`, the shipped slots catalog, and the native `@deepseek-ai/dsh-client-ui-schedule@0.2.0-rc.2` implementation.

## Remove from the new line

The following `0.6.x` responsibilities are now native or rely on extension patterns that should not be carried forward:

- replacing the `main` / `schedules` page;
- custom task cards as the primary management UI;
- custom task editor and timing validation;
- native-detail bridge / embedding another feature package's `TaskManagerPage`;
- custom Delivery records rendering;
- custom delete flow;
- custom source-Session navigation;
- re-declaring or enabling `time-context`, `schedule`, or `ui-schedule` in this bundle patch;
- runtime import of `@deepseek-ai/dsh-client-ui-primitives` or other Harness Client internals;
- DOM observation or selectors that reach outside the registered component;
- recoloring native Session-row schedule marks through host-DOM CSS;
- adaptive polling near due times when `schedule/changed` plus reconnect invalidation is sufficient.

## Keep in the first 0.2.x implementation

These remain differentiated and can be implemented without replacing native Schedule UI:

- browser-local seen state for newly discovered active tasks;
- browser-local seen state for newly recorded deliveries;
- separate one-time popup-deduplication state;
- first-read baselining so installing/upgrading does not replay historical tasks/deliveries as new;
- compatibility with `seen-v1` → `seen-v2` migration;
- compatibility with existing `notification-preferences-v1` values;
- consuming disabled notification categories without replaying a backlog later;
- `shell.overlay` popup for a new delivery with Open conversation;
- visible numeric unread badge on the existing `schedules` sidebar glyph, constrained to that glyph's public slot;
- overdue state independent from unread state;
- browser-local notification settings on the bundle detail page through the public `plugins.detail.section` slot;
- cross-tab preference synchronization;
- explicit rule that a Schedule delivery receipt is inbox delivery, not model execution success/failure;
- English, Chinese and Russian localization.

## Native DSH remains authoritative

Do not duplicate these `0.2.0-rc.2` features:

- global Automation tasks page;
- native text search and All / Active / Inactive filters;
- task name, instruction and timing editing;
- Once / Every / Daily / Weekly / Monday-to-Friday / Cron controls;
- IANA time-zone selector and date/time controls;
- Delivery records pagination and retention messaging;
- task deletion and mutation conflict handling;
- right-Sidebar task detail;
- linked Session navigation;
- Session-header reminder button/popover;
- Session-row schedule mark and hover content;
- `schedule_create` transcript card.

## Deferred until a suitable public extension point exists

`TaskManagerPage` in `0.2.0-rc.2` declares no child slot for additive controls. Therefore these useful `0.6.x` features are not copied into the first port:

- Today / Overdue / Recurring filters;
- grouping by date;
- grouping by source Session;
- search by resolved Session title;
- per-task attention dot inside the native task row;
- per-task acknowledgement when native Rules/Delivery records is opened;
- numeric unread count next to the native Automation tasks **text label** (the public sidebar slot owns only the glyph, so the badge is rendered inside the glyph instead);
- in-page notification settings button inside native `TaskManagerPage`.

If a later DSH version exposes additive slots in the task manager, re-evaluate these features there. Do not replace the whole native page merely to regain them.

## First 0.2.x architecture

```text
native @deepseek-ai/dsh-experimental-schedule-bundle
  ├─ time-context
  ├─ schedule
  └─ ui-schedule
       ├─ native Automation tasks page (unchanged)
       └─ native schedules sidebar entry
             ↑ presentation only
@stolyarovmn/dsh-client-ui-schedule-tab
  ├─ optional remote.schedule integration
  ├─ reuse sidebar.panellist id=schedules for attention glyph + unread badge
  ├─ plugins.detail.section for browser-local notification preferences
  └─ shell.overlay delivery notification
```

The plugin patch inserts only its own row. If the official Schedule bundle is not enabled, optional `remote.schedule` injection keeps the enhancer inactive.

## Verification gates before release

- inspect live `Slots` and `Theme` on an installed `0.2.0-rc.2` profile;
- confirm replacement risk and props for `sidebar.panellist` and `shell.overlay`;
- install by commit SHA with the official Automation tasks bundle enabled;
- confirm no `main/schedules` replacement and no duplicate sidebar entry;
- verify first-install baselining, recurring delivery unread state, popup dedupe, reconnect refresh and unload/reload cleanup;
- verify light and dark themes and keyboard focus;
- only after live UI verification remove `private: true`, choose an RC version, merge to `main`, publish and release.


## 0.8.0-dev.3 exception: pinned native TaskManager fork

Real UI testing of the first 0.8 prototype showed that a hand-redrawn list/detail pair drifted from Harness: action icons were not from the product icon set and the right detail column lost native TaskDetail behavior.

The replacement experiment therefore restarts from stable 0.7.0 and uses a build-time snapshot of **DeepSeek Harness dsh-v0.2.0-rc.2**:

- source: shipped `ui-schedule` TaskManagerPage, TaskDetail and dependencies;
- controls/icons: bundled source snapshot of the exact ui-primitives used by that version;
- runtime dependency rule: the generated bundle contains no `require('@deepseek-ai/dsh-client-ui-primitives')`;
- page shadow: keyed `main/schedules`, priority `-100`;
- patch boundary: one quick-action group added beside each native task row;
- Open Session uses native Session navigation;
- Details uses the native row selection and the original in-page TaskDetail;
- Delete selects the native task detail and opens its native confirmation flow;
- Rules editing, timing/time-zone controls, Delivery records and delete toast remain the pinned native implementation.

This is intentionally version-specific. When DSH changes, regenerate/review the snapshot against that target version rather than carrying it forward. Prefer an upstream row-actions slot and delete this fork when such a slot exists.

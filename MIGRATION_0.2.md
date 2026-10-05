# Migration inventory: `0.6.15` → DSH `0.2.1-alpha.1`

Target: **DeepSeek Harness `0.2.1-alpha.1` only**.

Authoritative references for this line are the version-matched `cordis-plugin-development` skill, `references/ui-plugin.md`, `references/practices.md`, `references/user-actions.md`, `references/verification.md`, the shipped slots catalog, the native `@deepseek-ai/dsh-client-ui-schedule@0.2.1-alpha.1` implementation, and the official Schedule bundle retirement upgrade guide.

The native `ui-schedule` client entry used by this plugin has the same source SHA in DSH `0.2.0-rc.2` and `0.2.1-alpha.1`, so the public Schedule slots and Remote calls consumed by the existing `0.7.0` port remain structurally unchanged. The important composition change is that Schedule is now owned by Web rather than an optional bundle.

## DSH 0.2.1 composition change

In `0.2.1-alpha.1`, `@deepseek-ai/dsh-web-app` mounts `schedule` and `ui-schedule` in every Web profile. The old optional Automation Tasks bundle is retired and removed from profile bundle selections during profile loading. Existing tasks and delivery records are preserved.

Therefore this plugin:

- does not insert, enable or override native `schedule` / `ui-schedule` rows;
- does not instruct users to enable an Automation Tasks bundle;
- keeps `remote.schedule` optional so a nonstandard composition cannot crash the profile;
- continues to enhance only public native surfaces.

## Remove from the new line

The following `0.6.x` responsibilities are native or rely on extension patterns that should not be carried forward:

- replacing the `main` / `schedules` page;
- custom task cards as the primary management UI;
- custom task editor and timing validation;
- native-detail bridge / embedding another feature package's `TaskManagerPage`;
- custom Delivery records rendering;
- custom delete flow;
- custom source-Session navigation;
- re-declaring or enabling Schedule rows in this bundle patch;
- runtime import of `@deepseek-ai/dsh-client-ui-primitives` or other Harness Client internals;
- DOM observation or selectors that reach outside the registered component;
- recoloring native Session-row schedule marks through host-DOM CSS;
- adaptive polling near due times when `schedule/changed` plus reconnect invalidation is sufficient.

## Keep in `0.7.1-alpha.1`

These remain differentiated and fit public extension points:

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
- browser-local notification settings on the bundle detail page through `plugins.detail.section`;
- cross-tab preference synchronization;
- explicit rule that a Schedule delivery receipt is inbox delivery, not model execution success/failure;
- English, Chinese and Russian localization.

The plugin UI does not perform application-data mutations that need a mirrored agent tool under the new `user-actions.md` guidance. **Open conversation** is navigation, and the notification switches are browser-local preference state owned by this enhancer.

## Native DSH remains authoritative

Do not duplicate these `0.2.1-alpha.1` features:

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

The native `TaskManagerPage` still exposes no child slot for additive per-task attention controls. Therefore these useful `0.6.x` features remain deferred:

- Today / Overdue / Recurring filters;
- grouping by date;
- grouping by source Session;
- search by resolved Session title;
- per-task attention dot inside the native task row;
- per-task acknowledgement when native Rules/Delivery records is opened;
- numeric unread count next to the native Automation tasks text label;
- in-page notification settings button inside native `TaskManagerPage`.

Do not replace the whole native page merely to regain them.

## `0.7.1-alpha.1` architecture

```text
@deepseek-ai/dsh-web-app
  ├─ schedule
  └─ ui-schedule
       ├─ native Automation tasks page (unchanged)
       └─ native schedules sidebar entry
             ↑ presentation / attention only
@stolyarovmn/dsh-client-ui-schedule-tab
  ├─ optional remote.schedule integration
  ├─ reuse sidebar.panellist id=schedules for attention glyph + unread badge
  ├─ sidebar.session.row.leading for scheduled Session attention
  ├─ plugins.detail.section for browser-local notification preferences
  └─ shell.overlay delivery notification
```

The plugin patch inserts only its own `schedule-attention-enhancer` row.

## Verification gates before promotion

- exact target in `peerDependencies`: `0.2.1-alpha.1`;
- syntax, contract tests and `npm pack --dry-run` pass;
- CI installs the package into a clean DSH `0.2.1-alpha.1` Web profile;
- profile contains no retired Automation Tasks bundle selection;
- Web boots without failed plugin entries;
- inspect live `Slots` and `Theme` on the installed target profile;
- confirm no `main/schedules` replacement and no duplicate sidebar entry;
- verify first-install baselining, recurring delivery unread state, popup dedupe, reconnect refresh and unload/reload cleanup;
- verify light and dark themes and keyboard focus;
- only after live UI verification promote the package beyond alpha and widen compatibility if another DSH build is actually tested.

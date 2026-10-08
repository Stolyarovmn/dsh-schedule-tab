# Migration inventory: schedule attention → DSH `0.2.1-alpha.1`

Target: **DeepSeek Harness `0.2.1-alpha.1` only** for the `0.8.0-dev.6` line.

Authoritative references for this line are the version-matched `cordis-plugin-development` skill, `references/ui-plugin.md`, `references/practices.md`, `references/user-actions.md`, `references/verification.md`, the shipped slots/API contracts, and the native `@deepseek-ai/dsh-client-ui-schedule@0.2.1-alpha.1` implementation.

## DSH change from `0.2.0-rc.2`

Automation Tasks are no longer an optional bundle. `@deepseek-ai/dsh-web-app` mounts `schedule` and `ui-schedule` directly in Web profiles. The retired `@deepseek-ai/dsh-experimental-schedule-bundle` must not be installed, re-enabled or referenced as a prerequisite by this plugin.

Existing stored tasks and delivery records remain owned by DSH and survive that migration.

## Responsibilities that remain native

The plugin must not reimplement these as independent application logic:

- task catalog ownership and persistence;
- Schedule create/update/delete/history Host operations;
- native text search and All / Active / Inactive filters;
- task name, prompt and timing editing;
- Once / Every / Daily / Weekly / Cron controls;
- IANA time-zone and date/time controls;
- Delivery records and retention messaging;
- mutation conflict handling;
- native task detail layout and semantics;
- Session-header reminder catalog;
- Session-row schedule mark/hover behavior not replaced by the attention indicator;
- `schedule_create` transcript card.

## Differentiated attention behavior retained

The `0.8.0-dev.6` line keeps all behavior already present in `0.8.0-dev.5`:

- browser-local seen state for newly discovered active tasks;
- browser-local seen state for newly recorded deliveries;
- one-time popup-deduplication state;
- first-read baselining so install/upgrade does not replay historical deliveries as new;
- compatibility with `seen-v1` → `seen-v2` state;
- compatibility with `notification-preferences-v1`;
- consuming disabled attention categories without replaying a backlog later;
- `shell.overlay` popup for a new delivery with Open conversation;
- visible numeric unread badge on the existing `schedules` sidebar glyph;
- overdue state independent from unread state;
- browser-local notification switches through `plugins.detail.section`;
- detail-subject ownership guard so settings render only for this bundle;
- cross-tab preference synchronization;
- Session-row unread scheduled-activity indicator;
- explicit distinction between Schedule delivery receipt and model execution success/failure;
- English, Chinese and Russian attention-layer localization.

## Native quick actions retained

DSH `0.2.1-alpha.1` still has no additive row-actions slot inside `TaskManagerPage`. Therefore the useful `0.8.0-dev.5` quick actions are retained through a version-pinned native page shadow:

- **Open linked Session** — native `QueueOutline` glyph, `uiWorkspace.openSession` navigation, and scheduled-activity acknowledgement;
- **Delete** — native `TrashOutline` glyph; first click selects the row then transfers into the native confirmation state;
- row click itself remains the native TaskDetail action, so no separate Details button is added.

Delete does not maintain duplicate mutation logic. It ultimately calls the target DSH Schedule Host operation through `remote.schedule.delete`, which is the same application operation used by the native UI/tool path. Open linked Session is a pure view/navigation action.

## Pinned native TaskManager strategy

The build copies the target DSH `ui-schedule/src/client` implementation and the minimum required `ui-primitives` source into a synthetic client package, rewrites internal imports to bundled local primitives/utilities, bundles the exact resolved `clsx`, and patches only the task-row shell.

The generated helper is constrained so its runtime module-table imports are only:

```text
react
react/jsx-runtime
react-dom
react-dom/client
```

It must not runtime-import `@deepseek-ai/dsh-client-ui-primitives` or other Harness Client internals.

The plugin shadows the native keyed `main/schedules` registration at `priority: -100`; the shipped native registration remains present. This is intentionally version-specific and should be deleted in favor of an additive upstream row-actions slot if DSH exposes one later.

## Source-drift check for this target

The official GitHub compare from `dsh-v0.2.0-rc.2` to `dsh-v0.2.1-alpha.1` contains no changes under:

```text
packages/client/ui-schedule/src/client/
packages/client/ui-primitives/src/
```

The native `TaskManagerPage.tsx` also has the same blob SHA in both tags. Therefore the generated helper committed for `0.8.0-dev.5` is source-equivalent for this target. `tools/prepare-native-manager.mjs` remains the reproducible regeneration path and is retargeted/documented for `0.2.1-alpha.1`.

This equivalence is specific to this pair of DSH releases. A future upgrade must repeat the source-drift review and regenerate when any copied source changes.

## Plugin architecture

```text
DSH 0.2.1-alpha.1 Web composition
  ├─ schedule                     native Host service
  └─ ui-schedule                  native Automation Tasks UI
       ├─ native schedules sidebar registration
       ├─ native TaskManagerPage
       ├─ native TaskDetail / Rules / Delivery records
       └─ native delete/update/history operations

@stolyarovmn/dsh-client-ui-schedule-tab 0.8.0-dev.6
  ├─ optional remote.schedule integration
  ├─ attention badge on sidebar.panellist / schedules
  ├─ Session scheduled-activity mark
  ├─ plugins.detail.section notification preferences
  ├─ shell.overlay delivery popup
  └─ main/schedules shadow at priority -100
       └─ target-native TaskManager snapshot
            └─ only patch: Open linked Session + Delete row actions
```

The bundle patch inserts only `schedule-attention-enhancer`. It does not declare or enable `schedule`, `ui-schedule`, or a retired Automation Tasks bundle.

## Verification gates before promotion

Automated:

- validate `package.json` and exact peer target `0.2.1-alpha.1`;
- JavaScript syntax checks;
- browser-state regression tests;
- contract tests for all attention behavior;
- contract tests for native helper external-module restrictions;
- contract tests for Queue/Trash quick actions and first-click delete confirmation;
- contract test that no retired Automation Tasks bundle is required;
- `npm pack --dry-run`;
- clean-profile install smoke against `@deepseek-ai/dsh@0.2.1-alpha.1`;
- Web boot smoke with built-in Schedule and no failed plugin entries.

Real UI:

- confirm only one Automation tasks sidebar entry;
- confirm unread/overdue indicators and popup behavior;
- confirm plugin settings appear only on this plugin detail;
- confirm New/search/status filters;
- confirm row click → TaskDetail;
- confirm Rules editing, timing/time-zone controls and Delivery records;
- confirm Open linked Session goes to the correct Session;
- confirm Delete opens native confirmation on the first click and native deletion toast still appears;
- confirm light/dark theme, focus, Escape/menu behavior;
- confirm unload/reload/reconnect does not duplicate registrations/subscriptions.

Do not merge/publish/release from this development line until those real-UI checks pass and release is explicitly requested.

## Legacy lines

- `legacy/dsh-0.1.5.x` — plugin `0.5.1`.
- `legacy/dsh-0.1.7.x` — plugin `0.6.15`.
- `dsh-0.2.0-rc.2` — attention-only `0.7.0`.
- `install-0.8.0-dev.5` — native quick-actions experiment for DSH `0.2.0-rc.2`.
- `dsh-0.2.1-alpha.1-0.8.0-dev.6` — full quick-actions port for DSH `0.2.1-alpha.1`.

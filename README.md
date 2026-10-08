# DSH Automation Tasks Attention + Native Quick Actions

This development line targets **DeepSeek Harness `0.2.1-alpha.1` only**. It intentionally carries no compatibility layer for `0.1.x` and no dependency on the retired `@deepseek-ai/dsh-experimental-schedule-bundle` workflow.

The plugin keeps the native Automation Tasks behavior and adds two narrow row actions plus attention/notification features. DSH `0.2.1-alpha.1` mounts `schedule` and `ui-schedule` directly from the Web composition; no separate Automation Tasks bundle needs to be enabled.

## Scope of `0.8.0-dev.6`

The build preserves the full `0.8.0-dev.5` functionality while retargeting it to DSH `0.2.1-alpha.1`:

- new-task and new-delivery seen state;
- one-time popup notification for a newly recorded delivery;
- compact numeric unread badge on the existing Automation tasks sidebar icon (`1`…`9+`);
- unread delivery counts backed by native retained `schedule.history`, including repeated deliveries from the same recurring task;
- overdue warning on the same sidebar icon when there is no unread count;
- Session-row unread activity indicator for scheduled deliveries;
- compatibility with the `0.6.x` browser-local `seen-v2`, delivery-notified and notification-preference keys;
- browser-local switches for popup notifications, new-task attention and new-delivery attention on this bundle's own Plugins detail page;
- cross-tab synchronization of notification preferences;
- English, Chinese and Russian attention-layer strings;
- native New/search/status-filter controls;
- native TaskDetail, Rules editing, timing/date/time/time-zone controls and Delivery records;
- native delete confirmation, mutation handling and deletion toast;
- **Open linked Session** quick action on every task row using the native `QueueOutline` glyph;
- **Delete** quick action on every task row using the native `TrashOutline` glyph;
- task-row click continues to open the native TaskDetail, so no redundant Details button is added;
- first-click row Delete selects the task and opens the native confirmation through the deferred native confirmation state.

Task-center unread is acknowledged only when Automation tasks transitions from not selected to selected. Hovering or an ordinary sidebar rerender must not clear it. Session-row scheduled activity is tracked separately and clears only when that Session's Conversation is actually visible, or when a plugin action explicitly opens that linked Session.

## Native-page strategy

DSH `0.2.1-alpha.1` still exposes no additive task-row action slot inside `TaskManagerPage`. The plugin therefore uses the same narrow strategy proven in `0.8.0-dev.5`:

1. take the exact native `ui-schedule/src/client` implementation from the target DSH source;
2. bundle the required native primitives into the generated helper instead of runtime-importing Harness Client internals;
3. patch only the row shell to add **Open linked Session** and **Delete**;
4. shadow only keyed `main/schedules` at `priority: -100`;
5. leave all other Automation Tasks semantics in the copied native implementation.

For this target, the official compare `dsh-v0.2.0-rc.2...dsh-v0.2.1-alpha.1` contains no changes under `packages/client/ui-schedule/src/client/` or `packages/client/ui-primitives/src/`. Therefore the generated native helper from `0.8.0-dev.5` remains source-equivalent for `0.2.1-alpha.1`; the build tooling and tests are retargeted so any future source drift is reviewed instead of silently carried forward.

The generated helper's remaining runtime `require()` calls are restricted to Harness platform modules (`react`, `react/jsx-runtime`, `react-dom`, `react-dom/client`). `clsx` and the required native primitives are bundled into the helper.

## DSH `0.2.1-alpha.1` ownership

Automation Tasks are built into Web in this version. The plugin does **not** insert, enable or own the official `schedule` or `ui-schedule` rows. It inserts only `schedule-attention-enhancer`.

Attention integration still uses optional `remote.schedule` injection so a nonstandard composition without the Schedule service stays inert instead of crashing.

Quick Delete calls the native Schedule Host operation through `remote.schedule.delete`; it does not implement a second delete path. Open linked Session is a view/navigation action through `uiWorkspace.openSession`.

## Development install

`0.8.0-dev.6` is private and must be installed by branch or commit SHA.

```powershell
$DSH_VERSION = "0.2.1-alpha.1"
$PROFILE = "registry-test"
$REF = "dsh-0.2.1-alpha.1-0.8.0-dev.6"

pnpm dlx "@deepseek-ai/dsh@$DSH_VERSION" plugin --profile $PROFILE add "github:Stolyarovmn/dsh-schedule-tab#$REF"
pnpm dlx "@deepseek-ai/dsh@$DSH_VERSION" $PROFILE
```

For final verification prefer an exact commit SHA instead of the moving branch name.

## Verification target

Before promoting this line beyond development status, verify in a real DSH `0.2.1-alpha.1` Web profile:

- native Automation tasks is present without enabling an extra bundle;
- exactly one `schedules` sidebar entry is visible;
- native New/search/All-Active-Inactive filters still work;
- row click opens native TaskDetail;
- Rules editing and timing/time-zone controls still work;
- Delivery records still load and paginate;
- **Open linked Session** opens the correct Session and acknowledges its scheduled activity;
- **Delete** opens native confirmation on the first click and native deletion/toast behavior remains intact;
- unread badge, overdue state and delivery popup work;
- notification preferences render only on this plugin's detail page and persist/synchronize across tabs;
- reconnect and plugin unload/reload do not duplicate subscriptions or registrations;
- light/dark themes, focus, Escape and keyboard behavior remain native-looking.

## Version lines

- `legacy/dsh-0.1.5.x` — plugin `0.5.1`.
- `legacy/dsh-0.1.7.x` — plugin `0.6.15`.
- `dsh-0.2.0-rc.2` — stable attention-only plugin `0.7.0`.
- `install-0.8.0-dev.5` — native quick-actions experiment for DSH `0.2.0-rc.2`.
- `dsh-0.2.1-alpha.1-0.8.0-dev.6` — full quick-actions port for DSH `0.2.1-alpha.1`.

See [`MIGRATION_0.2.md`](MIGRATION_0.2.md) for the architecture and migration decision record.

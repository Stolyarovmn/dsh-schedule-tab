# DSH Automation Tasks Attention + Native Quick Actions

This development line targets **DeepSeek Harness `0.2.0-rc.2` only**. It intentionally carries no compatibility layer for `0.1.x`.

`0.7.0` keeps the shipped Automation Tasks page unchanged. The `0.8.0-dev.3` experiment restarts from that stable line and shadows only `main/schedules` with a **pinned source snapshot of DSH `0.2.0-rc.2` TaskManagerPage/TaskDetail**. The native code is preserved; the only intended UI patch is a three-button quick-action group beside each task row.

## Scope of `0.8.0-dev.3`

The first `0.2.x` implementation keeps only differentiated attention behavior:

- new-task and new-delivery seen state;
- one-time popup notification for a newly recorded delivery;
- a compact neutral numeric unread badge on the existing Automation tasks sidebar icon (`1`…`9+`), using the same adaptive gray surface/primary text tokens as native ghost controls (light gray + white text in dark theme);
- unread delivery counts backed by native retained `schedule.history`, so repeated runs of the same recurring task can contribute `2`, `3`, … rather than collapsing to its single `lastDelivery` receipt;
- overdue warning on that same icon (`!` when there is no unread count);
- a native-style green Session-row completion dot for unread scheduled activity when DSH's built-in completion reminder is suppressed by retained `mainView` state;
- compatibility with the `0.6.x` browser-local `seen-v2`, delivery-notified and notification-preference keys;
- browser-local notification settings on this bundle's own **Plugins** detail page using the public `plugins.detail.section` slot;
- cross-tab synchronization of those preferences;
- English, Chinese and Russian attention-layer strings;
- pinned native Automation Tasks page behavior: native New/search/filters, TaskDetail, Rules editing, timing/time-zone controls, Delivery records, delete confirmation and native deletion toast;
- three row actions using the **actual DSH icon set** bundled from the pinned source snapshot: linked Session, task details, delete.

Task-center unread is acknowledged only when Automation tasks transitions from not selected to selected. Hovering or an ordinary sidebar rerender must not clear it. Session-row scheduled activity is tracked separately and clears only when that Session's Conversation is actually visible (`activePanelId === null`), or when **Open conversation** is used from the popup. `0.2.0-rc.2` still exposes no child row-actions slot. Therefore the 0.8 experiment uses the documented keyed `main/schedules` shadow at `priority: -100`. The build copies the exact DSH source and primitives for this pinned version and applies one narrow row patch instead of maintaining a hand-redrawn TaskManager.

The generated native helper is checked for module-table drift: its remaining runtime `require()` calls are restricted to Harness platform modules (`react`, `react/jsx-runtime`, `react-dom`, `react-dom/client`). Non-shared utilities such as the pinned DSH `clsx@2.1.1` are bundled into the helper instead of being left as loader dependencies.

## Required native capability

The plugin does **not** enable or re-declare the DSH Schedule rows. Delivery-history enrichment uses the public `remote.schedule.history` API with a page size of 10 and at most four concurrent reads; it stops once the UI already knows the badge is `9+`. Enable **Automation tasks** in Plugins → Official first. That selects `@deepseek-ai/dsh-experimental-schedule-bundle`, which owns `time-context`, `schedule`, and `ui-schedule` in DSH `0.2.0-rc.2`.

When Schedule is absent, this plugin stays inert through optional `remote.schedule` injection rather than failing the profile.

## Development install

`0.8.0-dev.3` is private and must be installed by commit SHA. Stable `0.7.0` remains the published fallback until the pinned native fork is verified in the real Harness UI.

```powershell
$DSH_VERSION = "0.2.0-rc.2"
pnpm dlx "@deepseek-ai/dsh@$DSH_VERSION" plugin --profile registry-test add "github:Stolyarovmn/dsh-schedule-tab#<COMMIT_SHA>"
pnpm dlx "@deepseek-ai/dsh@$DSH_VERSION" registry-test
```

## Legacy lines

- `legacy/dsh-0.1.5.x` — plugin `0.5.1`.
- `legacy/dsh-0.1.7.x` — plugin `0.6.15`.

See [`MIGRATION_0.2.md`](MIGRATION_0.2.md) for the feature-by-feature decision record.

## Install

After npm publication:

```powershell
pnpm dlx @deepseek-ai/dsh@0.2.0-rc.2 plugin --profile registry-test add "@stolyarovmn/dsh-client-ui-schedule-tab@0.7.0"
pnpm dlx @deepseek-ai/dsh@0.2.0-rc.2 registry-test
```

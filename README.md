# DSH Automation Tasks Attention + Native Quick Actions

Stable `0.8.0` targets **DeepSeek Harness `0.2.0-rc.2` only**. It intentionally carries no compatibility layer for `0.1.x`.

`0.8.0` keeps DSH's shipped Automation Tasks behavior by building from a **pinned source snapshot of DSH `0.2.0-rc.2` TaskManagerPage/TaskDetail** and applying one narrow row-actions patch. The native task list, editor and detail behavior remain intact; the visible addition is a two-button quick-action group beside each task row.

## Scope of `0.8.0`

The plugin provides differentiated attention behavior on top of the native Schedule feature:

- new-task and new-delivery seen state;
- one-time popup notification for a newly recorded delivery;
- a compact neutral numeric unread badge on the existing Automation tasks sidebar icon (`1`…`9+`), using native theme tokens;
- unread delivery counts backed by native retained `schedule.history`, so repeated runs of the same recurring task can contribute `2`, `3`, … rather than collapsing to a single `lastDelivery` receipt;
- overdue warning on that same icon (`!` when there is no unread count);
- a native-style green Session-row completion dot for unread scheduled activity when DSH's built-in completion reminder is suppressed by retained `mainView` state;
- compatibility with the `0.6.x` browser-local `seen-v2`, delivery-notified and notification-preference keys;
- browser-local notification settings on this bundle's own **Plugins** detail page using the public `plugins.detail.section` slot; the contribution checks `subject` and renders `null` for every foreign bundle/row/item detail;
- cross-tab synchronization of those preferences;
- English, Chinese and Russian attention-layer strings;
- pinned native Automation Tasks page behavior: native New/search/filters, TaskDetail, Rules editing, timing/time-zone controls, Delivery records, delete confirmation and native deletion toast;
- two row actions using the **actual DSH icon set** bundled from the pinned source snapshot: `QueueOutline` opens the linked Session and `TrashOutline` starts deletion;
- clicking the task row itself opens its native TaskDetail, so there is no redundant details button;
- the row trash opens the native delete confirmation on the first click.

Task-center unread is acknowledged only when Automation tasks transitions from not selected to selected. Hovering or an ordinary sidebar rerender does not clear it. Session-row scheduled activity is tracked separately and clears only when that Session's Conversation is actually visible (`activePanelId === null`), or when **Open conversation** is used from the popup.

DSH `0.2.0-rc.2` exposes no additive task-row actions slot. For that reason `0.8.0` intentionally shadows the keyed `main/schedules` page at `priority: -100`. The shipped DSH registration remains present at its native priority; our build copies the exact `0.2.0-rc.2` Schedule source and primitives and applies only the row-actions patch instead of maintaining a separately designed task manager.

The generated native helper is checked for module-table drift: remaining runtime `require()` calls are restricted to Harness platform modules (`react`, `react/jsx-runtime`, `react-dom`, `react-dom/client`). Non-shared utilities such as the pinned DSH `clsx@2.1.1` are bundled into the helper instead of being left as loader dependencies.

Session navigation follows the shipped `ui-schedule` implementation and uses the root `uiWorkspace` service. The same callback backs both the quick Session action on a task row and **Linked session** in the native TaskDetail.

## Required native capability

The plugin does **not** enable or re-declare the DSH Schedule Host rows. Enable **Automation tasks** in Plugins → Official first. That selects `@deepseek-ai/dsh-experimental-schedule-bundle`, which owns `time-context`, `schedule`, and `ui-schedule` in DSH `0.2.0-rc.2`.

Delivery-history enrichment uses the public `remote.schedule.history` API with a page size of 10 and at most four concurrent reads; it stops once the UI already knows the badge is `9+`.

When Schedule is absent, this plugin stays inert through optional `remote.schedule` injection rather than failing the profile.

## Install

```powershell
$DSH_VERSION = "0.2.0-rc.2"
pnpm dlx "@deepseek-ai/dsh@$DSH_VERSION" plugin --profile registry-test add "@stolyarovmn/dsh-client-ui-schedule-tab@0.8.0"
pnpm dlx "@deepseek-ai/dsh@$DSH_VERSION" registry-test
```

## Upgrade from `0.7.0`

Install `0.8.0` into the same profile. Browser-local seen state and notification preferences are preserved.

```powershell
pnpm dlx @deepseek-ai/dsh@0.2.0-rc.2 plugin --profile registry-test add "@stolyarovmn/dsh-client-ui-schedule-tab@0.8.0"
```

## Legacy lines

- `legacy/dsh-0.1.5.x` — plugin `0.5.1`.
- `legacy/dsh-0.1.7.x` — plugin `0.6.15`.
- DSH `0.2.0-rc.2` without row quick actions — plugin `0.7.0`.

See [`MIGRATION_0.2.md`](MIGRATION_0.2.md) for the feature-by-feature decision record and the reason for the version-pinned TaskManager fork in `0.8.0`.

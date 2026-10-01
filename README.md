# DSH Automation Tasks Attention — 0.2.x development line

This branch targets **DeepSeek Harness `0.2.0-rc.2` only**. It intentionally carries no compatibility layer for `0.1.x`.

The package no longer replaces the native **Automation tasks** page. DeepSeek Harness `0.2.0-rc.2` already owns task listing, search, status filtering, task details, editing, delivery records, deletion, Session navigation, the Session-header reminder catalog, Session-row marks, and the `schedule_create` transcript card.

## Scope of `0.7.0-dev.7`

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
- English, Chinese and Russian visible strings.

Task-center unread is acknowledged only when Automation tasks transitions from not selected to selected. Hovering or an ordinary sidebar rerender must not clear it. Session-row scheduled activity is tracked separately and clears only when that Session's Conversation is actually visible (`activePanelId === null`), or when **Open conversation** is used from the popup. Per-task acknowledgement from the native task detail is still deferred because `0.2.0-rc.2` exposes no child slot inside `TaskManagerPage` for an additive plugin contribution.

## Required native capability

The plugin does **not** enable or re-declare the DSH Schedule rows. Delivery-history enrichment uses the public `remote.schedule.history` API with a page size of 10 and at most four concurrent reads; it stops once the UI already knows the badge is `9+`. Enable **Automation tasks** in Plugins → Official first. That selects `@deepseek-ai/dsh-experimental-schedule-bundle`, which owns `time-context`, `schedule`, and `ui-schedule` in DSH `0.2.0-rc.2`.

When Schedule is absent, this plugin stays inert through optional `remote.schedule` injection rather than failing the profile.

## Development install

Install the branch by commit SHA while testing. Do not publish this development version.

```powershell
$DSH_VERSION = "0.2.0-rc.2"
pnpm dlx "@deepseek-ai/dsh@$DSH_VERSION" plugin --profile registry-test add "github:Stolyarovmn/dsh-schedule-tab#<COMMIT_SHA>"
pnpm dlx "@deepseek-ai/dsh@$DSH_VERSION" registry-test
```

## Legacy lines

- `legacy/dsh-0.1.5.x` — plugin `0.5.1`.
- `legacy/dsh-0.1.7.x` — plugin `0.6.15`.

See [`MIGRATION_0.2.md`](MIGRATION_0.2.md) for the feature-by-feature decision record.

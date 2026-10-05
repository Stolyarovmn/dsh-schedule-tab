# DSH Automation Tasks Attention

This branch targets **DeepSeek Harness `0.2.1-alpha.1` only**. It intentionally carries no compatibility layer for DSH `0.1.x` or the retired `0.2.0-rc.2` Automation Tasks bundle workflow.

The package does not replace the native **Automation tasks** page. In DSH `0.2.1-alpha.1`, Web mounts `schedule` and `ui-schedule` itself, while the native UI continues to own task listing, search, status filtering, task details, editing, delivery records, deletion, Session navigation, the Session-header reminder catalog, Session-row marks, and the `schedule_create` transcript card.

## Scope of `0.7.1-alpha.1`

This compatibility build keeps only differentiated attention behavior:

- new-task and new-delivery seen state;
- one-time popup notification for a newly recorded delivery;
- a compact neutral numeric unread badge on the existing Automation tasks sidebar icon (`1`…`9+`), using native Harness theme tokens;
- unread delivery counts backed by native retained `schedule.history`, so repeated runs of the same recurring task can contribute `2`, `3`, … rather than collapsing to its single `lastDelivery` receipt;
- overdue warning on that same icon (`!` when there is no unread count);
- a native-style Session-row completion dot for unread scheduled activity;
- compatibility with the `0.6.x` browser-local `seen-v2`, delivery-notified and notification-preference keys;
- browser-local notification settings on this bundle's own **Plugins** detail page using the public `plugins.detail.section` slot;
- cross-tab synchronization of those preferences;
- English, Chinese and Russian visible strings.

Task-center unread is acknowledged only when Automation tasks transitions from not selected to selected. Hovering or an ordinary sidebar rerender must not clear it. Session-row scheduled activity is tracked separately and clears only when that Session's Conversation is actually visible (`activePanelId === null`), or when **Open conversation** is used from the popup.

Per-task acknowledgement from the native task detail remains deferred because the native `TaskManagerPage` still does not expose a child slot for this additive behavior. The plugin intentionally does not replace the native page to regain it.

## Native Schedule ownership in DSH 0.2.1-alpha.1

No separate Automation Tasks bundle needs to be enabled. DSH `0.2.1-alpha.1` retires the old optional bundle and `@deepseek-ai/dsh-web-app` mounts `schedule` and `ui-schedule` in every Web profile. Existing tasks and delivery records remain on disk during that migration.

The plugin still uses optional `remote.schedule` injection. This keeps its dependency weak and lets the enhancer remain inert rather than crash if the service is unavailable in a nonstandard composition.

Delivery-history enrichment uses the native `remote.schedule.history` API with a page size of 10 and at most four concurrent reads; it stops once the UI already knows the badge is `9+`.

## Development install

`0.7.1-alpha.1` is the validation build for DSH `0.2.1-alpha.1`. Install by commit SHA first; do not publish merely to test the port.

```powershell
$DSH_VERSION = "0.2.1-alpha.1"
pnpm dlx "@deepseek-ai/dsh@$DSH_VERSION" plugin --profile registry-test add "github:Stolyarovmn/dsh-schedule-tab#<COMMIT_SHA>"
pnpm dlx "@deepseek-ai/dsh@$DSH_VERSION" registry-test
```

## Verification target

Before promoting this line beyond alpha, verify in a real DSH `0.2.1-alpha.1` Web profile:

- the native Automation tasks entry is present without enabling an extra bundle;
- no duplicate `schedules` sidebar entry appears;
- unread badge, overdue state and delivery popup work;
- opening Automation tasks clears task-center attention only;
- opening the source Session clears its scheduled-activity indicator;
- notification preferences persist and synchronize across tabs;
- reconnect and plugin unload/reload do not duplicate subscriptions or registrations;
- light/dark themes and keyboard/focus behavior remain native-looking.

## Legacy lines

- `legacy/dsh-0.1.5.x` — plugin `0.5.1`.
- `legacy/dsh-0.1.7.x` — plugin `0.6.15`.
- `dsh-0.2.0-rc.2` — plugin `0.7.0`.

See [`MIGRATION_0.2.md`](MIGRATION_0.2.md) for the feature-by-feature decision record.

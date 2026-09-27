# DSH Schedule Control Center

`@stolyarovmn/dsh-client-ui-schedule-control-center` is a Web UI extension for **DeepSeek Harness 0.1.7-rc.2 only**.

It is intentionally a separate plugin from the legacy `@stolyarovmn/dsh-client-ui-schedule-tab` package. The rc2 implementation reads only the native Host-wide Schedule API and contains no Session-projection compatibility code.

## What it adds

- Global Host task catalog from native `schedule.catalog()`.
- Notification-style sidebar indicator: unseen/active count, overdue warning color, and zero suppression.
- Matching unread color on the native rc2 Session Schedule mark.
- Search by task title, reminder instruction, task id, Session id, or current Session title.
- Filters: **Active / All / Inactive / Today / Overdue / Recurring**.
- Grouping by date or source conversation.
- Explicit recurrence/rule badges for Every, Daily, Weekly, and Cron tasks.
- Correct stored wall-clock rule and IANA zone display for Daily/Weekly/Cron tasks.
- Retained inactive one-shot tasks from the rc2 catalog.
- Latest occurrence and durable delivery acknowledgment metadata.
- Native hard **Delete**, with the shipped DSH `Modal` confirmation and authoritative catalog readback before the row disappears.
- Paged **Delivery history** from `schedule.history()`.
- Delivery occurrence and acknowledgment timestamps are shown separately.
- Recurring delivery occurrences are formatted in the rule's stored IANA zone.
- Saved prompt snapshots and message ids are shown; message ids use the shared DSH clipboard helper and an icon action.
- Invalid history cursors get a dedicated refresh path.
- Confirmed history pruning shows the Host retention limits returned by the API.
- `schedule/changed` and connection reset both invalidate the catalog; late catalog responses cannot replace newer reads.
- Clicking a task card or its edit icon opens the source Session and then the native rc2 `scheduleTask` detail as soon as that Session's right Sidebar mounts. This is required because the native right Sidebar is Session-scoped and is not mounted on a root panel such as Schedule+.
- Row actions use native DSH icon buttons + tooltips where the meaning is unambiguous: edit, delivery history, conversation, delete, and copy message id.
- **New reminder** starts a new Session, matching native rc2 semantics: creation remains model-driven through the Schedule tools.

The plugin does **not** implement a scheduler, task database, pause/resume, Run now, or an execution-success state. DSH remains the single source of truth.

## Why editing is delegated to native rc2 UI

DSH rc2's native task detail owns several non-trivial semantics that should stay in one place:

- compare-and-update conflict handling with the complete expected record;
- unsaved-draft merging when the authoritative task changes concurrently;
- date + time + explicit timezone editing for one-shots;
- searchable IANA timezone selection;
- weekday editing;
- Cron validation and canonicalization behavior;
- inactive-task read-only behavior.

The control center therefore opens the native task detail for editing instead of carrying a second timing editor that could drift from DSH. Because DSH's right Sidebar is Session-scoped, opening from the global Schedule+ page first switches to the task's source Session, waits for the public `sidebarRight.mounted` source to report that Session, and only then opens `scheduleTask`.

## Delivery history semantics

A delivery record means the reminder message was durably acknowledged in the Session inbox. It does **not** mean the Agent completed the requested work successfully.

The Host bounds saved history by its Schedule configuration. rc2 defaults to 30 days and 200 records per task, but the control center displays the actual retention values returned by the running Host when pruning is confirmed.

Deleting a task is a hard delete: future deliveries stop and the saved delivery history is removed. A reminder message already queued for delivery cannot be recalled.

## rc1 / older DSH

Use the separate legacy package:

```text
@stolyarovmn/dsh-client-ui-schedule-tab@0.5.1
```

The legacy plugin is preserved on the `legacy/0.5.x` branch of this repository.

There is deliberately **no migration/fallback implementation in this rc2 plugin**. DSH rc2 itself does not migrate historical Session-log reminders into the Host Schedule store; old reminders must be recreated explicitly if they are still needed.

## Install

Do not install the legacy and rc2 packages into the same Web profile. If the legacy package is already present, remove it first:

```bash
pnpm dlx @deepseek-ai/dsh@0.1.7-rc.2 plugin --profile web remove @stolyarovmn/dsh-client-ui-schedule-tab
pnpm dlx @deepseek-ai/dsh@0.1.7-rc.2 plugin --profile web add @stolyarovmn/dsh-client-ui-schedule-control-center@0.1.0
```

For the development branch before npm publication:

```bash
pnpm dlx @deepseek-ai/dsh@0.1.7-rc.2 plugin --profile web add "git+https://github.com/Stolyarovmn/dsh-schedule-tab.git#feature/rc2-native-control-center-clean"
```

Then restart `dsh web` completely.

## Native rc2 stack

The bundle patch enables the shipped rc2 rows declaratively before boot:

- `time-context`
- `schedule`
- `ui-schedule`

It never creates legacy dynamic Schedule instances, never mutates Loader state at runtime, and never changes `session-controller` dependencies.

## Compatibility

Exact supported DSH version:

```text
0.1.7-rc.2
```

The exact peer version is deliberate. A later rc changes public UI/API contracts only after it has been reviewed and tested here.

## Development

```bash
npm run test:all
npm pack --dry-run
```

CI also installs the package into a generated DSH `0.1.7-rc.2` Web profile and verifies that the plugin and native Schedule rows compose successfully.

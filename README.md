# DSH Automation Tasks Enhancer

> **Compatibility:** **`@stolyarovmn/dsh-client-ui-schedule-tab@0.6.0` requires DeepSeek Harness `0.1.7-rc.2` exactly.**  
> Do **not** install 0.6.x on `0.1.7-rc.1`, `0.1.5-rc.3`, or older DSH builds. If you stay on pre-rc2 DSH, keep using **`@stolyarovmn/dsh-client-ui-schedule-tab@0.5.1`**.

`@stolyarovmn/dsh-client-ui-schedule-tab` enhances the **native Automation tasks panel in DeepSeek Harness 0.1.7-rc.2**.

Version **0.6.0 is the rc2 rewrite of the same package**, not a new package name. It does **not** add a second Schedule tab. The plugin reuses the shipped `schedules` sidebar/list cell and `main` keyed cell with higher slot priority, replacing only their presentation while leaving the native rc2 Schedule service, task detail, created-task cards, header utilities, and Session markers in place.

The 0.6.x code path is intentionally rc2-only: it reads the native Host-wide Schedule API and contains no Session-projection compatibility layer.

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
- Clicking a task card keeps the native navigation behavior: it opens the source Session and then the native rc2 `scheduleTask` right-Sidebar detail.
- The **edit icon is deliberately different**: it keeps you inside Automation tasks and opens a right-hand Rules pane in the same page. The history icon opens the same pane on Delivery records.
- The redundant Conversation action is removed. The card already performs the conversation/native-detail navigation; the edit icon is reserved for in-place editing.
- Row actions use native DSH icon buttons + tooltips where the meaning is unambiguous: edit, delivery history, delete, and copy message id.
- **New reminder** starts a new Session, matching native rc2 semantics: creation remains model-driven through the Schedule tools.

The plugin does **not** implement a scheduler, task database, pause/resume, Run now, or an execution-success state. DSH remains the single source of truth.

## Editing and native rc2 parity

The shipped rc2 Automation tasks page normally opens an inline TaskDetail. Because this plugin intentionally replaces that page presentation, it restores the same management surface in its own right-hand pane instead of dropping it:

- title and instruction editing;
- Once / Every / Daily / Monday-to-Friday / Weekly / Cron rules;
- hour / minute / second fixed-interval units with the Host's 60-second floor;
- one-shot date, time, and explicit IANA time zone;
- Daily/Weekly wall-clock time and IANA zone;
- weekday selection;
- five-field Cron expressions;
- inactive-task read-only behavior;
- compare-and-update through native `schedule.update()` with the complete observed record;
- conflict / ended / not-found handling without silently overwriting another update;
- dirty-field merge when an authoritative catalog refresh arrives during editing;
- Save / Cancel and unsaved-change state;
- Rules / Delivery records tabs and keyboard tab navigation;
- original-Session link, native Modal deletion, and native Toast feedback.

The native right-Sidebar `scheduleTask` detail is **also kept**. Clicking the whole card deliberately follows that original DSH path; the edit icon is the in-place alternative requested for the task manager.

The underlying scheduling capability is preserved, but the exact native editor widgets are not runtime-imported: DSH does not expose TaskDetail/DatePicker/ClockPicker/TaskMenu as extension slots, and its slot rules explicitly discourage importing another feature package's runtime UI. The in-place editor therefore uses DSH primitives and the public Schedule API. In particular, the native visual calendar/clock picker, recent-time-zone menu, and Cron form are represented by equivalent date/time/IANA-zone/Cron controls rather than copied private components.

## Delivery history semantics

A delivery record means the reminder message was durably acknowledged in the Session inbox. It does **not** mean the Agent completed the requested work successfully.

The Host bounds saved history by its Schedule configuration. rc2 defaults to 30 days and 200 records per task, but the control center displays the actual retention values returned by the running Host when pruning is confirmed.

Deleting a task is a hard delete: future deliveries stop and the saved delivery history is removed. A reminder message already queued for delivery cannot be recalled.

## rc1 / older DSH

The package name stays the same across the transition:

```text
@stolyarovmn/dsh-client-ui-schedule-tab@0.5.1  -> pre-rc2 DSH
@stolyarovmn/dsh-client-ui-schedule-tab@0.6.0  -> DSH 0.1.7-rc.2 only
```

The pre-rc2 implementation is preserved on the `legacy/0.5.x` branch.

There is deliberately **no migration/fallback implementation inside 0.6.x**. DSH rc2 itself does not migrate historical Session-log reminders into the Host Schedule store; old reminders must be recreated explicitly if they are still needed.

## Install

**Required DSH version: `0.1.7-rc.2`.** Version 0.6.0 declares the exact peer dependency `@deepseek-ai/dsh: 0.1.7-rc.2`.

If you currently use 0.5.1, upgrade DSH to rc2 first, then upgrade the same plugin package:

```bash
pnpm dlx @deepseek-ai/dsh@0.1.7-rc.2 plugin --profile web add @stolyarovmn/dsh-client-ui-schedule-tab@0.6.0
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

CI also installs the package into a generated DSH `0.1.7-rc.2` Web profile and verifies that the plugin and native Schedule rows compose successfully. The plugin deliberately shadows the native `schedules` main/panellist presentation through the documented keyed/list slot priority mechanism; it does not create a second navigation entry.

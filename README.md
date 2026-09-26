# @stolyarovmn/dsh-client-ui-schedule-tab

A DeepSeek Harness Web plugin that adds a global **Schedule** control center. On DSH 0.1.7-rc.2 it uses the native Host Schedule catalog for cross-session task management; older supported DSH releases keep the projection-based read-only compatibility path.

## Screenshots

### Schedule control center

<img src="https://raw.githubusercontent.com/Stolyarovmn/dsh-schedule-tab/main/docs/screenshots/schedule-control-center.webp" alt="Schedule control center with search, filters, grouping and reminder status" width="1200">

### Sidebar notifications

<img src="https://raw.githubusercontent.com/Stolyarovmn/dsh-schedule-tab/main/docs/screenshots/sidebar-notifications.webp" alt="Schedule unread and total counters in the DeepSeek Harness sidebar" width="350">

## Features

### DSH 0.1.7-rc.2 Host mode

- Uses the authoritative Host-wide `schedule.catalog()` instead of assembling a catalog from Session projections.
- Refreshes immediately from the native `schedule/changed` event.
- Searches by task title, reminder prompt, task id, dialog name, or Session id.
- Filters by **Active**, **All**, **Inactive**, **Today**, **Overdue**, and **Recurring**.
- Groups tasks by date or source dialog.
- Shows retained inactive one-shot tasks and the latest durable delivery receipt.
- Supports and formats **Every**, **Daily**, **Weekly**, and **Cron** recurrence, including IANA time zones.
- Shows an explicit **Recurring** tag on repeating tasks.
- Edits active tasks through native `schedule.update()`: title, prompt, and timing/rule type.
- Deletes tasks through native `schedule.delete()`. Deletion also removes saved delivery history, matching DSH semantics.
- Loads paged **Delivery history** through native `schedule.history()`; history is labeled as delivery history because DSH receipts confirm inbox delivery, not successful Agent execution.
- Opens the original Session from any task card.
- Keeps notification-style sidebar behavior: unseen/total counts, warning priority for overdue unseen tasks, and per-Session alarm coloring.

### Compatibility mode for older DSH releases

- Shows built-in Schedule reminders from all dialogs using Session projections.
- Searches, filters, groups, sorts overdue-first, and opens the source dialog.
- Supports legacy `SessionSummary.projectionValues.schedule` and the later `refreshProjections()/projectionsBySession` shape.
- Keeps reminder creation/edit/delete with the model-facing built-in Schedule tools because the older browser API is read-only.

### Notification behavior

- New unseen active reminders color the Schedule alarm icon.
- Expanded sidebar shows **new/total** (for example `3/10`); after opening Schedule it shows only the current active total.
- No `0` is shown when there are no active reminders.
- Unread overdue reminders take warning-color priority.
- The source Session's built-in Schedule mark follows the same unseen state.
- Seen reminder ids persist in browser local storage.
- The collapsed sidebar rail uses a notification dot instead of squeezing in the numeric counter.

## Install

From GitHub:

```sh
dsh plugin --profile web add git+https://github.com/Stolyarovmn/dsh-schedule-tab.git
```

Pinned to this release:

```sh
dsh plugin --profile web add @stolyarovmn/dsh-client-ui-schedule-tab@0.6.0
```

For local development:

```sh
dsh plugin --profile web add file:C:\\path\\to\\dsh-schedule-tab
```

Restart `dsh web` after installation.

The package declares `dsh.bundle.patch`, so `dsh plugin add` activates the plugin without a manual profile patch. The package ships prebuilt `lib/` files and has no install-time build scripts.

## Usage

1. Create a reminder in any dialog with the built-in Schedule tools.
2. Open the **Schedule** tab.
3. Search, filter, or switch grouping between **Date** and **Dialog**.
4. On DSH 0.1.7-rc.2, use **History**, **Edit**, or **Delete** directly from a task card.
5. Select the task card itself to open its source dialog.

The plugin deliberately does not implement its own scheduler or reminder database. DSH remains the single source of truth.

## Compatibility

Declared DSH peer range:

```text
>=0.1.5-rc.3 <0.1.7-rc.3
```

CI runs installation smoke tests against:

- `0.1.5-rc.3`
- `0.1.7-rc.1`
- `0.1.7-rc.2`

On `0.1.7-rc.2`, the client uses the native browser-safe Host Schedule Remote API:
`catalog`, `history`, `update`, and `delete`, plus the `schedule/changed` invalidation event.

On older supported releases, it falls back to the legacy
`SessionSummary.projectionValues.schedule` and
`refreshProjections()/projectionsBySession` APIs. Session navigation uses
`uiWorkspace.openSession()` in both modes.

### Schedule service on DSH 0.1.5-rc.3 through 0.1.7-rc.1

Those DSH releases ship the Host Schedule service as opt-in, and their
Schedule implementation intentionally attaches only to root Agents created
after the Schedule plugin has loaded. Since `0.4.6`, this bundle makes the
Web `session-controller` wait for a Host bootstrap. The bootstrap mounts
`time-context` and `schedule` first and only then releases Session creation,
so restored dialogs receive `schedule_create`, `schedule_list` and
`schedule_delete` after a full process restart.

The tab only displays real Schedule records. It does not treat background
`bash`/`pwsh` jobs as reminders. Since `0.4.7`, the bundle adds model-facing
Schedule routing guidance and rejects the narrow background shell-timer pattern
(`Start-Sleep ...; Write-Output ...` / `sleep ...; echo ...`) when
`schedule_create` is available, so a model cannot silently substitute shell
jobs for reminders. A full `dsh web` process restart is required after
installing or upgrading; HMR cannot retrofit the legacy Schedule runtime into
an Agent that is already live.

## Development

Run all repository tests:

```sh
npm run test:all
```

The test suite covers client behavior and bundle metadata. CI also verifies package contents and installs the plugin into an isolated DSH profile.

## Discoverability

The repository uses the `dsh-plugin` package keyword and is intended to use the GitHub `dsh-plugin` topic. The package name for npm is `@stolyarovmn/dsh-client-ui-schedule-tab`.

## Files

| File | Purpose |
|---|---|
| `package.json` | Package metadata and DSH manifests |
| `cordis.patch.yml` | Loader entry for the plugin |
| `lib/index.js` | Host entry point |
| `lib/client.js` | Schedule tab UI |
| `test/scenarios.test.js` | Client behavior tests |
| `test/bundle.test.js` | Bundle metadata validation |
| `.github/workflows/ci.yml` | Automated tests and DSH installation checks |
| `.github/workflows/publish.yml` | npm publishing workflow |

## Publishing

npm publishing uses GitHub Actions trusted publishing from `.github/workflows/publish.yml`.

## License

MIT

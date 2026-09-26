# @stolyarovmn/dsh-client-ui-schedule-tab

A DeepSeek Harness Web plugin that adds a global **Schedule** tab. It lists scheduled reminders from all dialogs and opens the source dialog when a reminder is selected.

## Features

- Shows scheduled reminders from all dialogs in one list.
- Shows the source dialog for each reminder.
- Orders overdue reminders first, then upcoming reminders by time.
- Opens the source dialog by mouse or keyboard.
- Supports English and Chinese UI strings.
- Keeps reminder creation, editing, and cancellation in the built-in Schedule tools.

## Install

From GitHub:

```sh
dsh plugin --profile web add git+https://github.com/Stolyarovmn/dsh-schedule-tab.git
```

Pinned to this release:

```sh
dsh plugin --profile web add @stolyarovmn/dsh-client-ui-schedule-tab@0.4.7
```

For local development:

```sh
dsh plugin --profile web add file:C:\\path\\to\\dsh-schedule-tab
```

Restart `dsh web` after installation.

The package declares `dsh.bundle.patch`, so `dsh plugin add` activates the plugin without a manual profile patch. The package ships prebuilt `lib/` files and has no install-time build scripts.

## Usage

1. Create a reminder in any dialog.
2. Open the **Schedule** tab.
3. Select a reminder to open its source dialog.

## Compatibility

Declared DSH peer range:

```text
>=0.1.5-rc.3 <0.1.7-rc.2
```

CI runs installation smoke tests against:

- `0.1.5-rc.3`
- `0.1.7-rc.1`

The client supports both projection shapes used by those releases: legacy
`SessionSummary.projectionValues.schedule` and the 0.1.7
`refreshProjections()/projectionsBySession` API. Session navigation uses
`uiWorkspace.openSession()`, which is available in both releases.

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

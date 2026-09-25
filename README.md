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
dsh plugin --profile web add git+https://github.com/Stolyarovmn/dsh-schedule-tab.git#v0.4.3
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
>=0.1.5-rc.3 <0.2.0
```

CI runs installation smoke tests against:

- `0.1.5-rc.3`
- `0.1.7-rc.1`

The client supports both projection shapes used by those releases: legacy
`SessionSummary.projectionValues.schedule` and the 0.1.7
`refreshProjections()/projectionsBySession` API. Session navigation uses
`uiWorkspace.openSession()`, which is available in both releases.

### Schedule service on DSH 0.1.5-rc.3 through 0.1.7-rc.1

Those DSH releases ship the Host Schedule service as opt-in. This plugin displays
real Schedule records; it intentionally does not reinterpret background
`bash`/`pwsh` jobs as reminders. If the model starts `Start-Sleep` or another
background command instead of calling `schedule_create`, enable the built-in
Schedule service in the Web profile first.

A minimal patch for those releases is:

```yaml
- insert:
    - id: time-context
      name: '@deepseek-ai/dsh-time-context'

    - id: schedule
      name: '@deepseek-ai/dsh-schedule'
```

Then pass that file to DSH with `--patch`. Do not apply this insert patch to a
newer DSH profile that already declares those ids; enable its existing Schedule
rows instead.

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

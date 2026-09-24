# @stolyarovmn/dsh-client-ui-schedule-tab

A DeepSeek Harness client plugin that adds a dedicated **Schedule** tab to the Web GUI. It shows scheduled reminders from all dialogs in one read-only list and opens the source dialog when a row is selected.

## Features

- Global cross-dialog list of scheduled reminders.
- Source dialog shown for every reminder.
- Overdue-first ordering with local date/time and relative time.
- Click or keyboard activation opens the source dialog.
- English and Chinese UI strings.
- Read-only UI; reminder creation, changes, and cancellation remain in the chat Schedule tools.

## Install

From GitHub:

```sh
dsh plugin --profile web add git+https://github.com/Stolyarovmn/dsh-schedule-tab.git
```

Pinned to a release:

```sh
dsh plugin --profile web add git+https://github.com/Stolyarovmn/dsh-schedule-tab.git#v0.4.0
```

For local development:

```sh
dsh plugin --profile web add file:C:\\path\\to\\schedule-tab
```

Restart `dsh web` after installation.

The package declares `dsh.bundle.patch`, so `dsh plugin add` adds it to the profile bundle stack automatically. No manual profile patch is required.

This repository ships prebuilt `lib/` files and defines no install-time build script, so this plugin itself does not require an `allowBuilds` entry.

## Usage

1. Create a reminder in any chat.
2. Open the **Schedule** tab.
3. Select a reminder to open its source dialog.

## Distribution

DeepSeek Harness does not provide an official central plugin registry or official in-app marketplace. The upstream project recommends the GitHub topic [`dsh-plugin`](https://github.com/topics/dsh-plugin) for plugin discoverability.

The package is also prepared for public npm publication as `@stolyarovmn/dsh-client-ui-schedule-tab`.

Community-operated catalogs may exist, but they are not part of the official DeepSeek Harness distribution model.

## Compatibility

DeepSeek Harness is under active development. Compatibility is verified by this repository's tests and CI against the current CLI package used by the workflow.

## Development

Run the client scenario tests:

```sh
npm test
```

Run bundle-manifest validation:

```sh
npm run test:bundle
```

The CI workflow also performs an installation smoke test with `dsh plugin add` and verifies that `schedule-tab` appears in the composed configuration.

## Files

| File | Purpose |
|---|---|
| `package.json` | Package metadata, DSH bundle/client manifests, scripts |
| `cordis.patch.yml` | Loader row for the plugin |
| `lib/index.js` | Host entry point |
| `lib/client.js` | Schedule tab UI |
| `test/harness.js` | Test runtime |
| `test/scenarios.test.js` | Client behavior tests |
| `test/bundle.test.js` | Bundle manifest validation |
| `.github/workflows/ci.yml` | Automated tests and install smoke test |

## License

MIT


## Publishing

npm publishing is automated from GitHub Releases through `.github/workflows/publish.yml`.

The npm package should configure a GitHub Actions trusted publisher for:

- repository: `Stolyarovmn/dsh-schedule-tab`
- workflow: `publish.yml`
- environment: `npm`

Publishing a GitHub release whose tag matches `v<package.json version>` runs tests, validates the package contents, and publishes to npm with provenance. No long-lived npm token is required.

# DSH Automation Tasks Enhancer

`@stolyarovmn/dsh-client-ui-schedule-tab` enhances the native **Automation tasks** UI in DeepSeek Harness.

## Compatibility

| Plugin | DeepSeek Harness |
| --- | --- |
| `0.6.x` | `0.1.7-rc.2` |
| `0.5.1` | pre-rc2 releases |

Version `0.6.x` requires `@deepseek-ai/dsh@0.1.7-rc.2` exactly. The exact peer dependency prevents installation against untested DSH UI and Schedule API contracts.

## Features

- Host-wide task catalog from the native Schedule API.
- Active, inactive, today, overdue, and recurring filters.
- Search by task title, instruction, task id, Session id, or Session title.
- Grouping by date or source conversation.
- Every, Daily, Weekly, and Cron rule display with IANA time zones.
- Unseen/active and overdue indicators in the Automation tasks navigation.
- Delivery history with occurrence and acknowledgment timestamps.
- In-place task editing for Once, Every, Daily, Monday-to-Friday, Weekly, and Cron rules.
- Native task deletion with confirmation.
- Navigation from a task to its source Session and native task detail.
- Authoritative refresh on Schedule changes and connection resets.

The plugin uses the native DSH Schedule service as its source of truth. It does not implement its own scheduler or task database.

## Install

For DSH `0.1.7-rc.2`:

```bash
pnpm dlx @deepseek-ai/dsh@0.1.7-rc.2 plugin --profile web add @stolyarovmn/dsh-client-ui-schedule-tab@0.6.0
```

Restart DSH Web after installation.

The package ships prebuilt `lib/` files and defines no `preinstall`, `install`, `postinstall`, or `prepare` scripts. This plugin therefore does not require an `allowBuilds` entry.

## Integration

The bundle patch enables the native DSH rows required by the plugin:

- `time-context`
- `schedule`
- `ui-schedule`

The plugin replaces the presentation of the native `schedules` sidebar and main cells through slot priority. It does not add a second Schedule navigation entry.

Task data and mutations use the public Schedule API, including catalog, history, update, and delete operations.

## Development

```bash
npm run test:all
npm pack --dry-run
```

GitHub Actions also installs the package into a generated DSH `0.1.7-rc.2` Web profile, validates the composed configuration, imports the host entry, and boots DSH Web.

## Distribution

The package is published on npm as `@stolyarovmn/dsh-client-ui-schedule-tab`.

The repository uses the GitHub topic `dsh-plugin` for DeepSeek Harness plugin discovery. DeepSeek Harness does not provide an official central plugin marketplace; third-party catalogs may index public plugins independently.

## License

MIT.

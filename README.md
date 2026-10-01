# DSH Automation Tasks Enhancer

`@stolyarovmn/dsh-client-ui-schedule-tab` enhances the native **Automation tasks** UI in DeepSeek Harness.

## Compatibility

| Plugin | DeepSeek Harness |
| --- | --- |
| `0.6.x` | `0.1.7-rc.2` |
| `0.5.1` | `>=0.1.5-rc.3 <0.1.7-rc.2` |

Version `0.6.x` requires `@deepseek-ai/dsh@0.1.7-rc.2` exactly. Version `0.5.1` is the pre-rc2 line starting with DSH `0.1.5-rc.3`. The exact `0.6.x` peer dependency prevents installation against untested DSH UI and Schedule API contracts.

## Features

- Host-wide task catalog from the native Schedule API.
- Active, inactive, today, overdue, and recurring filters.
- Search by task title, instruction, task id, Session id, or Session title.
- Grouping by date or source conversation.
- Every, Daily, Weekly, and Cron rule display with IANA time zones.
- Delivery-aware unseen indicators in **Automation tasks**: each card shows a compact attention dot for a new saved delivery; viewing the task in Rules/Delivery records acknowledges it, recurring tasks become unread again when another delivery arrives, and legacy `seen-v1` state is migrated without replaying old records.
- Overdue warning in the Automation tasks navigation remains visible until the task is no longer overdue, independently of unread state.
- In-plugin notification settings (gear button in Automation tasks) independently control popup toasts, new-task unread attention, and new-delivery blue-dot/unread attention. Preferences persist in browser localStorage and disabled categories are consumed without replaying a backlog when re-enabled.
- New deliveries raise one native DSH `shell.overlay` toast with an **Open conversation** action.
- The enhanced cards remain on the plugin's Automation tasks page. Edit and History mount DSH's shipped `TaskManagerPage` inside the existing right column and expose its native `TaskDetail`, so Rules, Delivery records, date/time pickers, validation and saving are native DSH UI without switching the main panel to the source conversation. Popup notification state is separate from seen state: the toast is shown once, while the card indicator remains until the task is viewed in Rules/Delivery records or its source conversation is opened. The mounted overlay derives delivery changes directly from the authoritative catalog, with an adaptive catalog-refresh fallback near scheduled times.
- Native DSH Session-row status remains authoritative. The plugin does not use delivery/unread state to recolor the Session clock; it only adds a warning color to the existing native schedule mark when an active task is overdue.
- Delivery history with occurrence and acknowledgment timestamps.
- Native DSH task editing for Once, Every, Daily, Monday-to-Friday, Weekly, and Cron rules, hosted inside the enhanced Scheduler page.
- Native task deletion with confirmation.
- Optional navigation from native task detail to its source Session.
- Authoritative refresh on Schedule changes and connection resets.

The plugin uses the native DSH Schedule service as its source of truth. It does not implement its own scheduler or task database. Schedule delivery receipts prove durable inbox delivery only; they do **not** prove that the model later completed successfully, so the plugin does not invent green/red execution-result states.

## Install

For DSH `0.1.7-rc.2`:

```bash
pnpm dlx @deepseek-ai/dsh@0.1.7-rc.2 plugin --profile web add @stolyarovmn/dsh-client-ui-schedule-tab@0.6.14
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
npm run build:client
npm run test:all
npm pack --dry-run
```

The browser client source lives in `src/client/` and is assembled deterministically by `scripts/build-client.mjs`. The published package still ships only prebuilt `lib/` files, so installation runs no build hook.

GitHub Actions also installs the package into a generated DSH `0.1.7-rc.2` Web profile, validates the composed configuration, imports the host entry, and boots DSH Web.

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md) for release history and upgrade notes.

## Distribution

The package is published on npm as `@stolyarovmn/dsh-client-ui-schedule-tab`.

The repository uses the GitHub topic `dsh-plugin` for DeepSeek Harness plugin discovery.

## License

MIT.

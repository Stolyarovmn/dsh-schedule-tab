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
- Delivery-aware unseen indicators in **Automation tasks**: each card shows a compact attention dot for a new saved delivery; opening Rules or Delivery records does not clear it, recurring tasks become unread again when another delivery arrives, and legacy `seen-v1` state is migrated without replaying old records.
- Overdue warning in the Automation tasks navigation remains visible until the task is no longer overdue, independently of unread state.
- New deliveries raise one native DSH `shell.overlay` toast with an **Open conversation** action.
- Native task editing is not reimplemented: the enhanced cards open DSH's own `scheduleTask` right-Sidebar page, so Rules, Delivery records, date/time pickers, validation, and saving are the shipped DSH UI. When a right Sidebar is already mounted, the page opens there without switching the main panel to the source conversation. A separate History action opens the same native page and selects its `Delivery records` tab. Popup notification state is separate from seen state: the toast is shown once, while the card indicator remains until the source conversation is opened. The mounted overlay derives delivery changes directly from the authoritative catalog, with an adaptive catalog-refresh fallback near scheduled times.
- Native DSH Session-row status remains authoritative. The plugin does not use delivery/unread state to recolor the Session clock; it only adds a warning color to the existing native schedule mark when an active task is overdue.
- Delivery history with occurrence and acknowledgment timestamps.
- In-place task editing for Once, Every, Daily, Monday-to-Friday, Weekly, and Cron rules.
- Native task deletion with confirmation.
- Navigation from a task to its source Session and native task detail.
- Authoritative refresh on Schedule changes and connection resets.

The plugin uses the native DSH Schedule service as its source of truth. It does not implement its own scheduler or task database. Schedule delivery receipts prove durable inbox delivery only; they do **not** prove that the model later completed successfully, so the plugin does not invent green/red execution-result states.

## Install

For DSH `0.1.7-rc.2`:

```bash
pnpm dlx @deepseek-ai/dsh@0.1.7-rc.2 plugin --profile web add @stolyarovmn/dsh-client-ui-schedule-tab@0.6.7
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

## Distribution

The package is published on npm as `@stolyarovmn/dsh-client-ui-schedule-tab`.

The repository uses the GitHub topic `dsh-plugin` for DeepSeek Harness plugin discovery.

## License

MIT.

> **rc2 architecture:** this package does not replace DSH's native `main:schedules` page. `@deepseek-ai/dsh-client-ui-schedule` owns `TaskManagerPage`, including Rules, Delivery records, date/time controls, validation, saving, and deletion. This plugin only enhances that native page with attention/count presentation and adds delivery notifications plus the sidebar summary.

- Native TaskManager DOM enhancement is coalesced and idempotent: unchanged counter text is not rewritten, preventing MutationObserver feedback loops when the Scheduler panel mounts.

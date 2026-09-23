# @maxim/dsh-schedule-tab

A DeepSeek Harness **client plugin** that adds a dedicated **Schedule** tab to
the Web GUI's left panel. It lists the current session's scheduled reminders in
a full-height view — a place to *see* them without digging into the
conversation header.

## What it is / is not

- **Is**: a read-only catalog in its own left-panel tab. Click the clock tab →
  the center column shows the session's `schedule` projection (every active
  reminder: prompt, once/every frequency, absolute target time, relative
  countdown, and Overdue highlighting).
- **Is not**: a reminder editor. Creating, changing, and cancelling reminders
  stays with the **chat Schedule tools** (`schedule_create` / `schedule_delete`).
  This is deliberate — the shipped `dsh-client-ui-schedule` is also read-only by
  design; there is no host mutation RPC to drive from the browser yet.

## Why it exists

The official `dsh-client-ui-schedule` only shows a small **read-only** trigger
in the session header, and only when ≥1 record is active. This plugin gives the
schedule a stable, always-present home in the left navigation.

## How it is built

- **Left tab** = one entry in the `sidebar.panellist` list slot (`id: schedule`,
  order 0 → top of the "Global panels" group), whose id addresses the main key.
- **Center content** = a new **keyed `main` panel** (`key: "schedule"`).
  `AppFrame` renders *any* registered main key when selected, so this needs no
  layout changes.
- **Session data** = a `main.schedule` child slot with `scope: "session-maybe"`.
  The renderer wraps it in a `ScopeProvider`, so the occupant receives
  `useProjection("schedule")` even though the `main` slot is root-scoped. With
  no session current the projection reads `undefined` and the panel shows its
  empty state instead of failing.
- **Install** = `dsh plugin --profile web add <source>` (a registry package, a
  `git+` spec, or a `file:` path pointing at the package **main file**).
  `dsh-app-boot`/`client-modules` convert path specs to `file://` URLs and walk
  up to the nearest `package.json` — no manual patch editing.

## Install

**Git (recommended):**

```sh
dsh plugin --profile web add git+https://github.com/Stolyarovmn/dsh-schedule-tab.git
```

**Local checkout (development):**

```sh
dsh plugin --profile web add file:C:\path\to\schedule-tab
```

> `dsh plugin` forwards to pnpm in the profile directory, so any pnpm
> dependency spec works. A `file:` spec must point at a directory containing
> the package (its `main` is `lib/index.js`); a path-based patch entry
> pointing at the main file is also accepted and converted to a `file://` URL.
> Once the package is published to the npm registry, a plain
> `dsh plugin --profile web add @maxim/dsh-schedule-tab` works too.

## Using it

1. Start `dsh web` (a restart is only needed after an install that changed the
   profile `package.json`; bundle-only edits hot-reload through the client HMR
   chain while the server is running).
2. Open a **new** session (sessions running before the Schedule overlay mounts
   do not receive the Schedule tools).
3. Create a reminder in chat, e.g. "remind me in 10 minutes to check the build".
4. Click the **Schedule** tab in the left panel — the reminder appears there
   immediately (live projection), and stays visible across the session.

## Files

| file | role |
|---|---|
| `package.json` | manifest: `main` (node half) + `./client` (browser half) + `dsh.client` |
| `lib/index.js` | node half — empty `apply`, keeps the browser feature addressable |
| `lib/client.js` | browser half — the tab, the panel, the projection read |

## License

MIT

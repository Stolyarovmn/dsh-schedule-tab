# @stolyarovmn/dsh-client-ui-schedule-tab

A DeepSeek Harness **client plugin** that adds a dedicated **Schedule** tab to
the Web GUI's left panel. It shows a **global, cross-dialog** view of every
scheduled reminder known to this deployment — a place to *see* them all at once
without digging into each conversation header. Each row names the dialog it
comes from, and **clicking a row opens that dialog in the same tab**.

In the Settings → Plugins inventory the plugin shows up as **`ui-schedule-tab`**
(the inventory strips the `@scope/` and `dsh-client-` prefixes from the package
name), by analogy with the official `ui-schedule`.

## What it is / is not

- **Is**: a read-only catalog in its own left-panel tab, spanning **all dialogs**.
  Click the clock tab → the center column lists every active reminder (prompt,
  once/every frequency, absolute target time, relative countdown, Overdue
  highlighting) **plus the name of the dialog it was created in**.
- **Is**: a navigation aid. Click any row → the plugin opens that dialog
  (`sessions.open(id)`) and returns the center to the conversation, so you land
  right where the reminder lives.
- **Is not**: a reminder editor. Creating, changing, and cancelling reminders
  stays with the **chat Schedule tools** (`schedule_create` / `schedule_delete`).
  This is deliberate — the shipped `dsh-client-ui-schedule` is also read-only by
  design; there is no host mutation RPC to drive from the browser yet.

## Why it exists

The official `dsh-client-ui-schedule` only shows a small **read-only** trigger
in the session header, and only when ≥1 record is active, only for the *current*
dialog. This plugin gives the schedule a stable, always-present home in the left
navigation — and, because it reads the **global session list**, it surfaces
reminders from *every* dialog, not just the one you happen to be in.

## How it is built

- **Left tab** = one entry in the `sidebar.panellist` list slot
  (`id: schedule`, order 0 → top of the "Global panels" group), whose id
  addresses the main key.
- **Center content** = a **keyed `main` panel** (`key: "schedule"`, root scope).
  `AppFrame` renders *any* registered main key when selected, so this needs no
  layout changes.
- **Data** = the live **session list** (`ctx.sessions.list`), whose per-dialog
  rows carry each dialog's `schedule` projection (the `dsh-schedule` projection
  is folded into every list row). The panel flattens all of them into one
  overdue-first, time-ordered list and shows each row's source dialog
  (`title` → `displayTitle` → `id`).
- **Click-through** = `ctx.sessions.open(id)` + `ctx.layout.selectPanel("conversation")`
  — both public services — so a click jumps into the source dialog in the same
  browser tab.
- **Install** = `dsh plugin --profile web add <source>` — a single command.
  The package declares `dsh.bundle` with a `cordis.patch.yml` that inserts the
  `schedule-tab` loader row, so `dsh plugin add` wires it into the profile's
  bundle stack automatically; no manual edit of `cordis.patch.yml` is needed.

## Install

**Git (recommended):**

```sh
dsh plugin --profile web add git+https://github.com/Stolyarovmn/dsh-schedule-tab.git
```

**Pinned to a tag (reproducible):**

```sh
dsh plugin --profile web add git+https://github.com/Stolyarovmn/dsh-schedule-tab.git#v0.4.0
```

**Local checkout (development):**

```sh
dsh plugin --profile web add file:C:\path\to\schedule-tab
```

Then restart `dsh web`. The package becomes a layer of the web profile (visible
in `dsh web --dump-config` as the `schedule-tab` row) and appears in the Web
GUI's Settings → Plugins inventory as `ui-schedule-tab`.

> `dsh plugin` forwards to pnpm in the profile directory, so any pnpm
> dependency spec works. Once the package is published to the npm registry, a
> plain `dsh plugin --profile web add @stolyarovmn/dsh-client-ui-schedule-tab`
> works too. (The npm scope is lowercase `@stolyarovmn` — npm scopes must be
> lowercase — while the GitHub repository keeps its original casing.)
>
> **Git-hosted installs** run the package's build scripts on your machine at
> install time, so pnpm may ask for an explicit `allowBuilds` confirmation —
> allow it only for sources you trust, and pin a tag or commit. This package
> ships prebuilt `lib/` files, so it declares no build scripts.

## Using it

1. Start `dsh web` (a restart is only needed after an install that changed the
   profile `package.json`; bundle-only edits hot-reload through the client HMR
   chain while the server is running).
2. Create a reminder in any chat, e.g. "remind me in 10 minutes to check the build".
3. Click the **Schedule** tab in the left panel — every reminder you've created
   (in any dialog) appears there, grouped and labeled by its source dialog.
4. Click a row to jump straight into the dialog that owns it.

## Distribution and discoverability

DeepSeek Harness has **no in-app plugin marketplace and no central registry**:
plugin discovery lives outside the app, and the Settings → Plugins search box
only filters plugins *already installed* in your profile. How people find this
one:

- **GitHub topic [`dsh-plugin`](https://github.com/topics/dsh-plugin)** — the
  official discovery channel recommended in the harness README and
  CONTRIBUTING.md; this repository carries the topic.
- **npm** — publishing `@stolyarovmn/dsh-client-ui-schedule-tab` makes it
  installable by bare name and findable via `npm search` (the package is
  publish-ready: `publishConfig.access: public`, prebuilt `lib/`, MIT).
- **Community** — the harness README points contributors to GitHub Discussions
  and the official Discord for sharing plugins; the upstream repo does not
  accept external PRs, so a standalone repository is the intended model
  ("we do not believe that packages in the official repository are inherently
  more important than packages created by the community").
- **Settings → Plugins inventory** (in-app) — after installation the plugin
  shows up there as `ui-schedule-tab` and is found by the inventory's search
  box; the search box is a local filter, not a catalog, so it never
  *discovers* uninstalled plugins.

There is currently no submission process to a DSH-curated catalog; the
officially recommended publication paths are npm, git, and the `dsh-plugin`
GitHub topic.

## Files

| file | role |
|---|---|
| `package.json` | manifest: `main` (node half) + `./client` (browser half) + `dsh.bundle` (self-activating install) + `dsh.client` |
| `cordis.patch.yml` | the bundle layer: inserts the `schedule-tab` loader row, applied automatically when the package is a profile bundle |
| `lib/index.js` | node half — empty `apply`, keeps the browser feature addressable |
| `lib/client.js` | browser half — the tab, the global panel, the session-list read, the click-through |
| `test/harness.js` | mini React + fake clock/DOM + sessions/layout mocks that run the real bundle |
| `test/scenarios.test.js` | 13 usage-scenario tests (`npm test`) |

## Contributors

- **Stolyarovmn** — <https://github.com/Stolyarovmn>
- **Qwen 3.8 27B** (AI coding agent, via DeepSeek Harness) —
  <https://github.com/QwenLM> — wrote the panel, the test harness, and most of
  the implementation alongside the author.

## License

MIT

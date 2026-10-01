# DSH Automation Tasks Enhancer

This repository is being reorganized for the DeepSeek Harness 0.2.x line.

The `main` branch is intentionally implementation-neutral while the plugin's role on top of the much richer native Automation Tasks UI is being redesigned. **Do not install the plugin from `main`.**

## Branches

| Branch | Purpose |
| --- | --- |
| `legacy/dsh-0.1.5.x` | Final legacy line for DSH >=0.1.5-rc.3 and <0.1.7-rc.2 (plugin 0.5.1). |
| `legacy/dsh-0.1.7.x` | Final legacy line for DSH 0.1.7-rc.2 (plugin 0.6.15). |
| `dsh-0.2.0-rc.2` | Active redesign branch targeting DSH 0.2.0-rc.2 only. No backward-compatibility layer is planned. |

Historical releases and tags remain available for exact published versions.

## Current direction

DSH 0.2.0-rc.2 already provides the core Automation Tasks experience: task management, editing, delivery records, deletion, task detail, Session navigation and native Schedule surfaces.

The next plugin version should therefore focus only on differentiated value that remains useful on top of native Harness, such as attention/unread state, delivery notifications, richer triage filters/grouping, and other extensions that can be implemented through current public Harness extension points.

The 0.2.x implementation must follow the version-matched official `cordis-plugin-development` guidance and native Harness UI conventions.

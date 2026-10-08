import { readFile, writeFile } from 'node:fs/promises'

const path = 'src/client-shell.js'
let source = await readFile(path, 'utf8')
let changed = false

const legacy = `    function PluginPreferences({ usePreferences, setPreference: setValue, t }) {
      const preferences = usePreferences(value => value)
      return h('section', { className: 'sat_prefSection' },`

const guarded = `    function OwnedPluginPreferences({ usePreferences, setPreference: setValue, t }) {
      const preferences = usePreferences(value => value)
      return h('section', { className: 'sat_prefSection' },`

if (source.includes(legacy)) {
  source = source.replace(legacy, guarded)
  const anchor = `        h('p', { className: 'sat_prefFootnote' }, t('settingsBrowserLocal')))
    }

    function AttentionIcon`
  const replacement = `        h('p', { className: 'sat_prefFootnote' }, t('settingsBrowserLocal')))
    }

    function PluginPreferences(props) {
      const subject = props?.subject
      if (subject?.kind !== 'bundle' || subject.pkg?.name !== PACKAGE) return null
      return h(OwnedPluginPreferences, props)
    }

    function AttentionIcon`
  if (!source.includes(anchor)) throw new Error('PluginPreferences tail changed; ownership guard was not applied')
  source = source.replace(anchor, replacement)
  changed = true
} else if (!source.includes("subject?.kind !== 'bundle' || subject.pkg?.name !== PACKAGE")) {
  throw new Error('PluginPreferences shape changed and does not contain the ownership guard')
}

// This package is an ordinary installed Harness Client plugin, not a package
// executed through cordis-client-runner's dynamic facade. Standard Client code
// in DSH 0.2.1-alpha.1 still has ctx.inject(). Keep the published 0.8 lifecycle:
// the settings section can mount immediately, while Schedule-dependent seats
// live under an optional remote.schedule child context.
const directInjectDeclaration = `      inject: ['slots', 'locale', 'uiWorkspace', 'sessions', 'workspaces', 'remote', 'remote.schedule'],`
const publishedInjectDeclaration = `      inject: ['slots', 'locale', 'uiWorkspace', 'sessions', 'workspaces', 'remote'],`
if (source.includes(directInjectDeclaration)) {
  source = source.replace(directInjectDeclaration, publishedInjectDeclaration)
  changed = true
}

const directScheduleScope = `        const scope = ctx
        const catalog = createCatalogSource(scope)`
const wrappedScheduleScope = `        ctx.inject(['remote.schedule'], (scope) => {
          const catalog = createCatalogSource(scope)`
if (source.includes(directScheduleScope)) {
  source = source.replace(directScheduleScope, wrappedScheduleScope)
  const directTail = `          }, DeliveryToast))
      },`
  const wrappedTail = `          }, DeliveryToast))
        })
      },`
  if (!source.includes(directTail)) throw new Error('Schedule scope tail changed; ctx.inject lifecycle was not restored')
  source = source.replace(directTail, wrappedTail)
  changed = true
}

// Ordinary installed Client plugins do not receive the dynamic runner's
// automatic shadowing rank. Preserve the published 0.8 priorities so our
// schedules page/icon/Session mark shadow the native priority-0 occupants
// instead of colliding with them at the same id/key and priority.
for (const [from, to] of [
  [`name: 'main', key: PANEL_ID, locale:`, `name: 'main', key: PANEL_ID, priority: -100, locale:`],
  [`name: 'sidebar.session.row.leading', id: 'schedule-mark', order: 10, locale:`, `name: 'sidebar.session.row.leading', id: 'schedule-mark', order: 10, priority: -100, locale:`],
  [`name: 'sidebar.panellist', id: PANEL_ID, order: 10, locale:`, `name: 'sidebar.panellist', id: PANEL_ID, order: 10, priority: -100, locale:`],
]) {
  if (source.includes(from)) {
    source = source.replace(from, to)
    changed = true
  }
}

if (!source.includes(publishedInjectDeclaration)) throw new Error('published Client inject declaration was not restored')
if (!source.includes("ctx.inject(['remote.schedule'], (scope) => {")) throw new Error('remote.schedule child context is missing')
for (const expected of [
  `name: 'main', key: PANEL_ID, priority: -100, locale:`,
  `name: 'sidebar.session.row.leading', id: 'schedule-mark', order: 10, priority: -100, locale:`,
  `name: 'sidebar.panellist', id: PANEL_ID, order: 10, priority: -100, locale:`,
]) {
  if (!source.includes(expected)) throw new Error(`published slot shadow priority missing: ${expected}`)
}

if (changed) await writeFile(path, source)

console.log('plugin detail ownership and standard DSH 0.2.1 Client lifecycle contract present')

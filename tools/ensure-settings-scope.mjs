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

// DSH 0.2.1-alpha.1 dynamic Client plugins cannot call ctx.inject(). The
// browser facade exposes only declared services plus lifecycle-safe verbs. Web
// now mounts Schedule unconditionally, so declare remote.schedule as a required
// service and run the Schedule-dependent registrations directly on this fiber.
const oldInjectDeclaration = `      inject: ['slots', 'locale', 'uiWorkspace', 'sessions', 'workspaces', 'remote'],`
const newInjectDeclaration = `      inject: ['slots', 'locale', 'uiWorkspace', 'sessions', 'workspaces', 'remote', 'remote.schedule'],`
if (source.includes(oldInjectDeclaration)) {
  source = source.replace(oldInjectDeclaration, newInjectDeclaration)
  changed = true
}

const oldScheduleScope = `        ctx.inject(['remote.schedule'], (scope) => {
          const catalog = createCatalogSource(scope)`
const newScheduleScope = `        const scope = ctx
        const catalog = createCatalogSource(scope)`
if (source.includes(oldScheduleScope)) {
  source = source.replace(oldScheduleScope, newScheduleScope)
  const tail = `          }, DeliveryToast))
        })
      },`
  const directTail = `          }, DeliveryToast))
      },`
  if (!source.includes(tail)) throw new Error('Schedule scope tail changed; direct runtime conversion was not applied')
  source = source.replace(tail, directTail)
  changed = true
}

// Dynamic Cordis assigns shadowing priority itself in DSH 0.2.1-alpha.1.
for (const [from, to] of [
  [`name: 'main', key: PANEL_ID, priority: -100, locale:`, `name: 'main', key: PANEL_ID, locale:`],
  [`name: 'sidebar.session.row.leading', id: 'schedule-mark', order: 10, priority: -100, locale:`, `name: 'sidebar.session.row.leading', id: 'schedule-mark', order: 10, locale:`],
  [`name: 'sidebar.panellist', id: PANEL_ID, order: 10, priority: -100, locale:`, `name: 'sidebar.panellist', id: PANEL_ID, order: 10, locale:`],
]) {
  if (source.includes(from)) {
    source = source.replace(from, to)
    changed = true
  }
}

if (!source.includes(newInjectDeclaration)) throw new Error('remote.schedule is not declared in the Client plugin inject list')
if (!source.includes('        const scope = ctx\n        const catalog = createCatalogSource(scope)')) throw new Error('Schedule runtime is not attached directly to the plugin fiber')
if (source.includes("ctx.inject(['remote.schedule']")) throw new Error('legacy ctx.inject remote.schedule wrapper survived the DSH 0.2.1 port')
if (source.includes('priority: -100')) throw new Error('manual dynamic Slot priority survived the DSH 0.2.1 port')

if (changed) await writeFile(path, source)

console.log('plugin detail ownership and DSH 0.2.1 Client runtime contract present')

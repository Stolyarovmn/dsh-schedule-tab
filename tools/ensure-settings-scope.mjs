import { readFile, writeFile } from 'node:fs/promises'

const path = 'src/client-shell.js'
let source = await readFile(path, 'utf8')

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
  await writeFile(path, source)
} else if (!source.includes("subject?.kind !== 'bundle' || subject.pkg?.name !== PACKAGE")) {
  throw new Error('PluginPreferences shape changed and does not contain the ownership guard')
}

console.log('plugins.detail.section ownership guard present')

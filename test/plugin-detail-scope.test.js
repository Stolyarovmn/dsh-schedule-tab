import assert from 'node:assert/strict'
import test from 'node:test'
import vm from 'node:vm'
import { readFileSync } from 'node:fs'

const PACKAGE = '@stolyarovmn/dsh-client-ui-schedule-tab'
const source = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')

function renderSection(subject) {
  const definitions = []
  const localStorage = new Map()
  const window = {
    __ModuleLoader__: { load(definition) { definitions.push(definition) } },
    localStorage: {
      getItem(key) { return localStorage.has(key) ? localStorage.get(key) : null },
      setItem(key, value) { localStorage.set(key, String(value)) },
    },
    addEventListener() {},
    removeEventListener() {},
  }
  vm.runInNewContext(source, { window, console, queueMicrotask, Map, Set, Object, Array, Date, JSON, Number, Math, Promise, Symbol })
  const definition = definitions.find(item => item.id === PACKAGE)
  assert.ok(definition, 'schedule client module must be present')

  const React = {
    createElement(type, props, ...children) {
      const next = { ...(props ?? {}), children: children.length <= 1 ? children[0] : children }
      return typeof type === 'function' ? type(next) : { type, props: next }
    },
  }
  const nativeCatalogSnapshot = { records: [], readRequest: {} }
  const nativeManager = {
    createCatalogSource() {
      return {
        hooks: { catalog: { getSnapshot: () => nativeCatalogSnapshot } },
        async onDelete() { return { ok: true, value: { deleted: false } } },
        async onRetry() { return { ok: true, value: nativeCatalogSnapshot } },
      }
    },
    createDeleteToastSource() {
      return { hooks: {}, report() {}, dismiss() {} }
    },
    ScheduleDeleteToast() { return null },
    TaskManagerPage() { return null },
  }
  const plugin = definition.factory(name => {
    if (name === 'react') return React
    if (name === '@stolyarovmn/dsh-schedule-native-manager') return nativeManager
    throw new Error('unexpected require: ' + name)
  })

  let section = null
  const ctx = {
    locale: { register() { return () => {} }, bind() { return key => key } },
    effect(factory) { return factory() },
    on() { return () => {} },
    remote: {
      schedule: {
        async catalog() { return { ok: true, value: { records: [] } } },
        async delete() { return { ok: true, value: { deleted: false } } },
        async update() { return { ok: true, value: { code: 'schedule_not_found' } } },
        async history() { return { ok: true, value: { records: [] } } },
      },
      $on() { return () => {} },
    },
    uiWorkspace: { openSession() {}, startSession() {} },
    slots: {
      inject(name, register) {
        // This unit test owns only the Plugin Manager contribution. Other slot
        // seats belong to the Schedule-runtime contract tests and need not mount.
        if (name !== 'plugins.detail.section') return undefined
        return register()
      },
      register(spec, component) {
        section = { spec, component }
        return () => {}
      },
    },
  }
  plugin.apply(ctx)
  assert.ok(section, 'notification section must register')
  const injected = section.spec.inject()
  return section.component({
    subject,
    usePreferences: selector => selector(injected.hooks.preferences.getSnapshot()),
    setPreference: injected.setPreference,
    t: key => key,
  })
}

function findAll(node, predicate, out = []) {
  if (node == null || node === false) return out
  if (Array.isArray(node)) {
    node.forEach(child => findAll(child, predicate, out))
    return out
  }
  if (typeof node !== 'object') return out
  if (predicate(node)) out.push(node)
  findAll(node.props?.children, predicate, out)
  return out
}

test('notification settings render only on the schedule bundle detail page', () => {
  const own = renderSection({ kind: 'bundle', pkg: { name: PACKAGE } })
  assert.ok(own, 'own bundle must render notification settings')
  assert.equal(findAll(own, node => node.props?.role === 'switch').length, 3)

  assert.equal(renderSection({ kind: 'bundle', pkg: { name: '@stolyarovmn/dsh-ui-registry-aggregator' } }), null)
  assert.equal(renderSection({ kind: 'row', pkg: { name: PACKAGE }, row: { rowId: 'x' } }), null)
  assert.equal(renderSection({ kind: 'item', id: 'official' }), null)
})

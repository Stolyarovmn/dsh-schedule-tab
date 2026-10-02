import assert from 'node:assert/strict'
import test from 'node:test'
import vm from 'node:vm'
import { readFileSync } from 'node:fs'

const clientSource = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
const PACKAGE = '@stolyarovmn/dsh-client-ui-schedule-tab'
const SEEN = PACKAGE + '/seen-v2'
const NOTIFIED = PACKAGE + '/delivery-notified-v1'
const SESSION_SEEN = PACKAGE + '/session-delivery-seen-v1'
const PREFS = PACKAGE + '/notification-preferences-v1'

class MemoryStorage {
  constructor(initial = {}) { this.map = new Map(Object.entries(initial)) }
  getItem(key) { return this.map.has(key) ? this.map.get(key) : null }
  setItem(key, value) { this.map.set(key, String(value)) }
  removeItem(key) { this.map.delete(key) }
}

function receipt(messageId, deliveredAt = '2026-10-02T00:00:00.000Z') {
  return { messageId, scheduledAt: deliveredAt, deliveredAt, prompt: 'p' }
}
function record({ id = 'task-1', sessionId = 'session-1', lastDelivery, status = 'active', scheduledAt = '2026-10-03T00:00:00.000Z' } = {}) {
  return {
    id, sessionId, title: 'Task', prompt: 'Prompt', status, scheduledAt,
    kind: 'daily', timeZone: 'Europe/Moscow', localTime: '09:00:00',
    ...(lastDelivery ? { lastDelivery } : {}),
  }
}
function deliveryKey(rec, messageId) { return 'delivery:' + rec.sessionId + ':' + rec.id + ':' + messageId }
function taskKey(rec) { return 'task:' + rec.sessionId + ':' + rec.id }

function textOf(node) {
  if (node == null || node === false) return ''
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  return textOf(node.props?.children)
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

async function settle(source) {
  for (let i = 0; i < 30; i += 1) {
    if (source.getSnapshot().status === 'ready') return
    await new Promise(resolve => setImmediate(resolve))
  }
  throw new Error('catalog did not settle')
}

function createHarness({ initialStorage = {}, initialRecords = [], initialHistories = new Map() } = {}) {
  const storage = new MemoryStorage(initialStorage)
  const registrations = new Map()
  const cleanups = []
  const windowListeners = new Map()
  let moduleDefinition
  let scheduleChanged = null
  let records = initialRecords
  let histories = initialHistories
  let historyCalls = 0
  let deleteCalls = 0
  let openedSession = null
  let startedSessions = 0
  let openedTaskTab = null

  const fakeWindow = {
    localStorage: storage,
    __ModuleLoader__: { load(definition) { moduleDefinition = definition } },
    setTimeout(callback, delay) {
      if (delay === 0) queueMicrotask(callback)
      return 1
    },
    clearTimeout() {},
    addEventListener(name, listener) { windowListeners.set(name, listener) },
    removeEventListener(name, listener) {
      if (windowListeners.get(name) === listener) windowListeners.delete(name)
    },
  }
  const sandbox = {
    window: fakeWindow,
    console,
    queueMicrotask,
    setImmediate,
    clearImmediate,
    Map, Set, Object, Array, Date, JSON, Number, Math, Promise, Symbol,
  }
  vm.runInNewContext(clientSource, sandbox, { filename: 'lib/client.js' })
  assert.ok(moduleDefinition, 'client module must register with ModuleLoader')

  const React = {
    Fragment: Symbol('Fragment'),
    createElement(type, props, ...children) {
      const nextProps = { ...(props ?? {}), children: children.length <= 1 ? children[0] : children }
      return typeof type === 'function' ? type(nextProps) : { type, props: nextProps }
    },
    useState(initial) { return [typeof initial === 'function' ? initial() : initial, () => {}] },
    useEffect(effect) {
      const cleanup = effect()
      if (typeof cleanup === 'function') cleanups.push(cleanup)
    },
  }
  const mod = moduleDefinition.factory(name => {
    assert.equal(name, 'react')
    return React
  })

  const translate = (key, vars = {}) => String(key).replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? ''))
  const locale = { register() { return () => {} }, bind() { return translate } }
  const slots = {
    inject(_name, callback) { return callback() },
    register(spec, component) {
      registrations.set(spec.name + ':' + (spec.id ?? spec.key ?? ''), { spec, component })
      return () => {}
    },
  }
  const remote = {
    schedule: {
      async catalog() { return { ok: true, value: records } },
      async history(request) {
        historyCalls += 1
        const key = request.sessionId + ':' + request.id
        return {
          ok: true,
          value: {
            id: request.id,
            records: histories.get(key) ?? [],
            earlierRecordsUnavailable: false,
            earlierRecordsPruned: false,
            retention: { days: 30, records: 200 },
          },
        }
      },
      async delete(request) {
        deleteCalls += 1
        const before = records.length
        records = records.filter(item => !(item.sessionId === request.sessionId && item.id === request.id))
        return { ok: true, value: { id: request.id, deleted: records.length !== before } }
      },
    },
    $on(event, listener) {
      if (event === 'schedule/changed') scheduleChanged = listener
      return () => { if (scheduleChanged === listener) scheduleChanged = null }
    },
  }
  const effect = fn => {
    const cleanup = fn()
    if (typeof cleanup === 'function') cleanups.push(cleanup)
    return cleanup
  }
  const scope = {
    slots, locale, remote, effect,
    on() { return () => {} },
    uiWorkspace: {
      openSession(id) { openedSession = id },
      startSession() { startedSessions += 1 },
    },
    sidebarRight: {
      openTab(kind, options) { openedTaskTab = { kind, options } },
    },
  }
  const ctx = {
    ...scope,
    inject(_services, callback) { return callback(scope) },
  }
  mod.apply(ctx)

  return {
    storage,
    registrations,
    getHistoryCalls: () => historyCalls,
    getDeleteCalls: () => deleteCalls,
    getOpenedSession: () => openedSession,
    getStartedSessions: () => startedSessions,
    getOpenedTaskTab: () => openedTaskTab,
    setRecords(next) { records = next },
    setHistories(next) { histories = next },
    triggerScheduleChanged() { assert.ok(scheduleChanged); scheduleChanged() },
    dispatchStorage(key) { windowListeners.get('storage')?.({ key }) },
    cleanup() { cleanups.splice(0).reverse().forEach(fn => fn()) },
  }
}

test('startup baselines popup dedupe without clearing unread, then only a new delivery pops', async () => {
  const old = receipt('old')
  const offline = receipt('offline')
  const newest = receipt('newest')
  const recOffline = record({ lastDelivery: offline })
  const seenOld = deliveryKey(recOffline, old.messageId)
  const h = createHarness({
    initialStorage: {
      [SEEN]: JSON.stringify([seenOld]),
      [SESSION_SEEN]: JSON.stringify([seenOld]),
      [NOTIFIED]: JSON.stringify([seenOld]),
    },
    initialRecords: [recOffline],
    initialHistories: new Map([['session-1:task-1', [offline, old]]]),
  })
  try {
    const overlay = h.registrations.get('shell.overlay:schedule-attention.delivery-toast')
    assert.ok(overlay)
    const injected = overlay.spec.inject()
    const unsubscribe = injected.hooks.catalog.subscribe(() => {})
    await settle(injected.hooks.catalog)

    assert.equal(injected.hooks.toast.getSnapshot(), null, 'offline delivery should not replay a popup on first browser read')
    assert.ok(JSON.parse(h.storage.getItem(NOTIFIED)).includes(deliveryKey(recOffline, 'offline')))
    assert.ok(!JSON.parse(h.storage.getItem(SEEN)).includes(deliveryKey(recOffline, 'offline')), 'popup baseline must not clear task unread')

    h.triggerScheduleChanged()
    await settle(injected.hooks.catalog)
    assert.equal(injected.hooks.toast.getSnapshot(), null, 'an unrelated refresh must not replay the startup delivery')

    const recNewest = record({ lastDelivery: newest })
    h.setRecords([recNewest])
    h.setHistories(new Map([['session-1:task-1', [newest, offline, old]]]))
    h.triggerScheduleChanged()
    await settle(injected.hooks.catalog)
    assert.equal(injected.hooks.toast.getSnapshot()?.record.lastDelivery?.messageId, 'newest')
    unsubscribe()
  } finally {
    h.cleanup()
  }
})

test('recurring history produces exact unread counts and 9+', async () => {
  const baseline = receipt('baseline')
  const deliveries = ['d3', 'd2', 'd1'].map(id => receipt(id))
  const current = record({ lastDelivery: deliveries[0] })
  const h = createHarness({
    initialStorage: {
      [SEEN]: JSON.stringify([deliveryKey(current, 'baseline'), taskKey(current)]),
      [SESSION_SEEN]: JSON.stringify([deliveryKey(current, 'baseline')]),
      [NOTIFIED]: JSON.stringify([deliveryKey(current, 'baseline')]),
    },
    initialRecords: [current],
    initialHistories: new Map([['session-1:task-1', [...deliveries, baseline]]]),
  })
  try {
    const overlay = h.registrations.get('shell.overlay:schedule-attention.delivery-toast')
    const catalog = overlay.spec.inject().hooks.catalog
    const unsubscribe = catalog.subscribe(() => {})
    await settle(catalog)

    const panel = h.registrations.get('sidebar.panellist:schedules')
    const injected = panel.spec.inject()
    const render = () => panel.component({
      size: 16,
      active: false,
      useCatalog: selector => selector(injected.hooks.catalog.getSnapshot()),
      usePreferences: selector => selector(injected.hooks.preferences.getSnapshot()),
      t: (key, vars = {}) => key + JSON.stringify(vars),
    })
    let badge = findAll(render(), node => node.props?.className?.includes?.('sat_panelBadge'))[0]
    assert.equal(textOf(badge), '3')

    const ten = Array.from({ length: 10 }, (_, i) => receipt('x' + (10 - i)))
    const currentTen = record({ lastDelivery: ten[0] })
    h.setRecords([currentTen])
    h.setHistories(new Map([['session-1:task-1', ten]]))
    h.triggerScheduleChanged()
    await settle(catalog)
    badge = findAll(render(), node => node.props?.className?.includes?.('sat_panelBadge'))[0]
    assert.equal(textOf(badge), '9+')
    unsubscribe()
  } finally {
    h.cleanup()
  }
})

test('ten distinct unread tasks skip history reads and still render 9+', async () => {
  const records = Array.from({ length: 10 }, (_, i) => record({
    id: 'task-' + i,
    sessionId: 'session-' + i,
    lastDelivery: receipt('delivery-' + i),
  }))
  const seen = records.map(rec => taskKey(rec))
  const h = createHarness({
    initialStorage: {
      [SEEN]: JSON.stringify(seen),
      [SESSION_SEEN]: JSON.stringify([]),
      [NOTIFIED]: JSON.stringify([]),
    },
    initialRecords: records,
  })
  try {
    const overlay = h.registrations.get('shell.overlay:schedule-attention.delivery-toast')
    const catalog = overlay.spec.inject().hooks.catalog
    const unsubscribe = catalog.subscribe(() => {})
    await settle(catalog)
    assert.equal(h.getHistoryCalls(), 0)

    const panel = h.registrations.get('sidebar.panellist:schedules')
    const injected = panel.spec.inject()
    const tree = panel.component({
      size: 16,
      active: false,
      useCatalog: selector => selector(injected.hooks.catalog.getSnapshot()),
      usePreferences: selector => selector(injected.hooks.preferences.getSnapshot()),
      t: key => key,
    })
    const badge = findAll(tree, node => node.props?.className?.includes?.('sat_panelBadge'))[0]
    assert.equal(textOf(badge), '9+')
    unsubscribe()
  } finally {
    h.cleanup()
  }
})

test('plugin detail switches persist browser-local preferences', () => {
  const h = createHarness()
  try {
    const section = h.registrations.get('plugins.detail.section:schedule-attention.settings')
    assert.ok(section)
    const injected = section.spec.inject()
    const render = () => section.component({
      subject: { kind: 'bundle', pkg: { name: PACKAGE } },
      usePreferences: selector => selector(injected.hooks.preferences.getSnapshot()),
      changePreference: injected.changePreference,
      t: key => key,
    })
    let switches = findAll(render(), node => node.props?.role === 'switch')
    assert.equal(switches.length, 3)
    assert.deepEqual(switches.map(node => node.props['aria-checked']), [true, true, true])

    switches[0].props.onClick()
    assert.equal(JSON.parse(h.storage.getItem(PREFS)).popup, false)
    switches = findAll(render(), node => node.props?.role === 'switch')
    assert.equal(switches[0].props['aria-checked'], false)
  } finally {
    h.cleanup()
  }
})

test('overdue active task shows warning when no unread attention remains', async () => {
  const rec = record({ lastDelivery: undefined, scheduledAt: '2020-01-01T00:00:00.000Z' })
  const h = createHarness({
    initialStorage: {
      [SEEN]: JSON.stringify([taskKey(rec)]),
      [SESSION_SEEN]: JSON.stringify([]),
      [NOTIFIED]: JSON.stringify([]),
    },
    initialRecords: [rec],
  })
  try {
    const overlay = h.registrations.get('shell.overlay:schedule-attention.delivery-toast')
    const catalog = overlay.spec.inject().hooks.catalog
    const unsubscribe = catalog.subscribe(() => {})
    await settle(catalog)

    const panel = h.registrations.get('sidebar.panellist:schedules')
    const injected = panel.spec.inject()
    const tree = panel.component({
      size: 16,
      active: false,
      useCatalog: selector => selector(injected.hooks.catalog.getSnapshot()),
      usePreferences: selector => selector(injected.hooks.preferences.getSnapshot()),
      t: key => key,
    })
    const badge = findAll(tree, node => node.props?.className?.includes?.('sat_panelBadge'))[0]
    assert.equal(textOf(badge), '!')
    assert.ok(badge.props.className.includes('sat_panelBadgeWarn'))
    unsubscribe()
  } finally {
    h.cleanup()
  }
})


test('quick task page delegates open, details, creation, and delete to native services', async () => {
  const rec = record()
  const h = createHarness({ initialRecords: [rec] })
  try {
    const overlay = h.registrations.get('shell.overlay:schedule-attention.delivery-toast')
    const catalog = overlay.spec.inject().hooks.catalog
    const unsubscribe = catalog.subscribe(() => {})
    await settle(catalog)

    const page = h.registrations.get('main:schedules')
    assert.ok(page, 'quick-actions page must shadow the native schedules main cell')
    const injected = page.spec.inject()

    injected.onNewTask()
    assert.equal(h.getStartedSessions(), 1)

    injected.onOpenSession(rec)
    assert.equal(h.getOpenedSession(), rec.sessionId)

    injected.onOpenDetails(rec)
    await new Promise(resolve => setImmediate(resolve))
    assert.equal(h.getOpenedSession(), rec.sessionId)
    assert.deepEqual(h.getOpenedTaskTab(), {
      kind: 'scheduleTask',
      options: { params: { sessionId: rec.sessionId, id: rec.id } },
    })

    assert.equal(await injected.onDelete(rec), true)
    assert.equal(h.getDeleteCalls(), 1)
    assert.equal(catalog.getSnapshot().records.length, 0)
    unsubscribe()
  } finally {
    h.cleanup()
  }
})

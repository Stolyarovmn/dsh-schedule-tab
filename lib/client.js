window.__ModuleLoader__.load({
  id: '@stolyarovmn/dsh-client-ui-schedule-tab',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const PACKAGE = '@stolyarovmn/dsh-client-ui-schedule-tab'
    const NS = 'schedule-attention-enhancer'
    const PANEL_ID = 'schedules'
    const SEEN_STORAGE_KEY = PACKAGE + '/seen-v2'
    const LEGACY_SEEN_STORAGE_KEY = PACKAGE + '/seen-v1'
    const NOTIFIED_STORAGE_KEY = PACKAGE + '/delivery-notified-v1'
    const PREFERENCES_STORAGE_KEY = PACKAGE + '/notification-preferences-v1'
    const MAX_IDS = 4000

    const en = {
      panel: 'Automation tasks',
      unread: '{count} unread automation task updates',
      overdue: '{count} overdue automation tasks',
      delivered: 'Scheduled task delivered: {title}',
      openConversation: 'Open conversation',
      dismiss: 'Dismiss notification',
      settingsTitle: 'Attention and notifications',
      settingsDescription: 'Choose which Automation Tasks events should ask for your attention in this browser.',
      settingsPopupTitle: 'Popup notifications',
      settingsPopupDescription: 'Show a popup when a scheduled task records a new delivery.',
      settingsNewTasksTitle: 'New tasks',
      settingsNewTasksDescription: 'Count newly discovered active tasks in the Automation Tasks badge.',
      settingsNewDeliveriesTitle: 'New deliveries',
      settingsNewDeliveriesDescription: 'Count newly recorded deliveries in the Automation Tasks badge.',
      settingsBrowserLocal: 'These preferences are stored in this browser. Opening Automation tasks marks the current attention as read.',
    }
    const zh = {
      ...en,
      panel: '自动化任务',
      unread: '{count} 条未读自动化任务更新',
      overdue: '{count} 个自动化任务已逾期',
      delivered: '计划任务已投递：{title}',
      openConversation: '打开对话',
      dismiss: '关闭通知',
      settingsTitle: '提醒与通知',
      settingsDescription: '选择此浏览器中哪些自动化任务事件需要引起你的注意。',
      settingsPopupTitle: '弹出通知',
      settingsPopupDescription: '计划任务产生新的投递记录时显示弹出通知。',
      settingsNewTasksTitle: '新任务',
      settingsNewTasksDescription: '在自动化任务徽标中统计新发现的活动任务。',
      settingsNewDeliveriesTitle: '新投递',
      settingsNewDeliveriesDescription: '在自动化任务徽标中统计新记录的投递。',
      settingsBrowserLocal: '这些偏好保存在当前浏览器中。打开自动化任务会将当前提醒标记为已读。',
    }
    const ru = {
      ...en,
      panel: 'Задачи автоматизации',
      unread: 'Непрочитанных обновлений задач: {count}',
      overdue: 'Просроченных задач: {count}',
      delivered: 'Сработала задача: {title}',
      openConversation: 'Открыть диалог',
      dismiss: 'Закрыть уведомление',
      settingsTitle: 'Внимание и уведомления',
      settingsDescription: 'Выберите, какие события Automation Tasks должны привлекать внимание в этом браузере.',
      settingsPopupTitle: 'Всплывающие уведомления',
      settingsPopupDescription: 'Показывать всплывающее уведомление при появлении новой доставки задачи.',
      settingsNewTasksTitle: 'Новые задачи',
      settingsNewTasksDescription: 'Учитывать новые активные задачи в счётчике Automation tasks.',
      settingsNewDeliveriesTitle: 'Новые доставки',
      settingsNewDeliveriesDescription: 'Учитывать новые доставки в счётчике Automation tasks.',
      settingsBrowserLocal: 'Настройки сохраняются в этом браузере. Открытие Automation tasks отмечает текущее внимание как прочитанное.',
    }

    const DEFAULT_PREFERENCES = Object.freeze({ popup: true, newTasks: true, newDeliveries: true })

    function identity(record) { return record.sessionId + ':' + record.id }
    function taskKey(record) { return 'task:' + identity(record) }
    function deliveryMarker(record) {
      const delivery = record.lastDelivery
      if (!delivery) return null
      return delivery.messageId ?? delivery.deliveredAt ?? delivery.scheduledAt ?? null
    }
    function deliveryKey(record) {
      const marker = deliveryMarker(record)
      return marker === null ? null : 'delivery:' + identity(record) + ':' + marker
    }
    function taskTitle(record) { return record.title || record.prompt || record.id }
    function isOverdue(record, now) {
      return record.status === 'active' && Number.isFinite(Date.parse(record.scheduledAt)) && Date.parse(record.scheduledAt) <= now
    }

    function readArray(key) {
      try {
        const raw = window.localStorage?.getItem?.(key)
        const value = raw == null ? [] : JSON.parse(raw)
        return Array.isArray(value) ? value.filter(item => typeof item === 'string').slice(-MAX_IDS) : []
      } catch { return [] }
    }
    function writeArray(key, values) {
      try { window.localStorage?.setItem?.(key, JSON.stringify([...values].slice(-MAX_IDS))) } catch {}
    }
    function hasStorageKey(key) {
      try { return window.localStorage?.getItem?.(key) != null } catch { return false }
    }

    function normalizePreferences(value) {
      return {
        popup: value?.popup !== false,
        newTasks: value?.newTasks !== false,
        newDeliveries: value?.newDeliveries !== false,
      }
    }
    function readPreferences() {
      try {
        const raw = window.localStorage?.getItem?.(PREFERENCES_STORAGE_KEY)
        return raw == null ? { ...DEFAULT_PREFERENCES } : normalizePreferences(JSON.parse(raw))
      } catch { return { ...DEFAULT_PREFERENCES } }
    }
    function writePreferences(value) {
      try { window.localStorage?.setItem?.(PREFERENCES_STORAGE_KEY, JSON.stringify(value)) } catch {}
    }

    let preferencesSnapshot = readPreferences()
    const preferenceListeners = new Set()
    const preferencesSource = {
      getSnapshot: () => preferencesSnapshot,
      subscribe(listener) { preferenceListeners.add(listener); return () => preferenceListeners.delete(listener) },
    }
    function publishPreferences(next, persist = true) {
      const normalized = normalizePreferences(next)
      if (
        normalized.popup === preferencesSnapshot.popup
        && normalized.newTasks === preferencesSnapshot.newTasks
        && normalized.newDeliveries === preferencesSnapshot.newDeliveries
      ) return
      preferencesSnapshot = normalized
      if (persist) writePreferences(normalized)
      for (const listener of [...preferenceListeners]) listener()
    }
    function setPreference(key, enabled) {
      if (!Object.hasOwn(DEFAULT_PREFERENCES, key)) return
      publishPreferences({ ...preferencesSnapshot, [key]: enabled === true })
    }
    function startPreferencesStorageSync() {
      if (typeof window?.addEventListener !== 'function') return () => {}
      const onStorage = event => {
        if (event.key !== PREFERENCES_STORAGE_KEY) return
        publishPreferences(readPreferences(), false)
      }
      window.addEventListener('storage', onStorage)
      return () => window.removeEventListener('storage', onStorage)
    }

    let seenRevision = 0
    const seenListeners = new Set()
    const seenSource = {
      getSnapshot: () => seenRevision,
      subscribe(listener) { seenListeners.add(listener); return () => seenListeners.delete(listener) },
    }
    function bumpSeen() {
      seenRevision += 1
      for (const listener of [...seenListeners]) listener()
    }

    function readSeen(records = []) {
      if (hasStorageKey(SEEN_STORAGE_KEY)) return new Set(readArray(SEEN_STORAGE_KEY))
      if (hasStorageKey(LEGACY_SEEN_STORAGE_KEY)) {
        const legacy = new Set(readArray(LEGACY_SEEN_STORAGE_KEY))
        const migrated = new Set([...legacy].map(value => 'task:' + value))
        for (const record of records) {
          if (!legacy.has(identity(record))) continue
          const key = deliveryKey(record)
          if (key) migrated.add(key)
        }
        writeArray(SEEN_STORAGE_KEY, migrated)
        return migrated
      }
      const baseline = new Set()
      for (const record of records) {
        if (record.status === 'active') baseline.add(taskKey(record))
        const key = deliveryKey(record)
        if (key) baseline.add(key)
      }
      writeArray(SEEN_STORAGE_KEY, baseline)
      return baseline
    }
    function commitSeen(seen) { writeArray(SEEN_STORAGE_KEY, seen); bumpSeen() }
    function markAllSeen(records) {
      const seen = readSeen(records)
      let changed = false
      for (const record of records) {
        if (record.status === 'active' && !seen.has(taskKey(record))) { seen.add(taskKey(record)); changed = true }
        const key = deliveryKey(record)
        if (key && !seen.has(key)) { seen.add(key); changed = true }
      }
      if (changed) commitSeen(seen)
    }
    function markRecordSeen(record) {
      const seen = readSeen([record])
      let changed = false
      if (record.status === 'active' && !seen.has(taskKey(record))) { seen.add(taskKey(record)); changed = true }
      const key = deliveryKey(record)
      if (key && !seen.has(key)) { seen.add(key); changed = true }
      if (changed) commitSeen(seen)
    }

    function readNotified() { return new Set(readArray(NOTIFIED_STORAGE_KEY)) }
    function ensureNotifiedBaseline(records) {
      if (hasStorageKey(NOTIFIED_STORAGE_KEY)) return
      const baseline = new Set()
      for (const record of records) {
        const key = deliveryKey(record)
        if (key) baseline.add(key)
      }
      writeArray(NOTIFIED_STORAGE_KEY, baseline)
    }
    function markNotified(record) {
      const key = deliveryKey(record)
      if (!key) return false
      const notified = readNotified()
      if (notified.has(key)) return false
      notified.add(key)
      writeArray(NOTIFIED_STORAGE_KEY, notified)
      return true
    }

    function consumeSuppressed(records, preferences) {
      const seen = readSeen(records)
      let changed = false
      if (!preferences.newTasks) {
        for (const record of records) {
          if (record.status === 'active' && !seen.has(taskKey(record))) { seen.add(taskKey(record)); changed = true }
        }
      }
      if (!preferences.newDeliveries) {
        for (const record of records) {
          const key = deliveryKey(record)
          if (key && !seen.has(key)) { seen.add(key); changed = true }
        }
      }
      if (changed) commitSeen(seen)
      if (!preferences.popup) {
        const notified = readNotified()
        let notifiedChanged = false
        for (const record of records) {
          const key = deliveryKey(record)
          if (key && !notified.has(key)) { notified.add(key); notifiedChanged = true }
        }
        if (notifiedChanged) writeArray(NOTIFIED_STORAGE_KEY, notified)
      }
    }

    function summary(records, now, preferences) {
      const seen = readSeen(records)
      let unread = 0
      let overdue = 0
      for (const record of records) {
        if (isOverdue(record, now)) overdue += 1
        const delivery = deliveryKey(record)
        if (preferences.newDeliveries && delivery && !seen.has(delivery)) { unread += 1; continue }
        if (preferences.newTasks && record.status === 'active' && !seen.has(taskKey(record))) unread += 1
      }
      return { unread, overdue }
    }

    function createToastSource() {
      let current = null
      let queue = []
      let sequence = 0
      const listeners = new Set()
      const publish = value => { current = value; for (const listener of [...listeners]) listener() }
      const showNext = () => {
        if (current !== null || queue.length === 0) return
        publish({ record: queue.shift(), sequence: ++sequence })
      }
      return {
        getSnapshot: () => current,
        subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener) },
        enqueue(record) { queue.push(record); showNext() },
        dismiss() { publish(null); queueMicrotask(showNext) },
        clear() { queue = []; publish(null) },
      }
    }

    const toastSource = createToastSource()
    let baselineReady = false
    function applyPreferenceSuppression(records) {
      const preferences = preferencesSource.getSnapshot()
      consumeSuppressed(records, preferences)
      if (!preferences.popup) toastSource.clear()
      return preferences
    }
    function processAttention(records) {
      readSeen(records)
      ensureNotifiedBaseline(records)
      const preferences = applyPreferenceSuppression(records)
      if (!baselineReady) { baselineReady = true; return }
      if (!preferences.popup) return
      for (const record of records) if (deliveryKey(record) && markNotified(record)) toastSource.enqueue(record)
    }

    function createCatalogSource(ctx) {
      let snapshot = { records: [], status: 'loading', settled: false }
      const listeners = new Set()
      let disposers = []
      let epoch = 0
      const publish = value => { snapshot = value; for (const listener of [...listeners]) listener() }
      const refresh = async () => {
        const current = ++epoch
        publish({ ...snapshot, status: 'loading' })
        let result
        try { result = await ctx.remote.schedule.catalog() } catch { if (current === epoch) publish({ ...snapshot, status: 'error' }); return }
        if (current !== epoch) return
        if (!result?.ok) { publish({ ...snapshot, status: 'error' }); return }
        const records = result.value ?? []
        processAttention(records)
        publish({ records, status: 'ready', settled: true })
      }
      const invalidate = () => { void refresh() }
      return {
        getSnapshot: () => snapshot,
        subscribe(listener) {
          listeners.add(listener)
          if (listeners.size === 1) {
            disposers = [ctx.remote.$on('schedule/changed', invalidate), ctx.on('connection/reset', invalidate)]
            invalidate()
          }
          return () => {
            listeners.delete(listener)
            if (listeners.size !== 0) return
            for (const dispose of disposers) dispose?.()
            disposers = []
            epoch += 1
          }
        },
      }
    }

    function useObservable(source) {
      const [snapshot, setSnapshot] = React.useState(() => source.getSnapshot())
      React.useEffect(() => source.subscribe(() => setSnapshot(source.getSnapshot())), [source])
      return snapshot
    }

    function ClockGlyph({ size = 16, tone = 'normal', dot = false }) {
      const color = tone === 'warning'
        ? 'var(--dsw-alias-state-warn-primary)'
        : tone === 'new' ? 'var(--dsw-alias-state-business-primary)' : 'var(--dsw-alias-label-tertiary)'
      return h('svg', {
        width: size, height: size, viewBox: '0 0 20 20', fill: 'none', 'aria-hidden': true,
        style: { display: 'block', color },
      },
      h('circle', { cx: 10, cy: 10, r: 6.25, stroke: 'currentColor', strokeWidth: 1.5 }),
      h('path', { d: 'M10 6.5V10l2.75 1.75', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
      dot ? h('circle', { cx: 15.4, cy: 4.6, r: 2.1, fill: tone === 'warning' ? 'var(--dsw-alias-state-warn-primary)' : 'var(--dsw-alias-state-business-primary)', stroke: 'var(--dsw-alias-bg-layer-1)', strokeWidth: 1 }) : null)
    }

    function AttentionIcon({ size, active, useCatalog, usePreferences, t }) {
      const catalog = useCatalog(current => current)
      const preferences = usePreferences(current => current)
      useObservable(seenSource)
      const [now, setNow] = React.useState(() => Date.now())
      const signature = catalog.records.map(record => [identity(record), record.status, record.scheduledAt, deliveryMarker(record) ?? ''].join('@')).join('|')
      React.useEffect(() => {
        if (catalog.status !== 'ready' || !active) return
        markAllSeen(catalog.records)
      }, [active, catalog.status, signature])
      React.useEffect(() => {
        if (!catalog.records.some(record => record.status === 'active')) return
        const timer = window.setTimeout(() => setNow(Date.now()), 60000)
        return () => window.clearTimeout(timer)
      }, [signature, now])
      const state = summary(catalog.records, now, preferences)
      const tone = state.overdue > 0 ? 'warning' : state.unread > 0 ? 'new' : 'normal'
      const label = state.overdue > 0 ? t('overdue', { count: state.overdue }) : state.unread > 0 ? t('unread', { count: state.unread }) : t('panel')
      const badge = state.unread > 0 ? (state.unread > 9 ? '9+' : String(state.unread)) : state.overdue > 0 ? '!' : null
      return h('span', { className: 'sat_panelIcon', title: label },
        h(ClockGlyph, { size: size ?? 16, tone }),
        badge === null ? null : h('span', {
          className: 'sat_panelBadge' + (state.overdue > 0 ? ' sat_panelBadgeWarn' : ''),
          'aria-hidden': true,
        }, badge))
    }

    function PreferenceSwitch({ checked, label, onChange }) {
      return h('button', {
        type: 'button',
        role: 'switch',
        'aria-checked': checked,
        'aria-label': label,
        className: 'sat_switch',
        onClick: () => onChange(!checked),
      }, h('span', { className: 'sat_switchThumb' }))
    }

    function NotificationSettingsSection({ subject, usePreferences, changePreference, t }) {
      if (subject.kind !== 'bundle' || subject.pkg.name !== PACKAGE) return null
      const preferences = usePreferences(current => current)
      const rows = [
        ['popup', 'settingsPopupTitle', 'settingsPopupDescription'],
        ['newTasks', 'settingsNewTasksTitle', 'settingsNewTasksDescription'],
        ['newDeliveries', 'settingsNewDeliveriesTitle', 'settingsNewDeliveriesDescription'],
      ]
      return h('section', { className: 'sat_settings', 'aria-label': t('settingsTitle') },
        h('h3', { className: 'sat_settingsTitle' }, t('settingsTitle')),
        h('p', { className: 'sat_settingsDescription' }, t('settingsDescription')),
        h('div', { className: 'sat_settingsRows' }, rows.map(([key, titleKey, descriptionKey]) =>
          h('div', { className: 'sat_settingRow', key },
            h('div', { className: 'sat_settingCopy' },
              h('div', { className: 'sat_settingTitle' }, t(titleKey)),
              h('div', { className: 'sat_settingDescription' }, t(descriptionKey))),
            h(PreferenceSwitch, {
              checked: preferences[key],
              label: t(titleKey),
              onChange: enabled => changePreference(key, enabled),
            })))),
        h('p', { className: 'sat_settingsFootnote' }, t('settingsBrowserLocal')))
    }

    const pluginCss = `
      .sat_panelIcon{position:relative;display:inline-flex;align-items:center;justify-content:center;width:var(--sat-icon-size,16px);height:var(--sat-icon-size,16px);overflow:visible}
      .sat_panelBadge{position:absolute;top:-6px;right:-8px;min-width:12px;height:12px;padding:0 3px;box-sizing:border-box;border-radius:999px;corner-shape:round;background:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary-foreground);font-size:8px;line-height:12px;font-weight:700;text-align:center;box-shadow:0 0 0 1.5px var(--dsw-alias-bg-layer-1);pointer-events:none}
      .sat_panelBadgeWarn{background:var(--dsw-alias-state-warn-primary)}
      .sat_toast{position:fixed;top:16px;right:16px;z-index:1000;width:min(360px,calc(100vw - 32px));box-sizing:border-box;border:.5px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-lg);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);padding:12px;display:flex;gap:10px;align-items:flex-start}
      .sat_toastBody{min-width:0;flex:1 1 auto}
      .sat_toastIcon{flex:none;margin-top:2px}
      .sat_toastTitle{font-size:13px;line-height:19px;font-weight:500;overflow-wrap:anywhere}
      .sat_toastAction,.sat_toastClose{border:0;background:transparent;cursor:pointer;font:inherit}
      .sat_toastAction{color:var(--dsw-alias-link);padding:2px 0}
      .sat_toastClose{color:var(--dsw-alias-label-tertiary);padding:0;font-size:18px;line-height:1}
      .sat_toastAction:focus-visible,.sat_toastClose:focus-visible,.sat_switch:focus-visible{outline:var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:2px}
      .sat_settings{margin-top:24px;padding-top:24px;border-top:.5px solid var(--dsw-alias-border-l3);color:var(--dsw-alias-label-primary)}
      .sat_settingsTitle{margin:0;font-size:14px;line-height:20px;font-weight:600}
      .sat_settingsDescription{margin:6px 0 14px;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px}
      .sat_settingsRows{border:.5px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-lg);overflow:hidden}
      .sat_settingRow{display:flex;align-items:center;gap:20px;padding:14px 16px;background:var(--dsw-alias-bg-layer-1)}
      .sat_settingRow+.sat_settingRow{border-top:.5px solid var(--dsw-alias-border-l3)}
      .sat_settingCopy{min-width:0;flex:1 1 auto}
      .sat_settingTitle{font-size:13px;line-height:19px;font-weight:500}
      .sat_settingDescription{margin-top:2px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px}
      .sat_settingsFootnote{margin:10px 0 0;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}
      .sat_switch{box-sizing:border-box;position:relative;flex:0 0 auto;width:36px;height:20px;padding:2px;border:0;border-radius:999px;corner-shape:round;background:var(--dsw-alias-border-l3);cursor:pointer}
      .sat_switch[aria-checked='true']{background:var(--dsw-alias-brand-primary)}
      .sat_switchThumb{display:block;width:16px;height:16px;border-radius:50%;corner-shape:round;background:var(--dsw-alias-switch-thumb);transition:transform 120ms ease}
      .sat_switch[aria-checked='true'] .sat_switchThumb{transform:translateX(16px);background:var(--dsw-alias-label-primary-foreground)}
      @media (prefers-reduced-motion:reduce){.sat_switchThumb{transition:none}}
    `

    function DeliveryToast({ useToast, useCatalog, dismiss, onOpen, t }) {
      useCatalog(current => current)
      const toast = useToast(current => current)
      React.useEffect(() => {
        if (toast === null) return
        const timer = window.setTimeout(dismiss, 6000)
        return () => window.clearTimeout(timer)
      }, [toast?.sequence, dismiss])
      const style = h('style', { key: 'schedule-attention-style' }, pluginCss)
      if (toast === null) return style
      const record = toast.record
      return h(React.Fragment, null, style, h('div', { role: 'status', className: 'sat_toast' },
        h('span', { className: 'sat_toastIcon' }, h(ClockGlyph, { size: 18, tone: 'new', dot: true })),
        h('div', { className: 'sat_toastBody' },
          h('div', { className: 'sat_toastTitle' }, t('delivered', { title: taskTitle(record) })),
          h('button', { type: 'button', className: 'sat_toastAction', onClick: () => onOpen(record) }, t('openConversation'))),
        h('button', { type: 'button', className: 'sat_toastClose', 'aria-label': t('dismiss'), onClick: dismiss }, '×')))
    }

    return {
      inject: ['slots', 'locale', 'remote', 'uiWorkspace'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { en, zh, ru }), 'schedule-attention: dictionaries')
        ctx.effect(() => startPreferencesStorageSync(), 'schedule-attention: preference storage sync')
        ctx.slots.inject('plugins.detail.section', () => ctx.slots.register({
          name: 'plugins.detail.section', id: 'schedule-attention.settings', order: 100, locale: NS,
          inject: () => ({
            hooks: { preferences: preferencesSource },
            changePreference: setPreference,
          }),
        }, NotificationSettingsSection))
        ctx.inject(['remote.schedule'], (scope) => {
          const catalog = createCatalogSource(scope)
          scope.effect(() => preferencesSource.subscribe(() => {
            applyPreferenceSuppression(catalog.getSnapshot().records)
          }), 'schedule-attention: apply preference changes')
          scope.slots.inject('sidebar.panellist', () => scope.slots.register({
            name: 'sidebar.panellist', id: PANEL_ID, order: 10, priority: -100, locale: NS,
            label: () => scope.locale.bind(NS)('panel'),
            inject: () => ({ hooks: { catalog, preferences: preferencesSource } }),
          }, AttentionIcon))
          scope.slots.inject('shell.overlay', () => scope.slots.register({
            name: 'shell.overlay', id: 'schedule-attention.delivery-toast', order: 20, locale: NS,
            inject: () => ({
              hooks: { toast: toastSource, catalog },
              dismiss: toastSource.dismiss,
              onOpen: (record) => {
                markRecordSeen(record)
                toastSource.dismiss()
                scope.uiWorkspace.openSession(record.sessionId)
              },
            }),
          }, DeliveryToast))
        })
      },
    }
  },
})

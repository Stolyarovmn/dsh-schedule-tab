window.__ModuleLoader__.load({
  id: '@stolyarovmn/dsh-client-ui-schedule-tab',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const PACKAGE = '@stolyarovmn/dsh-client-ui-schedule-tab'
    const nativeManager = require('@stolyarovmn/dsh-schedule-native-manager')
    const NS = 'schedule-attention-enhancer'
    const PANEL_ID = 'schedules'
    const SEEN_STORAGE_KEY = PACKAGE + '/seen-v2'
    const LEGACY_SEEN_STORAGE_KEY = PACKAGE + '/seen-v1'
    const NOTIFIED_STORAGE_KEY = PACKAGE + '/delivery-notified-v1'
    const SESSION_SEEN_STORAGE_KEY = PACKAGE + '/session-delivery-seen-v1'
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
      settingsBrowserLocal: 'These preferences are stored in this browser. Opening Automation tasks marks task-center attention as read; scheduled Session activity stays unread until its conversation is opened.',
      sessionUnread: 'New scheduled activity',
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
      settingsBrowserLocal: '这些偏好保存在当前浏览器中。打开自动化任务只会清除任务中心提醒；计划会话活动会一直保留到打开对应对话。',
      sessionUnread: '新的计划任务活动',
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
      settingsBrowserLocal: 'Настройки сохраняются в этом браузере. Открытие Automation tasks снимает внимание только в центре задач; индикатор Session остаётся до открытия самого диалога.',
      sessionUnread: 'Новая активность по расписанию',
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

    function readSessionSeen(records = []) {
      if (hasStorageKey(SESSION_SEEN_STORAGE_KEY)) return new Set(readArray(SESSION_SEEN_STORAGE_KEY))
      const baseline = new Set()
      for (const record of records) {
        const key = deliveryKey(record)
        if (key) baseline.add(key)
      }
      writeArray(SESSION_SEEN_STORAGE_KEY, baseline)
      return baseline
    }
    function commitSessionSeen(seen) { writeArray(SESSION_SEEN_STORAGE_KEY, seen); bumpSeen() }
    function markSessionSeen(records, sessionId) {
      const seen = readSessionSeen(records)
      let changed = false
      for (const record of records) {
        if (record.sessionId !== sessionId) continue
        const key = deliveryKey(record)
        if (key && !seen.has(key)) { seen.add(key); changed = true }
      }
      if (changed) commitSessionSeen(seen)
    }
    function markSessionRecordSeen(record) {
      const key = deliveryKey(record)
      if (!key) return
      const seen = readSessionSeen([record])
      if (seen.has(key)) return
      seen.add(key)
      commitSessionSeen(seen)
    }
    function sessionHasUnread(records, sessionId) {
      const seen = readSessionSeen(records)
      return records.some(record => {
        if (record.sessionId !== sessionId) return false
        const key = deliveryKey(record)
        return key !== null && !seen.has(key)
      })
    }

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
    function markCurrentDeliveriesNotified(records) {
      const notified = readNotified()
      let changed = false
      for (const record of records) {
        const key = deliveryKey(record)
        if (key && !notified.has(key)) { notified.add(key); changed = true }
      }
      if (changed) writeArray(NOTIFIED_STORAGE_KEY, notified)
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

    function applyPreferenceSuppression(records) {
      consumeSuppressed(records, preferencesSnapshot)
      if (!preferencesSnapshot.popup) toastSource.clear()
    }

    function deliveryKeyForReceipt(record, receipt) {
      const marker = receipt?.messageId ?? receipt?.deliveredAt ?? receipt?.scheduledAt ?? null
      return marker === null ? null : 'delivery:' + identity(record) + ':' + marker
    }

    function unreadDeliveryCount(record, seen, historyByTask) {
      const latest = deliveryKey(record)
      if (latest === null || seen.has(latest)) return 0
      const history = historyByTask.get(identity(record))
      if (!Array.isArray(history) || history.length === 0) return 1
      let count = 0
      for (const receipt of history) {
        const key = deliveryKeyForReceipt(record, receipt)
        if (key !== null && seen.has(key)) break
        count += 1
        if (count >= 10) break
      }
      return Math.max(1, count)
    }

    function summary(records, now, preferences, historyByTask) {
      const seen = readSeen(records)
      let unread = 0
      let overdue = 0
      for (const record of records) {
        if (isOverdue(record, now)) overdue += 1
        const deliveries = preferences.newDeliveries ? unreadDeliveryCount(record, seen, historyByTask) : 0
        if (deliveries > 0) { unread += deliveries; continue }
        if (preferences.newTasks && record.status === 'active' && !seen.has(taskKey(record))) unread += 1
        if (unread >= 10) unread = 10
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
    function createCatalogSource(ctx) {
      let snapshot = { records: [], status: 'loading', historyByTask: new Map() }
      let generation = 0
      let subscribers = 0
      let started = false
      let disposed = false
      let unsubscribeChanged = () => {}
      let unsubscribeReset = () => {}
      const listeners = new Set()
      const publish = value => { snapshot = value; for (const listener of [...listeners]) listener() }
      const shouldEnrichHistory = records => {
        const preferences = preferencesSnapshot
        if (!preferences.newDeliveries) return false
        const seen = readSeen(records)
        const candidates = records.filter(record => {
          const key = deliveryKey(record)
          return key !== null && !seen.has(key)
        })
        return candidates
      }
      async function refresh() {
        const current = ++generation
        let result
        try { result = await ctx.remote.schedule.catalog() }
        catch {
          if (current === generation && !disposed) publish({ ...snapshot, status: 'error' })
          return
        }
        if (disposed || current !== generation || !result?.ok || !Array.isArray(result.value?.records)) {
          if (!disposed && current === generation) publish({ ...snapshot, status: 'error' })
          return
        }
        const records = result.value.records
        ensureNotifiedBaseline(records)
        consumeSuppressed(records, preferencesSnapshot)
        const historyByTask = new Map()
        const candidates = shouldEnrichHistory(records)
        if (candidates.length < 10) {
          let cursor = 0
          const workers = Array.from({ length: Math.min(4, candidates.length) }, async () => {
            while (cursor < candidates.length) {
              const record = candidates[cursor++]
              let history
              try {
                history = await ctx.remote.schedule.history({ sessionId: record.sessionId, id: record.id, limit: 10 })
              } catch { continue }
              if (history?.ok && Array.isArray(history.value?.records)) historyByTask.set(identity(record), history.value.records)
            }
          })
          await Promise.all(workers)
        }
        if (disposed || current !== generation) return
        const previous = snapshot.records
        publish({ records, status: 'ready', historyByTask })
        if (started) detectDeliveries(previous, records)
        else markCurrentDeliveriesNotified(records)
        started = true
      }
      function detectDeliveries(previous, records) {
        const previousById = new Map(previous.map(record => [identity(record), deliveryMarker(record)]))
        const preferences = preferencesSnapshot
        for (const record of records) {
          const marker = deliveryMarker(record)
          if (marker === null || previousById.get(identity(record)) === marker) continue
          if (preferences.popup && markNotified(record)) toastSource.enqueue(record)
        }
      }
      function start() {
        unsubscribeChanged = ctx.remote.$on('schedule/changed', refresh)
        unsubscribeReset = ctx.on('connection/reset', refresh)
        void refresh()
      }
      return {
        getSnapshot: () => snapshot,
        subscribe(listener) {
          listeners.add(listener)
          subscribers += 1
          if (subscribers === 1) start()
          return () => {
            listeners.delete(listener)
            subscribers -= 1
            if (subscribers === 0) {
              generation += 1
              unsubscribeChanged()
              unsubscribeReset()
              unsubscribeChanged = () => {}
              unsubscribeReset = () => {}
            }
          }
        },
        refresh,
        dispose() {
          disposed = true
          generation += 1
          unsubscribeChanged()
          unsubscribeReset()
          listeners.clear()
        },
      }
    }

    function PreferenceSwitch({ checked, onChange, label, description }) {
      return h('label', { className: 'sat_prefRow' },
        h('span', { className: 'sat_prefCopy' },
          h('span', { className: 'sat_prefTitle' }, label),
          h('span', { className: 'sat_prefDescription' }, description)),
        h('button', {
          type: 'button',
          role: 'switch',
          'aria-checked': checked,
          className: 'sat_prefSwitch' + (checked ? ' sat_prefSwitchOn' : ''),
          onClick: () => onChange(!checked),
        }, h('span', { className: 'sat_prefThumb' })))
    }

    function PluginPreferences({ usePreferences, setPreference: setValue, t }) {
      const preferences = usePreferences(value => value)
      return h('section', { className: 'sat_prefSection' },
        h('style', null, pluginCss),
        h('div', { className: 'sat_prefHeader' },
          h('h2', { className: 'sat_prefHeading' }, t('settingsTitle')),
          h('p', { className: 'sat_prefDescription' }, t('settingsDescription'))),
        h('div', { className: 'sat_prefList' },
          h(PreferenceSwitch, {
            checked: preferences.popup,
            onChange: enabled => setValue('popup', enabled),
            label: t('settingsPopupTitle'),
            description: t('settingsPopupDescription'),
          }),
          h(PreferenceSwitch, {
            checked: preferences.newTasks,
            onChange: enabled => setValue('newTasks', enabled),
            label: t('settingsNewTasksTitle'),
            description: t('settingsNewTasksDescription'),
          }),
          h(PreferenceSwitch, {
            checked: preferences.newDeliveries,
            onChange: enabled => setValue('newDeliveries', enabled),
            label: t('settingsNewDeliveriesTitle'),
            description: t('settingsNewDeliveriesDescription'),
          })),
        h('p', { className: 'sat_prefFootnote' }, t('settingsBrowserLocal')))
    }

    function AttentionIcon({ active, useCatalog, usePreferences, t }) {
      const catalog = useCatalog(value => value)
      const preferences = usePreferences(value => value)
      React.useSyncExternalStore(seenSource.subscribe, seenSource.getSnapshot, seenSource.getSnapshot)
      const state = summary(catalog.records, Date.now(), preferences, catalog.historyByTask)
      const panelWasActiveRef = React.useRef(active)
      React.useEffect(() => {
        const justActivated = active && !panelWasActiveRef.current
        panelWasActiveRef.current = active
        if (justActivated && catalog.records.length > 0) markAllSeen(catalog.records)
      }, [active, catalog.records])
      return h('span', { className: 'sat_panelIconWrap' },
        h('span', { className: 'sat_panelIcon', 'aria-hidden': true },
          h('svg', { viewBox: '0 0 16 16', width: 16, height: 16, fill: 'none' },
            h('circle', { cx: 8, cy: 8, r: 6.15, stroke: 'currentColor', strokeWidth: 1.2 }),
            h('path', { d: 'M8 4.5v3.7l2.3 1.45', stroke: 'currentColor', strokeWidth: 1.2, strokeLinecap: 'round', strokeLinejoin: 'round' }))),
        state.unread > 0
          ? h('span', { className: 'sat_panelBadge', 'aria-label': t('unread', { count: state.unread }) }, state.unread > 9 ? '9+' : String(state.unread))
          : state.overdue > 0
            ? h('span', { className: 'sat_panelOverdue', 'aria-label': t('overdue', { count: state.overdue }) }, '!')
            : null)
    }

    function SessionActivityMark({ sessionId, useCatalog, useMainView, t }) {
      const catalog = useCatalog(value => value)
      const mainView = useMainView(value => value)
      React.useSyncExternalStore(seenSource.subscribe, seenSource.getSnapshot, seenSource.getSnapshot)
      const unread = sessionHasUnread(catalog.records, sessionId)
      React.useEffect(() => {
        if (!unread) return
        if (mainView.activePanelId === null && mainView.mainSessionId === sessionId) {
          markSessionSeen(catalog.records, sessionId)
        }
      }, [unread, mainView.activePanelId, mainView.mainSessionId, catalog.records, sessionId])
      if (!unread) return null
      return h('span', { className: 'sat_sessionDot', role: 'img', 'aria-label': t('sessionUnread') })
    }

    function DeliveryToast({ useToast, useCatalog, dismiss, onOpen, t }) {
      const current = useToast(value => value)
      useCatalog(value => value)
      if (current == null) return null
      return h('div', { className: 'sat_toast', role: 'status' },
        h('span', { className: 'sat_toastIcon', 'aria-hidden': true },
          h('svg', { viewBox: '0 0 16 16', width: 16, height: 16, fill: 'none' },
            h('circle', { cx: 8, cy: 8, r: 6.15, stroke: 'currentColor', strokeWidth: 1.2 }),
            h('path', { d: 'M8 4.5v3.7l2.3 1.45', stroke: 'currentColor', strokeWidth: 1.2, strokeLinecap: 'round', strokeLinejoin: 'round' }))),
        h('span', { className: 'sat_toastCopy' },
          h('strong', null, t('delivered', { title: taskTitle(current.record) })),
          h('button', { type: 'button', className: 'sat_toastOpen', onClick: () => onOpen(current.record) }, t('openConversation'))),
        h('button', { type: 'button', className: 'sat_toastClose', 'aria-label': t('dismiss'), onClick: dismiss }, '×'))
    }

    const pluginCss = `
      .sat_panelIconWrap{position:relative;display:inline-flex;width:16px;height:16px;align-items:center;justify-content:center;overflow:visible}
      .sat_panelIcon{display:inline-flex;width:16px;height:16px;color:var(--dsw-alias-label-secondary)}
      .sat_panelBadge{position:absolute;top:-5px;right:-7px;display:flex;min-width:12px;height:12px;box-sizing:border-box;padding:0 3px;border-radius:6px;align-items:center;justify-content:center;background:var(--dsw-alias-button-ghost-active-fill);color:var(--dsw-alias-label-primary);font-size:8px;font-weight:600;line-height:12px;box-shadow:0 0 0 1px var(--dsw-alias-bg-layer-1)}
      .sat_panelOverdue{position:absolute;top:-5px;right:-5px;display:flex;width:11px;height:11px;align-items:center;justify-content:center;border-radius:50%;background:var(--dsw-alias-state-warn-primary);color:var(--dsw-alias-label-primary-foreground);font-size:8px;font-weight:700;line-height:11px;box-shadow:0 0 0 1px var(--dsw-alias-bg-layer-1)}
      .sat_sessionDot{display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--dsw-alias-state-success-primary)}
      .sat_toast{position:fixed;top:12px;right:12px;z-index:1200;display:flex;width:min(380px,calc(100vw - 24px));box-sizing:border-box;gap:10px;padding:12px 14px;border:.5px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-md);background:var(--dsw-alias-bg-layer-2);box-shadow:0 8px 30px rgba(0,0,0,.24);color:var(--dsw-alias-label-primary)}
      .sat_toastIcon{flex:none;display:inline-flex;width:18px;height:18px;margin-top:1px;color:var(--dsw-alias-state-business-primary)}
      .sat_toastCopy{display:flex;min-width:0;flex:1;flex-direction:column;gap:3px;font-size:12px;line-height:18px}.sat_toastCopy strong{font-weight:600;overflow-wrap:anywhere}
      .sat_toastOpen{align-self:flex-start;padding:0;border:0;background:transparent;color:var(--dsw-alias-link);font:inherit;cursor:pointer}.sat_toastOpen:hover{text-decoration:underline}
      .sat_toastClose{flex:none;width:24px;height:24px;margin:-4px -6px 0 0;padding:0;border:0;border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-tertiary);font-size:18px;line-height:24px;cursor:pointer}.sat_toastClose:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
      .sat_prefSection{display:flex;flex-direction:column;gap:16px;padding:4px 0 12px}.sat_prefHeader{display:flex;flex-direction:column;gap:4px}.sat_prefHeading{margin:0;font-size:14px;line-height:22px;font-weight:600}.sat_prefDescription{margin:0;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}
      .sat_prefList{display:flex;flex-direction:column;border-top:.5px solid var(--dsw-alias-border-l4)}.sat_prefRow{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:12px 0;border-bottom:.5px solid var(--dsw-alias-border-l4)}.sat_prefCopy{display:flex;min-width:0;flex:1;flex-direction:column;gap:2px}.sat_prefTitle{color:var(--dsw-alias-label-primary);font-size:13px;line-height:20px;font-weight:500}.sat_prefDescription{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}
      .sat_prefSwitch{position:relative;flex:none;width:34px;height:18px;padding:0;border:0;border-radius:9px;background:var(--dsw-alias-bg-layer-2);cursor:pointer;box-shadow:inset 0 0 0 .5px var(--dsw-alias-border-l3)}.sat_prefSwitchOn{background:var(--dsw-alias-label-primary)}.sat_prefThumb{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:var(--dsw-alias-label-primary);transition:transform .12s ease}.sat_prefSwitchOn .sat_prefThumb{transform:translateX(16px);background:var(--dsw-alias-bg-layer-1)}
      .sat_prefSwitch:focus-visible,.sat_toastOpen:focus-visible,.sat_toastClose:focus-visible{outline:var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:2px}
      .sat_prefFootnote{margin:0;color:var(--dsw-alias-label-caption);font-size:11px;line-height:17px}
    `

    return {
      name: 'schedule-attention-enhancer',
      inject: ['slots', 'locale', 'uiWorkspace', 'sessions', 'workspaces', 'remote'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { en, zh, ru }), 'schedule-attention: locale')
        ctx.effect(startPreferencesStorageSync, 'schedule-attention: storage sync')
        ctx.slots.inject('plugins.detail.section', () => ctx.slots.register({
          name: 'plugins.detail.section', id: 'schedule-attention-notifications', order: 30, locale: NS,
          inject: () => ({ hooks: { preferences: preferencesSource }, setPreference }),
        }, PluginPreferences))
        ctx.inject(['remote.schedule'], (scope) => {
          const catalog = createCatalogSource(scope)

          let nativeCatalog
          nativeCatalog = nativeManager.createCatalogSource({
            list: () => scope.remote.schedule.catalog(),
            remove: async (id) => {
              const record = nativeCatalog.hooks.catalog.getSnapshot().records.find(item => item.id === id)
              if (record === undefined) return { ok: true, value: { id, deleted: false, code: 'schedule_not_found' } }
              return scope.remote.schedule.delete({ sessionId: record.sessionId, id })
            },
            subscribeChanged: listener => scope.remote.$on('schedule/changed', listener),
            subscribeReset: listener => scope.on('connection/reset', listener),
          })
          const deleteToast = nativeManager.createDeleteToastSource()
          const reportedDelete = async (id) => {
            const outcome = await nativeCatalog.onDelete(id)
            deleteToast.report(outcome)
            return outcome
          }
          const updateTask = async (request) => {
            const result = await scope.remote.schedule.update(request)
            if (result?.ok && ('record' in result.value || result.value.code === 'schedule_conflict'
              || result.value.code === 'schedule_ended' || result.value.code === 'schedule_not_found')) {
              await nativeCatalog.onRetry(nativeCatalog.hooks.catalog.getSnapshot().readRequest)
            }
            return result
          }
          const openSession = (id) => {
            markSessionSeen(catalog.getSnapshot().records, id)
            ctx.uiWorkspace.openSession(id)
          }

          scope.slots.inject('shell.overlay', () => scope.slots.register({
            name: 'shell.overlay', id: 'schedule-attention.native-delete-toast', order: 19, locale: 'schedule.manager',
            inject: () => ({ hooks: deleteToast.hooks, dismiss: deleteToast.dismiss }),
          }, nativeManager.ScheduleDeleteToast))

          scope.slots.inject('main', () => scope.slots.register({
            name: 'main', key: PANEL_ID, priority: -100, locale: 'schedule.manager',
            inject: () => ({
              hooks: nativeCatalog.hooks,
              onDelete: reportedDelete,
              onRetry: nativeCatalog.onRetry,
              onUpdateTiming: updateTask,
              loadHistory: request => scope.remote.schedule.history(request),
              onOpenSession: openSession,
              onNewTask: () => { ctx.uiWorkspace.startSession() },
            }),
          }, nativeManager.TaskManagerPage))
          scope.effect(() => preferencesSource.subscribe(() => {
            applyPreferenceSuppression(catalog.getSnapshot().records)
          }), 'schedule-attention: apply preference changes')
          scope.slots.inject('sidebar.session.row.leading', () => scope.slots.register({
            name: 'sidebar.session.row.leading', id: 'schedule-mark', order: 10, priority: -100, locale: NS,
            inject: () => ({ hooks: { catalog } }),
          }, SessionActivityMark))
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
                markSessionRecordSeen(record)
                toastSource.dismiss()
                ctx.uiWorkspace.openSession(record.sessionId)
              },
            }),
          }, DeliveryToast))
        })
      },
    }
  },
})
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
      taskSearch: 'Search automation tasks',
      taskAll: 'All',
      taskEnabled: 'Enabled',
      taskInactive: 'Inactive',
      taskNew: 'New',
      taskEmpty: 'No tasks yet. Tasks created in your sessions appear here.',
      taskNoMatches: 'No automation tasks match this search.',
      taskOpenDetails: 'Open task details',
      taskOpenSession: 'Open linked session',
      taskDelete: 'Delete task',
      taskDeleteConfirm: 'Delete?',
      taskCancel: 'Cancel',
      taskDeleting: 'Deleting…',
      taskDeleted: 'Task deleted.',
      taskDeleteFailed: 'Could not delete task.',
      taskOnce: 'Once',
      taskEvery: 'Every {value}',
      taskDaily: 'Daily at {time}',
      taskWeekly: 'Weekly at {time}',
      taskCron: 'Cron',
      taskNext: 'Next {time}',
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
      taskSearch: '搜索自动化任务',
      taskAll: '全部',
      taskEnabled: '启用',
      taskInactive: '停用',
      taskNew: '新建',
      taskEmpty: '暂无任务。会话中创建的任务会显示在这里。',
      taskNoMatches: '没有匹配的自动化任务。',
      taskOpenDetails: '打开任务详情',
      taskOpenSession: '打开关联会话',
      taskDelete: '删除任务',
      taskDeleteConfirm: '删除？',
      taskCancel: '取消',
      taskDeleting: '正在删除…',
      taskDeleted: '任务已删除。',
      taskDeleteFailed: '无法删除任务。',
      taskOnce: '一次',
      taskEvery: '每 {value}',
      taskDaily: '每天 {time}',
      taskWeekly: '每周 {time}',
      taskCron: 'Cron',
      taskNext: '下次 {time}',
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
      taskSearch: 'Поиск задач автоматизации',
      taskAll: 'Все',
      taskEnabled: 'Активные',
      taskInactive: 'Неактивные',
      taskNew: 'Новая',
      taskEmpty: 'Задач пока нет. Созданные в диалогах задачи появятся здесь.',
      taskNoMatches: 'Подходящих задач не найдено.',
      taskOpenDetails: 'Открыть детали задачи',
      taskOpenSession: 'Открыть связанный диалог',
      taskDelete: 'Удалить задачу',
      taskDeleteConfirm: 'Удалить?',
      taskCancel: 'Отмена',
      taskDeleting: 'Удаление…',
      taskDeleted: 'Задача удалена.',
      taskDeleteFailed: 'Не удалось удалить задачу.',
      taskOnce: 'Один раз',
      taskEvery: 'Каждые {value}',
      taskDaily: 'Ежедневно в {time}',
      taskWeekly: 'Еженедельно в {time}',
      taskCron: 'Cron',
      taskNext: 'Следующий запуск: {time}',
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
    let baselineReady = false
    let panelWasActive = false
    function applyPreferenceSuppression(records) {
      const preferences = preferencesSource.getSnapshot()
      consumeSuppressed(records, preferences)
      if (!preferences.popup) toastSource.clear()
      return preferences
    }
    function processAttention(records) {
      readSeen(records)
      readSessionSeen(records)
      ensureNotifiedBaseline(records)
      const preferences = applyPreferenceSuppression(records)
      if (!baselineReady) {
        baselineReady = true
        markCurrentDeliveriesNotified(records)
        return
      }
      if (!preferences.popup) return
      for (const record of records) if (deliveryKey(record) && markNotified(record)) toastSource.enqueue(record)
    }

    function createCatalogSource(ctx) {
      let snapshot = { records: [], historyByTask: new Map(), status: 'loading', settled: false }
      const listeners = new Set()
      const historyCache = new Map()
      let disposers = []
      let epoch = 0
      const publish = value => { snapshot = value; for (const listener of [...listeners]) listener() }

      const loadUnreadHistory = async (record) => {
        const latest = deliveryKey(record)
        if (latest === null || readSeen([record]).has(latest)) return []
        const cacheKey = identity(record)
        const cached = historyCache.get(cacheKey)
        if (cached?.latest === latest) return cached.records
        let result
        try {
          result = await ctx.remote.schedule.history({ sessionId: record.sessionId, id: record.id, limit: 10 })
        } catch {
          return []
        }
        if (!result?.ok || !Array.isArray(result.value?.records)) return []
        const records = result.value.records
        historyCache.set(cacheKey, { latest, records })
        return records
      }

      const loadUnreadHistories = async (records, current) => {
        const historyByTask = new Map()
        const candidates = records.filter(record => {
          const latest = deliveryKey(record)
          return latest !== null && !readSeen([record]).has(latest)
        })
        // Ten distinct unread tasks already guarantee a 9+ badge; no history reads can change that UI result.
        if (candidates.length >= 10) return historyByTask
        let cursor = 0
        const worker = async () => {
          while (cursor < candidates.length) {
            const record = candidates[cursor++]
            const history = await loadUnreadHistory(record)
            if (current !== epoch) return
            if (history.length > 0) historyByTask.set(identity(record), history)
          }
        }
        await Promise.all(Array.from({ length: Math.min(4, candidates.length) }, worker))
        return historyByTask
      }

      const refresh = async () => {
        const current = ++epoch
        publish({ ...snapshot, status: 'loading' })
        let result
        try { result = await ctx.remote.schedule.catalog() } catch { if (current === epoch) publish({ ...snapshot, status: 'error' }); return }
        if (current !== epoch) return
        if (!result?.ok) { publish({ ...snapshot, status: 'error' }); return }
        const records = result.value ?? []
        processAttention(records)
        const historyByTask = await loadUnreadHistories(records, current)
        if (current !== epoch) return
        publish({ records, historyByTask, status: 'ready', settled: true })
      }
      const invalidate = () => { void refresh() }
      return {
        getSnapshot: () => snapshot,
        refresh,
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

    function SessionActivityMark({ sessionId, useCatalog, usePanelInfo, useSessions, t }) {
      const catalog = useCatalog(current => current)
      useObservable(seenSource)
      const activePanelId = usePanelInfo(info => info.activePanelId)
      const mainSessionId = useSessions(state => Object.values(state.byId)
        .find(record => (record.retainedBy.mainView ?? 0) > 0)?.id)
      const signature = catalog.records.map(record => [identity(record), record.status, deliveryMarker(record) ?? ''].join('@')).join('|')
      const conversationVisible = activePanelId === null && mainSessionId === sessionId

      React.useEffect(() => {
        if (catalog.status !== 'ready' || !conversationVisible) return
        markSessionSeen(catalog.records, sessionId)
      }, [catalog.status, conversationVisible, sessionId, signature])

      if (catalog.status !== 'ready') return null
      if (sessionHasUnread(catalog.records, sessionId)) {
        return h('span', {
          className: 'sat_sessionMark',
          title: t('sessionUnread'),
          onClick: event => { event.stopPropagation() },
        }, h('span', {
          className: 'sat_sessionUnreadDot',
          role: 'img',
          'aria-label': t('sessionUnread'),
        }))
      }
      const hasActive = catalog.records.some(record => record.sessionId === sessionId && record.status === 'active')
      return hasActive
        ? h('span', { className: 'sat_sessionMark', onClick: event => { event.stopPropagation() } },
          h(ClockGlyph, { size: 12, tone: 'normal' }))
        : null
    }

    function AttentionIcon({ size, active, useCatalog, usePreferences, t }) {
      const catalog = useCatalog(current => current)
      const preferences = usePreferences(current => current)
      useObservable(seenSource)
      const [now, setNow] = React.useState(() => Date.now())
      const signature = catalog.records.map(record => [identity(record), record.status, record.scheduledAt, deliveryMarker(record) ?? ''].join('@')).join('|')
      React.useEffect(() => {
        const justActivated = active && !panelWasActive
        panelWasActive = active
        if (catalog.status !== 'ready' || !justActivated) return
        markAllSeen(catalog.records)
      }, [active, catalog.status, signature])
      React.useEffect(() => {
        if (!catalog.records.some(record => record.status === 'active')) return
        const timer = window.setTimeout(() => setNow(Date.now()), 60000)
        return () => window.clearTimeout(timer)
      }, [signature, now])
      const state = summary(catalog.records, now, preferences, catalog.historyByTask)
      const tone = state.overdue > 0 ? 'warning' : state.unread > 0 ? 'new' : 'normal'
      const label = state.overdue > 0 ? t('overdue', { count: state.overdue }) : state.unread > 0 ? t('unread', { count: state.unread }) : t('panel')
      const badge = state.unread > 0 ? (state.unread > 9 ? '9+' : String(state.unread)) : state.overdue > 0 ? '!' : null
      return h('span', { className: 'sat_panelIcon', title: label, style: { width: size ?? 16, height: size ?? 16 } },
        h(ClockGlyph, { size: size ?? 16, tone }),
        badge === null ? null : h('span', {
          className: 'sat_panelBadge' + (state.unread === 0 && state.overdue > 0 ? ' sat_panelBadgeWarn' : ''),
          'aria-hidden': true,
        }, badge))
    }


    function OpenGlyph({ size = 16 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 20 20', fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M8 5h7v7M15 5 7 13M12 15H5V8', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }))
    }

    function TrashGlyph({ size = 16 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 20 20', fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M5.5 6.5h9M8 6.5V5h4v1.5M7 8.5v5M10 8.5v5M13 8.5v5M6.5 6.5l.6 9h5.8l.6-9', stroke: 'currentColor', strokeWidth: 1.35, strokeLinecap: 'round', strokeLinejoin: 'round' }))
    }

    function DetailGlyph({ size = 16 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 20 20', fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M7.5 5.5 12 10l-4.5 4.5', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }))
    }

    function quickTime(record) {
      if (record.kind === 'daily' || record.kind === 'weekly') return String(record.time ?? '').slice(0, 5)
      return ''
    }

    function quickInterval(seconds) {
      if (!Number.isFinite(seconds)) return ''
      if (seconds % 3600 === 0) return (seconds / 3600) + 'h'
      if (seconds % 60 === 0) return (seconds / 60) + 'm'
      return seconds + 's'
    }

    function quickFrequency(record, t) {
      if (record.kind === 'at' || record.kind === 'after') return t('taskOnce')
      if (record.kind === 'every') return t('taskEvery', { value: quickInterval(record.everySeconds) })
      if (record.kind === 'daily') return t('taskDaily', { time: quickTime(record) })
      if (record.kind === 'weekly') return t('taskWeekly', { time: quickTime(record) })
      return t('taskCron')
    }

    function quickNext(record, locale) {
      const date = new Date(record.scheduledAt)
      if (!Number.isFinite(date.getTime())) return record.scheduledAt
      try {
        return new Intl.DateTimeFormat(locale || undefined, {
          month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
        }).format(date)
      } catch {
        return date.toLocaleString()
      }
    }

    function QuickTaskManagerPage({ useCatalog, onNewTask, onOpenSession, onOpenDetails, onDelete, t }) {
      const catalog = useCatalog(current => current)
      const [search, setSearch] = React.useState('')
      const [filter, setFilter] = React.useState('all')
      const [confirmId, setConfirmId] = React.useState(null)
      const [deletingId, setDeletingId] = React.useState(null)
      const [notice, setNotice] = React.useState('')
      const query = search.trim().toLowerCase()
      const rows = catalog.records
        .filter(record => (filter === 'all' || record.status === filter)
          && (query === '' || taskTitle(record).toLowerCase().includes(query)
            || record.prompt.toLowerCase().includes(query)
            || record.sessionId.toLowerCase().includes(query)))
        .slice()
        .sort((a, b) => Date.parse(a.scheduledAt) - Date.parse(b.scheduledAt))

      const performDelete = async (record) => {
        setDeletingId(record.id)
        setNotice('')
        let ok = false
        try { ok = await onDelete(record) } catch {}
        setDeletingId(null)
        setConfirmId(null)
        setNotice(ok ? t('taskDeleted') : t('taskDeleteFailed'))
      }

      return h(React.Fragment, null,
        h('style', { key: 'schedule-attention-quick-page-style' }, pluginCss),
        h('section', { className: 'sat_taskPage', 'aria-label': t('panel') },
          h('div', { className: 'sat_taskContent' },
            h('div', { className: 'sat_taskHeading' },
              h('h1', null, t('panel')),
              h('button', { type: 'button', className: 'sat_taskNew', onClick: onNewTask }, '+ ', t('taskNew'))),
            h('div', { className: 'sat_taskTabs', role: 'group', 'aria-label': t('panel') },
              [['all','taskAll'],['active','taskEnabled'],['inactive','taskInactive']].map(([value,key]) =>
                h('button', {
                  key: value, type: 'button',
                  className: 'sat_taskTab' + (filter === value ? ' sat_taskTabActive' : ''),
                  'aria-pressed': filter === value,
                  onClick: () => setFilter(value),
                }, t(key)))),
            h('div', { className: 'sat_taskSearch' },
              h('span', { 'aria-hidden': true, className: 'sat_taskSearchGlyph' }, '⌕'),
              h('input', {
                type: 'search', value: search, placeholder: t('taskSearch'), 'aria-label': t('taskSearch'),
                onChange: event => setSearch(event.target.value),
              })),
            notice ? h('div', { className: 'sat_taskNotice', role: 'status' }, notice) : null,
            catalog.status === 'error'
              ? h('div', { className: 'sat_taskEmpty', role: 'status' }, t('taskDeleteFailed'))
              : catalog.status === 'ready' && rows.length === 0
                ? h('div', { className: 'sat_taskEmpty', role: 'status' }, query === '' ? t('taskEmpty') : t('taskNoMatches'))
                : null,
            h('ul', { className: 'sat_taskList', 'aria-busy': catalog.status === 'loading' },
              rows.map(record => {
                const confirming = confirmId === record.id
                const deleting = deletingId === record.id
                return h('li', { key: record.id, className: 'sat_taskRowWrap' },
                  h('button', {
                    type: 'button',
                    className: 'sat_taskRow' + (record.status === 'inactive' ? ' sat_taskRowInactive' : ''),
                    'aria-label': t('taskOpenDetails') + ': ' + taskTitle(record),
                    onClick: () => onOpenDetails(record),
                  },
                    h('span', { className: 'sat_taskRowGlyph' }, h(ClockGlyph, { size: 16 })),
                    h('span', { className: 'sat_taskRowContent' },
                      h('span', { className: 'sat_taskRowTitle' }, taskTitle(record)),
                      h('span', { className: 'sat_taskRowSummary' },
                        record.status === 'inactive' ? h('span', null, t('taskInactive'), ' · ') : null,
                        h('span', null, quickFrequency(record, t)),
                        record.status === 'active'
                          ? h('span', null, ' · ', t('taskNext', { time: quickNext(record) }))
                          : null))),
                  h('div', { className: 'sat_taskActions' },
                    confirming
                      ? h(React.Fragment, null,
                          h('span', { className: 'sat_taskConfirmLabel' }, t('taskDeleteConfirm')),
                          h('button', {
                            type: 'button', className: 'sat_taskConfirmCancel',
                            onClick: () => setConfirmId(null),
                          }, t('taskCancel')),
                          h('button', {
                            type: 'button', className: 'sat_taskConfirmDelete', disabled: deleting,
                            onClick: () => { void performDelete(record) },
                          }, deleting ? t('taskDeleting') : t('taskDelete')))
                      : h(React.Fragment, null,
                          h('button', {
                            type: 'button', className: 'sat_taskIconAction',
                            title: t('taskOpenSession'), 'aria-label': t('taskOpenSession'),
                            onClick: () => onOpenSession(record),
                          }, h(OpenGlyph, { size: 15 })),
                          h('button', {
                            type: 'button', className: 'sat_taskIconAction',
                            title: t('taskOpenDetails'), 'aria-label': t('taskOpenDetails'),
                            onClick: () => onOpenDetails(record),
                          }, h(DetailGlyph, { size: 15 })),
                          h('button', {
                            type: 'button', className: 'sat_taskIconAction sat_taskDeleteAction',
                            title: t('taskDelete'), 'aria-label': t('taskDelete'),
                            onClick: () => setConfirmId(record.id),
                          }, h(TrashGlyph, { size: 15 })))))
              })))) )
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
      return h(React.Fragment, null,
        h('style', { key: 'schedule-attention-settings-style' }, pluginCss),
        h('section', { className: 'sat_settings', 'aria-label': t('settingsTitle') },
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
        h('p', { className: 'sat_settingsFootnote' }, t('settingsBrowserLocal'))))
    }

    const pluginCss = `
      .sat_taskPage{width:100%;height:100%;overflow:auto;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-size:14px;line-height:1.6}
      .sat_taskContent{max-width:960px;margin:0 auto;padding:28px clamp(24px,4vw,48px) 48px}
      .sat_taskHeading{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:24px}
      .sat_taskHeading h1{margin:0;font-size:20px;line-height:28px;font-weight:500}
      .sat_taskNew{height:32px;padding:0 12px;border:0;border-radius:16px;corner-shape:round;background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-button-primary-text);font:inherit;font-size:13px;cursor:pointer}
      .sat_taskTabs{display:flex;gap:12px;margin-bottom:14px}
      .sat_taskTab{height:28px;padding:0 10px;border:0;border-radius:14px;corner-shape:round;background:transparent;color:var(--dsw-alias-label-tertiary);font:inherit;cursor:pointer}
      .sat_taskTab:hover,.sat_taskTabActive{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
      .sat_taskSearch{display:flex;align-items:center;height:36px;margin-bottom:16px;padding:0 10px;border:.5px solid var(--dsw-alias-border-l3);border-radius:12px;color:var(--dsw-alias-label-tertiary)}
      .sat_taskSearch:focus-within{border-color:var(--dsw-alias-state-business-primary)}
      .sat_taskSearchGlyph{flex:none;width:18px;font-size:15px}
      .sat_taskSearch input{flex:1;min-width:0;height:100%;border:0;outline:0;background:transparent;color:var(--dsw-alias-label-primary);font:inherit}
      .sat_taskSearch input::placeholder{color:var(--dsw-alias-label-caption)}
      .sat_taskList{display:flex;flex-direction:column;gap:2px;margin:0;padding:0;list-style:none}
      .sat_taskRowWrap{position:relative;display:flex;align-items:stretch;min-width:0;border-radius:12px}
      .sat_taskRowWrap:hover,.sat_taskRowWrap:focus-within{background:var(--dsw-alias-interactive-bg-hover)}
      .sat_taskRow{display:flex;align-items:flex-start;gap:12px;flex:1;min-width:0;padding:8px;border:0;border-radius:12px;background:transparent;color:inherit;text-align:left;font:inherit;cursor:pointer}
      .sat_taskRowGlyph{flex:none;width:16px;height:20px;margin-top:2px;color:var(--dsw-alias-label-tertiary)}
      .sat_taskRowContent{display:flex;flex:1;flex-direction:column;min-width:0}
      .sat_taskRowTitle{overflow:hidden;font-weight:500;line-height:23px;text-overflow:ellipsis;white-space:nowrap}
      .sat_taskRowSummary{margin-top:2px;color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:21px;overflow-wrap:anywhere}
      .sat_taskRowInactive .sat_taskRowTitle{color:var(--dsw-alias-label-tertiary)}
      .sat_taskRowInactive .sat_taskRowSummary{color:var(--dsw-alias-label-caption)}
      .sat_taskActions{display:flex;flex:none;align-items:center;gap:4px;padding:7px 8px 7px 4px}
      .sat_taskIconAction{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-tertiary);cursor:pointer}
      .sat_taskIconAction:hover{background:var(--dsw-alias-button-ghost-hover-fill);color:var(--dsw-alias-label-primary)}
      .sat_taskDeleteAction:hover{color:var(--dsw-alias-state-error-primary)}
      .sat_taskConfirmLabel{margin-right:2px;color:var(--dsw-alias-label-secondary);font-size:12px;white-space:nowrap}
      .sat_taskConfirmCancel,.sat_taskConfirmDelete{height:28px;padding:0 8px;border:.5px solid var(--dsw-alias-border-l3);border-radius:8px;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;cursor:pointer}
      .sat_taskConfirmDelete{border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 45%,transparent);color:var(--dsw-alias-state-error-primary)}
      .sat_taskConfirmCancel:hover,.sat_taskConfirmDelete:hover{background:var(--dsw-alias-button-ghost-hover-fill)}
      .sat_taskConfirmDelete:disabled{opacity:.5;cursor:default}
      .sat_taskEmpty{padding:48px 20px;text-align:center;color:var(--dsw-alias-label-tertiary)}
      .sat_taskNotice{margin-bottom:10px;color:var(--dsw-alias-label-secondary);font-size:12px}
      .sat_taskIconAction:focus-visible,.sat_taskRow:focus-visible,.sat_taskNew:focus-visible,.sat_taskTab:focus-visible,.sat_taskConfirmCancel:focus-visible,.sat_taskConfirmDelete:focus-visible{outline:var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:2px}
      .sat_panelIcon{position:relative;display:inline-flex;align-items:center;justify-content:center;width:var(--sat-icon-size,16px);height:var(--sat-icon-size,16px);overflow:visible}
      .sat_sessionMark{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px}
      .sat_sessionUnreadDot{position:relative;display:inline-block;flex:none;width:10px;height:10px}
      .sat_sessionUnreadDot::after{content:'';position:absolute;inset:20%;border-radius:50%;corner-shape:round;background:var(--dsw-alias-state-success-primary)}
      .sat_panelBadge{position:absolute;top:-4px;right:-6px;min-width:12px;height:12px;padding:0 3px;box-sizing:border-box;border:.5px solid var(--dsw-alias-border-l3);border-radius:999px;corner-shape:round;background:var(--dsw-alias-button-ghost-active-fill);color:var(--dsw-alias-label-primary);font-size:8px;line-height:11px;font-weight:700;text-align:center;font-variant-numeric:tabular-nums;box-shadow:0 0 0 1px var(--dsw-alias-bg-layer-1);pointer-events:none}
      .sat_panelBadgeWarn{border-color:transparent;background:var(--dsw-alias-state-warn-primary);color:var(--dsw-alias-label-primary-foreground)}
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
          scope.inject(['sidebarRight'], (rightScope) => {
            rightScope.slots.inject('main', () => rightScope.slots.register({
              name: 'main', key: PANEL_ID, priority: -100, locale: NS,
              inject: () => ({
                hooks: { catalog },
                onNewTask: () => { rightScope.uiWorkspace.startSession() },
                onOpenSession: record => {
                  markSessionRecordSeen(record)
                  rightScope.uiWorkspace.openSession(record.sessionId)
                },
                onOpenDetails: record => {
                  markSessionRecordSeen(record)
                  rightScope.uiWorkspace.openSession(record.sessionId)
                  window.setTimeout(() => {
                    rightScope.sidebarRight.openTab('scheduleTask', { params: { sessionId: record.sessionId, id: record.id } })
                  }, 0)
                },
                onDelete: async record => {
                  let result
                  try { result = await rightScope.remote.schedule.delete({ sessionId: record.sessionId, id: record.id }) }
                  catch { return false }
                  await catalog.refresh()
                  return result?.ok === true && (result.value?.deleted === true || result.value?.code === 'schedule_not_found')
                },
              }),
            }, QuickTaskManagerPage))
          })
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
                scope.uiWorkspace.openSession(record.sessionId)
              },
            }),
          }, DeliveryToast))
        })
      },
    }
  },
})

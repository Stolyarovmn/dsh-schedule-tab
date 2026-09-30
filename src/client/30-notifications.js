		let seenRevision = 0;
		const seenRevisionListeners = new Set();
		const seenRevisionSource = {
			getSnapshot: () => seenRevision,
			subscribe(listener) {
				seenRevisionListeners.add(listener);
				return () => { seenRevisionListeners.delete(listener); };
			}
		};
		function bumpSeenRevision() {
			seenRevision += 1;
			for (const listener of [...seenRevisionListeners]) listener();
		}
		function taskSeenKey(record) { return "task:" + identity(record); }
		function deliveryMarker(record) {
			const delivery = record.lastDelivery;
			if (!delivery) return null;
			return delivery.messageId ?? delivery.deliveredAt ?? delivery.scheduledAt ?? null;
		}
		function deliverySeenKey(record) {
			const marker = deliveryMarker(record);
			return marker === null ? null : "delivery:" + identity(record) + ":" + marker;
		}
		const DELIVERY_NOTIFIED_STORAGE_KEY = PACKAGE + "/delivery-notified-v1";
		function readNotified() {
			try {
				const raw = window.localStorage?.getItem?.(DELIVERY_NOTIFIED_STORAGE_KEY);
				const parsed = raw == null ? [] : JSON.parse(raw);
				return new Set(Array.isArray(parsed) ? parsed.filter((value) => typeof value === "string").slice(-MAX_SEEN_IDS) : []);
			} catch { return new Set(); }
		}
		function writeNotified(notified) {
			try { window.localStorage?.setItem?.(DELIVERY_NOTIFIED_STORAGE_KEY, JSON.stringify([...notified].slice(-MAX_SEEN_IDS))); } catch {}
		}
		function isDeliveryNotified(record) {
			const delivery = deliverySeenKey(record);
			return delivery !== null && readNotified().has(delivery);
		}
		function markDeliveryNotified(record) {
			const delivery = deliverySeenKey(record);
			if (delivery === null) return false;
			const notified = readNotified();
			if (notified.has(delivery)) return false;
			notified.add(delivery);
			writeNotified(notified);
			return true;
		}
		function ensureDeliveryAttentionBaseline(records) {
			// Force seen-v2 initialization before any future delivery can become "new".
			readSeen(records);
			try {
				const raw = window.localStorage?.getItem?.(DELIVERY_NOTIFIED_STORAGE_KEY);
				if (raw !== null && raw !== undefined) return;
			} catch { return; }
			const baseline = new Set();
			for (const record of records) {
				const delivery = deliverySeenKey(record);
				if (delivery) baseline.add(delivery);
			}
			writeNotified(baseline);
		}
		function startDeliveryAttentionBaseline(source) {
			let settled = false;
			const inspect = () => {
				if (settled) return;
				const state = source.getSnapshot();
				if (state.status !== "ready") return;
				ensureDeliveryAttentionBaseline(state.records);
				settled = true;
			};
			const unsubscribe = source.subscribe(inspect);
			inspect();
			return unsubscribe;
		}
		function writeSeen(seen) {
			try { window.localStorage?.setItem?.(SEEN_STORAGE_KEY, JSON.stringify([...seen].slice(-MAX_SEEN_IDS))); } catch {}
		}
		function readSeen(records = []) {
			try {
				const currentRaw = window.localStorage?.getItem?.(SEEN_STORAGE_KEY);
				if (currentRaw !== null && currentRaw !== undefined) {
					const current = JSON.parse(currentRaw);
					if (Array.isArray(current)) return new Set(current.filter((x) => typeof x === "string").slice(-MAX_SEEN_IDS));
				}
				const legacyRaw = window.localStorage?.getItem?.(LEGACY_SEEN_STORAGE_KEY);
				if (legacyRaw !== null && legacyRaw !== undefined) {
					const legacy = JSON.parse(legacyRaw);
					const legacyIds = new Set(Array.isArray(legacy) ? legacy.filter((x) => typeof x === "string") : []);
					const migrated = new Set([...legacyIds].map((id) => "task:" + id));
					for (const record of records) {
						if (!legacyIds.has(identity(record))) continue;
						const delivery = deliverySeenKey(record);
						if (delivery) migrated.add(delivery);
					}
					writeSeen(migrated);
					return migrated;
				}
				const baseline = new Set();
				for (const record of records) {
					if (record.status === "active") baseline.add(taskSeenKey(record));
					const delivery = deliverySeenKey(record);
					if (delivery) baseline.add(delivery);
				}
				writeSeen(baseline);
				return baseline;
			} catch { return new Set(); }
		}
		function commitSeen(seen) {
			writeSeen(seen);
			bumpSeenRevision();
		}
		function markTasksSeen(records) {
			const seen = readSeen(records); let changed = false;
			for (const record of records) {
				if (record.status !== "active") continue;
				const task = taskSeenKey(record);
				if (!seen.has(task)) { seen.add(task); changed = true; }
			}
			if (changed) commitSeen(seen);
			return changed;
		}
		function markRecordSeen(record) {
			const seen = readSeen([record]); let changed = false;
			if (record.status === "active") {
				const task = taskSeenKey(record);
				if (!seen.has(task)) { seen.add(task); changed = true; }
			}
			const delivery = deliverySeenKey(record);
			if (delivery && !seen.has(delivery)) { seen.add(delivery); changed = true; }
			if (changed) commitSeen(seen);
			markDeliveryNotified(record);
			return changed;
		}
		function isDeliveryUnread(record) {
			const delivery = deliverySeenKey(record);
			return delivery !== null && !readSeen([record]).has(delivery);
		}
		function taskAttentionState(record, now) {
			if (record.status === "active" && isOverdue(record, now)) return "warning";
			if (isDeliveryUnread(record)) return "new";
			return null;
		}
		function notificationSummary(records, now) {
			const seen = readSeen(records);
			let total = 0, unread = 0, unreadTasks = 0, unreadDeliveries = 0, unreadOverdue = 0, overdue = 0, recurring = 0;
			for (const record of records) {
				const active = record.status === "active";
				const over = active && isOverdue(record, now);
				if (active) {
					total += 1;
					if (over) overdue += 1;
					if (isRecurring(record)) recurring += 1;
				}
				const delivery = deliverySeenKey(record);
				if (delivery && !seen.has(delivery)) {
					unread += 1; unreadDeliveries += 1; if (over) unreadOverdue += 1;
					continue;
				}
				if (active && !seen.has(taskSeenKey(record))) {
					unread += 1; unreadTasks += 1; if (over) unreadOverdue += 1;
				}
			}
			return { total, unread, unreadTasks, unreadDeliveries, unreadOverdue, overdue, recurring };
		}
		function notificationSignature(records) {
			return records.map((record) => [identity(record), record.status, record.scheduledAt, deliveryMarker(record) ?? ""].join("@")).sort().join("|");
		}

		let cancelPendingTaskOpen = null;
		function selectNativeTaskDetailTab(tab) {
			if (tab !== "records" || typeof document === "undefined") return;
			let stableSelected = 0;
			let attempts = 0;
			const timer = window.setInterval(() => {
				attempts += 1;
				const candidates = [...document.querySelectorAll('[data-detail-tab="records"]')];
				const button = candidates.find((node) => node.closest('[data-sidebar-right-session]')) ?? candidates[0];
				if (!button) {
					if (attempts >= 40) window.clearInterval(timer);
					return;
				}
				if (button.getAttribute("aria-selected") === "true") {
					stableSelected += 1;
					if (stableSelected >= 2 || attempts >= 40) window.clearInterval(timer);
					return;
				}
				stableSelected = 0;
				button.click();
				if (attempts >= 40) window.clearInterval(timer);
			}, 50);
		}
		function openNativeTask(record, tab = "rule") {
			cancelPendingTaskOpen?.();
			cancelPendingTaskOpen = null;
			const open = () => {
				hostCtx.sidebarRight.openTab(TASK_KIND, { params: { sessionId: record.sessionId, id: record.id } });
				selectNativeTaskDetailTab(tab);
			};
			// A scheduleTask page can show a task whose source Session differs from the
			// Session that owns the currently mounted right Sidebar. Prefer that public
			// navigation path so Automation tasks stays visible in the main panel.
			if (hostCtx.sidebarRight.mounted.getSnapshot() !== undefined && hostCtx.sidebarRight.mounted.getSnapshot() !== null) {
				open();
				return true;
			}
			// Without any mounted right-Sidebar Session there is nowhere to host the
			// native page. Fall back to revealing the task's source Session, then open it.
			const mounted = hostCtx.sidebarRight.mounted;
			let finished = false;
			let unsubscribe = () => {};
			const timer = window.setTimeout(() => {
				if (finished) return;
				finished = true;
				unsubscribe();
				cancelPendingTaskOpen = null;
			}, 5000);
			const cleanup = () => {
				if (finished) return;
				finished = true;
				window.clearTimeout(timer);
				unsubscribe();
				cancelPendingTaskOpen = null;
			};
			const reveal = () => {
				if (mounted.getSnapshot() !== record.sessionId || finished) return;
				cleanup();
				queueMicrotask(open);
			};
			unsubscribe = mounted.subscribe(reveal);
			cancelPendingTaskOpen = cleanup;
			hostCtx.uiWorkspace.openSession(record.sessionId);
			reveal();
			return true;
		}
		function cssEscape(value) {
			const slash = String.fromCharCode(92);
			const quote = String.fromCharCode(34);
			return String(value).split(slash).join(slash + slash).split(quote).join(slash + quote);
		}
		function syncSessionOverdueStyles(records, now) {
			if (typeof document === "undefined") return;
			const overdueSessions = new Set();
			for (const record of records) {
				if (record.status === "active" && isOverdue(record, now)) overdueSessions.add(record.sessionId);
			}
			const id = PACKAGE + "/session-marks.css";
			let style = document.querySelector('style[data-plugin-css="' + id + '"]');
			if (!style) { style = document.createElement("style"); style.dataset.plugin = PACKAGE; style.dataset.pluginCss = id; document.head.appendChild(style); }
			style.textContent = [...overdueSessions].map((sessionId) =>
				'[data-row-key="session:' + cssEscape(sessionId) + '"] [data-session-schedule-mark]{color:var(--dsw-alias-state-warn-primary) !important}'
			).join("");
		}


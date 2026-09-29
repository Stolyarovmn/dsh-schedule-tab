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
		function writeSeen(seen) {
			try { window.localStorage?.setItem?.(SEEN_STORAGE_KEY, JSON.stringify([...seen].slice(-MAX_SEEN_IDS))); } catch {}
		}
		function readSeen(records = []) {
			try {
				const current = JSON.parse(window.localStorage?.getItem?.(SEEN_STORAGE_KEY) ?? "null");
				if (Array.isArray(current)) return new Set(current.filter((x) => typeof x === "string").slice(-MAX_SEEN_IDS));
				const legacy = JSON.parse(window.localStorage?.getItem?.(LEGACY_SEEN_STORAGE_KEY) ?? "[]");
				const legacyIds = new Set(Array.isArray(legacy) ? legacy.filter((x) => typeof x === "string") : []);
				const migrated = new Set([...legacyIds].map((id) => "task:" + id));
				for (const record of records) {
					if (!legacyIds.has(identity(record))) continue;
					const delivery = deliverySeenKey(record);
					if (delivery) migrated.add(delivery);
				}
				writeSeen(migrated);
				return migrated;
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
		function openNativeTask(record) {
			cancelPendingTaskOpen?.();
			cancelPendingTaskOpen = null;
			const mounted = hostCtx.sidebarRight.mounted;
			const open = () => hostCtx.sidebarRight.openTab(TASK_KIND, { params: { sessionId: record.sessionId, id: record.id } });
			if (mounted.getSnapshot() === record.sessionId) {
				hostCtx.uiWorkspace.openSession(record.sessionId);
				queueMicrotask(open);
				return true;
			}
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


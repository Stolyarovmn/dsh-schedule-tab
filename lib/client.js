window.__ModuleLoader__.load({
	id: "@stolyarovmn/dsh-client-ui-schedule-tab",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		const react = require("react");
		const jsx = require("react/jsx-runtime");
		const primitives = require("@deepseek-ai/dsh-client-ui-primitives");

		const PACKAGE = "@stolyarovmn/dsh-client-ui-schedule-tab";
		const PANEL_ID = "schedules";
		const NS = "schedule-control-center";
		const SEEN_STORAGE_KEY = PACKAGE + "/seen-v2";
		const LEGACY_SEEN_STORAGE_KEY = PACKAGE + "/seen-v1";
		const MAX_SEEN_IDS = 4000;
		const ClockIcon = primitives.IconAlarmClockOutlineRegular
			?? primitives.IconClockOutlineRegular
			?? primitives.IconClockOutline16
			?? primitives.IconAlarmClockOutline16
			?? null;
		const EditIcon = primitives.IconEditOutlineRegular;
		const HistoryIcon = primitives.IconFlatListOutlineRegular ?? primitives.IconListPenOutlineRegular ?? primitives.IconClockOutlineRegular;
		const TrashIcon = primitives.IconTrashOutlineRegular;
		const PlusIcon = primitives.IconPlusOutlineRegular;
		const SearchIcon = primitives.IconSearchOutlineRegular;
		const WarningIcon = primitives.IconWarningOutlineRegular;
		const CloseIcon = primitives.IconCloseOutlineRegular;

		const css = [
			".scc_root{height:100%;box-sizing:border-box;display:flex;flex-direction:column;background:var(--dsw-specific-page,transparent);color:var(--dsw-alias-label-primary);font-size:14px}",
			".scc_header{flex:none;display:flex;align-items:center;gap:10px;padding:16px 20px 10px}",
			".scc_title{font-size:16px;font-weight:600;line-height:24px}",
			".scc_count{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:16px}",
			".scc_spacer{flex:1}",
			".scc_toolbar{flex:none;padding:0 12px 10px;border-bottom:0.5px solid var(--dsw-alias-border-l1);display:flex;flex-direction:column;gap:8px}",
			".scc_toolbarRow{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}",
			".scc_searchNative{width:100%}",
			".scc_filters,.scc_grouping,.scc_actions{display:flex;align-items:center;gap:6px;flex-wrap:wrap}",
			".scc_actions{min-height:30px}",
			".scc_groupLabel{color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px;margin-right:2px}",
			".scc_chip,.scc_action{border:0.5px solid var(--dsw-alias-border-l1);border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;line-height:18px;padding:3px 9px;cursor:pointer;outline:none}",
			".scc_chipCount{margin-left:5px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums}",
			".scc_chipActive .scc_chipCount{color:inherit}",
			".scc_action{border-radius:7px;padding:4px 8px}",
			".scc_iconButton{width:28px!important;min-width:28px!important;height:28px!important;padding:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important}",
			".scc_iconButtonActive{background:var(--dsw-alias-interactive-bg-selected,var(--dsw-alias-interactive-bg-hover,transparent))!important;color:var(--dsw-alias-interactive-primary)!important}",
			".scc_iconButtonDanger{color:var(--dsw-alias-state-danger-label,var(--dsw-alias-state-warn-label))!important}",
			".scc_iconButtonDanger:hover{background:var(--dsw-alias-state-danger-tertiary,var(--dsw-alias-state-warn-tertiary))!important}",
			".scc_confirmTask{margin:0;font-size:14px;font-weight:600;color:var(--dsw-alias-label-primary);overflow-wrap:anywhere}",
			".scc_chip:hover,.scc_action:hover{background:var(--dsw-alias-interactive-bg-hover,transparent)}",
			".scc_chip:focus-visible,.scc_action:focus-visible{border-color:var(--dsw-alias-focus-primary,var(--dsw-alias-interactive-primary))}",
			".scc_chipActive{border-color:var(--dsw-alias-interactive-primary);color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-selected,var(--dsw-alias-interactive-bg-hover,transparent))}",
			".scc_action:disabled{opacity:.45;cursor:default}",
			".scc_banner{margin:8px 12px 0;padding:8px 10px;border:0.5px solid var(--dsw-alias-state-warn-primary);border-radius:9px;color:var(--dsw-alias-state-warn-label);background:var(--dsw-alias-state-warn-tertiary);display:flex;align-items:center;gap:8px;font-size:12px}",
			".scc_body{flex:1;min-height:0;display:flex}",
			".scc_list{flex:1;overflow:auto;margin:0;padding:8px;display:flex;flex-direction:column;gap:12px;--dsh-scrollbar-thumb:var(--dsh-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsh-alias-scrollbar-hover-l2)}",
			".scc_group{display:flex;flex-direction:column;gap:6px}",
			".scc_groupHeader{display:flex;align-items:center;gap:7px;padding:1px 5px;color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:600;line-height:18px}",
			".scc_groupCount{color:var(--dsw-alias-label-tertiary);font-weight:400}",
			".scc_groupList{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:6px}",
			".scc_row{box-sizing:border-box;border:0.5px solid var(--dsw-alias-border-l1);border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:8px;flex:none;cursor:default}",
			".scc_rowMain{display:flex;flex-direction:column;gap:8px;cursor:pointer;outline:none}",
			".scc_row:hover{border-color:var(--dsw-alias-border-l2);background:var(--dsw-alias-interactive-bg-hover,transparent)}",
			".scc_rowMain:focus-visible{outline:2px solid var(--dsw-alias-focus-primary,var(--dsw-alias-interactive-primary));outline-offset:2px;border-radius:8px}",
			".scc_rowOverdue{border-color:var(--dsw-alias-state-warn-primary);background:var(--dsw-alias-state-warn-tertiary)}",
			".scc_rowInactive{opacity:.8}",
			".scc_rowTitle{font-size:14px;font-weight:600;line-height:20px;overflow-wrap:anywhere}",
			".scc_rowTitleLine{display:flex;align-items:center;gap:8px;min-width:0}",
			".scc_rowTitleLine .scc_rowTitle{min-width:0;flex:0 1 auto}",
			".scc_attentionDot{display:inline-block;width:8px;height:8px;min-width:8px;border-radius:50%;background:var(--dsw-alias-state-business-primary);box-shadow:0 0 0 2px var(--dsw-specific-page,var(--dsw-alias-bg-base,#111))}",
			".scc_attentionDotWarn{background:var(--dsw-alias-state-warn-primary)}",
			".scc_prompt{font-size:13px;line-height:19px;color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;white-space:pre-wrap}",
			".scc_badges{display:flex;align-items:center;gap:6px;flex-wrap:wrap}",
			".scc_badge{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:2px 7px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary);background:var(--dsw-alias-interactive-bg-hover,transparent)}",
			".scc_badgeRecurring{color:var(--dsw-alias-state-business-label,var(--dsw-alias-label-secondary));border:0.5px solid var(--dsw-alias-state-business-primary);background:var(--dsw-alias-state-business-tertiary,var(--dsw-alias-interactive-bg-hover,transparent))}",
			".scc_badgeWarn{color:var(--dsw-alias-state-warn-label);background:var(--dsw-alias-state-warn-tertiary)}",
			".scc_badgeInactive{color:var(--dsw-alias-label-tertiary);border:0.5px solid var(--dsw-alias-border-l1)}",
			".scc_meta,.scc_source{display:flex;align-items:center;gap:6px;flex-wrap:wrap;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:17px}",
			".scc_metaStrong{color:var(--dsw-alias-label-secondary);font-weight:500}",
			".scc_sep{color:var(--dsw-alias-label-dimmed)}",
			".scc_sourceName{color:var(--dsw-alias-label-primary);font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:520px}",
			".scc_empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:40px 24px;text-align:center}",
			".scc_emptyIcon{color:var(--dsw-alias-label-tertiary);display:inline-flex}",
			".scc_emptyTitle{font-size:14px;font-weight:600;color:var(--dsw-alias-label-secondary);line-height:20px}",
			".scc_emptyHint{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:18px;max-width:500px;overflow-wrap:anywhere}",
			".scc_sidebarGlyph{display:inline-flex;align-items:center;justify-content:center;color:var(--dsw-alias-label-tertiary);transition:color 120ms ease}",
			".scc_sidebarGlyph.scc_sidebarNew{color:var(--dsw-alias-state-business-primary)}",
			".scc_sidebarGlyph.scc_sidebarWarn{color:var(--dsw-alias-state-warn-primary)}",
			"button:has(.scc_sidebarGlyph[data-compact='false'][data-has-count='true']){position:relative;padding-right:68px}",
			".scc_sidebarCount{position:absolute;right:8px;top:50%;transform:translateY(-50%);min-width:50px;text-align:right;color:var(--dsw-alias-label-tertiary);font-size:12px;font-weight:500;line-height:18px;font-variant-numeric:tabular-nums;pointer-events:none}",
			".scc_sidebarCountNew{color:var(--dsw-alias-state-business-primary);font-weight:600}",
			".scc_sidebarCountWarn{color:var(--dsw-alias-state-warn-primary);font-weight:600}",
			".scc_sidebarCountSep{color:var(--dsw-alias-label-dimmed);font-weight:400;margin:0 1px}",
			".scc_sidebarDot{position:absolute;left:21px;top:6px;width:7px;height:7px;border-radius:50%;background:var(--dsw-alias-state-business-primary);box-shadow:0 0 0 2px var(--dsw-specific-sidebar,var(--dsw-specific-page,#111));pointer-events:none}",
			".scc_sidebarWarn .scc_sidebarDot{background:var(--dsw-alias-state-warn-primary)}",
			".scc_root{position:relative}",
			".scc_hasNativeDetail>.scc_header,.scc_hasNativeDetail>.scc_toolbar,.scc_hasNativeDetail>.scc_banner,.scc_hasNativeDetail>.scc_body{margin-right:min(560px,46vw)}",
			".scc_nativeDetailHost{position:absolute;top:0;right:0;bottom:0;width:min(560px,46vw);box-sizing:border-box;border-left:0.5px solid var(--dsw-alias-border-l1);background:var(--dsw-specific-page,var(--dsw-alias-bg-base,#111));z-index:2;overflow:hidden}",
			".scc_nativeDetailHost>[data-testid='task-manager-page']{display:flex!important;width:100%!important;height:100%!important;min-width:0!important;background:inherit!important}",
			".scc_nativeDetailHost>[data-testid='task-manager-page']>:first-child{display:none!important}",
			".scc_nativeDetailHost>[data-testid='task-manager-page']>aside{display:flex!important;flex:1 1 100%!important;width:100%!important;max-width:none!important;border-left:0!important}",

			".scc_selectedRow{border-color:var(--dsw-alias-interactive-primary);background:var(--dsw-alias-interactive-bg-selected,var(--dsw-alias-interactive-bg-hover,transparent))}",
			".scc_searchWrap{position:relative}",
			".scc_searchWrap .scc_searchNative{padding-right:38px}",
			".scc_searchClear{position:absolute!important;right:5px;top:50%;transform:translateY(-50%);width:28px!important;height:28px!important;min-width:28px!important;padding:0!important}",
			"@media(max-width:900px){.scc_hasNativeDetail>.scc_header,.scc_hasNativeDetail>.scc_toolbar,.scc_hasNativeDetail>.scc_banner,.scc_hasNativeDetail>.scc_body{margin-right:0}.scc_nativeDetailHost{width:100%;left:0}}",
			"@media(max-width:760px){.scc_header{padding-left:12px;padding-right:12px}}"
		].join("");

		const cssId = PACKAGE + "/client.css";
		if (typeof document !== "undefined" && document.querySelector('style[data-plugin-css="' + cssId + '"]') === null) {
			const style = document.createElement("style");
			style.dataset.plugin = PACKAGE;
			style.dataset.pluginCss = cssId;
			style.textContent = css;
			document.head.appendChild(style);
		}

		function identity(record) { return record.sessionId + ":" + record.id; }
		function isRecurring(record) { return record.kind === "every" || record.kind === "daily" || record.kind === "weekly" || record.kind === "cron"; }
		function isOverdue(record, now) { return record.status === "active" && Date.parse(record.scheduledAt) <= now; }
		function taskTitle(record) { return record.title || record.prompt || record.id; }
		function sessionTitle(sessionId, snapshot) {
			const title = snapshot?.byId?.[sessionId]?.title;
			return typeof title === "string" && title.trim() !== "" ? title : sessionId;
		}
		function sessionLinkState(sessionId, sessions, workspaces) {
			if (workspaces?.state === "error") return "unavailable";
			if (sessions?.phase === "pending" || workspaces?.phase === "pending") return "loading";
			if (Array.isArray(workspaces?.archivedSessionIds) && workspaces.archivedSessionIds.includes(sessionId)) return "archived";
			if (!Array.isArray(sessions?.ids) || !sessions.ids.includes(sessionId)) return "unavailable";
			return "available";
		}
		function scheduleKind(record, t) {
			return t("kind." + record.kind);
		}
		function pad2(value) { return String(value).padStart(2, "0"); }
		function formatTimeOnly(value) {
			if (typeof value !== "string") return "";
			let text = value.endsWith(".000") ? value.slice(0, -4) : value;
			if (text.endsWith(":00")) text = text.slice(0, -3);
			return text;
		}
		function formatWeekdays(values, locale) {
			if (!Array.isArray(values)) return "";
			const monday = Date.UTC(2026, 0, 5);
			return values.map((day) => new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" })
				.format(new Date(monday + (Number(day) - 1) * 86400000))).join(", ");
		}
		function preferredEvery(record, t) {
			const seconds = record.everySeconds;
			const candidates = [
				[3600, "unit.hour"],
				[60, "unit.minute"],
				[1, "unit.second"]
			];
			for (const [unitSeconds, key] of candidates) {
				if (seconds % unitSeconds !== 0) continue;
				const value = seconds / unitSeconds;
				return t("frequency.every", { value, unit: t(key + (value === 1 ? ".one" : ".other")) });
			}
			return t("frequency.everySeconds", { value: seconds });
		}
		function formatFrequency(record, t, locale) {
			if (record.kind === "every") return preferredEvery(record, t);
			if (record.kind === "daily") return t("frequency.daily", { time: formatTimeOnly(record.time), zone: record.timeZone });
			if (record.kind === "weekly") return t("frequency.weekly", { days: formatWeekdays(record.weekdays, locale), time: formatTimeOnly(record.time), zone: record.timeZone });
			if (record.kind === "cron") return t("frequency.cron", { expression: record.expression, zone: record.timeZone });
			return t("frequency.once");
		}
		function formatInstant(value, locale, timeZone) {
			const stamp = Date.parse(value);
			if (!Number.isFinite(stamp)) return "—";
			const options = { dateStyle: "medium", timeStyle: "medium" };
			if (timeZone) options.timeZone = timeZone;
			return new Intl.DateTimeFormat(locale, options).format(stamp);
		}
		function recordZone(record) {
			return record.kind === "daily" || record.kind === "weekly" || record.kind === "cron" ? record.timeZone : undefined;
		}
		function relative(value, now, t) {
			const diff = Date.parse(value) - now;
			if (!Number.isFinite(diff)) return "";
			if (Math.abs(diff) < 1000) return t("relative.now");
			const seconds = Math.abs(diff) / 1000;
			const units = [[86400, "day"], [3600, "hour"], [60, "minute"], [1, "second"]];
			const picked = units.find(([size]) => seconds >= size) ?? units[units.length - 1];
			const valueCount = Math.max(1, diff > 0 ? Math.ceil(seconds / picked[0]) : Math.floor(seconds / picked[0]));
			const unit = t("unit." + picked[1] + (valueCount === 1 ? ".one" : ".other"));
			return t(diff > 0 ? "relative.future" : "relative.overdue", { value: valueCount, unit });
		}
		function sameDay(left, right) {
			const a = new Date(left), b = new Date(right);
			return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
		}
		function tomorrow(now) {
			const date = new Date(now); date.setHours(0, 0, 0, 0); date.setDate(date.getDate() + 1); return date.getTime();
		}
		function adaptiveTickDelay(records, now) {
			let hasActive = false, nearest = Infinity, nextFuture = Infinity;
			for (const record of records) {
				if (record.status !== "active") continue;
				hasActive = true;
				const stamp = Date.parse(record.scheduledAt);
				if (!Number.isFinite(stamp)) continue;
				const diff = stamp - now;
				nearest = Math.min(nearest, Math.abs(diff));
				if (diff > 0) nextFuture = Math.min(nextFuture, diff);
			}
			if (!hasActive) return null;
			let delay = nearest <= 60000 ? 1000 : nearest <= 3600000 ? 30000 : 60000;
			if (Number.isFinite(nextFuture)) delay = Math.min(delay, Math.max(250, nextFuture + 50));
			return delay;
		}
		function orderRows(records, now) {
			return records.map((record, index) => ({ record, index })).sort((a, b) => {
				if (a.record.status !== b.record.status) return a.record.status === "active" ? -1 : 1;
				const ao = isOverdue(a.record, now), bo = isOverdue(b.record, now);
				if (ao !== bo) return ao ? -1 : 1;
				return Date.parse(a.record.scheduledAt) - Date.parse(b.record.scheduledAt) || a.index - b.index;
			}).map(({ record }) => record);
		}
		function filterRows(records, query, filter, now, sessions) {
			const needle = String(query ?? "").trim().toLocaleLowerCase();
			return records.filter((record) => {
				if (filter === "active" && record.status !== "active") return false;
				if (filter === "inactive" && record.status !== "inactive") return false;
				if (filter === "today" && (record.status !== "active" || !sameDay(Date.parse(record.scheduledAt), now))) return false;
				if (filter === "overdue" && !isOverdue(record, now)) return false;
				if (filter === "recurring" && !isRecurring(record)) return false;
				if (!needle) return true;
				const haystack = [taskTitle(record), record.prompt, record.id, record.sessionId, sessionTitle(record.sessionId, sessions)]
					.filter(Boolean).join(String.fromCharCode(10)).toLocaleLowerCase();
				return haystack.includes(needle);
			});
		}
		function groupsFor(records, grouping, now, sessions, t, locale) {
			const groups = [], map = new Map();
			for (const record of records) {
				let key, label;
				if (grouping === "session") {
					key = "session:" + record.sessionId;
					label = sessionTitle(record.sessionId, sessions);
				} else if (record.status === "inactive") {
					key = "inactive"; label = t("group.inactive");
				} else if (isOverdue(record, now)) {
					key = "overdue"; label = t("group.overdue");
				} else if (sameDay(Date.parse(record.scheduledAt), now)) {
					key = "today"; label = t("group.today");
				} else if (sameDay(Date.parse(record.scheduledAt), tomorrow(now))) {
					key = "tomorrow"; label = t("group.tomorrow");
				} else {
					const stamp = Date.parse(record.scheduledAt);
					const date = new Date(stamp);
					key = "date:" + date.getFullYear() + "-" + pad2(date.getMonth() + 1) + "-" + pad2(date.getDate());
					label = new Intl.DateTimeFormat(locale, { weekday: "short", month: "short", day: "numeric" }).format(stamp);
				}
				let group = map.get(key);
				if (!group) { group = { key, label, records: [] }; map.set(key, group); groups.push(group); }
				group.records.push(record);
			}
			return groups;
		}

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

		function createDeliveryToastSource() {
			let current = null;
			let queue = [];
			let seq = 0;
			const listeners = new Set();
			const publish = (next) => {
				current = next;
				for (const listener of [...listeners]) listener();
			};
			const showNext = () => {
				if (current !== null || queue.length === 0) return;
				const record = queue.shift();
				publish({ record, seq: ++seq });
			};
			return {
				hooks: {
					toast: {
						getSnapshot: () => current,
						subscribe(listener) {
							listeners.add(listener);
							return () => { listeners.delete(listener); };
						}
					}
				},
				report(record) {
					if (!markDeliveryNotified(record)) return;
					queue.push(record);
					showNext();
				},
				dismiss() {
					publish(null);
					queueMicrotask(showNext);
				}
			};
		}

		function deliveryRefreshDelay(records, now) {
			let nearest = Infinity;
			for (const record of records) {
				if (record.status !== "active") continue;
				const scheduled = Date.parse(record.scheduledAt);
				if (!Number.isFinite(scheduled)) continue;
				nearest = Math.min(nearest, scheduled - now);
			}
			if (!Number.isFinite(nearest)) return null;
			if (nearest <= 0) return 2000;
			if (nearest <= 60000) return 3000;
			if (nearest <= 300000) return 10000;
			return Math.min(60000, Math.max(10000, nearest - 60000));
		}
		function startDeliveryRefreshFallback(source) {
			let timer = null;
			let disposed = false;
			const arm = () => {
				if (disposed) return;
				if (timer !== null) window.clearTimeout(timer);
				const state = source.getSnapshot();
				const delay = state.status === "ready" ? deliveryRefreshDelay(state.records, Date.now()) : 5000;
				if (delay === null) { timer = null; return; }
				timer = window.setTimeout(async () => {
					timer = null;
					await source.refresh();
					arm();
				}, delay);
			};
			const unsubscribe = source.subscribe(arm);
			arm();
			return () => {
				disposed = true;
				if (timer !== null) window.clearTimeout(timer);
				unsubscribe();
			};
		}

		function DeliveryToast({ useToast, useCatalog, report, dismiss, openRecord, t }) {
			const toast = useToast((current) => current);
			const catalogState = useCatalog((current) => current);
			const signature = notificationSignature(catalogState.records);
			react.useEffect(() => {
				if (catalogState.status !== "ready") return;
				for (const record of catalogState.records) {
					if (deliveryMarker(record) === null || isDeliveryNotified(record)) continue;
					report(record);
				}
			}, [catalogState.status, signature, report]);
			if (toast === null) return null;
			const record = toast.record;
			return jsx.jsx(primitives.Toast, {
				key: "schedule-delivery-" + String(toast.seq),
				text: t("delivery.toast", { title: taskTitle(record) }),
				holdMs: 6000,
				actions: [{
					label: t("delivery.open"),
					onClick: () => { dismiss(); openRecord(record); }
				}],
				onDone: dismiss
			});
		}

		function createCatalogSource(ctx) {
			const schedule = ctx.remote.schedule;
			let snapshot = { records: [], status: "loading", settled: false, deleting: [], readRequest: 0, readSettled: 0 };
			const listeners = new Set();
			let disposers = [], epoch = 0, lifecycle = 0, inFlight, inFlightRequest = 0, batching = false;
			const publish = (next) => { snapshot = next; for (const listener of [...listeners]) listener(); };
			const read = async (request, current) => {
				let result;
				try { result = await schedule.catalog(); }
				catch { if (current === epoch) publish({ ...snapshot, status: "error" }); return; }
				if (current !== epoch) return;
				if (result?.ok) publish({ ...snapshot, records: result.value ?? [], status: "ready", settled: true, readSettled: request });
				else publish({ ...snapshot, status: "error" });
			};
			const refresh = (supersede = false, since = 0) => {
				const request = snapshot.readRequest + 1;
				publish({ ...snapshot, status: "loading", readRequest: request });
				if (!supersede && batching && inFlight && inFlightRequest > since) return inFlight;
				if (!batching) { batching = true; Promise.resolve().then(() => { batching = false; }); }
				const current = ++epoch;
				const pending = read(request, current);
				inFlight = pending; inFlightRequest = request;
				pending.finally(() => { if (inFlight === pending) inFlight = undefined; });
				return pending;
			};
			const invalidate = () => { void refresh(true); };
			return {
				getSnapshot: () => snapshot,
				subscribe(listener) {
					listeners.add(listener);
					if (listeners.size === 1) {
						lifecycle += 1;
						disposers = [ctx.remote.$on("schedule/changed", invalidate), ctx.on("connection/reset", invalidate)];
						invalidate();
					}
					return () => {
						listeners.delete(listener);
						if (listeners.size !== 0) return;
						for (const dispose of disposers) dispose?.();
						disposers = []; epoch += 1; lifecycle += 1; snapshot = { ...snapshot, deleting: [] };
					};
				},
				refresh: (since = 0) => refresh(false, since),
				async remove(record) {
					if (snapshot.deleting.includes(record.id)) return "pending";
					const started = lifecycle;
					publish({ ...snapshot, deleting: [...snapshot.deleting, record.id] });
					let result;
					try { result = await schedule.delete({ sessionId: record.sessionId, id: record.id }); }
					catch {
						if (started === lifecycle) publish({ ...snapshot, deleting: snapshot.deleting.filter((id) => id !== record.id) });
						return "failed";
					}
					if (started !== lifecycle) return result?.ok ? "deleted" : "failed";
					publish({ ...snapshot, deleting: snapshot.deleting.filter((id) => id !== record.id) });
					if (!result?.ok) return "failed";
					await refresh(true);
					return result.value?.deleted === false ? "gone" : "deleted";
				},
				async update(request) {
					let result;
					try { result = await schedule.update(request); }
					catch (error) { return { ok: false, error }; }
					if (result?.ok && result.value?.record) await refresh(true);
					return result;
				}
			};
		}

		let hostCtx = null;
		let catalog = null;
		function useObservable(source) {
			const [snapshot, setSnapshot] = react.useState(() => source.getSnapshot());
			react.useEffect(() => source.subscribe(() => setSnapshot(source.getSnapshot())), [source]);
			return snapshot;
		}
		function useSessionSnapshots() {
			const sessionsSource = hostCtx.sessions.list;
			const workspacesSource = hostCtx.workspaces.list;
			const [sessions, setSessions] = react.useState(() => sessionsSource.getSnapshot());
			const [workspaces, setWorkspaces] = react.useState(() => workspacesSource.getSnapshot());
			react.useEffect(() => sessionsSource.subscribe(() => setSessions(sessionsSource.getSnapshot())), [sessionsSource]);
			react.useEffect(() => workspacesSource.subscribe(() => setWorkspaces(workspacesSource.getSnapshot())), [workspacesSource]);
			return { sessions, workspaces };
		}

		function ScheduleGlyph({ size, active, t }) {
			const state = useObservable(catalog);
			const seenRev = useObservable(seenRevisionSource);
			const [now, setNow] = react.useState(() => Date.now());
			const signature = notificationSignature(state.records);
			react.useEffect(() => {
				if (!active || state.status !== "ready") return;
				markTasksSeen(state.records);
			}, [active, state.status, signature]);
			react.useEffect(() => {
				const delay = adaptiveTickDelay(state.records, now);
				if (delay === null) return;
				const timer = window.setTimeout(() => setNow(Date.now()), delay);
				return () => window.clearTimeout(timer);
			}, [state.records, now]);
			const summary = notificationSummary(state.records, now);
			react.useEffect(() => { syncSessionOverdueStyles(state.records, now); }, [state.records, state.status, now]);
			const compact = (size ?? 16) > 16;
			const hasUnread = summary.unread > 0;
			const warn = summary.overdue > 0;
			const className = "scc_sidebarGlyph" + (hasUnread ? " scc_sidebarNew" : "") + (warn ? " scc_sidebarWarn" : "");
			const title = t("sidebar.summary", { newCount: summary.unread, deliveryCount: summary.unreadDeliveries, total: summary.total, overdue: summary.overdue, recurring: summary.recurring });
			return jsx.jsxs("span", {
				className,
				"data-compact": compact ? "true" : "false",
				"data-has-count": summary.total > 0 ? "true" : "false",
				title,
				children: [
					ClockIcon ? jsx.jsx(ClockIcon, { size: size ?? 16 }) : null,
					compact ? (hasUnread ? jsx.jsx("span", { className: "scc_sidebarDot", "aria-hidden": "true" }) : null)
						: (summary.total === 0 ? null : jsx.jsx("span", {
							className: "scc_sidebarCount",
							children: hasUnread ? jsx.jsxs(jsx.Fragment, { children: [
								jsx.jsx("span", { className: warn ? "scc_sidebarCountWarn" : "scc_sidebarCountNew", children: summary.unread }),
								jsx.jsx("span", { className: "scc_sidebarCountSep", children: "/" }),
								jsx.jsx("span", { children: summary.total })
							] }) : summary.total
						}))
				]
			});
		}

		let nativeScheduleMain = null;

		function createSelectorHook(source) {
			return (selector = (value) => value) => selector(useObservable(source));
		}

		function captureNativeScheduleMain(ctx) {
			const entry = ctx.slots.entries("main").find((candidate) => candidate.options?.key === PANEL_ID);
			if (!entry || typeof entry.component !== "function" || typeof entry.inject !== "function") {
				nativeScheduleMain = null;
				return false;
			}
			const injected = entry.inject();
			const nativeCatalog = injected?.hooks?.catalog;
			if (!nativeCatalog?.getSnapshot || !nativeCatalog?.subscribe) {
				nativeScheduleMain = null;
				return false;
			}
			nativeScheduleMain = {
				Component: entry.component,
				props: {
					...injected,
					useCatalog: createSelectorHook(nativeCatalog),
					useSessions: createSelectorHook(ctx.sessions.list),
					useWorkspaces: createSelectorHook(ctx.workspaces.list),
					t: ctx.locale.bind(entry.options?.locale ?? "schedule.manager")
				}
			};
			return true;
		}

		function nativeDetailElement(page) {
			if (!page) return null;
			return [...page.children].find((node) => node.tagName === "ASIDE") ?? null;
		}

		function NativeTaskDetailBridge({ record, tab, onClose }) {
			const hostRef = react.useRef(null);
			const closeRef = react.useRef(onClose);
			closeRef.current = onClose;
			const bridge = nativeScheduleMain;
			const key = identity(record);

			react.useEffect(() => {
				const host = hostRef.current;
				if (!host || !bridge) return;
				let cancelled = false;
				let timer = null;
				let attempts = 0;
				let hadDetail = false;
				let closed = false;

				const sync = () => {
					if (cancelled) return;
					attempts += 1;
					const page = host.querySelector('[data-testid="task-manager-page"]');
					if (!page) {
						if (attempts < 80) timer = window.setTimeout(sync, 50);
						return;
					}
					let detail = nativeDetailElement(page);
					if (!detail) {
						const suffix = "-metadata-" + record.id;
						const row = [...page.querySelectorAll('button[aria-describedby]')]
							.find((button) => button.getAttribute("aria-describedby")?.endsWith(suffix));
						if (row) row.click();
						detail = nativeDetailElement(page);
					}
					if (detail) {
						hadDetail = true;
						const tabButton = detail.querySelector('[data-detail-tab="' + tab + '"]');
						if (tabButton && tabButton.getAttribute("aria-selected") !== "true") tabButton.click();
						return;
					}
					if (attempts < 80) timer = window.setTimeout(sync, 50);
				};

				const observer = new MutationObserver(() => {
					if (cancelled || closed) return;
					const page = host.querySelector('[data-testid="task-manager-page"]');
					const detail = nativeDetailElement(page);
					if (detail) {
						hadDetail = true;
						return;
					}
					if (hadDetail) {
						closed = true;
						closeRef.current?.();
					}
				});
				observer.observe(host, { subtree: true, childList: true });
				sync();
				return () => {
					cancelled = true;
					if (timer !== null) window.clearTimeout(timer);
					observer.disconnect();
				};
			}, [key, tab, bridge]);

			if (!bridge) return jsx.jsx("aside", {
				className: "scc_nativeDetailHost",
				children: jsx.jsx("div", { className: "scc_emptyHint", children: "Native DSH schedule detail is unavailable." })
			});

			const Native = bridge.Component;
			const props = {
				...bridge.props,
				onOpenSession: (sessionId) => {
					markRecordSeen(record);
					bridge.props.onOpenSession?.(sessionId);
				}
			};
			return jsx.jsx("aside", {
				className: "scc_nativeDetailHost",
				ref: hostRef,
				children: jsx.jsx(Native, { ...props }, key)
			});
		}
		function SchedulePanel({ t }) {
			const catalogState = useObservable(catalog);
			useObservable(seenRevisionSource);
			const { sessions } = useSessionSnapshots();
			const locale = (typeof document !== "undefined" && document.documentElement?.lang) || undefined;
			const [query, setQuery] = react.useState("");
			const [filter, setFilter] = react.useState("active");
			const [grouping, setGrouping] = react.useState("date");
			const [now, setNow] = react.useState(() => Date.now());
			const [selectedKey, setSelectedKey] = react.useState(null);
			const [detailTab, setDetailTab] = react.useState("rule");
			const [confirmDeleteRecord, setConfirmDeleteRecord] = react.useState(null);
			const [toast, setToast] = react.useState(null);
			const toastSeq = react.useRef(0);

			react.useEffect(() => {
				const delay = adaptiveTickDelay(catalogState.records, now);
				if (delay === null) return;
				const timer = window.setTimeout(() => setNow(Date.now()), delay);
				return () => window.clearTimeout(timer);
			}, [catalogState.records, now]);

			const ordered = react.useMemo(() => orderRows(catalogState.records, now), [catalogState.records, now]);
			const visible = react.useMemo(() => filterRows(ordered, query, filter, now, sessions), [ordered, query, filter, now, sessions]);
			const statusCounts = react.useMemo(() => ({
				active: filterRows(ordered, query, "active", now, sessions).length,
				all: filterRows(ordered, query, "all", now, sessions).length,
				inactive: filterRows(ordered, query, "inactive", now, sessions).length
			}), [ordered, query, now, sessions]);
			const groups = react.useMemo(() => groupsFor(visible, grouping, now, sessions, t, locale), [visible, grouping, now, sessions, t, locale]);
			const hasControls = query.trim() !== "" || filter !== "active";
			const selectedRecord = selectedKey === null ? undefined : catalogState.records.find((record) => identity(record) === selectedKey);

			react.useEffect(() => {
				if (selectedKey !== null && selectedRecord === undefined) setSelectedKey(null);
			}, [selectedKey, selectedRecord]);

			const showToast = (kind, text) => setToast({ kind, text, seq: ++toastSeq.current });
			const openDetail = (record, tab = "rule", event) => {
				event?.stopPropagation?.();
				setDetailTab(tab);
				setSelectedKey(identity(record));
			};
			const closeDetail = react.useCallback(() => setSelectedKey(null), []);
			const requestDelete = (record, event) => {
				event?.stopPropagation?.();
				setConfirmDeleteRecord(record);
			};
			const confirmDelete = async () => {
				const record = confirmDeleteRecord;
				if (!record) return;
				setConfirmDeleteRecord(null);
				const outcome = await catalog.remove(record);
				if (selectedKey === identity(record) && (outcome === "deleted" || outcome === "gone")) closeDetail();
				if (outcome === "deleted") showToast("success", t("toast.deleted"));
				else if (outcome === "gone") showToast("success", t("toast.gone"));
				else if (outcome !== "pending") showToast("warning", t("toast.deleteFailed"));
			};

			return jsx.jsxs("div", {
				className: "scc_root" + (selectedRecord ? " scc_hasNativeDetail" : ""),
				children: [
					jsx.jsxs("header", { className: "scc_header", children: [
						jsx.jsx("h1", { className: "scc_title", children: t("header") }),
						jsx.jsx("span", { className: "scc_count", children: t("count", { visible: visible.length }) }),
						jsx.jsx("span", { className: "scc_spacer" }),
						jsx.jsx(primitives.Tooltip, {
							label: t("new.hint"),
							side: "bottom", portal: true,
							children: jsx.jsx(primitives.Button, {
								variant: "primary",
								size: "sm",
								icon: PlusIcon ? jsx.jsx(PlusIcon, { size: 14 }) : null,
								onClick: () => hostCtx.uiWorkspace.startSession(),
								children: t("new")
							})
						})
					] }),
					jsx.jsxs("div", { className: "scc_toolbar", children: [
						jsx.jsxs("div", { className: "scc_searchWrap", children: [
							jsx.jsx(primitives.Input, {
								className: "scc_searchNative",
								type: "search",
								icon: SearchIcon ? jsx.jsx(SearchIcon, { size: 16 }) : null,
								value: query,
								placeholder: t("search.placeholder"),
								"aria-label": t("search.aria"),
								onChange: (event) => setQuery(event.target.value)
							}),
							query ? jsx.jsx(primitives.Button, {
								size: "sm",
								className: "scc_searchClear",
								"aria-label": t("search.clear"),
								onClick: () => setQuery(""),
								children: CloseIcon ? jsx.jsx(CloseIcon, { size: 14 }) : null
							}) : null
						] }),
						jsx.jsxs("div", { className: "scc_toolbarRow", children: [
							jsx.jsx("div", { className: "scc_filters", children: ["active", "all", "inactive", "today", "overdue", "recurring"].map((name) => jsx.jsxs("button", {
								type: "button",
								className: "scc_chip" + (filter === name ? " scc_chipActive" : ""),
								"aria-pressed": filter === name,
								onClick: () => setFilter(name),
								children: [t("filter." + name), Object.hasOwn(statusCounts, name) ? jsx.jsx("span", { className: "scc_chipCount", children: statusCounts[name] }) : null]
							}, name)) }),
							jsx.jsxs("div", { className: "scc_grouping", children: [
								jsx.jsx("span", { className: "scc_groupLabel", children: t("group.by") }),
								...["date", "session"].map((name) => jsx.jsx("button", {
									type: "button",
									className: "scc_chip" + (grouping === name ? " scc_chipActive" : ""),
									"aria-pressed": grouping === name,
									onClick: () => setGrouping(name),
									children: t("group." + name)
								}, name))
							] })
						] })
					] }),
					catalogState.status === "error" && catalogState.records.length > 0 ? jsx.jsxs("div", { className: "scc_banner", children: [
						jsx.jsx("span", { children: t("catalog.stale") }),
						jsx.jsx(primitives.Button, { size: "sm", variant: "outline", onClick: () => void catalog.refresh(catalogState.readRequest), children: t("retry") })
					] }) : null,
					jsx.jsx("div", { className: "scc_body", children: visible.length === 0 ? jsx.jsxs("div", { className: "scc_empty", children: [
						jsx.jsx("span", { className: "scc_emptyIcon", children: ClockIcon ? jsx.jsx(ClockIcon, { size: 28 }) : null }),
						jsx.jsx("div", { className: "scc_emptyTitle", children: catalogState.status === "loading" && !catalogState.settled ? t("empty.loading") : catalogState.status === "error" && !catalogState.settled ? t("empty.error") : filter === "inactive" && query.trim() === "" ? t("empty.inactive") : hasControls ? t("empty.filtered") : t("empty.none") }),
						jsx.jsx("div", { className: "scc_emptyHint", children: catalogState.status === "error" && !catalogState.settled ? t("empty.errorHint") : hasControls ? t("empty.filteredHint") : t("empty.noneHint") }),
						catalogState.status === "error" ? jsx.jsx(primitives.Button, { size: "sm", variant: "outline", onClick: () => void catalog.refresh(catalogState.readRequest), children: t("retry") }) : null
					] }) : jsx.jsx("div", { className: "scc_list", role: "list", "aria-label": t("list.aria"), children: groups.map((group) => jsx.jsxs("section", { className: "scc_group", children: [
						jsx.jsxs("div", { className: "scc_groupHeader", children: [
							jsx.jsx("span", { children: group.label }),
							jsx.jsx("span", { className: "scc_groupCount", children: group.records.length })
						] }),
						jsx.jsx("ul", { className: "scc_groupList", children: group.records.map((record) => {
							const key = identity(record);
							const overdue = isOverdue(record, now);
							const attention = taskAttentionState(record, now);
							const deleting = catalogState.deleting.includes(record.id);
							const source = sessionTitle(record.sessionId, sessions);
							const nextOrLast = record.status === "active"
								? t("next", { value: formatInstant(record.scheduledAt, locale, undefined) })
								: record.lastDelivery ? t("lastOccurrence", { value: formatInstant(record.lastDelivery.scheduledAt, locale, recordZone(record)) }) : t("inactive.noDelivery");
							return jsx.jsxs("li", {
								className: "scc_row" + (overdue ? " scc_rowOverdue" : "") + (record.status === "inactive" ? " scc_rowInactive" : "") + (selectedKey === key ? " scc_selectedRow" : ""),
								"data-task-id": record.id,
								children: [
									jsx.jsxs("div", {
										className: "scc_rowMain",
										role: "button",
										tabIndex: 0,
										onClick: (event) => openDetail(record, "rule", event),
										onKeyDown: (event) => {
											if (event.key !== "Enter" && event.key !== " ") return;
											event.preventDefault();
											openDetail(record, "rule", event);
										},
										children: [
											jsx.jsxs("div", { className: "scc_rowTitleLine", children: [
												jsx.jsx("div", { className: "scc_rowTitle", children: taskTitle(record) }),
												attention ? jsx.jsx("span", {
													className: "scc_attentionDot" + (attention === "warning" ? " scc_attentionDotWarn" : ""),
													title: t(attention === "warning" ? "attention.overdue" : "attention.newDelivery"),
													"aria-label": t(attention === "warning" ? "attention.overdue" : "attention.newDelivery")
												}) : null
											] }),
											record.prompt && record.prompt !== record.title ? jsx.jsx("div", { className: "scc_prompt", children: record.prompt }) : null,
											jsx.jsxs("div", { className: "scc_badges", children: [
												jsx.jsx("span", { className: "scc_badge " + (overdue ? "scc_badgeWarn" : record.status === "inactive" ? "scc_badgeInactive" : ""), children: t(overdue ? "status.overdue" : "status." + record.status) }),
												isRecurring(record) ? jsx.jsx("span", { className: "scc_badge scc_badgeRecurring", children: t("tag.recurring") }) : null,
												jsx.jsx("span", { className: "scc_badge", children: scheduleKind(record, t) })
											] }),
											jsx.jsxs("div", { className: "scc_meta", children: [
												jsx.jsx("span", { children: formatFrequency(record, t, locale) }),
												jsx.jsx("span", { className: "scc_sep", children: "·" }),
												jsx.jsx("span", { className: "scc_metaStrong", children: nextOrLast }),
												record.status === "active" ? jsx.jsxs(jsx.Fragment, { children: [
													jsx.jsx("span", { className: "scc_sep", children: "·" }),
													jsx.jsx("span", { children: relative(record.scheduledAt, now, t) })
												] }) : null,
												record.lastDelivery ? jsx.jsxs(jsx.Fragment, { children: [
													jsx.jsx("span", { className: "scc_sep", children: "·" }),
													jsx.jsx("span", { children: t("acknowledged", { value: formatInstant(record.lastDelivery.deliveredAt, locale, undefined) }) })
												] }) : null
											] }),
											jsx.jsxs("div", { className: "scc_source", children: [
												jsx.jsx("span", { children: t("source") }),
												jsx.jsx("span", { className: "scc_sourceName", title: source, children: source })
											] })
										]
									}),
									jsx.jsxs("div", { className: "scc_actions", children: [
										jsx.jsx(primitives.Tooltip, { label: t("action.details"), side: "top", portal: true, children: jsx.jsx(primitives.Button, {
											size: "sm",
											className: "scc_iconButton" + (selectedKey === key && detailTab === "rule" ? " scc_iconButtonActive" : ""),
											"aria-label": t("action.details"),
											"aria-pressed": selectedKey === key && detailTab === "rule",
											onClick: (event) => openDetail(record, "rule", event),
											children: EditIcon ? jsx.jsx(EditIcon, { size: 16 }) : null
										}) }),
										jsx.jsx(primitives.Tooltip, { label: t("action.history"), side: "top", portal: true, children: jsx.jsx(primitives.Button, {
											size: "sm",
											className: "scc_iconButton" + (selectedKey === key && detailTab === "records" ? " scc_iconButtonActive" : ""),
											"aria-label": t("action.history"),
											"aria-pressed": selectedKey === key && detailTab === "records",
											onClick: (event) => openDetail(record, "records", event),
											children: HistoryIcon ? jsx.jsx(HistoryIcon, { size: 16 }) : null
										}) }),
										jsx.jsx(primitives.Tooltip, { label: deleting ? t("delete.pending") : t("action.delete"), side: "top", portal: true, children: jsx.jsx(primitives.Button, {
											size: "sm",
											className: "scc_iconButton scc_iconButtonDanger",
											disabled: deleting || catalogState.status === "loading",
											"aria-label": deleting ? t("delete.pending") : t("action.delete"),
											onClick: (event) => requestDelete(record, event),
											children: TrashIcon ? jsx.jsx(TrashIcon, { size: 16 }) : null
										}) })
									] })
								]
							}, key);
						}) })
					] }, group.key)) }) }),
					selectedRecord ? jsx.jsx(NativeTaskDetailBridge, { record: selectedRecord, tab: detailTab, onClose: closeDetail }) : null,
					jsx.jsx(primitives.Modal, {
						open: confirmDeleteRecord !== null,
						title: t("delete.title"),
						description: t("delete.description"),
						closeLabel: t("delete.close"),
						onClose: () => setConfirmDeleteRecord(null),
						footer: confirmDeleteRecord === null ? null : jsx.jsxs("div", { className: "scc_actions", children: [
							jsx.jsx(primitives.Button, { variant: "outline", "data-modal-autofocus": true, onClick: () => setConfirmDeleteRecord(null), children: t("delete.cancel") }),
							jsx.jsx(primitives.Button, { className: "scc_iconButtonDanger", disabled: catalogState.deleting.includes(confirmDeleteRecord.id), onClick: () => void confirmDelete(), children: t("delete.confirmAction") })
						] }),
						children: confirmDeleteRecord === null ? null : jsx.jsx("p", { className: "scc_confirmTask", children: taskTitle(confirmDeleteRecord) })
					}),
					toast === null ? null : jsx.jsx(primitives.Toast, {
						key: "schedule-control-center-toast-" + toast.seq,
						text: toast.text,
						tone: toast.kind === "success" ? "success" : undefined,
						icon: toast.kind === "warning" && WarningIcon ? jsx.jsx(WarningIcon, { size: 16 }) : undefined,
						onDone: () => setToast(null)
					})
				]
			});
		}
		const en = {
			"tab": "Automation tasks",
			"header": "Automation tasks",
			"count": "{visible} shown",
			"new": "New conversation",
			"new.hint": "Start a conversation where you can ask DSH to create an automation task.",
			"retry": "Retry",
			"catalog.stale": "Could not refresh tasks. Showing the last successful catalog.",
			"search.placeholder": "Search title, reminder, task ID or dialog…",
			"search.aria": "Search scheduled tasks",
			"search.clear": "Clear search",
			"filter.active": "Active",
			"filter.all": "All",
			"filter.inactive": "Inactive",
			"filter.today": "Today",
			"filter.overdue": "Overdue",
			"filter.recurring": "Recurring",
			"group.by": "Group",
			"group.date": "Date",
			"group.session": "Dialog",
			"group.inactive": "Inactive",
			"group.overdue": "Overdue",
			"group.today": "Today",
			"group.tomorrow": "Tomorrow",
			"status.active": "Scheduled",
			"status.inactive": "Inactive",
			"status.overdue": "Overdue",
			"tag.recurring": "Recurring",
			"kind.after": "One-shot",
			"kind.at": "One-shot",
			"kind.every": "Interval",
			"kind.daily": "Daily",
			"kind.weekly": "Weekly",
			"kind.cron": "Cron",
			"frequency.once": "Once",
			"frequency.every": "Every {value} {unit}",
			"frequency.everySeconds": "Every {value} seconds",
			"frequency.daily": "Daily {time} · {zone}",
			"frequency.weekly": "Weekly {days} · {time} · {zone}",
			"frequency.cron": "Cron {expression} · {zone}",
			"unit.hour.one": "hour", "unit.hour.other": "hours",
			"unit.minute.one": "minute", "unit.minute.other": "minutes",
			"unit.second.one": "second", "unit.second.other": "seconds",
			"relative.now": "Due now",
			"relative.future": "in {value} {unit}",
			"relative.overdue": "{value} {unit} overdue",
			"next": "Next {value}",
			"lastOccurrence": "Last occurrence {value}",
			"acknowledged": "delivered {value}",
			"attention.newDelivery": "New scheduled delivery",
			"attention.overdue": "Scheduled task is overdue",
			"delivery.toast": "Scheduled task delivered: {title}",
			"delivery.open": "Open conversation",
			"inactive.noDelivery": "No saved delivery",
			"source": "From",
			"action.details": "Edit here",
			"action.history": "Delivery records",
			"action.hideHistory": "Hide history",
						"action.delete": "Delete",
			"delete.title": "Delete this task?",
			"delete.description": "This stops future triggers and deletes the task together with its saved delivery history. The original conversation remains, and a reminder already queued for delivery cannot be recalled.",
			"delete.close": "Close deletion confirmation",
			"delete.cancel": "Cancel",
			"delete.confirmAction": "Delete task",
			"delete.pending": "Deleting…",
			"toast.deleted": "Task deleted.",
			"toast.gone": "Task was already removed.",
			"toast.deleteFailed": "Could not delete the task.",
			"detail.unavailable": "The original conversation is unavailable.",
			"detail.label": "Task details",
			"detail.tabs": "Task detail views",
			"detail.rule": "Rules",
			"detail.records": "Delivery records",
			"detail.openSession": "Open original conversation",
			"detail.close": "Close details",
			"detail.next": "Next run {value} · {relative}",
			"detail.taskId": "Task ID",
			"edit.name": "Automation task name",
			"edit.prompt": "Automation task instruction",
			"edit.runtime": "Run time",
			"edit.repeat": "Repeat",
			"edit.date": "Date",
			"edit.time": "Time",
			"edit.timeZone": "Time zone",
			"edit.interval": "Repeat every",
			"edit.weekdays": "Weekday",
			"edit.cron": "Cron expression",
			"edit.rule.once": "Once",
			"edit.rule.every": "Every N",
			"edit.rule.daily": "Every day",
			"edit.rule.weekdays": "Monday to Friday",
			"edit.rule.weekly": "Weekly",
			"edit.rule.cron": "Custom",
			"edit.unit.hours": "hours",
			"edit.unit.minutes": "minutes",
			"edit.unit.seconds": "seconds",
			"edit.intervalHint": "At least 60 seconds. Fixed intervals are independent of time zones.",
			"edit.onceZoneHint": "A one-time task stores only its target moment. Date and time are interpreted in the selected time zone.",
			"edit.cronHint": "Use a five-field cron expression. The rule is evaluated in the selected IANA time zone.",
			"edit.inactive": "Inactive tasks are read-only.",
			"edit.unsaved": "Unsaved changes",
			"edit.cancel": "Cancel",
			"edit.save": "Save changes",
			"edit.saving": "Saving…",
			"edit.saved": "Task updated.",
			"edit.invalidTitle": "Enter a task name of at most 120 characters.",
			"edit.invalidPrompt": "Enter a task instruction.",
			"edit.invalidInterval": "Enter an interval of at least 60 seconds.",
			"edit.invalidZone": "Enter a valid IANA time zone, for example Europe/Moscow.",
			"edit.invalidDateTime": "Enter a valid date and time.",
			"edit.invalidWeekdays": "Select at least one weekday.",
			"edit.invalidCron": "Enter a five-field cron expression, for example 0 9 * * 1-5.",
			"edit.conflict": "This task changed while you were editing. Your draft is retained; review the latest values and save again.",
			"edit.ended": "This task is inactive and can no longer be edited.",
			"edit.notFound": "This task is no longer available.",
			"edit.saveFailed": "Could not confirm the task update. Your draft is retained.",
			"history.title": "Delivery history",
			"history.loading": "Loading…",
			"history.empty": "No saved deliveries yet.",
			"history.error": "Could not load delivery history.",
			"history.retry": "Retry delivery records",
			"history.refresh": "Refresh delivery records",
			"history.more": "Load older deliveries",
			"history.occurrence": "Occurrence {value}",
			"history.ack": "Acknowledged {value}",
			"history.legacyPrompt": "Prompt snapshot unavailable for this legacy receipt",
			"history.copyId": "Copy message ID",
			"history.copied": "Copied",
			"history.pruned": "Older records were pruned. Current retention: {days} days / {records} records per task.",
			"history.code.schedule_not_found": "This task no longer exists.",
			"history.code.delivery_cursor_not_found": "The history cursor is no longer valid. Refresh the delivery records.",
			"history.code.unknown": "Could not load delivery history.",
			"session.available": "Open the original conversation",
			"session.loading": "Session metadata is still loading",
			"session.archived": "The original conversation is archived",
			"session.unavailable": "The original conversation is unavailable",
			"empty.loading": "Loading scheduled tasks",
			"empty.error": "Schedule could not be loaded",
			"empty.errorHint": "The rc2 Host Schedule catalog could not be read.",
			"empty.inactive": "No inactive automation tasks",
			"empty.filtered": "No matching tasks",
			"empty.filteredHint": "Adjust the search text or filters.",
			"empty.none": "No active scheduled tasks",
			"empty.noneHint": "Create a reminder in a conversation. This plugin reads only the native DSH 0.1.7-rc.2 Host Schedule catalog.",
			"list.aria": "Scheduled tasks",
			"sidebar.summary": "{newCount} new · {deliveryCount} results · {total} active · {overdue} overdue · {recurring} recurring"
		};
		const zh = {
			...en,
			"tab": "自动化任务",
			"header": "自动化任务",
			"count": "显示 {visible}",
			"new": "新建对话",
			"new.hint": "开始一个新对话，并让 DSH 创建自动化任务。",
			"retry": "重试",
			"search.clear": "清空搜索",
			"filter.active": "活动",
			"filter.all": "全部",
			"filter.inactive": "已结束",
			"filter.today": "今天",
			"filter.overdue": "逾期",
			"filter.recurring": "重复",
			"group.by": "分组",
			"group.date": "日期",
			"group.session": "对话",
			"group.inactive": "已结束",
			"group.overdue": "逾期",
			"group.today": "今天",
			"group.tomorrow": "明天",
			"status.active": "已计划",
			"status.inactive": "已结束",
			"status.overdue": "已逾期",
			"tag.recurring": "重复",
			"attention.newDelivery": "新的计划任务投递",
			"attention.overdue": "计划任务已逾期",
			"delivery.toast": "计划任务已投递：{title}",
			"delivery.open": "打开对话",
			"action.details": "打开原生日程详情",
			"action.history": "投递记录",
			"action.hideHistory": "隐藏历史",
						"action.delete": "删除",
			"delete.title": "删除此任务？",
			"delete.description": "任务将停止后续触发，并连同已保存的投递历史一起删除。原会话仍然保留；已经排队的提醒无法撤回。",
			"delete.close": "关闭删除确认",
			"delete.cancel": "取消",
			"delete.confirmAction": "删除任务",
			"delete.pending": "正在删除…",
			"toast.deleted": "任务已删除。",
			"toast.gone": "任务已经不存在。",
			"toast.deleteFailed": "无法删除任务。",
			"detail.unavailable": "原会话不可用。",
			"detail.label": "任务详情",
			"detail.tabs": "任务详情视图",
			"detail.rule": "规则",
			"detail.records": "投递记录",
			"detail.openSession": "打开原会话",
			"detail.close": "关闭详情",
			"detail.next": "下次运行 {value} · {relative}",
			"detail.taskId": "任务 ID",
			"edit.name": "自动化任务名称",
			"edit.prompt": "自动化任务内容",
			"edit.runtime": "运行时间",
			"edit.repeat": "重复",
			"edit.date": "日期",
			"edit.time": "时间",
			"edit.timeZone": "时区",
			"edit.interval": "重复间隔",
			"edit.weekdays": "星期",
			"edit.cron": "Cron 表达式",
			"edit.rule.once": "仅一次",
			"edit.rule.every": "每 N",
			"edit.rule.daily": "每天",
			"edit.rule.weekdays": "周一至周五",
			"edit.rule.weekly": "每周",
			"edit.rule.cron": "自定义",
			"edit.unit.hours": "小时",
			"edit.unit.minutes": "分钟",
			"edit.unit.seconds": "秒",
			"edit.intervalHint": "至少 60 秒。固定间隔与时区无关。",
			"edit.onceZoneHint": "单次任务只保存目标时刻；日期和时间按所选时区解释。",
			"edit.cronHint": "请输入五字段 Cron 表达式；规则按所选 IANA 时区执行。",
			"edit.inactive": "已结束的任务为只读。",
			"edit.unsaved": "有未保存的修改",
			"edit.cancel": "取消",
			"edit.save": "保存修改",
			"edit.saving": "保存中…",
			"edit.saved": "任务已更新。",
			"edit.invalidTitle": "请输入不超过 120 个字符的任务名称。",
			"edit.invalidPrompt": "请输入任务内容。",
			"edit.invalidInterval": "请输入至少 60 秒的间隔。",
			"edit.invalidZone": "请输入有效的 IANA 时区，例如 Europe/Moscow。",
			"edit.invalidDateTime": "请输入有效的日期和时间。",
			"edit.invalidWeekdays": "请至少选择一个星期。",
			"edit.invalidCron": "请输入五字段 Cron 表达式，例如 0 9 * * 1-5。",
			"edit.conflict": "编辑期间任务已变化。草稿已保留；请检查最新值后再次保存。",
			"edit.ended": "任务已结束，无法继续编辑。",
			"edit.notFound": "此任务已不可用。",
			"edit.saveFailed": "无法确认任务更新。草稿已保留。",
			"history.title": "投递历史",
			"history.loading": "正在加载…",
			"history.empty": "暂无已保存的投递记录。",
			"history.more": "加载更早记录",
			"history.retry": "重试投递记录",
			"history.refresh": "刷新投递记录",
			"history.copyId": "复制消息 ID",
			"history.copied": "已复制",
			"source": "来自",
			"empty.loading": "正在加载计划任务",
			"empty.error": "无法加载日程",
			"empty.inactive": "没有已结束的自动化任务",
			"empty.filtered": "没有匹配的任务",
			"empty.none": "没有活动的计划任务"
		};

		const ru = {
			...en,
			"tab": "Задачи автоматизации", "header": "Задачи автоматизации", "count": "Показано: {visible}",
			"new": "Новый диалог", "new.hint": "Откройте новый диалог и попросите DSH создать задачу автоматизации.",
			"retry": "Повторить", "catalog.stale": "Не удалось обновить задачи. Показан последний успешно загруженный каталог.",
			"search.placeholder": "Поиск по названию, тексту, ID задачи или диалогу…", "search.aria": "Поиск запланированных задач", "search.clear": "Очистить поиск",
			"filter.active": "Активные", "filter.all": "Все", "filter.inactive": "Неактивные", "filter.today": "Сегодня", "filter.overdue": "Просроченные", "filter.recurring": "Повторяющиеся",
			"group.by": "Группировать", "group.date": "По дате", "group.session": "По диалогу", "group.inactive": "Неактивные", "group.overdue": "Просроченные", "group.today": "Сегодня", "group.tomorrow": "Завтра",
			"status.active": "Запланировано", "status.inactive": "Неактивно", "status.overdue": "Просрочено", "tag.recurring": "Повторяется",
			"kind.after": "Однократно", "kind.at": "Однократно", "kind.every": "Интервал", "kind.daily": "Ежедневно", "kind.weekly": "Еженедельно", "kind.cron": "Cron",
			"frequency.once": "Один раз", "frequency.every": "Каждые {value} {unit}", "frequency.everySeconds": "Каждые {value} сек.", "frequency.daily": "Ежедневно {time} · {zone}", "frequency.weekly": "Еженедельно {days} · {time} · {zone}", "frequency.cron": "Cron {expression} · {zone}",
			"unit.hour.one": "ч", "unit.hour.other": "ч", "unit.minute.one": "мин", "unit.minute.other": "мин", "unit.second.one": "сек", "unit.second.other": "сек",
			"relative.now": "Срок наступил", "relative.future": "через {value} {unit}", "relative.overdue": "просрочено на {value} {unit}",
			"next": "Следующий запуск {value}", "lastOccurrence": "Последний запуск {value}", "acknowledged": "доставлено {value}",
			"attention.newDelivery": "Новое срабатывание доставлено в диалог", "attention.overdue": "Запланированная задача просрочена",
			"delivery.toast": "Сработала задача: {title}", "delivery.open": "Открыть диалог",
			"inactive.noDelivery": "Нет сохранённой доставки", "source": "Из",
			"action.details": "Открыть штатные параметры задачи", "action.history": "История доставок", "action.hideHistory": "Скрыть историю", "action.delete": "Удалить",
			"delete.title": "Удалить эту задачу?", "delete.close": "Закрыть подтверждение удаления", "delete.cancel": "Отмена", "delete.confirmAction": "Удалить задачу", "delete.pending": "Удаление…",
			"delete.description": "Будущие срабатывания будут остановлены, а задача и сохранённая история доставок удалены. Исходный диалог останется. Уже поставленное в очередь напоминание отозвать нельзя.",
			"toast.deleted": "Задача удалена.", "toast.gone": "Задача уже была удалена.", "toast.deleteFailed": "Не удалось удалить задачу.",
			"detail.unavailable": "Исходный диалог недоступен.", "detail.label": "Параметры задачи", "detail.tabs": "Разделы задачи", "detail.rule": "Правила", "detail.records": "История доставок", "detail.openSession": "Открыть исходный диалог", "detail.close": "Закрыть", "detail.next": "Следующий запуск {value} · {relative}", "detail.taskId": "ID задачи",
			"edit.name": "Название задачи автоматизации", "edit.prompt": "Инструкция задачи автоматизации", "edit.runtime": "Время запуска", "edit.repeat": "Повтор", "edit.date": "Дата", "edit.time": "Время", "edit.timeZone": "Часовой пояс", "edit.interval": "Повторять каждые", "edit.weekdays": "Дни недели", "edit.cron": "Cron-выражение",
			"edit.rule.once": "Один раз", "edit.rule.every": "Каждые N", "edit.rule.daily": "Каждый день", "edit.rule.weekdays": "С понедельника по пятницу", "edit.rule.weekly": "Еженедельно", "edit.rule.cron": "Произвольно",
			"edit.unit.hours": "часы", "edit.unit.minutes": "минуты", "edit.unit.seconds": "секунды",
			"edit.intervalHint": "Минимум 60 секунд. Фиксированные интервалы не зависят от часового пояса.",
			"edit.onceZoneHint": "Однократная задача хранит только момент запуска. Дата и время интерпретируются в выбранном часовом поясе.",
			"edit.cronHint": "Используйте Cron из пяти полей. Правило вычисляется в выбранном часовом поясе IANA.",
			"edit.inactive": "Неактивные задачи доступны только для чтения.", "edit.unsaved": "Есть несохранённые изменения", "edit.cancel": "Отменить", "edit.save": "Сохранить", "edit.saving": "Сохранение…", "edit.saved": "Задача обновлена.",
			"edit.invalidTitle": "Введите название задачи длиной не более 120 символов.", "edit.invalidPrompt": "Введите инструкцию задачи.", "edit.invalidInterval": "Укажите интервал не менее 60 секунд.", "edit.invalidZone": "Укажите корректный часовой пояс IANA, например Europe/Moscow.", "edit.invalidDateTime": "Укажите корректные дату и время.", "edit.invalidWeekdays": "Выберите хотя бы один день недели.", "edit.invalidCron": "Введите Cron-выражение из пяти полей, например 0 9 * * 1-5.",
			"edit.conflict": "Задача изменилась во время редактирования. Черновик сохранён; проверьте актуальные значения и сохраните ещё раз.", "edit.ended": "Задача уже неактивна и больше не может быть изменена.", "edit.notFound": "Задача больше недоступна.", "edit.saveFailed": "Не удалось подтвердить обновление задачи. Черновик сохранён.",
			"history.title": "История доставок", "history.loading": "Загрузка…", "history.empty": "Сохранённых доставок пока нет.", "history.error": "Не удалось загрузить историю доставок.", "history.retry": "Повторить загрузку истории", "history.refresh": "Обновить историю доставок", "history.more": "Загрузить более старые записи", "history.occurrence": "Срабатывание {value}", "history.ack": "Подтверждено {value}", "history.legacyPrompt": "Снимок инструкции недоступен для этой старой записи", "history.copyId": "Копировать ID сообщения", "history.copied": "Скопировано",
			"history.pruned": "Старые записи удалены. Хранение: {days} дней / {records} записей на задачу.", "history.code.schedule_not_found": "Эта задача больше не существует.", "history.code.delivery_cursor_not_found": "Курсор истории устарел. Обновите историю доставок.", "history.code.unknown": "Не удалось загрузить историю доставок.",
			"session.available": "Открыть исходный диалог", "session.loading": "Метаданные диалога ещё загружаются", "session.archived": "Исходный диалог находится в архиве", "session.unavailable": "Исходный диалог недоступен",
			"empty.loading": "Загрузка запланированных задач", "empty.error": "Не удалось загрузить расписание", "empty.errorHint": "Не удалось прочитать каталог Host Schedule из DSH rc2.", "empty.inactive": "Нет неактивных задач автоматизации", "empty.filtered": "Подходящих задач нет", "empty.filteredHint": "Измените строку поиска или фильтры.", "empty.none": "Нет активных запланированных задач", "empty.noneHint": "Создайте напоминание в диалоге. Плагин использует нативный каталог Host Schedule DSH 0.1.7-rc.2.",
			"list.aria": "Запланированные задачи", "sidebar.summary": "{newCount} новых · {deliveryCount} результатов · {total} активных · {overdue} просрочено · {recurring} повторяющихся"
		};

		const inject = ["slots", "locale", "remote", "remote.schedule", "sessions", "workspaces", "uiWorkspace"];
		function apply(ctx) {
			hostCtx = ctx;
			catalog = createCatalogSource(ctx);
			if (!captureNativeScheduleMain(ctx)) throw new Error("native DSH schedule manager is unavailable");
			const deliveryToast = createDeliveryToastSource();
			ctx.effect(() => ctx.locale.register(NS, { en, zh, ru }), "schedule-control-center: dictionaries");
			ctx.effect(() => startDeliveryAttentionBaseline(catalog), "schedule-control-center: delivery baseline");
			ctx.effect(() => startDeliveryRefreshFallback(catalog), "schedule-control-center: delivery refresh fallback");
			ctx.slots.inject("shell.overlay", () => ctx.slots.register({
				name: "shell.overlay",
				id: "schedule-control-center.delivery-toast",
				locale: NS,
				inject: () => ({
					hooks: { ...deliveryToast.hooks, catalog },
					report: deliveryToast.report,
					dismiss: deliveryToast.dismiss,
					openRecord: (record) => {
						markRecordSeen(record);
						ctx.uiWorkspace.openSession(record.sessionId);
					}
				})
			}, DeliveryToast));
			ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
				name: "sidebar.panellist",
				id: PANEL_ID,
				order: 10,
				priority: -100,
				locale: NS,
				label: () => ctx.locale.bind(NS)("tab")
			}, ScheduleGlyph));
			ctx.slots.inject("main", () => ctx.slots.register({
				name: "main",
				key: PANEL_ID,
				priority: -100,
				locale: NS
			}, SchedulePanel));
		}
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

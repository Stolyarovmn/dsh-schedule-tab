window.__ModuleLoader__.load({
	id: "@stolyarovmn/dsh-client-ui-schedule-control-center",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		const react = require("react");
		const jsx = require("react/jsx-runtime");
		const primitives = require("@deepseek-ai/dsh-client-ui-primitives");

		const PACKAGE = "@stolyarovmn/dsh-client-ui-schedule-control-center";
		const PANEL_ID = "schedule-control-center";
		const NS = "schedule-control-center";
		const TASK_KIND = "scheduleTask";
		const HISTORY_PAGE = 20;
		const SEEN_STORAGE_KEY = PACKAGE + "/seen-v1";
		const MAX_SEEN_IDS = 4000;
		const ClockIcon = primitives.IconAlarmClockOutlineRegular
			?? primitives.IconClockOutlineRegular
			?? primitives.IconClockOutline16
			?? primitives.IconAlarmClockOutline16
			?? null;
		const EditIcon = primitives.IconEditOutlineRegular;
		const HistoryIcon = primitives.IconFlatListOutlineRegular ?? primitives.IconListPenOutlineRegular ?? primitives.IconClockOutlineRegular;
		const ConversationIcon = primitives.IconNewChatOutlineRegular ?? primitives.IconLinkOutlineRegular;
		const TrashIcon = primitives.IconTrashOutlineRegular;
		const CopyIcon = primitives.IconCopyOutlineRegular;
		const PlusIcon = primitives.IconPlusOutlineRegular;
		const SearchIcon = primitives.IconSearchOutlineRegular;
		const WarningIcon = primitives.IconWarningOutlineRegular;

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
			".scc_action{border-radius:7px;padding:4px 8px}",
			".scc_iconButton{width:28px!important;min-width:28px!important;height:28px!important;padding:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important}",
			".scc_iconButtonActive{background:var(--dsw-alias-interactive-bg-selected,var(--dsw-alias-interactive-bg-hover,transparent))!important;color:var(--dsw-alias-interactive-primary)!important}",
			".scc_iconButtonDanger{color:var(--dsw-alias-state-danger-label,var(--dsw-alias-state-warn-label))!important}",
			".scc_iconButtonDanger:hover{background:var(--dsw-alias-state-danger-tertiary,var(--dsw-alias-state-warn-tertiary))!important}",
			".scc_confirmTask{margin:0;font-size:14px;font-weight:600;color:var(--dsw-alias-label-primary);overflow-wrap:anywhere}",
			".scc_chip:hover,.scc_action:hover{background:var(--dsw-alias-interactive-bg-hover,transparent)}",
			".scc_chip:focus-visible,.scc_action:focus-visible{border-color:var(--dsw-alias-focus-primary,var(--dsw-alias-interactive-primary))}",
			".scc_chipActive{border-color:var(--dsw-alias-interactive-primary);color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-selected,var(--dsw-alias-interactive-bg-hover,transparent))}",
			".scc_actionPrimary{border-color:var(--dsw-alias-interactive-primary);color:var(--dsw-alias-interactive-primary)}",
			".scc_actionDanger{color:var(--dsw-alias-state-danger-label,var(--dsw-alias-state-warn-label));border-color:var(--dsw-alias-state-danger-primary,var(--dsw-alias-state-warn-primary))}",
			".scc_action:disabled{opacity:.45;cursor:default}",
			".scc_banner{margin:8px 12px 0;padding:8px 10px;border:0.5px solid var(--dsw-alias-state-warn-primary);border-radius:9px;color:var(--dsw-alias-state-warn-label);background:var(--dsw-alias-state-warn-tertiary);display:flex;align-items:center;gap:8px;font-size:12px}",
			".scc_body{flex:1;min-height:0;display:flex}",
			".scc_list{flex:1;overflow:auto;margin:0;padding:8px;display:flex;flex-direction:column;gap:12px;--dsh-scrollbar-thumb:var(--dsh-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsh-alias-scrollbar-hover-l2)}",
			".scc_group{display:flex;flex-direction:column;gap:6px}",
			".scc_groupHeader{display:flex;align-items:center;gap:7px;padding:1px 5px;color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:600;line-height:18px}",
			".scc_groupCount{color:var(--dsw-alias-label-tertiary);font-weight:400}",
			".scc_groupList{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:6px}",
			".scc_row{box-sizing:border-box;border:0.5px solid var(--dsw-alias-border-l1);border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:8px;flex:none;cursor:pointer;outline:none}",
			".scc_row:hover{border-color:var(--dsw-alias-border-l2);background:var(--dsw-alias-interactive-bg-hover,transparent)}",
			".scc_row:focus-visible{border-color:var(--dsw-alias-focus-primary,var(--dsw-alias-interactive-primary))}",
			".scc_rowOverdue{border-color:var(--dsw-alias-state-warn-primary);background:var(--dsw-alias-state-warn-tertiary)}",
			".scc_rowInactive{opacity:.8}",
			".scc_rowTitle{font-size:14px;font-weight:600;line-height:20px;overflow-wrap:anywhere}",
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
			".scc_actionState{font-size:12px;color:var(--dsw-alias-label-tertiary)}",
			".scc_actionError{color:var(--dsw-alias-state-danger-label,var(--dsw-alias-state-warn-label))}",
			".scc_detail{border-top:0.5px solid var(--dsw-alias-border-l1);padding-top:10px;display:flex;flex-direction:column;gap:9px;cursor:default}",
			".scc_detailTitle{font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary)}",
			".scc_history{display:flex;flex-direction:column;gap:7px}",
			".scc_historyRow{display:grid;grid-template-columns:minmax(155px,auto) minmax(155px,auto) minmax(180px,1fr) auto;gap:8px;align-items:start;font-size:12px;line-height:17px;color:var(--dsw-alias-label-tertiary)}",
			".scc_historyPrompt{color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;white-space:pre-wrap}",
			".scc_historyId{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:var(--dsw-alias-label-tertiary);font-size:11px;overflow-wrap:anywhere}",
			".scc_historyNote{font-size:12px;color:var(--dsw-alias-label-tertiary)}",
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
			"@media(max-width:760px){.scc_historyRow{grid-template-columns:1fr}.scc_header{padding-left:12px;padding-right:12px}}"
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

		function readSeen() {
			try {
				const value = JSON.parse(window.localStorage?.getItem?.(SEEN_STORAGE_KEY) ?? "[]");
				return new Set(Array.isArray(value) ? value.filter((x) => typeof x === "string").slice(-MAX_SEEN_IDS) : []);
			} catch { return new Set(); }
		}
		function writeSeen(seen) {
			try { window.localStorage?.setItem?.(SEEN_STORAGE_KEY, JSON.stringify([...seen].slice(-MAX_SEEN_IDS))); } catch {}
		}
		function markSeen(records) {
			const seen = readSeen(); let changed = false;
			for (const record of records) {
				if (record.status !== "active") continue;
				const id = identity(record);
				if (seen.has(id)) continue;
				seen.add(id); changed = true;
			}
			if (changed) writeSeen(seen);
			return changed;
		}
		function notificationSummary(records, now) {
			const seen = readSeen(); let total = 0, unread = 0, unreadOverdue = 0, overdue = 0, recurring = 0;
			for (const record of records) {
				if (record.status !== "active") continue;
				total += 1;
				const over = isOverdue(record, now); if (over) overdue += 1;
				if (isRecurring(record)) recurring += 1;
				if (seen.has(identity(record))) continue;
				unread += 1; if (over) unreadOverdue += 1;
			}
			return { total, unread, unreadOverdue, overdue, recurring };
		}
		function notificationSignature(records) {
			return records.filter((record) => record.status === "active").map(identity).sort().join("|");
		}

		let cancelPendingTaskOpen = null;
		function openNativeTask(record) {
			cancelPendingTaskOpen?.();
			cancelPendingTaskOpen = null;
			const mounted = hostCtx.sidebarRight.mounted;
			const open = () => hostCtx.sidebarRight.openTab(TASK_KIND, { params: { sessionId: record.sessionId, id: record.id } });
			if (mounted.getSnapshot() === record.sessionId) {
				open();
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
		function syncSessionMarkStyles(records, now) {
			if (typeof document === "undefined") return;
			const seen = readSeen();
			const states = new Map();
			for (const record of records) {
				if (record.status !== "active" || seen.has(identity(record))) continue;
				const state = states.get(record.sessionId) ?? { overdue: false };
				state.overdue ||= isOverdue(record, now); states.set(record.sessionId, state);
			}
			const id = PACKAGE + "/session-marks.css";
			let style = document.querySelector('style[data-plugin-css="' + id + '"]');
			if (!style) { style = document.createElement("style"); style.dataset.plugin = PACKAGE; style.dataset.pluginCss = id; document.head.appendChild(style); }
			style.textContent = [...states.entries()].map(([sessionId, state]) => {
				const color = state.overdue ? "var(--dsw-alias-state-warn-primary)" : "var(--dsw-alias-state-business-primary)";
				return '[data-row-key="session:' + cssEscape(sessionId) + '"] [data-session-schedule-mark]{color:' + color + ' !important}';
			}).join("");
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
			const [seenRev, setSeenRev] = react.useState(0);
			const signature = notificationSignature(state.records);
			react.useEffect(() => {
				if (!active || state.status !== "ready") return;
				if (markSeen(state.records)) setSeenRev((value) => value + 1);
			}, [active, state.status, signature]);
			const now = Date.now();
			const summary = notificationSummary(state.records, now);
			react.useEffect(() => { syncSessionMarkStyles(state.records, now); }, [signature, seenRev, state.status]);
			const compact = (size ?? 16) > 16;
			const hasUnread = summary.unread > 0;
			const warn = summary.unreadOverdue > 0;
			const className = "scc_sidebarGlyph" + (hasUnread ? " scc_sidebarNew" : "") + (warn ? " scc_sidebarWarn" : "");
			const title = t("sidebar.summary", { newCount: summary.unread, total: summary.total, overdue: summary.overdue, recurring: summary.recurring });
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

		function historyInitial() { return { records: [], loading: false, error: null, errorCode: null, nextBefore: undefined, earlierRecordsPruned: false, retention: undefined, loaded: false }; }

		function SchedulePanel({ t }) {
			const catalogState = useObservable(catalog);
			const { sessions, workspaces } = useSessionSnapshots();
			const locale = (typeof document !== "undefined" && document.documentElement?.lang) || undefined;
			const [query, setQuery] = react.useState("");
			const [filter, setFilter] = react.useState("active");
			const [grouping, setGrouping] = react.useState("date");
			const [now, setNow] = react.useState(() => Date.now());
			const [historyOpen, setHistoryOpen] = react.useState(null);
			const [histories, setHistories] = react.useState({});
			const [confirmDeleteRecord, setConfirmDeleteRecord] = react.useState(null);
			const [toast, setToast] = react.useState(null);
			const [copiedMessageId, setCopiedMessageId] = react.useState(null);
			const toastSeq = react.useRef(0);
			const historySeq = react.useRef(new Map());
			const hasActive = catalogState.records.some((record) => record.status === "active");
			react.useEffect(() => {
				if (!hasActive) return;
				const timer = window.setInterval(() => setNow(Date.now()), 1000);
				return () => window.clearInterval(timer);
			}, [hasActive]);

			const ordered = orderRows(catalogState.records, now);
			const visible = filterRows(ordered, query, filter, now, sessions);
			const groups = groupsFor(visible, grouping, now, sessions, t, locale);
			const hasControls = query.trim() !== "" || filter !== "active";

			const showToast = (kind, text) => setToast({ kind, text, seq: ++toastSeq.current });
			const openTask = (record, event) => {
				event?.stopPropagation?.();
				if (sessionLinkState(record.sessionId, sessions, workspaces) !== "available") {
					showToast("warning", t("detail.unavailable"));
					return;
				}
				openNativeTask(record);
			};
			const openSession = (record, event) => {
				event?.stopPropagation?.();
				if (sessionLinkState(record.sessionId, sessions, workspaces) !== "available") return;
				hostCtx.uiWorkspace.openSession(record.sessionId);
			};

			const loadHistory = async (record, mode = "initial") => {
				const key = identity(record);
				const current = histories[key] ?? historyInitial();
				const seq = (historySeq.current.get(key) ?? 0) + 1;
				historySeq.current.set(key, seq);
				setHistories((state) => ({ ...state, [key]: { ...(state[key] ?? historyInitial()), loading: true, error: null, errorCode: null } }));
				const request = { sessionId: record.sessionId, id: record.id, limit: HISTORY_PAGE };
				if (mode === "more" && current.nextBefore) request.before = current.nextBefore;
				let result;
				try { result = await hostCtx.remote.schedule.history(request); }
				catch (error) {
					if (historySeq.current.get(key) !== seq) return;
					setHistories((state) => ({ ...state, [key]: { ...(state[key] ?? historyInitial()), loading: false, error: error?.message ?? t("history.error"), errorCode: "transport" } }));
					return;
				}
				if (historySeq.current.get(key) !== seq) return;
				if (!result?.ok) {
					setHistories((state) => ({ ...state, [key]: { ...(state[key] ?? historyInitial()), loading: false, error: result?.error?.message ?? t("history.error"), errorCode: "remote" } }));
					return;
				}
				if (!Array.isArray(result.value?.records)) {
					const code = result.value?.code ?? "unknown";
					setHistories((state) => ({ ...state, [key]: { ...(state[key] ?? historyInitial()), loading: false, error: t("history.code." + code), errorCode: code } }));
					return;
				}
				const value = result.value;
				setHistories((state) => {
					const previous = state[key] ?? historyInitial();
					return { ...state, [key]: {
						...previous,
						loading: false,
						loaded: true,
						error: null,
						errorCode: null,
						records: mode === "more" ? [...previous.records, ...value.records] : value.records,
						nextBefore: value.nextBefore,
						earlierRecordsPruned: value.earlierRecordsPruned === true,
						retention: value.retention
					} };
				});
			};
			const toggleHistory = (record, event) => {
				event?.stopPropagation?.();
				const key = identity(record);
				if (historyOpen === key) { setHistoryOpen(null); return; }
				setHistoryOpen(key);
				if (!(histories[key]?.loaded || histories[key]?.loading)) void loadHistory(record, "initial");
			};
			const openHistoryRecord = historyOpen === null
				? undefined
				: catalogState.records.find((record) => identity(record) === historyOpen);
			const openHistoryState = historyOpen === null ? undefined : histories[historyOpen];
			const openLatestMessageId = openHistoryRecord?.lastDelivery?.messageId;
			const loadedLatestMessageId = openHistoryState?.records?.[0]?.messageId;
			react.useEffect(() => {
				if (!openHistoryRecord || !openHistoryState?.loaded || openHistoryState.loading || openHistoryState.error) return;
				if (!openLatestMessageId || openLatestMessageId === loadedLatestMessageId) return;
				void loadHistory(openHistoryRecord, "initial");
			}, [historyOpen, openLatestMessageId, loadedLatestMessageId]);
			const requestDelete = (record, event) => {
				event?.stopPropagation?.();
				setConfirmDeleteRecord(record);
			};
			const confirmDelete = async () => {
				const record = confirmDeleteRecord;
				if (!record) return;
				setConfirmDeleteRecord(null);
				const outcome = await catalog.remove(record);
				if (outcome === "deleted") showToast("success", t("toast.deleted"));
				else if (outcome === "gone") showToast("success", t("toast.gone"));
				else if (outcome !== "pending") showToast("warning", t("toast.deleteFailed"));
			};
			const copyMessageId = async (messageId, event) => {
				event?.stopPropagation?.();
				if (!await primitives.writeClipboard(messageId)) return;
				setCopiedMessageId(messageId);
				window.setTimeout(() => setCopiedMessageId((current) => current === messageId ? null : current), 1500);
			};

			const renderHistory = (record) => {
				const state = histories[identity(record)] ?? historyInitial();
				const zone = recordZone(record);
				const finalPage = state.loaded && !state.nextBefore;
				const showPruned = finalPage && state.records.length > 0 && state.earlierRecordsPruned;
				return jsx.jsxs("div", {
					className: "scc_detail",
					onClick: (event) => event.stopPropagation(),
					children: [
						jsx.jsx("div", { className: "scc_detailTitle", children: t("history.title") }),
						state.loading && state.records.length === 0 ? jsx.jsx("div", { className: "scc_historyNote", children: t("history.loading") }) : null,
						state.records.length > 0 ? jsx.jsx("div", {
							className: "scc_history",
							children: state.records.map((item) => jsx.jsxs("div", {
								className: "scc_historyRow",
								children: [
									jsx.jsx("span", { children: t("history.occurrence", { value: formatInstant(item.scheduledAt, locale, zone) }) }),
									jsx.jsx("span", { children: t("history.ack", { value: formatInstant(item.deliveredAt, locale, undefined) }) }),
									jsx.jsxs("span", { children: [
										jsx.jsx("span", { className: "scc_historyPrompt", children: item.prompt ?? t("history.legacyPrompt") }),
										jsx.jsx("div", { className: "scc_historyId", children: item.messageId })
									] }),
									jsx.jsx(primitives.Tooltip, {
										label: t(copiedMessageId === item.messageId ? "history.copied" : "history.copyId"),
										side: "top",
										portal: true,
										children: jsx.jsx(primitives.Button, {
											size: "sm",
											className: "scc_iconButton",
											"aria-label": t(copiedMessageId === item.messageId ? "history.copied" : "history.copyId"),
											onClick: (event) => void copyMessageId(item.messageId, event),
											children: CopyIcon ? jsx.jsx(CopyIcon, { size: 16 }) : null
										})
									})
								]
							}, item.messageId))
						}) : null,
						state.loaded && state.records.length === 0 && !state.error ? jsx.jsx("div", { className: "scc_historyNote", children: t("history.empty") }) : null,
						state.error ? jsx.jsxs("div", { className: "scc_banner", children: [
							jsx.jsx("span", { children: state.error }),
							jsx.jsx("button", { type: "button", className: "scc_action", onClick: () => void loadHistory(record, state.errorCode === "delivery_cursor_not_found" ? "initial" : (state.nextBefore ? "more" : "initial")), children: t(state.errorCode === "delivery_cursor_not_found" ? "history.refresh" : "history.retry") })
						] }) : null,
						state.nextBefore ? jsx.jsx("button", { type: "button", className: "scc_action", disabled: state.loading, onClick: () => void loadHistory(record, "more"), children: state.loading ? t("history.loading") : t("history.more") }) : null,
						showPruned ? jsx.jsx("div", { className: "scc_historyNote", children: t("history.pruned", { days: state.retention?.days ?? "?", records: state.retention?.records ?? "?" }) }) : null
					]
				});
			};

			return jsx.jsxs("div", {
				className: "scc_root",
				children: [
					jsx.jsxs("header", { className: "scc_header", children: [
						jsx.jsx("span", { className: "scc_title", children: t("header") }),
						jsx.jsx("span", { className: "scc_count", children: t("count", { visible: visible.length, total: catalogState.records.length }) }),
						jsx.jsx("span", { className: "scc_spacer" }),
						jsx.jsx(primitives.Button, {
							variant: "primary",
							size: "sm",
							icon: PlusIcon ? jsx.jsx(PlusIcon, { size: 14 }) : null,
							onClick: () => hostCtx.uiWorkspace.startSession(),
							children: t("new")
						})
					] }),
					jsx.jsxs("div", { className: "scc_toolbar", children: [
						jsx.jsx(primitives.Input, {
							className: "scc_searchNative",
							type: "search",
							icon: SearchIcon ? jsx.jsx(SearchIcon, { size: 16 }) : null,
							value: query,
							placeholder: t("search.placeholder"),
							"aria-label": t("search.aria"),
							onChange: (event) => setQuery(event.target.value)
						}),
						jsx.jsxs("div", { className: "scc_toolbarRow", children: [
							jsx.jsx("div", { className: "scc_filters", children: ["active", "all", "inactive", "today", "overdue", "recurring"].map((name) => jsx.jsx("button", { type: "button", className: "scc_chip" + (filter === name ? " scc_chipActive" : ""), "aria-pressed": filter === name, onClick: () => setFilter(name), children: t("filter." + name) }, name)) }),
							jsx.jsxs("div", { className: "scc_grouping", children: [
								jsx.jsx("span", { className: "scc_groupLabel", children: t("group.by") }),
								...["date", "session"].map((name) => jsx.jsx("button", { type: "button", className: "scc_chip" + (grouping === name ? " scc_chipActive" : ""), "aria-pressed": grouping === name, onClick: () => setGrouping(name), children: t("group." + name) }, name))
							] })
						] })
					] }),
					catalogState.status === "error" && catalogState.records.length > 0 ? jsx.jsxs("div", { className: "scc_banner", children: [jsx.jsx("span", { children: t("catalog.stale") }), jsx.jsx("button", { type: "button", className: "scc_action", onClick: () => void catalog.refresh(catalogState.readRequest), children: t("retry") })] }) : null,
					jsx.jsx("div", { className: "scc_body", children: visible.length === 0 ? jsx.jsxs("div", { className: "scc_empty", children: [
						jsx.jsx("span", { className: "scc_emptyIcon", children: ClockIcon ? jsx.jsx(ClockIcon, { size: 28 }) : null }),
						jsx.jsx("div", { className: "scc_emptyTitle", children: catalogState.status === "loading" && !catalogState.settled ? t("empty.loading") : catalogState.status === "error" && !catalogState.settled ? t("empty.error") : hasControls ? t("empty.filtered") : t("empty.none") }),
						jsx.jsx("div", { className: "scc_emptyHint", children: catalogState.status === "error" && !catalogState.settled ? t("empty.errorHint") : hasControls ? t("empty.filteredHint") : t("empty.noneHint") }),
						catalogState.status === "error" ? jsx.jsx("button", { type: "button", className: "scc_action", onClick: () => void catalog.refresh(catalogState.readRequest), children: t("retry") }) : null
					] }) : jsx.jsx("div", { className: "scc_list", role: "list", "aria-label": t("list.aria"), children: groups.map((group) => jsx.jsxs("section", { className: "scc_group", children: [
						jsx.jsxs("div", { className: "scc_groupHeader", children: [jsx.jsx("span", { children: group.label }), jsx.jsx("span", { className: "scc_groupCount", children: group.records.length })] }),
						jsx.jsx("ul", { className: "scc_groupList", children: group.records.map((record) => {
							const key = identity(record);
							const overdue = isOverdue(record, now);
							const deleting = catalogState.deleting.includes(record.id);
							const source = sessionTitle(record.sessionId, sessions);
							const linkState = sessionLinkState(record.sessionId, sessions, workspaces);
							const nextOrLast = record.status === "active"
								? t("next", { value: formatInstant(record.scheduledAt, locale, undefined) })
								: record.lastDelivery ? t("lastOccurrence", { value: formatInstant(record.lastDelivery.scheduledAt, locale, recordZone(record)) }) : t("inactive.noDelivery");
							return jsx.jsxs("li", {
								className: "scc_row" + (overdue ? " scc_rowOverdue" : "") + (record.status === "inactive" ? " scc_rowInactive" : ""),
								role: "button", tabIndex: 0,
								onClick: (event) => openTask(record, event),
								onKeyDown: (event) => {
									if (event.key !== "Enter" && event.key !== " ") return;
									event.preventDefault();
									openTask(record, event);
								},
								children: [
									jsx.jsx("div", { className: "scc_rowTitle", children: taskTitle(record) }),
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
										record.status === "active" ? jsx.jsxs(jsx.Fragment, { children: [jsx.jsx("span", { className: "scc_sep", children: "·" }), jsx.jsx("span", { children: relative(record.scheduledAt, now, t) })] }) : null,
										record.lastDelivery ? jsx.jsxs(jsx.Fragment, { children: [jsx.jsx("span", { className: "scc_sep", children: "·" }), jsx.jsx("span", { children: t("acknowledged", { value: formatInstant(record.lastDelivery.deliveredAt, locale, undefined) }) })] }) : null
									] }),
									jsx.jsxs("div", { className: "scc_source", children: [jsx.jsx("span", { children: t("source") }), jsx.jsx("span", { className: "scc_sourceName", title: source, children: source })] }),
									jsx.jsxs("div", { className: "scc_actions", onClick: (event) => event.stopPropagation(), children: [
										jsx.jsx(primitives.Tooltip, {
											label: t("action.details"),
											side: "top",
											portal: true,
											children: jsx.jsx(primitives.Button, {
												size: "sm",
												className: "scc_iconButton",
												"aria-label": t("action.details"),
												onClick: (event) => openTask(record, event),
												children: EditIcon ? jsx.jsx(EditIcon, { size: 16 }) : null
											})
										}),
										jsx.jsx(primitives.Tooltip, {
											label: t(historyOpen === key ? "action.hideHistory" : "action.history"),
											side: "top",
											portal: true,
											children: jsx.jsx(primitives.Button, {
												size: "sm",
												className: "scc_iconButton" + (historyOpen === key ? " scc_iconButtonActive" : ""),
												"aria-label": t(historyOpen === key ? "action.hideHistory" : "action.history"),
												"aria-pressed": historyOpen === key,
												onClick: (event) => toggleHistory(record, event),
												children: HistoryIcon ? jsx.jsx(HistoryIcon, { size: 16 }) : null
											})
										}),
										jsx.jsx(primitives.Tooltip, {
											label: t("session." + linkState),
											side: "top",
											portal: true,
											children: jsx.jsx(primitives.Button, {
												size: "sm",
												className: "scc_iconButton",
												disabled: linkState !== "available",
												"aria-label": t("action.conversation"),
												onClick: (event) => openSession(record, event),
												children: ConversationIcon ? jsx.jsx(ConversationIcon, { size: 16 }) : null
											})
										}),
										jsx.jsx(primitives.Tooltip, {
											label: deleting ? t("delete.pending") : t("action.delete"),
											side: "top",
											portal: true,
											children: jsx.jsx(primitives.Button, {
												size: "sm",
												className: "scc_iconButton scc_iconButtonDanger",
												disabled: deleting,
												"aria-label": deleting ? t("delete.pending") : t("action.delete"),
												onClick: (event) => requestDelete(record, event),
												children: TrashIcon ? jsx.jsx(TrashIcon, { size: 16 }) : null
											})
										})
									] }),
									historyOpen === key ? renderHistory(record) : null
								]
							}, key);
						}) })
					] }, group.key)) }) }),
					jsx.jsx(primitives.Modal, {
						open: confirmDeleteRecord !== null,
						title: t("delete.title"),
						description: t("delete.description"),
						closeLabel: t("delete.close"),
						onClose: () => setConfirmDeleteRecord(null),
						footer: confirmDeleteRecord === null ? null : jsx.jsxs("div", {
							className: "scc_actions",
							children: [
								jsx.jsx(primitives.Button, {
									variant: "outline",
									onClick: () => setConfirmDeleteRecord(null),
									children: t("delete.cancel")
								}),
								jsx.jsx(primitives.Button, {
									className: "scc_iconButtonDanger",
									disabled: catalogState.deleting.includes(confirmDeleteRecord.id),
									"data-modal-autofocus": true,
									onClick: () => void confirmDelete(),
									children: t("delete.confirmAction")
								})
							]
						}),
						children: confirmDeleteRecord === null ? null : jsx.jsx("p", {
							className: "scc_confirmTask",
							children: taskTitle(confirmDeleteRecord)
						})
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
			"tab": "Schedule+",
			"header": "Schedule control center",
			"count": "{visible} / {total} tasks",
			"new": "New reminder",
			"retry": "Retry",
			"catalog.stale": "Could not refresh tasks. Showing the last successful catalog.",
			"search.placeholder": "Search title, reminder, task ID or dialog…",
			"search.aria": "Search scheduled tasks",
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
			"inactive.noDelivery": "No saved delivery",
			"source": "From",
			"action.details": "Open details / edit",
			"action.history": "Delivery history",
			"action.hideHistory": "Hide history",
			"action.conversation": "Conversation",
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
			"detail.unavailable": "Open the native task editor from Automation tasks because the original conversation is unavailable.",
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
			"empty.filtered": "No matching tasks",
			"empty.filteredHint": "Adjust the search text or filters.",
			"empty.none": "No active scheduled tasks",
			"empty.noneHint": "Create a reminder in a conversation. This plugin reads only the native DSH 0.1.7-rc.2 Host Schedule catalog.",
			"list.aria": "Scheduled tasks",
			"sidebar.summary": "{newCount} new · {total} active · {overdue} overdue · {recurring} recurring"
		};
		const zh = {
			...en,
			"tab": "日程+",
			"header": "日程控制中心",
			"new": "新建提醒",
			"retry": "重试",
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
			"action.details": "详情 / 编辑",
			"action.history": "投递历史",
			"action.hideHistory": "隐藏历史",
			"action.conversation": "对话",
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
			"detail.unavailable": "原会话不可用；请从 Automation tasks 打开原生任务编辑器。",
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
			"empty.filtered": "没有匹配的任务",
			"empty.none": "没有活动的计划任务"
		};

		const inject = ["slots", "locale", "remote", "remote.schedule", "sessions", "workspaces", "uiWorkspace", "sidebarRight"];
		function apply(ctx) {
			hostCtx = ctx;
			catalog = createCatalogSource(ctx);
			ctx.effect(() => ctx.locale.register(NS, { en, zh }), "schedule-control-center: dictionaries");
			ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
				name: "sidebar.panellist",
				id: PANEL_ID,
				order: 9,
				locale: NS,
				label: () => ctx.locale.bind(NS)("tab")
			}, ScheduleGlyph));
			ctx.slots.inject("main", () => ctx.slots.register({
				name: "main",
				key: PANEL_ID,
				locale: NS
			}, SchedulePanel));
		}
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

window.__ModuleLoader__.load({
	id: "@stolyarovmn/dsh-client-ui-schedule-tab",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		let primitives = require("@deepseek-ai/dsh-client-ui-primitives");

		const css = [
			".st_root{height:100%;box-sizing:border-box;display:flex;flex-direction:column;background:var(--dsw-specific-page,transparent);color:var(--dsw-alias-label-primary);font-size:14px}",
			".st_header{flex:none;display:flex;align-items:baseline;gap:10px;padding:16px 20px 10px}",
			".st_title{font-size:16px;font-weight:600;line-height:24px}",
			".st_count{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:16px}",
			".st_toolbar{flex:none;padding:0 12px 10px;border-bottom:0.5px solid var(--dsw-alias-border-l1);display:flex;flex-direction:column;gap:8px}",
			".st_search{width:100%;box-sizing:border-box;border:0.5px solid var(--dsw-alias-border-l1);border-radius:9px;background:var(--dsw-alias-bg-base,transparent);color:var(--dsw-alias-label-primary);font:inherit;padding:8px 10px;outline:none}",
			".st_search::placeholder{color:var(--dsw-alias-label-tertiary)}",
			".st_search:focus{border-color:var(--dsw-alias-focus-primary,var(--dsw-alias-interactive-primary))}",
			".st_toolbarRow{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}",
			".st_filters,.st_grouping{display:flex;gap:5px;flex-wrap:wrap}",
			".st_chipButton{border:0.5px solid var(--dsw-alias-border-l1);border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;line-height:18px;padding:3px 9px;cursor:pointer;outline:none}",
			".st_chipButton:hover{background:var(--dsw-alias-interactive-bg-hover,transparent)}",
			".st_chipButton:focus-visible{border-color:var(--dsw-alias-focus-primary,var(--dsw-alias-interactive-primary))}",
			".st_chipButtonActive{border-color:var(--dsw-alias-interactive-primary);color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-selected,var(--dsw-alias-interactive-bg-hover,transparent))}",
			".st_groupLabel{color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px;margin-right:2px;align-self:center}",
			".st_body{flex:1;min-height:0;display:flex}",
			".st_empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:40px 24px;text-align:center}",
			".st_emptyIcon{color:var(--dsw-alias-label-tertiary);display:inline-flex}",
			".st_emptyTitle{font-size:14px;font-weight:600;color:var(--dsw-alias-label-secondary);line-height:20px}",
			".st_emptyHint{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:18px;max-width:440px;overflow-wrap:anywhere}",
			".st_list{flex:1;overflow:auto;margin:0;padding:8px;display:flex;flex-direction:column;gap:12px;--dsh-scrollbar-thumb:var(--dsh-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsh-alias-scrollbar-hover-l2)}",
			".st_group{display:flex;flex-direction:column;gap:6px}",
			".st_groupHeader{display:flex;align-items:center;gap:7px;padding:1px 5px;color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:600;line-height:18px}",
			".st_groupCount{color:var(--dsw-alias-label-tertiary);font-weight:400}",
			".st_groupList{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:6px}",
			".st_row{box-sizing:border-box;border:0.5px solid var(--dsw-alias-border-l1);border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:8px;flex:none;cursor:pointer;outline:none}",
			".st_row:hover{border-color:var(--dsw-alias-border-l2);background:var(--dsw-alias-interactive-bg-hover,transparent)}",
			".st_row:focus-visible{border-color:var(--dsw-alias-focus-primary,var(--dsw-alias-interactive-primary))}",
			".st_rowOverdue{border-color:var(--dsw-alias-state-warn-primary);background:var(--dsw-alias-state-warn-tertiary)}",
			".st_prompt{font-size:14px;line-height:20px;overflow-wrap:anywhere;white-space:normal}",
			".st_badges{display:flex;align-items:center;gap:6px;flex-wrap:wrap}",
			".st_badge{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:2px 7px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary);background:var(--dsw-alias-interactive-bg-hover,transparent)}",
			".st_badgeDot{width:6px;height:6px;border-radius:50%;background:var(--dsw-alias-state-business-primary);flex:none}",
			".st_badgeRunning{color:var(--dsw-alias-state-success-label,var(--dsw-alias-label-secondary))}",
			".st_badgeRunning .st_badgeDot{background:var(--dsw-alias-state-success-primary,var(--dsw-alias-state-business-primary))}",
			".st_badgeCurrent{color:var(--dsw-alias-label-secondary)}",
			".st_badgeRecurring{color:var(--dsw-alias-state-business-label,var(--dsw-alias-label-secondary));border:0.5px solid var(--dsw-alias-state-business-primary);background:var(--dsw-alias-state-business-tertiary,var(--dsw-alias-interactive-bg-hover,transparent))}",
			".st_status{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:2px 7px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary);background:var(--dsw-alias-interactive-bg-hover,transparent)}",
			".st_statusDot{width:6px;height:6px;border-radius:50%;background:var(--dsw-alias-state-business-primary);flex:none}",
			".st_rowOverdue .st_status{color:var(--dsw-alias-state-warn-label);background:var(--dsw-alias-state-warn-tertiary)}",
			".st_rowOverdue .st_statusDot{background:var(--dsw-alias-state-warn-primary)}",
			".st_meta{display:flex;flex-wrap:wrap;align-items:center;gap:6px;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:16px}",
			".st_metaSep{color:var(--dsw-alias-label-dimmed)}",
			".st_nextLabel{color:var(--dsw-alias-label-secondary);font-weight:500}",
			".st_source{display:flex;align-items:center;gap:6px;font-size:12px;line-height:16px;color:var(--dsw-alias-label-secondary);min-width:0}",
			".st_sourceLabel{color:var(--dsw-alias-label-tertiary);flex:none}",
			".st_sourceName{color:var(--dsw-alias-label-primary);font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
			".st_sidebarGlyph{display:inline-flex;align-items:center;justify-content:center;color:var(--dsw-alias-label-tertiary);transition:color 120ms ease}",
			".st_sidebarGlyph.st_sidebarNew{color:var(--dsw-alias-state-business-primary)}",
			".st_sidebarGlyph.st_sidebarWarn{color:var(--dsw-alias-state-warn-primary)}",
			"button:has(.st_sidebarGlyph[data-compact=\"false\"][data-has-count=\"true\"]){position:relative;padding-right:68px}",
			".st_sidebarCount{position:absolute;right:8px;top:50%;transform:translateY(-50%);min-width:50px;text-align:right;color:var(--dsw-alias-label-tertiary);font-size:12px;font-weight:500;line-height:18px;font-variant-numeric:tabular-nums;pointer-events:none}",
			".st_sidebarCountNew{color:var(--dsw-alias-state-business-primary);font-weight:600}",
			".st_sidebarCountWarn{color:var(--dsw-alias-state-warn-primary);font-weight:600}",
			".st_sidebarCountSep{color:var(--dsw-alias-label-dimmed);font-weight:400;margin:0 1px}",
			".st_sidebarCountTotal{color:var(--dsw-alias-label-tertiary);font-weight:500}",
			".st_sidebarDot{position:absolute;left:21px;top:6px;width:7px;height:7px;border-radius:50%;background:var(--dsw-alias-state-business-primary);box-shadow:0 0 0 2px var(--dsw-specific-sidebar,var(--dsw-specific-page,#111));pointer-events:none}",
			".st_sidebarWarn .st_sidebarDot{background:var(--dsw-alias-state-warn-primary)}",
			".st_instruction{font-size:13px;line-height:19px;color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere}",
			".st_badgeInactive{color:var(--dsw-alias-label-tertiary);border:0.5px solid var(--dsw-alias-border-l1)}",
			".st_badgeKind{color:var(--dsw-alias-label-secondary);border:0.5px solid var(--dsw-alias-border-l1)}",
			".st_actions{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:2px}",
			".st_action{border:0.5px solid var(--dsw-alias-border-l1);border-radius:7px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;line-height:18px;padding:4px 8px;cursor:pointer}",
			".st_action:hover{background:var(--dsw-alias-interactive-bg-hover,transparent)}",
			".st_actionDanger{color:var(--dsw-alias-state-danger-label,var(--dsw-alias-state-warn-label))}",
			".st_action:disabled{opacity:.45;cursor:default}",
			".st_actionState{font-size:12px;color:var(--dsw-alias-label-tertiary)}",
			".st_actionError{color:var(--dsw-alias-state-danger-label,var(--dsw-alias-state-warn-label))}",
			".st_detail{border-top:0.5px solid var(--dsw-alias-border-l1);padding-top:10px;display:flex;flex-direction:column;gap:9px}",
			".st_detailTitle{font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary)}",
			".st_history{display:flex;flex-direction:column;gap:7px}",
			".st_historyRow{display:grid;grid-template-columns:minmax(145px,auto) minmax(145px,auto) 1fr;gap:8px;font-size:12px;line-height:17px;color:var(--dsw-alias-label-tertiary)}",
			".st_historyPrompt{color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere}",
			".st_historyNote{font-size:12px;color:var(--dsw-alias-label-tertiary)}",
			".st_edit{display:grid;grid-template-columns:140px minmax(220px,1fr);gap:8px 10px;align-items:center}",
			".st_edit label{font-size:12px;color:var(--dsw-alias-label-tertiary)}",
			".st_input,.st_select,.st_textarea{box-sizing:border-box;width:100%;border:0.5px solid var(--dsw-alias-border-l1);border-radius:7px;background:var(--dsw-alias-bg-base,transparent);color:var(--dsw-alias-label-primary);font:inherit;padding:6px 8px;outline:none}",
			".st_textarea{min-height:66px;resize:vertical}",
			".st_weekdays{font-size:12px;color:var(--dsw-alias-label-tertiary)}",
			".st_rc2{display:inline-flex;align-items:center;border-radius:999px;padding:2px 7px;font-size:11px;line-height:16px;color:var(--dsw-alias-state-success-label,var(--dsw-alias-label-secondary));background:var(--dsw-alias-state-success-tertiary,var(--dsw-alias-interactive-bg-hover,transparent))}",
			"@media(max-width:760px){.st_edit{grid-template-columns:1fr}.st_historyRow{grid-template-columns:1fr}}"
		].join("");
		const tagId = "@stolyarovmn/dsh-client-ui-schedule-tab/SchedulePanel.module.css";
		if (typeof document !== "undefined" && document.querySelector('style[data-plugin-css="' + tagId + '"]') === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stolyarovmn/dsh-client-ui-schedule-tab";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}

		const SECOND_MS = 1e3;
		const SECOND_UNIT = { unit: "second", seconds: 1 };
		const UNIT_SECONDS = [
			{ unit: "day", seconds: 86400 },
			{ unit: "hour", seconds: 3600 },
			{ unit: "minute", seconds: 60 },
			SECOND_UNIT
		];
		function unitLabel(unit, value, t) {
			const pair = {
				day: ["unit.day.one", "unit.day.other"],
				hour: ["unit.hour.one", "unit.hour.other"],
				minute: ["unit.minute.one", "unit.minute.other"],
				second: ["unit.second.one", "unit.second.other"]
			}[unit];
			return t(value === 1 ? pair[0] : pair[1], { count: value });
		}
		function isRecurringSchedule(record) {
			return record?.kind === "every" || record?.kind === "daily" || record?.kind === "weekly" || record?.kind === "cron";
		}
		function formatWeekdays(weekdays) {
			if (!Array.isArray(weekdays)) return "";
			const base = new Date(Date.UTC(2026, 0, 5));
			const lang = (typeof document !== "undefined" && document.documentElement?.lang) || undefined;
			return weekdays.map((day) => {
				const date = new Date(base.getTime() + (Number(day) - 1) * 86400000);
				return new Intl.DateTimeFormat(lang, { weekday: "short", timeZone: "UTC" }).format(date);
			}).join(", ");
		}
		function trimClockTime(value) {
			return typeof value === "string" ? value.replace(/:00(?:\.000)?$/, "") : "";
		}
		function formatScheduleFrequency(record, t) {
			if (!isRecurringSchedule(record)) return t("frequency.once");
			if (record.kind === "daily") return t("frequency.daily", { time: trimClockTime(record.time), zone: record.timeZone ?? "UTC" });
			if (record.kind === "weekly") return t("frequency.weekly", {
				days: formatWeekdays(record.weekdays),
				time: trimClockTime(record.time),
				zone: record.timeZone ?? "UTC"
			});
			if (record.kind === "cron") return t("frequency.cron", { expression: record.expression ?? "", zone: record.timeZone ?? "UTC" });
			let selected = SECOND_UNIT;
			for (const candidate of UNIT_SECONDS) {
				if (record.everySeconds % candidate.seconds !== 0) continue;
				selected = candidate;
				break;
			}
			const value = record.everySeconds / selected.seconds;
			return t("frequency.every", { value, unit: unitLabel(selected.unit, value, t) });
		}
		function formatScheduleLocalTime(scheduledAt) {
			const lang = (typeof document !== "undefined" && document.documentElement?.lang) || undefined;
			return new Intl.DateTimeFormat(lang, { dateStyle: "medium", timeStyle: "short" }).format(Date.parse(scheduledAt));
		}
		function formatScheduleRelative(scheduledAt, now, t) {
			const difference = Date.parse(scheduledAt) - now;
			if (difference === 0) return t("relative.now");
			const absoluteSeconds = Math.abs(difference) / SECOND_MS;
			const selected = UNIT_SECONDS.find((candidate) => absoluteSeconds >= candidate.seconds) ?? SECOND_UNIT;
			const value = Math.max(1, difference > 0 ? Math.ceil(absoluteSeconds / selected.seconds) : Math.floor(absoluteSeconds / selected.seconds));
			const unit = unitLabel(selected.unit, value, t);
			return t(difference > 0 ? "relative.future" : "relative.overdue", { value, unit });
		}
		function formatScheduleGroupDate(timestamp) {
			const lang = (typeof document !== "undefined" && document.documentElement?.lang) || undefined;
			return new Intl.DateTimeFormat(lang, { weekday: "short", month: "short", day: "numeric" }).format(timestamp);
		}
		function sourceNameFor(session) {
			return session?.title ?? session?.displayTitle ?? session?.sessionId ?? session?.id ?? "";
		}
		function sessionIdFor(session) {
			return session?.sessionId ?? session?.id;
		}
		function scheduleRecordsFor(snapshot, id, session) {
			const shared = snapshot?.projectionsBySession?.[id]?.values?.schedule;
			if (Array.isArray(shared)) return shared;
			const legacy = session?.projectionValues?.schedule;
			return Array.isArray(legacy) ? legacy : undefined;
		}
		function snapshotEntries(snapshot) {
			if (Array.isArray(snapshot?.items)) {
				return snapshot.items.map((session) => [sessionIdFor(session), session]).filter(([id]) => id !== undefined);
			}
			const ids = snapshot?.ids ?? [];
			const byId = snapshot?.byId ?? {};
			return ids.map((id) => [id, byId[id]]).filter(([, session]) => session !== undefined);
		}
		function flattenScheduleRows(snapshot) {
			const out = [];
			for (const [id, session] of snapshotEntries(snapshot)) {
				const records = scheduleRecordsFor(snapshot, id, session);
				if (!Array.isArray(records) || records.length === 0) continue;
				for (const record of records) out.push({ session, record, sessionId: id });
			}
			return out;
		}
		function sessionForId(snapshot, sessionId) {
			for (const [id, session] of snapshotEntries(snapshot)) {
				if (id === sessionId || sessionIdFor(session) === sessionId || session?.id === sessionId) return session;
			}
			return undefined;
		}
		function catalogRows(records, snapshot) {
			if (!Array.isArray(records)) return [];
			return records.map((record) => ({
				session: sessionForId(snapshot, record.sessionId),
				record,
				sessionId: record.sessionId,
				catalog: true,
				status: record.status ?? "active",
				lastDelivery: record.lastDelivery
			}));
		}
		function rowIsActive(entry) {
			return entry?.status !== "inactive" && entry?.record?.status !== "inactive";
		}
		function rowIsOverdue(entry, now) {
			return rowIsActive(entry) && Date.parse(entry.record.scheduledAt) <= now;
		}
		function scheduleTitle(record) {
			return record?.title || record?.prompt || "";
		}
		function stripCatalogRecord(record) {
			const { sessionId, status, lastDelivery, ...expected } = record ?? {};
			return expected;
		}
		function remoteErrorMessage(result, fallback) {
			if (result?.ok === false) return result.error?.message ?? fallback;
			if (result?.value?.message) return result.value.message;
			if (result?.value?.code && !result.value.deleted && !result.value.updated) return result.value.code;
			return fallback;
		}
		function createHostCatalogStore(ctx) {
			const schedule = ctx?.remote?.schedule;
			if (typeof schedule?.catalog !== "function") return null;
			let snapshot = { records: [], status: "loading", settled: false };
			const listeners = new Set();
			let started = false;
			let disposers = [];
			let sequence = 0;
			const publish = (next) => {
				snapshot = next;
				for (const listener of [...listeners]) listener();
			};
			const refresh = async () => {
				const current = ++sequence;
				publish({ ...snapshot, status: "loading" });
				try {
					const result = await schedule.catalog();
					if (current !== sequence) return;
					if (result?.ok) publish({ records: result.value ?? [], status: "ready", settled: true });
					else publish({ ...snapshot, status: "error", settled: snapshot.settled });
				} catch {
					if (current === sequence) publish({ ...snapshot, status: "error", settled: snapshot.settled });
				}
			};
			const start = () => {
				if (started) return;
				started = true;
				if (typeof ctx.remote?.$on === "function") {
					const dispose = ctx.remote.$on("schedule/changed", () => { void refresh(); });
					if (typeof dispose === "function") disposers.push(dispose);
				}
				if (typeof ctx.on === "function") {
					const dispose = ctx.on("connection/reset", () => { void refresh(); });
					if (typeof dispose === "function") disposers.push(dispose);
				}
				void refresh();
			};
			return {
				getSnapshot: () => snapshot,
				subscribe(listener) {
					listeners.add(listener);
					start();
					return () => { listeners.delete(listener); };
				},
				refresh,
				async remove(sessionId, id) {
					const result = await schedule.delete({ sessionId, id });
					if (result?.ok) await refresh();
					return result;
				},
				async update(request) {
					const result = await schedule.update(request);
					if (result?.ok) await refresh();
					return result;
				},
				history: (request) => schedule.history(request)
			};
		}
		function useScheduleRows() {
			const sessions = hostCtx?.sessions;
			const [sessionSnapshot, setSessionSnapshot] = react.useState(() => sessions?.list?.getSnapshot());
			const [catalogSnapshot, setCatalogSnapshot] = react.useState(() => hostCatalogStore?.getSnapshot());
			react.useEffect(() => {
				if (typeof sessions?.list?.subscribe !== "function") return;
				return sessions.list.subscribe(() => setSessionSnapshot(sessions.list.getSnapshot()));
			}, []);
			react.useEffect(() => {
				if (!hostCatalogStore) return;
				return hostCatalogStore.subscribe(() => setCatalogSnapshot(hostCatalogStore.getSnapshot()));
			}, []);
			const hostMode = hostCatalogStore !== null;
			const canRefreshProjections = !hostMode && typeof sessions?.refreshProjections === "function";
			react.useEffect(() => {
				if (!canRefreshProjections) return;
				const projections = sessionSnapshot?.projectionsBySession ?? {};
				for (const [id] of snapshotEntries(sessionSnapshot)) {
					const state = projections[id]?.state;
					if (state !== undefined && state !== "idle") continue;
					Promise.resolve(sessions.refreshProjections(id)).catch(() => {});
				}
			}, [sessionSnapshot, canRefreshProjections]);
			return {
				sessionSnapshot,
				rows: hostMode ? catalogRows(catalogSnapshot?.records, sessionSnapshot) : flattenScheduleRows(sessionSnapshot),
				readState: hostMode ? (catalogSnapshot?.status ?? "loading") : projectionReadState(sessionSnapshot, canRefreshProjections),
				hostMode
			};
		}
		function projectionReadState(snapshot, canRefresh) {
			if (!canRefresh) return "ready";
			const entries = snapshotEntries(snapshot);
			if (entries.length === 0) return "ready";
			const projections = snapshot?.projectionsBySession ?? {};
			let hasPending = false;
			let hasError = false;
			let hasScheduleProjection = false;
			for (const [id, session] of entries) {
				const projection = projections[id];
				const state = projection?.state;
				if (state === undefined || state === "idle" || state === "loading") hasPending = true;
				else if (state === "error") hasError = true;
				const values = projection?.values;
				if (values && Object.prototype.hasOwnProperty.call(values, "schedule")) hasScheduleProjection = true;
				const legacy = session?.projectionValues;
				if (legacy && Object.prototype.hasOwnProperty.call(legacy, "schedule")) hasScheduleProjection = true;
			}
			if (hasPending) return "loading";
			if (hasError && !hasScheduleProjection) return "error";
			return hasScheduleProjection ? "ready" : "unavailable";
		}
		function orderScheduleRows(rows, now) {
			return rows
				.map((entry, index) => ({ entry, index }))
				.sort((left, right) => {
					const leftActive = rowIsActive(left.entry);
					const rightActive = rowIsActive(right.entry);
					if (leftActive !== rightActive) return Number(rightActive) - Number(leftActive);
					const leftTime = Date.parse(left.entry.record.scheduledAt);
					const rightTime = Date.parse(right.entry.record.scheduledAt);
					const leftOverdue = rowIsOverdue(left.entry, now);
					const rightOverdue = rowIsOverdue(right.entry, now);
					if (leftOverdue !== rightOverdue) return Number(rightOverdue) - Number(leftOverdue);
					return leftTime - rightTime || left.index - right.index;
				})
				.map((item) => item.entry);
		}

		function sameLocalDay(left, right) {
			const a = new Date(left);
			const b = new Date(right);
			return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
		}
		function tomorrowStart(now) {
			const date = new Date(now);
			date.setHours(0, 0, 0, 0);
			date.setDate(date.getDate() + 1);
			return date.getTime();
		}
		function filterScheduleRows(rows, { query, filter, now }) {
			const needle = String(query ?? "").trim().toLocaleLowerCase();
			return rows.filter((entry) => {
				const { session, record, sessionId } = entry;
				const scheduled = Date.parse(record.scheduledAt);
				if (filter === "active" && !rowIsActive(entry)) return false;
				if (filter === "inactive" && rowIsActive(entry)) return false;
				if (filter === "today" && (!rowIsActive(entry) || !sameLocalDay(scheduled, now))) return false;
				if (filter === "overdue" && !rowIsOverdue(entry, now)) return false;
				if (filter === "recurring" && !isRecurringSchedule(record)) return false;
				if (!needle) return true;
				const haystack = [scheduleTitle(record), record.prompt, record.id, sourceNameFor(session), sessionId]
					.filter(Boolean).join("\n").toLocaleLowerCase();
				return haystack.includes(needle);
			});
		}
		function dateGroupFor(entry, now, t) {
			const timestamp = Date.parse(entry.record.scheduledAt);
			if (!rowIsActive(entry)) return { key: "inactive", label: t("group.inactive") };
			if (timestamp <= now) return { key: "overdue", label: t("group.overdue") };
			if (sameLocalDay(timestamp, now)) return { key: "today", label: t("group.today") };
			const tomorrow = tomorrowStart(now);
			if (sameLocalDay(timestamp, tomorrow)) return { key: "tomorrow", label: t("group.tomorrow") };
			const date = new Date(timestamp);
			const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
			return { key, label: formatScheduleGroupDate(timestamp) };
		}
		function groupScheduleRows(rows, grouping, now, t) {
			const groups = [];
			const index = new Map();
			for (const entry of rows) {
				const group = grouping === "session"
					? { key: `session:${entry.sessionId}`, label: sourceNameFor(entry.session) }
					: dateGroupFor(entry, now, t);
				let target = index.get(group.key);
				if (!target) {
					target = { ...group, rows: [] };
					index.set(group.key, target);
					groups.push(target);
				}
				target.rows.push(entry);
			}
			return groups;
		}

		const SEEN_STORAGE_KEY = "@stolyarovmn/dsh-client-ui-schedule-tab/seen-v1";
		const MAX_SEEN_IDS = 2000;
		let seenIdsCache;
		function readSeenIds() {
			if (seenIdsCache !== undefined) return seenIdsCache;
			let values = [];
			try {
				const raw = window.localStorage?.getItem?.(SEEN_STORAGE_KEY);
				const parsed = raw ? JSON.parse(raw) : [];
				if (Array.isArray(parsed)) values = parsed.filter((value) => typeof value === "string");
			} catch {}
			seenIdsCache = new Set(values.slice(-MAX_SEEN_IDS));
			return seenIdsCache;
		}
		function persistSeenIds() {
			try {
				const values = [...readSeenIds()];
				window.localStorage?.setItem?.(SEEN_STORAGE_KEY, JSON.stringify(values.slice(-MAX_SEEN_IDS)));
			} catch {}
		}
		function scheduleIdentity(entry) {
			return entry.sessionId + ":" + entry.record.id;
		}
		function markRowsSeen(rows) {
			const seen = readSeenIds();
			let changed = false;
			for (const entry of rows) {
				if (!rowIsActive(entry)) continue;
				const identity = scheduleIdentity(entry);
				if (seen.has(identity)) continue;
				seen.add(identity);
				changed = true;
			}
			if (!changed) return false;
			if (seen.size > MAX_SEEN_IDS) {
				const keep = [...seen].slice(-MAX_SEEN_IDS);
				seen.clear();
				for (const id of keep) seen.add(id);
			}
			persistSeenIds();
			return true;
		}
		function notificationSummary(rows, now) {
			const seen = readSeenIds();
			let unread = 0;
			let unreadOverdue = 0;
			let overdue = 0;
			let recurring = 0;
			for (const entry of rows) {
				if (!rowIsActive(entry)) continue;
				const isOverdue = Date.parse(entry.record.scheduledAt) <= now;
				if (isOverdue) overdue += 1;
				if (isRecurringSchedule(entry.record)) recurring += 1;
				if (seen.has(scheduleIdentity(entry))) continue;
				unread += 1;
				if (isOverdue) unreadOverdue += 1;
			}
			return { total: rows.length, unread, unreadOverdue, overdue, recurring };
		}
		function notificationSignature(rows) {
			return rows.map(scheduleIdentity).sort().join("|");
		}
		function sidebarSummaryTitle(summary, t) {
			if (typeof t !== "function") {
				return `${summary.unread} new · ${summary.total} total · ${summary.overdue} overdue · ${summary.recurring} recurring`;
			}
			return t("sidebar.summary", {
				newCount: summary.unread,
				total: summary.total,
				overdue: summary.overdue,
				recurring: summary.recurring
			});
		}

		const sessionMarkStyleId = "@stolyarovmn/dsh-client-ui-schedule-tab/SessionScheduleMarks.css";
		function cssAttributeValue(value) {
			return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
		}
		function sessionIdentityAliases(entry) {
			return [...new Set([
				entry?.sessionId,
				entry?.session?.sessionId,
				entry?.session?.id
			].filter((value) => typeof value === "string" && value.length > 0))];
		}
		function sessionNotificationState(rows, now) {
			const seen = readSeenIds();
			const bySession = new Map();
			for (const entry of rows) {
				if (!rowIsActive(entry)) continue;
				if (seen.has(scheduleIdentity(entry))) continue;
				const isOverdue = Date.parse(entry.record.scheduledAt) <= now;
				for (const sessionId of sessionIdentityAliases(entry)) {
					const current = bySession.get(sessionId) ?? { unread: 0, overdue: 0 };
					current.unread += 1;
					if (isOverdue) current.overdue += 1;
					bySession.set(sessionId, current);
				}
			}
			return bySession;
		}
		function sessionMarkSelectors(sessionId) {
			const value = cssAttributeValue(sessionId);
			const row = '[data-row-key="session:' + value + '"]';
			return [
				row + ' [data-session-schedule-mark]',
				'[data-row-key="' + value + '"] [data-session-schedule-mark]',
				'[data-row-key$="' + value + '"] [data-session-schedule-mark]',
				row + ' > span[role="img"][aria-label="Has active scheduled task"]',
				row + ' > span[role="img"][aria-label="有活动定时任务"]'
			];
		}
		function syncSessionMarkStyles(rows, now) {
			if (typeof document === "undefined") return;
			let tag = document.querySelector('style[data-plugin-css="' + sessionMarkStyleId + '"]');
			if (tag === null) {
				tag = document.createElement("style");
				tag.dataset.plugin = "@stolyarovmn/dsh-client-ui-schedule-tab";
				tag.dataset.pluginCss = sessionMarkStyleId;
				document.head.appendChild(tag);
			}
			const rules = [];
			for (const [sessionId, state] of sessionNotificationState(rows, now)) {
				const color = state.overdue > 0
					? "var(--dsw-alias-state-warn-primary)"
					: "var(--dsw-alias-state-business-primary)";
				rules.push(sessionMarkSelectors(sessionId).join(",") + "{color:" + color + " !important}");
			}
			tag.textContent = rules.join("");
		}

		const ClockIcon = primitives.IconAlarmClockOutlineRegular ?? primitives.IconClockOutline16 ?? primitives.IconAlarmClockOutline16 ?? null;
		function ScheduleGlyph({ size, active, t }) {
			const { rows } = useScheduleRows();
			const [seenVersion, setSeenVersion] = react.useState(0);
			const activeRows = rows.filter(rowIsActive);
			const signature = notificationSignature(activeRows);
			react.useEffect(() => {
				if (!active) return;
				if (markRowsSeen(activeRows)) setSeenVersion((value) => value + 1);
			}, [active, signature]);
			void seenVersion;
			const summaryNow = Date.now();
			const summary = notificationSummary(activeRows, summaryNow);
			react.useEffect(() => {
				syncSessionMarkStyles(activeRows, summaryNow);
			}, [signature, seenVersion, active]);
			const compact = (size ?? 16) > 16;
			const hasUnread = summary.unread > 0;
			const hasUnreadOverdue = summary.unreadOverdue > 0;
			const glyphClass = "st_sidebarGlyph"
				+ (hasUnread ? " st_sidebarNew" : "")
				+ (hasUnreadOverdue ? " st_sidebarWarn" : "");
			const title = sidebarSummaryTitle(summary, t);
			return react_jsx_runtime.jsxs("span", {
				className: glyphClass,
				"data-compact": compact ? "true" : "false",
				"data-has-count": summary.total > 0 ? "true" : "false",
				title,
				children: [
					ClockIcon ? react_jsx_runtime.jsx(ClockIcon, { size: size ?? 16 }) : null,
					compact
						? (hasUnread ? react_jsx_runtime.jsx("span", { className: "st_sidebarDot", "aria-hidden": "true" }) : null)
						: (summary.total === 0 ? null : react_jsx_runtime.jsx("span", {
							className: "st_sidebarCount",
							children: hasUnread
								? react_jsx_runtime.jsxs(react_jsx_runtime.Fragment, {
									children: [
										react_jsx_runtime.jsx("span", {
											className: hasUnreadOverdue ? "st_sidebarCountWarn" : "st_sidebarCountNew",
											children: summary.unread
										}),
										react_jsx_runtime.jsx("span", { className: "st_sidebarCountSep", children: "/" }),
										react_jsx_runtime.jsx("span", { className: "st_sidebarCountTotal", children: summary.total })
									]
								})
								: react_jsx_runtime.jsx("span", { className: "st_sidebarCountTotal", children: summary.total })
						}))
				]
			});
		}
		function localDateTimeValue(isoValue) {
			const date = new Date(isoValue);
			if (!Number.isFinite(date.getTime())) return "";
			const pad = (value) => String(value).padStart(2, "0");
			return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
		}
		function editDraftFor(record) {
			const zone = record?.timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone ?? "UTC";
			return {
				title: record?.title ?? "",
				prompt: record?.prompt ?? "",
				kind: record?.kind ?? "at",
				at: localDateTimeValue(record?.scheduledAt),
				everyMinutes: record?.kind === "every" ? String(record.everySeconds / 60) : "5",
				time: trimClockTime(record?.time) || "09:00",
				timeZone: zone,
				weekdays: Array.isArray(record?.weekdays) ? record.weekdays.join(",") : "1,2,3,4,5",
				expression: record?.expression ?? "0 9 * * 1-5"
			};
		}
		function normalizeWallClock(value) {
			const text = String(value ?? "").trim();
			return /^\d{2}:\d{2}$/.test(text) ? text + ":00" : text;
		}
		function timingChangeFor(record, draft) {
			const kind = draft.kind;
			if (kind === "after" || kind === "at") {
				const original = localDateTimeValue(record.scheduledAt);
				if (kind === record.kind && draft.at === original) return undefined;
				const parsed = new Date(draft.at);
				if (!Number.isFinite(parsed.getTime())) throw new Error("invalid_at");
				return { kind: "at", at: parsed.toISOString() };
			}
			if (kind === "every") {
				const minutes = Number(draft.everyMinutes);
				if (!Number.isFinite(minutes) || minutes < 1) throw new Error("invalid_every");
				const seconds = Math.round(minutes * 60);
				if (record.kind === "every" && record.everySeconds === seconds) return undefined;
				return { kind: "every", every_seconds: seconds };
			}
			if (kind === "daily") {
				const daily = { time: normalizeWallClock(draft.time), time_zone: draft.timeZone };
				if (record.kind === "daily" && trimClockTime(record.time) === trimClockTime(daily.time) && record.timeZone === draft.timeZone) return undefined;
				return { kind: "daily", daily };
			}
			if (kind === "weekly") {
				const weekdays = [...new Set(String(draft.weekdays).split(",").map((value) => Number(value.trim())).filter((value) => Number.isInteger(value) && value >= 1 && value <= 7))].sort();
				if (weekdays.length === 0) throw new Error("invalid_weekdays");
				const weekly = { time: normalizeWallClock(draft.time), time_zone: draft.timeZone, weekdays };
				const sameDays = record.kind === "weekly" && JSON.stringify(record.weekdays ?? []) === JSON.stringify(weekdays);
				if (sameDays && trimClockTime(record.time) === trimClockTime(weekly.time) && record.timeZone === draft.timeZone) return undefined;
				return { kind: "weekly", weekly };
			}
			if (kind === "cron") {
				const cron = { expression: String(draft.expression).trim(), time_zone: draft.timeZone };
				if (!cron.expression) throw new Error("invalid_cron");
				if (record.kind === "cron" && record.expression === cron.expression && record.timeZone === draft.timeZone) return undefined;
				return { kind: "cron", cron };
			}
			return undefined;
		}
		function scheduleKindLabel(record, t) {
			if (record.kind === "daily") return t("kind.daily");
			if (record.kind === "weekly") return t("kind.weekly");
			if (record.kind === "cron") return t("kind.cron");
			if (record.kind === "every") return t("kind.every");
			return t("kind.once");
		}
		function stopRowEvent(event) {
			event?.stopPropagation?.();
		}
		function formatDeliveryTime(value) {
			return value ? formatScheduleLocalTime(value) : "—";
		}
		function historyKey(entry) {
			return scheduleIdentity(entry);
		}

		function SchedulePanel({ t }) {
			const uiWorkspace = hostCtx?.uiWorkspace;
			const { sessionSnapshot, rows: flat, readState, hostMode } = useScheduleRows();
			const defaultFilter = hostMode ? "active" : "all";
			const [query, setQuery] = react.useState("");
			const [filter, setFilter] = react.useState(() => defaultFilter);
			const [grouping, setGrouping] = react.useState("date");
			const [historyOpen, setHistoryOpen] = react.useState(null);
			const [historyState, setHistoryState] = react.useState({});
			const [editId, setEditId] = react.useState(null);
			const [editDraft, setEditDraft] = react.useState(null);
			const [actionState, setActionState] = react.useState({});
			const [now, setNow] = react.useState(() => Date.now());
			const hasRecords = flat.length > 0;
			react.useEffect(() => {
				if (!hasRecords) return;
				setNow(Date.now());
				const timer = window.setInterval(() => setNow(Date.now()), 1000);
				return () => window.clearInterval(timer);
			}, [hasRecords]);

			const ordered = orderScheduleRows(flat, now);
			const visible = filterScheduleRows(ordered, { query, filter, now });
			const groups = groupScheduleRows(visible, grouping, now, t);
			const currentSessionId = sessionSnapshot?.current;
			const openDialog = (sessionId) => {
				if (typeof uiWorkspace?.openSession === "function") uiWorkspace.openSession(sessionId);
			};
			const filterButtons = hostMode
				? ["active", "all", "inactive", "today", "overdue", "recurring"]
				: ["all", "today", "overdue", "recurring"];
			const groupingButtons = ["date", "session"];
			const hasActiveControls = query.trim() !== "" || filter !== defaultFilter;

			const setAction = (key, value) => setActionState((previous) => ({ ...previous, [key]: value }));
			const loadHistory = async (entry, append = false) => {
				if (!hostMode || !hostCatalogStore) return;
				const key = historyKey(entry);
				const current = historyState[key];
				setHistoryState((previous) => ({ ...previous, [key]: { ...(previous[key] ?? {}), loading: true, error: null } }));
				try {
					const request = { sessionId: entry.sessionId, id: entry.record.id, limit: 20 };
					if (append && current?.nextBefore) request.before = current.nextBefore;
					const result = await hostCatalogStore.history(request);
					if (!result?.ok || !result.value?.records) throw new Error(remoteErrorMessage(result, t("history.error")));
					const next = result.value;
					setHistoryState((previous) => ({
						...previous,
						[key]: {
							loading: false,
							error: null,
							records: append ? [...(previous[key]?.records ?? []), ...next.records] : next.records,
							nextBefore: next.nextBefore,
							earlierRecordsUnavailable: next.earlierRecordsUnavailable,
							earlierRecordsPruned: next.earlierRecordsPruned,
							retention: next.retention
						}
					}));
				} catch (error) {
					setHistoryState((previous) => ({
						...previous,
						[key]: { ...(previous[key] ?? {}), loading: false, error: error?.message ?? t("history.error") }
					}));
				}
			};
			const toggleHistory = (entry, event) => {
				stopRowEvent(event);
				const key = historyKey(entry);
				if (historyOpen === key) {
					setHistoryOpen(null);
					return;
				}
				setHistoryOpen(key);
				if (!historyState[key]?.records && !historyState[key]?.loading) void loadHistory(entry, false);
			};
			const beginEdit = (entry, event) => {
				stopRowEvent(event);
				setEditId(historyKey(entry));
				setEditDraft(editDraftFor(entry.record));
				setAction(historyKey(entry), null);
			};
			const cancelEdit = (event) => {
				stopRowEvent(event);
				setEditId(null);
				setEditDraft(null);
			};
			const saveEdit = async (entry, event) => {
				stopRowEvent(event);
				if (!hostCatalogStore || !editDraft) return;
				const key = historyKey(entry);
				setAction(key, { kind: "pending", text: t("action.saving") });
				try {
					const request = {
						sessionId: entry.sessionId,
						id: entry.record.id,
						expected: stripCatalogRecord(entry.record)
					};
					if (editDraft.title !== (entry.record.title ?? "")) request.title = editDraft.title;
					if (editDraft.prompt !== entry.record.prompt) request.prompt = editDraft.prompt;
					const change = timingChangeFor(entry.record, editDraft);
					if (change) request.change = change;
					const result = await hostCatalogStore.update(request);
					const value = result?.value;
					if (!result?.ok || value?.updated === false || value?.code) {
						throw new Error(remoteErrorMessage(result, value?.code ?? t("action.updateFailed")));
					}
					setAction(key, { kind: "ok", text: t("action.saved") });
					setEditId(null);
					setEditDraft(null);
				} catch (error) {
					setAction(key, { kind: "error", text: error?.message ?? t("action.updateFailed") });
				}
			};
			const deleteTask = async (entry, event) => {
				stopRowEvent(event);
				if (!hostCatalogStore) return;
				if (typeof window.confirm === "function" && !window.confirm(t("delete.confirm"))) return;
				const key = historyKey(entry);
				setAction(key, { kind: "pending", text: t("action.deleting") });
				try {
					const result = await hostCatalogStore.remove(entry.sessionId, entry.record.id);
					if (!result?.ok || result.value?.deleted === false) {
						throw new Error(remoteErrorMessage(result, result?.value?.code ?? t("action.deleteFailed")));
					}
					setAction(key, { kind: "ok", text: t("action.deleted") });
				} catch (error) {
					setAction(key, { kind: "error", text: error?.message ?? t("action.deleteFailed") });
				}
			};

			const renderEdit = (entry) => {
				if (!editDraft) return null;
				const updateDraft = (name, value) => setEditDraft((previous) => ({ ...previous, [name]: value }));
				const kind = editDraft.kind;
				const timingFields = [];
				if (kind === "after" || kind === "at") {
					timingFields.push(
						react_jsx_runtime.jsx("label", { children: t("edit.at") }, "label-at"),
						react_jsx_runtime.jsx("input", {
							className: "st_input", type: "datetime-local", value: editDraft.at,
							onChange: (event) => updateDraft("at", event?.target?.value ?? "")
						}, "at")
					);
				} else if (kind === "every") {
					timingFields.push(
						react_jsx_runtime.jsx("label", { children: t("edit.everyMinutes") }, "label-every"),
						react_jsx_runtime.jsx("input", {
							className: "st_input", type: "number", min: "1", step: "1", value: editDraft.everyMinutes,
							onChange: (event) => updateDraft("everyMinutes", event?.target?.value ?? "")
						}, "every")
					);
				} else {
					if (kind === "cron") {
						timingFields.push(
							react_jsx_runtime.jsx("label", { children: t("edit.cron") }, "label-cron"),
							react_jsx_runtime.jsx("input", {
								className: "st_input", value: editDraft.expression,
								onChange: (event) => updateDraft("expression", event?.target?.value ?? "")
							}, "cron")
						);
					} else {
						timingFields.push(
							react_jsx_runtime.jsx("label", { children: t("edit.time") }, "label-time"),
							react_jsx_runtime.jsx("input", {
								className: "st_input", type: "time", value: editDraft.time,
								onChange: (event) => updateDraft("time", event?.target?.value ?? "")
							}, "time")
						);
						if (kind === "weekly") {
							timingFields.push(
								react_jsx_runtime.jsx("label", { children: t("edit.weekdays") }, "label-weekdays"),
								react_jsx_runtime.jsx("input", {
									className: "st_input", value: editDraft.weekdays,
									placeholder: "1,2,3,4,5",
									onChange: (event) => updateDraft("weekdays", event?.target?.value ?? "")
								}, "weekdays")
							);
						}
					}
					timingFields.push(
						react_jsx_runtime.jsx("label", { children: t("edit.timeZone") }, "label-zone"),
						react_jsx_runtime.jsx("input", {
							className: "st_input", value: editDraft.timeZone,
							onChange: (event) => updateDraft("timeZone", event?.target?.value ?? "")
						}, "zone")
					);
				}
				return react_jsx_runtime.jsxs("div", {
					className: "st_detail",
					onClick: stopRowEvent,
					children: [
						react_jsx_runtime.jsx("div", { className: "st_detailTitle", children: t("edit.title") }),
						react_jsx_runtime.jsxs("div", {
							className: "st_edit",
							children: [
								react_jsx_runtime.jsx("label", { children: t("edit.name") }),
								react_jsx_runtime.jsx("input", {
									className: "st_input", value: editDraft.title,
									onChange: (event) => updateDraft("title", event?.target?.value ?? "")
								}),
								react_jsx_runtime.jsx("label", { children: t("edit.prompt") }),
								react_jsx_runtime.jsx("textarea", {
									className: "st_textarea", value: editDraft.prompt,
									onChange: (event) => updateDraft("prompt", event?.target?.value ?? "")
								}),
								react_jsx_runtime.jsx("label", { children: t("edit.kind") }),
								react_jsx_runtime.jsx("select", {
									className: "st_select", value: editDraft.kind,
									onChange: (event) => updateDraft("kind", event?.target?.value ?? "at"),
									children: [
										...(entry.record.kind === "after" ? [react_jsx_runtime.jsx("option", { value: "after", children: t("kind.once") }, "after")] : []),
										react_jsx_runtime.jsx("option", { value: "at", children: t("kind.onceAt") }, "at"),
										react_jsx_runtime.jsx("option", { value: "every", children: t("kind.every") }, "every"),
										react_jsx_runtime.jsx("option", { value: "daily", children: t("kind.daily") }, "daily"),
										react_jsx_runtime.jsx("option", { value: "weekly", children: t("kind.weekly") }, "weekly"),
										react_jsx_runtime.jsx("option", { value: "cron", children: t("kind.cron") }, "cron")
									]
								}),
								...timingFields
							]
						}),
						react_jsx_runtime.jsxs("div", {
							className: "st_actions",
							children: [
								react_jsx_runtime.jsx("button", { type: "button", className: "st_action", onClick: (event) => void saveEdit(entry, event), children: t("action.save") }),
								react_jsx_runtime.jsx("button", { type: "button", className: "st_action", onClick: cancelEdit, children: t("action.cancel") })
							]
						})
					]
				});
			};

			const renderHistory = (entry) => {
				const key = historyKey(entry);
				const state = historyState[key] ?? {};
				return react_jsx_runtime.jsxs("div", {
					className: "st_detail",
					onClick: stopRowEvent,
					children: [
						react_jsx_runtime.jsx("div", { className: "st_detailTitle", children: t("history.title") }),
						state.loading && !state.records
							? react_jsx_runtime.jsx("div", { className: "st_historyNote", children: t("history.loading") })
							: state.error
								? react_jsx_runtime.jsx("div", { className: "st_historyNote st_actionError", children: state.error })
								: react_jsx_runtime.jsx("div", {
									className: "st_history",
									children: (state.records ?? []).length === 0
										? react_jsx_runtime.jsx("div", { className: "st_historyNote", children: t("history.empty") })
										: (state.records ?? []).map((item) => react_jsx_runtime.jsxs("div", {
											className: "st_historyRow",
											children: [
												react_jsx_runtime.jsx("span", { children: t("history.scheduled", { value: formatDeliveryTime(item.scheduledAt) }) }),
												react_jsx_runtime.jsx("span", { children: t("history.delivered", { value: formatDeliveryTime(item.deliveredAt) }) }),
												react_jsx_runtime.jsx("span", { className: "st_historyPrompt", children: item.prompt ?? t("history.legacyPrompt") })
											]
										}, item.messageId))
								}),
						...(state.earlierRecordsPruned || state.earlierRecordsUnavailable
							? [react_jsx_runtime.jsx("div", { className: "st_historyNote", children: t(state.earlierRecordsPruned ? "history.pruned" : "history.unavailable") }, "notice")]
							: []),
						...(state.nextBefore ? [react_jsx_runtime.jsx("button", {
							type: "button", className: "st_action", disabled: state.loading,
							onClick: (event) => { stopRowEvent(event); void loadHistory(entry, true); },
							children: state.loading ? t("history.loading") : t("history.more")
						}, "more")] : [])
					]
				});
			};

			return react_jsx_runtime.jsxs("div", {
				className: "st_root",
				children: [
					react_jsx_runtime.jsxs("header", {
						className: "st_header",
						children: [
							react_jsx_runtime.jsx("span", { className: "st_title", children: t("header") }),
							react_jsx_runtime.jsx("span", {
								className: "st_count",
								children: visible.length === flat.length
									? t(flat.length === 1 ? "count.one" : "count.other", { count: flat.length })
									: t("count.filtered", { visible: visible.length, total: flat.length })
							}),
							...(hostMode ? [react_jsx_runtime.jsx("span", { className: "st_rc2", children: t("mode.host") }, "host")] : [])
						]
					}),
					react_jsx_runtime.jsxs("div", {
						className: "st_toolbar",
						children: [
							react_jsx_runtime.jsx("input", {
								className: "st_search",
								type: "search",
								value: query,
								placeholder: t("search.placeholder"),
								"aria-label": t("search.aria"),
								onChange: (event) => setQuery(event?.target?.value ?? "")
							}),
							react_jsx_runtime.jsxs("div", {
								className: "st_toolbarRow",
								children: [
									react_jsx_runtime.jsx("div", {
										className: "st_filters",
										children: filterButtons.map((name) => react_jsx_runtime.jsx("button", {
											type: "button",
											className: "st_chipButton" + (filter === name ? " st_chipButtonActive" : ""),
											"aria-pressed": filter === name,
											onClick: () => setFilter(name),
											children: t(`filter.${name}`)
										}, name))
									}),
									react_jsx_runtime.jsxs("div", {
										className: "st_grouping",
										children: [
											react_jsx_runtime.jsx("span", { className: "st_groupLabel", children: t("group.by") }),
											...groupingButtons.map((name) => react_jsx_runtime.jsx("button", {
												type: "button",
												className: "st_chipButton" + (grouping === name ? " st_chipButtonActive" : ""),
												"aria-pressed": grouping === name,
												onClick: () => setGrouping(name),
												children: t(`group.${name}`)
											}, name))
										]
									})
								]
							})
						]
					}),
					react_jsx_runtime.jsx("div", {
						className: "st_body",
						children: visible.length === 0
							? react_jsx_runtime.jsxs("div", {
								className: "st_empty",
								children: [
									react_jsx_runtime.jsx("span", { className: "st_emptyIcon", children: ClockIcon ? react_jsx_runtime.jsx(ClockIcon, { size: 28 }) : null }),
									react_jsx_runtime.jsx("div", {
										className: "st_emptyTitle",
										children: hasActiveControls && flat.length > 0
											? t("empty.filtered.title")
											: t(readState === "loading" ? "empty.loading.title" : readState === "error" ? "empty.error.title" : readState === "unavailable" ? "empty.unavailable.title" : "empty.title")
									}),
									react_jsx_runtime.jsx("div", {
										className: "st_emptyHint",
										children: hasActiveControls && flat.length > 0
											? t("empty.filtered.hint")
											: t(readState === "loading" ? "empty.loading.hint" : readState === "error" ? "empty.error.hint" : readState === "unavailable" ? "empty.unavailable.hint" : "empty.hint")
									})
								]
							})
							: react_jsx_runtime.jsx("div", {
								className: "st_list",
								role: "list",
								"aria-label": t("list.aria"),
								children: groups.map((group) => react_jsx_runtime.jsxs("section", {
									className: "st_group",
									children: [
										react_jsx_runtime.jsxs("div", {
											className: "st_groupHeader",
											children: [
												react_jsx_runtime.jsx("span", { children: group.label }),
												react_jsx_runtime.jsx("span", { className: "st_groupCount", children: group.rows.length })
											]
										}),
										react_jsx_runtime.jsx("ul", {
											className: "st_groupList",
											children: group.rows.map((entry) => {
												const { session, record, sessionId } = entry;
												const overdue = rowIsOverdue(entry, now);
												const active = rowIsActive(entry);
												const sourceName = sourceNameFor(session) || sessionId;
												const key = historyKey(entry);
												const action = actionState[key];
												const openThisDialog = () => openDialog(sessionId);
												return react_jsx_runtime.jsxs("li", {
													className: "st_row" + (overdue ? " st_rowOverdue" : ""),
													role: "button",
													tabIndex: 0,
													"aria-label": `${scheduleTitle(record)} — ${sourceName}`,
													onClick: openThisDialog,
													onKeyDown: (event) => {
														if (event.key === "Enter" || event.key === " ") openThisDialog();
													},
													children: [
														react_jsx_runtime.jsx("div", { className: "st_prompt", children: scheduleTitle(record) }),
														...(record.title && record.prompt !== record.title
															? [react_jsx_runtime.jsx("div", { className: "st_instruction", children: record.prompt }, "instruction")]
															: []),
														react_jsx_runtime.jsxs("div", {
															className: "st_badges",
															children: [
																react_jsx_runtime.jsxs("span", {
																	className: active ? "st_status" : "st_badge st_badgeInactive",
																	children: active
																		? [
																			react_jsx_runtime.jsx("span", { className: "st_statusDot", "aria-hidden": "true" }, "dot"),
																			react_jsx_runtime.jsx("span", { children: t(overdue ? "status.overdue" : "status.scheduled") }, "label")
																		]
																		: t("status.inactive")
																}),
																...(isRecurringSchedule(record) ? [react_jsx_runtime.jsx("span", { className: "st_badge st_badgeRecurring", children: t("tag.recurring") }, "recurring")] : []),
																...(hostMode ? [react_jsx_runtime.jsx("span", { className: "st_badge st_badgeKind", children: scheduleKindLabel(record, t) }, "kind")] : []),
																react_jsx_runtime.jsxs("span", {
																	className: "st_badge " + (session?.running ? "st_badgeRunning" : "st_badgeIdle"),
																	children: [
																		react_jsx_runtime.jsx("span", { className: "st_badgeDot", "aria-hidden": "true" }),
																		react_jsx_runtime.jsx("span", { children: t(session?.running ? "session.running" : "session.idle") })
																	]
																}),
																...(currentSessionId === sessionId ? [react_jsx_runtime.jsx("span", { className: "st_badge st_badgeCurrent", children: t("session.current") }, "current")] : [])
															]
														}),
														react_jsx_runtime.jsxs("div", {
															className: "st_meta",
															children: active
																? [
																	react_jsx_runtime.jsx("span", { children: formatScheduleFrequency(record, t) }, "frequency"),
																	react_jsx_runtime.jsx("span", { className: "st_metaSep", "aria-hidden": "true", children: "·" }, "sep1"),
																	react_jsx_runtime.jsx("span", { className: "st_nextLabel", children: t("next.value", { label: t(isRecurringSchedule(record) ? "next.recurring" : "next.once"), value: formatScheduleLocalTime(record.scheduledAt) }) }, "next"),
																	react_jsx_runtime.jsx("span", { className: "st_metaSep", "aria-hidden": "true", children: "·" }, "sep2"),
																	react_jsx_runtime.jsx("span", { children: formatScheduleRelative(record.scheduledAt, now, t) }, "relative"),
																	...(entry.lastDelivery ? [
																		react_jsx_runtime.jsx("span", { className: "st_metaSep", "aria-hidden": "true", children: "·" }, "sep-last-active"),
																		react_jsx_runtime.jsx("span", { children: t("lastDelivery", { value: formatDeliveryTime(entry.lastDelivery.deliveredAt) }) }, "last-active")
																	] : [])
																]
																: [
																	react_jsx_runtime.jsx("span", { children: formatScheduleFrequency(record, t) }, "frequency"),
																	...(entry.lastDelivery ? [
																		react_jsx_runtime.jsx("span", { className: "st_metaSep", "aria-hidden": "true", children: "·" }, "sep-last"),
																		react_jsx_runtime.jsx("span", { children: t("lastDelivery", { value: formatDeliveryTime(entry.lastDelivery.deliveredAt) }) }, "last")
																	] : [])
																]
														}),
														react_jsx_runtime.jsxs("div", {
															className: "st_source",
															children: [
																react_jsx_runtime.jsx("span", { className: "st_sourceLabel", children: t("source") }),
																react_jsx_runtime.jsx("span", { className: "st_sourceName", title: sourceName, children: sourceName })
															]
														}),
														...(hostMode ? [react_jsx_runtime.jsxs("div", {
															className: "st_actions",
															onClick: stopRowEvent,
															children: [
																react_jsx_runtime.jsx("button", { type: "button", className: "st_action", onClick: (event) => toggleHistory(entry, event), children: t(historyOpen === key ? "action.hideHistory" : "action.history") }),
																...(active ? [react_jsx_runtime.jsx("button", { type: "button", className: "st_action", onClick: (event) => beginEdit(entry, event), children: t("action.edit") }, "edit")] : []),
																react_jsx_runtime.jsx("button", { type: "button", className: "st_action st_actionDanger", onClick: (event) => void deleteTask(entry, event), children: t("action.delete") }),
																...(action?.text ? [react_jsx_runtime.jsx("span", { className: "st_actionState" + (action.kind === "error" ? " st_actionError" : ""), children: action.text }, "state")] : [])
															]
														}, "actions")] : []),
														...(historyOpen === key ? [renderHistory(entry)] : []),
														...(editId === key ? [renderEdit(entry)] : [])
													]
												}, key);
											})
										})
									]
								}, group.key))
							})
					})
				]
			});
		}
		const zh = {
			"tab": "日程",
			"header": "日程",
			"count.one": "{count} 项",
			"count.other": "{count} 项",
			"count.filtered": "{visible} / {total} 项",
			"search.placeholder": "搜索提醒或对话…",
			"search.aria": "搜索提醒",
			"filter.all": "全部",
			"filter.active": "活动",
			"filter.inactive": "已结束",
			"filter.today": "今天",
			"filter.overdue": "逾期",
			"filter.recurring": "重复",
			"group.by": "分组",
			"group.date": "日期",
			"group.session": "对话",
			"group.overdue": "逾期",
			"group.inactive": "已结束",
			"group.today": "今天",
			"group.tomorrow": "明天",
			"empty.title": "暂无日程",
			"empty.hint": "在任意对话中创建提醒，例如：「10 分钟后提醒我……」。这里跨对话展示内置 Schedule 提醒；点击某条即可打开它所在的对话。",
			"empty.filtered.title": "没有匹配的提醒",
			"empty.filtered.hint": "请调整搜索文字或筛选条件。",
			"empty.loading.title": "正在加载日程",
			"empty.loading.hint": "正在读取所有对话的提醒投影……",
			"empty.unavailable.title": "Schedule 未启用",
			"empty.unavailable.hint": "当前 DSH 配置没有提供 Schedule 投影。请启用内置 Schedule 服务；后台 shell 任务不会显示为计划提醒。",
			"empty.error.title": "无法加载日程",
			"empty.error.hint": "一个或多个对话的投影加载失败。请重新连接 DSH 或刷新页面后重试。",
			"list.aria": "已计划的定时提醒",
			"status.scheduled": "已计划",
			"status.overdue": "已逾期",
			"status.inactive": "已结束",
			"session.running": "运行中",
			"session.idle": "空闲",
			"session.current": "当前对话",
			"next.once": "时间",
			"next.recurring": "下次",
			"next.value": "{label} {value}",
			"source": "来自",
			"frequency.once": "单次",
			"frequency.recurring": "重复",
			"frequency.daily": "每天 {time} · {zone}",
			"frequency.weekly": "每周 {days} · {time} · {zone}",
			"frequency.cron": "Cron {expression} · {zone}",
			"frequency.every": "每 {value} {unit}",
			"tag.recurring": "重复",
			"kind.once": "单次",
			"kind.onceAt": "单次指定时间",
			"kind.every": "间隔",
			"kind.daily": "每天",
			"kind.weekly": "每周",
			"kind.cron": "Cron",
			"mode.host": "Host tasks",
			"lastDelivery": "最近投递 {value}",
			"action.history": "历史",
			"action.hideHistory": "隐藏历史",
			"action.edit": "编辑",
			"action.delete": "删除",
			"action.save": "保存",
			"action.cancel": "取消",
			"action.saving": "正在保存…",
			"action.saved": "已保存",
			"action.deleting": "正在删除…",
			"action.deleted": "已删除",
			"action.updateFailed": "更新失败",
			"action.deleteFailed": "删除失败",
			"delete.confirm": "删除此定时任务？未来投递和已保存的投递历史都会被删除。",
			"history.title": "投递历史",
			"history.loading": "正在加载…",
			"history.empty": "尚无已保存的投递记录。",
			"history.error": "无法加载投递历史",
			"history.more": "加载更早记录",
			"history.scheduled": "计划 {value}",
			"history.delivered": "投递 {value}",
			"history.legacyPrompt": "旧记录未保存提示内容",
			"history.pruned": "更早的记录已按保留策略清理。",
			"history.unavailable": "更早的记录可能不可用。",
			"edit.title": "编辑任务",
			"edit.name": "名称",
			"edit.prompt": "提醒内容",
			"edit.kind": "计划类型",
			"edit.at": "时间",
			"edit.everyMinutes": "每隔（分钟）",
			"edit.time": "本地时间",
			"edit.weekdays": "星期（1=周一…7=周日）",
			"edit.cron": "Cron 表达式",
			"edit.timeZone": "时区",
			"unit.day.one": "天",
			"unit.day.other": "天",
			"unit.hour.one": "小时",
			"unit.hour.other": "小时",
			"unit.minute.one": "分钟",
			"unit.minute.other": "分钟",
			"unit.second.one": "秒",
			"unit.second.other": "秒",
			"relative.now": "现已到期",
			"relative.future": "{value}{unit}后",
			"relative.overdue": "已逾期 {value}{unit}",
			"sidebar.summary": "{newCount} 条新提醒 · 共 {total} 条 · {overdue} 条逾期 · {recurring} 条重复"
		};
		const en = {
			"tab": "Schedule",
			"header": "Schedule",
			"count.one": "{count} item",
			"count.other": "{count} items",
			"count.filtered": "{visible} / {total} items",
			"search.placeholder": "Search reminders or dialogs…",
			"search.aria": "Search reminders",
			"filter.all": "All",
			"filter.active": "Active",
			"filter.inactive": "Inactive",
			"filter.today": "Today",
			"filter.overdue": "Overdue",
			"filter.recurring": "Recurring",
			"group.by": "Group",
			"group.date": "Date",
			"group.session": "Dialog",
			"group.overdue": "Overdue",
			"group.inactive": "Inactive",
			"group.today": "Today",
			"group.tomorrow": "Tomorrow",
			"empty.title": "Nothing scheduled",
			"empty.hint": "Create a reminder in any dialog, e.g. “remind me in 10 minutes to…”. This tab shows built-in Schedule reminders across dialogs; click a row to open its source conversation.",
			"empty.filtered.title": "No matching reminders",
			"empty.filtered.hint": "Adjust the search text or filters.",
			"empty.loading.title": "Loading schedule",
			"empty.loading.hint": "Reading reminder projections from all dialogs…",
			"empty.unavailable.title": "Schedule is not enabled",
			"empty.unavailable.hint": "This DSH profile does not expose the Schedule projection. Enable the built-in Schedule service; background shell jobs are not scheduled reminders.",
			"empty.error.title": "Schedule could not be loaded",
			"empty.error.hint": "One or more dialog projections failed to load. Reconnect DSH or reload the page and try again.",
			"list.aria": "Scheduled reminders",
			"status.scheduled": "Scheduled",
			"status.overdue": "Overdue",
			"status.inactive": "Inactive",
			"session.running": "Running",
			"session.idle": "Idle",
			"session.current": "Current dialog",
			"next.once": "At",
			"next.recurring": "Next",
			"next.value": "{label} {value}",
			"source": "From",
			"frequency.once": "Once",
			"frequency.recurring": "Recurring",
			"frequency.daily": "Daily {time} · {zone}",
			"frequency.weekly": "Weekly {days} · {time} · {zone}",
			"frequency.cron": "Cron {expression} · {zone}",
			"frequency.every": "Every {value} {unit}",
			"tag.recurring": "Recurring",
			"kind.once": "One-shot",
			"kind.onceAt": "One-shot at time",
			"kind.every": "Interval",
			"kind.daily": "Daily",
			"kind.weekly": "Weekly",
			"kind.cron": "Cron",
			"mode.host": "Host tasks",
			"lastDelivery": "Last delivered {value}",
			"action.history": "History",
			"action.hideHistory": "Hide history",
			"action.edit": "Edit",
			"action.delete": "Delete",
			"action.save": "Save",
			"action.cancel": "Cancel",
			"action.saving": "Saving…",
			"action.saved": "Saved",
			"action.deleting": "Deleting…",
			"action.deleted": "Deleted",
			"action.updateFailed": "Update failed",
			"action.deleteFailed": "Delete failed",
			"delete.confirm": "Delete this scheduled task? Future deliveries and saved delivery history will be removed.",
			"history.title": "Delivery history",
			"history.loading": "Loading…",
			"history.empty": "No saved deliveries yet.",
			"history.error": "Could not load delivery history",
			"history.more": "Load older deliveries",
			"history.scheduled": "Scheduled {value}",
			"history.delivered": "Delivered {value}",
			"history.legacyPrompt": "Prompt was not saved for this legacy receipt",
			"history.pruned": "Older delivery records were pruned by the retention policy.",
			"history.unavailable": "Earlier delivery records may be unavailable.",
			"edit.title": "Edit task",
			"edit.name": "Name",
			"edit.prompt": "Reminder prompt",
			"edit.kind": "Schedule type",
			"edit.at": "Time",
			"edit.everyMinutes": "Every (minutes)",
			"edit.time": "Local time",
			"edit.weekdays": "Weekdays (1=Mon…7=Sun)",
			"edit.cron": "Cron expression",
			"edit.timeZone": "Time zone",
			"unit.day.one": "day",
			"unit.day.other": "days",
			"unit.hour.one": "hour",
			"unit.hour.other": "hours",
			"unit.minute.one": "minute",
			"unit.minute.other": "minutes",
			"unit.second.one": "second",
			"unit.second.other": "seconds",
			"relative.now": "Due now",
			"relative.future": "in {value} {unit}",
			"relative.overdue": "{value} {unit} overdue",
			"sidebar.summary": "{newCount} new · {total} total · {overdue} overdue · {recurring} recurring"
		};

		const NS = "schedule-tab";
		const inject = ["slots", "locale", "sessions", "uiWorkspace", "remote"];
		function apply(ctx) {
			hostCtx = ctx;
			hostCatalogStore = createHostCatalogStore(ctx);
			ctx.effect(() => ctx.locale.register(NS, { zh, en }), "schedule-tab: dictionaries");
			ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
				name: "sidebar.panellist",
				id: "schedule",
				order: 0,
				locale: NS,
				label: () => { try { return ctx.locale.bind(NS)("tab"); } catch { return "Schedule"; } }
			}, ScheduleGlyph));
			ctx.slots.inject("main", () => ctx.slots.register({
				name: "main",
				key: "schedule",
				locale: NS
			}, SchedulePanel));
		}
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

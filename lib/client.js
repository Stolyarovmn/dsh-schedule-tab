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
		const HISTORY_PAGE = 20;
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
		const CopyIcon = primitives.IconCopyOutlineRegular;
		const PlusIcon = primitives.IconPlusOutlineRegular;
		const SearchIcon = primitives.IconSearchOutlineRegular;
		const WarningIcon = primitives.IconWarningOutlineRegular;
		const CloseIcon = primitives.IconCloseOutlineRegular;
		const ChevronRightIcon = primitives.IconChevronRightOutlineRegular;

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
			".scc_root{position:relative}",
			".scc_hasInlineDetail>.scc_header,.scc_hasInlineDetail>.scc_toolbar,.scc_hasInlineDetail>.scc_banner,.scc_hasInlineDetail>.scc_body{margin-right:min(520px,42vw)}",
			".scc_inlineDetail{position:absolute;top:0;right:0;bottom:0;width:min(520px,42vw);box-sizing:border-box;border-left:0.5px solid var(--dsw-alias-border-l1);background:var(--dsw-specific-page,var(--dsw-alias-bg-base,#111));display:flex;flex-direction:column;z-index:2}",
			".scc_nativeDetailHost{overflow:hidden;padding:0}",
			".scc_nativeDetailHost>[data-testid='task-manager-page']{display:flex!important;width:100%!important;height:100%!important;min-width:0!important;min-height:0!important;background:inherit!important}",
			".scc_nativeDetailHost>[data-testid='task-manager-page']>:first-child{display:none!important}",
			".scc_nativeDetailHost>[data-testid='task-manager-page']>aside{display:flex!important;flex:1 1 100%!important;width:100%!important;max-width:none!important;min-width:0!important;border-left:0!important}",
			".scc_detailBar{flex:none;display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:0.5px solid var(--dsw-alias-border-l1)}",
			".scc_detailTabs{display:flex;align-items:center;gap:4px;min-width:0}",
			".scc_detailTab{border:0;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:13px;padding:7px 9px;border-bottom:2px solid transparent;cursor:pointer}",
			".scc_detailTabActive{color:var(--dsw-alias-label-primary);border-bottom-color:var(--dsw-alias-interactive-primary)}",
			".scc_detailBarSpacer{flex:1}",
			".scc_detailScroll{flex:1;min-height:0;overflow:auto;padding:16px;display:flex;flex-direction:column;gap:14px}",
			".scc_detailHeading{font-size:18px;font-weight:650;line-height:24px;color:var(--dsw-alias-label-primary);margin:0}",
			".scc_detailNext{font-size:12px;color:var(--dsw-alias-label-tertiary);line-height:18px}",
			".scc_editorText,.scc_editorTextarea,.scc_editorSelect{box-sizing:border-box;width:100%;border:0.5px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-base,transparent);color:var(--dsw-alias-label-primary);font:inherit;padding:8px 10px;outline:none}",
			".scc_editorTextarea{min-height:88px;resize:vertical;line-height:19px}",
			".scc_editorText:focus,.scc_editorTextarea:focus,.scc_editorSelect:focus{border-color:var(--dsw-alias-focus-primary,var(--dsw-alias-interactive-primary))}",
			".scc_editorCard{border:0.5px solid var(--dsw-alias-border-l1);border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:10px}",
			".scc_editorCardTitle{font-size:13px;font-weight:600;color:var(--dsw-alias-label-secondary)}",
			".scc_editorRow{display:grid;grid-template-columns:120px minmax(0,1fr);gap:10px;align-items:center}",
			".scc_editorLabel{font-size:12px;color:var(--dsw-alias-label-tertiary)}",
			".scc_editorPair{display:grid;grid-template-columns:minmax(0,1fr) minmax(110px,.55fr);gap:8px}",
			".scc_weekdays{display:flex;gap:5px;flex-wrap:wrap}",
			".scc_weekday{min-width:34px;border:0.5px solid var(--dsw-alias-border-l1);border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary);padding:5px 8px;cursor:pointer}",
			".scc_weekdayActive{border-color:var(--dsw-alias-interactive-primary);background:var(--dsw-alias-interactive-bg-selected,var(--dsw-alias-interactive-bg-hover,transparent));color:var(--dsw-alias-label-primary)}",
			".scc_editorHint{font-size:12px;color:var(--dsw-alias-label-tertiary);line-height:17px}",
			".scc_editorError{font-size:12px;color:var(--dsw-alias-state-danger-label,var(--dsw-alias-state-warn-label));line-height:17px}",
			".scc_saveBar{flex:none;display:flex;align-items:center;gap:8px;padding:10px 12px;border-top:0.5px solid var(--dsw-alias-border-l1);background:var(--dsw-specific-page,var(--dsw-alias-bg-base,#111))}",
			".scc_saveNotice{font-size:12px;color:var(--dsw-alias-label-tertiary);margin-right:auto}",
			".scc_readonly{font-size:13px;color:var(--dsw-alias-label-secondary);line-height:19px;white-space:pre-wrap;overflow-wrap:anywhere}",
			".scc_selectedRow{border-color:var(--dsw-alias-interactive-primary);background:var(--dsw-alias-interactive-bg-selected,var(--dsw-alias-interactive-bg-hover,transparent))}",
			".scc_searchWrap{position:relative}",
			".scc_searchWrap .scc_searchNative{padding-right:38px}",
			".scc_searchClear{position:absolute!important;right:5px;top:50%;transform:translateY(-50%);width:28px!important;height:28px!important;min-width:28px!important;padding:0!important}",
			"@media(max-width:900px){.scc_hasInlineDetail>.scc_header,.scc_hasInlineDetail>.scc_toolbar,.scc_hasInlineDetail>.scc_banner,.scc_hasInlineDetail>.scc_body{margin-right:0}.scc_inlineDetail{width:100%;left:0}.scc_editorRow{grid-template-columns:1fr}}",
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

		function stripCatalogRecord(record) {
			const { sessionId, status, lastDelivery, ...expected } = record;
			return expected;
		}
		function systemTimeZone() {
			return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
		}
		function validTimeZone(value) {
			try { new Intl.DateTimeFormat("en-US", { timeZone: value }).format(); return true; }
			catch { return value === "UTC"; }
		}
		function wallClock(value, zone) {
			const date = new Date(value);
			if (!Number.isFinite(date.getTime())) return { date: "", time: "" };
			try {
				const parts = Object.fromEntries(new Intl.DateTimeFormat("en-CA", {
					timeZone: zone,
					year: "numeric", month: "2-digit", day: "2-digit",
					hour: "2-digit", minute: "2-digit", second: "2-digit", fractionalSecondDigits: 3, hourCycle: "h23"
				}).formatToParts(date).map((part) => [part.type, part.value]));
				return {
					date: parts.year + "-" + parts.month + "-" + parts.day,
					time: parts.hour + ":" + parts.minute + ":" + parts.second + (parts.fractionalSecond ? "." + parts.fractionalSecond : "")
				};
			} catch {
				return { date: date.toISOString().slice(0, 10), time: date.toISOString().slice(11, 19) };
			}
		}
		function ruleChoice(record) {
			if (record.kind === "at" || record.kind === "after") return "once";
			if (record.kind === "weekly" && JSON.stringify(record.weekdays ?? []) === JSON.stringify([1,2,3,4,5])) return "weekdays";
			return record.kind;
		}
		function intervalDraft(record) {
			const seconds = record.kind === "every" ? Number(record.everySeconds) : 3600;
			if (seconds % 3600 === 0) return { intervalValue: String(seconds / 3600), intervalUnit: "hour" };
			if (seconds % 60 === 0) return { intervalValue: String(seconds / 60), intervalUnit: "minute" };
			return { intervalValue: String(seconds), intervalUnit: "second" };
		}
		function seedEditor(record) {
			const zone = recordZone(record) ?? systemTimeZone();
			const clock = wallClock(record.scheduledAt, zone);
			const interval = intervalDraft(record);
			const cronSeed = record.kind === "cron" ? record.expression : Number(clock.time.slice(3,5)) + " " + Number(clock.time.slice(0,2)) + " * * *";
			return {
				title: record.title ?? "",
				prompt: record.prompt ?? "",
				rule: ruleChoice(record),
				date: clock.date,
				time: record.kind === "daily" || record.kind === "weekly" ? formatTimeOnly(record.time) : clock.time,
				timeZone: zone,
				weekdays: record.kind === "weekly" ? [...record.weekdays] : [1,2,3,4,5],
				expression: cronSeed,
				...interval
			};
		}
		function editorTimingKeys() {
			return ["rule","date","time","timeZone","weekdays","expression","intervalValue","intervalUnit"];
		}
		function timingDirty(dirty) {
			return editorTimingKeys().some((key) => dirty[key]);
		}
		function withSeconds(value) {
			const text = String(value ?? "");
			return /^\d{2}:\d{2}$/.test(text) ? text + ":00" : text;
		}
		function editorChange(draft) {
			switch (draft.rule) {
				case "once": return { kind: "at", at: { date: draft.date, time: withSeconds(draft.time), time_zone: draft.timeZone.trim() } };
				case "every": {
					const unit = draft.intervalUnit === "hour" ? 3600 : draft.intervalUnit === "minute" ? 60 : 1;
					return { kind: "every", every_seconds: Math.round(Number(draft.intervalValue) * unit) };
				}
				case "daily": return { kind: "daily", daily: { time: withSeconds(draft.time), time_zone: draft.timeZone.trim() } };
				case "weekdays": return { kind: "weekly", weekly: { time: withSeconds(draft.time), time_zone: draft.timeZone.trim(), weekdays: [1,2,3,4,5] } };
				case "weekly": return { kind: "weekly", weekly: { time: withSeconds(draft.time), time_zone: draft.timeZone.trim(), weekdays: [...draft.weekdays].sort() } };
				case "cron": return { kind: "cron", cron: { expression: draft.expression.trim(), time_zone: draft.timeZone.trim() } };
				default: return undefined;
			}
		}
		function editorError(draft, t) {
			const title = String(draft.title ?? "").trim();
			const prompt = String(draft.prompt ?? "").trim();
			if (!title || title.length > 120) return t("edit.invalidTitle");
			if (!prompt) return t("edit.invalidPrompt");
			if (draft.rule === "every") {
				const seconds = Number(draft.intervalValue) * (draft.intervalUnit === "hour" ? 3600 : draft.intervalUnit === "minute" ? 60 : 1);
				if (!Number.isFinite(seconds) || seconds < 60) return t("edit.invalidInterval");
				return null;
			}
			if (!validTimeZone(String(draft.timeZone ?? "").trim())) return t("edit.invalidZone");
			if (draft.rule === "once" && (!/^\d{4}-\d{2}-\d{2}$/.test(draft.date) || !/^\d{2}:\d{2}(?::\d{2})?$/.test(draft.time))) return t("edit.invalidDateTime");
			if ((draft.rule === "daily" || draft.rule === "weekdays" || draft.rule === "weekly") && !/^\d{2}:\d{2}(?::\d{2})?$/.test(draft.time)) return t("edit.invalidDateTime");
			if (draft.rule === "weekly" && (!Array.isArray(draft.weekdays) || draft.weekdays.length === 0)) return t("edit.invalidWeekdays");
			if (draft.rule === "cron" && String(draft.expression ?? "").trim().split(/\s+/).length !== 5) return t("edit.invalidCron");
			return null;
		}
		function weekDayLabel(day, locale) {
			const monday = Date.UTC(2026, 0, 5);
			return new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }).format(new Date(monday + (day - 1) * 86400000));
		}
		function timeZoneChoices() {
			try {
				const supported = typeof Intl.supportedValuesOf === "function" ? Intl.supportedValuesOf("timeZone") : [];
				return [...new Set(["UTC", systemTimeZone(), ...supported])];
			} catch { return ["UTC", systemTimeZone()]; }
		}

		const nativeScheduleInjectCache = new WeakMap();

		function useNativeScheduleEntry() {
			const [, setRevision] = react.useState(0);
			react.useEffect(() => hostCtx.slots.subscribe("main", () => setRevision((value) => value + 1)), []);
			return hostCtx.slots.entries("main").find((entry) =>
				entry.options?.key === PANEL_ID
				&& entry.locale === "schedule.manager"
				&& entry.component !== SchedulePanel
			) ?? null;
		}

		function nativeSelectorHook(source) {
			return (selector = (value) => value) => selector(useObservable(source));
		}

		function nativeScheduleProps(entry) {
			let cached = nativeScheduleInjectCache.get(entry);
			if (cached) return cached;
			if (typeof entry.inject !== "function") return null;
			const injected = entry.inject();
			const source = injected?.hooks?.catalog;
			if (!source?.getSnapshot || !source?.subscribe) return null;
			cached = {
				...injected,
				useCatalog: nativeSelectorHook(source),
				useSessions: nativeSelectorHook(hostCtx.sessions.list),
				useWorkspaces: nativeSelectorHook(hostCtx.workspaces.list),
				t: hostCtx.locale.bind(entry.locale ?? "schedule.manager")
			};
			nativeScheduleInjectCache.set(entry, cached);
			return cached;
		}

		function nativeDetailElement(page) {
			if (!page) return null;
			return [...page.children].find((node) => node.tagName === "ASIDE") ?? null;
		}

		function NativeTaskDetailBridge({ record, tab, onClose }) {
			const entry = useNativeScheduleEntry();
			const hostRef = react.useRef(null);
			const closeRef = react.useRef(onClose);
			closeRef.current = onClose;
			const props = entry ? nativeScheduleProps(entry) : null;
			const key = identity(record);

			react.useEffect(() => {
				const host = hostRef.current;
				if (!host || !entry || !props) return;
				let cancelled = false;
				let timer = null;
				let attempts = 0;
				let hadDetail = false;
				let closeReported = false;

				const inspect = () => {
					if (cancelled) return;
					attempts += 1;
					const page = host.querySelector('[data-testid="task-manager-page"]');
					if (!page) {
						if (attempts < 60) timer = window.setTimeout(inspect, 50);
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
					if (attempts < 60) timer = window.setTimeout(inspect, 50);
				};

				const observer = new MutationObserver(() => {
					if (cancelled || closeReported) return;
					const detail = nativeDetailElement(host.querySelector('[data-testid="task-manager-page"]'));
					if (detail) {
						hadDetail = true;
						return;
					}
					if (hadDetail) {
						closeReported = true;
						closeRef.current?.();
					}
				});
				observer.observe(host, { subtree: true, childList: true });
				inspect();
				return () => {
					cancelled = true;
					if (timer !== null) window.clearTimeout(timer);
					observer.disconnect();
				};
			}, [entry, props, key, tab]);

			if (!entry || !props) {
				return jsx.jsx("aside", {
					className: "scc_inlineDetail scc_nativeDetailHost",
					children: jsx.jsx("div", { className: "scc_emptyHint", children: "Native DSH task detail is loading…" })
				});
			}

			const Native = entry.component;
			const nativeProps = {
				...props,
				onOpenSession: (sessionId) => {
					markRecordSeen(record);
					props.onOpenSession?.(sessionId);
				}
			};
			return jsx.jsx("aside", {
				className: "scc_inlineDetail scc_nativeDetailHost",
				ref: hostRef,
				children: jsx.jsx(Native, { ...nativeProps }, key)
			});
		}
		function historyInitial() { return { records: [], loading: false, error: null, errorCode: null, nextBefore: undefined, earlierRecordsPruned: false, retention: undefined, loaded: false }; }

		function SchedulePanel({ t }) {
			const catalogState = useObservable(catalog);
			useObservable(seenRevisionSource);
			const { sessions, workspaces } = useSessionSnapshots();
			const locale = (typeof document !== "undefined" && document.documentElement?.lang) || undefined;
			const zones = react.useMemo(() => timeZoneChoices(), []);
			const [query, setQuery] = react.useState("");
			const [filter, setFilter] = react.useState("active");
			const [grouping, setGrouping] = react.useState("date");
			const [now, setNow] = react.useState(() => Date.now());
			const [selectedKey, setSelectedKey] = react.useState(null);
			const [detailTab, setDetailTab] = react.useState("rule");
			const [nativeSelectedKey, setNativeSelectedKey] = react.useState(null);
			const [nativeDetailTab, setNativeDetailTab] = react.useState("rule");
			const [edit, setEdit] = react.useState(null);
			const [editBase, setEditBase] = react.useState(null);
			const [editDirty, setEditDirty] = react.useState({});
			const [editPending, setEditPending] = react.useState(false);
			const [editError, setEditError] = react.useState(null);
			const [histories, setHistories] = react.useState({});
			const [confirmDeleteRecord, setConfirmDeleteRecord] = react.useState(null);
			const [toast, setToast] = react.useState(null);
			const [copiedMessageId, setCopiedMessageId] = react.useState(null);
			const toastSeq = react.useRef(0);
			const historySeq = react.useRef(new Map());
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
			const nativeSelectedRecord = nativeSelectedKey === null ? undefined : catalogState.records.find((record) => identity(record) === nativeSelectedKey);
			const selectedSnapshot = selectedRecord ? JSON.stringify(selectedRecord) : "";
			const dirtySignature = JSON.stringify(editDirty);

			react.useEffect(() => {
				if (selectedKey === null) return;
				if (!selectedRecord) {
					setSelectedKey(null);
					setEdit(null);
					setEditBase(null);
					setEditDirty({});
					setEditError(null);
					return;
				}
				const seeded = seedEditor(selectedRecord);
				if (!editBase || identity(editBase) !== identity(selectedRecord)) {
					setEdit(seeded);
					setEditBase(selectedRecord);
					setEditDirty({});
					setEditError(null);
					return;
				}
				setEdit((current) => {
					if (!current) return seeded;
					const merged = { ...current };
					for (const key of Object.keys(seeded)) if (!editDirty[key]) merged[key] = seeded[key];
					return merged;
				});
				setEditBase(selectedRecord);
			}, [selectedKey, selectedSnapshot, dirtySignature]);

			react.useEffect(() => {
				if (selectedKey === null || detailTab !== "records" || !selectedRecord) return;
				const state = histories[selectedKey];
				if (!state?.loaded && !state?.loading) void loadHistory(selectedRecord, "initial");
			}, [selectedKey, detailTab, selectedSnapshot]);

			react.useEffect(() => {
				if (selectedKey === null || detailTab !== "records" || !selectedRecord) return;
				const state = histories[selectedKey];
				if (!state?.loaded || state.loading || state.error) return;
				const latest = selectedRecord.lastDelivery?.messageId;
				const loaded = state.records?.[0]?.messageId;
				if (latest && latest !== loaded) void loadHistory(selectedRecord, "initial");
			}, [selectedKey, detailTab, selectedRecord?.lastDelivery?.messageId, histories[selectedKey]?.records?.[0]?.messageId]);

			const showToast = (kind, text) => setToast({ kind, text, seq: ++toastSeq.current });
			const openTask = (record, event, tab = "rule") => {
				event?.stopPropagation?.();
				markRecordSeen(record);
				setNativeSelectedKey(identity(record));
				setNativeDetailTab(tab);
			};
			const openNativeDetails = (record, event) => openTask(record, event, "rule");
			const openNativeHistory = (record, event) => openTask(record, event, "records");
			const closeNativeDetail = () => setNativeSelectedKey(null);
			const closeInline = () => {
				setSelectedKey(null);
				setEdit(null);
				setEditBase(null);
				setEditDirty({});
				setEditError(null);
			};
			const openLinkedSession = (record) => {
				if (sessionLinkState(record.sessionId, sessions, workspaces) !== "available") return;
				markRecordSeen(record);
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
					const incoming = value.records;
					let records = incoming;
					if (mode === "more") {
						const seen = new Set(previous.records.map((item) => item.messageId));
						records = [...previous.records, ...incoming.filter((item) => !seen.has(item.messageId))];
					}
					return { ...state, [key]: {
						...previous,
						loading: false,
						loaded: true,
						error: null,
						errorCode: null,
						records,
						nextBefore: value.nextBefore,
						earlierRecordsPruned: value.earlierRecordsPruned === true,
						retention: value.retention
					} };
				});
			};

			const requestDelete = (record, event) => {
				event?.stopPropagation?.();
				setConfirmDeleteRecord(record);
			};
			const confirmDelete = async () => {
				const record = confirmDeleteRecord;
				if (!record) return;
				setConfirmDeleteRecord(null);
				const outcome = await catalog.remove(record);
				if (selectedKey === identity(record) && (outcome === "deleted" || outcome === "gone")) closeInline();
				if (nativeSelectedKey === identity(record) && (outcome === "deleted" || outcome === "gone")) closeNativeDetail();
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

			const setEditField = (key, value) => {
				setEdit((current) => current ? { ...current, [key]: value } : current);
				setEditDirty((current) => ({ ...current, [key]: true }));
				setEditError(null);
			};
			const chooseRule = (rule) => {
				if (!edit || !selectedRecord) return;
				const currentZone = edit.timeZone || recordTimeZone(selectedRecord) || systemTimeZone();
				const clock = wallClock(selectedRecord.scheduledAt, currentZone);
				const patch = { rule };
				if (rule === "once") {
					patch.date = edit.date || clock.date;
					patch.time = edit.time || clock.time;
					patch.timeZone = currentZone;
				} else if (rule === "every") {
					patch.intervalValue = edit.intervalValue || "60";
					patch.intervalUnit = edit.intervalUnit || "minute";
				} else if (rule === "daily" || rule === "weekdays" || rule === "weekly") {
					patch.time = edit.time || clock.time;
					patch.timeZone = currentZone;
					if (rule === "weekly" && (!Array.isArray(edit.weekdays) || edit.weekdays.length === 0)) patch.weekdays = [1];
				} else if (rule === "cron") {
					patch.timeZone = currentZone;
					patch.expression = edit.expression || (Number(clock.time.slice(3,5)) + " " + Number(clock.time.slice(0,2)) + " * * *");
				}
				setEdit((current) => ({ ...current, ...patch }));
				setEditDirty((current) => {
					const next = { ...current, rule: true };
					for (const key of editorTimingKeys()) next[key] = true;
					return next;
				});
				setEditError(null);
			};
			const toggleWeekday = (day) => {
				if (!edit) return;
				const current = Array.isArray(edit.weekdays) ? edit.weekdays : [];
				if (current.length === 1 && current.includes(day)) return;
				const next = current.includes(day) ? current.filter((item) => item !== day) : [...current, day].sort();
				setEditField("weekdays", next);
			};
			const cancelEdit = () => {
				if (!selectedRecord) return;
				setEdit(seedEditor(selectedRecord));
				setEditBase(selectedRecord);
				setEditDirty({});
				setEditError(null);
			};
			const saveEdit = async () => {
				if (!selectedRecord || !edit || !editBase || editPending) return;
				const validation = editorError(edit, t);
				if (validation) { setEditError(validation); return; }
				const request = {
					sessionId: selectedRecord.sessionId,
					id: selectedRecord.id,
					expected: stripCatalogRecord(editBase)
				};
				if (editDirty.title) request.title = edit.title.trim();
				if (editDirty.prompt) request.prompt = edit.prompt.trim();
				if (timingDirty(editDirty)) request.change = editorChange(edit);
				if (request.title === undefined && request.prompt === undefined && request.change === undefined) return;
				setEditPending(true);
				setEditError(null);
				const result = await catalog.update(request);
				setEditPending(false);
				if (!result?.ok) {
					setEditError(result?.error?.message ?? t("edit.saveFailed"));
					return;
				}
				const value = result.value;
				if (value?.record && value.updated !== false) {
					const saved = { ...value.record, sessionId: selectedRecord.sessionId, status: selectedRecord.status, lastDelivery: selectedRecord.lastDelivery };
					setEdit(seedEditor(saved));
					setEditBase(saved);
					setEditDirty({});
					showToast("success", t("edit.saved"));
					return;
				}
				const code = value?.code;
				if (code === "schedule_conflict") {
					setEditError(t("edit.conflict"));
					void catalog.refresh(catalogState.readRequest);
				} else if (code === "schedule_ended") {
					setEditError(t("edit.ended"));
					void catalog.refresh(catalogState.readRequest);
				} else if (code === "schedule_not_found") setEditError(t("edit.notFound"));
				else setEditError(value?.message ?? t("edit.saveFailed"));
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
							jsx.jsx(primitives.Button, { size: "sm", variant: "outline", onClick: () => void loadHistory(record, state.errorCode === "delivery_cursor_not_found" ? "initial" : (state.nextBefore ? "more" : "initial")), children: t(state.errorCode === "delivery_cursor_not_found" ? "history.refresh" : "history.retry") })
						] }) : null,
						state.nextBefore ? jsx.jsx(primitives.Button, { size: "sm", variant: "outline", disabled: state.loading, onClick: () => void loadHistory(record, "more"), children: state.loading ? t("history.loading") : t("history.more") }) : null,
						showPruned ? jsx.jsx("div", { className: "scc_historyNote", children: t("history.pruned", { days: state.retention?.days ?? "?", records: state.retention?.records ?? "?" }) }) : null
					]
				});
			};

			const renderEditorFields = (record) => {
				if (!edit) return null;
				const active = record.status === "active";
				const busy = editPending || catalogState.status === "loading";
				const zoneListId = "scc-timezones";
				const row = (label, control, key) => jsx.jsxs("div", { className: "scc_editorRow", children: [
					jsx.jsx("span", { className: "scc_editorLabel", children: label }),
					control
				] }, key);
				const zoneInput = jsx.jsxs(jsx.Fragment, { children: [
					jsx.jsx("input", {
						className: "scc_editorText",
						list: zoneListId,
						value: edit.timeZone,
						disabled: !active || busy,
						onChange: (event) => setEditField("timeZone", event.target.value)
					}),
					jsx.jsx("datalist", { id: zoneListId, children: zones.map((zone) => jsx.jsx("option", { value: zone }, zone)) })
				] });
				const rows = [
					row(t("edit.repeat"), jsx.jsx("select", {
						className: "scc_editorSelect",
						value: edit.rule,
						disabled: !active || busy,
						onChange: (event) => chooseRule(event.target.value),
						children: [
							jsx.jsx("option", { value: "once", children: t("edit.rule.once") }, "once"),
							jsx.jsx("option", { value: "every", children: t("edit.rule.every") }, "every"),
							jsx.jsx("option", { value: "daily", children: t("edit.rule.daily") }, "daily"),
							jsx.jsx("option", { value: "weekdays", children: t("edit.rule.weekdays") }, "weekdays"),
							jsx.jsx("option", { value: "weekly", children: t("edit.rule.weekly") }, "weekly"),
							jsx.jsx("option", { value: "cron", children: t("edit.rule.cron") }, "cron")
						]
					}), "repeat")
				];
				if (edit.rule === "once") {
					rows.push(row(t("edit.date"), jsx.jsx("input", { className: "scc_editorText", type: "date", value: edit.date, disabled: !active || busy, onChange: (event) => setEditField("date", event.target.value) }), "date"));
					rows.push(row(t("edit.time"), jsx.jsx("input", { className: "scc_editorText", type: "time", step: "0.001", value: edit.time, disabled: !active || busy, onChange: (event) => setEditField("time", event.target.value) }), "time"));
					rows.push(row(t("edit.timeZone"), zoneInput, "zone"));
					rows.push(jsx.jsx("div", { className: "scc_editorHint", children: t("edit.onceZoneHint") }, "once-hint"));
				} else if (edit.rule === "every") {
					rows.push(row(t("edit.interval"), jsx.jsxs("div", { className: "scc_editorPair", children: [
						jsx.jsx("input", { className: "scc_editorText", type: "number", min: "1", step: "1", value: edit.intervalValue, disabled: !active || busy, onChange: (event) => setEditField("intervalValue", event.target.value) }),
						jsx.jsx("select", { className: "scc_editorSelect", value: edit.intervalUnit, disabled: !active || busy, onChange: (event) => setEditField("intervalUnit", event.target.value), children: [
							jsx.jsx("option", { value: "hour", children: t("edit.unit.hours") }, "hour"),
							jsx.jsx("option", { value: "minute", children: t("edit.unit.minutes") }, "minute"),
							jsx.jsx("option", { value: "second", children: t("edit.unit.seconds") }, "second")
						] })
					] }), "interval"));
					rows.push(jsx.jsx("div", { className: "scc_editorHint", children: t("edit.intervalHint") }, "interval-hint"));
				} else if (edit.rule === "daily" || edit.rule === "weekdays" || edit.rule === "weekly") {
					if (edit.rule === "weekly") rows.push(row(t("edit.weekdays"), jsx.jsx("div", { className: "scc_weekdays", children: [1,2,3,4,5,6,7].map((day) => jsx.jsx("button", {
						type: "button",
						className: "scc_weekday" + (edit.weekdays.includes(day) ? " scc_weekdayActive" : ""),
						disabled: !active || busy,
						"aria-pressed": edit.weekdays.includes(day),
						onClick: () => toggleWeekday(day),
						children: weekDayLabel(day, locale)
					}, day)) }), "weekdays"));
					rows.push(row(t("edit.time"), jsx.jsx("input", { className: "scc_editorText", type: "time", step: "0.001", value: edit.time, disabled: !active || busy, onChange: (event) => setEditField("time", event.target.value) }), "time"));
					rows.push(row(t("edit.timeZone"), zoneInput, "zone"));
				} else if (edit.rule === "cron") {
					rows.push(row(t("edit.cron"), jsx.jsx("input", { className: "scc_editorText", value: edit.expression, disabled: !active || busy, placeholder: "0 9 * * 1-5", onChange: (event) => setEditField("expression", event.target.value) }), "cron"));
					rows.push(row(t("edit.timeZone"), zoneInput, "zone"));
					rows.push(jsx.jsx("div", { className: "scc_editorHint", children: t("edit.cronHint") }, "cron-hint"));
				}
				return jsx.jsxs("div", { className: "scc_editorCard", children: [
					jsx.jsx("div", { className: "scc_editorCardTitle", children: t("edit.runtime") }),
					...rows
				] });
			};

			const renderInlineDetail = (record) => {
				const linkState = sessionLinkState(record.sessionId, sessions, workspaces);
				const dirty = Object.keys(editDirty).some((key) => editDirty[key]);
				return jsx.jsxs("aside", {
					className: "scc_inlineDetail",
					"aria-label": t("detail.label"),
					onKeyDown: (event) => {
						if (event.key === "Escape" && confirmDeleteRecord === null) {
							event.preventDefault();
							closeInline();
						}
					},
					children: [
						jsx.jsxs("div", { className: "scc_detailBar", children: [
							jsx.jsx("div", { className: "scc_detailTabs", role: "tablist", "aria-label": t("detail.tabs"), children: ["rule","records"].map((tab) => jsx.jsx("button", {
								type: "button",
								role: "tab",
								"aria-selected": detailTab === tab,
								className: "scc_detailTab" + (detailTab === tab ? " scc_detailTabActive" : ""),
								onClick: () => {
									setDetailTab(tab);
									if (tab === "records") {
										const state = histories[identity(record)];
										if (!state?.loaded && !state?.loading) void loadHistory(record, "initial");
									}
								},
								onKeyDown: (event) => {
									if (!["ArrowLeft","ArrowRight","Home","End"].includes(event.key)) return;
									event.preventDefault();
									const next = event.key === "Home" ? "rule" : event.key === "End" ? "records" : tab === "rule" ? "records" : "rule";
									setDetailTab(next);
									event.currentTarget.parentElement?.querySelector('[data-detail-tab="' + next + '"]')?.focus();
									if (next === "records") {
										const state = histories[identity(record)];
										if (!state?.loaded && !state?.loading) void loadHistory(record, "initial");
									}
								},
								"data-detail-tab": tab,
								children: t("detail." + tab)
							}, tab)) }),
							jsx.jsx("span", { className: "scc_detailBarSpacer" }),
							jsx.jsx(primitives.Tooltip, {
								label: t("detail.openSession"),
								side: "top", portal: true,
								children: jsx.jsx(primitives.Button, {
									size: "sm",
									className: "scc_iconButton",
									disabled: linkState !== "available",
									"aria-label": t("detail.openSession"),
									onClick: () => openLinkedSession(record),
									children: ChevronRightIcon ? jsx.jsx(ChevronRightIcon, { size: 16 }) : null
								})
							}),
							jsx.jsx(primitives.Tooltip, {
								label: t("action.delete"),
								side: "top", portal: true,
								children: jsx.jsx(primitives.Button, {
									size: "sm",
									className: "scc_iconButton scc_iconButtonDanger",
									disabled: catalogState.deleting.includes(record.id) || catalogState.status === "loading",
									"aria-label": t("action.delete"),
									onClick: (event) => requestDelete(record, event),
									children: TrashIcon ? jsx.jsx(TrashIcon, { size: 16 }) : null
								})
							}),
							jsx.jsx(primitives.Button, {
								size: "sm",
								className: "scc_iconButton",
								"aria-label": t("detail.close"),
								onClick: closeInline,
								children: CloseIcon ? jsx.jsx(CloseIcon, { size: 16 }) : null
							})
						] }),
						detailTab === "records"
							? jsx.jsx("div", { className: "scc_detailScroll", children: renderHistory(record) })
							: jsx.jsxs(jsx.Fragment, { children: [
								jsx.jsxs("div", { className: "scc_detailScroll", children: [
									record.status === "active"
										? jsx.jsx("input", {
											className: "scc_editorText scc_detailHeading",
											value: edit?.title ?? record.title,
											disabled: editPending || catalogState.status === "loading",
											"aria-label": t("edit.name"),
											onChange: (event) => setEditField("title", event.target.value)
										})
										: jsx.jsx("h2", { className: "scc_detailHeading", children: record.title }),
									jsx.jsx("div", { className: "scc_detailNext", children: record.status === "active"
										? t("detail.next", { value: formatInstant(record.scheduledAt, locale, undefined), relative: relative(record.scheduledAt, now, t) })
										: t("status.inactive") }),
									record.status === "active"
										? jsx.jsx("textarea", {
											className: "scc_editorTextarea",
											value: edit?.prompt ?? record.prompt,
											disabled: editPending || catalogState.status === "loading",
											"aria-label": t("edit.prompt"),
											onChange: (event) => setEditField("prompt", event.target.value)
										})
										: jsx.jsx("div", { className: "scc_readonly", children: record.prompt }),
									renderEditorFields(record),
									record.status === "inactive" ? jsx.jsx("div", { className: "scc_editorHint", children: t("edit.inactive") }) : null,
									editError ? jsx.jsx("div", { className: "scc_editorError", role: "alert", children: editError }) : null,
									jsx.jsxs("div", { className: "scc_source", children: [
										jsx.jsx("span", { children: t("detail.taskId") }),
										jsx.jsx("span", { className: "scc_historyId", children: record.id })
									] }),
									jsx.jsxs("div", { className: "scc_source", children: [
										jsx.jsx("span", { children: t("source") }),
										jsx.jsx("span", { className: "scc_sourceName", children: sessionTitle(record.sessionId, sessions) })
									] })
								] }),
								record.status === "active" && dirty ? jsx.jsxs("div", { className: "scc_saveBar", children: [
									jsx.jsx("span", { className: "scc_saveNotice", children: t("edit.unsaved") }),
									jsx.jsx(primitives.Button, { disabled: editPending || catalogState.status === "loading", onClick: cancelEdit, children: t("edit.cancel") }),
									jsx.jsx(primitives.Button, { variant: "primary", disabled: editPending || catalogState.status === "loading", onClick: () => void saveEdit(), children: t(editPending ? "edit.saving" : "edit.save") })
								] }) : null
							] })
					]
				});
			};

			return jsx.jsxs("div", {
				className: "scc_root" + (nativeSelectedRecord ? " scc_hasInlineDetail" : ""),
				children: [
					jsx.jsxs("header", { className: "scc_header", children: [
						jsx.jsx("span", { className: "scc_title", children: t("header") }),
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
							jsx.jsx("div", { className: "scc_filters", children: ["active", "all", "inactive", "today", "overdue", "recurring"].map((name) => jsx.jsxs("button", { type: "button", className: "scc_chip" + (filter === name ? " scc_chipActive" : ""), "aria-pressed": filter === name, onClick: () => setFilter(name), children: [t("filter." + name), Object.hasOwn(statusCounts, name) ? jsx.jsx("span", { className: "scc_chipCount", children: statusCounts[name] }) : null] }, name)) }),
							jsx.jsxs("div", { className: "scc_grouping", children: [
								jsx.jsx("span", { className: "scc_groupLabel", children: t("group.by") }),
								...["date", "session"].map((name) => jsx.jsx("button", { type: "button", className: "scc_chip" + (grouping === name ? " scc_chipActive" : ""), "aria-pressed": grouping === name, onClick: () => setGrouping(name), children: t("group." + name) }, name))
							] })
						] })
					] }),
					catalogState.status === "error" && catalogState.records.length > 0 ? jsx.jsxs("div", { className: "scc_banner", children: [jsx.jsx("span", { children: t("catalog.stale") }), jsx.jsx(primitives.Button, { size: "sm", variant: "outline", onClick: () => void catalog.refresh(catalogState.readRequest), children: t("retry") })] }) : null,
					jsx.jsx("div", { className: "scc_body", children: visible.length === 0 ? jsx.jsxs("div", { className: "scc_empty", children: [
						jsx.jsx("span", { className: "scc_emptyIcon", children: ClockIcon ? jsx.jsx(ClockIcon, { size: 28 }) : null }),
						jsx.jsx("div", { className: "scc_emptyTitle", children: catalogState.status === "loading" && !catalogState.settled ? t("empty.loading") : catalogState.status === "error" && !catalogState.settled ? t("empty.error") : filter === "inactive" && query.trim() === "" ? t("empty.inactive") : hasControls ? t("empty.filtered") : t("empty.none") }),
						jsx.jsx("div", { className: "scc_emptyHint", children: catalogState.status === "error" && !catalogState.settled ? t("empty.errorHint") : hasControls ? t("empty.filteredHint") : t("empty.noneHint") }),
						catalogState.status === "error" ? jsx.jsx(primitives.Button, { size: "sm", variant: "outline", onClick: () => void catalog.refresh(catalogState.readRequest), children: t("retry") }) : null
					] }) : jsx.jsx("div", { className: "scc_list", role: "list", "aria-label": t("list.aria"), children: groups.map((group) => jsx.jsxs("section", { className: "scc_group", children: [
						jsx.jsxs("div", { className: "scc_groupHeader", children: [jsx.jsx("span", { children: group.label }), jsx.jsx("span", { className: "scc_groupCount", children: group.records.length })] }),
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
								className: "scc_row" + (overdue ? " scc_rowOverdue" : "") + (record.status === "inactive" ? " scc_rowInactive" : "") + (nativeSelectedKey === key ? " scc_selectedRow" : ""),
								"data-task-id": record.id,
								children: [
									jsx.jsxs("div", {
										className: "scc_rowMain", role: "button", tabIndex: 0,
										onClick: (event) => openTask(record, event),
										onKeyDown: (event) => {
											if (event.key !== "Enter" && event.key !== " ") return;
											event.preventDefault();
											openTask(record, event);
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
												record.status === "active" ? jsx.jsxs(jsx.Fragment, { children: [jsx.jsx("span", { className: "scc_sep", children: "·" }), jsx.jsx("span", { children: relative(record.scheduledAt, now, t) })] }) : null,
												record.lastDelivery ? jsx.jsxs(jsx.Fragment, { children: [jsx.jsx("span", { className: "scc_sep", children: "·" }), jsx.jsx("span", { children: t("acknowledged", { value: formatInstant(record.lastDelivery.deliveredAt, locale, undefined) }) })] }) : null
											] }),
											jsx.jsxs("div", { className: "scc_source", children: [jsx.jsx("span", { children: t("source") }), jsx.jsx("span", { className: "scc_sourceName", title: source, children: source })] })
										]
									}),
									jsx.jsxs("div", { className: "scc_actions", children: [
										jsx.jsx(primitives.Tooltip, { label: t("action.details"), side: "top", portal: true, children: jsx.jsx(primitives.Button, {
											size: "sm", className: "scc_iconButton" + (nativeSelectedKey === key && nativeDetailTab === "rule" ? " scc_iconButtonActive" : ""),
											"aria-label": t("action.details"), "aria-pressed": nativeSelectedKey === key && nativeDetailTab === "rule",
											onClick: (event) => openNativeDetails(record, event), children: EditIcon ? jsx.jsx(EditIcon, { size: 16 }) : null
										}) }),
										jsx.jsx(primitives.Tooltip, { label: t("action.history"), side: "top", portal: true, children: jsx.jsx(primitives.Button, {
											size: "sm", className: "scc_iconButton",
											"aria-label": t("action.history"),
											onClick: (event) => openNativeHistory(record, event), children: HistoryIcon ? jsx.jsx(HistoryIcon, { size: 16 }) : null
										}) }),
										jsx.jsx(primitives.Tooltip, { label: deleting ? t("delete.pending") : t("action.delete"), side: "top", portal: true, children: jsx.jsx(primitives.Button, {
											size: "sm", className: "scc_iconButton scc_iconButtonDanger", disabled: deleting || catalogState.status === "loading",
											"aria-label": deleting ? t("delete.pending") : t("action.delete"),
											onClick: (event) => requestDelete(record, event), children: TrashIcon ? jsx.jsx(TrashIcon, { size: 16 }) : null
										}) })
									] })
								]
							}, key);
						}) })
					] }, group.key)) }) }),
					nativeSelectedRecord ? jsx.jsx(NativeTaskDetailBridge, {
						record: nativeSelectedRecord,
						tab: nativeDetailTab,
						onClose: closeNativeDetail
					}) : null,
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
									"data-modal-autofocus": true,
									onClick: () => setConfirmDeleteRecord(null),
									children: t("delete.cancel")
								}),
								jsx.jsx(primitives.Button, {
									className: "scc_iconButtonDanger",
									disabled: catalogState.deleting.includes(confirmDeleteRecord.id),
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

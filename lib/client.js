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
			".st_header{flex:none;display:flex;align-items:baseline;gap:10px;padding:16px 20px 12px;border-bottom:0.5px solid var(--dsw-alias-border-l1)}",
			".st_title{font-size:16px;font-weight:600;line-height:24px}",
			".st_count{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:16px}",
			".st_body{flex:1;min-height:0;display:flex}",
			".st_empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:40px 24px;text-align:center}",
			".st_emptyIcon{color:var(--dsw-alias-label-tertiary);display:inline-flex}",
			".st_emptyTitle{font-size:14px;font-weight:600;color:var(--dsw-alias-label-secondary);line-height:20px}",
			".st_emptyHint{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:18px;max-width:440px;overflow-wrap:anywhere}",
			".st_list{flex:1;overflow:auto;margin:0;padding:8px;list-style:none;display:flex;flex-direction:column;gap:6px;--dsh-scrollbar-thumb:var(--dsh-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsh-alias-scrollbar-hover-l2)}",
			".st_row{box-sizing:border-box;border:0.5px solid var(--dsw-alias-border-l1);border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:8px;flex:none;cursor:pointer;outline:none}",
			".st_row:hover{border-color:var(--dsw-alias-border-l2);background:var(--dsw-alias-interactive-bg-hover,transparent)}",
			".st_row:focus-visible{border-color:var(--dsw-alias-focus-primary,var(--dsw-alias-interactive-primary))}",
			".st_rowOverdue{border-color:var(--dsw-alias-state-warn-primary);background:var(--dsw-alias-state-warn-tertiary)}",
			".st_prompt{font-size:14px;line-height:20px;overflow-wrap:anywhere;white-space:normal}",
			".st_status{display:inline-flex;align-items:center;gap:6px;font-size:12px;line-height:16px;color:var(--dsw-alias-label-tertiary)}",
			".st_statusDot{width:8px;height:8px;border-radius:50%;background:var(--dsw-alias-state-business-primary);flex:none}",
			".st_rowOverdue .st_status{color:var(--dsw-alias-state-warn-label)}",
			".st_rowOverdue .st_statusDot{background:var(--dsw-alias-state-warn-primary)}",
			".st_meta{display:flex;flex-wrap:wrap;align-items:center;gap:6px;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:16px}",
			".st_metaSep{color:var(--dsw-alias-label-dimmed)}",
			".st_source{display:flex;align-items:center;gap:6px;font-size:12px;line-height:16px;color:var(--dsw-alias-label-secondary);min-width:0}",
			".st_sourceLabel{color:var(--dsw-alias-label-tertiary);flex:none}",
			".st_sourceName{color:var(--dsw-alias-label-primary);font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"
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
		function formatScheduleFrequency(record, t) {
			if (record.kind !== "every") return t("frequency.once");
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
		function flattenScheduleRows(snapshot) {
			const out = [];
			const ids = snapshot?.ids ?? [];
			const byId = snapshot?.byId ?? {};
			for (const id of ids) {
				const session = byId[id];
				if (session === undefined) continue;
				const records = session.projectionValues?.schedule;
				if (!Array.isArray(records) || records.length === 0) continue;
				for (const record of records) out.push({ session, record });
			}
			return out;
		}
		function orderScheduleRows(rows, now) {
			return rows
				.map((entry, index) => ({ entry, index }))
				.sort((left, right) => {
					const leftTime = Date.parse(left.entry.record.scheduledAt);
					const rightTime = Date.parse(right.entry.record.scheduledAt);
					const leftOverdue = leftTime <= now;
					const rightOverdue = rightTime <= now;
					if (leftOverdue !== rightOverdue) return Number(rightOverdue) - Number(leftOverdue);
					return leftTime - rightTime || left.index - right.index;
				})
				.map((item) => item.entry);
		}

		const ClockIcon = primitives.IconClockOutline16 ?? primitives.IconAlarmClockOutline16 ?? null;
		function ScheduleGlyph({ size }) {
			return ClockIcon ? react_jsx_runtime.jsx(ClockIcon, { size: size ?? 16 }) : null;
		}

		let hostCtx = null;

		function SchedulePanel({ t }) {
			const sessions = hostCtx?.sessions;
			const layout = hostCtx?.layout;
			const [snapshot, setSnapshot] = react.useState(() => sessions?.list?.getSnapshot());
			react.useEffect(() => {
				if (typeof sessions?.list?.subscribe !== "function") return;
				return sessions.list.subscribe(() => setSnapshot(sessions.list.getSnapshot()));
			}, []);
			const flat = flattenScheduleRows(snapshot);
			const [now, setNow] = react.useState(() => Date.now());
			const hasRecords = flat.length > 0;
			react.useEffect(() => {
				if (!hasRecords) return;
				setNow(Date.now());
				const timer = window.setInterval(() => setNow(Date.now()), 1000);
				return () => window.clearInterval(timer);
			}, [hasRecords]);
			const ordered = orderScheduleRows(flat, now);
			const openDialog = (sessionId) => {
				if (typeof sessions?.open === "function") sessions.open(sessionId);
				if (typeof layout?.selectPanel === "function") layout.selectPanel("conversation");
			};
			return (
				react_jsx_runtime.jsxs("div", {
					className: "st_root",
					children: [
						react_jsx_runtime.jsxs("header", {
							className: "st_header",
							children: [
								react_jsx_runtime.jsx("span", { className: "st_title", children: t("header") }),
								react_jsx_runtime.jsx("span", { className: "st_count", children: t(flat.length === 1 ? "count.one" : "count.other", { count: flat.length }) })
							]
						}),
						react_jsx_runtime.jsx("div", {
							className: "st_body",
							children: ordered.length === 0
								? react_jsx_runtime.jsxs("div", {
									className: "st_empty",
									children: [
										react_jsx_runtime.jsx("span", { className: "st_emptyIcon", children: ClockIcon ? react_jsx_runtime.jsx(ClockIcon, { size: 28 }) : null }),
										react_jsx_runtime.jsx("div", { className: "st_emptyTitle", children: t("empty.title") }),
										react_jsx_runtime.jsx("div", { className: "st_emptyHint", children: t("empty.hint") })
									]
								})
								: react_jsx_runtime.jsx("ul", {
									className: "st_list",
									role: "list",
									"aria-label": t("list.aria"),
									children: ordered.map(({ session, record }) => {
										const overdue = Date.parse(record.scheduledAt) <= now;
										const sourceName = session.title ?? session.displayTitle ?? session.id ?? "";
										const openThisDialog = () => openDialog(session.id);
										return react_jsx_runtime.jsxs("li", {
											className: "st_row" + (overdue ? " st_rowOverdue" : ""),
											role: "button",
											tabIndex: 0,
											"aria-label": `${record.prompt} — ${sourceName}`,
											onClick: openThisDialog,
											onKeyDown: (event) => {
												if (event.key === "Enter" || event.key === " ") openThisDialog();
											},
											children: [
												react_jsx_runtime.jsx("div", { className: "st_prompt", children: record.prompt }),
												react_jsx_runtime.jsxs("div", {
													className: "st_status",
													children: [
														react_jsx_runtime.jsx("span", { className: "st_statusDot", "aria-hidden": "true" }),
														react_jsx_runtime.jsx("span", { children: t(overdue ? "status.overdue" : "status.scheduled") })
													]
												}),
												react_jsx_runtime.jsxs("div", {
													className: "st_meta",
													children: [
														react_jsx_runtime.jsx("span", { children: formatScheduleFrequency(record, t) }),
														react_jsx_runtime.jsx("span", { className: "st_metaSep", "aria-hidden": "true", children: "·" }),
														react_jsx_runtime.jsx("span", { children: formatScheduleLocalTime(record.scheduledAt) }),
														react_jsx_runtime.jsx("span", { className: "st_metaSep", "aria-hidden": "true", children: "·" }),
														react_jsx_runtime.jsx("span", { children: formatScheduleRelative(record.scheduledAt, now, t) })
													]
												}),
												react_jsx_runtime.jsxs("div", {
													className: "st_source",
													children: [
														react_jsx_runtime.jsx("span", { className: "st_sourceLabel", children: t("source") }),
														react_jsx_runtime.jsx("span", { className: "st_sourceName", title: sourceName, children: sourceName })
													]
												})
											]
										}, session.id + ":" + record.id);
									})
								})
						})
					]
				})
			);
		}

		const zh = {
			"tab": "日程",
			"header": "日程",
			"count.one": "{count} 项",
			"count.other": "{count} 项",
			"empty.title": "暂无日程",
			"empty.hint": "在任意对话中创建提醒，例如：「10 分钟后提醒我……」。这里跨对话只读展示；点击某条即可打开它所在的对话。创建 / 修改 / 取消都在聊天里用 Schedule 工具完成。",
			"list.aria": "已计划的定时提醒",
			"status.scheduled": "已计划",
			"status.overdue": "已逾期",
			"source": "来自",
			"frequency.once": "单次",
			"frequency.every": "每 {value} {unit}",
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
			"relative.overdue": "已逾期 {value}{unit}"
		};
		const en = {
			"tab": "Schedule",
			"header": "Schedule",
			"count.one": "{count} item",
			"count.other": "{count} items",
			"empty.title": "Nothing scheduled",
			"empty.hint": "Create a reminder in any dialog, e.g. “remind me in 10 minutes to…”. This tab shows every scheduled item across all dialogs, read-only; click a row to open its dialog. Creating, changing and cancelling stays with the Schedule tools.",
			"list.aria": "Scheduled reminders",
			"status.scheduled": "Scheduled",
			"status.overdue": "Overdue",
			"source": "From",
			"frequency.once": "Once",
			"frequency.every": "Every {value} {unit}",
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
			"relative.overdue": "{value} {unit} overdue"
		};

		const NS = "schedule-tab";
		const inject = ["slots", "locale", "sessions", "layout"];
		function apply(ctx) {
			hostCtx = ctx;
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

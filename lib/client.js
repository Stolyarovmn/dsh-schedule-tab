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
			".st_status{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:2px 7px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary);background:var(--dsw-alias-interactive-bg-hover,transparent)}",
			".st_statusDot{width:6px;height:6px;border-radius:50%;background:var(--dsw-alias-state-business-primary);flex:none}",
			".st_rowOverdue .st_status{color:var(--dsw-alias-state-warn-label);background:var(--dsw-alias-state-warn-tertiary)}",
			".st_rowOverdue .st_statusDot{background:var(--dsw-alias-state-warn-primary)}",
			".st_meta{display:flex;flex-wrap:wrap;align-items:center;gap:6px;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:16px}",
			".st_metaSep{color:var(--dsw-alias-label-dimmed)}",
			".st_nextLabel{color:var(--dsw-alias-label-secondary);font-weight:500}",
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
					const leftTime = Date.parse(left.entry.record.scheduledAt);
					const rightTime = Date.parse(right.entry.record.scheduledAt);
					const leftOverdue = leftTime <= now;
					const rightOverdue = rightTime <= now;
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
			return rows.filter(({ session, record, sessionId }) => {
				const scheduled = Date.parse(record.scheduledAt);
				if (filter === "today" && !sameLocalDay(scheduled, now)) return false;
				if (filter === "overdue" && scheduled > now) return false;
				if (filter === "recurring" && record.kind !== "every") return false;
				if (!needle) return true;
				const haystack = [record.prompt, record.id, sourceNameFor(session), sessionId].filter(Boolean).join("\n").toLocaleLowerCase();
				return haystack.includes(needle);
			});
		}
		function dateGroupFor(entry, now, t) {
			const timestamp = Date.parse(entry.record.scheduledAt);
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

		const ClockIcon = primitives.IconAlarmClockOutlineRegular ?? primitives.IconClockOutline16 ?? primitives.IconAlarmClockOutline16 ?? null;
		function ScheduleGlyph({ size }) {
			return ClockIcon ? react_jsx_runtime.jsx(ClockIcon, { size: size ?? 16 }) : null;
		}

		let hostCtx = null;

		function SchedulePanel({ t }) {
			const sessions = hostCtx?.sessions;
			const uiWorkspace = hostCtx?.uiWorkspace;
			const [snapshot, setSnapshot] = react.useState(() => sessions?.list?.getSnapshot());
			const [query, setQuery] = react.useState("");
			const [filter, setFilter] = react.useState("all");
			const [grouping, setGrouping] = react.useState("date");
			react.useEffect(() => {
				if (typeof sessions?.list?.subscribe !== "function") return;
				return sessions.list.subscribe(() => setSnapshot(sessions.list.getSnapshot()));
			}, []);
			const canRefreshProjections = typeof sessions?.refreshProjections === "function";
			react.useEffect(() => {
				if (!canRefreshProjections) return;
				const projections = snapshot?.projectionsBySession ?? {};
				for (const [id] of snapshotEntries(snapshot)) {
					const state = projections[id]?.state;
					if (state !== undefined && state !== "idle") continue;
					Promise.resolve(sessions.refreshProjections(id)).catch(() => {});
				}
			}, [snapshot, canRefreshProjections]);
			const flat = flattenScheduleRows(snapshot);
			const projectionState = projectionReadState(snapshot, canRefreshProjections);
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
			const currentSessionId = snapshot?.current;
			const openDialog = (sessionId) => {
				if (typeof uiWorkspace?.openSession === "function") uiWorkspace.openSession(sessionId);
			};
			const filterButtons = ["all", "today", "overdue", "recurring"];
			const groupingButtons = ["date", "session"];
			const hasActiveControls = query.trim() !== "" || filter !== "all";
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
							})
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
											: t(projectionState === "loading"
												? "empty.loading.title"
												: projectionState === "unavailable"
													? "empty.unavailable.title"
													: projectionState === "error"
														? "empty.error.title"
														: "empty.title")
									}),
									react_jsx_runtime.jsx("div", {
										className: "st_emptyHint",
										children: hasActiveControls && flat.length > 0
											? t("empty.filtered.hint")
											: t(projectionState === "loading"
												? "empty.loading.hint"
												: projectionState === "unavailable"
													? "empty.unavailable.hint"
													: projectionState === "error"
														? "empty.error.hint"
														: "empty.hint")
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
											children: group.rows.map(({ session, record, sessionId }) => {
												const overdue = Date.parse(record.scheduledAt) <= now;
												const sourceName = sourceNameFor(session);
												const openThisDialog = () => openDialog(sessionId);
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
															className: "st_badges",
															children: [
																react_jsx_runtime.jsxs("span", {
																	className: "st_status",
																	children: [
																		react_jsx_runtime.jsx("span", { className: "st_statusDot", "aria-hidden": "true" }),
																		react_jsx_runtime.jsx("span", { children: t(overdue ? "status.overdue" : "status.scheduled") })
																	]
																}),
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
															children: [
																react_jsx_runtime.jsx("span", { children: formatScheduleFrequency(record, t) }),
																react_jsx_runtime.jsx("span", { className: "st_metaSep", "aria-hidden": "true", children: "·" }),
																react_jsx_runtime.jsx("span", { className: "st_nextLabel", children: t("next.value", { label: t(record.kind === "every" ? "next.recurring" : "next.once"), value: formatScheduleLocalTime(record.scheduledAt) }) }),
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
												}, sessionId + ":" + record.id);
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
			"filter.today": "今天",
			"filter.overdue": "逾期",
			"filter.recurring": "重复",
			"group.by": "分组",
			"group.date": "日期",
			"group.session": "对话",
			"group.overdue": "逾期",
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
			"session.running": "运行中",
			"session.idle": "空闲",
			"session.current": "当前对话",
			"next.once": "时间",
			"next.recurring": "下次",
			"next.value": "{label} {value}",
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
			"count.filtered": "{visible} / {total} items",
			"search.placeholder": "Search reminders or dialogs…",
			"search.aria": "Search reminders",
			"filter.all": "All",
			"filter.today": "Today",
			"filter.overdue": "Overdue",
			"filter.recurring": "Recurring",
			"group.by": "Group",
			"group.date": "Date",
			"group.session": "Dialog",
			"group.overdue": "Overdue",
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
			"session.running": "Running",
			"session.idle": "Idle",
			"session.current": "Current dialog",
			"next.once": "At",
			"next.recurring": "Next",
			"next.value": "{label} {value}",
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
		const inject = ["slots", "locale", "sessions", "uiWorkspace"];
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

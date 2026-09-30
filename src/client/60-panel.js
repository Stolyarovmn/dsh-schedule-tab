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

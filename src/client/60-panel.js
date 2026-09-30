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

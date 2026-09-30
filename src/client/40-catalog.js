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
			const preferences = useObservable(notificationPreferencesSource);
			const [now, setNow] = react.useState(() => Date.now());
			const signature = notificationSignature(state.records);
			react.useEffect(() => {
				if (state.status !== "ready") return;
				if (active || !preferences.newTasks) markTasksSeen(state.records);
				if (!preferences.newDeliveries) markDeliveriesSeen(state.records);
			}, [active, state.status, signature, preferences.newTasks, preferences.newDeliveries]);
			react.useEffect(() => {
				const delay = adaptiveTickDelay(state.records, now);
				if (delay === null) return;
				const timer = window.setTimeout(() => setNow(Date.now()), delay);
				return () => window.clearTimeout(timer);
			}, [state.records, now]);
			const summary = notificationSummary(state.records, now, preferences);
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


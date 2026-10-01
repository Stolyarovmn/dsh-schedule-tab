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

		function NativeTaskDetailBridge({ record, tab, onClose, t }) {
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
					children: jsx.jsx("div", { className: "scc_emptyHint", children: t("detail.loading") })
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

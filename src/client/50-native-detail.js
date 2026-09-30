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

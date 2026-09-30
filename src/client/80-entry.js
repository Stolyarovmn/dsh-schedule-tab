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
			ctx.slots.inject("main", () => {
				let nativeEntry = null;
				let disposePanel = null;
				const reconcile = () => {
					const next = findNativeScheduleMain(ctx);
					if (next === nativeEntry && disposePanel !== null) return;
					if (disposePanel !== null) {
						disposePanel();
						disposePanel = null;
					}
					nativeEntry = next ?? null;
					nativeScheduleMain = null;
					if (!next || !captureNativeScheduleMain(ctx, next)) return;
					disposePanel = ctx.slots.register({
						name: "main",
						key: PANEL_ID,
						priority: -100,
						locale: NS
					}, SchedulePanel);
				};
				const unsubscribe = ctx.slots.subscribe("main", reconcile);
				reconcile();
				return () => {
					unsubscribe();
					disposePanel?.();
					nativeScheduleMain = null;
				};
			});
		}
		exports.apply = apply;
		exports.inject = inject;

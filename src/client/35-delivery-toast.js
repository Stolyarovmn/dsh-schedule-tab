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

		function DeliveryToast({ useToast, useCatalog, useSeenRevision, report, dismiss, openRecord, t }) {
			const toast = useToast((current) => current);
			const catalogState = useCatalog((current) => current);
			useSeenRevision((current) => current);
			const signature = notificationSignature(catalogState.records);
			react.useEffect(() => {
				if (catalogState.status !== "ready") return;
				for (const record of catalogState.records) {
					if (!isDeliveryUnread(record) || isDeliveryNotified(record)) continue;
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


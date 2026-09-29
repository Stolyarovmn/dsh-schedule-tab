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
					queue.push(record);
					showNext();
				},
				dismiss() {
					publish(null);
					queueMicrotask(showNext);
				}
			};
		}

		function startDeliveryMonitor(source, report) {
			let baseline = null;
			const inspect = () => {
				const state = source.getSnapshot();
				if (state.status !== "ready") return;
				const next = new Map();
				for (const record of state.records) {
					const marker = deliveryMarker(record);
					next.set(identity(record), marker);
				}
				if (baseline === null) {
					baseline = next;
					return;
				}
				for (const record of state.records) {
					const key = identity(record);
					const marker = next.get(key);
					if (marker === null || marker === undefined) continue;
					if (!baseline.has(key) || baseline.get(key) !== marker) report(record);
				}
				baseline = next;
			};
			const unsubscribe = source.subscribe(inspect);
			inspect();
			return unsubscribe;
		}

		function DeliveryToast({ useToast, dismiss, openRecord, t }) {
			const toast = useToast((current) => current);
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


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


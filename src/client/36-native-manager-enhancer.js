		function nativeScheduleRows() {
			if (typeof document === "undefined") return [];
			const page = document.querySelector('[data-testid="task-manager-page"]');
			if (!page) return [];
			return [...page.querySelectorAll('button[aria-describedby]')].filter((button) =>
				button.getAttribute("aria-describedby")?.includes("-metadata-")
			);
		}
		function nativeRowForRecord(record) {
			const suffix = "-metadata-" + record.id;
			return nativeScheduleRows().find((button) => button.getAttribute("aria-describedby")?.endsWith(suffix));
		}
		function ensureNativeAttentionDot(row, record, now, t) {
			const attention = taskAttentionState(record, now);
			let dot = row.querySelector('[data-scc-native-attention]');
			if (!attention) {
				dot?.remove();
				return;
			}
			if (!dot) {
				dot = document.createElement("span");
				dot.dataset.sccNativeAttention = "true";
				dot.className = "scc_attentionDot";
				const content = row.querySelector("svg + span") ?? row.querySelector("span");
				const title = content?.firstElementChild ?? content;
				if (title) title.appendChild(dot);
				else row.appendChild(dot);
			}
			dot.className = "scc_attentionDot" + (attention === "warning" ? " scc_attentionDotWarn" : "");
			const label = t(attention === "warning" ? "attention.overdue" : "attention.newDelivery");
			dot.title = label;
			dot.setAttribute("aria-label", label);
		}
		function syncNativeFilterCounts(records) {
			if (typeof document === "undefined") return;
			const page = document.querySelector('[data-testid="task-manager-page"]');
			const group = page?.querySelector('[role="group"]');
			if (!group) return;
			const buttons = [...group.querySelectorAll("button")].slice(0, 3);
			if (buttons.length < 3) return;
			const counts = [
				records.length,
				records.filter((record) => record.status === "active").length,
				records.filter((record) => record.status === "inactive").length,
			];
			for (let index = 0; index < buttons.length; index += 1) {
				let badge = buttons[index].querySelector('[data-scc-filter-count]');
				if (!badge) {
					badge = document.createElement("span");
					badge.dataset.sccFilterCount = "true";
					badge.className = "scc_chipCount";
					buttons[index].appendChild(badge);
				}
				const nextText = String(counts[index]);
				if (badge.textContent !== nextText) badge.textContent = nextText;
			}
		}
		function startNativeManagerEnhancer(source, t) {
			if (typeof document === "undefined") return () => {};
			let queued = false;
			const sync = () => {
				queued = false;
				const state = source.getSnapshot();
				if (state.status !== "ready") return;
				const now = Date.now();
				for (const record of state.records) {
					const row = nativeRowForRecord(record);
					if (row) ensureNativeAttentionDot(row, record, now, t);
				}
				syncNativeFilterCounts(state.records);
			};
			const scheduleSync = () => {
				if (queued) return;
				queued = true;
				queueMicrotask(sync);
			};
			const unsubscribeCatalog = source.subscribe(scheduleSync);
			const unsubscribeSeen = seenRevisionSource.subscribe(scheduleSync);
			const observer = new MutationObserver(scheduleSync);
			observer.observe(document.body, { subtree: true, childList: true });
			scheduleSync();
			return () => {
				unsubscribeCatalog();
				unsubscribeSeen();
				observer.disconnect();
			};
		}


		function identity(record) { return record.sessionId + ":" + record.id; }
		function isRecurring(record) { return record.kind === "every" || record.kind === "daily" || record.kind === "weekly" || record.kind === "cron"; }
		function isOverdue(record, now) { return record.status === "active" && Date.parse(record.scheduledAt) <= now; }
		function taskTitle(record) { return record.title || record.prompt || record.id; }
		function sessionTitle(sessionId, snapshot) {
			const title = snapshot?.byId?.[sessionId]?.title;
			return typeof title === "string" && title.trim() !== "" ? title : sessionId;
		}
		function sessionLinkState(sessionId, sessions, workspaces) {
			if (workspaces?.state === "error") return "unavailable";
			if (sessions?.phase === "pending" || workspaces?.phase === "pending") return "loading";
			if (Array.isArray(workspaces?.archivedSessionIds) && workspaces.archivedSessionIds.includes(sessionId)) return "archived";
			if (!Array.isArray(sessions?.ids) || !sessions.ids.includes(sessionId)) return "unavailable";
			return "available";
		}
		function scheduleKind(record, t) {
			return t("kind." + record.kind);
		}
		function pad2(value) { return String(value).padStart(2, "0"); }
		function formatTimeOnly(value) {
			if (typeof value !== "string") return "";
			let text = value.endsWith(".000") ? value.slice(0, -4) : value;
			if (text.endsWith(":00")) text = text.slice(0, -3);
			return text;
		}
		function formatWeekdays(values, locale) {
			if (!Array.isArray(values)) return "";
			const monday = Date.UTC(2026, 0, 5);
			return values.map((day) => new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" })
				.format(new Date(monday + (Number(day) - 1) * 86400000))).join(", ");
		}
		function preferredEvery(record, t) {
			const seconds = record.everySeconds;
			const candidates = [
				[3600, "unit.hour"],
				[60, "unit.minute"],
				[1, "unit.second"]
			];
			for (const [unitSeconds, key] of candidates) {
				if (seconds % unitSeconds !== 0) continue;
				const value = seconds / unitSeconds;
				return t("frequency.every", { value, unit: t(key + (value === 1 ? ".one" : ".other")) });
			}
			return t("frequency.everySeconds", { value: seconds });
		}
		function formatFrequency(record, t, locale) {
			if (record.kind === "every") return preferredEvery(record, t);
			if (record.kind === "daily") return t("frequency.daily", { time: formatTimeOnly(record.time), zone: record.timeZone });
			if (record.kind === "weekly") return t("frequency.weekly", { days: formatWeekdays(record.weekdays, locale), time: formatTimeOnly(record.time), zone: record.timeZone });
			if (record.kind === "cron") return t("frequency.cron", { expression: record.expression, zone: record.timeZone });
			return t("frequency.once");
		}
		function formatInstant(value, locale, timeZone) {
			const stamp = Date.parse(value);
			if (!Number.isFinite(stamp)) return "—";
			const options = { dateStyle: "medium", timeStyle: "medium" };
			if (timeZone) options.timeZone = timeZone;
			return new Intl.DateTimeFormat(locale, options).format(stamp);
		}
		function recordZone(record) {
			return record.kind === "daily" || record.kind === "weekly" || record.kind === "cron" ? record.timeZone : undefined;
		}
		function relative(value, now, t) {
			const diff = Date.parse(value) - now;
			if (!Number.isFinite(diff)) return "";
			if (Math.abs(diff) < 1000) return t("relative.now");
			const seconds = Math.abs(diff) / 1000;
			const units = [[86400, "day"], [3600, "hour"], [60, "minute"], [1, "second"]];
			const picked = units.find(([size]) => seconds >= size) ?? units[units.length - 1];
			const valueCount = Math.max(1, diff > 0 ? Math.ceil(seconds / picked[0]) : Math.floor(seconds / picked[0]));
			const unit = t("unit." + picked[1] + (valueCount === 1 ? ".one" : ".other"));
			return t(diff > 0 ? "relative.future" : "relative.overdue", { value: valueCount, unit });
		}
		function sameDay(left, right) {
			const a = new Date(left), b = new Date(right);
			return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
		}
		function tomorrow(now) {
			const date = new Date(now); date.setHours(0, 0, 0, 0); date.setDate(date.getDate() + 1); return date.getTime();
		}
		function adaptiveTickDelay(records, now) {
			let hasActive = false, nearest = Infinity, nextFuture = Infinity;
			for (const record of records) {
				if (record.status !== "active") continue;
				hasActive = true;
				const stamp = Date.parse(record.scheduledAt);
				if (!Number.isFinite(stamp)) continue;
				const diff = stamp - now;
				nearest = Math.min(nearest, Math.abs(diff));
				if (diff > 0) nextFuture = Math.min(nextFuture, diff);
			}
			if (!hasActive) return null;
			let delay = nearest <= 60000 ? 1000 : nearest <= 3600000 ? 30000 : 60000;
			if (Number.isFinite(nextFuture)) delay = Math.min(delay, Math.max(250, nextFuture + 50));
			return delay;
		}
		function orderRows(records, now) {
			return records.map((record, index) => ({ record, index })).sort((a, b) => {
				if (a.record.status !== b.record.status) return a.record.status === "active" ? -1 : 1;
				const ao = isOverdue(a.record, now), bo = isOverdue(b.record, now);
				if (ao !== bo) return ao ? -1 : 1;
				return Date.parse(a.record.scheduledAt) - Date.parse(b.record.scheduledAt) || a.index - b.index;
			}).map(({ record }) => record);
		}
		function filterRows(records, query, filter, now, sessions) {
			const needle = String(query ?? "").trim().toLocaleLowerCase();
			return records.filter((record) => {
				if (filter === "active" && record.status !== "active") return false;
				if (filter === "inactive" && record.status !== "inactive") return false;
				if (filter === "today" && (record.status !== "active" || !sameDay(Date.parse(record.scheduledAt), now))) return false;
				if (filter === "overdue" && !isOverdue(record, now)) return false;
				if (filter === "recurring" && !isRecurring(record)) return false;
				if (!needle) return true;
				const haystack = [taskTitle(record), record.prompt, record.id, record.sessionId, sessionTitle(record.sessionId, sessions)]
					.filter(Boolean).join(String.fromCharCode(10)).toLocaleLowerCase();
				return haystack.includes(needle);
			});
		}
		function groupsFor(records, grouping, now, sessions, t, locale) {
			const groups = [], map = new Map();
			for (const record of records) {
				let key, label;
				if (grouping === "session") {
					key = "session:" + record.sessionId;
					label = sessionTitle(record.sessionId, sessions);
				} else if (record.status === "inactive") {
					key = "inactive"; label = t("group.inactive");
				} else if (isOverdue(record, now)) {
					key = "overdue"; label = t("group.overdue");
				} else if (sameDay(Date.parse(record.scheduledAt), now)) {
					key = "today"; label = t("group.today");
				} else if (sameDay(Date.parse(record.scheduledAt), tomorrow(now))) {
					key = "tomorrow"; label = t("group.tomorrow");
				} else {
					const stamp = Date.parse(record.scheduledAt);
					const date = new Date(stamp);
					key = "date:" + date.getFullYear() + "-" + pad2(date.getMonth() + 1) + "-" + pad2(date.getDate());
					label = new Intl.DateTimeFormat(locale, { weekday: "short", month: "short", day: "numeric" }).format(stamp);
				}
				let group = map.get(key);
				if (!group) { group = { key, label, records: [] }; map.set(key, group); groups.push(group); }
				group.records.push(record);
			}
			return groups;
		}


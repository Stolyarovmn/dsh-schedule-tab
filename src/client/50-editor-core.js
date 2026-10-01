		function stripCatalogRecord(record) {
			const { sessionId, status, lastDelivery, ...expected } = record;
			return expected;
		}
		function systemTimeZone() {
			return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
		}
		function validTimeZone(value) {
			try { new Intl.DateTimeFormat("en-US", { timeZone: value }).format(); return true; }
			catch { return value === "UTC"; }
		}
		function wallClock(value, zone) {
			const date = new Date(value);
			if (!Number.isFinite(date.getTime())) return { date: "", time: "" };
			try {
				const parts = Object.fromEntries(new Intl.DateTimeFormat("en-CA", {
					timeZone: zone,
					year: "numeric", month: "2-digit", day: "2-digit",
					hour: "2-digit", minute: "2-digit", second: "2-digit", fractionalSecondDigits: 3, hourCycle: "h23"
				}).formatToParts(date).map((part) => [part.type, part.value]));
				return {
					date: parts.year + "-" + parts.month + "-" + parts.day,
					time: parts.hour + ":" + parts.minute + ":" + parts.second + (parts.fractionalSecond ? "." + parts.fractionalSecond : "")
				};
			} catch {
				return { date: date.toISOString().slice(0, 10), time: date.toISOString().slice(11, 19) };
			}
		}
		function ruleChoice(record) {
			if (record.kind === "at" || record.kind === "after") return "once";
			if (record.kind === "weekly" && JSON.stringify(record.weekdays ?? []) === JSON.stringify([1,2,3,4,5])) return "weekdays";
			return record.kind;
		}
		function intervalDraft(record) {
			const seconds = record.kind === "every" ? Number(record.everySeconds) : 3600;
			if (seconds % 3600 === 0) return { intervalValue: String(seconds / 3600), intervalUnit: "hour" };
			if (seconds % 60 === 0) return { intervalValue: String(seconds / 60), intervalUnit: "minute" };
			return { intervalValue: String(seconds), intervalUnit: "second" };
		}
		function seedEditor(record) {
			const zone = recordZone(record) ?? systemTimeZone();
			const clock = wallClock(record.scheduledAt, zone);
			const interval = intervalDraft(record);
			const cronSeed = record.kind === "cron" ? record.expression : Number(clock.time.slice(3,5)) + " " + Number(clock.time.slice(0,2)) + " * * *";
			return {
				title: record.title ?? "",
				prompt: record.prompt ?? "",
				rule: ruleChoice(record),
				date: clock.date,
				time: record.kind === "daily" || record.kind === "weekly" ? formatTimeOnly(record.time) : clock.time,
				timeZone: zone,
				weekdays: record.kind === "weekly" ? [...record.weekdays] : [1,2,3,4,5],
				expression: cronSeed,
				...interval
			};
		}
		function editorTimingKeys() {
			return ["rule","date","time","timeZone","weekdays","expression","intervalValue","intervalUnit"];
		}
		function timingDirty(dirty) {
			return editorTimingKeys().some((key) => dirty[key]);
		}
		function withSeconds(value) {
			const text = String(value ?? "");
			return /^\d{2}:\d{2}$/.test(text) ? text + ":00" : text;
		}
		function editorChange(draft) {
			switch (draft.rule) {
				case "once": return { kind: "at", at: { date: draft.date, time: withSeconds(draft.time), time_zone: draft.timeZone.trim() } };
				case "every": {
					const unit = draft.intervalUnit === "hour" ? 3600 : draft.intervalUnit === "minute" ? 60 : 1;
					return { kind: "every", every_seconds: Math.round(Number(draft.intervalValue) * unit) };
				}
				case "daily": return { kind: "daily", daily: { time: withSeconds(draft.time), time_zone: draft.timeZone.trim() } };
				case "weekdays": return { kind: "weekly", weekly: { time: withSeconds(draft.time), time_zone: draft.timeZone.trim(), weekdays: [1,2,3,4,5] } };
				case "weekly": return { kind: "weekly", weekly: { time: withSeconds(draft.time), time_zone: draft.timeZone.trim(), weekdays: [...draft.weekdays].sort() } };
				case "cron": return { kind: "cron", cron: { expression: draft.expression.trim(), time_zone: draft.timeZone.trim() } };
				default: return undefined;
			}
		}
		function editorError(draft, t) {
			const title = String(draft.title ?? "").trim();
			const prompt = String(draft.prompt ?? "").trim();
			if (!title || title.length > 120) return t("edit.invalidTitle");
			if (!prompt) return t("edit.invalidPrompt");
			if (draft.rule === "every") {
				const seconds = Number(draft.intervalValue) * (draft.intervalUnit === "hour" ? 3600 : draft.intervalUnit === "minute" ? 60 : 1);
				if (!Number.isFinite(seconds) || seconds < 60) return t("edit.invalidInterval");
				return null;
			}
			if (!validTimeZone(String(draft.timeZone ?? "").trim())) return t("edit.invalidZone");
			if (draft.rule === "once" && (!/^\d{4}-\d{2}-\d{2}$/.test(draft.date) || !/^\d{2}:\d{2}(?::\d{2})?$/.test(draft.time))) return t("edit.invalidDateTime");
			if ((draft.rule === "daily" || draft.rule === "weekdays" || draft.rule === "weekly") && !/^\d{2}:\d{2}(?::\d{2})?$/.test(draft.time)) return t("edit.invalidDateTime");
			if (draft.rule === "weekly" && (!Array.isArray(draft.weekdays) || draft.weekdays.length === 0)) return t("edit.invalidWeekdays");
			if (draft.rule === "cron" && String(draft.expression ?? "").trim().split(/\s+/).length !== 5) return t("edit.invalidCron");
			return null;
		}
		function weekDayLabel(day, locale) {
			const monday = Date.UTC(2026, 0, 5);
			return new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }).format(new Date(monday + (day - 1) * 86400000));
		}
		function timeZoneChoices() {
			try {
				const supported = typeof Intl.supportedValuesOf === "function" ? Intl.supportedValuesOf("timeZone") : [];
				return [...new Set(["UTC", systemTimeZone(), ...supported])];
			} catch { return ["UTC", systemTimeZone()]; }
		}


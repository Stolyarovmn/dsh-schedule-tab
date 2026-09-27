export const inject = ["loader", "systemPrompt", "tools"];

const HOST_PACKAGES = [
	"@deepseek-ai/dsh-time-context",
	"@deepseek-ai/dsh-schedule",
];

const REMINDER_GUIDANCE = [
	"Scheduled reminders must use the Schedule tools.",
	"When the user asks to be reminded later, after a delay, at a time, or repeatedly, use schedule_create.",
	"Use schedule_list and schedule_delete to inspect or cancel reminders.",
	"Never emulate a reminder with bash/pwsh, Start-Sleep/sleep, background jobs, polling loops, or shell timers.",
	"If schedule_create is unavailable, say that scheduling is unavailable instead of creating a shell-based substitute.",
].join(" ");

function shellReminderTimer(exec) {
	if (exec?.arguments?.run_in_background !== true) return false;
	const command = typeof exec?.arguments?.command === "string" ? exec.arguments.command : "";
	if (exec?.name === "pwsh") {
		return /\bStart-Sleep\b[\s\S]*\b(?:Write-Output|Write-Host|echo)\b/i.test(command);
	}
	if (exec?.name === "bash") {
		return /\bsleep\s+\d+(?:\.\d+)?(?:s|m|h)?\b[\s\S]*\b(?:echo|printf)\b/i.test(command);
	}
	return false;
}

/**
 * Mount Schedule for the DSH generation that owns the current profile.
 *
 * rc.1 and older have no Host Schedule rows in the Web composition. Their
 * Schedule plugin only attaches to root Agents created after it mounts, so the
 * session-controller must stay behind scheduleTabBootstrap until the dynamic
 * legacy rows are ready.
 *
 * rc.2 introduces configured Host-wide time-context/schedule rows. Schedule
 * itself injects sessionController and also attaches to already-live root
 * Agents, so keeping session-controller behind our bootstrap while trying to
 * start Schedule creates a dependency cycle. Detect those configured rows,
 * release session-controller first, then enable/await the native rows.
 */
export async function apply(ctx) {
	const configuredTime = ctx.loader.store?.["time-context"];
	const configuredSchedule = ctx.loader.store?.schedule;
	const hostWideSchedule = configuredTime !== undefined && configuredSchedule !== undefined;

	if (hostWideSchedule) {
		// rc.2 Schedule requires sessionController and can attach to existing
		// roots, so this must be published before enabling the native row.
		ctx.provide("scheduleTabBootstrap", true);
	}

	await ctx.effect(async () => {
		if (hostWideSchedule) {
			const changed = [];
			const enable = async (id, entry) => {
				if (entry.disabled) {
					await entry.update({ disabled: false });
					changed.push(entry);
				}
				await ctx.loader.await?.();
				const live = ctx.loader.store?.[id] ?? entry;
				if (live.fiber === undefined) {
					throw new Error(`schedule-tab: failed to activate configured ${id}`);
				}
				await live.fiber.await();
			};

			try {
				await enable("time-context", configuredTime);
				await enable("schedule", configuredSchedule);
			} catch (cause) {
				for (const entry of [...changed].reverse()) {
					try { await entry.update({ disabled: true }); } catch {}
				}
				await ctx.loader.await?.();
				throw cause;
			}

			return async () => {
				for (const entry of [...changed].reverse()) {
					await entry.update({ disabled: true });
				}
				await ctx.loader.await?.();
			};
		}

		const ids = [];
		const unmount = async () => {
			for (const id of [...ids].reverse()) {
				const entry = ctx.loader.store[id];
				if (entry === undefined) continue;
				const disposal = entry.fiber?.dispose();
				ctx.loader.remove(id);
				await disposal;
			}
		};

		try {
			for (const name of HOST_PACKAGES) {
				const id = await ctx.loader.create({ name });
				ids.push(id);
				const entry = ctx.loader.resolve(id);
				if (entry.fiber === undefined) {
					throw new Error(`schedule-tab: failed to load ${name}`);
				}
				await entry.fiber.await();
			}
		} catch (cause) {
			await unmount();
			throw cause;
		}

		// Legacy Schedule only sees roots created after it mounts.
		ctx.provide("scheduleTabBootstrap", true);
		return unmount;
	}, hostWideSchedule
		? "schedule-tab: host Schedule activation"
		: "schedule-tab: legacy Schedule bootstrap");

	ctx.systemPrompt.section({
		name: "schedule-tab:reminder-tool-routing",
		order: 950,
		text: ({ scope }) => ctx.tools.get("schedule_create", scope) === undefined ? "" : REMINDER_GUIDANCE,
	});

	ctx.on("tools/pre-execute", async (exec, next) => {
		if (exec.agent === undefined || ctx.tools.get("schedule_create", exec.agent) === undefined) {
			return next();
		}
		if (!shellReminderTimer(exec)) return next();
		return {
			kind: "deny",
			reason: "Background shell timers are not reminders. Use schedule_create for delayed or recurring reminders.",
		};
	});

	ctx.provide("scheduleTabBootstrap", true);
}

export { REMINDER_GUIDANCE, shellReminderTimer };

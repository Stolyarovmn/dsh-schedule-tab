export const inject = ["systemPrompt", "tools", "schedule"];

const REMINDER_GUIDANCE = [
	"Scheduled reminders must use the Schedule tools.",
	"When the user asks to be reminded later, after a delay, at a time, or repeatedly, use schedule_create.",
	"Use schedule_list, schedule_update, and schedule_delete to inspect, edit, or cancel reminders.",
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
 * DSH 0.1.7-rc.2 owns Schedule lifecycle and durable Host storage itself.
 * This extension only supplies routing guidance and prevents the narrow shell
 * timer fallback when the native schedule_create tool is visible.
 */
export function apply(ctx) {
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
}

export { REMINDER_GUIDANCE, shellReminderTimer };

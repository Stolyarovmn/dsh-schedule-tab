import * as Schedule from "@deepseek-ai/dsh-schedule";
import * as TimeContext from "@deepseek-ai/dsh-time-context";

export const inject = [
	"agents",
	"sessions",
	"tools",
	"sessionPersistence",
	"sessionProjections",
];

/**
 * Mount the legacy opt-in Schedule stack before Web session-controller can
 * create or restore any root Agent.
 */
export async function apply(ctx) {
	await ctx.plugin(TimeContext);
	await ctx.plugin(Schedule);
	ctx.provide("scheduleTabBootstrap", true);
}

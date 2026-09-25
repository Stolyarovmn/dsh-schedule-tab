export const inject = ["loader"];

const HOST_PACKAGES = [
	"@deepseek-ai/dsh-time-context",
	"@deepseek-ai/dsh-schedule",
];

/**
 * Mount the legacy opt-in Schedule stack as Loader entries before Web
 * session-controller can create or restore any root Agent.
 */
export async function apply(ctx) {
	await ctx.effect(async () => {
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

		return unmount;
	}, "schedule-tab: legacy Schedule bootstrap");

	ctx.provide("scheduleTabBootstrap", true);
}

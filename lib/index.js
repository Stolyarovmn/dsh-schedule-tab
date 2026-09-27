/**
 * DSH 0.1.7-rc.2 host bootstrap for Schedule Control Center.
 *
 * This plugin deliberately targets rc.2 only. It never mounts legacy Schedule
 * implementations and never reads historical Session schedule projections.
 * Instead it enables the three native rc.2 rows that own time interpretation,
 * durable Host scheduling, and the built-in task detail UI.
 */
export const inject = ["loader"];

const REQUIRED_ROWS = ["time-context", "schedule", "ui-schedule"];

export async function apply(ctx) {
	await ctx.effect(async () => {
		const changed = [];
		try {
			for (const id of REQUIRED_ROWS) {
				const entry = ctx.loader.store?.[id];
				if (entry === undefined) {
					throw new Error(`schedule-control-center: DSH 0.1.7-rc.2 row '${id}' is missing`);
				}
				if (entry.disabled) {
					await entry.update({ disabled: false });
					changed.push(entry);
				}
				await ctx.loader.await?.();
				const live = ctx.loader.store?.[id] ?? entry;
				if (live.fiber === undefined) {
					throw new Error(`schedule-control-center: failed to activate native rc2 row '${id}'`);
				}
				await live.fiber.await();
			}
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
	}, "schedule-control-center: enable native rc2 Schedule stack");
}

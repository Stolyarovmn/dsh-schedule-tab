import assert from "node:assert/strict";
import { apply, REMINDER_GUIDANCE, shellReminderTimer } from "../lib/index.js";

assert.equal(shellReminderTimer({
	name: "pwsh",
	arguments: { run_in_background: true, command: "Start-Sleep -Seconds 300; Write-Output 'reminder-due'" },
}), true);
assert.equal(shellReminderTimer({
	name: "bash",
	arguments: { run_in_background: true, command: "sleep 300; echo reminder-due" },
}), true);
assert.equal(shellReminderTimer({
	name: "pwsh",
	arguments: { run_in_background: false, command: "Start-Sleep -Seconds 1; Write-Output done" },
}), false);
assert.equal(shellReminderTimer({
	name: "pwsh",
	arguments: { run_in_background: true, command: "Get-Process" },
}), false);

const seen = [];
const entries = new Map();
let serial = 0;
let promptSection;
let preExecute;

const ctx = {
	loader: {
		store: Object.create(null),
		create: async ({ name }) => {
			const id = `dynamic-${++serial}`;
			const entry = {
				fiber: {
					await: async () => { seen.push(`ready:${name}`); },
					dispose: async () => {},
				},
			};
			entries.set(id, entry);
			ctx.loader.store[id] = entry;
			seen.push(`create:${name}`);
			return id;
		},
		resolve: id => entries.get(id),
		remove: id => {
			delete ctx.loader.store[id];
			entries.delete(id);
		},
	},
	effect: async fn => { await fn(); },
	systemPrompt: {
		section: section => { promptSection = section; },
	},
	tools: {
		get: (name, scope) => name === "schedule_create" && scope === "agent" ? { name } : undefined,
	},
	on: (event, listener) => {
		if (event === "tools/pre-execute") preExecute = listener;
		return () => {};
	},
	provide: name => { seen.push(`provide:${name}`); },
};

await apply(ctx);

assert.deepEqual(seen, [
	"create:@deepseek-ai/dsh-time-context",
	"ready:@deepseek-ai/dsh-time-context",
	"create:@deepseek-ai/dsh-schedule",
	"ready:@deepseek-ai/dsh-schedule",
	"provide:scheduleTabBootstrap",
]);
assert.equal(promptSection.text({ scope: "agent" }), REMINDER_GUIDANCE);
assert.equal(promptSection.text({ scope: "other" }), "");

const denied = await preExecute({
	name: "pwsh",
	agent: "agent",
	arguments: {
		run_in_background: true,
		command: "Start-Sleep -Seconds 60; Write-Output 'calls-1-due'",
	},
}, async () => ({ kind: "allow" }));
assert.equal(denied.kind, "deny");
assert.match(denied.reason, /schedule_create/);

const allowed = await preExecute({
	name: "pwsh",
	agent: "agent",
	arguments: {
		run_in_background: true,
		command: "Get-Process",
	},
}, async () => ({ kind: "allow" }));
assert.equal(allowed.kind, "allow");

const noSchedule = await preExecute({
	name: "pwsh",
	agent: "other",
	arguments: {
		run_in_background: true,
		command: "Start-Sleep -Seconds 60; Write-Output 'calls-1-due'",
	},
}, async () => ({ kind: "allow" }));
assert.equal(noSchedule.kind, "allow");



const rc2Seen = [];
const rc2Prompt = { section: () => {} };
const rc2Tools = { get: () => undefined };
const rc2Ctx = {
	loader: {
		store: Object.create(null),
		await: async () => { rc2Seen.push("loader:await"); },
	},
	effect: async fn => { await fn(); },
	systemPrompt: rc2Prompt,
	tools: rc2Tools,
	on: () => () => {},
	provide: name => { rc2Seen.push(`provide:${name}`); },
};
function configuredEntry(id) {
	const entry = {
		disabled: true,
		fiber: undefined,
		async update({ disabled }) {
			entry.disabled = disabled;
			rc2Seen.push(`${disabled ? "disable" : "enable"}:${id}`);
			if (!disabled) {
				entry.fiber = {
					await: async () => { rc2Seen.push(`ready:${id}`); },
					dispose: async () => {},
				};
			} else {
				entry.fiber = undefined;
			}
		},
	};
	return entry;
}
rc2Ctx.loader.store["time-context"] = configuredEntry("time-context");
rc2Ctx.loader.store.schedule = configuredEntry("schedule");

await apply(rc2Ctx);

assert.equal(rc2Seen[0], "provide:scheduleTabBootstrap",
	"rc2 must release session-controller before enabling Host Schedule");
assert.ok(rc2Seen.indexOf("enable:schedule") > rc2Seen.indexOf("provide:scheduleTabBootstrap"),
	"rc2 Schedule activation happens only after the bootstrap service is present");
assert.ok(rc2Seen.includes("ready:time-context"), "rc2 configured time-context row is awaited");
assert.ok(rc2Seen.includes("ready:schedule"), "rc2 configured Schedule row is awaited");
assert.equal(rc2Seen.filter(value => value === "provide:scheduleTabBootstrap").length, 1,
	"rc2 bootstrap service is published exactly once");

console.log("host rc2 Schedule activation validation passed");

console.log("host reminder routing validation passed");

import assert from "node:assert/strict";
import { apply, inject, REMINDER_GUIDANCE, shellReminderTimer } from "../lib/index.js";

assert.deepEqual(inject, ["systemPrompt", "tools", "schedule"]);

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

let promptSection;
let preExecute;
const ctx = {
	systemPrompt: { section: section => { promptSection = section; } },
	tools: {
		get: (name, scope) => name === "schedule_create" && scope === "agent" ? { name } : undefined,
	},
	on: (event, listener) => {
		if (event === "tools/pre-execute") preExecute = listener;
		return () => {};
	},
};

apply(ctx);
assert.equal(promptSection.text({ scope: "agent" }), REMINDER_GUIDANCE);
assert.equal(promptSection.text({ scope: "other" }), "");

const denied = await preExecute({
	name: "pwsh",
	agent: "agent",
	arguments: { run_in_background: true, command: "Start-Sleep -Seconds 60; Write-Output 'due'" },
}, async () => ({ kind: "allow" }));
assert.equal(denied.kind, "deny");
assert.match(denied.reason, /schedule_create/);

const allowed = await preExecute({
	name: "pwsh",
	agent: "agent",
	arguments: { run_in_background: true, command: "Get-Process" },
}, async () => ({ kind: "allow" }));
assert.equal(allowed.kind, "allow");

console.log("rc.2 Host routing validation passed");

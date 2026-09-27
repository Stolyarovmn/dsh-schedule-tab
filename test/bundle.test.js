import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const patch = readFileSync(new URL("../cordis.patch.yml", import.meta.url), "utf8");
const host = readFileSync(new URL("../lib/index.js", import.meta.url), "utf8");

assert.equal(pkg.name, "@stolyarovmn/dsh-client-ui-schedule-control-center");
assert.equal(pkg.version, "0.1.0");
assert.equal(pkg.peerDependencies["@deepseek-ai/dsh"], "0.1.7-rc.2");
assert.equal(pkg.dsh?.bundle?.patch, "./cordis.patch.yml");
assert.equal(pkg.dsh?.client?.platform, "web");
for (const dependency of [
  "@deepseek-ai/dsh-api-remotes",
  "@deepseek-ai/dsh-api-session-controller",
  "@deepseek-ai/dsh-api-workspace-controller",
  "@deepseek-ai/dsh-client-ui-sidebar-right",
  "@deepseek-ai/dsh-client-ui-workspace",
]) assert.ok(pkg.dsh.client.inject.includes(dependency), `missing client dependency ${dependency}`);

assert.match(patch, /id:\s*schedule-control-center/);
assert.match(patch, /@stolyarovmn\/dsh-client-ui-schedule-control-center/);
assert.doesNotMatch(patch, /session-controller/);
assert.doesNotMatch(patch, /scheduleTabBootstrap/);

for (const id of ["time-context", "schedule", "ui-schedule"]) assert.ok(host.includes(`"${id}"`));
assert.ok(!host.includes("loader.create"), "rc2 plugin must enable shipped native rows, not create legacy dynamic rows");
assert.ok(!host.includes("systemPrompt"));
assert.ok(!host.includes("tools/pre-execute"));

for (const script of ["preinstall", "install", "postinstall", "prepare"]) {
  assert.equal(pkg.scripts?.[script], undefined, `${script} must not execute during installation`);
}

console.log("rc2 bundle manifest validation passed");

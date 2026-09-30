import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const patch = readFileSync(new URL("../cordis.patch.yml", import.meta.url), "utf8");
const host = readFileSync(new URL("../lib/index.js", import.meta.url), "utf8");

assert.equal(pkg.name, "@stolyarovmn/dsh-client-ui-schedule-tab");
assert.equal(pkg.version, "0.6.10");
assert.equal(pkg.peerDependencies["@deepseek-ai/dsh"], "0.1.7-rc.2");
assert.equal(pkg.dsh?.bundle?.patch, "./cordis.patch.yml");
assert.equal(pkg.dsh?.client?.platform, "web");
assert.equal(pkg.scripts?.["build:client"], "node scripts/build-client.mjs");
assert.equal(pkg.scripts?.["build:check"], "node scripts/build-client.mjs --check");
for (const dependency of [
  "@deepseek-ai/dsh-api-remotes",
  "@deepseek-ai/dsh-api-session-controller",
  "@deepseek-ai/dsh-api-workspace-controller",
  "@deepseek-ai/dsh-client-ui-layout",
  "@deepseek-ai/dsh-client-ui-sidebar-right",
  "@deepseek-ai/dsh-client-ui-workspace",
]) assert.ok(pkg.dsh.client.inject.includes(dependency), `missing client dependency ${dependency}`);

assert.match(patch, /id:\s*time-context[\s\S]*disabled:\s*false/);
assert.match(patch, /id:\s*schedule[\s\S]*disabled:\s*false/);
assert.match(patch, /id:\s*ui-schedule[\s\S]*disabled:\s*false/);
assert.match(patch, /id:\s*schedule-control-center/);
assert.match(patch, /@stolyarovmn\/dsh-client-ui-schedule-tab/);
assert.doesNotMatch(patch, /session-controller/);
assert.doesNotMatch(patch, /scheduleTabBootstrap/);

assert.ok(!host.includes("loader."), "rc2 host half must not mutate Loader state");
assert.ok(!host.includes("systemPrompt"));
assert.ok(!host.includes("tools/pre-execute"));

for (const script of ["preinstall", "install", "postinstall", "prepare"]) {
  assert.equal(pkg.scripts?.[script], undefined, `${script} must not execute during installation`);
}

console.log("rc2 bundle manifest validation passed");

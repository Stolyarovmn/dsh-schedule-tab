import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const patch = readFileSync(new URL("../cordis.patch.yml", import.meta.url), "utf8");

assert.equal(pkg.name, "@stolyarovmn/dsh-client-ui-schedule-tab");
assert.equal(pkg.dsh?.bundle?.patch, "./cordis.patch.yml");
assert.equal(pkg.dsh?.client?.platform, "web");
assert.ok(pkg.keywords.includes("dsh-plugin"));
assert.ok(pkg.keywords.includes("deepseek-harness"));
assert.equal(pkg.dsh?.catalog?.category, "ui");
assert.equal(typeof pkg.dsh?.catalog?.summary?.en, "string");
assert.equal(typeof pkg.dsh?.catalog?.summary?.zh, "string");
assert.ok(pkg.dsh.catalog.summary.en.length <= 200);
assert.ok(pkg.dsh.catalog.summary.zh.length <= 200);
assert.deepEqual(pkg.dsh?.catalog?.capabilities, ["slots", "locale", "sessions", "workspace"]);
assert.ok(pkg.dsh?.client?.inject?.includes("@deepseek-ai/dsh-client-ui-workspace"));
assert.ok(!pkg.dsh?.client?.inject?.includes("@deepseek-ai/dsh-client-ui-layout"));
assert.ok(pkg.files.includes("cordis.patch.yml"));
assert.ok(pkg.files.includes("lib/index.js"));
assert.ok(pkg.files.includes("lib/client.js"));

assert.match(patch, /id:\s*session-controller/);
assert.match(patch, /inject:\s*\[scheduleTabBootstrap\]/);
assert.match(patch, /id:\s*schedule-tab/);
assert.match(patch, /name:\s*['"]@stolyarovmn\/dsh-client-ui-schedule-tab['"]/);

const host = readFileSync(new URL("../lib/index.js", import.meta.url), "utf8");
assert.match(host, /@deepseek-ai\/dsh-schedule/);
assert.match(host, /@deepseek-ai\/dsh-time-context/);
assert.match(host, /ctx\.provide\(["']scheduleTabBootstrap["']/);
assert.ok(host.indexOf("ctx.plugin(TimeContext)") < host.indexOf("ctx.provide(\"scheduleTabBootstrap\""));
assert.ok(host.indexOf("ctx.plugin(Schedule)") < host.indexOf("ctx.provide(\"scheduleTabBootstrap\""));

for (const script of ["preinstall", "install", "postinstall", "prepare"]) {
  assert.equal(pkg.scripts?.[script], undefined, `${script} must not execute during installation`);
}

console.log("bundle manifest validation passed");

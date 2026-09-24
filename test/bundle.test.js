import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const patch = readFileSync(new URL("../cordis.patch.yml", import.meta.url), "utf8");

assert.equal(pkg.name, "@stolyarovmn/dsh-client-ui-schedule-tab");
assert.equal(pkg.dsh?.bundle?.patch, "./cordis.patch.yml");
assert.equal(pkg.dsh?.client?.platform, "web");
assert.ok(pkg.files.includes("cordis.patch.yml"));
assert.ok(pkg.files.includes("lib/index.js"));
assert.ok(pkg.files.includes("lib/client.js"));

assert.match(patch, /id:\s*schedule-tab/);
assert.match(patch, /name:\s*['"]@stolyarovmn\/dsh-client-ui-schedule-tab['"]/);

for (const script of ["preinstall", "install", "postinstall", "prepare"]) {
  assert.equal(pkg.scripts?.[script], undefined, `${script} must not execute during installation`);
}

console.log("bundle manifest validation passed");

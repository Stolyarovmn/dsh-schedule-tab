import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
const client = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
const patch = readFileSync(new URL('../cordis.patch.yml', import.meta.url), 'utf8')

assert.equal(pkg.version, '0.7.0-dev.1')
assert.equal(pkg.peerDependencies['@deepseek-ai/dsh'], '0.2.0-rc.2')
assert.equal(pkg.private, true, 'development branch must not publish accidentally')
assert.ok(client.includes("ctx.inject(['remote.schedule']"), 'Schedule integration must stay optional')
assert.ok(client.includes("scope.slots.inject('sidebar.panellist'"), 'attention belongs in the existing Schedule navigation seat')
assert.ok(client.includes("scope.slots.inject('shell.overlay'"), 'delivery popup must use the Harness overlay slot')
assert.ok(client.includes('hooks: { toast: toastSource, catalog }'), 'overlay must keep the authoritative Schedule catalog subscribed')
assert.ok(!client.includes("slots.inject('main'"), '0.2.x plugin must not replace the native Automation Tasks page')
assert.ok(!client.includes('@deepseek-ai/dsh-client-ui-primitives'), 'plain-JS plugin must not runtime-import Harness Client internals')
assert.ok(!client.includes('document.querySelector'), 'plugin must not inspect host DOM')
assert.ok(!client.includes(':has('), 'plugin CSS must not style host DOM through parent selectors')
assert.ok(!/^\s*- id: schedule\s*$/m.test(patch), 'plugin must not own the official Schedule rows')
assert.ok(client.includes("ctx.remote.$on('schedule/changed'"), 'catalog must follow authoritative Schedule invalidation')
assert.ok(client.includes("ctx.on('connection/reset'"), 'catalog must recover after reconnect')
assert.ok(client.includes("const SEEN_STORAGE_KEY = PACKAGE + '/seen-v2'"), 'legacy seen state must remain compatible')
assert.ok(client.includes("const PREFERENCES_STORAGE_KEY = PACKAGE + '/notification-preferences-v1'"), 'legacy notification preferences must remain compatible')

console.log('DSH 0.2.0-rc.2 attention-only contract passed')

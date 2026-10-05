import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const client = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
const clientShell = readFileSync(new URL('../src/client-shell.js', import.meta.url), 'utf8')
const nativeBuild = readFileSync(new URL('../tools/prepare-native-manager.mjs', import.meta.url), 'utf8')
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

assert.ok(nativeBuild.includes('IconNewChatOutlineRegular'), 'row Session action must use the native New Chat glyph')
assert.ok(!nativeBuild.includes('<IconPanelLeftOutlineRegular />'), 'redundant row details action must stay removed')
assert.ok(nativeBuild.includes('const [quickConfirmId, setQuickConfirmId]'), 'quick delete must survive the native task-selection reset')
assert.ok(nativeBuild.includes('setQuickConfirmId(record.id)'), 'trash must request native confirmation on the first click')
assert.ok(nativeBuild.includes('setConfirmId(quickConfirmId)'), 'selected task must receive the deferred native confirmation')

assert.ok(packageJson.dsh.client.inject.includes('@deepseek-ai/dsh-client-ui-plugin-manager'), 'plugin-manager package must remain a Client load-order dependency for plugins.detail.section')
assert.ok(!clientShell.includes("'uiPluginManager'"), 'client shell must not wait for a nonexistent uiPluginManager Cordis service')
assert.ok(!clientShell.includes('scope.uiWorkspace'), 'source client shell must route workspace navigation through the root context')

assert.ok(client.includes('ctx.uiWorkspace.openSession(id)'), 'task and detail Session links must use the root workspace navigation service')
assert.ok(client.includes('ctx.uiWorkspace.openSession(record.sessionId)'), 'delivery popup Session link must use the root workspace navigation service')
assert.ok(client.includes('ctx.uiWorkspace.startSession()'), 'New must use the root workspace navigation service')
assert.ok(!client.includes('scope.uiWorkspace.openSession'), 'optional Schedule scope must not own Session navigation')
assert.ok(!client.includes('scope.uiWorkspace.startSession'), 'optional Schedule scope must not own New Session navigation')
assert.ok(!client.includes("'uiPluginManager'"), 'generated client must not wait for a nonexistent uiPluginManager Cordis service')

console.log('native row-action navigation and activation contract passed')
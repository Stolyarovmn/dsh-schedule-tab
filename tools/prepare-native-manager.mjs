import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join, relative, resolve, sep } from 'node:path'
import process from 'node:process'

const dshRoot = resolve(process.argv[2] ?? '')
if (!dshRoot) throw new Error('usage: node tools/prepare-native-manager.mjs <dsh-source-root>')

const packageDir = join(dshRoot, 'packages/client/native-schedule-fork')
const sourceSchedule = join(dshRoot, 'packages/client/ui-schedule/src/client')
const sourcePrimitives = join(dshRoot, 'packages/client/ui-primitives/src')

await rm(packageDir, { recursive: true, force: true })
await mkdir(join(packageDir, 'src/client'), { recursive: true })
await cp(sourceSchedule, join(packageDir, 'src/client'), { recursive: true })
await cp(sourcePrimitives, join(packageDir, 'src/vendor-primitives'), { recursive: true })

// The DSH client preset intentionally bundles clsx, but our synthetic package lives
// outside ui-primitives' original dependency boundary. Copy the exact clsx artifact
// resolved from the pinned DSH workspace and rewrite imports to this local file so
// Rolldown cannot drift it into the runtime module table.
const primitiveRequire = createRequire(join(dshRoot, 'packages/client/ui-primitives/package.json'))
const clsxEntry = primitiveRequire.resolve('clsx')
const localClsx = join(packageDir, 'src/vendor-clsx.cjs')
await cp(clsxEntry, localClsx)

const primitiveIndex = `
export { Button } from './Button.tsx'
export { Input } from './Input.tsx'
export { Modal } from './Modal.tsx'
export { Pill } from './Pill.tsx'
export { ReferenceIconMedium, ReferenceIconRegular } from './ReferenceIcon.tsx'
export { StateDot } from './StateDot.tsx'
export { Tooltip } from './Tooltip.tsx'
export { Toast } from './Toast.tsx'
export { useAnchoredPosition } from './useAnchoredPosition.ts'
export { useDismissOnOutsidePointer } from './useDismissOnOutsidePointer.ts'
export * from './icons/index.tsx'
`
await writeFile(join(packageDir, 'src/vendor-primitives/index.ts'), primitiveIndex)

await writeFile(join(packageDir, 'src/vendor-util.ts'), `
export function assertNever(value: never): never {
  throw new Error('Unexpected value: ' + String(value))
}
`)

const localSpecifier = (from, to) => {
  const path = relative(dirname(from), to).split(sep).join('/')
  return path.startsWith('.') ? path : `./${path}`
}

const walk = async (dir) => {
  const { readdir } = await import('node:fs/promises')
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const file = join(dir, entry.name)
    if (entry.isDirectory()) await walk(file)
    else if (/\.[cm]?[jt]sx?$/.test(entry.name)) {
      let content = await readFile(file, 'utf8')
      content = content
        .replaceAll("from '@deepseek-ai/dsh-client-ui-primitives'", "from '../vendor-primitives/index.ts'")
        .replaceAll("from '@deepseek-ai/dsh-util-values'", "from '../vendor-util.ts'")
        .replaceAll("from 'clsx'", `from '${localSpecifier(file, localClsx)}'`)
      await writeFile(file, content)
    }
  }
}
await walk(join(packageDir, 'src/client'))
await walk(join(packageDir, 'src/vendor-primitives'))

const pagePath = join(packageDir, 'src/client/TaskManagerPage.tsx')
let page = await readFile(pagePath, 'utf8')
page = page.replace(
`  Button, IconClockOutlineRegular, IconCloseOutlineRegular, IconPlusOutlineRegular, IconSearchOutlineRegular, Input,`,
`  Button, IconClockOutlineRegular, IconCloseOutlineRegular, IconQueueOutlineRegular,
  IconPlusOutlineRegular, IconSearchOutlineRegular, IconTrashOutlineRegular, Input,`,
)
page = page.replace(
`  const { useCatalog, onNewTask, onRetry, t } = props`,
`  const { useCatalog, onNewTask, onRetry, onOpenSession, t } = props`,
)
page = page.replace(
`  const [selectedId, setSelectedId] = useState<ScheduleId | null>(null)`,
`  const [selectedId, setSelectedId] = useState<ScheduleId | null>(null)
  // A quick delete can target a row that is not selected yet. Native useTaskDetail
  // clears confirmId whenever taskId changes, so defer the confirmation until
  // that task has become the selected detail instead of losing the first click.
  const [quickConfirmId, setQuickConfirmId] = useState<ScheduleId | null>(null)`,
)
page = page.replace(
`  const confirming = records.find(record => record.id === confirmId)`,
`  const confirming = records.find(record => record.id === confirmId)

  useEffect(() => {
    if (quickConfirmId === null || selectedId !== quickConfirmId || selected === undefined) return
    setConfirmId(quickConfirmId)
    setQuickConfirmId(null)
  }, [quickConfirmId, selectedId, selected, setConfirmId])`,
)
page = page.replace(
`                    <li key={record.id}>`,
`                    <li key={record.id} className={css.rowShell}>`,
)
page = page.replace(
`                      </Button>
                    </li>`,
`                      </Button>
                      <div className={css.rowQuickActions}>
                        <Button
                          size="sm"
                          className={css.detailIconButton}
                          aria-label={t('detail.openSession')}
                          title={t('detail.openSession')}
                          onClick={() => { onOpenSession(record.sessionId) }}
                        >
                          <IconQueueOutlineRegular />
                        </Button>
                        <Button
                          size="sm"
                          className={css.detailIconButton}
                          aria-label={t('delete.action')}
                          title={t('delete.action')}
                          onClick={() => {
                            setQuickConfirmId(record.id)
                            setSelectedId(record.id)
                            setTab('rule')
                          }}
                        >
                          <IconTrashOutlineRegular />
                        </Button>
                      </div>
                    </li>`,
)
if (!page.includes('className={css.rowQuickActions}')) throw new Error('TaskManagerPage quick-action patch did not apply')
if (page.includes('IconPanelLeftOutlineRegular')) throw new Error('redundant row detail action survived the patch')
if (!page.includes('<IconQueueOutlineRegular />')) throw new Error('linked Session action must use the native Queue glyph')
if (page.includes('IconNewChatOutlineRegular')) throw new Error('New Chat glyph must not be used for existing linked Sessions')
if (!page.includes('setQuickConfirmId(record.id)')) throw new Error('one-click delete confirmation patch did not apply')
await writeFile(pagePath, page)

const cssPath = join(packageDir, 'src/client/TaskManagerPage.module.css')
let css = await readFile(cssPath, 'utf8')
css += `

/* dsh-client-ui-schedule-tab 0.8 patch: the only TaskManager layout delta from DSH 0.2.1-alpha.1. */
.rowShell {
  display: flex;
  align-items: center;
  min-width: 0;
  border-radius: var(--dsw-radius-md);
}

.rowShell > .row {
  flex: 1 1 auto;
  min-width: 0;
}

.rowQuickActions {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 2px;
  padding: 0 8px 0 2px;
}
`
await writeFile(cssPath, css)

await writeFile(join(packageDir, 'src/client/index.ts'), `
export { TaskManagerPage } from './TaskManagerPage.tsx'
export { createCatalogSource } from './catalog-source.ts'
export { sessionLinkState } from './session-link.ts'
export { createDeleteToastSource, ScheduleDeleteToast } from './DeleteToast.tsx'
`)

await writeFile(join(packageDir, 'package.json'), JSON.stringify({
  name: "@stolyarovmn/dsh-schedule-native-manager",
  version: '0.0.0',
  private: true,
  type: 'module',
  dsh: { client: { platform: 'web' } },
}, null, 2) + '\n')

await writeFile(join(packageDir, 'tsdown.config.ts'), `
import { clientBundle } from '../tsdown.client.ts'

const id = "@stolyarovmn/dsh-schedule-native-manager"
const configs = clientBundle(id, ['lib/types/index.js'])({ env: {} })
export default configs.filter(config => config.name === id + '/client')
`)

console.log(packageDir)
// @vitest-environment node
import { spawn, type ChildProcess } from 'node:child_process'
import { once } from 'node:events'
import { createServer } from 'node:net'
import { fileURLToPath } from 'node:url'
import { afterEach, expect, test } from 'vitest'

const children: ChildProcess[] = []
const groups: number[] = []
const guard = fileURLToPath(new URL('../e2e-web-server.mjs', import.meta.url))

afterEach(() => {
  for (const pid of groups.splice(0)) {
    try {
      process.kill(-pid, 'SIGKILL')
    } catch {
      /* Already stopped. */
    }
  }
  for (const child of children.splice(0)) child.kill('SIGKILL')
})

async function startNode(code: string) {
  const child = spawn(process.execPath, ['-e', code], { stdio: ['ignore', 'pipe', 'pipe'] })
  children.push(child)
  await once(child.stdout!, 'data')
  return child
}

// Exercise a real shell -> Node descendant and a real listening socket.
// POSIX process-group behavior is the contract used by the macOS/Linux config.
test.skipIf(process.platform === 'win32')(
  'owner SIGKILL stops only its own server group',
  async () => {
    const owner = await startNode('console.log("ready"); setInterval(() => {}, 1000)')
    const other = await startNode(
      'require("node:net").createServer().listen(0, () => console.log("ready"))',
    )
    const code =
      'require("node:net").createServer().listen(0, "127.0.0.1", function () { console.log(this.address().port) })'
    const server = spawn(
      process.execPath,
      [guard, String(owner.pid), `"${process.execPath}" -e '${code}'`],
      {
        detached: true,
        stdio: ['ignore', 'pipe', 'pipe'],
      },
    )
    groups.push(server.pid!)
    const [output] = await once(server.stdout!, 'data')
    const port = Number(String(output).trim())
    expect(port).toBeGreaterThan(0)
    const stopped = once(server, 'exit')
    owner.kill('SIGKILL')
    await stopped
    expect(process.kill(other.pid!, 0)).toBe(true)
    const probe = createServer()
    await new Promise<void>((resolve, reject) => {
      probe.once('error', reject)
      probe.listen(port, '127.0.0.1', resolve)
    })
    await new Promise<void>((resolve, reject) =>
      probe.close(error => (error ? reject(error) : resolve())),
    )
  },
  10_000,
)

test.skipIf(process.platform === 'win32')(
  'propagates a failed build without starting preview',
  async () => {
    const server = spawn(process.execPath, [guard, String(process.pid), 'exit 7'], {
      detached: true,
    })
    groups.push(server.pid!)
    const [code] = await once(server, 'exit')
    expect(code).toBe(7)
  },
)

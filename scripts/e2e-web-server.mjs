import { spawn } from 'node:child_process'

const [ownerArgument, command] = process.argv.slice(2)
const owner = Number(ownerArgument)
if (!Number.isSafeInteger(owner) || owner <= 1 || !command) {
  throw new Error('Expected the Playwright PID and a server command')
}

// Playwright starts a separate process group. On POSIX the config uses exec
// so this process is its leader; all build/preview descendants stay in it.
// Never discover or terminate processes by port, name, or a saved PID file.
function stopGroup() {
  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', String(process.pid), '/T', '/F'])
  } else {
    process.kill(-process.pid, 'SIGKILL')
  }
}

function checkOwner() {
  try {
    process.kill(owner, 0)
  } catch (error) {
    if (error.code !== 'ESRCH') throw error
    console.error('[E2E] Playwright exited; stopping its web server process group.')
    stopGroup()
    return false
  }
  return true
}

if (checkOwner()) {
  const child = spawn(command, { shell: true, stdio: 'inherit' })
  const timer = setInterval(checkOwner, 500)
  child.on('error', error => {
    console.error(error)
    stopGroup()
  })
  child.on('exit', code => {
    clearInterval(timer)
    process.exit(code ?? 1)
  })
}

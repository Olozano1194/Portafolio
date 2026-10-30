#!/usr/bin/env node
/**
 * Enforces AGENTS.md R4: source files stay within the 250-line cap.
 *
 * Usage:
 *   node scripts/check-file-size.mjs           check every tracked source file
 *   node scripts/check-file-size.mjs --staged  check only files staged for commit
 */
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const LIMIT = 250
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.css']
const EXEMPT_DIRS = [/^public\//, /^dist\//, /^coverage\//]

function git(args) {
  const output = execFileSync('git', args, { encoding: 'utf8' })
  return output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function isSourceFile(path) {
  if (EXEMPT_DIRS.some((pattern) => pattern.test(path))) return false
  return EXTENSIONS.some((extension) => path.endsWith(extension))
}

function countLines(path) {
  const text = readFileSync(path, 'utf8')
  if (text === '') return 0
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  return text.endsWith('\n') ? lines.length - 1 : lines.length
}

const staged = process.argv.includes('--staged')
const command = staged
  ? ['diff', '--cached', '--name-only', '--diff-filter=ACMR']
  : ['ls-files']

const files = git(command).filter(isSourceFile)
const offenders = files
  .map((path) => ({ path, lines: countLines(path) }))
  .filter((file) => file.lines > LIMIT)

if (offenders.length === 0) {
  console.log(`check-file-size: ${files.length} file(s) within the ${LIMIT}-line cap`)
  process.exit(0)
}

console.error(`check-file-size: ${offenders.length} file(s) over the ${LIMIT}-line cap\n`)
for (const file of offenders) {
  console.error(`  ${String(file.lines).padStart(4)} lines  ${file.path}`)
}
console.error('\nAGENTS.md R4: split the file before committing.')
console.error('  1. pure logic   -> src/utils/')
console.error('  2. UI piece      -> src/components/ui/')
console.error('  3. stateful logic -> src/hooks/')
console.error('  4. still too big -> split the change, do not raise the cap')
process.exit(1)

#!/usr/bin/env node
/**
 * Enforces AGENTS.md R3: Spanish Conventional Commits, no AI attribution.
 *
 * Usage:
 *   node scripts/check-commit-msg.mjs .git/COMMIT_EDITMSG
 *
 * The Spanish check is a heuristic: a description passes when it contains an
 * accented character or a common Spanish word. It exists to catch English
 * commits, not to grade grammar.
 */
import { readFileSync } from 'node:fs'

const TYPES = [
  'feat', 'fix', 'docs', 'refactor', 'perf', 'test',
  'build', 'ci', 'chore', 'style', 'revert',
]

const HEADER_PATTERN = /^([a-z]+)(\([a-z0-9\-./]+\))?(!)?: (\S.*)$/
const GIT_GENERATED = /^(Merge |Revert |fixup! |squash! |amend! )/

const SPANISH_WORDS = [
  'de', 'del', 'la', 'el', 'los', 'las', 'un', 'una', 'unos', 'unas',
  'que', 'para', 'por', 'con', 'sin', 'al', 'en', 'se', 'su', 'sus',
  'es', 'son', 'no', 'mas', 'más', 'como', 'desde', 'hasta', 'entre',
  'cuando', 'donde', 'cada', 'todo', 'toda', 'todos', 'todas',
  'agregar', 'añadir', 'anadir', 'crear', 'corregir', 'arreglar',
  'actualizar', 'quitar', 'eliminar', 'mover', 'renombrar', 'extraer',
  'mejorar', 'evitar', 'usar', 'permitir', 'validar', 'mostrar',
  'ocultar', 'cambiar', 'reemplazar', 'traducir', 'documentar',
  'proteger', 'limpiar', 'separar', 'unificar', 'simplificar',
  'ajustar', 'implementar', 'migrar', 'agregado', 'agregada',
  'corregido', 'corregida', 'actualizado', 'actualizada', 'nuevo',
  'nueva', 'nuevos', 'nuevas', 'error', 'errores', 'rutas', 'ruta',
  'formulario', 'pruebas', 'prueba', 'configuracion', 'configuración',
]

const AI_ATTRIBUTION =
  /^\s*(co-authored-by|generated\s+with|generated\s+by|signed-off-by)\b.*\b(ai|gpt|chatgpt|claude|copilot|cursor|gemini|codeium|opencode|llm)\b/im

const MAX_HEADER = 72

function hasSpanish(text) {
  if (/[áéíóúñü¿¡]/i.test(text)) return true
  const words = text.toLowerCase().split(/[^a-záéíóúñü]+/).filter(Boolean)
  return words.some((word) => SPANISH_WORDS.includes(word))
}

const messageFile = process.argv[2]
if (!messageFile) {
  console.error('check-commit-msg: missing commit message file argument')
  process.exit(1)
}

const raw = readFileSync(messageFile, 'utf8')
const lines = raw.split(/\r?\n/)
const header = (lines[0] ?? '').trim()

// Empty or fully commented messages are aborted by git itself.
if (header === '' || header.startsWith('#')) process.exit(0)
if (GIT_GENERATED.test(header)) process.exit(0)

const problems = []
const match = HEADER_PATTERN.exec(header)

if (!match) {
  problems.push('header must be "<type>(<scope>): <descripción>" (scope optional)')
} else {
  const [, type, , , description] = match

  if (!TYPES.includes(type)) {
    problems.push(`unknown type "${type}" — use one of: ${TYPES.join(', ')}`)
  }
  if (header.length > MAX_HEADER) {
    problems.push(`header is ${header.length} chars, max ${MAX_HEADER}`)
  }
  if (description.trim() !== description) {
    problems.push('description has leading or trailing whitespace')
  }
  if (description.endsWith('.')) {
    problems.push('description must not end with a period')
  }
  if (/^[A-ZÁÉÍÓÚÑ]/.test(description)) {
    problems.push('description must start lowercase')
  }
  if (!hasSpanish(description)) {
    problems.push('description looks English — write it in Spanish')
  }
}

if (AI_ATTRIBUTION.test(raw)) {
  problems.push('remove AI attribution lines (Co-Authored-By / Generated with)')
}

if (problems.length === 0) process.exit(0)

console.error('check-commit-msg: commit message rejected\n')
for (const problem of problems) {
  console.error(`  - ${problem}`)
}
console.error('\nAGENTS.md R3 reminder:')
console.error('  <type>(<scope>): <descripción en español>')
console.error('  example: fix(contacto): corregir validación de email vacío\n')
process.exit(1)

import test from 'node:test'
import assert from 'node:assert/strict'
import { Linter } from 'eslint'
import node from '../src/node.js'

test('exports a flat config array', () => {
  assert.ok(Array.isArray(node))
  assert.ok(node.length > 0)
  for (const entry of node) {
    assert.strictEqual(typeof entry, 'object')
    assert.notStrictEqual(entry, null)
  }
})

test('detects unused imports', () => {
  const linter = new Linter()
  const messages = linter.verify(
    "import foo from 'foo'\n",
    node,
    { filename: 'test.ts' }
  )
  assert.ok(
    messages.some(m => m.ruleId === 'unused-imports/no-unused-imports'),
    'expected unused-imports/no-unused-imports error'
  )
})

test('detects unsorted imports', () => {
  const linter = new Linter()
  const messages = linter.verify(
    "import b from 'b'\nimport a from 'a'\n",
    node,
    { filename: 'test.ts' }
  )
  assert.ok(
    messages.some(m => m.ruleId === 'simple-import-sort/imports'),
    'expected simple-import-sort/imports error'
  )
})

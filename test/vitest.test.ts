import test from 'node:test'
import assert from 'node:assert/strict'
import { Linter } from 'eslint'
import node from '../src/node.js'
import vitest from '../src/vitest.js'

const combined = [...node, ...vitest]

test('exports a flat config array', () => {
  assert.ok(Array.isArray(vitest))
  assert.ok(vitest.length > 0)
  for (const entry of vitest) {
    assert.strictEqual(typeof entry, 'object')
    assert.notStrictEqual(entry, null)
  }
})

test('detects focused tests', () => {
  const linter = new Linter()
  const messages = linter.verify(
    "import { test } from 'vitest'\ntest.only('foo', () => {})\n",
    combined,
    { filename: 'foo.test.ts' }
  )
  assert.ok(
    messages.some(m => m.ruleId === 'vitest/no-focused-tests'),
    'expected vitest/no-focused-tests error'
  )
})

test('detects disabled tests', () => {
  const linter = new Linter()
  const messages = linter.verify(
    "import { test } from 'vitest'\ntest.skip('foo', () => {})\n",
    combined,
    { filename: 'foo.test.ts' }
  )
  assert.ok(
    messages.some(m => m.ruleId === 'vitest/no-disabled-tests'),
    'expected vitest/no-disabled-tests warning'
  )
})

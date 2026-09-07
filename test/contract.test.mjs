import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)

test('package is a standard lifecycle-free DSH bundle', async () => {
  const pkg = JSON.parse(await readFile(new URL('package.json', root), 'utf8'))
  assert.equal(pkg.name, 'dsh-agent-reach')
  assert.equal(pkg.version, '0.1.2')
  assert.equal(pkg.dsh.bundle.patch, './cordis.patch.yml')
  for (const name of ['preinstall', 'install', 'postinstall', 'prepare']) {
    assert.equal(pkg.scripts[name], undefined)
  }
})

test('bundle mounts an isolated skill provider without disabling official entries', async () => {
  const patch = await readFile(new URL('cordis.patch.yml', root), 'utf8')
  assert.match(patch, /id:\s*dsh-agent-reach-skill-provider/)
  assert.match(patch, /name:\s*'@deepseek-ai\/dsh-skill-filesystem'/)
  assert.match(patch, /providerName:\s*dsh-agent-reach/)
  assert.match(patch, /includeDefaultRoots:\s*false/)
  assert.match(patch, /new URL\('skills\/', baseUrl\)/)
  assert.doesNotMatch(patch, /disabled:\s*true/)
  assert.doesNotMatch(patch, /ui-settings-plugin-inventory/)
})

test('skill declares pinned upstream provenance and safe external-runtime boundaries', async () => {
  const skill = await readFile(new URL('skills/agent-reach/SKILL.md', root), 'utf8')
  assert.match(skill, /^---\nname: agent-reach\n/)
  assert.match(skill, /upstream-version:\s*1\.5\.0/)
  assert.match(skill, /upstream-commit:\s*93ae1d18c37b707dec053c7c4f9d91cd8ef8943d/)
  assert.match(skill, /does not install Python, Agent\s+Reach, browser extensions, cookies, API keys, or system packages/)
  assert.match(skill, /Never read browser cookies automatically/)
})

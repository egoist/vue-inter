import getProp from './get-prop'

const data = {
  foo: 'foo',
  bar: {
    baz: 'baz'
  },
  'bar.baz': 'bar.baz'
}

test('main', () => {
  expect(getProp(data, 'foo')).toBe('foo')
  expect(getProp(data, 'bar.baz')).toBe('baz')
  expect(getProp(data, 'bar\\.baz')).toBe('bar.baz')
  expect(getProp(data, 'notexists')).toBeUndefined()
  expect(getProp(data, 'not.exists')).toBeUndefined()
  expect(getProp(data, 'not\\.exists')).toBeUndefined()
})

import template from './template'

test('template', () => {
  const str = template('hello {world} {age}', { world: 'world', age: 14 })
  expect(str).toBe('hello world 14')
})

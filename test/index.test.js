import objValidate from '../src'

test('should export function', () => {
  expect(objValidate).toBeDefined()
  expect(typeof objValidate).toBe('function')
})

test('should validate object', done => {
  const obj = {
    bar: 5
  }

  const schema = {
    bar: {
      required: true,
      type: 'Number'
    }
  }

  objValidate(obj, schema).then(result => {
    expect(typeof result).toBe('object')
    expect(Array.isArray(result.bar)).toBeTruthy()
    expect(result.bar.length).toBe(0)
    done()
  })
})

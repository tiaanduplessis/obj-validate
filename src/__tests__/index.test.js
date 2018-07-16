import objValidate from '../'

test('should export function', () => {
  expect(objValidate).toBeDefined()
  expect(typeof objValidate).toBe('function')
})

test('should validate object', () => {
  const obj = {
    bar: 5
  }

  const schema = {
    bar: {
      required: true,
      type: 'Number'
    }
  }

  const result = objValidate(obj, schema)

  expect(typeof result).toBe('object')
  expect(Array.isArray(result)).toBeTruthy()
  expect(result.length).toBe(0)
})

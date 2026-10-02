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

const errorDetails = errors => errors.map(error => [error.name, error.message])

const allErrors = [
  ['ReferenceError', 'Missing required property missing'],
  ['TypeError', 'Invalid type. Property value should be Number'],
  ['TypeError', 'Invalid value. Property value does not match pattern /^ok$/'],
  ['TypeError', 'Invalid type. Property last should be String,Number']
]

const invalidObject = { value: 'bad', last: false }
const invalidSchema = {
  missing: { required: true },
  value: { type: 'Number', pattern: /^ok$/ },
  last: { type: ['String', 'Number'] }
}

test('should collect every error in schema and validation order by default', () => {
  expect(errorDetails(objValidate(invalidObject, invalidSchema))).toEqual(allErrors)
})

test('should preserve empty defaults and invalid schema errors', () => {
  expect(objValidate()).toEqual([])
  expect(objValidate({}, {})).toEqual([])

  for (const invalid of [null, [], 'invalid', 5]) {
    expect(() => objValidate({}, invalid)).toThrow('Invalid object or schema provided')
  }
})

describe('firstError option', () => {
  test('should keep returning an array with the first error', () => {
    const result = objValidate(invalidObject, invalidSchema, { firstError: true })

    expect(Array.isArray(result)).toBe(true)
    expect(result).toHaveLength(1)
    expect(result[0]).toBeInstanceOf(ReferenceError)
    expect(errorDetails(result)).toEqual(allErrors.slice(0, 1))
  })

  test('should stop before reading later rules or schema properties after a required error', () => {
    const laterType = jest.fn(() => 'Number')
    const laterProperty = jest.fn(() => ({ required: true }))
    const schema = {
      missing: { required: true, get type () { return laterType() } },
      get later () { return laterProperty() }
    }

    expect(errorDetails(objValidate({}, schema, { firstError: true }))).toEqual([
      ['ReferenceError', 'Missing required property missing']
    ])
    expect(laterType).not.toHaveBeenCalled()
    expect(laterProperty).not.toHaveBeenCalled()
  })

  test('should stop before a pattern check after a single-type error', () => {
    const pattern = /^ok$/
    const checkPattern = jest.spyOn(pattern, 'exec')
    const result = objValidate({ value: 'bad' }, {
      value: { type: 'Number', pattern }
    }, { firstError: true })

    expect(result[0]).toBeInstanceOf(TypeError)
    expect(errorDetails(result)).toEqual([allErrors[1]])
    expect(checkPattern).not.toHaveBeenCalled()
  })

  test('should stop before a pattern check after a multiple-type error', () => {
    const pattern = /^ok$/
    const checkPattern = jest.spyOn(pattern, 'exec')
    const result = objValidate({ last: false }, {
      last: { type: ['String', 'Number'], pattern }
    }, { firstError: true })

    expect(result[0]).toBeInstanceOf(TypeError)
    expect(errorDetails(result)).toEqual([allErrors[3]])
    expect(checkPattern).not.toHaveBeenCalled()
  })

  test('should stop after a pattern error in the middle of the schema', () => {
    const first = /^ok$/
    const middle = /^ok$/
    const last = /^ok$/
    const checks = [first, middle, last].map(pattern => jest.spyOn(pattern, 'exec'))
    const result = objValidate({ first: 'ok', middle: 'bad', last: 'bad' }, {
      first: { pattern: first },
      middle: { pattern: middle },
      last: { pattern: last }
    }, { firstError: true })

    expect(result[0]).toBeInstanceOf(TypeError)
    expect(errorDetails(result)).toEqual([
      ['TypeError', 'Invalid value. Property middle does not match pattern /^ok$/']
    ])
    expect(checks[0]).toHaveBeenCalledTimes(1)
    expect(checks[1]).toHaveBeenCalledTimes(1)
    expect(checks[2]).not.toHaveBeenCalled()
  })

  test('should return a final-property error after preceding checks pass', () => {
    const result = objValidate({ first: 'ok', last: 'bad' }, {
      first: { required: true, type: ['String'], pattern: /^ok$/ },
      last: { pattern: /^ok$/ }
    }, { firstError: true })

    expect(errorDetails(result)).toEqual([
      ['TypeError', 'Invalid value. Property last does not match pattern /^ok$/']
    ])
  })

  test('should run all checks and return an empty array when validation succeeds', () => {
    const first = /^ok$/
    const last = /^ok$/
    const checks = [first, last].map(pattern => jest.spyOn(pattern, 'exec'))
    const result = objValidate({ first: 'ok', last: 'ok' }, {
      first: { required: true, type: 'String', pattern: first },
      optional: { type: 'Number', pattern: /^\d+$/ },
      last: { type: ['String'], pattern: last }
    }, { firstError: true })

    expect(result).toEqual([])
    checks.forEach(check => expect(check).toHaveBeenCalledTimes(1))
    expect(objValidate(undefined, undefined, { firstError: true })).toEqual([])
  })

  test('should accumulate errors unless firstError is explicitly true', () => {
    for (const options of [undefined, {}, { firstError: false }, { firstError: 'true' }]) {
      expect(errorDetails(objValidate(invalidObject, invalidSchema, options))).toEqual(allErrors)
    }
  })

  test('should preserve invalid schema exceptions', () => {
    for (const invalid of [null, [], 'invalid', 5]) {
      expect(() => objValidate({}, invalid, { firstError: true })).toThrow('Invalid object or schema provided')
    }
  })
})

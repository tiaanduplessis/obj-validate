const is = require('samesame')

const has = function (object, key) {
  return object && hasOwnProperty.call(object, key)
}
export default function validate (obj = {}, schema = {}) {
  const errors = {}

  if (!is(obj, schema, 'Object')) {
    throw new Error('Invalid object or schema provided')
  }

  Object.keys(schema).forEach(key => {
    const prop = schema[key]
    errors[key] = []

    if (prop.required && !has(obj, key)) {
      errors[key].push(ReferenceError(`Missing required property ${key}`))
    }

    if (prop.type && has(obj, key)) {
      if (Array.isArray(prop.type)) {
        if (!is(obj[key], ...prop.type)) {
          errors[key].push(TypeError(`Invalid type. Property ${key} should be ${prop.type}`))
        }
      } else if (!is(obj[key], prop.type)) {
        errors[key].push(TypeError(`Invalid type. Property ${key} should be ${prop.type}`))
      }
    }

    if (prop.pattern && prop.pattern instanceof RegExp && has(obj, key)) {
      if (!obj[key].toString().match(prop.pattern)) {
        errors[key].push(
          TypeError(`Invalid value. Property ${key} does not match pattern ${prop.pattern}`)
        )
      }
    }
  })

  return errors
}

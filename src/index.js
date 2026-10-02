const is = require('samesame')

/**
 * Check if a object contains a given key
 *
 * @param {object} object Object to check for key
 * @param {string} key Key to check for
 *
 * @returns {boolean}
 */
function has (object = {}, key) {
  return object && hasOwnProperty.call(object, key)
}

/**
 * Compare a object to a given schema
 *
 * @param {object} obj Object to compare to schema
 * @param {object} schema Schema to campare object to
 * @param {object} options Validation options
 * @param {boolean} options.firstError Stop after the first error when true
 *
 * @returns {array} Array of errors
 */
const validate = function (obj = {}, schema = {}, options = {}) {
  const errors = []
  const firstError = options.firstError === true

  if (!is(obj, schema, 'Object')) {
    throw new Error('Invalid object or schema provided')
  }

  const keys = Object.keys(schema)
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index]
    const prop = schema[key]

    if (prop.required && !has(obj, key)) {
      errors.push(ReferenceError(`Missing required property ${key}`))
      if (firstError) return errors
    }

    if (prop.type && has(obj, key)) {
      if (Array.isArray(prop.type)) {
        if (!is(obj[key], ...prop.type)) {
          errors.push(TypeError(`Invalid type. Property ${key} should be ${prop.type}`))
          if (firstError) return errors
        }
      } else if (!is(obj[key], prop.type)) {
        errors.push(TypeError(`Invalid type. Property ${key} should be ${prop.type}`))
        if (firstError) return errors
      }
    }

    if (prop.pattern && prop.pattern instanceof RegExp && has(obj, key)) {
      if (!obj[key].toString().match(prop.pattern)) {
        errors.push(
          TypeError(`Invalid value. Property ${key} does not match pattern ${prop.pattern}`)
        )
        if (firstError) return errors
      }
    }
  }

  return errors
}

export default validate

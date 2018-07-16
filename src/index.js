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
 *
 * @returns {array} Array of all errors
 */
const validate = function (obj = {}, schema = {}) {
  const errors = []

  if (!is(obj, schema, 'Object')) {
    throw new Error('Invalid object or schema provided')
  }

  Object.keys(schema).forEach(key => {
    const prop = schema[key]

    if (prop.required && !has(obj, key)) {
      errors.push(ReferenceError(`Missing required property ${key}`))
    }

    if (prop.type && has(obj, key)) {
      if (Array.isArray(prop.type)) {
        if (!is(obj[key], ...prop.type)) {
          errors.push(TypeError(`Invalid type. Property ${key} should be ${prop.type}`))
        }
      } else if (!is(obj[key], prop.type)) {
        errors.push(TypeError(`Invalid type. Property ${key} should be ${prop.type}`))
      }
    }

    if (prop.pattern && prop.pattern instanceof RegExp && has(obj, key)) {
      if (!obj[key].toString().match(prop.pattern)) {
        errors.push(
          TypeError(`Invalid value. Property ${key} does not match pattern ${prop.pattern}`)
        )
      }
    }
  })

  return errors
}

export default validate

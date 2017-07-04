(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.objValidate = factory());
}(this, (function () { 'use strict';

var is = require('samesame');

/**
 * Check if a object contains a given key
 *
 * @param {object} object Object to check for key
 * @param {string} key Key to check for
 *
 * @returns {boolean}
 */
var has = function (object, key) {
  if ( object === void 0 ) object = {};

  return object && hasOwnProperty.call(object, key)
};

/**
 * Compare a object to a given schema
 *
 * @param {object} obj Object to compare to schema
 * @param {object} schema Schema to campare object to
 *
 * @returns {array} Array of all errors
 */
var validate = function (obj, schema, options) {
  if ( obj === void 0 ) obj = {};
  if ( schema === void 0 ) schema = {};
  if ( options === void 0 ) options = {};

  var errors = [];

  if (!is(obj, schema, 'Object')) {
    throw new Error('Invalid object or schema provided')
  }

  Object.keys(schema).forEach(function (key) {
    var prop = schema[key];

    if (prop.required && !has(obj, key)) {
      errors.push(ReferenceError(("Missing required property " + key)));
    }

    if (prop.type && has(obj, key)) {
      if (Array.isArray(prop.type)) {
        if (!is.apply(void 0, [ obj[key] ].concat( prop.type ))) {
          errors.push(TypeError(("Invalid type. Property " + key + " should be " + (prop.type))));
        }
      } else if (!is(obj[key], prop.type)) {
        errors.push(TypeError(("Invalid type. Property " + key + " should be " + (prop.type))));
      }
    }

    if (prop.pattern && prop.pattern instanceof RegExp && has(obj, key)) {
      if (!obj[key].toString().match(prop.pattern)) {
        errors.push(
          TypeError(("Invalid value. Property " + key + " does not match pattern " + (prop.pattern)))
        );
      }
    }
  });

  return errors
};

return validate;

})));

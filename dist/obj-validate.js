(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.objValidate = factory());
}(this, (function () { 'use strict';

var is = require('samesame');

var has = function (object, key) {
  return object && hasOwnProperty.call(object, key)
};
function validate (obj, schema) {
  if ( obj === void 0 ) obj = {};
  if ( schema === void 0 ) schema = {};

  var errors = {};

  if (!is(obj, schema, 'Object')) {
    return Promise.reject(new Error('Invalid object or schema provided'))
  }

  Object.keys(schema).forEach(function (key) {
    var prop = schema[key];
    errors[key] = [];

    if (prop.required && !has(obj, key)) {
      errors[key].push(ReferenceError(("Missing required property " + key)));
    }

    if (prop.type && has(obj, key)) {
      if (Array.isArray(prop.type)) {
        if (!is.apply(void 0, [ obj[key] ].concat( prop.type ))) {
          errors[key].push(TypeError(("Invalid type. Property " + key + " should be " + (prop.type))));
        }
      } else if (!is(obj[key], prop.type)) {
        errors[key].push(TypeError(("Invalid type. Property " + key + " should be " + (prop.type))));
      }
    }

    if (prop.pattern && prop.pattern instanceof RegExp && has(obj, key)) {
      if (!obj[key].toString().match(prop.pattern)) {
        errors[key].push(
          TypeError(("Invalid value. Property " + key + " does not match pattern " + (prop.pattern)))
        );
      }
    }
  });

  return Promise.resolve(errors)
}

return validate;

})));

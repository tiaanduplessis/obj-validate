
# obj-validate
[![package version](https://img.shields.io/npm/v/obj-validate.svg?style=flat-square)](https://npmjs.org/package/obj-validate)
[![package downloads](https://img.shields.io/npm/dm/obj-validate.svg?style=flat-square)](https://npmjs.org/package/obj-validate)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![package license](https://img.shields.io/npm/l/obj-validate.svg?style=flat-square)](https://npmjs.org/package/obj-validate)
[![make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![Greenkeeper badge](https://badges.greenkeeper.io/tiaanduplessis/obj-validate.svg)](https://greenkeeper.io/)

> Validate an object schema

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#License)

## Install

```sh
$ npm install obj-validate
# OR
$ yarn add obj-validate
```

## Usage

The module exports a single function that accepts an `object`, a `schema`, and an optional `options` object. The `object` is validated against the `schema`, returning an array of errors (or an empty array when validation succeeds).

```js
import objValidate from 'obj-validate'

const foo = {
  bar: 5,
  baz: 'foo'
}

const result = objValidate(foo, {
  bar: {
    required: true,
    type: 'Number',
    pattern: /\d{1}/
  },
  foo: {
    required: true
  },
  baz: {
    type: 'Number'
  }
})

console.log(result)
// [
//   ReferenceError: Missing required property foo,
//   TypeError: Invalid type. Property baz should be Number
// ]
```

Possible validations:
- `required` - A property is required
- `type` - The required type of a property as a `String` or `Array` of possible types e.g. `Object` or `['Function', 'String']`
- `pattern` - Regex pattern to match property value on e.g. `/foo/`

### First error only

By default, validation collects all errors. Pass `{ firstError: true }` as the third argument to stop as soon as the first error is found:

```js
const errors = objValidate({}, {
  first: { required: true },
  second: { required: true }
}, { firstError: true })

console.log(errors)
// [ReferenceError: Missing required property first]
```

The result is still an array containing the original error. Later checks on the same property and later schema properties are not evaluated. Errors follow `Object.keys(schema)` order, with `required`, `type`, then `pattern` checked for each property. Omitting the option, passing an empty options object, or setting `firstError` to `false` preserves the default behavior. Only the boolean value `true` enables early exit.

## Contribute

1. Fork it and create your feature branch: git checkout -b my-new-feature
2. Commit your changes: git commit -am 'Add some feature'
3. Push to the branch: git push origin my-new-feature 
4. Submit a pull request

## License

MIT
    
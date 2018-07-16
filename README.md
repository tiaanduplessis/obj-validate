
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

The module exports a single function that accepts an `object` and a `schema` as arguments. The `object` is validated against the `schema`, returning errors. 

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
/*{ bar: [],
  foo:
   [ ReferenceError: Missing required property foo
         at Object.keys.forEach.key (/Users/Tiaan/Workspace/obj-validate/src/index.js:21:24)
         at Array.forEach (native)
         at validate (/Users/Tiaan/Workspace/obj-validate/src/index.js:16:23)
         at Object.<anonymous> (/Users/Tiaan/Workspace/obj-validate/src/index.js:51:1)
         at Module._compile (module.js:571:32)
         at Object.Module._extensions..js (module.js:580:10)
         at Module.load (module.js:488:32)
         at tryModuleLoad (module.js:447:12)
         at Function.Module._load (module.js:439:3)
         at Module.runMain (module.js:605:10) ],
  baz:
   [ TypeError: Invalid type. Property baz should be Number
         at Object.keys.forEach.key (/Users/Tiaan/Workspace/obj-validate/src/index.js:30:26)
         at Array.forEach (native)
         at validate (/Users/Tiaan/Workspace/obj-validate/src/index.js:16:23)
         at Object.<anonymous> (/Users/Tiaan/Workspace/obj-validate/src/index.js:51:1)
         at Module._compile (module.js:571:32)
         at Object.Module._extensions..js (module.js:580:10)
         at Module.load (module.js:488:32)
         at tryModuleLoad (module.js:447:12)
         at Function.Module._load (module.js:439:3)
         at Module.runMain (module.js:605:10) ] }*/
```

Possible validations:
- `required` - A property is required
- `type` - The required type of a property as a `String` or `Array` of possible types e.g. `Object` or `['Function', 'String']`
- `pattern` - Regex pattern to match property value on e.g. `/foo/`

## Contribute

1. Fork it and create your feature branch: git checkout -b my-new-feature
2. Commit your changes: git commit -am 'Add some feature'
3. Push to the branch: git push origin my-new-feature 
4. Submit a pull request

## License

MIT
    

<h1 align="center">obj-validate</h1>
<div align="center">
  <strong>Validate an object against a given schema</strong>
</div>
<div align="center">
  <a href="https://npmjs.org/package/obj-validate">
    <img src="https://img.shields.io/npm/v/obj-validate.svg?style=flat-square" alt="npm package version" />
  </a>
  <a href="https://npmjs.org/package/obj-validate">
  <img src="https://img.shields.io/npm/dm/obj-validate.svg?style=flat-square" alt="npm downloads" />
  </a>
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="standard JS linter" />
  </a>
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square" alt="prettier code formatting" />
  </a>
  <a href="https://travis-ci.org/tiaanduplessis/obj-validate">
    <img src="https://img.shields.io/travis/tiaanduplessis/obj-validate.svg?style=flat-square" alt="travis ci build status" />
  </a>
  <a href="https://github.com/tiaanduplessis/obj-validate/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/obj-validate.svg?style=flat-square" alt="project license" />
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="make a pull request" />
  </a>
</div>
<br>
<div align="center">
  <a href="https://github.com/tiaanduplessis/obj-validate/watchers">
    <img src="https://img.shields.io/github/watchers/tiaanduplessis/obj-validate.svg?style=social" alt="Github Watch Badge" />
  </a>
  <a href="https://github.com/tiaanduplessis/obj-validate/stargazers">
    <img src="https://img.shields.io/github/stars/tiaanduplessis/obj-validate.svg?style=social" alt="Github Star Badge" />
  </a>
  <a href="https://twitter.com/intent/tweet?text=Check%20out%20obj-validate!%20https://github.com/tiaanduplessis/obj-validate%20%F0%9F%91%8D">
    <img src="https://img.shields.io/twitter/url/https/github.com/tiaanduplessis/obj-validate.svg?style=social" alt="Tweet" />
  </a>
</div>
<br>
<div align="center">
  Built with ❤︎ by <a href="https://github.com/tiaanduplessis">tiaanduplessis</a> and <a href="https://github.com/tiaanduplessis/obj-validate/contributors">contributors</a>
</div>

<h2>Table of Contents</h2>
<details>
  <summary>Table of Contents</summary>
  <li><a href="#install">Install</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#contribute">Contribute</a></li>
  <li><a href="#license">License</a></li>
</details>

## Install

```sh
$ npm install obj-validate
# OR
$ yarn add obj-validate
```

## Usage

The module exports a single function that accepts an `object` and a `schema` as arguments. The `object` is validated against the `schema`, returning an object. 

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

## Contributing

Contributions are welcome!

1. Fork it.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

Or open up [a issue](https://github.com/tiaanduplessis/obj-validate/issues).

## License

Licensed under the MIT License.

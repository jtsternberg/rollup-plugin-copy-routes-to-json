# Rollup Plugin: Copy Routes JSON

An unofficial Rollup plugin which converts JavaScript files containing route definitions into JSON files. It's useful when you want to share your routes configuration with other parts of your application or with other applications that can't import JavaScript directly.

## Install

```shell
npm install --save-dev rollup-plugin-copy-routes-to-json
```

## Usage

```js
import copyRoutesJson from 'rollup-plugin-copy-routes-to-json'

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
  },
  plugins: [
    copyRoutesJson({
      targets: [
        { src: 'src/routes.js', dest: 'dist' }
      ]
    })
  ]
}
```

In the above example, the plugin will import the routes from `src/routes.js`, convert them to JSON, and write the result to `output/routes.json`.

## Options

You can pass an options object to the `copyRoutesJson` function:

* `targets` (Array): An array of objects, each containing a `src` (source JavaScript file with routes) and `dest` (destination directory where the JSON file will be written).
* `hook` (String): The name of the Rollup hook at which the plugin should run. Defaults to `'buildEnd'`.
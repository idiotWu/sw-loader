# sw-loader

[![npm](https://img.shields.io/npm/v/sw-loader.svg?style=flat-square)](https://www.npmjs.com/package/sw-loader)
[![Travis](https://img.shields.io/travis/idiotWu/sw-loader.svg)](https://travis-ci.org/idiotWu/sw-loader)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE)

Yet another Service Workers loader for webpack.

## Install

```bash
npm install --save-dev sw-loader
```

## Usage

This loader emits a standalone service worker file and exports the entry point.

```js
import scriptURL from 'sw-loader!./sw.js';
// => 'scriptURL = {output.publicPath}/sw.js'
// => file location: {output.path}/sw.js

navigator.serviceWorker.register(scriptURL).then(...);
``` 

## Options

### `name`

Specify the name of output file:

```js
import scriptURL from 'sw-loader?name=my-worker.js!./sw.js';
// => 'scriptURL = {output.publicPath}/my-worker.js'
// => file location: {output.path}/my-worker.js
```

Notice: this loader **DOES NOT** support filename interpolation, for the reason that a service worker is considered as a persistent resource.

### `outputPath`

By default the output path follows `output.path` option in webpack configurations, you can change it to anywhere you like.

**The `outputPath` will be resolved to project root.**

```js
import scriptURL from 'sw-loader?outputPath=build/workers/!./sw.js';
// => 'scriptURL = {output.publicPath}/sw.js'
// => file location: build/workers/sw.js
```

The `outputPath` modifies **only the output destination**, if you want to change the access URL address of service worker script, use the `publicPath` option below.

### `publicPath`

By default this loader uses `output.publicPath` to concatenate the public URL address of service worker script, you can modify it by:

```js
import scriptURL from 'sw-loader?publicPath=/!./sw.js';
// => 'scriptURL = /sw.js'
// => file location: {output.path}/sw.js
```

## License

[MIT](LICENSE)

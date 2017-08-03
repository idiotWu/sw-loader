'use strict';

const path = require('path');
const loaderUtils = require('loader-utils');
const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');

module.exports = function swLoader() {}

module.exports.pitch = function pitch(request) {
  if (!this.webpack) {
    throw new Error('Only usable with webpack.');
  }

  this.cacheable(false);

  const callback = this.async();
  const query = loaderUtils.getOptions(this) || {};
  const filename = query.name || 'sw.js';

  const outputOptions = {
    filename,
    chunkFilename: `[id].${filename}`,
    namedChunkFilename: null,
  };

  const swCompiler = this._compilation.createChildCompiler('sw', outputOptions);

  swCompiler.apply(new SingleEntryPlugin(this.context, `!!${request}`, 'main'));

  const subCache = `subcache ${__dirname} ${request}`;
  swCompiler.plugin('compilation', (compilation) => {
    if (compilation.cache) {
      if (!compilation.cache[subCache]) {
        compilation.cache[subCache] = {};
      }
      compilation.cache = compilation.cache[subCache];
    }
  });

  swCompiler.runAsChild((err, entries, compilation) => {
    if (err) return callback(err);
    if (!entries[0]) return callback(null, null);

    const swFile = entries[0].files[0];

    if (query.outputPath) {
      // omit default outputs
      delete this._compilation.assets[swFile];

      // resolve to project root
      const outputPath = path.resolve(process.cwd(), query.outputPath, swFile);

      this.emitFile(
        // get relative path from parent compiler's output
        path.relative(this.options.output.path, outputPath),
        compilation.assets[swFile].source()
      );
    }

    const publicPath = query.publicPath ?
      JSON.stringify(path.join(query.publicPath, swFile)) :
      `__webpack_public_path__ + ${JSON.stringify(swFile)}`;

    return callback(null, `module.exports = ${publicPath};`);
  });
}

'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const outputPath = path.join(__dirname, '..', '__out__');

function bundle(dir, options) {
  const config = Object.assign({
    entry: path.join(__dirname, `./${dir}/app.js`),
    output: {
      path: `${outputPath}/${dir}`,
      filename: 'bundle.js',
      publicPath: `${dir}/`,
    },
  }, options);

  return new Promise((resolve, reject) => {
    webpack(config).run((err, stats) => {
      if (err) {
        reject(err);
      } else if (stats.compilation.errors.length) {
        reject(new Error(stats.toString('errors-only')));
      } else {
        resolve(stats);
      }
    });
  });
}

function throwErr(msg) {
  console.error(new Error(msg));
  process.exit(1);
}

function fileExisted(file) {
  const fullPath = path.join(outputPath, file);

  if (!fs.existsSync(fullPath)) {
    throwErr(`${file} is not found.`);
  }
}

bundle('default').then(() => {
  fileExisted('default/bundle.js');
  fileExisted('default/sw.js');
});

bundle('named').then(() => {
  fileExisted('named/bundle.js');
  fileExisted('named/service-worker.js');
});

bundle('output-path').then(() => {
  fileExisted('output-path/bundle.js');
  fileExisted('workers/sw.js');
});

bundle('public-path').then(() => {
  fileExisted('public-path/bundle.js');
  fileExisted('public-path/sw.js');

  const content = fs.readFileSync(outputPath + '/public-path/bundle.js', 'utf-8');

  if (!content.match('module.exports = "workers/sw.js"')) {
    throwErr('publicPath mismatched.');
  }
});

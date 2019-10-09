const path = require('path');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const babel = require('rollup-plugin-babel');
const { uglify } = require('rollup-plugin-uglify');
const jsxPlugin = require('@babel/plugin-transform-react-jsx');

const cwd = process.cwd();
const pkg = require(path.join(cwd, 'package.json')); // eslint-disable-line
const {
  name,
  version
} = pkg;

const banner = `/*
* ${name} v${version}
* Copyright (c) ${new Date().getFullYear()} QlikTech International AB
* Released under the MIT license.
*/

`;

const watch = process.argv.indexOf('-w') > 2;

const config = (isEsm) => {
  const outputFile = isEsm ? pkg.module : pkg.main;
  const basename = path.basename(outputFile);
  const dir = path.dirname(outputFile);
  const umdName = basename.replace(/-([a-z])/g, (m, p1) => p1.toUpperCase()).split('.js').join('');

  const cfg = {
    input: path.resolve(cwd, 'src', 'index'),
    output: {
      file: path.resolve(dir, basename),
      format: isEsm ? 'es' : 'umd',
      exports: 'default',
      name: umdName,
      sourcemap: true,
      banner
    },
    plugins: [
      json({
        // All JSON files will be parsed by default,
        // but you can also specifically include/exclude files
        exclude: [ 'node_modules/**'],
        // for tree-shaking, properties will be declared as
        // variables, using either `var` or `const`
        preferConst: true, // Default: false
  
        // specify indentation for the generated default export —
        // defaults to '\t'
        indent: '  ',
  
        // ignores indent and generates the smallest code
        compact: false, // Default: false
  
        // generate a named export for every property of the JSON object
        namedExports: true // Default: true
      }), 
      nodeResolve(),
      babel({
        include: [
          'src/**',
          /path2d-polyfill/
        ],
        presets: [
          ['@babel/preset-env', {
            modules: false,
            targets: {
              browsers: ['ie 11']
            }
          }]
        ],
        plugins: [
          [jsxPlugin, { pragma: 'h' }]
        ]
      }),
      commonjs()
    ]
  };

  if (process.env.NODE_ENV === 'production' && !isEsm) {
    cfg.plugins.push(uglify({
      output: {
        preamble: banner
      }
    }));
  }

  return cfg;
};

module.exports = [
  watch ? false : config(),
  config(true)
].filter(Boolean);

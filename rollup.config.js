import resolve from '@rollup/plugin-node-resolve'; 
import alias from '@rollup/plugin-alias';         
import babel from '@rollup/plugin-babel';         
import sass from 'rollup-plugin-sass';

import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

const sassOptions = {
  output: true
};

const aliasOptions = {
  'mini-react-dom': __dirname + '/core/mini-react-dom/index.js',
  'mini-react': __dirname + '/core/mini-react/index.js',
  'mini-react-reconciler': __dirname + '/core/mini-react-reconciler/index.js',
  shared: __dirname + '/core/shared/index.js',
  'mini-react-router': __dirname + '/src/components/router/index.js',
};


const isDev = process.env.NODE_ENV === 'development';

const plugins = [
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'bundled'
  }),
  sass(sassOptions),
  resolve(),
  alias(aliasOptions),
  isDev && serve({
    open: true,
    contentBase: ['./public', './build'],
    historyApiFallback: true,
    port: 3008,
  }),
  isDev && livereload('./src'),
].filter(Boolean); 

export default {
  input: 'src/index.js',
  output: {
    file: __dirname + '/build/bundle.min.js',
    format: 'cjs'
  },
  plugins
};

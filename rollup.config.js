import { fileURLToPath } from 'url';
import { dirname, resolve as resolvePath } from 'path';
import resolvePlugin from '@rollup/plugin-node-resolve'; 
import alias from '@rollup/plugin-alias';         
import babel from '@rollup/plugin-babel';         
import sass from 'rollup-plugin-sass';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sassOptions = {
  output: resolvePath(__dirname, 'public/build/bundle.min.css')
};

const aliasOptions = {
  entries: [
    { find: 'mini-react-dom', replacement: resolvePath(__dirname, 'core/mini-react-dom/index.js') },
    { find: 'mini-react', replacement: resolvePath(__dirname, 'core/mini-react/index.js') },
    { find: 'mini-react-reconciler', replacement: resolvePath(__dirname, 'core/mini-react-reconciler/index.js') },
    { find: 'shared', replacement: resolvePath(__dirname, 'core/shared/index.js') },
    { find: 'mini-react-router', replacement: resolvePath(__dirname, 'src/components/router/index.js') },
  ]
};

const isDev = process.env.NODE_ENV === 'development';

const plugins = [
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'bundled'
  }),
  sass(sassOptions),
  resolvePlugin({ browser: true }), 
  alias(aliasOptions),
  isDev && serve({
    open: true,
    contentBase: 'public',
    historyApiFallback: true,
    port: 3008,
  }),
  isDev && livereload('public'),
].filter(Boolean);

export default {
  input: 'src/index.js',
  output: {
    dir: resolvePath(__dirname, 'public/build'),
    format: 'iife', 
    sourcemap: isDev ? 'inline' : false,
  },
  plugins,
  watch: {
    clearScreen: false,
    include: 'src/**',
  }
};


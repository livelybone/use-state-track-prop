import dts from 'rollup-plugin-dts'
import license from 'rollup-plugin-license'
import { uglify } from 'rollup-plugin-uglify'
import packageConf from './package.json'
import baseConf from './rollup.config.base'

const isWatch = process.env.BUILD_ENV === 'watch'
const isDts = process.env.BUILD_ENV === 'dts'

const conf = entry => ({
  input: entry.filename,
  output: entry.formats.map(format => ({
    file: `./lib/${format}/${entry.name}.js`,
    format,
    name: 'useStateTrackProp',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  })),
  external: [
    ...(entry.external ? Object.keys(packageConf.dependencies || {}) : []),
    'react',
    'react-dom',
  ],
  plugins: [
    ...baseConf.plugins,
    entry.needUglify !== false && uglify(),
    license({
      banner: `Bundle of <%= pkg.name %>
               Generated: <%= moment().format('YYYY-MM-DD') %>
               Version: <%= pkg.version %>
               License: <%= pkg.license %>
               Author: <%= pkg.author %>`,
    }),
  ],
})

// eslint-disable-next-line no-nested-ternary
export default isWatch
  ? [
      {
        name: 'index',
        filename: './src/index.ts',
        formats: ['umd'],
        needUglify: false,
      },
    ].map(conf)
  : isDts
  ? [
      {
        input: './src/index.ts',
        output: [{ file: './index.d.ts', format: 'es' }],
        plugins: [dts()],
      },
    ]
  : [
      {
        name: 'index',
        filename: './src/index.ts',
        formats: ['es'],
        needUglify: false,
        external: true,
      },
      {
        name: 'index',
        filename: './src/index.ts',
        formats: ['umd'],
        needUglify: true,
        external: false,
      },
    ].map(conf)

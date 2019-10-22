import { DEFAULT_EXTENSIONS } from '@babel/core'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

const isWatch = process.env.BUILD_ENV === 'watch'

export default {
  plugins: [
    ...(isWatch
      ? [
          {
            name: 'replace',
            transform(code) {
              return {
                code: code.replace(
                  /process\.env\.NODE_ENV/g,
                  JSON.stringify('production'),
                ),
              }
            },
          },
        ]
      : []),
    resolve({
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    }),
    commonjs(),
    babel({
      babelrc: true,
      externalHelpers: false,
      runtimeHelpers: true,
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    }),
  ],
}

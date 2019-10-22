module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
        },
      },
    ],
    'react-app',
  ],
  plugins:
    process.env.NODE_ENV === 'test'
      ? [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-class-properties',
        'istanbul',
      ]
      : ['@babel/plugin-proposal-class-properties'],
}

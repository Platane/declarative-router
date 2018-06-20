const plugins = [
  ['babel-plugin-module-resolver', { alias: { '~': './src' } }],

  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
]

const presets = ['@babel/preset-flow', '@babel/react']

if (process.env.NODE_ENV === 'production') {
  plugins.push('@babel/plugin-transform-modules-commonjs')
}
if (process.env.NODE_ENV === 'test') {
  plugins.push('@babel/plugin-transform-modules-commonjs')
}
if (process.env.DOTFLOW) {
  plugins.push('@babel/plugin-syntax-flow')
  plugins.push('@babel/plugin-transform-flow-comments')
  presets.length = 0
  presets.push('@babel/react')
}

module.exports = { plugins, presets }

module.exports = {
  moduleName: 'VueInter',
  format: ['cjs', 'umd', 'umd-min'],
  name: 'vue-inter',
  extendOptions(options, { format, compress }) {
    if (format === 'umd') {
      options.env = options.env || {}
      options.env.NODE_ENV = compress ? 'production' : 'development'
    }
    return options
  }
}

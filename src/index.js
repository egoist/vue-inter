import defaultTemplate from './template'

let Vue

export default class Inter {
  static install(_Vue) {
    Vue = _Vue
    Vue.mixin({
      beforeCreate() {
        this.$inter =
          this.$options.inter || (this.$parent && this.$parent.$options.inter)
        if (this.$inter) {
          this.$i = this.$inter.get.bind(this.$inter)
        }
      }
    })
  }

  constructor({ locale, locales, template = defaultTemplate }) {
    if (!Vue) {
      throw new Error('You have to install `vue-inter` first: Vue.use(Inter)')
    }

    this.template = template

    const silent = Vue.config.silent
    Vue.config.silent = true
    this.vm = new Vue({
      data: {
        $$locales: locales,
        $$locale: locale
      }
    })
    Vue.config.silent = silent
  }

  get locale() {
    return this.vm._data.$$locale
  }

  get(key, ...data) {
    return this.template(this.vm._data.$$locales[this.locale][key], ...data)
  }

  setLocale(locale) {
    this.vm._data.$$locale = locale
    return this
  }
}

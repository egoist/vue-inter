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
    if (process.env.NODE_ENV === 'development' && !Vue) {
      throw new Error('You have to install `vue-inter` first: Vue.use(Inter)')
    }

    this.template = template
    this.locales = locales

    const silent = Vue.config.silent
    Vue.config.silent = true
    this.vm = new Vue({
      data: {
        $$locale: locale
      }
    })
    Vue.config.silent = silent
  }

  get locale() {
    return this.vm._data.$$locale
  }

  get(key, ...data) {
    const localeData = this.locales[this.locale]
    if (process.env.NODE_ENV === 'development' && !localeData) {
      throw new Error(`[vue-inter] Locale "${this.locale}" was not found`)
    }
    const message = localeData[key]
    if (process.env.NODE_ENV === 'development' && !message) {
      throw new Error(`[vue-inter] No message under "${key}" was found`)
    }
    return this.template(message, ...data)
  }

  setLocale(locale) {
    this.vm._data.$$locale = locale
    return this
  }
}

import defaultTemplate from './template'
import getProp from './get-prop'

let Vue

export default class Inter {
  static install(_Vue) {
    Vue = _Vue
    Vue.mixin({
      beforeCreate() {
        this.$inter =
          this.$options.inter || (this.$parent && this.$parent.$inter)
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

    Vue.util.defineReactive(this, '__locale', locale)
  }

  get locale() {
    return this.__locale
  }

  get(path, ...data) {
    const localeData = this.locales[this.locale]
    if (process.env.NODE_ENV === 'development' && !localeData) {
      throw new Error(`[vue-inter] Locale "${this.locale}" was not found`)
    }
    const message = getProp(localeData, path)
    if (process.env.NODE_ENV === 'development' && !message) {
      throw new Error(`[vue-inter] No message under "${path}" was found`)
    }
    return this.template(message, ...data)
  }

  setLocale(locale) {
    this.__locale = locale
    return this
  }
}

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

  constructor({ locale, locales = {}, template = defaultTemplate }) {
    if (process.env.NODE_ENV === 'development' && !Vue) {
      throw new Error('You have to install `vue-inter` first: Vue.use(Inter)')
    }

    this.template = template
    this.locales = locales

    Vue.util.defineReactive(this, '__locale', locale)
  }

  get(path, ...data) {
    const localeData = this.locales[this.currentLocale]
    if (process.env.NODE_ENV === 'development' && !localeData) {
      throw new Error(
        `[vue-inter] Locale "${this.currentLocale}" was not found`
      )
    }
    const message = getProp(localeData, path)
    if (process.env.NODE_ENV === 'development' && !message) {
      throw new Error(`[vue-inter] No message under "${path}" was found`)
    }
    if (typeof message === 'function') {
      return message(...data)
    }
    return this.template(message, ...data)
  }

  get currentLocale() {
    return this.__locale
  }

  setCurrentLocale(locale) {
    this.__locale = locale
    return this
  }

  setLocaleData(locale, localData) {
    this.locales[locale] = localData
    return this
  }

  get availableLocales() {
    return Object.keys(this.locales)
  }
}

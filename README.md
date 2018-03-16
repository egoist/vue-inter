
# vue-inter

[![NPM version](https://img.shields.io/npm/v/vue-inter.svg?style=flat)](https://npmjs.com/package/vue-inter) [![NPM downloads](https://img.shields.io/npm/dm/vue-inter.svg?style=flat)](https://npmjs.com/package/vue-inter) [![CircleCI](https://circleci.com/gh/egoist/vue-inter/tree/master.svg?style=shield)](https://circleci.com/gh/egoist/vue-inter/tree/master)  [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate) [![chat](https://img.shields.io/badge/chat-on%20discord-7289DA.svg?style=flat)](https://chat.egoist.moe)

[![Edit vue-inter example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vvky0nov6l)

## Install

```bash
yarn add vue-inter
```

CDN: [UNPKG](https://unpkg.com/vue-inter/dist/) | [jsDevlir](https://cdn.jsdelivr.net/npm/vue-inter/dist/) (available as `window.VueInter`)

## Usage

App entry `index.js`:

```js
import Inter  from 'vue-inter'
import App from './App.vue'

Vue.use(Inter)

const inter = new Inter({
  locale: 'en',
  // Define messages for other locales
  messages: {}
})

new Vue({
  inter,
  render: h => h(App)
})
```

Root component `App.vue`:

```vue
<template>
  <div id="app">
    <format-message 
      path="app.home.greeting"
      defaultMessage="Hello {name}!"
      :data="{name: 'egoist'}"
    />
  </div>
</template>
```

First, we find message from `messages` at given `path`, then we fallback to `defaultMessage` if not found.

### Plural support

You can use [intl-messageformat](https://github.com/yahoo/intl-messageformat) instead of our default [`template`](#create-instance) option to add plural support:

```js
import IntlMessageFormat from 'intl-messageformat'

const inter = new Inter({
	template(message, data) {
    if (!data) return message
		const tpl = new IntlMessageFormat(message, this.currentLocale)
		return tpl.format(data)
	}
})
```

## Components

### `<FormatMessage>`

#### Props

##### path

Type: `string`<br>
Required: `true`

Find locale message at given path, or fallback to `defaultMessage` below.

##### defaultMessage

Type: `string`

##### data

Type: `object`

##### tag

Type: `string` `object`<br>
Default: `span`

An HTML tag or Vue component.

## API

### Instance API

#### Create Instance

```js
const inter = new Inter({
  // Current locale
  locale: 'en',

  // Messages for each locale
  messages: {
    en: LocaleMessages,
    zh: LocaleMessages
  },

  // Message templating
  template: Template
})
```

A `LocaleMessages` type is:

```typescript
interface LocaleMessages {
  /** The value is a string or a function that returns a string */
  [path: string]: string | (...data: any[]) => string
}
```

While a `Template` type is:

```typescript
type Template = (this: Inter, message: string, ...data: any[]) => string
```

#### inter.formatMessage({ path, defaultMessage }, [data])

Format a message from given path in `messages` for current locale:

```js
inter.formatMessage({ path: 'app.hello' }, { name: 'egoist' })

// Or fallback to `defaultMessage` when message was not found
// at given path
inter.formatMessage({ 
  path: 'not.exists.path',
  defaultMessage: 'Hello {name}'
}, { name: 'egoist' })
```

#### inter.setCurrentLocale(locale)

Set current locale, e.g.:

```js
inter.setCurrentLocale('fr')
```

#### inter.currentLocale

Return current locale, e.g.:

```js
inter.currentLocale
//=> 'fr'
```

#### inter.setLocaleData(locale, localeData)

Set localeData for a locale, e.g.:

```js
inter.setLocaleData('es', espanaLocaleData)
```

#### inter.availableLocales

Return a list of available locales, e.g.:

```js
inter.availableLocales
//=> ['fr', 'es']
```

### Component injection

#### $inter

The Inter instance.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**vue-inter** © [EGOIST](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by EGOIST with help from contributors ([list](https://github.com/egoist/vue-inter/contributors)).

> [egoist.moe](https://egoist.moe) · GitHub [@EGOIST](https://github.com/egoist) · Twitter [@_egoistlily](https://twitter.com/_egoistlily)

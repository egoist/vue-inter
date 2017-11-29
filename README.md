
# vue-inter

[![NPM version](https://img.shields.io/npm/v/vue-inter.svg?style=flat)](https://npmjs.com/package/vue-inter) [![NPM downloads](https://img.shields.io/npm/dm/vue-inter.svg?style=flat)](https://npmjs.com/package/vue-inter) [![CircleCI](https://circleci.com/gh/egoist/vue-inter/tree/master.svg?style=shield)](https://circleci.com/gh/egoist/vue-inter/tree/master)  [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate) [![chat](https://img.shields.io/badge/chat-on%20discord-7289DA.svg?style=flat)](https://chat.egoist.moe)

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
  locales: {
    en: {
      welcome_guest: 'Welcome guest'
    },
    zh: {
      welcome_guest: '你好游客'
    }
  }
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
    {{ $inter.get('welcome_guest') }}
  </div>
</template>
```

<details><summary>Dot-notation path</summary><br>

```js
// Object
{
  my: {
    name: 'egoist'
  },
  'my.name': 'notegoist'
}
$inter.get('my.name') //=> egoist
$inter.get('my\\.name') //=> notegoist
```
</details>

<details><summary>Message templating</summary><br>

By default `vue-inter` uses a simple templating syntax:

```js
// Object
{ welcome_guest: 'hello {name}' }
$inter.get('welcome_guest', { name: 'egoist' })
// List
{ welcome_guests: 'hello {0} and {1}' }
$inter.get('welcome_guests', ['egoist', 'lily'])
```

You can also use a custom template engine, like [Mustache](https://github.com/janl/mustache.js):

```js
import Mustache from 'mustache'

const inter = new Inter({
  template(message, data) {
    // render the message with data
    return Mustache.render(message, data)
  },
  locale: 'en',
  locales: {
    en: {
      welcome_message: 'Hello {{#user}}{{username}}{{/user}}{{^user}}guest{{/user}}'
    }
  }
})
```
</details>

## API

### Instance API

#### Create Instance

```js
const inter = new Inter({
  // Current locale
  locale: 'en',

  // Available locales
  locales: {
    en: Object,
    zh: Object
  },

  // Message templating
  template: Function
})
```

#### inter.get(key, [data])

Get a message from current locale, the message supports templating:

```js
// Assuming `my_age` is set to `I am {age} years old`
inter.get('my_age', { age: 23 })
// You will get `I am 23 years old`

// Assuming `i_like` is set to `I like {0} and {1}`
inter.get('i_like', ['apple', 'banana'])
// Your will get `I like apple and banana`
```

#### inter.setLocale(locale)

Update current locale, eg. `inter.setLocale('fr')`

#### inter.locale

Get current locale.

### Component injection

#### $inter

The Inter instance.

#### $i

Alias to `$inter.get`.

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

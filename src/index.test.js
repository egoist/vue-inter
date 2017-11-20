import Vue from 'vue'
import { mount } from 'vue-test-utils'
import Inter from './'

Vue.use(Inter)

test('basic', async () => {
  const inter = new Inter({
    locale: 'en',
    locales: {
      en: {
        welcome: 'welcome'
      },
      zh: {
        welcome: '欢迎'
      }
    }
  })

  const wrapper = mount(
    {
      inter,
      template: `<div>{{ $i('welcome') }}</div>`
    },
    { clone: false }
  )

  expect(wrapper.html()).toBe('<div>welcome</div>')

  // Update locale
  inter.setLocale('zh')
  await Vue.nextTick()
  expect(wrapper.html()).toBe('<div>欢迎</div>')
})

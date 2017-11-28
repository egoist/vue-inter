import Vue from 'vue'
import Inter from '../src'

Vue.use(Inter)

const inter = new Inter({
  locale: 'en',
  locales: {
    en: {
      welcome_guest: 'Welcome guest',
      my: {
        age: 'I am {age} years old'
      },
      source_code: 'Check out the source code'
    },
    zh: {
      welcome_guest: '你好游客',
      my: {
        age: '我今年 {age} 岁'
      },
      source_code: '查看源代码'
    }
  }
})

new Vue({
  inter,
  el: '#app',
  data: {
    age: 23
  },
  render() {
    return <div>
      <select onChange={e => this.$inter.setLocale(e.target.value)}>
        <option value="en" selected>en</option>
        <option value="zh">zh</option>
      </select>
      <input v-model={this.age} type="number" />
      <hr/>
      {this.$inter.get('welcome_guest')},{' '}
      {this.$inter.get('my.age', { age: this.age })}
      <hr/>
      {this.$inter.get('source_code')}: <a href="https://github.com/egoist/vue-inter">https://github.com/egoist/vue-inter</a>
    </div>
  }
})

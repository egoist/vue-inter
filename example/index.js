import Vue from 'vue'
import Inter from '../src'

Vue.use(Inter)

const inter = new Inter({
  locale: 'en',
  messages: {
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
      <select onChange={e => this.$inter.setCurrentLocale(e.target.value)}>
        <option value="en" selected>en</option>
        <option value="zh">zh</option>
      </select>
      <input v-model={this.age} type="number" />
      <hr/>
      <format-message
        class="foo"
        id="haha"
        onClick={() => alert('123')}
        tag="div"
        path="welcome_guest"
        defaultMessage="Welcome guest" />
      <format-message
        path="my.age"
        defaultMessage="I am {age} years old"
        data={{ age: this.age }} />
      <hr/>
      <format-message
        path="source_code"
        defaultMessage="Check out the source code" />: <a href="https://github.com/egoist/vue-inter">https://github.com/egoist/vue-inter</a>
    </div>
  }
})

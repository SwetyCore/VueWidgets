import Vue from 'vue'
import App from './App.vue'
import '@/components/widgets/index.js'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import './assets/css/base.css'
import api from './plugins/api'

Vue.config.productionTip = false
Vue.prototype.api = api

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

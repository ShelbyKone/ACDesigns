import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { fb } from './services/firebase'
import VueSocialSharing from 'vue-social-sharing'
Vue.use(VueSocialSharing);

Vue.config.productionTip = process.env.NODE_ENV === 'production';

let app
fb.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
  if (user) {
    store.dispatch('authenticate')
  }
})
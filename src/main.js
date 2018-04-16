import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.use(axios);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    this.$store.dispatch('initialize');
  }
})

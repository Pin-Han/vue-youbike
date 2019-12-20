import Vue from 'vue';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Notification from 'vue-notification';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store';
import router from './router';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.component('Loading', Loading);
Vue.use(Notification);
Vue.use(VueAxios, axios);
// Vue.use(VueGoogleMaps,{load:{key:'AIzaSyBYgc0F4T4Qr0d-Zq_ikJTvCGqlfYowky4',libraries:'places'}})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

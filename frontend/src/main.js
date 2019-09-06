import '@babel/polyfill';
import './registerServiceWorker';
import 'swiper/dist/css/swiper.min.css';

import Vue from 'vue';

import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';

import './sync';

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');

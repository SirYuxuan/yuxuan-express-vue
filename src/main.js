import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import HeyUI from 'heyui';
Vue.use(HeyUI);
// js引用
import "heyui/themes/index.less";

new Vue({
  render: h => h(App),
}).$mount('#app')

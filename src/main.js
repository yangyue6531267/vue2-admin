/*
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-11-16 21:11:25
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2023-01-14 15:22:04
 * @FilePath: \杭州绿城\greentown-wap\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import './mockjs/index'
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AppComponents from './components/global/index';

import '@/permission';
import '@/utils/components';

import '@assets/scss/style.scss';
import 'nprogress/nprogress.css';

Vue.config.productionTip = false;
Vue.use(AppComponents);

import AmapVue from '@amap/amap-vue';
AmapVue.config.key = 'c1018cb8a03d99d4fdddf75a96fc6749';

window._AMapSecurityConfig = {
  securityJsCode:'75faab817527f8b248260835277d12c7',
}
AmapVue.config.plugins = [
  'AMap.DistrictSearch',
];
Vue.use(AmapVue);
import vuescroll from 'vuescroll' 
Vue.use(vuescroll)

import mixinsFilters from '@/mixins/mixinsFilters';
Vue.mixin(mixinsFilters);

import vueSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(vueSwiper);
import SwiperCore, { Pagination } from 'swiper';
SwiperCore.use([Pagination]);

new Vue({
  router,
  store,
  data: { ops: { vuescroll: { }, scrollPanel: { } } },
  render: h => h(App),
}).$mount('#app');

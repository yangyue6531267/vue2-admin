/*
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-11-16 21:11:25
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2023-02-10 17:00:37
 * @FilePath: \杭州绿城\greentown-wap\src\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import dateFormatter from '@utils/timeFormatter';

Vue.use(Vuex);

const env = process.env;
const infos = {
  preview: { title: '徽华智慧园区', logo: '' },
  testing: { title: '起梦智慧园区', logo: '' },
  production: { title: '起梦智慧园区', logo: '' },
  development: { title: '起梦智慧园区', logo: '' },
};

const current = infos[env.VUE_APP_BASE_ENV] || {}; // 当前信息

export default new Vuex.Store({
  modules: { user },
  state: {
    logo: current.logo,
    title: current.title,
    datetime: dateFormatter('YYYY-MM-DD'),
  },
  getters: {
    logged: state => state.user.logged, // 是否已登录
    region: state => state.user.locate.code || '', // 当前区域ID，用于请求参数
    IsInGroup: state => state.user.locate.code === '00000001', // 当前是否是集团
    locate: state => state.user.locate, // 当前区域
    routes: state => state.user.routes,
    ticket: state => state.user.ticket, // 登录token
    userInfo: state => state.user.userInfo, // 用户信息
    authPaths: state => state.user.authPaths, // 用户信息
    authRegion: state => state.user.authRegion, // 用户信息
    projectId: state => state.user.locate.projectId || '', // 当前项目ID，用于请求参数
  },
  mutations: {
    SET_DATETIME: (state, value) => (state.datetime = value),
  },
  actions: {},
});

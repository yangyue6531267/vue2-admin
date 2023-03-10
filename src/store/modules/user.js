import utils from '@/utils/location';
import router from '@/router';
import storage from '@/utils/storage';
import userApi from '@api/login'; // 用户API
import homeApi from '@api/login';
import allRoutes from '@router/routes';
import { fetchUniqueSets, filterByUniqueSets, traverseOrganization } from '@/utils/permission';

const message = '用户负责区域不存在，请先到后台绑定区域';

export default {
  state: {
    token: storage.getToken() || '',
    ticket: '',
    routes: [], // 用户权限路由
    logged: false,
    userInfo: {},
    authPaths: [],
    authRegion: [],
    existed: false,
    locate: storage.getStorage('locate') || {}, // 区域
    projectId: storage.getStorage('projectId') || {},
  },

  mutations: {
    SET_TOKEN: (state, data) => (state.token = data), // 设置token

    SET_LOGGED: (state, data) => (state.logged = data), // 设置是否已登录

    SET_TICKET: (state, data) => (state.ticket = data), // 设置筛选选项到全局

    SET_LOCATE: (state, data) => {
      state.locate = data;
      storage.setStorage('locate', data);
    },

    SET_ROUTES: (state, data) => (state.routes = data),

    SET_EXISTED: (state, data) => (state.existed = data), // 是否已添加路由

    SET_USERINFO: (state, data) => (state.userInfo = data), // 设置用户信息

    SET_AUTH_PATHS: (state, data) => (state.authPaths = data), // 设置用户信息

    SET_AUTH_REGION: (state, data) => (state.authRegion = data), // 设置用户信息
  },

  // 异步操作
  actions: {
    // 获取用户信息
    async GetInfo({ state, commit, dispatch }) {
      const token = utils.takeUrlParam('ticket');
      const params = token ? { ticket: token } : {};
      const data = await userApi.userInfo(params);
      const { code, name, avatar, account, sysResourceDTO = [] } = data;
      const paths = await dispatch('GenerateRoutes', sysResourceDTO);
      await dispatch('GetRegion');
      commit('SET_LOGGED', Boolean(code));
      commit('SET_TICKET', token);
      commit('SET_USERINFO', { code, name, avatar, account });
      commit('SET_AUTH_PATHS', paths);
      return data;
    },

    // 计算权限
    GenerateRoutes({ state, commit, dispatch }, data) {
      return new Promise(resolve => {
        if (state.existed) return;
        const routeSets = fetchUniqueSets(data, 'code');
        const routeList = filterByUniqueSets(allRoutes, routeSets, 'code');
        routeList.forEach(item => router.addRoute(item));
        commit('SET_ROUTES', routeList);
        commit('SET_EXISTED', true);

        const paths = router.getRoutes();
        const items = paths.map(item => item.path);
        return resolve(items.filter(item => Boolean(item)));
      });
    },

    // 获取区域列表
    async GetRegion({ state, commit }) {
      const data = await homeApi.loginSubOrgList({ parentOrgCode: null });
      const target = traverseOrganization(data);
      commit('SET_AUTH_REGION', target.list);
      if (!state.locate.code) commit('SET_LOCATE', target.item);
    },
  },
  namespaced: true,
};

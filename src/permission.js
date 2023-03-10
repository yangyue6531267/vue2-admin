import store from './store';
import router from './router';
import NProgress from 'nprogress';

const whiteList = ['/403', '/404']; // 路由白名单
const setDocTitle = (valid, title = '') => (document.title = [valid, title].join('-'));

// 返回内容顶部
function setContentScroll() {
  // app-content
  const triContent = document.querySelector('.app-container');
  if (triContent&&triContent.scrollTop>0){
      triContent.scrollTop = 0
  } ;
}

// 判断是否有权限
function routeInAuth(routes, route) {
  if (!routes || routes.length === 0) return false;
  const current = routes.find(item => {
    if (/\/:\w+$/.test(item)) {
      return route.includes(item.replace(/\/:\w+$/g, ''));
    } else {
      return item === route;
    }
  });
  return Boolean(current);
}

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  setContentScroll();
  // 放开白名单访问权限
  if (whiteList.includes(to.path)) {
    next();
  } else {
    if (store.getters.logged) {
      const target = store.getters;
      const locate = target.locate || {}; // 当前所处组织
      const routes = target.authPaths; // 拥有的权限路径
      const inAuth = routeInAuth(routes, to.path);

      // 没有任何路由权限，直接跳转到403
      if (to.path !== '/' && !inAuth) {
        next({ path: '/403' });
      } else {
        const type = locate.type || 0;

        // 0 区域权限
        // 1 项目权限
        if (type === 0) {
          if (to.path.indexOf('region') === -1 || to.path === '/') {
            next({ path: '/region' });
          } else {
            next();
          }
        } else if (type === 1) {
          if (to.path.indexOf('project') === -1 || to.path === '/') {
            next({ path: '/project' });
          } else {
            next();
          }
        } else {
          next();
        }
      }
    } else {
      try {
        await store.dispatch('user/GetInfo');
        const target = store.getters;
        const locate = target.locate || {}; // 当前所处组织
        const routes = target.authPaths; // 拥有的权限路径
        const inAuth = routeInAuth(routes, to.path); // 没有任何路由权限，直接跳转到403

        if (to.path !== '/' && !inAuth) {
          next({ path: '/403' });
        } else {
          const type = locate.type || 0;

          // 1 区域权限
          // 2 项目权限
          if (type === 0) {
            if (to.path.indexOf('/region') === -1 || to.path === '/') {
              next({ path: '/region' });
            } else {
              next(to);
            }
          } else if (type === 1) {
            if (to.path.indexOf('/project') === -1 || to.path === '/') {
              next({ path: '/project' });
            } else {
              next(to);
            }
          } else {
            next();
          }
        }
      } catch (error) {
        console.error(error);
        if (error && error.code === 403) {
          next({ path: '/403' });
        } else {
          next();
        }
      }
      next();
    }
  }
});

router.afterEach(() => NProgress.done());

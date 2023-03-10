import Vue from 'vue';
import VueRouter from 'vue-router';
const originalReplace = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalReplace.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const whiteRoutes = [
  { path: '/', name: 'Index' },
  { path: '/403', name: 'NoPermission', component: () => import('@/views/403.vue') },
  { path: '/404', name: 'NoFoundPage', component: () => import('@/views/404.vue') },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: whiteRoutes,
});

export default router;

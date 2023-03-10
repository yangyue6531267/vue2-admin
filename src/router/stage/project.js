import Layout from '@/layout/viewer';
import Redirect from '@/layout/redirect';
const BASE_ENV = process.env.VUE_APP_BASE_ENV;

export default {
  path: '/project',
  name: 'Project',
  component: Layout,
  meta: { title: '项目首页', catid: 1, code: 'S003' },
  redirect: '/project/overview',
  children: [
    {
      path: '/project/overview',
      name: 'ProjectEconomicIndicators',
      meta: { title: '经营指标', code: 'S003001', icon: 'region', iconActive: 'regionActive' },
      hidden: false,
      redirect: '/project/overview/index',
      component: Redirect,
      children: [
        {
          path: '/project/overview/index',
          name: 'ProjectOverviewIndex',
          component: () => import(/* webpackChunkName: "project" */ '@/views/project/overview/index/index.vue'),
          meta: { title: '空白页', code: 'S003001001', tabbar: 'ProjectEconomicIndicators' },
          hidden: false,
        }
      ],
    },
    {
      path: '/project/continuation',
      name: 'ProjectContinuation',
      meta: { title: '拓展', code: 'S003003', icon: 'operationPro', iconActive: 'operationActivePro' },
      hidden: false,
      component: Redirect,
      redirect: '/project/continuation/Meeting',
      children: [
        {
          path: '/project/continuation/Meeting',
          name: 'Meeting',
          component: () => import(/* webpackChunkName: "project" */ '@/views/project/continuation/Meeting/Meeting.vue'),
          meta: { title: '上会', code: 'S003003004', tabbar: "ProjectContinuation" },
          hidden: false,
        },
      ],
    },
  ],
};

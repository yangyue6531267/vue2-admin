import Layout from '@/layout/viewer';
import Redirect from '@/layout/redirect';

export default {
  path: '/region',
  name: 'Region',
  component: Layout,
  meta: { title: '区域首页', catid: 0, code: 'S002' },
  redirect: '/region/overview',
  children: [
    {
      path: '/region/overview',
      name: 'RegionOverview',
      meta: { title: '经验指标', code: 'S002001', icon: 'region', iconActive: 'regionActive' },
      hidden: false,
      component: Redirect,
      redirect: '/region/overview/blank',
      children: [
        {
          path: '/region/overview/blank',
          name: 'RegionOverviewBlank',
          component: () => import(/* webpackChunkName: "region" */ '@/views/region/overview/blank/blank.vue'),
          meta: { title: '空白页', code: 'S002001001', icon: 'lvfont-folder', tabbar: 'RegionOverview' },
          hidden: false,
        },
      ],
    },
    {
      path: '/region/calendar',
      name: 'RegionCalendar',
      meta: { title: '规模', code: 'S002002', icon: 'calendar', iconActive: 'calendarActive' },
      component: () => import(/* webpackChunkName: "region" */ '@/views/region/calendar/calendar.vue'),
      hidden: false,
    },
    {
      path: '/region/continuation',
      name: 'RegionContinuation',
      meta: { title: '拓展', code: 'S002003', icon: 'invest', iconActive: 'investActive' },
      hidden: false,
      component: Redirect,
      children: [
        {
          path: '/region/Meeting/Meeting',
          name: 'RegionInvestLandMarket',
          component: () => import(/* webpackChunkName: "region" */ '@/views/region/continuation/Meeting/Meeting.vue'),
          meta: { title: '上会', code: 'S002003003', icon: 'lvfont-folder', tabbar: 'RegionContinuation' },
          hidden: false,
        },
      ],
    }
  ],
};

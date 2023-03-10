/*
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-11-16 21:11:25
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2022-12-14 17:12:43
 * @FilePath: \杭州绿城\greentown-wap\src\utils\components.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue';
import ElementUi from 'element-ui';
import common from './common';
import { Tab, Tabs, Popup, Picker, NavBar, Search, Collapse, CollapseItem, Swipe, SwipeItem, DatetimePicker, Calendar, Sticky } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { Popover } from 'vant';

import 'vant/lib/tab/style';
import 'vant/lib/tabs/style';
import 'vant/lib/popup/style';
import 'vant/lib/swipe/style';
import 'vant/lib/swipe-item/style';
import 'vant/lib/search/style';
import 'vant/lib/picker/style';
import 'vant/lib/nav-bar/style';
import 'vant/lib/collapse/style';
import 'vant/lib/collapse-item/style';
import 'vant/lib/datetime-picker/style';
import 'vant/lib/calendar/style';
import 'vant/lib/checkbox/style';
import 'vant/lib/popover/style';



import {judgeClient} from '@/utils/utils'

import filters from './filter';
const dateObj = new Date();

Vue.use(Tab);
Vue.use(Popover);
Vue.use(Tabs);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(NavBar);
Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(DatetimePicker);
Vue.use(Calendar);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(ElementUi);
Vue.use(Sticky);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);

Vue.prototype.$nowDay = dateObj.getDate(); // 当日
Vue.prototype.$nowYear = dateObj.getFullYear(); // 当年
Vue.prototype.$nowMonth = dateObj.getMonth() + 1; // 当月
Vue.prototype.$filter = filters;

Vue.prototype.$colors = ['#30C5A9', '#D84B42', '#C18D60', '#4BC1DB', '#4BC1DB', '#A860C1', '#C1B760', '#6753E7', '#8ABE7D', '#D3D3D3'];
Vue.prototype.$labelColor = ['#316BD8', '#F1AF77', '#1E4182', '#90B6FC', '#407384', '#821E30', '#FCE490', '#2F6F48', '#6E4D2F', '#ABABAB'];
Vue.prototype.$isNull = value => value === null || value === undefined;
Vue.prototype.$method = common;
Vue.prototype.$toPercent = (data, decimal = 2) => {
  const count = isNaN(data) ? 0 : Number(data);
  const value = count * 100;
  return value.toFixed(decimal);
};
Vue.prototype.$toFixed = (data, decimal = 2) => {
  const count = isNaN(data) ? 0 : Number(data);
  return count.toFixed(decimal);
};
Vue.prototype.isIOS = judgeClient();


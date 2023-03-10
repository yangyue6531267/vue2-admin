/*
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-11-16 21:11:25
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2022-12-15 19:23:01
 * @FilePath: \杭州绿城\greentown-wap\src\components\global\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Chart from './widget-chart/widget-chart.vue';
import frameBlock from './frame-block';
import table from './table';
import WidgetThan from './widget-than/widget-than.vue';
import WidgetCard from './widget-card/widget-card.vue';
import WidgetPane from './widget-pane/widget-pane.vue';
import WidgetTabs from './widget-tabs/widget-tabs.vue';
import WidgetLayer from './widget-layer/widget-layer.vue';
import WidgetSearch from './widget-search/widget-search.vue';
import WidgetTable from './widget-table/widget-table.vue';
import WidgetFrame from './widget-frame/widget-frame.vue';
import WidgetTitle from './widget-title/widget-title.vue';
import WidgetBadge from './widget-badge/widget-badge.vue';
import WidgetGrowth from './widget-growth/widget-growth.vue';
import WidgetPicker from './widget-picker/widget-picker.vue';
import WidgetSelect from './widget-select/widget-select.vue';
import WidgetRanking from './widget-ranking/widget-ranking.vue';
import WidgetCollapse from './widget-collapse/widget-collapse.vue';
import WidgetLegend from './widget-legend/widget-legend.vue';
import WidgetLegend2 from './widget-legend/widget-legend2.vue';
import WidgetColorBox1 from './widget-colorBox1/widget-colorBox1.vue';

const AppComponents = {};
AppComponents.install = Vue => {
  Vue.component('gt-table', table);
  Vue.component(Chart.name, Chart);
  Vue.component('frame-block', frameBlock);
  Vue.component(WidgetThan.name, WidgetThan);
  Vue.component(WidgetCard.name, WidgetCard);
  Vue.component(WidgetPane.name, WidgetPane);
  Vue.component(WidgetTabs.name, WidgetTabs);
  Vue.component(WidgetLayer.name, WidgetLayer);
  Vue.component(WidgetSearch.name, WidgetSearch); // 注册公共标签
  Vue.component(WidgetBadge.name, WidgetBadge);
  Vue.component(WidgetFrame.name, WidgetFrame);
  Vue.component(WidgetTitle.name, WidgetTitle);
  Vue.component(WidgetTable.name, WidgetTable);
  Vue.component(WidgetGrowth.name, WidgetGrowth);
  Vue.component(WidgetPicker.name, WidgetPicker);
  Vue.component(WidgetSelect.name, WidgetSelect);
  Vue.component(WidgetRanking.name, WidgetRanking);
  Vue.component(WidgetCollapse.name, WidgetCollapse);
  Vue.component(WidgetLegend.name, WidgetLegend);
  Vue.component(WidgetLegend2.name, WidgetLegend2);
  Vue.component(WidgetColorBox1.name, WidgetColorBox1);
};

export default AppComponents;

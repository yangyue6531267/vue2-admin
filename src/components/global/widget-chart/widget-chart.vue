<!--
 * @Author: brq 1120619689@qq.com
 * @Date: 2022-12-02 21:45:31
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2022-12-30 11:08:37
 * @FilePath: \greentown-wap\src\components\global\widget-chart\widget-chart.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div ref="chartPanel" class="chart-panel"></div>
</template>
<script>
import * as echarts from 'echarts';
import { throttle } from '@/utils/utils';
import { CellGroup } from 'vant';

export default {
  name: 'Chart',
  props: {
    items: { type: Object, default: () => ({}) },
    autoHeight: { type: Boolean, default: false },
    itemHeight: { type: Number | String, default: 50 },
    categoryAxis: { type: String, default: 'xAxis' },
    setIndex:{type: Number | String, default: 0 },
    setType:{type:Boolean, default: true}
  },
  data() {
    return {
      charts: null,
      getIndex:0,
      conpontentIndex:0,
    };
  },
  created() {
  },
  watch: {
    items(now, old) {
      if (now !== old && this.charts) {
        this.updateEchart(now)
        
      };
    },
  },
  mounted() {
    this.getIndex = this.setIndex;
    const handler = throttle(function () {
      if(this.charts) {
        if (this.autoHeight) {
          this.updateHeightAutoChart()
          return
        } else {
          this.charts.resize();
        }
      }
      // this.charts && this.updateEchart();
    }, 50);
    const handleResize = handler.bind(this);

    this.$nextTick(() => {
      this.init()
    });
    setTimeout(() => {
      const element = this.$refs.chartPanel;
      const myChart = echarts.init(element);
      element.style.width = myChart._dom.clientWidth
      this.charts.resize();
      if (this.setType) {
        this.setOneTooltip()
      }
    }, 1000);
    window.addEventListener('resize', handleResize, false); // 窗口大小改变事假监听
    this.$once('hook:beforeDestroy', () => window.removeEventListener('resize', handleResize)); // 移除窗口大小事假监听
  },
  methods: {
    // 初始化图表
    init(flag) {
      const { items } = this;
      const element = this.$refs.chartPanel;
      const myChart = echarts.init(element);
      // const myChart = echarts.getInstanceByDom(element);
      let options = this.createOption(items); // 创建初始的options

      this.charts = echarts.init(element, null, { renderer: 'canvas' }); // 采用svg渲染模式，文字更清晰
      if (this.charts || myChart) return this.updateEchart(options);
      
      flag && this.charts.resize();
    },

    tooltipClick(){
      // this.charts.getZr().off(); /
    this.charts.on('datazoom',(params)=>{
      let xAxis=this.charts.getModel().option[this.categoryAxis][0];//获取axis
      const startValue = this.charts.getModel().option.dataZoom[0].startValue;
      const endValue = this.charts.getModel().option.dataZoom[0].endValue;
      let start = this.categoryAxis=="xAxis"?this.charts.getModel().option.xAxis[0].data[startValue]:this.charts.getModel().option.yAxis[0].data[startValue];//起始X轴
      
      let startNum = xAxis.data.indexOf(start)
      if (this.conpontentIndex>startValue) {
        this.getIndex = Number(this.getIndex)>endValue?endValue:this.getIndex;
      }else if (this.conpontentIndex<startValue){
        this.getIndex = Number(this.getIndex)<startValue?startValue:this.getIndex;
      }
      
      this.conpontentIndex= startNum;
      this.charts.dispatchAction({ type: 'highlight', dataIndex: this.getIndex });
      this.charts.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex: this.getIndex })
    })
    this.charts.getZr().off('click')
      this.charts.getZr().on('click', params => {
        let pointInPixel = [params.offsetX, params.offsetY]
        if (this.charts.containPixel('grid', pointInPixel)) {
          // const xIndex = charts.convertFromPixel({ seriesIndex: 0 }, pointInPixel)[1]
          // let handleIndex = Number(xIndex)
          var pointInGrid = this.charts.convertFromPixel({ seriesIndex: 0 }, pointInPixel);
          var xIndex = pointInGrid[0];
          var yIndex = pointInGrid[1];
          this.getIndex= this.categoryAxis=="xAxis"?xIndex:yIndex;
        }
        console.log('Echarts 点击这一系列 '+this.getIndex)
        // if (actionObj) {
        //   console.log('actionObj', actionObj)
        //   const myKey = Object.keys(actionObj).sort().filter(_ => _.indexOf('ec_inner') !== -1)[0]
        //   console.log('myKey', myKey)
        //   const res = actionObj[myKey]
        //   console.log(`当前点击了第${res.dataIndex}组数据中的第${res.seriesIndex}个柱子`)
        //   var pointInPixel = [params.offsetX, params.offsetY];
        //   if (this.charts.containPixel('grid', pointInPixel)) {
        //     /*此处添加具体执行代码*/
        //     var pointInGrid = this.charts.convertFromPixel({ seriesIndex: 0 }, pointInPixel);
        //     //X轴序号
        //     var xIndex = pointInGrid[0];
        //     var yIndex = pointInGrid[1];

        //     // 点击到图表其他区域不操作
        //     console.log(typeof xIndex);
        //     if (typeof xIndex !== 'number') {
        //       return;
        //     }
            
        //     this.getIndex= this.categoryAxis=="xAxis"?xIndex:yIndex;
        //     console.log(this.getIndex);
        //     console.log('点击了横纵坐标', pointInPixel)
        //     console.log('【点击了第几组数据，纵坐标】', pointInGrid)
        //     //获取当前图表的option
        //     var op = this.charts.getOption();
        //     //获得图表中
        //     // var xValue = op.xAxis[0].data[xIndex];
        //     // console.log('x轴所对应的名字', xValue)
        //   }
        //   console.log(this.getIndex);
        
        // }
        this.charts.dispatchAction({ type: 'highlight',seriesIndex: 0, dataIndex:this.getIndex }); // dataIndex属性伟data传入的索引值
        this.charts.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex:this.getIndex });
        
      });
    },

    myFunc(event){
      const e = event || window.event
      if (this.$refs.chartPanel && !this.$refs.chartPanel.contains(e.target)) {
          console.log('not in chartPanel设置回归原位')
          setTimeout(()=>{
            this.charts.dispatchAction({ type: 'highlight',seriesIndex: 0, dataIndex:this.getIndex }); // dataIndex属性伟data传入的索引值
            this.charts.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex:this.getIndex });
          },0)
      }
    },
    setOneTooltip(){
        // document.addEventListener('click', this.myFunc)
        document.addEventListener('touchend', this.myFunc)

        this.charts.dispatchAction({ type: 'highlight',seriesIndex: 0, dataIndex:this.getIndex }); // dataIndex属性伟data传入的索引值
        this.charts.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex:this.getIndex });
        // this.charts.dispatchAction({ type: 'highlight', seriesIndex: this.categoryAxis=="xAxis"?0: this.getIndex, dataIndex: this.categoryAxis=="xAxis"? this.getIndex:0 }); // dataIndex属性伟data传入的索引值
        // this.charts.dispatchAction({ type: 'showTip', seriesIndex: this.categoryAxis=="xAxis"?0: this.getIndex, dataIndex: this.categoryAxis=="xAxis"? this.getIndex:0 });
        this.tooltipClick()
        // this.charts.on('click','touchend',(e)=>{
        //   if (e.dataIndex != this.getIndex) {
        //     console.log('消除点击')
        //     this.charts.dispatchAction({ 
        //     type: 'downplay',
        //     seriesIndex: 0,
        //     dataIndex: this.getIndex });
        //   }
        // })
    },  

    // 初始options
    createOption(options) {
      if (options.series) return options;
      return { title: { text: '' }, xAxis: { show: false }, yAxis: { show: false }, series: [], tooltip: { show: false,
      showContent:true,
      alwaysShowContent:true } };
    },

    // 更新图表配置
    updateEchart(options) {
      this.charts.setOption(options);
      if (this.autoHeight) {
        this.updateHeightAutoChart()
        return
      }
      this.charts.resize()
    },
    updateHeightAutoChart() {
      const categoryAxis = this.items[this.categoryAxis]
      if (categoryAxis && categoryAxis.data) {
        const autoHeight = categoryAxis.data.length * this.itemHeight + 100
        this.charts.resize({
          height: autoHeight
        });
      } else {
        this.charts.resize()
      }
    }
  },
  // 移除事件句柄
  beforeDestroy () {
      document.removeEventListener('touchend', this.myFunc)
  },
};
</script>
<style scoped lang="scss">
.chart-panel {
  min-width: 100%;
  height: 100%;
}
</style>

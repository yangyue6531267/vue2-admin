<template>
  <div class="time-line-cmp" v-loading="loading">
    <div class="line-tabs">
      <widget-tabs class="time-line-tabs" v-if="stageList.length" :data="stageList" :value="tabValue" @change="handleSwitchStage" />
    </div>
    <div class="timeline-legends">
      <ul class="timeline-label">
        <li v-for="(val, key) in nodeList" :key="key">
          <i :class="['iconfont', val.icon]" :style="dotStyle(val)"></i>
          <span class="txt">{{ key }}节点</span>
        </li>
      </ul>
      <ul class="timeline-label">
        <li v-for="(val, key) in stateList" :key="key">
          <i :class="['dot', val.icon]" :style="dotStyle(val)"></i>
          <span class="txt">{{ key }}</span>
        </li>
      </ul>
    </div>
    <div class="timeline-switch" @click.stop slot="more">
      <el-switch
        class="switch"
        v-model="isShowMeeting"
        size="mini"
        :active-value="1"
        :inactive-value="0"
        active-color="#264689"
        @change="handleSwitch"
      />
      <span>是否展示二级节点</span>
    </div>

    <!-- 内容区域 -->
    <div class="timeline-body">
      <div class="scrollbar" ref="timelineScroll">
        <div class="year-box" :style="timeLineWidth()">
          <div class="year-list">
            <div class="year" v-for="(val, key) in timeBar" :key="key" :style="timeLineWidth(val)">
              <div class="year-tip">
                <span>{{ key }}</span>
              </div>
            </div>
          </div>
          <div class="timeline-box">
            <div class="line-bg" v-show="timeline.length">
              <div class="color-line" :style="timeLineWidth(timeFinishedNodeNumber)">
                <div class="line-text">
                  <svg width="53" height="25" viewBox="0 0 53 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2 25C0.895431 25 -3.48708e-08 24.1046 -7.7886e-08 23L-8.95689e-07 2C-9.38705e-07 0.89543 0.89543 -3.91405e-08 2 -8.74228e-08L42.9755 -1.87852e-06C43.6188 -1.90664e-06 44.2228 0.309378 44.5986 0.831388L52.1586 11.3314C52.6612 12.0294 52.6612 12.9706 52.1586 13.6686L44.5986 24.1686C44.2228 24.6906 43.6188 25 42.9755 25L2 25Z"
                      fill="#30C5AA"
                    />
                  </svg>
                  <span ref="toNowDate">今日</span>
                </div>
              </div>
              <div class="time-node" v-for="(item, index) in timeline" :key="index" :style="timeLineLeft(index + 1)">
                <i class="icon" :class="['iconfont', item.icon]" :style="dotStyle(item)"></i>
                <div class="planTime">{{ item.planTime }}</div>
                <div class="finishTime" :style="{ color: item.color }">{{ item.finishTime }}</div>
                <div class="nodeName">
                  <div class="text">{{ item.nodeName }}</div>
                  <div class="nodeType" :style="{ color: item.borderColor, border: '1px solid' + item.borderColor }">{{ item.nodeType }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="time-text">
          <div>计划时间</div>
          <div>完成时间</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WidgetTabnav from '@components/widget/widget-tabnav';
import projectApi from '@/api/project.js';
import { mapGetters } from 'vuex';
export default {
  components: { WidgetTabnav },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      isShowMeeting: 1,
      stageList: [],
      tabValue: 1,
      nodeList: {
        里程碑: {
          color: '#C9C9C9',
          icon: 'lvfont-nodes',
        },
        一级: {
          color: '#C9C9C9',
          icon: 'lvfont-level1',
        },
        二级: {
          color: '#C9C9C9',
          icon: 'lvfont-level2',
        },
      },
      timeline: [],
      timeBar: {},
      timeFinishedNodeNumber: 0,
      stateList: {
        '提前/按时完成': {
          color: '#30C5A9',
          isOverTime: false,
        },
        逾期完成: {
          color: '#316BD8',
          isOverTime: true,
        },
        // 有风险节点: {
        //   color: '#E59F62',
        // isOverTime: false,
        // },
        未到期: {
          color: '#C9C9C9',
          isOverTime: false,
        },
        到期未完成: {
          color: '#D84B42',
          isOverTime: true,
        },
      },
    };
  },
  computed: {
    dotStyle() {
      return item => {
        if (item.icon) return { color: item.color };
        return { background: item.color };
      };
    },
    timeLineWidth() {
      return n => {
        return { height: (180 * (n || this.timeline.length)) / 75 + 'rem' };
      };
    },
    timeLineLeft() {
      return n => {
        return { top: (180 * (n || this.timeline.length) - 100) / 75 + 'rem' };
      };
    },
    ...mapGetters(['locate', 'datetime']),
    getNowDate() {
      return new Date(this.$store.state.datetime);
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化项目
    init() {
      this.loadProjectProgress();
    },

    // 项目进度信息
    loadProjectProgress() {
      this.loading = true;
      projectApi
        .projectProgress(this.getParams())
        .then(res => {
          this.solveData(res);
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },

    handleSwitch(data) {
      this.init();
    },
    handleSwitchStage(data) {
      this.tabValue = data;
      this.init();
    },

    solveData(data) {
      // 整体分期
      let stageList = [{ value: 1, label: '项目整体' }];
      this.timeFinishedNodeNumber = 0;
      this.timeBar = {};
      if (data.stageList.length > 1) {
        data.stageList.map((item, i) => {
          item.value = i + 2;
          item.label = item.stageName;
          stageList.push(item);
        });
      }
      this.stageList = stageList;
      // 节点
      let timeline = [];
      data.progressItemVOList.map(item => {
        if (item.planTime) {
          let year = item.planTime.split('-')[0];
          this.timeBar[year] ? this.timeBar[year]++ : (this.timeBar[year] = 1);
          timeline.push({
            color: this.stateList[item.progress].color,
            planTime: this.getTime(item.planTime),
            finishTime: this.getTime(item.finishTime),
            nodeName: item.nodeName,
            nodeType: item.nodeType,
            borderColor: this.stateList[item.progress].color,
            icon: this.nodeList[item.nodeLevel].icon,
          });

          this.isOverTime(item.planTime) ? this.timeFinishedNodeNumber++ : '';
        }
      });
      this.timeline = timeline;

      this.scrollNow();
    },

    // 处理时间
    getTime(time) {
      if (time) {
        return time;
        // return time.replace(/^\d*-/, '');
      } else {
        return '/';
      }
    },

    // 对比当前时间
    isOverTime(time) {
      return new Date(time).getTime() < this.getNowDate.getTime();
    },

    // 获取stage参数
    getParams() {
      let params = {
        projectId: this.locate.projectId,
        nodeLevel: this.isShowMeeting,
      };
      if (this.tabValue !== 1) {
        params.stage = this.stageList[this.tabValue - 1].stageCode;
      }
      return params;
    },

    // 滚动到当前
    scrollNow() {
      this.$nextTick(() => {
        if (this.timeFinishedNodeNumber > 6) {
          let box = this.$refs.timelineScroll;
          box.scrollTop = (this.timeFinishedNodeNumber - 3) * 100;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-collapse-item__wrapper {
  overflow: visible;
}
.time-line-cmp {
  position: relative;
  padding-top: rem(30);
  .line-tabs{
    width: 100%;
    overflow: scroll;
    .time-line-tabs {
        width: auto;
        background-color: #f3f3f3;
        justify-content: flex-start;
        :deep(.widget-tabs__list){
          width: auto;
        }
    }
  }
  
  .timeline-legends {
    width: rem(690);
    margin: 0 auto rem(20);
    background: rgba($color: #425bb5, $alpha: 0.05);
    border-radius: rem(12);
    padding: rem(20);
    .timeline-label {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 33%;
        height: rem(40);
        line-height: rem(40);
        display: flex;
        align-items: center;
        .dot {
          margin-right: rem(10);
          width: rem(20);
          height: rem(20);
          border-radius: 50%;
        }
        .iconfont {
          margin-right: rem(10);
          font-size: rem(20);
        }
        .txt {
          font-size: rem(24);
          font-weight: 400;
        }
      }
    }
  }
  .timeline-switch {
    position: absolute;
    right: rem(100);
    top: rem(-70);
    height: rem(60);
    line-height: rem(40);
    padding:0 rem(20);
    display: flex;
    align-items: center;
    z-index:10;
    .switch {
      width: rem(60);
      height: rem(30);
      margin-right: rem(6);
    }
    span {
      font-size: rem(28);
      color: #333;
      font-weight: 400;
    }
  }
  .timeline-body {
    padding: 0 rem(30);
    position: relative;
    .scrollbar {
      width: 100%;
      max-height: rem(1400);
      overflow-y: auto;
    }
  }
  .year-box {
    position: relative;
    min-height: rem(470);
    margin-top: rem(40);
    overflow: auto;
    .year-list {
      width: rem(70);
      .year {
        width: 100%;
        .year-tip {
          padding-top: rem(10);
          top: rem(40);
          height: rem(50);
          position: sticky;
          &::before {
            content: '';
            width: rem(20);
            height: rem(2);
            background: #333;
            position: absolute;
            left: rem(0);
            top: rem(10);
          }
          &::after {
            content: '';
            width: 0;
            height: 0;
            border-top: rem(10) solid rgba($color: #333333, $alpha: 0.2);
            border-right: rem(10) solid transparent;
            border-left: rem(10) solid transparent;
            position: absolute;
            left: rem(0);
            bottom: rem(-6);
          }
          span {
            font-size: rem(20);
            color: rgba($color: #333, $alpha: 0.4);
            font-weight: 400;
          }
        }
      }
    }
  }
  .timeline-box {
    width: rem(30);
    box-sizing: border-box;
    position: absolute;
    left: rem(60);
    top: 0;
    .line-bg {
      width: 100%;
      height: 100%;
      &::after {
        content: '';
        width: 1px;
        height: 100%;
        background: rgba($color: #000000, $alpha: 0.05);
        position: absolute;
        left: rem(15);
        top: 0;
      }
    }
    .color-line {
      width: 100%;
      background: linear-gradient(89.97deg, rgba(48, 197, 169, 0.05) 0.02%, rgba(48, 197, 169, 0.3) 99.98%);
      padding-bottom: rem(10);
      box-sizing: content-box;
      position: relative;
      border-radius: 0 0 rem(15) rem(15);
      .color-svg {
        position: absolute;
        right: -5px;
        top: 0;
      }
      &::before {
        content: '';
        width: 1px;
        height: 100%;
        background: #30c5a9;
        position: absolute;
        left: rem(15);
        top: 0;
      }
    }
    .line-text {
      display: inline-block;
      padding: 0 rem(15) 0 rem(6);
      line-height: rem(30);
      text-align: center;
      position: absolute;
      right: rem(20);
      bottom: rem(-16);
      svg {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
      span {
        font-weight: 400;
        font-size: rem(20);
        color: #fff;
        white-space: nowrap;
        position: relative;
        z-index: 1;
      }
    }
    .time-node {
      width: rem(40);
      height: rem(40);
      position: absolute;
      left: rem(-2);
      display: flex;
      background: #fff;
      border-radius: 50%;
      align-items: center;
      justify-content: center;

      // &::before {
      //   content: '';
      //   width: 26px;
      //   height: 26px;
      //   border-radius: 50%;
      //   position: absolute;
      //   left: 2px;
      //   top: 2px;
      //   background: #fff;
      // }
      .icon {
        position: relative;
        font-size: rem(46);
        line-height: 30px;
        z-index: 1;
      }
      .planTime {
        width: rem(160);
        height: rem(30);
        text-align: center;
        font-weight: 400;
        font-size: rem(24);
        line-height: rem(30);
        color: #333333;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: rem(340);
      }
      .finishTime {
        width: rem(160);
        height: rem(30);
        text-align: center;
        font-weight: 400;
        font-size: rem(24);
        line-height: rem(30);
        color: #333333;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: rem(490);
      }
      .nodeName {
        width: rem(240);
        line-height: rem(36);
        font-weight: 400;
        font-size: rem(24);
        color: #333333;
        position: absolute;
        left: rem(70);
        .text {
          margin-bottom: rem(10);
        }
      }
      .nodeType {
        display: inline-block;
        height: rem(40);
        font-weight: 400;
        font-size: rem(20);
        color: #1e4182;
        line-height: rem(38);
        padding: 0px rem(15);
        border-radius: rem(20);
        white-space: nowrap;
        border: 1px solid;
      }
    }
  }
  .time-text {
    width: 100%;
    height: rem(40);
    line-height: rem(40);
    position: absolute;
    left: 0px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 10;
    box-shadow: 0 0 10px rgb(0 0 0 / 12%);
    background: #fff;
    box-sizing: border-box;
    &::after {
      content: '';
      width: 100%;
      height: rem(10);
      position: absolute;
      left: 0;
      top: rem(-10);
      background: #fff;
    }
    div {
      font-weight: 400;
      font-size: rem(20);
      color: #333;
      margin-right: rem(70);
      &:nth-of-type(1) {
        margin-right: rem(68);
      }
    }
  }
}
</style>

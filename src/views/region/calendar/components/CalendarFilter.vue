<template>
  <div class="operate-calendar">
    <div class="state">
      <template v-for="(item, index) in columns">
        <p :key="index" :style="{ color: item.color }">
          <span>{{ item.label }}</span>
        </p>
      </template>
    </div>
    <el-calendar class="dates" v-model="date" :first-day-of-week="7" @input="handleChange">
      <template slot="dateCell" slot-scope="{ data }">
        <div class="value" @click="handleCurrent(data)">
          <div class="date">{{ setDate(data.day) }}</div>
          <div class="dots">
            <i class="spot" :style="{ color: '#d84b42', zIndex: 3 }" v-if="importantIssueCount[data.day]"></i>
            <i class="spot" :style="{ color: '#30c5a9', zIndex: 2 }" v-if="nodeCount[data.day]"></i>
            <i class="spot" :style="{ color: '#316bd8', zIndex: 1 }" v-if="meetingCount[data.day]"></i>
          </div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'CalendarFilter',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      date: '',
      nodeCount: {},
      meetingCount: {},
      importantIssueCount: {},
      clickType: ''
    };
  },
  watch: {
    data: {
      handler(now, old) {
        if (now !== old) this.initialData(now);
      },
      immediate: true,
    },
  },
  computed: {
    setDate() {
      return day => Number(day.slice(-2)); // 初始化显示日期
    },
  },
  methods: {
    // 初始化时间
    initialData(data) {
      if (!data) return;
      const [nodes, meetings, issues] = [{}, {}, {}];
      data.forEach(({ date, nodeCount, meetingCount, importantIssueCount }) => {
        nodes[date] = nodeCount > 0;
        meetings[date] = meetingCount > 0;
        issues[date] = importantIssueCount > 0;
      });
      this.nodeCount = nodes;
      this.meetingCount = meetings;
      this.importantIssueCount = issues;
    },

    //日历时间更改
    handleChange(data) {
      this.$emit('change', data, this.clickType||'month');
      this.clickType = ''
    },

    //日历时间更改
    handleCurrent(data) {
      this.clickType = 'day'
    },
  },
};
</script>

<style lang="scss" scoped>
.operate-calendar {
  padding: rem(30);
  position: relative;

  .state {
    position: absolute;
    top: rem(30);
    right: rem(30);
    height: rem(54);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: rem(20);
    line-height: rem(54);

    p {
      position: relative;
      padding-left: rem(30);
      margin-left: rem(24);

      &::after,
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: rem(16);
        height: rem(16);
        border-radius: 50%;
        transform: translate(0, -50%);
        background-color: currentColor;
        border: rem(1.5) solid #fff;
      }

      &::before {
        box-shadow: 1px 0px 3px currentColor;
        opacity: 0.4;
      }
    }

    span {
      color: #000000;
      opacity: 0.6;
    }
  }

  .value {
    font-size: rem(28);
    line-height: rem(39);
    text-align: center;
    color: #000000;
  }

  .dots {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: rem(3);
    height: rem(14);
  }

  .spot {
    display: block;
    position: relative;
    width: rem(14);
    height: rem(14);

    &::after,
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: rem(16);
      height: rem(16);
      border-radius: 50%;
      transform: translate(0, -50%);
      background-color: currentColor;
      border: rem(1.5) solid #fff;
    }

    &::before {
      box-shadow: 1px 0px 3px currentColor;
      opacity: 0.4;
    }

    & + .spot {
      margin-left: rem(-4);
    }
  }

  :deep(.el-calendar__body) {
    font-size: rem(28);
    padding: 0;

    .is-today {
      .date {
        color: #fff;
        width: rem(64);
        margin: 0 auto;
        border-radius: rem(36);
        background-color: $primary-color;
      }
    }

    .is-selected {
      .value {
        width: rem(64);
        height: 100%;
        margin: 0 auto;
        border-radius: rem(4);
        background-color: rgba($color: $primary-color, $alpha: 0.1);
      }
    }

    .el-calendar-day {
      height: rem(72);
      padding: rem(6);
      background: transparent;
    }

    .el-calendar-table {
      border: none;
    }

    .el-calendar-table td {
      border-left: none;
      border-right: 0;
      background: transparent;
    }

    .el-calendar-table th {
      padding-top: rem(18);
      padding-bottom: rem(18);
    }

    .next .value,
    .prev .value {
      opacity: 0.4;
    }
  }

  :deep(.el-calendar__header) {
    height: rem(54);
    justify-content: flex-start;
    border-bottom: none;
    padding: 0;

    .el-calendar__title {
      font-weight: 600;
      font-size: rem(30);
      line-height: rem(54);
      color: $primary-color;
      letter-spacing: rem(-2);
    }

    .el-button-group {
      height: rem(54);
      vertical-align: top;
    }

    .el-button {
      border: none;
      font-size: 0;
      height: 100%;
      background-color: transparent;

      &::after {
        content: '';
        display: block;
        border-style: solid;
        border-color: transparent $primary-color;
      }

      &:nth-child(2) {
        display: none;
      }

      &:nth-child(1) {
        padding-left: rem(20);
        padding-right: rem(5);

        &::after {
          border-width: rem(8) rem(10) rem(8) 0;
        }
      }

      &:nth-child(3) {
        padding-left: rem(5);
        padding-right: rem(20);

        &::after {
          border-width: rem(8) 0 rem(8) rem(10);
        }
      }
    }
  }
}
</style>

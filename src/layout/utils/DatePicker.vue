<template>
  <widget-layer class="calender-layer" title="时间筛选" :visible="visible" :isRight ="true" @close="handleClose">
    <div class="calender-pick">
      <widget-picker class="select" :text="selectedYear" :options="optionYears" @change="handleYearChange" />
      <widget-picker class="select" :text="selectedMonth" :options="optionMonth" @change="handleMonthChange" />
    </div>
    <van-calendar
      class="calender-time"
      ref="calendarCCCC"
      type="single"
      :min-date="new Date(TimeSelectminDate)"
      :max-date="new Date(getMaxDate)"
      :default-date="new Date(datetime)"
      color="#425BB5"
      :show-title="false"
      :show-subtitle="false"
      :poppable="false"
      :show-confirm="false"
      :formatter="calendarFormatter"
      @select="handleSelect"
    />
  </widget-layer>
</template>

<script>
import dateFormatter from '@/utils/timeFormatter';
import { mapState, mapGetters } from 'vuex';
/**
 * 和组件库的组件
 */
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: { date: '' },
      visible: false, // 弹窗的显示
      months: {},
      optionYears: [], // 日期选择
      optionMonth: [], // 月份选择
      
      selectedYear: 0, // 选择的年
      selectedMonth: '', // 选择的月
    };
  },
  watch: {
    show: {
      handler(now, old) {
        if (now !== old) this.visible = now;
      },
      immediate: true,
    },
    datetime: {
      handler(now, old) {
        if (now !== old) {
          this.form.date = now;
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState(['datetime']),
    getMaxDate() {
      return dateFormatter('YYYY-MM-DD');
    },
  },
  mounted() {
    const date = new Date(this.datetime);
    this.selectedYear = date.getFullYear();
    this.selectedMonth = date.getMonth() + 1+'月';
    this.getOptions();
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.visible = false;
      this.$emit('update:show', false);
    },
    calendarFormatter(data) {
      if (dateFormatter('YYYY-MM-DD', data.date.getTime()) === this.getMaxDate) {
        data.bottomInfo = '今天';
      }
      return data;
    },

    // 选择当前时间
    handleSelect(date) {
      this.selectedYear = date.getFullYear();
      this.selectedMonth = date.getMonth() + 1+'月';
      this.$emit('change', dateFormatter('YYYY-MM-DD', date.getTime()));
      this.$emit('update:show', false);
    },

    // 年份改变
    handleYearChange(data) {
      if (data !== this.selectedYear) {
        this.selectedYear = data;
        this.optionMonth = this.months[this.selectedYear]?.map(item => {
          return { text: item, value: item }
        });
        this.selectedMonth = this.optionMonth[0].value;
        this.goDate();
      }
    },

    // 月份改变
    handleMonthChange(data) {
      if (data !== this.selectedMonth) {
        this.selectedMonth = data;
        this.goDate();
      }
    },

    goDate() {
      let time = this.selectedYear + '/' + this.selectedMonth+ '/01';
      // time.replace('年', '/');
      time = time.replace('月', '/');
      // 转换为date对象
      let dateObj = new Date(Date.parse(time.replace(/-/g, '/')));
      this.$nextTick(() => {
        this.$refs.calendarCCCC.reset(dateObj);
      })
    },

    // 获取月份列表
    getOptions() {
      let years = [];
      let months = {};
      let start = new Date(this.TimeSelectminDate);
      let startYear = start.getFullYear();
      let startMonth = start.getMonth() + 1;
      let ending = new Date(this.getMaxDate);
      let endingYear = ending.getFullYear();
      let endingMonth = ending.getMonth() + 1;
      
      do {
        if (years.indexOf(startYear)==-1) {
          years.push(startYear);
        }
        if (months[startYear]) {
          months[startYear].push(startMonth + '月');
        } else {
          months[startYear] = [startMonth + '月'];
        }
        if (startMonth !== 12) {
          startMonth++;
        } else {
          startYear++;
          startMonth = 1;
        }
      } while (startYear !== endingYear || startMonth !== (endingMonth+1));

      this.optionYears = years.map(item => {
        return { text: item, value: item };
      });
      this.months = months;
      this.selectedYear = years[years.length - 1];
      this.optionMonth = months[this.selectedYear]?.map(item => {
        return { text: item, value: item }
      });
      if (this.optionMonth?.length==0||!(this.optionMonth instanceof Array)) {
        return
      }
      this.selectedMonth = this.optionMonth[this.optionMonth.length - 1].value;
    },
  },
};
</script>

<style lang="scss" scoped>
.calender-layer {
  .calender-pick {
    padding: rem(10) rem(30);
    display: flex;
    .select {
      margin-right: rem(24);
    }
  }
  .calender-time {
    height: rem(800);
    ::v-deep .van-calendar__body {
      .van-calendar__month-title {
        text-align: left;
        padding-left: rem(30);
        color: rgba($color: #000000, $alpha: 0.4);
        font-size: rem(32);
        font-weight: 500;
        // border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
      }
      .van-calendar__selected-day {
        border-radius: 50%;
        width: rem(45);
        height: rem(45);
        padding: 0;
        .van-calendar__bottom-info {
          font-size: rem(20);
          color: #425bb5;
          font-weight: 400;
        }
      }
    }
  }
}
</style>

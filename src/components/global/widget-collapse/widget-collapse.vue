<template>
  <van-collapse v-model="value" class="widget-collapse">
    <template v-for="(item, index) in data">
      <van-collapse-item :key="index" :name="item.name" class="widget-collapse-item">
        <template #title>
          <h4 class="widget-collapse-title">
            <span class="title lvfont-flower">{{ item.title }}</span>
            <span class="extra" v-if="item.extra">{{ item.extra }}</span>
            <span class="point" v-if="item.point" :class="{ show: opened[index] }" @click.stop.prevent="handleVisible(index)">
              <i class="lvfont-fill-tips"></i>
              <em>{{ item.point }}</em>
            </span>
          </h4>
        </template>
        <template #value>
          <p class="widget-collapse-value" v-if="item.more">
            <span class="badge" @click="$emit('more')">{{ item.more }}</span>
          </p>
        </template>
        <slot :name="item.name" />
      </van-collapse-item>
    </template>
  </van-collapse>
</template>
<script>
export default {
  name: 'WidgetCollapse',
  props: {
    data: {
      type: Array,
      default: () => [
        {
          title: '销售指标',
          extra: '（单位：亿元）',
          point: '这是一个提示', // 提示
          name: 'slot1',
          more: '详情',
        },
      ],
    },
  },
  data() {
    return {
      value: [],
      opened: {},
    };
  },
  watch: {
    data: {
      handler(now, old) {
        if (now && now !== old) {
          this.value = now.map(item => item.name);
        }
      },
      immediate: true,
    },
  },
  computed: {},
  mounted() {},
  methods: {
    // 显示提示
    handleVisible(index) {
      const { opened } = this;
      this.$set(this.opened, index, !opened[index]);
    },
  },
};
</script>

<style lang="scss" scoped>
.widget-collapse {
  &-title {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    white-space: nowrap;

    .title {
      display: block;
      color: $text-color;
      font-size: rem(32);
      line-height: rem(38);

      &::before {
        color: $success-color;
        font-size: rem(26);
        margin-right: rem(10);
        padding-top: rem(2);
        display: inline-block;
        vertical-align: rem(1);
      }
    }

    .extra {
      display: block;
      color: rgba($color: $text-color, $alpha: 0.4);
      font-size: rem(24);
      line-height: rem(28);
      margin-left: rem(10);
    }

    .point {
      margin-left: rem(18);
      position: relative;
      display: block;

      i {
        color: $text-color-gray;
        font-size: rem(36);
        display: inline-block;
        vertical-align: top;
        height: rem(38);
      }

      em {
        position: absolute;
        top: 050%;
        left: calc(100% + rem(12));
        color: #fff;
        font-size: rem(20);
        line-height: rem(36);
        padding: 0 rem(18);
        background-color: rgba($color: #000000, $alpha: 0.8);
        transition: 0.2s ease-in-out;
        border-radius: rem(6);
        margin-top: rem(-20);
        transform: translate(rem(16), 0);
        @include hide;

        &::before {
          content: '';
          position: absolute;
          top: 50%;
          right: 100%;
          border-style: solid;
          border-width: rem(8) rem(10) rem(8) 0;
          border-color: transparent rgba($color: #000000, $alpha: 0.8);
          margin-top: rem(-8);
        }
      }

      &.show em {
        transform: translate(0, 0);
        @include show(1);
      }
    }
  }

  :deep(.van-collapse-item__title) {
    height: rem(78);
    background: linear-gradient(90deg, #e5f4f0 0%, rgba(255, 255,255) 100%);
    padding-right: rem(30);
    padding-left: rem(30);
  }

  :deep(.van-cell__right-icon) {
    height: rem(38);
    line-height: rem(38);

    &::before {
      content: '';
      display: inline-block;
      vertical-align: rem(4);
      border-style: solid;
      border-width: rem(14) rem(10) 0;
      border-color: $success-color transparent;
      transform: rotate(0deg);
    }
  }

  :deep(.van-collapse-item__title--expanded) .van-cell__right-icon::before {
    transform: rotate(180deg);
  }

  :deep(.van-collapse-item__content) {
    padding: 0;
  }

  :deep(.van-collapse-item__wrapper) {
    margin-bottom: rem(20);
    overflow: visible;
  }
  :deep(.widget-collapse-item) {
    margin-bottom:rem(10);
    .van-collapse-item__title{
      position: sticky;
      top:0;
      z-index:10;
    }
  }
}
</style>

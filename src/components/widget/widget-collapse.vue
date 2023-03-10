<template>
  <van-collapse class="hazard-list" v-model="activeNames">
    <template v-for="(item, index) in data">
      <van-collapse-item :key="index" :title="item.name" class="hazard-item">
        <template #value>
          <span class="hazard-type">{{ item.type }} <i class="lvfont-warning"></i></span>
        </template>
        <div class="hazard-show" v-html="item.detail"></div>
      </van-collapse-item>
    </template>
  </van-collapse>
</template>

<script>
export default {
  name: 'WidgetCollapse',
  props: {
    data: { type: Array, default: () => [] },
  },
  data() {
    return {
      activeNames: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.hazard {
  &-list {
    &::after {
      display: none;
    }
  }

  &-item {
    &::after {
      display: none;
    }

    :deep(.van-cell) {
      height: rem(84);
      line-height: rem(40);
      padding: rem(22) rem(2);

      &::after {
        left: rem(2);
        right: rem(2);
        display: block;
      }
    }

    :deep(.van-cell__title) {
      color: #5c5c5c;
      font-size: rem(28);
    }

    :deep(.van-collapse-item__content) {
      padding: rem(10) rem(2);
    }

    :deep(.van-icon) {
      font-size: rem(24);
      font-weight: 600;
      &::before {
        transform: rotate(0deg);
      }
    }

    :deep(.van-collapse-item__title--expanded) .van-icon {
      &::before {
        transform: rotate(90deg);
      }
    }
  }

  &-type {
    display: block;
    font-size: rem(24);
    padding-right: rem(39);
    color: #858585;

    i {
      float: right;
      color: #d84b42;
      font-size: rem(30);
      padding-left: rem(12);
    }
  }

  &-show {
    padding: rem(26);
    border-radius: rem(8);
    font-size: rem(24);
    line-height: rem(34);
    text-align: justify;
    background-color: #fdf6f6;
    color: #000000;

    :deep(span) {
      color: $danger-color;
    }
  }
}
</style>

<template>
  <van-popup v-model="visible" position="right" class="widget-layer">
    <van-nav-bar v-bind="$attrs" v-on="$listeners" :title="title" left-arrow @click-right="closeSearch">
      <template #left>
        <van-search v-model="search" placeholder="请输入模块名进行搜索" />
      </template>
      <template #right>
        <span class="close">取消</span>
      </template>
    </van-nav-bar>
    <div class="popup-content"><slot /></div>
  </van-popup>
</template>

<script>
export default {
  name: 'WidgetSearch',
  props: {
    title: { type: String, default: '标题' },
    visible: { type: Boolean, default: false },
    isRight: { type: Boolean, default: false },
  },
  data() {
    return {
      dialogSize: { width: '100%', height: '100%' },
      search: '',
    };
  },
  watch: {
    search: {
      handler(value) {
        this.$emit('searchModel', value);
      },
    },
    visible: {
      handler(value) {
        this.search = ''
      },
    },
  },
  methods: {
    closeSearch() {
      this.search = '';
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.widget-layer {
  background-color: $success-color;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 99999 !important;
}

.close {
  color: aliceblue;
  font-size: rem(32);
}
.van-nav-bar {
  background-color: $success-color;

  &::after {
    display: none;
  }
  :deep(.van-nav-bar__left) {
    width: 80%;
    top: auto;
    bottom: auto;
    padding: 0px;
    left: 46%;
    background: rgba($color: #ffffff, $alpha: 0.2);
    border-radius: rem(100);
    transform: translateX(-50%);
    overflow: hidden;
    color: #fff;
  }
  :deep(.van-field__control) {
    color: #ffffff;
  }
  :deep(.van-search) {
    width: 100%;
    background: rgba($color: #ffffff, $alpha: 0.2);
    padding: 0px;
  }
  :deep(.van-icon) {
    color: #ffffff;
  }
  :deep(.van-search__content) {
    background: rgba($color: #ffffff, $alpha: 0.2);
    input::placeholder {
      color: #ffffff;
    }
  }
}
.exit {
  display: block;
  width: rem(90);
  height: 100%;
  color: #ffffff;
  font-size: rem(54);
  padding: rem(15) rem(15);
  line-height: rem(60);
}

:deep(.van-nav-bar__text) {
  color: #ffffff;
}

:deep(.van-nav-bar__content) {
  height: rem(90);
}

:deep(.van-nav-bar__title) {
  color: #ffffff;
  font-size: rem(36);
  font-weight: 400;
}

:deep(.van-nav-bar__left) {
  padding-left: rem(20);
  padding-right: rem(20);
}

:deep(.van-icon-arrow-left) {
  color: #ffffff !important;
  font-size: rem(40);
}

.popup-content {
  width: 100%;
  height: calc(100% - rem(90));
  overflow: auto;
  background: #e8edf1;
}
</style>

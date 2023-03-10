<template>
  <div class="widget-tabnav">
    <ul class="widget-tabnav__list">
      <template v-for="(item, index) in data">
        <li :class="['widget-tabnav__item', { active: item.value === current }]" :key="index" @click="handleSwitch(item)">{{ item.label }}</li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'WidgetTabnav',
  props: {
    data: { type: Array, default: () => [] },
    value: { type: String, default: '' },
  },
  data() {
    return {
      current: '',
    };
  },
  watch: {
    value: {
      handler(now, old) {
        if (now !== old) {
          this.current = now;
        }
      },
      immediate: true,
    },
  },
  methods: {
    initValue() {},
    handleSwitch(data) {
      this.current = data.value;
      this.$emit('switch', data.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.widget {
  &-tabnav {
    height: 56px;
    background: #ffffff;
    border-radius: 76px;
    display: inline-block;
    padding: 4px 2px;

    &__list {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    &__item {
      color: #10367c;
      height: 100%;
      margin: 0 2px;
      font-size: 22px;
      line-height: 24px;
      padding: 12px 24px;
      transition: 0.3s ease-in-out;
      border-radius: 24px;
      cursor: pointer;

      &.active {
        color: #fff;
        background-color: #316bd8;
      }
    }
  }
}
</style>

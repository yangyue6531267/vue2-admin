<template>
  <div class="frame-block rounded-2xl" :class="{ 'p-5': $route.name != 'regionalOverviewCalendar' }">
    <div class="title mb-5" v-if="title">
      <div class="label">{{ title }}</div>
      <slot name="title"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => {
        return '';
      },
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  components: {},
};
</script>

<style scoped lang="scss">
.frame-block {
  background-color: #fff;
  width: 100%;

  .title {
    position: relative;

    .label {
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      line-height: 31px;
      color: #000000;
      display: inline-block;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 7px;
        background: #3a6acd;
        opacity: 0.2;
        bottom: 5px;
      }
    }
  }
}
</style>

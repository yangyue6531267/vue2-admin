
<template>
  <div id="app"><router-view /></div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      initWidth: 1920,
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  mounted() {
    this.forbidMouseHandler();
  },
  methods: {
    forbidMouseHandler() {
      const env = process.env.VUE_APP_BASE_ENV;
      const body = document.body;
      body.oncontextmenu = () => env !== 'production'; // 禁止右键
      body.onselectstart = () => env !== 'production'; // 禁止选择
    },
  },
};
</script>
<style>
#app {
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transform-origin: left top;
  background-color: #f0f5f9;
  overflow: hidden;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>

<template>
  <reminder-block :btns="buttons" :code="code" :text="text" :tips="tips" @refresh="handleRefresh" @switch="handleSwitch" />
</template>

<script>
import storage from '@/utils/storage';
import ReminderBlock from '@/components/reminder-block/reminder-block.vue';

export default {
  name: 'Page403',
  components: { ReminderBlock },
  data() {
    return {
      code: '403',
      text: '哎呀！出错了～',
      tips: '没有访问权限',
      buttons: [
        // { name: '刷新重试', emit: 'refresh', type: 'default' },
        { name: '切换账号', emit: 'switch', type: 'primary' },
      ],
    };
  },
  methods: {
    handleRefresh() {
      const redirect = storage.getStorage('url');
    },

    handleSwitch() {
      storage.removeStorage('locate');
      window.location.href = window.origin;
    },
  },
};
</script>

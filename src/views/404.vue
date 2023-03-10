<template>
  <reminder-block :btns="buttons" :code="code" :text="text" :tips="tips" @refresh="handleRefresh" />
</template>

<script>
import storage from '@/utils/storage';
import ReminderBlock from '@/components/reminder-block/reminder-block.vue';

export default {
  name: 'Page4034',
  components: { ReminderBlock },
  data() {
    return {
      code: '404',
      text: '哎呀！出错了～',
      tips: '网络异常，请刷新重试！',
      buttons: [{ name: '刷新', emit: 'refresh', type: 'primary' }],
    };
  },
  methods: {
    handleRefresh() {
      const redirect = storage.getStorage('url');
    },
  },
};
</script>

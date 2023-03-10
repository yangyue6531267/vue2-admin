<!--
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-12-08 18:00:05
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2022-12-15 19:51:04
 * @FilePath: \杭州绿城\greentown-wap\src\components\global\widget-colorBox1\widget-colorBox1.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="widget-colorBox1">
    <div class="bg1"></div>
    <div class="bg2"></div>
    <svg class="bg3" width="267" height="188" viewBox="0 0 267 188" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M141.623 66.4037C141.623 64.5502 143.283 62.8358 145.012 62.9303C250.23 66.2895 268.186 2.22124 265.73 -16.1997C264.801 -21.6608 263.907 -26.1928 260.755 -30.024C254.485 -36.3002 245.754 -36.3002 238.283 -32.5285L229.557 -28.7569L232.062 -38.7848C233.283 -46.3032 234.553 -56.3659 228.288 -62.6569C224.582 -66.4137 218.346 -68.9182 213.336 -67.6808C191.339 -67.6808 133.594 -45.9753 136.959 54.9248C137.186 57.2753 135.2 58.6617 133.451 58.7114C131.42 58.6617 129.76 57.1014 130.017 54.9149C133.352 -45.9753 74.4258 -67.6808 53.649 -67.6808C46.8206 -67.6063 42.438 -66.4137 38.6977 -62.6569C32.4572 -56.3659 33.6974 -46.3032 34.9475 -38.7848L37.4278 -28.7569L28.712 -32.5285C21.1918 -36.3002 12.4414 -36.3002 6.2355 -30.024C3.58714 -26.7245 2.10979 -21.6012 1.25006 -16.1997C-1.18583 2.25106 16.1718 66.4932 121.632 63.0346C123.47 62.8358 125.076 64.6049 125.076 66.4336C125.076 68.2126 123.786 70.2599 121.029 69.9965C21.4141 67.0001 0 125.254 0 146.055C0 151.119 1.25006 157.38 5.01014 161.167C13.4394 169.649 26.3749 163.627 37.7885 161.51C33.4899 171.602 27.8028 184.154 37.4278 193.785C41.1385 197.561 46.1635 198.789 51.1489 198.789C69.4305 201.254 132.7 183.389 129.938 78.638C130.16 75.9745 132.265 75.1496 133.391 75.1496C134.552 75.1496 136.815 75.8006 137.023 78.638C134.286 183.389 197.555 201.254 215.841 198.789C220.871 198.789 225.797 197.561 229.557 193.785C239.004 184.314 232.339 172.134 229.078 161.624C239.38 162.464 252.162 169.376 260.755 161.167C265.73 157.38 267 151.119 267 146.055C265.785 125.254 245.245 66.9802 145.714 69.9716C143.1 70.235 141.623 68.0784 141.623 66.4037Z"
        fill="url(#paint0_linear_9598_29236)"
      />
      <defs>
        <linearGradient id="paint0_linear_9598_29236" x1="267" y1="170.895" x2="0" y2="170.895" gradientUnits="userSpaceOnUse">
          <stop stop-color="white" stop-opacity="0.08" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'widgetColorBox1',
};
</script>

<style lang="scss" scoped>
.widget-colorBox1 {
  width: 100%;
  position: relative;
  background: linear-gradient(90deg, #264689 0%, #5288ee 93.13%);
  box-shadow: 0px 10px 8px rgba(81, 134, 234, 0.2);
  border-radius: rem(8);
  .bg1,
  .bg2 {
    width: rem(150);
    height: rem(150);
    border-radius: 50%;
    position: absolute;
    background: linear-gradient(196.17deg, #ffffff 11.24%, rgba(255, 255, 255, 0) 78.36%);
    opacity: 0.1;
    left: rem(-50);
    bottom: rem(0);
  }
  .bg2 {
    width: rem(250);
    height: rem(250);
    left: rem(30);
    bottom: rem(-160);
  }
  .bg3 {
    width: rem(270);
    height: rem(270);
    position: absolute;
    right: rem(10);
    top: calc(50% - rem(120));
    // background: linear-gradient(270deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%);
  }
}
</style>

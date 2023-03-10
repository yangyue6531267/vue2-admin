<template>
  <div class="sketch-pane" :class="{ fixed: fixed }" ref="container">
    <div class="sketch-blur" v-show="image" :style="{ backgroundImage: `url(${image})` }"></div>
    <div class="sketch-view" :style="viewStyle" ref="viewer">
      <div class="sketch-image">
        <img v-if="image" :src="image" alt="项目平面图" />
        <span v-else><i class="el-icon-picture-outline"></i>请先上传销售分布图</span>
      </div>
      <div class="sketch-split">
        <svg
          :width="imageReal.width || 0"
          :height="imageReal.height || 0"
          :viewBox="`0 0 ${imageReal.width || 0} ${imageReal.height || 0}`"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <template v-for="(item, index) in stage">
            <g v-for="(point, i) in item.points" :key="`point_${i}`">
              <polygon
                :key="index"
                :points="point"
                :stroke="item.color"
                :stroke-width="strokeWidth"
                :stroke-dasharray="`${strokeWidth * 3} ${strokeWidth * 2}`"
              />
            </g>
          </template>
        </svg>
      </div>
      <div class="sketch-marks">
        <template>
          <p v-for="(item, index) in marks" :key="index" :class="activeIndex === index?'sketch-marks-itemOpen':'sketch-marks-item'" :style="labelPosition(item, index)" @click="changeStyle(index)">
            <span class="text">{{ Number(item.number) }}#</span>
            <span v-if="activeIndex === index" class="line">|</span>
            <span v-if="activeIndex === index" class="text">去化率 {{ item.percent }}</span>
          </p>
        </template>
      </div>
    </div>
    <div class="sketch-action">
      <button @click="handleFull">
        <i class="iconfont lvfont-fullscreen1"></i>
      </button>
      <button @click="handleScale(1)"><i class="iconfont lvfont-add-bold"></i></button>
      <button @click="handleScale(-1)"><i class="iconfont lvfont-minus-bold"></i></button>
    </div>
    <div class="sketch-openBuildingInfo" v-show="activeIndex!==null" @click="$emit('detail',marks[activeIndex])">
      楼栋信息
      <i class="iconfont" :class="'lvfont-arrow-right-bold'"></i>
    </div>
  </div>
</template>

<script>
const fetchPercent = (a, b) => Math.ceil((a / b) * 10000) / 100 + '%';

export default {
  props: {
    step: { type: Number, default: 0.1 },
    image: { type: String, default: '' }, // 分期
    stage: { type: Array, default: () => [] }, // 分期
    batch: { type: Array, default: () => [] }, // 批次
    marks: { type: Array, default: () => [] }, // 批次
  },
  data() {
    return {
      scale: 1,
      width: 0,
      height: 0,
      fixed: false,
      maxRadio: 0,
      transformX: 0,
      transformY: 0,
      imageReal: { width: 0, height: 0, radio: 1 },
      imageView: { width: 0, height: 0, radio: 1 },
      imageWrap: { width: 0, height: 0, radio: 1 },
      strokeWidth: 3,
      fullscreen: {},
      distance: { x: 0, y: 0 },
      marksList:[],
      activeIndex:null
    };
  },
  watch: {
    image: {
      handler(now, old) {
        if (now && now !== old) this.initViewer();
      },
      immediate: true,
    },
  },
  computed: {
    viewStyle() {
      const { width, height, transformX, transformY } = this;
      if (width === 0) {
        return {
          width: '100%',
          height: '100%',
          transform: `translate(0px, 0px)  `,
        };
      }
      return {
        width: width + 'px',
        height: height + 'px',
        transform: `translate(${transformX}px, ${transformY}px)  `,
      };
    },
    labelPosition() {
      const { batch, imageReal } = this;
      return item => {
        const index = item.type - 1;
        const color = batch[index] ? batch[index].color : '';
        return {
          color,
          left: fetchPercent(item.left, imageReal.width),
          top: fetchPercent(item.top, imageReal.height),
          // transform: `translate(-50%, calc(-100% - 7px))`,
        };
      };
    },
  },
  methods: {
    // 初始化内容 transform: `translate(-50%, -50%) scale(${1})`
    initViewer() {
      const { image } = this;
      this.loadAsyncImage(image).then(data => {
        const temp = this.fetchElementSize();
        const radio = Math.round((data.width / temp.width) * 100) / 100;
        const width = data.radio >= 1 ? temp.width : temp.width * data.radio; // 真实大小
        const height = data.radio >= 1 ? temp.height / data.radio : temp.height; // 真实大小

        this.width = width;
        this.height = height;
        this.maxRadio = radio;
        this.imageReal = data;
        this.imageView = { width, height };
        this.transformX = (temp.width - width) / 2;
        this.transformY = (temp.height - height) / 2;
        this.strokeWidth = Math.ceil(radio * 4);
        this.fullscreenBound();
        this.handleMoved();
      });
    },
    changeStyle (index){
      this.activeIndex = index
    },  
    // 全屏
    handleFull() {
      const { fixed } = this;
      this.fixed = !fixed;
      this.fullscreenMethod();
    },

    // 放大缩小
    handleScale(direct) {
      // const { step, fixed, scale, maxRadio, distance, imageWrap, imageView, fullscreen } = this;
      // const value = Math.round((scale + step * direct) * 1000) / 1000;
      // const result = value <= 1 ? 1 : value >= maxRadio ? maxRadio : value;
      // const boxWidth = fixed ? fullscreen.width : imageWrap.width;
      // const boxHeight = fixed ? fullscreen.height : imageWrap.height;
      // this.scale = result;
      // this.width = imageView.width * result;
      // this.height = imageView.height * result;
      // this.transformX = (boxWidth - this.width) / 2;
      // this.transformY = (boxHeight - this.height) / 2;
      const boxWidth = this.fixed ? this.fullscreen.width : this.imageWrap.width;
      const boxHeight = this.fixed ? this.fullscreen.height : this.imageWrap.height;
      if (direct === -1) {
        this.width /= 1.1;
        this.height /= 1.1;
      } else if (direct === 1) {
        this.width *= 1.1;
        this.height *= 1.1;
      }

      this.transformX = (boxWidth - this.width) / 2;
      this.transformY = (boxHeight - this.height) / 2;
    },

    // 移动事件
    handleMoved() {
      const { imageWrap } = this;
      const app = document.getElementById('app');
      const pointDown = {};
      const container = this.$refs.container;
      let roundings = container.getBoundingClientRect();

      container.addEventListener(
        'touchstart',
        event => {
          if (event.path.some(item => item.className && item.className.indexOf('sketch-action') > -1)) return;
          container.classList.add('move');
          pointDown.x = event.targetTouches[0].clientX;
          pointDown.y = event.targetTouches[0].clientY;
          pointDown.transformX = this.transformX;
          pointDown.transformY = this.transformY;
          roundings = container.getBoundingClientRect();
        },
        true
      );

      app.addEventListener(
        'touchmove',
        event => {
          if (container.classList.contains('move')) {
            const moving = [event.targetTouches[0].clientX - pointDown.x, event.targetTouches[0].clientY - pointDown.y];
            this.setTransform(moving, pointDown);
            if (event.targetTouches[0].clientX < roundings.left || event.targetTouches[0].clientX > roundings.right || event.targetTouches[0].clientY < roundings.top || event.targetTouches[0].clientY > roundings.bottom) {
              container.classList.remove('move');
            }
          }
        },
        true
      );

      container.addEventListener(
        'touchend',
        event => {
          if (event.path.some(item => item.className && item.className.indexOf('sketch-action') > -1)) return;
          container.classList.remove('move');
          this.distance = {
            x: Math.round(event.targetTouches[0].clientX - (imageWrap.width / 2 + roundings.left)),
            y: Math.round(event.targetTouches[0].clientY - (imageWrap.height / 2 + roundings.top)),
          };
        },
        true
      );
    },

    // 移动图片
    setTransform(point, data) {
      const { fixed, width, height, imageWrap, fullscreen } = this;
      const boxWidth = fixed ? fullscreen.width : imageWrap.width;
      const boxHeight = fixed ? fullscreen.height : imageWrap.height;
      const minusWidth = boxWidth - width;
      const minusHeight = boxHeight - height;

      let moveX = data.transformX + point[0];
      let moveY = data.transformY + point[1];
      if (minusWidth >= 0) {
        moveX = moveX <= 0 ? 0 : moveX >= minusWidth ? minusWidth : moveX;
      } else {
        moveX = moveX >= 0 ? 0 : moveX <= minusWidth ? minusWidth : moveX;
      }

      if (minusHeight >= 0) {
        moveY = moveY <= 0 ? 0 : moveY >= minusHeight ? minusHeight : moveY;
      } else {
        moveY = moveY >= 0 ? 0 : moveY <= minusHeight ? minusHeight : moveY;
      }

      this.transformX = moveX;
      this.transformY = moveY;
    },

    // 获取容器尺寸
    fetchElementSize() {
      const elem = this.$refs.container;
      const width = elem.offsetWidth;
      const height = elem.offsetHeight;
      const radio = Math.round((width / height) * 100) / 100;
      this.imageWrap = { height, width, radio };
      return { height, width, radio };
    },

    // 全屏和退出全屏
    fullscreenMethod() {
      const { fixed, width, height, fullscreen, imageWrap } = this;
      const boxWidth = fixed ? fullscreen.width : imageWrap.width;
      const boxHeight = fixed ? fullscreen.height : imageWrap.height;
      this.transformX = (boxWidth - width) / 2;
      this.transformY = (boxHeight - height) / 2;
      this.fullscreenBound();
      this.$nextTick(() => {
        this.resetSize();
      });
    },

    // 全屏时尺寸
    fullscreenBound() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.fullscreen = { width, height }
    },
    resetSize() {
      const boxWidth = this.fixed ? this.fullscreen.width : this.imageWrap.width;
      const boxHeight = this.fixed ? this.fullscreen.height : this.imageWrap.height;
      let ratio = this.width / this.height;
      if (boxWidth / boxHeight > ratio) {
        this.width = boxHeight * ratio;
        this.height = boxHeight;
      } else {
        this.width = boxWidth;
        this.height = boxWidth / ratio;
      }

      this.transformX = (boxWidth - this.width) / 2;
      this.transformY = (boxHeight - this.height) / 2;
    },

    // 图片加载
    loadAsyncImage(url) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve({ width: image.width, height: image.height, radio: Math.round((image.width / image.height) * 1000) / 1000 });
        image.onerror = error => reject(error);
        image.src = url;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.sketch {
  &-pane {
    position: relative;
    // padding-bottom: 100%;
    border-radius: rem(12);
    background-color: #f2f5f5;
    overflow: hidden;
    user-select: none;
    height: rem(690);
    width: 100%;
    margin-bottom: rem(20);
    .sketch-blur {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      filter: blur(rem(4));
      background-size: 100% 100%;
      &::after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba($color: #000000, $alpha: 0.4);
      }
    }

    &.fixed {
      position: fixed;
      z-index: 99;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #454545;
      transition: 0.2s ease-in-out;
      padding-bottom: 0;
      border-radius: 0;
      margin: 0;
    }

    &.move {
      cursor: move;
    }
  }

  &-view {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
  }

  &-image {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      line-height: 0;
    }

    i {
      font-size: rem(40);
      display: block;
      text-align: center;
      margin-bottom: rem(12);
      opacity: 0.5;
    }

    span {
      color: #333;
      font-weight: bold;
      padding-bottom: 10%;
      opacity: 0.3;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 100%;
      width: 100%;
      font-size: rem(30);
    }
  }

  &-split {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &-label {
    position: absolute;
    z-index: 3;
    top: rem(28);
    left: rem(28);
    right: rem(28);
    line-height: rem(20);
    height: rem(50);
    padding: rem(15) rem(10) rem(15) rem(10);
    background-color: #fff;
    border-radius: rem(12);
    width: rem(810);
    overflow-y: hidden;
    justify-content: flex-start !important;
    display: flex;
    .scroll-body {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .sketch-label-date {
      display: flex;
    }

    .sketch-item {
      color: #646464;
      font-size: rem(20);
      height: rem(20);
      line-height: rem(20);
      margin-right: rem(36);
      display: flex;
      align-items: center;
      justify-content: flex-start;
      word-break: keep-all;
      div {
        word-break: keep-all;
      }

      &:last-child {
        margin-right: 0;
      }
    }

    h4 {
      color: #969696;
      font-size: rem(20);
      padding-right: rem(6);
      word-break: keep-all;
    }

    &-date {
      display: flex;
      svg {
        width: rem(13);
        height: rem(13);
        margin-right: rem(10);
      }
    }

    &-time {
      display: flex;
      padding-left: rem(36);
      padding-right: rem(20);
      border-left: rem(1) solid #e1e1e1;

      i {
        display: block;
        width: rem(13);
        height: rem(13);
        border-radius: 50%;
        margin-right: rem(10);
      }
    }
  }
  &-openBuildingInfo{
    width: rem(168);
    height: rem(48);
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    bottom: rem(40);
    font-weight: rem(400);
    font-size: rem(24);
    background: #425BB5;
    box-shadow: 0px 4px 16px rgba(83, 131, 247, 0.3);
    border-radius: rem(32);
    color: #FFFFFF;
    text-align: center;
    line-height: rem(48);
    z-index: 10;
    i{
      font-size: rem(24);
    }
  }

  &-label.disappear {
    justify-content: unset;
    .sketch-label-date {
      display: none;
    }
    .sketch-label-time {
      padding-left: 0;
      border-left: 0;
      margin-left: 0;
    }
  }

  &-marks {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &-item {
      width: rem(40);
      height: rem(40);
      border-radius: 50%;
      position: absolute;
      display: flex;
      top: 0;
      background-color: currentColor;
      transform: translate(-50%, calc(-100% - rem(7)));
      // transform-origin: 50% 100%;
      align-items: center;
      z-index: 10;
      justify-content: space-around;
      
    }

    &-itemOpen {
      width: rem(200);
      position: absolute;
      display: flex;
      top: 0;
      padding: rem(10) rem(9);
      background-color: currentColor;
      justify-content: center;
      align-items: center;
      border-radius: rem(8);
      transform: translate(-50%, calc(-100% - rem(7)));
      transform-origin: 50% 100%;
      transition: box-shadow 0.2s ease-in-out;
      cursor: pointer;
      z-index: 100;
      .text {
        word-break: keep-all;
        white-space: nowrap;
      }

      &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: rem(-7);
        border-style: solid;
        border-color: currentColor transparent;
        border-width: rem(8) rem(7) 0;
        margin-top: rem(-1);
      }

      &:hover {
        box-shadow: 0 0 rem(10) currentColor;
      }
    }

    .text {
      display: block;
      color: #fff;
      font-size: rem(20);
      line-height: rem(20);
    }

    .line {
      display: block;
      color: #fff;
      font-size: rem(20);
      margin: 0 rem(6);
    }
  }

  &-action {
    position: absolute;
    z-index: 5;
    right: 0;
    bottom: 0;
    padding: rem(27) rem(23);

    button {
      width: rem(66);
      height: rem(66);
      color: #333;
      font-size: rem(30);
      transition: 0.2s linear;
      background: #fff;
      backdrop-filter: blur(rem(2));
      border-radius: 50%;
      margin-top: rem(10);
      outline: none;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont{
        font-size: rem(36)
      }
      &:disabled {
        background-color: rgba(250, 250, 250, 0.8);
        box-shadow: none;
      }
    }
  }
}
</style>

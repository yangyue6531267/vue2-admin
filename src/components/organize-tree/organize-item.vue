<script>
import logo from '@/assets/images/logoRect.svg';

export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    showLevel: {
      type: Boolean,
      default: false,
    },
    showChild: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    showIcon() {
      return this.data.code === '00000001';
    },

    visibleSwitch() {
      const { data, showChild } = this;
      return showChild && data.children && data.children.length > 0;
    },
  },
  render(h) {
    const { data, showIcon, showLevel, visibleSwitch } = this;
    const emitLevel = { click: () => this.$emit('switch', data) };
    const emitStore = { click: () => this.$emit('collect', data) };
    const emitArrow = { click: () => this.$emit('navigate', data) };

    const vNodeImg = <img src={logo} alt="logo" />;
    // const vNodeLine = <span class="line"></span>;
    const vNodeIcon = <span class="icon">{vNodeImg}</span>;
    const vNodeName = <span class="name" >{data.name}</span>;
    const vNodeStore = <span {...{ attrs: { class: 'store el-icon-star-on' }, on: emitStore }}></span>;
    {/* const vNodeArrow = <span {...{ attrs: { class: 'arrow el-icon-arrow-right' }, on: emitArrow }}></span>; */}
    const vNodeLevel = <span {...{ attrs: { class: 'level lvfont-structure' }, on: emitLevel }}>展开</span>;
    // const vNodeValue = [vNodeStore, vNodeArrow, visibleSwitch ? vNodeLevel : ''];
    const vNodeValue = [ visibleSwitch ? vNodeLevel : ''];
    const vNodeLabel = [ showIcon ? vNodeIcon : null, vNodeName];
    return (
      <div class="organize-item">
        <div class="label" {...{on: emitArrow}}>{vNodeLabel}</div>
        <div class="value">{vNodeValue}</div>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.organize-item {
  display: flex;
  line-height: rem(50);
  align-items: center;
  justify-content: space-between;
  padding: rem(30);
  position: relative;

  @include splitLine(rem(30), rem(30));

  .icon {
    display: block;
    width: rem(80);
    height: rem(80);
    margin-right: rem(20);
  }

  .line {
    display: block;
    width: rem(50);
    height: rem(60);
    text-align: center;
    line-height: rem(50);
    margin-left: rem(15);
    margin-right: rem(35);
    padding-bottom: rem(10);

    &::before {
      content: '';
      display: inline-block;
      vertical-align: middle;
      width: rem(14);
      height: rem(14);
      border-style: solid;
      border-width: 0 0 rem(3) rem(3);
      border-color: #808080;
    }
  }

  .name {
    display: block;
    font-size: rem(32);
    @include singleLine;
  }

  .store {
    color: $warning-color;
    font-size: rem(42);
    padding: rem(9);
  }

  .arrow {
    color: $text-color;
    font-size: rem(28);
    font-weight: bold;
    padding: rem(15);
  }

  .label {
    width: calc(100% - rem(150));
    max-width: calc(100% - rem(150));
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
  }

  .value {
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    padding: rem(25) rem(15);
  }

  .level {
    color: $primary-color;
    font-size: rem(28);
    margin-left: rem(24);
    padding-left: rem(24);
    padding-right: rem(15);
    line-height: rem(60);
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    height: rem(60);

    &::before {
      font-size: rem(40);
      margin-right: rem(10);
    }

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 1px;
      height: rem(40);
      background-color: rgba($color: #333333, $alpha: 0.4);
      margin-top: rem(-20);
    }
  }
}
</style>

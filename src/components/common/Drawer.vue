<template>
  <div class="drawer-wrap">
    <!-- 遮罩层 -->
    <div class="drawer-mask" v-show="drawer" @click="handleClose"></div>
    <!-- /遮罩层 -->
    <!-- 滑块部分 -->
    <div class="drawer-main"
      :style="mainStyle"
      :class="mainClass">
      <slot></slot>
      <div class="drawer-footer">
        <div class="btn btn-primary" @click="handleClose">取消</div>
        <div class="btn btn-plain" @click="handleConfirm">确定</div>
      </div>
    </div>
    <!-- /滑块部分 -->
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    drawer: {
      type: Boolean,
      default: false
    },
    // direction: {
    //   type: String,
    //   default: 'btt'
    // }
    // width: {
    //   type: String,
    //   default: '50vw'
    // },
    height: {
      type: String,
      default: '50vh'
    }
  },
  computed: {
    mainClass () {
      return {
        'main-show': this.drawer,
        'main-hide': !this.drawer
      }
    },
    mainStyle () {
      // return { bottom: this.drawer ? '0' : '-50vh' }
      return { bottom: this.drawer ? '0' : `-${this.height}`, height: this.height }
      // switch (this.direction) {
      //   case 'btt':
      //     return { bottom: this.drawer ? '0' : `-${this.height}`, height: '50vh' }
      //   case 'ttb':
      //     return { top: this.drawer ? '0' : `-${this.height}`, height: '50vh' }
      //   case 'ltr':
      //     return { left: this.drawer ? '0' : `-${this.width}`, width: '50vw' }
      //   case 'rtl':
      //     return { right: this.drawer ? '0' : `-${this.width}`, width: '50vw' }
      //   default:
      //     return { bottom: this.drawer ? '0' : `-${this.height}` }
      // }
    }
  },
  methods: {
    handleClose () {
      this.$emit('cancel')
    },
    handleConfirm () {
      this.$emit('confirm')
    }
  }
}
</script>

style <style lang="less" scoped>
  /* 遮罩层 */
  .drawer-mask {
    position: fixed;
    z-index: 9;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,.5);
  }

  /* 滑块 */
  .drawer-main {
    position: fixed;
    z-index: 10;
    // bottom: 0;
    left: 0;
    width: 100vw;
    height: 0;
    background: #fff;
    border-radius: 20px 20px 0 0;
    transition: all 0.5s;
  }
  .main-show {
    opacity: 1;
  }
  .main-hide {
    opacity: 1;
  }

  .drawer-footer {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
    width: 100vw;
    .btn {
      width: 30vw;
      margin: 20px 10px;
    }
  }
</style>

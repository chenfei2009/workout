<template>
  <div class="action-bar">
    <div class="btn center" @click="onNextClick">
      <span class="icon iconfont icon-caret-right"></span>
      <span class="btn-text">下一组</span>
    </div>
    <div class="btn center" @click="onChangeClick">
      <span class="icon iconfont icon-forward"></span>
      <span class="btn-text">换动作</span>
    </div>
    <div class="btn center" @click="onFinishClick">
      <span class="icon iconfont icon-stop"></span>
      <span class="btn-text">完成</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionBar',
  props: {},
  data () {
    return {}
  },
  methods: {
    onNextClick () {
      this.$emit('onNextClick')
    },
    onChangeClick () {
      this.$emit('onChangeClick')
    },
    onFinishClick () {
      this.$emit('onFinishClick')
    }
  }
}
</script>

<style scoped lang='less'>
.action-bar {
  position: fixed;
  bottom: 0;
  width: 100vw;
  display: flex;
  padding-bottom: 10px;
  .btn {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: right;
    align-items: center;
    .icon {
      font-size: 36px;
      color: #ccc;
    }
    .icon-stop {
      color: var(--themeColor);
    }
    .btn-text {
      margin: 10px 0;
    }
  }
}
</style>

<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  methods: {}
}
</script>

<style lang="less" scoped>
  .tab-bar {
    position: fixed;
    display: flex;
    flex: 1;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #ccc;
  }
</style>

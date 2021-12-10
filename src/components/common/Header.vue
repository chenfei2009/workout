<template>
  <div class="header">
    <div class="fl">
      <slot name="back"></slot>
      <slot name="title"></slot>
    </div>
    <div class="fr">
      <slot name="share"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {}
}
</script>

<style lang="less" scoped>
  .header {
    position: fixed;
    // display: flex;
    // flex: 1;
    top: 0;
    left: 0;
    right: 0;
    // width: 100%;
    padding: 10px;
    background-color: var(--bgColor);
    overflow: hidden;
  }
</style>

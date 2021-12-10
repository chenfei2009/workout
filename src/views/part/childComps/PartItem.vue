<template>
  <div class="part-item" @click="changeItem">
    <slot name="item-icon"></slot>
    <slot name="item-text"></slot>
  </div>
</template>

<script>
export default {
  name: 'PartItem',
  props: {
    partItem: {
      type: Object
    }
  },
  methods: {
    changeItem () {
      this.$router.push({
        name: 'Movement',
        params: this.partItem
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .part-item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 44vw;
    height: 30vw;
    margin: 5px;
    border-radius: 10px;
  }
</style>

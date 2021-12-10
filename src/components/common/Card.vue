<template>
  <div class="card">
    <!-- {{cardText}} -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    cartText: String
  },
  methods: {}
}
</script>

<style lang="less" scoped>
  .card {
    background-color: #fff;
    margin: 10px;
    padding: 15px;
    border-radius: 10px;
  }
</style>

<template>
  <div class="tab-bar-item" @click="changeItem">
    <!-- <div :class="{active: isActive}"><slot name="item-icon"></slot></div> -->
    <div :style="activeStyle"><slot name="item-icon"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: {
      type: String
    },
    activeColor: {
      type: String,
      default () {
        return 'red'
      }
    }
  },
  computed: {
    isActive () {
      return this.$route.path === this.path
    },
    activeStyle () {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    changeItem () {
      // console.log(this.path)
      this.$router.push(this.path)
    }
  }
}
</script>

<style lang="less" scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
    margin: 5px 0;
    // 动态传入 activeColor
    // .active {
    //   color: red;
    // }
  }
</style>

<template>
  <div class="tab-control">
    <!-- 标签页的填充数量、文字均不确定 -->
    <!-- 只是文字不一样，不建议用插槽，动态传入标题文字（数组）即可 -->
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{active: index === currentIndex}"
      @click="itemClick(index)"
      ><span>{{ item }}</span></div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped lang='less'>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  position: sticky;
  top: 44px;
  // background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.active {
  color: var(--themeColor);
  border-bottom: 2px solid var(--themeColor);
  span {
    padding: 5px;
  }
}
</style>

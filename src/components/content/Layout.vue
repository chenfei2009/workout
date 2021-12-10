<template>
  <div class="layout">
    <TabBar>
      <TabBarItem path="/home" activeColor="#e1251b">
        <span slot="item-icon" class="iconfont icon-home"></span>
        <span slot="item-text">首页</span>
      </TabBarItem>
      <TabBarItem path="/plan">
        <span slot="item-icon" class="iconfont icon-menu"></span>
        <span slot="item-text">计划</span>
      </TabBarItem>
      <TabBarItem path="/calendar">
        <span slot="item-icon" class="iconfont icon-calendar"></span>
        <span slot="item-text">日历</span>
      </TabBarItem>
      <TabBarItem path="/profile">
        <span slot="item-icon" class="iconfont icon-user"></span>
        <span slot="item-text">我的</span>
      </TabBarItem>
    </TabBar>
  </div>
</template>

<script>
import TabBar from '@/components/common/TabBar.vue'
import TabBarItem from '@/components/common/TabBarItem.vue'

export default {
  name: 'Layout',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

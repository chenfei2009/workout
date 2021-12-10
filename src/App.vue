<template>
  <div id="app">
    <Layout></Layout>
    <!-- 需要缓存的视图组件 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 不需要缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Layout from '@/components/content/Layout.vue'

export default {
  name: 'Home',
  components: {
    Layout
  }
}
</script>

<style lang="less">
</style>

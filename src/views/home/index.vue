<template>
  <div class="home-container">
    <Header>
      <span slot="title">Welcome to Workout Records</span>
      <span slot="share" class="iconfont icon-share"></span>
    </Header>
    <div class="main">
      <Card class="count-wrap">
        <div class="count-item">您本周已训练<span class="fr">{{weekCount}} 天</span></div>
        <div class="count-item">您本月已训练<span class="fr">{{monthCount}} 天</span></div>
        <div class="count-item">您总共已训练<span class="fr">{{totalCount}} 天</span></div>
      </Card>
      <Card class="center">
        <a href="#/part" class="btn-entry">
          <span>点击选择训练部位</span>
        </a>
      </Card>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue'
import Card from '@/components/common/Card.vue'

import { getHomeData } from '@/network/home.js'

export default {
  name: 'Home',
  components: {
    Header,
    Card
  },
  data () {
    return {
      weekCount: 0,
      monthCount: 0,
      totalCount: 0
    }
  },
  created () {
    this.loadHomeData()
  },
  methods: {
    async loadHomeData () {
      const { data: res } = await getHomeData()
      if (res.meta.status !== 200) return alert('请求数据失败')
      this.weekCount = res.data.w_count
      this.monthCount = res.data.m_count
      this.totalCount = res.data.t_count
    }
  }
}
</script>

<style lang="less" scoped>
  .main {
    position: relative;
    // height: calc(~"100vh - 41px");
    height: ~"calc(100vh - 82px)";
    margin-top: 40px;
    padding-top: 150px;
    .count-wrap {
      padding: 10px 40px;
      .count-item {
        padding: 5px 0;
      }
    }
    .btn-entry span {
      text-align: center;
    }
  }
</style>

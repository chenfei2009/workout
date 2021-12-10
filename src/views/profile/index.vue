<template>
  <div class="profile-container">
    <Header>
      <span slot="title">个人中心</span>
      <span slot="share" class="iconfont icon-share"></span>
    </Header>
    <div class="main">
      <Card>
        <div>Chen.F</div>
      </Card>
      <Card>
        <div @click="$router.push({name: 'Statistics'})">训练统计</div>
      </Card>
      <Card>
        <div>排行榜</div>
      </Card>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue'
import Card from '@/components/common/Card.vue'

export default {
  name: 'Profile',
  components: {
    Header,
    Card
  },
  methods: {}
}
</script>

<style lang="less" scoped>
  .main {
    position: relative;
    // height: calc(~"100vh - 41px");
    height: ~"calc(100vh - 82px)";
    margin-top: 40px;
    padding-top: 40px;
  }
</style>

<template>
  <div class="plan-list">
    <Header>
      <span slot="title">训练计划</span>
      <span slot="share" class="iconfont icon-share"></span>
    </Header>
    <div class="main">
      <!-- 训练计划列表 -->
      <div class="plan-list">
        <Card v-for="item in planList" :key="item.id">
          <div class="item-action" @click="choosePlan(item)">
            <span>{{item.name}}</span>
            <span class="fr iconfont icon-arrow-right-bold"></span>
          </div>
        </Card>
      </div>
      <footer>
        <a href="#/plan/add"><div class="btn btn-plain">新增训练计划</div></a>
      </footer>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue'
import Card from '@/components/common/Card.vue'

import { getPlanList } from '@/network/plan.js'

export default {
  name: 'PlanList',
  components: {
    Header, Card
  },
  data () {
    return {
      planList: []
    }
  },
  created () {
    this.loadPlanList()
  },
  methods: {
    // 网络请求相关方法
    /**
     * 请求计划列表数据
     */
    async loadPlanList () {
      const { data: res } = await getPlanList()
      if (res.meta.status !== 200) return console.error(res.meta.msg)
      this.planList.push(...res.data)
    },

    // 事件监听相关方法
    choosePlan (item) {
      // console.log(planId)
      this.$router.push({
        name: 'moveList',
        params: item
      })
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
    .plan-list {
      padding-top: 10px;
    }
    footer {
      position: absolute;
      .btn {
        width: ~"calc(100vw - 20px)";
        margin: 10px;
      }
    }
  }
</style>

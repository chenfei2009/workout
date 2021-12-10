<template>
  <div class="plan-detail container">
    <Header>
      <span class="btn-back iconfont icon-arrow-left-bold" @click="goBack" slot="back"></span>
      <span slot="title">训练计划</span>
      <span slot="share" class="iconfont icon-share"></span>
    </Header>
    <!-- 选择动作 -->
    <div class="main">
      <div class="title">{{planName}}</div>
      <!-- 动作列表 -->
      <Card class="move-list-wrap">
        <div v-for="item in movementList"
          :key="item.id"
          class="fl btn btn-primary"
          @click="chooseMoveItem(item)">
          <span class="item-text">{{item.name}}</span>
        </div>
      </Card >
      <!-- /动作列表 -->
      <footer>
        <div class="btn btn-plain" @click="goBack">编辑计划</div>
        <div class="btn btn-primary" @click="goBack">返回</div>
      </footer>
    </div>
    <!-- /选择动作 -->
    <!-- 对话框组件 -->
    <!-- /对话框组件 -->
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue'
import Card from '@/components/common/Card.vue'

import { getMoveListById } from '@/network/plan.js'

export default {
  name: 'AddPlan',
  data () {
    return {
      planName: '',
      movementList: [
        // {"id":9,"pid":2,"part":"肩部","name":"面拉","type":0,"date":"2021-11-06"}
      ]
    }
  },
  components: {
    Header, Card
  },
  computed: {},
  created () {
    // 获取路由参数
    const { planId } = this.$route.query
    // 请求动作列表数据
    this.loadMoveListById(planId)
  },
  mounted () {},
  methods: {
    async loadMoveListById (planId) {
      const { data: res } = await getMoveListById(planId)
      if (res.meta.status !== 200) return console.error(res.meta.msg)
      this.planName = res.data[0][0].planName
      this.movementList.push(...res.data[1])
    },
    // 返回上一级页面
    goBack () {
      this.$router.push({ path: '/plan' })
    },
    addMove () {
      this.$router.push({ path: '/part' })
      window.localStorage.setItem('isAddMove', true)
    },
    chooseMoveItem (item) {
      this.$router.push({
        name: 'Workout',
        params: { moveItem: item }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .main {
    // 形成 BFC 否则会上边距塌陷
    overflow: hidden;
    .title {
      text-align: center;
      margin: 20px 0;
    }
  }

  .move-list-wrap {
    // display: flex;
    padding: 0 20px;
    // 形成 BFC 否则会上边距塌陷
    overflow: hidden;
    .btn {
      margin: 15px;
      padding: 5px 15px;
      font-size: 14px;
      background-color: var(--bgColor);
      .item-text {
        margin-right: 5px;
      }
      .item-delete {
        color: var(--themeColor);
      }
    }
  }

  footer {
    .btn {
      width: ~"calc(100vw - 20px)";
      margin: 10px;
    }
  }
</style>

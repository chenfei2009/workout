<template>
  <div class="plan-detail container">
    <Header>
      <span class="btn-back iconfont icon-arrow-left-bold" @click="goBack" slot="back"></span>
      <span slot="title">训练计划</span>
      <span slot="share" class="iconfont icon-share"></span>
    </Header>
    <!-- 选择动作 -->
    <div class="main">
      <div class="title">{{name}}</div>
      <!-- 动作列表 -->
      <Card class="move-list-wrap">
        <div v-for="item in moves"
          :key="item.id"
          class="fl btn btn-primary"
          @click="handleMoveClick(item)">
          <span class="item-text">{{item.name}}</span>
        </div>
      </Card >
      <!-- /动作列表 -->
      <footer>
        <div class="btn btn-plain" @click="editPlan">编辑计划</div>
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

import { getMovesByName } from '@/network/plan.js'

export default {
  name: 'AddPlan',
  data () {
    return {
      name: '',
      moves: []
    }
  },
  components: {
    Header, Card
  },
  computed: {},
  created () {
    // 获取路由参数
    const { name } = this.$route.params
    this.name = name
    // 请求动作列表数据
    this.loadMovesByName(name)
  },
  mounted () {},
  methods: {
    async loadMovesByName (name) {
      const { data: res } = await getMovesByName(name)
      if (res.meta.status !== 200) return console.error(res.meta.msg)
      this.moves.push(...res.data)
    },

    /**
     * 监听 返回 按钮点击
     */
    goBack () {
      this.$router.push({ path: '/plan' })
    },

    /**
     * 监听 添加动作 按钮点击
     */
    addFromMoves () {
      window.localStorage.setItem('isAddMove', true)
      this.$router.push({ path: '/part' })
    },

    /**
     * 监听 动作 点击
     */
    handleMoveClick (item) {
      this.$router.push({
        name: 'Workout',
        params: { move: item }
      })
    },

    /**
     * 监听 编辑计划 点击
     */
    editPlan () {
      window.localStorage.setItem('planName', this.name)
      window.localStorage.setItem('selectMoves', JSON.stringify(this.moves))
      this.$router.push({ path: '/plan/add' })
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

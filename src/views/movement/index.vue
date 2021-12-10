<template>
  <div class="movement container">
    <Header>
      <span class="btn-back iconfont icon-arrow-left-bold" @click="$router.push({path:'/part'})" slot="back"></span>
      <span slot="title">选择{{part}}的动作</span>
      <span slot="share" class="iconfont icon-share"></span>
    </Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue'

export default {
  name: 'Movement',
  data () {
    return {
      pid: '',
      part: '',
      isEditMove: false, // 切换 选择动作 与编辑动作 状态
      isAddMoveToPlan: false, // 判断是否为 添加动作 状态
      midList: [], // 选中的动作 id 列表
      dialogVisible: false,
      title: '是否确认删除',
      content: '删除后无法恢复',
      id: null
    }
  },
  components: {
    Header
  },
  computed: {
    // activeClass () {
    //   if (this.isAddMove) {
    //     return function (item) {
    //       return (item.isItemSelect ? 'btn-plain' : 'btn-primary')
    //     }
    //   }
    //   return function (item) {
    //     return (item.count > 0 ? 'btn-plain' : 'btn-primary')
    //   }
    // }
  },
  created () {
    // 如果不使用动态路由，这里无法获取路由参数
    this.part = this.$route.params.part
  },
  mounted () {},
  methods: {
    // 事件处理相关方法
    /**
     * 监听 新增自定义动作 按钮点击事件
     */
    handleAddMove () {
      console.log('handleAddMove')
      // this.$router.push({
      //   name: 'AddMovement',
      //   params: { part: this.part, pid: this.pid }
      // })
    }

    /*
      添加动作状态（训练计划）
      监听 完成选择 按钮点击事件
    */
    // chooseMovements () {
    //   const selectList = []
    //   this.movementList.map(v => {
    //     if (v.isItemSelect) {
    //       return selectList.push({
    //         id: v.id,
    //         name: v.name
    //       })
    //     }
    //   })
    //   if (selectList.length === 0) {
    //     // 直接返回
    //     return this.$router.go(-1)
    //   }
    //   // 提交请求并切换页面
    //   this.$router.push({
    //     name: 'AddPlan',
    //     params: { selectList }
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
  footer {
    .btn {
      width: ~"calc(100vw - 20px)";
      margin: 10px;
    }
  }
</style>

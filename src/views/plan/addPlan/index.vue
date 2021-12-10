<template>
  <div class="add-plan container">
    <Header>
      <span class="btn-back iconfont icon-arrow-left-bold" @click="goBack" slot="back"></span>
      <span slot="title">{{title}}</span>
      <span slot="share" class="iconfont icon-share"></span>
    </Header>
    <!-- 选择动作 -->
    <div class="main">
      <form action="#">
        <div class="form-group">
          <label for="name">计划名称</label>
          <input type="text" placeholder="点击输入计划名称" id="name" v-model="name">
        </div>
      </form>
      <!-- 动作列表 -->
      <div class="move-list-wrap">
        <div class="fl btn btn-plain" @click="addFromMoves">添加动作+</div>
        <div v-for="item in moves" :key="item.id" class="fl btn btn-primary">
          <span class="item-text">{{item.name}}</span>
          <span class="item-delete iconfont icon-delete"
            @click="delelteMoveById(item.id)"
            ></span>
        </div>
      </div>
      <section v-if="moves.length===0">
        <div class="btn btn-primary" @click="addFromRecord">导入训练记录中的动作</div>
      </section>
      <!-- /动作列表 -->
      <footer v-if="isEditPlan">
        <div class="btn btn-plain" @click="saveEdit">保存</div>
        <div class="btn btn-primary" @click="handleDelete">删除</div>
      </footer>
      <footer v-else>
        <div class="btn btn-plain" @click="createPlan">保存计划</div>
        <div class="btn btn-primary" @click="clearMoves">清除已添加动作</div>
      </footer>
    </div>
    <!-- /选择动作 -->
    <!-- 删除计划对话框 -->
    <Dialog :title="dialogTitle"
      :content="dialogContent"
      :okOnly="dialogTitle !== '删除计划'"
      :dialogVisible="dialogVisible"
      @dialogClose="dialogVisible=false"
      @dialogConfirm="onDialogConfirm"
      ></Dialog>
    <!-- /删除计划对话框 -->
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue'
import Dialog from '@/components/common/Dialog.vue'

import { addPlan, updatePlan, deletePlan } from '@/network/plan.js'
// import { addMove } from '@/network/movement.js'

export default {
  name: 'AddPlan',
  data () {
    return {
      moves: [],
      name: '',
      title: '新增计划',
      isEditPlan: false,
      dialogVisible: false,
      dialogTitle: '',
      dialogContent: ''
    }
  },
  components: { Header, Dialog },
  computed: {},
  created () {
    const name = window.localStorage.getItem('planName') || ''
    this.moves = JSON.parse(localStorage.getItem('selectMoves')) || []
    if (name) {
      // 编辑计划
      this.isEditPlan = true
      this.title = '编辑计划'
      this.name = name
    }
  },
  mounted () {},
  methods: {
    /*
      监听保存动作按钮点击事件
    */
    async createPlan () {
      // 表单预验证
      if (!this.name) return alert('请输入名称')
      if (this.moves.length === 0) return alert('请添加动作')
      // 验证名称是否已使用
      // 发送请求
      const { data: res } = await addPlan(this.name, this.moves)
      if (res.meta.status !== 200) return console.error(res.meta.msg)
      // 显示对话框
      this.dialogTitle = '更新成功'
      this.dialogVisible = true
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
      this.$router.push({ path: '/part' })
      window.localStorage.setItem('isAddMove', true)
    },

    /**
     * 监听 从训练记录导入动作 按钮点击
    */
    addFromRecord () {
      this.$router.push({ path: 'add/record' })
    },

    /**
     * 删除单个动作
     */
    delelteMoveById (id) {
      this.moves = this.moves.filter(v => v.id !== id)
      window.localStorage.setItem('selectMoves', JSON.stringify(this.moves))
    },

    /**
     * 清除已选择动作
     */
    clearMoves () {
      // this.moves.length = 0
      this.moves = []
      // console.log(this.moves)
      window.localStorage.removeItem('selectMoves')
    },

    /**
     * 监听 保存按钮 点击事件 更新当前计划
     */
    async saveEdit () {
      if (this.moves.length === 0) return alert('请添加动作')
      console.log('saveEdit')
      const { data: res } = await updatePlan(this.name, this.moves)
      if (res.meta.status !== 200) return console.error(res.meta.msg)
      // 显示对话框
      this.dialogTitle = '更新成功'
      this.dialogVisible = true
    },

    /**
     * 监听 删除按钮 点击事件
     */
    handleDelete () {
      this.isEditPlan = false
      // 显示对话框
      this.dialogTitle = '删除计划'
      this.dialogContent = '确认删除'
      this.dialogVisible = true
    },

    /**
     * 监听 对话框确认按钮 点击事件
     */
    async onDialogConfirm () {
      if (this.dialogTitle !== '删除计划') {
        console.log('新建成功')
        // 清除缓存
        window.localStorage.removeItem('selectMoves')
      } else {
        console.log('确认删除')
        const { data: res } = await deletePlan(this.name)
        if (res.meta.status !== 200) return console.error(res.meta.msg)
      }
      this.dialogVisible = false
      window.localStorage.removeItem('planName')
      // 跳转页面
      this.$router.push({ path: '/plan' })
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
    form {
      padding: 10px 20px;
      .form-group {
        margin-bottom: 20px;
        label {
          margin-right: 30px;
        }
        input {
          font-size: 14px;
          background-color: var(--bgColor);
        }
      }
    }
    section .btn {
      margin: 30px 10px 0 10px;
    }
  }

  .move-list-wrap {
    // display: flex;
    padding: 0 20px;
    // 形成 BFC 否则会上边距塌陷
    overflow: hidden;
    .btn {
      margin: 0 5px 15px 0;
      padding: 5px 15px;
      font-size: 14px;
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

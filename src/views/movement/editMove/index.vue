<template>
  <div class="edit-move container">
    <ul class="edit-move-list">
      <li v-for="item in formData" :key="item.id" class="edit-item-wrap">
        <input type="text"
          class="edit-item"
          :id="item.id"
          v-model="item.value">
        <span class="btn btn-plain fr" @click="onDeleteItem(item)">删除</span>
      </li>
    </ul>
    <footer>
      <div class="btn btn-primary" @click="onSaveClick">完成修改</div>
      <div class="btn btn-plain" @click="goBack">取消修改</div>
    </footer>
    <!-- 更新动作对话框 -->
    <Dialog :title="title"
      :content="content"
      :okOnly="isUpdate"
      :dialogVisible="dialogVisible"
      @dialogClose="dialogVisible=false"
      @dialogConfirm="onDialogConfirm"
      ></Dialog>
    <!-- /更新动作对话框 -->
  </div>
</template>

<script>
import Dialog from '@/components/common/Dialog.vue'
import { updateMoves, getRecordCountById, deleteMoveById } from '@/network/movement.js'
import { EventBus } from '@/utils/eventBus.js'

export default {
  name: 'EditMove',
  data () {
    return {
      formData: [],
      id: null,
      title: '',
      content: '',
      isUpdate: false,
      dialogVisible: false
    }
  },
  components: { Dialog },
  created () {
    // const { pid } = this.$route.params
    EventBus.$on('moves', moves => {
      console.log('EventBus接收到事件')
      moves.map(v => {
        this.formData.push({
          id: v.id,
          value: v.name
        })
      })
    })
  },
  mounted () {},
  methods: {
    /**
     * 监听 move 对应的删除按钮点击事件
     */
    async onDeleteItem (item) {
      this.id = item.id
      const { data: res } = await getRecordCountById(item.id)
      if (res.meta.status !== 200) return console.error(res.meta.msg)
      const { count } = res.data
      if (count > 0) {
        // 有历史记录
        this.content = '该动作有训练记录，确认删除?'
      } else {
        // 没有历史记录
        this.content = '没有训练记录，可以删除'
      }
      this.title = `确认删除${item.value}?`
      this.dialogVisible = true
    },

    /**
     * 监听 保存 按钮点击事件 保存修改
     */
    async onSaveClick () {
      const { data: res } = await updateMoves(this.formData)
      if (res.meta.status !== 200) return console.error(res.meta.msg)
      // if (res.meta.status !== 200) {
      //   // 更新失败
      //   this.title = '更新失败'
      //   this.content = res.meta.msg
      //   this.dialogVisible = true
      // }
      // 更新成功
      this.title = '更新成功'
      this.content = ''
      this.isUpdate = true
      this.dialogVisible = true
      // this.$emit('onSaveClick', this.formData)
    },

    /**
     * 返回 选择动作 子路由
     */
    goBack () {
      const { pid, part } = this.$route.params
      this.$router.push({ path: `/movement/list/${pid}/${part}` })
    },

    /**
     * 监听 对话框 确认事件
     */
    async onDialogConfirm () {
      if (this.isUpdate) {
        // 更新模式
        this.dialogVisible = false
        return this.goBack()
      }
      // 删除模式
      const { data: res } = await deleteMoveById(this.id)
      if (res.meta.status !== 200) return console.error(res.meta.msg)
      // 删除成功
      // 关闭对话框
      this.dialogVisible = false
      // 更新当前视图的动作列表
      const index = this.formData.findIndex(v => v.id === this.id)
      this.formData.splice(index, 1)
    }
  },
  beforeDestroy () {
    EventBus.$off('moves')
  }
}
</script>

<style lang="less" scoped>
  .edit-move-list {
    padding: 30px 20px 10px 20px;
    .edit-item-wrap {
      margin: 10px 0;
      .edit-item {
        display: inline-block;
        width: 50vw;
        // padding: 5px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #ccc;
        font-size: 16px;
        background-color: #fff;
      }
      .btn {
        font-size: 14px;
        padding: 5px 15px;
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

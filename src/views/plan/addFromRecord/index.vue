<template>
  <div class="add-from-record container">
    <Header>
      <span class="btn-back iconfont icon-arrow-left-bold" @click="$router.go(-1)" slot="back"></span>
      <span slot="title">导入训练记录中的动作</span>
      <span slot="share" class="iconfont icon-share"></span>
    </Header>
    <div class="title">目前仅支持最近10次的训练记录</div>
    <div class="record-group-wrapper">
      <div class="group-item" v-for="(item, index) in records" :key=index>
        <DateGroup :group="item" :index=index @onGroupClick="handleGroupClick"></DateGroup>
      </div>
    </div>
    <Dialog :title="dialogTitle"
      :content="dialogContent"
      :dialogVisible="dialogVisible"
      @dialogClose="dialogVisible=false"
      @dialogConfirm="handleConfirm"
      ></Dialog>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue'
import Dialog from '@/components/common/Dialog.vue'
import DateGroup from './childComps/DateGroup.vue'

import { getRecentRecords } from '@/network/plan.js'
import groupBy from '@/utils/groupBy.js'

export default {
  name: 'AddFromRecord',
  data () {
    return {
      records: [],
      dialogTitle: '添加动作到计划',
      dialogContent: '',
      dialogVisible: false
    }
  },
  components: { Header, Dialog, DateGroup },
  created () {
    this.loadRecentRecords()
  },
  methods: {
    /**
     * 请求最近10次的训练记录
     */
    async loadRecentRecords () {
      const { data: res } = await getRecentRecords()
      // 按日期进行分组聚合
      this.records = groupBy(res.data, function (item) {
        return item.date
      })
    },

    /**
     * 选择按钮 点击
     */
    handleGroupClick (group, index) {
      this.index = index
      this.dialogContent = `您将添加${group[0].date}的动作到当前计划`
      this.dialogVisible = true
    },

    /**
     * 对话框 确认按钮 点击
     */
    handleConfirm () {
      const moves = this.records[this.index]
      window.localStorage.setItem('selectMoves', JSON.stringify(moves))
      this.$router.push('/plan/add')
    }
  }
}
</script>

<style lang="less" scoped>

</style>

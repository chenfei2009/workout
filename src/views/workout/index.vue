<template>
  <div class="workout container">
    <Header>
      <span class="btn-back iconfont icon-arrow-left-bold" @click="goBack" slot="back"></span>
      <!-- <span slot="title">{{date?'添加组数据':'训练中'}}</span> -->
      <span slot="title">{{date?(isEdit?'编辑组数据':'添加组数据'):'训练中'}}</span>
      <!-- <span slot="title">{{title}}</span> -->
      <span slot="share" class="iconfont icon-share"></span>
    </Header>
    <div class="main">
      <!-- 主体部分 -->
      <div class="main-title" v-if="date">添加 {{date}} 的训练记录</div>
      <RecordForm :move="move" ref="recordFormRef" />
      <!-- /主体部分 -->
      <!-- 历史训练记录 -->
      <div class="record-wrap" v-if="!date">
        <div class="record-title" v-if="recordList.length==0">还没有训练记录</div>
        <div class="record-title bold" v-if="recordList.length!==0">{{move.name}} 第{{move.count}}组 训练记录</div>
        <ul v-if="recordList.length!==0">
          <li v-for="(item, index) in recordList" :key="index" class="record-item">
            <span class="item-date">{{item.date.slice(0,10)}}</span>
            <!-- <span class="item-date">{{item.date}}</span> -->
            <span class="item-times" v-if="move.type !== 2">{{item.weight+item.unit+' * '+item.times+'次'}}</span>
            <span class="item-times" v-else>时长：{{item.timer}} 秒</span>
            <span class="item-break">休息：{{item.breaktime}} 秒</span>
          </li>
        </ul>
      </div>
      <!-- /历史训练记录 -->
    </div>
    <footer v-if="!date" class="new-footer">
      <div class="btn btn-plain" @click="onSubmit">完成本组训练</div>
    </footer>
    <footer v-else-if="date&&isEdit" class="new-footer">
      <div class="btn btn-plain" @click="saveEdit">保存</div>
    </footer>
    <ActionBar v-else
      @onNextClick="goNext"
      @onChangeClick="changeMove"
      @onFinishClick="finishWorkout"
      ></ActionBar>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue'
import ActionBar from '@/components/content/ActionBar.vue'
import RecordForm from './childComps/RecordForm.vue'

import { getRecordsByCount, getLastRecord, addRecord, putRecord } from '@/network/workout.js'
import formatDate from '@/utils/formatDate.js'
import formatNum from '@/utils/formatNum.js'

// import globalBus from '@/utils/globalBus'

export default {
  name: 'Workout',
  data () {
    return {
      move: {},
      date: '', // 用于区分是 训练中 还是 添加组/编辑组记录
      isEdit: false, // 用于区分 添加组 / 编辑组 记录
      recordId: null,
      recordList: [], // 当前组别的历史训练 detail 数据
      lastRecord: null
    }
  },

  components: { Header, RecordForm, ActionBar },

  computed: {
    // title () {
    //   if (!this.date) return '训练中'
    //   if (this.isEdit) return '编辑组记录'
    //   return '添加组记录'
    // }
  },

  created () {
    // 获取路由参数
    this.move = this.$route.params.move
    // 从缓存中获取 date
    this.date = localStorage.getItem('date') || ''
    // if (!this.date) {
    //   // 训练中模式
    //   if (this.move.type !== 2 && this.move.count > 1) {
    //     // type不为2 且 不是第1组 使用上一组数据
    //     return this.loadLastRecord()
    //   }
    //   // 根据 count 请求历史记录数据
    //   this.loadRecordsByCount()
    // }
  },

  mounted () {
    // 获取路由参数
    const { record } = this.$route.params
    if (record) {
      // 编辑组
      this.isEdit = true
      this.recordId = record.id
      console.log(record)
      this.$refs.recordFormRef.recordForm = Object.assign({}, record)
    } else {
      // this.move.count++
      this.move.count = (this.move.count ? this.move.count + 1 : 1)
      if (!this.date) {
        // 训练中模式
        if (this.move.type !== 2 && this.move.count > 1) {
          // type不为2 且 不是第1组 使用上一组数据
          return this.loadLastRecord()
        }
        // 根据 count 请求历史记录数据
        this.loadRecordsByCount()
      }
    }
  },

  activated () {
    console.log('进入activated')
  },

  methods: {
    // 网络请求相关方法
    /**
     * 请求当前组别对应的历史记录数据
     * @param {number} id 当前动作编号
     * @param {number} count 当前组别
     */
    async loadRecordsByCount () {
      const { id, count } = this.move
      const { data: res } = await getRecordsByCount(id, count)
      if (res.meta.status !== 200) return console.error(res.meta.msg)
      this.recordList.push(...res.data)
      if (this.move.count === 1 && this.recordList.length !== 0) {
        console.log('set last item of recordList to recordForm')
        this.recordList.forEach(v => {
          v.weight = formatNum(v.weight, 1)
        })
        // this.$refs.recordFormRef.recordForm = this.recordList[0]
        this.$refs.recordFormRef.recordForm = Object.assign({}, this.recordList[0])
      }
    },

    /**
     * 请求上一组记录数据
     * @param {number} id 当前动作编号
     * @param {number} count 当前组别
     */
    async loadLastRecord () {
      let { id, count } = this.move
      count = count - 1
      // const params = { name: this.item.name, count: this.item.count }
      const { data: res } = await getLastRecord(id, count)
      if (res.meta.status !== 200) return console.error(res.meta.msg)
      this.lastRecord = res.data[0] || null
      if (this.lastRecord) {
        console.log('set lastRecord to recordForm')
        this.lastRecord.weight = formatNum(this.lastRecord.weight, 1)
        this.$refs.recordFormRef.recordForm = Object.assign({}, this.lastRecord)
      }
    },

    /**
     * 提交训练记录数据
     * @param {Object} record 当前训练记录
     */
    async createRecord () {
      const record = this.initParams()
      if (!record) return console.error('error')
      const { data: res } = await addRecord(record)
      if (res.meta.status !== 200) return console.error('error')
      return res.data
    },

    /**
     * 更新训练记录数据
     * @param {Object} record 当前训练记录
     */
    async updateRecord () {
      const record = this.initParams()
      console.log(record)
      if (!record) return console.error('error')
      const { data: res } = await putRecord(record, this.recordId)
      if (res.meta.status !== 200) return console.error('error')
      return res.data
    },

    initParams () {
      const recordFormRef = this.$refs.recordFormRef
      if (recordFormRef.counter) {
        clearInterval(recordFormRef.counter)
        recordFormRef.counter = null
      }
      const { id, count, type } = this.move
      const { unit, weight, times, timer, distance } = recordFormRef.recordForm
      // 表单预验证
      if (times === 0 && type !== 2) {
        return alert('请输入次数')
      } else if (timer === 0 && type === 2) {
        return alert('请输入时长')
      }
      const date = this.date || formatDate(new Date(), 'yyyy-MM-dd')
      const volume = (weight === 0 ? times : weight * times)
      const record = { id, count, type, unit, weight, times, volume, date, timer, distance }
      return record
    },

    // 事件监听相关方法
    /**
     * 监听点击事件 新增训练记录
     */
    async onSubmit () {
      const { recordId } = await this.createRecord()
      // 跳转到组间休息页面
      const move = this.move
      const recordForm = this.$refs.recordFormRef.recordForm
      this.$router.push({
        name: 'Break',
        params: { move, recordForm, recordId }
      })
    },

    /**
     * 监听 返回 按钮点击
     */
    goBack () {
      // 如果是 编辑组记录 状态，返回记录详情页
      if (this.isEdit) {
        return this.$router.push({
          name: 'Record',
          query: { date: this.date }
        })
      }
      // 返回选择动作页面
      const { pid, part } = this.move
      this.$router.push({ path: `/movement/list/${pid}/${part}` })
    },

    /**
     * 监听 下一组 按钮点击
     */
    async goNext () {
      // 提交数据 --> 弹出提示 --> count++
      const res = await this.createRecord()
      if (res) return this.move.count++
    },

    /**
     * 监听 换动作 按钮点击
     */
    async changeMove () {
      // 提交数据 --> 弹出提示
      // 回到上一级页面 携带参数
      const res = await this.createRecord()
      if (res) return this.goBack()
    },

    /**
     * 监听 完成 按钮点击
     */
    async finishWorkout () {
      // 提交数据 --> 弹出提示
      const res = await this.createRecord()
      // 回到训练记录页面
      if (res) {
        return this.$router.push({
          name: 'Record',
          query: { date: this.date }
        })
      }
    },

    /**
     * 监听 保存修改 按钮点击
     */
    async saveEdit () {
      const res = await this.updateRecord()
      if (res) {
        return this.$router.push({
          name: 'Record',
          query: { date: this.date }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .main {
    overflow: hidden;
    .main-title {
      text-align: center;
      margin: 15px 0;
    }
  }

  .card {
    .card-item {
      margin: 0 0 20px 10px;
    }
    .card-item && :first-child {
      color: #ccc;
    }
    :last-child {
      margin-bottom: 0;
    }
    :nth-child(n+4) {
      padding-left: 50px;
    }
    .form-group {
      label {
        margin-right: 20px;
      }
    }
  }

  .record-wrap {
    margin: 20px 10px;
    font-size: 14px;
    .record-title {
      margin-bottom: 10px;
    }
    .record-item {
      display: flex;
      .item-date {
        flex: 4;
      }
      .item-times {
        flex: 3;
      }
      .item-break {
        flex: 3;
      }
    }
  }

  /* footer 当前日期 新增记录 */
  .new-footer {
    .btn {
      width: ~"calc(100vw - 20px)";
      margin: 10px;
    }
  }
</style>

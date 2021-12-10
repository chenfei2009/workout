<template>
  <div class="record container">
    <Header>
      <span v-if="$route.query.date" class="btn-back iconfont icon-arrow-left-bold" @click="goBack" slot="back"></span>
      <span slot="title">{{$route.query.date ? date+'训练记录' : '完成训练'}}</span>
      <span slot="share" class="iconfont icon-share"></span>
    </Header>
    <div class="main">
      <!-- tabs组件 -->
      <TabControl :titles = titles @tabClick="handleTabClick">
      </TabControl>
      <!-- /tabs组件 -->
      <!-- 训练内容 -->
      <section v-if="currentIndex === 0">
        <!-- 修改 结束 按钮 -->
        <div class="btn-wrap">
          <div class="btn btn-primary fr" @click="isEdit=!isEdit">
            {{isEdit ? '结束' : '修改'}}
          </div>
        </div>
        <!-- /修改 结束 按钮 -->
        <div class="scroll" ref="scrollRef">
          <!-- 训练总数据 -->
          <Summation :start="start" :end="end" :volumes="volumes"></Summation>
          <!-- /训练总数据 -->
          <!-- 训练记录列表 -->
          <div class="record-list-wrap">
            <RecordGroup v-for="(item, index) in recordList"
              :key="index"
              :recordItem="item"
              :isShow="isEdit"
              @deleteItem="handleDeleteItem"
              @editItem="handleEditItem">
            </RecordGroup>
          </div>
          <!-- /训练记录列表 -->
        </div>
      </section>
      <!-- /训练内容 -->
      <!-- 训练心得 -->
      <section v-else-if="currentIndex === 1">
        <form class="comment-form" action="#">
          <textarea name="" id="" cols="30" rows="10">记录本次训练心得</textarea>
          <div class="btn">保存</div>
        </form>
      </section>
      <!-- /训练心得 -->
      <!-- 身体数据 -->
      <section v-else>
        <BodyData :formData="formData" @onSubmitData="handleSubmitData"></BodyData>
      </section>
      <!-- /身体数据 -->
      <footer>
        <div class="btn btn-plain" v-if="!isEdit">分享训练记录</div>
        <div class="btn btn-plain" v-else @click="addRecord">新增记录</div>
        <div class="btn btn-primary" @click="goBack">回到日历</div>
      </footer>
    </div>
    <Dialog content="确认删除改组?"
      :dialogVisible="dialogVisible"
      @dialogClose="dialogVisible=false"
      @dialogConfirm="handleConfirm"
      ></Dialog>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue'
import TabControl from '@/components/content/TabControl.vue'
import Dialog from '@/components/common/Dialog.vue'

import RecordGroup from './childComps/RecordGroup.vue'
import Summation from './childComps/Summation.vue'
import BodyData from './childComps/BodyData.vue'

import { getRecordsByDate, getVolumeByDate, deleteRecordById } from '@/network/record.js'
import formatDate from '@/utils/formatDate.js'
// import formatTimer from '@/utils/formatTimer.js'

export default {
  name: 'Record',
  components: {
    Header, TabControl, Dialog, RecordGroup, Summation, BodyData
  },
  data () {
    return {
      date: '', // 格式化的当前日期
      titles: ['训练内容', '训练心得', '身体数据'],
      currentIndex: 0,
      start: null, // 开始时间
      end: null,
      // duration: '', // 用时
      recordList: [],
      volumes: [],
      isEdit: false, // 是否为编辑状态
      scrollY: null, // 滚动元素的位置
      dialogVisible: false,
      detailId: null, // 训练详情条目的 id
      formData: { // 身体数据表单
        height: null,
        weight: null,
        bodyFat: null
      }
    }
  },
  computed: {
    totalVolume () {
      return this.volumeList.reduce((acc, currentValue) => {
        return acc + currentValue.volume
      }, 0)
    }
  },
  created () {
    console.log('created执行')
    // 获取路由参数
    this.date = this.$route.query.date || formatDate(new Date(), 'yyyy-MM-dd')
    // this.isEdit = this.$route.params.isEdit || false
    this.loadRecordsByDate()
    this.loadVolumeByDate()
  },
  mounted () {
    console.log('mounted')
  },
  activated () {
    // console.log('activated')
    // console.log(this.isEdit)
    this.$refs.scrollRef.scrollTop = this.scrollY
  },
  beforeRouteEnter (to, from, next) {
    next(
      vm => { vm.scrollY = to.meta.scrollY }
    )
  },
  beforeRouteLeave (to, from, next) {
    if (to.path.includes('part')) {
      console.log('使用缓存')
      from.meta.keepAlive = true
      // 保存滚动条元素 div 的 scrollTop 值
      from.meta.scrollY = this.$refs.scrollRef.scrollTop
    } else {
      console.log('不使用缓存')
      // from.meta.keepAlive = false
      console.log('清除缓存')
      this.$destroy()
    }
    next()
  },
  methods: {
    // 网络请求相关方法
    /**
     * 请求日期对应的训练记录数据
     */
    async loadRecordsByDate () {
      const { data: res } = await getRecordsByDate(this.date)
      if (res.meta.status !== 200) return console.error(res.meta.msg)
      this.recordList = res.data[0]
      const detail = res.data[1]
      for (let i = 0; i < this.recordList.length; i++) {
        this.recordList[i].detail = []
        for (let j = 0; j < detail.length; j++) {
          if (detail[j].move_id === this.recordList[i].id) {
            this.recordList[i].detail.push(detail[j])
          }
        }
      }
    },

    /**
     * 请求日期对应的训练容量数据
     */
    async loadVolumeByDate () {
      const { data: res } = await getVolumeByDate(this.date)
      if (res.meta.status !== 200) return console.error(res.meta.msg)
      this.volumes.push(...res.data.volumes)
      this.start = res.data.start
      this.end = res.data.end
    },

    /**
     * 请求删除的训练详情数据
     */
    async deleteRecord () {
      const { data: res } = await deleteRecordById(this.detailId)
      if (res.meta.status !== 200) return console.error(res.meta.msg)
      console.log(res.data)
      this.loadRecordsByDate()
    },

    // 事件监听相关方法
    /**
     * 监听 tab 选项卡的点击
     */
    handleTabClick (index) {
      this.currentIndex = index
    },

    /**
     * 监听 新增记录 按钮的点击
     */
    addRecord () {
      // globalBus.$emit('addRecord', this.date)
      // localStorage.setItem('date', this.date)
      this.$router.push({ name: 'Part' })
    },

    /**
     * 监听 身体数据表单 保存按钮点击
     * 提交 formData 数据
     */
    handleSubmitData () {
      // 表单预校验 全为空是弹出错误提示
      const { height, weight, bodyFat } = this.formData
      if (!height && !weight && !bodyFat) return console.error('请输入数据')
      // 提交数据
      console.log(this.formData)
    },

    /**
     * 监听顶部 返回按钮 和底部 回到日历按钮 的点击
     */
    goBack () {
      localStorage.clear('date')
      this.$router.push({ name: 'Cale' })
    },

    /**
     * 监听训练记录对应删除按钮的点击
     */
    handleDeleteItem (detailId) {
      this.detailId = detailId
      // 弹出确认删除对话框
      this.dialogVisible = true
    },

    /**
     * 监听 对话框 确认删除事件
     */
    handleConfirm () {
      // 发送请求，删除对应条目
      this.deleteRecord()
      // 关闭确认删除对话框
      this.dialogVisible = false
    },

    handleEditItem (item) {
      console.log(item)
    }
  }
}
</script>

<style scoped lang="less">
  .main {
    padding: 0 15px;
  }

  .btn-wrap {
    overflow: hidden;
    .btn {
      padding: 5px 15px;
      margin: 10px 0;
      font-size: 14px;
    }
  }

  .scroll {
    // height: 400px;
    height: ~"calc(100vh - 250px)";
    overflow-y: scroll;
  }

  .record-list-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    // .record-item:nth-child(even) {
    //   margin-left: ~"calc(12vw - 30px)";
    // }
  }

  .comment-form {
    margin: 10px 0;
    width: 100%;
    textarea {
      width: 100%;
      padding: 15px;
    }
  }

  footer {
    // display: fixed;
    width: ~"calc(100vw - 30px)";
    padding-bottom: 10px;
    .btn {
      margin-top: 10px;
    }
  }
</style>

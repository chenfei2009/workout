<template>
  <div class="cale">
    <Header>
      <span slot="title">训练日历</span>
      <span slot="share" class="iconfont icon-share"></span>
    </Header>
    <div class="main">
      <!-- 日历组件 -->
      <Calendar ref="calendarRef"
        :monthData=partData
        @dateItemClick="dateItemClick"
        @dateChange="handleDateChange">
      </Calendar>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue'
import Calendar from '@/components/common/Calendar.vue'

import { getPartListByDate } from '@/network/cale.js'
import formatDate from '@/utils/formatDate.js'

export default {
  name: 'Cale',
  components: {
    Header,
    Calendar
  },
  data () {
    return {
      partData: [] // 训练记录数据 包括 date part
    }
  },
  mounted () {
    this.loadPartRecord()
  },
  beforeRouteLeave (to, from, next) {
    if (to.path.includes('record')) {
      to.meta.keepAlive = false
    }
    next()
  },
  methods: {
    // 网络请求相关方法
    /**
     * 查询当前日期范围部位记录数据
     * @param {string} startDate 起始日期
     * @param {string} endDate 结束日期
     */
    async loadPartRecord () {
      // 格式化请求参数
      const dateList = this.$refs.calendarRef.dateList
      let startDate = dateList[0].date
      let endDate = dateList[dateList.length - 1].date
      startDate = formatDate(startDate, 'yyyy-MM-dd')
      endDate = formatDate(endDate, 'yyyy-MM-dd')
      const { data: res } = await getPartListByDate(startDate, endDate)
      this.partData = res.data
    },

    // 事件监听相关方法
    /*
      监听日期点击事件
    */
    dateItemClick (date) {
      date = formatDate(date, 'yyyy-MM-dd')
      localStorage.setItem('date', date)
      // 跳转页面
      // console.log('参数', dateStr)
      this.$router.push({
        name: 'Record',
        query: { date }
      })
    },
    // 网络请求相关方法
    /*
      监听日期切换事件
    */
    handleDateChange () {
      // 切换日期后，重新请求数据
      this.loadPartRecord()
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
    // padding-top: 150px;
  }
</style>

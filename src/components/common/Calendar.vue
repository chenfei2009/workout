<template>
  <div class="carlendar">
    <!-- 标题部分 -->
    <div class="cale-header">
      <span class="arrow arrow-left" @click="getPrevMonth"></span>
      <span class="header-text">{{currentYear}}年{{currentMonth + 1}}月</span>
      <span class="arrow arrow-right" @click="getNextMonth"></span>
    </div>
    <!-- /标题部分 -->
    <!-- 主体部分 -->
    <div class="cale-main">
      <ul class="cale-week-list">
        <li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li><li>日</li>
      </ul>
      <ul class="cale-date-list">
        <!-- 动态绑定样式 -->
        <li v-for="(item, index) in dateList"
          :key=index
          :class="dateItemClass(item.date)"
          class="date-item center"
          @click="dateItemClick(item.date)">
          <span>{{item.date.getDate()}}</span>
          <!-- <div>{{MonthDataItem(item.date)}}</div> -->
          <ul>
            <li v-for="(part, index) in monthDataItem(item.date)"
              :key="index"
              class="month-data-item"
              :style="monthDataItemStyle(part)"
              >{{part}}</li>
          </ul>
          <slot></slot>
        </li>
      </ul>
    </div>
    <!-- /主体部分 -->
  </div>
</template>

<script>
import formatDate from '@/utils/formatDate.js'

export default {
  name: 'Carlendar',
  data () {
    return {
      // initDate: '',
      currentYear: '',
      currentMonth: '',
      currentDay: '',
      currentWeek: null, // 星期
      // mouthLength: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      dateList: []
      // isCurrentMonth: true,
      // isCurrentDay: false
    }
  },
  props: {
    monthData: {
      type: Array
    }
  },
  computed: {
    // dateItem 的样式
    dateItemClass () {
      return function (date) {
        const initDate = new Date()
        return {
          'not-current-month': date.getMonth() !== this.currentMonth,
          'current-day': date.getDate() === initDate.getDate() && date.getMonth() === initDate.getMonth()
        }
      }
    },
    // monthDataItem 对应的部位列表
    monthDataItem () {
      return function (date) {
        const dateStr = formatDate(date, 'yyyy-MM-dd')
        const partDataItem = []
        this.monthData.forEach(v => {
          // console.log(v.date, dateStr)
          // return 123
          if (v.date === dateStr) partDataItem.push(v.part)
        })
        return partDataItem
      }
    },
    // monthDataItem 的样式
    monthDataItemStyle () {
      return function (partItem) {
        switch (partItem) {
          case '胸部':
            return { backgroundColor: '#6b9d46' }
          case '背部':
            return { backgroundColor: '#f94143' }
          case '臀腿':
            return { backgroundColor: '#216b8b' }
          case '二头':
            return { backgroundColor: '#f9c650' }
          case '三头':
            return { backgroundColor: '#f9961e' }
          case '肩部':
            return { backgroundColor: '#e46ba4' }
          case '核心':
            return { backgroundColor: '#53ba9c' }
          case '有氧':
            return { backgroundColor: '#53ba9c' }
          default:
            break
        }
      }
    }
  },
  created () {
    this.getInitDate()
    this.setDateList()
    // this.getDayList(this.mouthLength[this.currentMonth])
  },
  mounted () {},
  methods: {
    /**
     * 设置初始化日期
     */
    getInitDate () {
      // 获取当前的年 月 日
      const initDate = new Date()
      this.currentYear = initDate.getFullYear() // 获取完整的年份(4位,1970-????)
      this.currentMonth = initDate.getMonth() // 获取当前月份(0-11,0代表1月)
      this.currentDay = initDate.getDate()
      this.currentWeek = initDate.getDay() === '0' ? initDate.getDay() - 1 : initDate.getDay() + 6 // 获取当前星期X(0-6,0代表星期天)
    },

    /**
     * 设置日期列表
     */
    setDateList () {
      // 获取当月的第一天是星期几
      const currentFirstDay = new Date(this.currentYear, this.currentMonth, 1)
      const weekDay = currentFirstDay.getDay() === 0 ? 7 : currentFirstDay.getDay()
      // 获取列表初始日期
      // 用当月的第一天减去 周几前面几天 这样就能得到上个月开始的天数
      // 当前月1号是周三，那么周一就是上个月的最后两天
      const startTime = currentFirstDay - (weekDay - 1) * 24 * 60 * 60 * 1000
      // 清空之前的日期列表
      this.dateList.length = 0
      // 当前日期列表的总长度
      // const length = weekDay <= 5 ? 35 : 42
      // 生成当前日期列表
      for (let i = 0; i < 42; i++) {
        this.dateList.push({
          date: new Date(startTime + i * 24 * 60 * 60 * 1000)
          // year: this.currentYear,
          // month: this.currentMonth, // month 数据有问题
          // day: new Date(startTime + i * 24 * 60 * 60 * 1000).getDate()
        })
      }
    },

    /**
     * 跳转到前一个月
     */
    getPrevMonth () {
      if (this.currentMonth === 0) {
        this.currentMonth = 11
        this.currentYear--
      } else {
        this.currentMonth--
      }
      this.setDateList()
      this.$emit('dateChange')
    },

    /**
     * 跳转到后一个月
     */
    getNextMonth () {
      if (this.currentMonth === 11) {
        this.currentMonth = 0
        this.currentYear++
      } else {
        this.currentMonth++
      }
      this.setDateList()
      this.$emit('dateChange')
    },

    /**
     * 日期元素点击事件
     */
    dateItemClick (date) {
      this.$emit('dateItemClick', date)
    }
  }
}
</script>

<style lang="less" scoped>
  .cale-header {
    text-align: center;
    .header-text {
      margin: 0 10px;
    }
  }
  .cale-week-list {
    display: flex;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    li {
      flex: 1;
      text-align: center;
    }
  }
  .cale-date-list {
    display: flex;
    flex-wrap: wrap;
    .date-item {
      width: 14.2857vw;
      padding: 10px 0;
      /* 部位数据 */
      .month-data-item {
        color: #fff;
        font-size: 14px
      }
    }
    .not-current-month {
      color: #ccc;
    }
    .current-day {
      color: red;
      background-color: #fff;
    }
  }
  .arrow {
    border: solid black;
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 4px;
  }
  .arrow-left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }
  .arrow-right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
</style>

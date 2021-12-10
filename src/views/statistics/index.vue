<template>
  <div class="record container">
    <Header>
      <span class="btn-back iconfont icon-arrow-left-bold" @click="$router.push({name: 'Profile'})" slot="back"></span>
      <span slot="title">{{dateStr}}训练记录</span>
      <span slot="share" class="iconfont icon-share"></span>
    </Header>
    <div class="main">
      <!-- tabs组件 -->
      <TabControl :titles=titles @tabClick="handleTabClick">
      </TabControl>
      <!-- /tabs组件 -->
      <div class="btn-wrap">
        <div v-for="item in timeOption"
          :key="item.id"
          :class="{active: item.isActive}"
          class="btn btn-primary"
          @click="handleTimeChange(item)"
          >{{item.label}}</div>
      </div>
      <!-- 部位分布 -->
      <section v-if="currentIndex === 0">
        <PartChart ref="partChart"></PartChart>
      </section>
      <!-- /部位分布 -->
      <!-- 训练量趋势 -->
      <section v-else-if="currentIndex === 1">
        <VolumeChart ref="volumeChart"></VolumeChart>
      </section>
      <!-- /训练量趋势 -->
      <!-- 身体数据 -->
      <section v-else>
        <MoveChart ref="moveChart"></MoveChart>
      </section>
      <!-- /身体数据 -->
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue'
import TabControl from '@/components/content/TabControl.vue'
import PartChart from './childComps/PartChart.vue'
import VolumeChart from './childComps/VolumeChart.vue'
import MoveChart from './childComps/MoveChart.vue'

// import { getRecordDetailByDate } from '@/network/record.js'
import { getPartDataByRange, getVolumeDataByRange, getMoveDataByRange } from '@/network/stat.js'

export default {
  name: 'Statistics',
  components: {
    Header, TabControl, PartChart, VolumeChart, MoveChart
  },
  data () {
    return {
      dateStr: '',
      titles: ['部位分布', '训练量趋势', '动作排行'],
      currentIndex: 0,
      currentRange: 7,
      timeOption: [
        { id: 0, label: '近7天', isActive: true, range: 7 },
        { id: 1, label: '近30天', isActive: false, range: 30 },
        { id: 2, label: '近90天', isActive: false, range: 90 }
      ]
    }
  },
  computed: {},
  created () {
    // 获取路由参数
    // this.dateStr = this.$route.params.dateStr
    // this.loadRecordDetailByDate()
    this.loadPartDataByRange(this.currentRange)
  },
  mounted () {
    // this.$refs.partChart.initChart()
  },
  methods: {
    // 网络请求相关方法
    /*
      查询 每个部位的训练天数
      @params 当前范围 range 7 30 90 近7天 近30天 近90天
    */
    async loadPartDataByRange (range) {
      const { data: res } = await getPartDataByRange(range)
      if (res.meta.status !== 200) return console.error(res.meta.msg)
      this.$refs.partChart.partData.series[0].data = res.data
    },

    /*
      查询 每个日期的训练容量
      @params 当前范围 range 7 30 90 近7天 近30天 近90天
    */
    async loadVolumeDataByRange (range) {
      const { data: res } = await getVolumeDataByRange(range)
      if (res.meta.status !== 200) return console.error(res.meta.msg)
      // console.log(res.data)
      // 需要把 name 和 value 转化为两个数组
      const xAxisData = []
      const seriesData = []
      res.data.map(v => {
        xAxisData.push(v.date)
        seriesData.push(v.volume)
      })
      this.$refs.volumeChart.volumeData.xAxis.data = xAxisData
      this.$refs.volumeChart.volumeData.series[0].data = seriesData
    },

    /*
      查询 每个动作的训练频次
      @params 当前范围 range 7 30 90 近7天 近30天 近90天
    */
    async loadMoveDataByRange (range) {
      const { data: res } = await getMoveDataByRange(range)
      if (res.meta.status !== 200) return console.error(res.meta.msg)
      // console.log(res.data)
      // 需要把 name 和 value 转化为两个数组
      const xAxisData = []
      const seriesData = []
      res.data.map(v => {
        xAxisData.push(v.name)
        seriesData.push(v.value)
      })
      this.$refs.moveChart.moveData.xAxis.data = xAxisData
      this.$refs.moveChart.moveData.series[0].data = seriesData
    },

    loadData (index) {
      switch (index) {
        case 0:
          return this.loadPartDataByRange(this.currentRange)
        case 1:
          return this.loadVolumeDataByRange(this.currentRange)
        case 2:
          return this.loadMoveDataByRange(this.currentRange)
        default:
          break
      }
    },

    // 事件监听相关方法
    handleTabClick (index) {
      this.currentIndex = index
      this.currentRange = 7
      this.timeOption.map(v => {
        v.isActive = (v.id === 0)
      })
      this.loadData(index)
    },

    handleTimeChange (item) {
      this.timeOption.map(v => {
        v.isActive = (v.id === item.id)
      })
      this.currentRange = item.range
      this.loadData(this.currentIndex)
    }
  }
}
</script>

<style scoped lang="less">
  .main {
    width: 100vw;
    padding: 0 15px;
  }
  /* 时间筛选按钮组 */
  .btn-wrap {
    display: flex;
    margin-top: 15px;
    .btn {
      padding: 5px 15px;
      margin: 5px;
      font-size: 12px;
      border-radius: 12px;
    }
    .active {
      color: #fff;
      background-color: var(--themeColor);
    }
  }
  .figure-wrap {
    display: flex;
    justify-content: center;
  }
  .tips {
    font-size: 12px;
  }
</style>

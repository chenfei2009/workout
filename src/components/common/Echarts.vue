<template>
  <div id="myChart" :style=style></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Echarts',
  data () {
    return {
      chart: null
    }
  },
  props: {
    chartData: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    style () {
      return {
        width: '100vw',
        height: '80vw' // 'calc(100vw - 50px)'
      }
    }
  },
  watch: {
    // 观察option的变化
    chartData: {
      handler (newVal, oldVal) {
        if (this.chart) {
          if (newVal) {
            this.chart.setOption(newVal)
          } else {
            this.chart.setOption(oldVal)
          }
        } else {
          this.initChart()
        }
      },
      deep: true // 对象内部属性的监听，关键
    }
  },
  mounted () {
    // console.log(this.chartData)
    this.initChart()
  },
  methods: {
    initChart () {
      if (this.chart !== null && this.chart !== '' && this.chart !== undefined) {
        this.chart.dispose()
      }
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      this.chart.setOption(this.chartData)
      // resize 报错
      // window.addEventListener('resize', this.chart.resize)
    }
  }
}
</script>

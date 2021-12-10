<template>
  <div class="volume-chart-wrap">
    <div class="figure-wrap">
      <Echarts :chartData="volumeData" ref="partChart"></Echarts>
    </div>
    <div class="tips">注：总训练量 = 单次重量 x 次数 x 组数 (输入重量为0的训练动作，总训练量 = 次数 x 组数)</div>
  </div>
</template>

<script>
import Echarts from '@/components/common/Echarts.vue'

export default {
  name: 'VolumeChart',
  components: {
    Echarts
  },
  data () {
    return {
      volumeData: {
        title: {},
        tooltip: {},
        xAxis: {
          data: [],
          axisLabel: {
            show: true,
            color: '#7b7b98',
            interval: 0,
            rotate: 45,
            fontSize: 10
          }
          // nameRotate: 90 // 坐标轴名字旋转
        },
        yAxis: {
          axisLabel: {
            normal: {
              show: true
            }
          }
        },
        legend: {
          type: 'plain', // 图列类型，默认为 'plain'
          top: '1%', // 图列相对容器的位置 top\bottom\left\right
          data: [ // 图列内容
            {
              name: '动作'
            }
          ]
        },
        series: [{
          name: '动作',
          type: 'line',
          data: [],
          label: {
            show: true,
            position: 'top' // 柱状图头顶显示数据
          },
          avoidLabelOverlap: true // 是否启用防止标签重叠策略
        }]
      }
    }
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
  .figure-wrap {
    display: flex;
    justify-content: center;
  }
  .tips {
    font-size: 12px;
  }
</style>

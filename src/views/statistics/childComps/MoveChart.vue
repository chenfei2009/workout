<template>
  <div class="move-chart-wrap">
    <div class="figure-wrap">
      <Echarts :chartData="moveData"></Echarts>
    </div>
    <div class="tips">注：统计的次数为动作的训练天数，某一天训练过某一动作，则算作该动作训练一次</div>
  </div>
</template>

<script>
import Echarts from '@/components/common/Echarts.vue'

export default {
  name: 'MoveChart',
  components: {
    Echarts
  },
  data () {
    return {
      moveData: {
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
          type: 'bar',
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

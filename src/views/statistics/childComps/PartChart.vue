<template>
  <div class="part-chart-wrap">
    <div class="figure-wrap">
      <Echarts :chartData="partData" ref="partChart"></Echarts>
    </div>
    <div class="tips">注：统计值为部位的训练天数，某一天训练过某一部位，则算作该部位训练一次</div>
  </div>
</template>

<script>
import Echarts from '@/components/common/Echarts.vue'

export default {
  name: 'PartChart',
  components: {
    Echarts
  },
  data () {
    return {
      partData: {
        legend: {
          bottom: '5%', // 组件离容器的距离
          left: 'center',
          // width: 'auto', // 图例组件的宽度
          // padding: 2, // 图例内边距
          icon: 'circle', // 形状类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
          itemWidth: 16,
          textStyle: {
            fontSize: 11, // 文字的字体大小
            padding: 0
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie', // 设置图表类型为饼图
            // radius: '55%', // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度
            radius: ['45%', '65%'], // 圆环,第一个内圆半径,第二个外圆半径
            center: ['50%', '45%'], // 这个属性设置图的上下左右的位置
            avoidLabelOverlap: true, // 是否启用防止标签重叠策略
            // hoverAnimation: false, // 是否开启 hover 在扇区上的放大动画效果
            silent: true, // 图形是否不响应和触发鼠标事件
            label: {
              show: true,
              // position: 'center',
              formatter: '{d}%'
            },
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: '40',
            //     fontWeight: 'bold'
            //   }
            // },
            labelLine: {
              show: true,
              smooth: 0.5
            },
            data: [] // 数据数组，name 为数据项名称，value 为数据项值
          }
        ]
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

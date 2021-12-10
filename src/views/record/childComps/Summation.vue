<template>
  <!-- 训练总数据 -->
  <Card class="record-count-wrap">
    <div class="card-title">开始于: {{formatStart}}</div>
    <div class="card-main">
      <div class="main-item">
        <span class="item-count">{{duration}}</span>
        <span class="item-text">用时</span>
      </div>
      <div class="main-item">
        <span class="item-count">{{totalVolume}}</span>
        <span class="item-text">总重量(KG)</span>
      </div>
    </div>
    <div class="card-bottom">
      <span v-for="item in volumes" :key="item.part" class="part">
        {{item.part+': '+item.volume+'kg'}}
      </span>
    </div>
  </Card>
  <!-- /训练总数据 -->
</template>

<script>
import Card from '@/components/common/Card.vue'

import formatDate from '@/utils/formatDate.js'
import formatTimer from '@/utils/formatTimer.js'
// import formatWeight from '@/utils/formatWeight.js'

export default {
  name: 'Summation',
  components: { Card },
  props: {
    start: {
      type: String
    },
    end: {
      type: String
    },
    volumes: {
      type: Array
    }
  },
  data () {
    return {}
  },
  computed: {
    totalVolume () {
      return this.volumes.reduce((acc, currentValue) => {
        return acc + currentValue.volume
      }, 0)
    },
    formatStart () {
      return formatDate(new Date(this.start), 'yyyy-MM-dd hh:mm:ss')
    },
    duration () {
      const duration = new Date(this.end).getTime() - new Date(this.start).getTime()
      return formatTimer(duration / 1000)
    }
  }
}
</script>

<style lang="less" scoped>
  .record-count-wrap {
    font-size: 14px;
    padding: 15px;
    margin: 0;
    .card-main {
      display: flex;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      margin: 10px 0;
      padding: 10px 0;
      .main-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        .item-count {
          font-size: 20px;
          color: var(--themeColor);
          margin-bottom: 5px;
        }
      }
    }
    .card-bottom {
      .part {
        margin-right: 5px;
      }
    }
  }
</style>

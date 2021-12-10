<template>
  <div class="part container">
    <Header>
      <span class="btn-back iconfont icon-arrow-left-bold" @click="goBack" slot="back"></span>
      <span slot="share" class="iconfont icon-share"></span>
      <span slot="title">选择部位</span>
    </Header>
    <div class="main">
      <div class="title">选择部位</div>
      <div class="part-list">
        <PartItem v-for="item in partList" :key="item.pid" :partItem="item">
          <!-- <img src="@/assets/img/gym_icon.jpg" alt="" slot="item-icon"> -->
          <span slot="item-text">{{item.part}}</span>
        </PartItem>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue'

import PartItem from './childComps/PartItem.vue'

export default {
  name: 'Part',
  data () {
    return {
      // date: '',
      partList: [
        { pid: 0, part: '胸部' },
        { pid: 1, part: '背部' },
        { pid: 2, part: '肩部' },
        { pid: 3, part: '臀腿' },
        { pid: 4, part: '二头' },
        { pid: 5, part: '三头' },
        { pid: 6, part: '核心' },
        { pid: 7, part: '有氧' }
      ]
    }
  },
  components: {
    Header,
    PartItem
  },
  created () {
    // this.date = localStorage.getItem('date') || ''
  },
  beforeRouteLeave (to, from, next) {
    if (to.path.includes('record')) {
      to.meta.keepAlive = true
    }
    next()
  },
  methods: {
    goBack () {
      const date = localStorage.getItem('date') || ''
      const isAddMove = localStorage.getItem('isAddMove') || false
      if (date) {
        // localStorage.clear('date')
        return this.$router.push({
          name: 'Record',
          query: { date }
        })
      } else if (isAddMove) {
        localStorage.removeItem('isAddMove')
        return this.$router.push({ path: 'plan/add' })
      }
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style lang="less" scoped>
  .part {
    // 形成 BFC 否则会上边距塌陷
    overflow: hidden;
    .title {
      text-align: center;
      margin: 20px 0;
    }
    .part-list {
      display: flex;
      flex-wrap: wrap;
      padding: 0 10px;
    }
  }
</style>

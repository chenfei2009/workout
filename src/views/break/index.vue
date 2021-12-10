<template>
  <div class="break container">
    <Header>
      <span class="iconfont icon-arrow-left-bold" @click="goNext" slot="back"></span>
      <span slot="title">训练中</span>
      <span slot="share" class="iconfont icon-share"></span>
    </Header>
    <div class="main">
      <div class="break-info-wrap center">
        <div>已完成：{{move.name}} 第 {{move.count}} 组</div>
        <div v-if="move.type===2">{{recordForm.timer | timerFilter}}</div>
        <div v-else>{{recordForm.weight+recordForm.unit+' x '+recordForm.times+' 次'}}</div>
        <div class="time-counter bold">{{timeCounter}}</div>
      </div>
      <Card>
        <form action="#">
          <textarea name="comment" value="" cols="30" rows="10" placeholder="备注" v-model="recordForm.comment"></textarea>
          <div class="btn-wrap">
            <span class="btn btn-primary" @click="saveComment">保存</span>
          </div>
        </form>
      </Card>
    </div>
    <footer>
      <div class="btn center" @click="goNext">
        <span class="icon iconfont icon-caret-right"></span>
        <span class="btn-text">下一组</span>
      </div>
      <div class="btn center" @click="changeMove">
        <span class="icon iconfont icon-forward"></span>
        <span class="btn-text">换动作</span>
      </div>
      <div class="btn center" @click="finishWorkout">
        <span class="icon iconfont icon-stop"></span>
        <span class="btn-text">结束训练</span>
      </div>
    </footer>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue'
import Card from '@/components/common/Card.vue'

import formatTimer from '@/utils/formatTimer.js'
import { updateBreakById } from '@/network/break.js'

export default {
  name: 'Break',

  data () {
    return {
      date: '',
      move: {}, // 当前动作
      recordForm: {}, // 当前训练记录
      timer: null
    }
  },

  components: { Header, Card },

  computed: {
    timeCounter () {
      // return this.record.breakTime
      // return this.record.breakTime < 601 ? this.record.breakTime : '休息已超过600秒'
      return this.timer ? this.recordForm.breaktime : '休息已超过600秒'
    }
  },

  created () {
    // this.date = localStorage.getItem('date') || ''
    // 接受参数并赋值给 data
    this.move = this.$route.params.move
    this.recordForm = this.$route.params.recordForm
    this.recordForm.breaktime = 0
    this.timer = setInterval(() => {
      this.recordForm.breaktime++
      // if (this.record.breakTime === 600) clearInterval(this.timer)
      if (this.recordForm.breaktime > 600) {
        clearInterval(this.timer)
        this.timer = null
      }
    }, 1000)
  },

  filters: {
    timerFilter (timer) {
      return formatTimer(timer)
    }
  },

  beforeRouteLeave (to, from, next) {
    next()
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },

  // beforeDestroy () {
  //   if (this.timer) {
  //     clearInterval(this.timer)
  //     this.timer = null
  //   }
  // },

  methods: {
    // 网络请求相关方法
    /**
     * 提交组间休息数据
     * @param { Number } detail_id
     * @param { Object } recordItem
     */
    async updateBreak () {
      const { detailId } = this.$route.params
      const { breaktime, comment } = this.recordForm
      const { data: res } = await updateBreakById(detailId, breaktime, comment)
      if (res.meta.status !== 200) return alert(res.meta.msg)
      console.log(res.data)
    },

    // 事件处理相关方法
    /*
      监听 保存备注 按钮点击事件
    */
    saveComment () {
      console.log(this.recordItem)
    },
    /**
     * 监听 下一组 按钮点击事件
     */
    goNext () {
      // 提交数据到后台
      this.updateBreak()
      // 跳转页面
      this.$router.push({
        name: 'Workout',
        // params: this.recordItem
        params: {
          move: this.move,
          recordForm: this.recordForm
        }
      })
    },

    /**
     * 监听 换动作 按钮点击事件
     */
    changeMove () {
      // 提交数据到后台
      this.updateBreak()
      // 跳转页面
      const { pid, part } = this.move
      this.$router.push({ path: `/movement/list/${pid}/${part}` })
    },

    /**
     * 监听 结束训练 按钮点击事件
     */
    finishWorkout () {
      // 提交数据到后台
      this.updateBreak()
      // 跳转页面
      this.$router.push({ path: '/record' })
    }
  }
}
</script>

<style lang="less" scoped>
  .main {
    .break-info-wrap {
      padding-top: 20px;
      .time-counter {
        margin: 24px 0;
        font-size: 20px;
      }
    }
    .btn-wrap {
      display: flex;
      justify-content: right;
      .btn {
        font-size: 14px;
        background-color: var(--bgColor);
        padding: 5px 10px;
      }
    }
  }

  footer {
    width: 100vw;
    display: flex;
    padding-bottom: 10px;
    .btn {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: right;
      align-items: center;
      .icon {
        font-size: 36px;
        color: #ccc;
      }
      .icon-stop {
        color: var(--themeColor);
      }
      .btn-text {
        margin: 10px 0;
      }
    }
  }
</style>

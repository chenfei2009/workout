<template>
  <div class="choose-move container">
    <ul class="move-list">
      <li v-for="item in moves" :key="item.id" class="move-item fl">
        <div :class="activeClass(item)"
          @click="onItemClick(item)">
          <span>{{item.name}}</span>
          <span v-if="item.count > 0" class="item-count">{{item.count}}</span>
        </div>
      </li>
    </ul>
    <footer v-if="!isAddMove">
      <div class="btn btn-primary" @click="onAddMoveClick">新增自定义动作</div>
      <div class="btn btn-plain" @click="onEditMoveClick">编辑动作</div>
    </footer>
    <!-- <footer v-else>
      <div class="btn btn-plain" @click="chooseMovements">完成选择</div>
    </footer> -->
  </div>
</template>

<script>
import { getMoves } from '@/network/movement.js'
import formatDate from '@/utils/formatDate.js'
import { EventBus } from '@/utils/eventBus.js'

export default {
  name: 'ChooseMove',
  data () {
    return {
      part: '',
      moves: [], // 动作列表
      isAddMove: false
    }
  },
  computed: {
    activeClass () {
      if (this.isAddMove) {
        return function (item) {
          return (item.isSelect ? 'btn-plain' : 'btn-primary')
        }
      }
      return function (item) {
        return (item.count > 0 ? 'btn-plain' : 'btn-primary')
      }
    }
  },
  created () {
    // 获取路由参数
    const { pid } = this.$route.params
    // 获取 date 参数
    const date = localStorage.getItem('date') || formatDate(new Date(), 'yyyy-MM-dd')
    // 获取 isAddMove 参数
    this.isAddMove = localStorage.getItem('isAddMove') || false
    // this.pid = pid
    // this.part = part
    this.loadMoves(pid, date)
  },

  methods: {
    // 网络请求相关方法
    /**
     * 请求动作列表数据
     * @param {interger} pid 当前部位编号
     * @param {string} date 格式化的当前日期
     */
    async loadMoves (pid, date) {
      const { data: res } = await getMoves(pid, date)
      if (res.meta.status !== 200) return console.error(res.meta.msg)
      this.moves.length = 0
      this.moves.push(...res.data.moves)
      // 新增计划状态
      if (this.isAddMove) {
        this.moves.forEach(v => {
          const selectMoves = JSON.parse(localStorage.getItem('selectMoves')) || []
          const selectIds = []
          selectMoves.map(v => { selectIds.push(v.id) })
          this.$set(v, 'isSelect', (selectIds.indexOf(v.id) > -1))
          // this.$set(v, 'isSelect', false)
        })
      }
    },

    // 事件处理相关方法
    /**
     * 监听点击事件
     * 常规状态 --> 跳转页面
     * 加添动作状态 --> 更新缓存
     */
    onItemClick (item) {
      // 常规状态 点击动作直接跳转页面
      if (!this.isAddMove) {
        return this.$router.push({
          name: 'Workout',
          params: { move: item }
        })
      }
      // 添加动作 状态
      item.isSelect = !item.isSelect
      // const move = this.moves.find(v => v.id === item.id)
      // move.isSelect = !move.isSelect
      // 更新缓存
      const selectMoves = JSON.parse(localStorage.getItem('selectMoves')) || []
      const index = selectMoves.findIndex(v => v.id === item.id)
      if (index === -1) {
        // selectMoves.push(item.id)
        selectMoves.push({ id: item.id, name: item.name })
        // 更新后的数组保存到缓存
        localStorage.setItem('selectMoves', JSON.stringify(selectMoves))
      } else {
        selectMoves.splice(index, 1)
        // 更新后的数组保存到缓存
        localStorage.setItem('selectMoves', JSON.stringify(selectMoves))
      }
    },

    /**
     * 监听 新增自定义动作 按钮点击事件
     */
    onAddMoveClick () {
      const params = this.$route.params
      this.$router.push({
        name: 'AddMove',
        params: params
      })
    },

    /**
     * 监听 编辑动作 按钮点击事件
     */
    onEditMoveClick () {
      this.$router.push({
        name: 'EditMove'
      })
      setTimeout(() => {
        EventBus.$emit('moves', this.moves)
      }, 10)
    }
  }
}
</script>

<style lang="less" scoped>
  .move-list {
    margin: 20px;
    .move-item {
      margin: 10px;
      // overflow: hidden;
      span {
        font-size: 14px;
      }
      .item-count {
        padding-left: 5px;
      }
    }
  }

  footer {
    .btn {
      width: ~"calc(100vw - 20px)";
      margin: 10px;
    }
  }
</style>

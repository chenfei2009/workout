<template>
  <div class="record-group">
    <span class="group-part small">{{recordItem.part}}</span>
    <span class="group-name bold">{{recordItem.name}}</span>
    <ul class="group-list">
      <li class="list-item" v-for="(item, index) in recordItem.detail" :key="index">
        <div class="item-content">
          <div class="item-count small">{{item.count}}</div>
          <div v-if="!item.timer">
            <span>{{item.weight | weightFilter}}</span>
            <span>{{' '+item.unit+' x '+item.times}}</span>
          </div>
          <div v-else>
            <div>{{item.timer | timerFilter}}</div>
            <div v-if="item.distance">{{item.distance}} 米</div>
          </div>
        </div>
        <div class="item-action">
          <!-- 编辑详情条目 -->
          <span class="iconfont icon-edit"
            v-if="isShow"
            @click="editItem(item)"
            ></span>
          <!-- 删除详情条目 -->
          <span class="iconfont icon-delete"
            v-if="isShow && index === recordItem.detail.length-1"
            @click="deleteItem(item.id)"
            ></span>
        </div>
      </li>
    </ul>
    <!-- <slot name="item-part">{{part}}</slot>
    <slot name="item-name">{{name}}</slot>
    <slot name="item-detail"></slot> -->
  </div>
</template>

<script>
import formatTimer from '@/utils/formatTimer.js'
import formatNum from '@/utils/formatNum.js'

export default {
  name: 'RecordGroup',
  props: {
    recordItem: {
      type: Object
    },
    isShow: {
      type: Boolean
    }
  },
  filters: {
    timerFilter (timer) {
      return formatTimer(timer)
    },
    weightFilter (weight) {
      return formatNum(weight, 1)
    }
  },
  methods: {
    changeItem () {
      // this.$emit('changeItem', item)
      this.$router.push({
        name: 'Movement',
        params: { id: this.partItem.id }
      })
    },
    editItem (item) {
      console.log(this.recordItem)
      const { name, part, pid, type } = this.recordItem
      const count = item.count
      this.$router.push({
        name: 'Workout',
        params: {
          move: { name, part, pid, type, count },
          record: item
        }
      })
    },
    deleteItem (detailId) {
      this.$emit('deleteItem', detailId)
    }
  }
}
</script>

<style lang="less" scoped>
  .record-group {
    justify-content: center;
    background-color: #fff;
    width: 45vw;
    margin-top: 10px;
    padding: 10px;
    font-size: 14px;
    border-radius: 10px;
    .small {
      font-size: 12px;
      margin-right: 10px;
      color: #ccc;
    }
    .group-list {
      margin-top: 10px;
      .list-item {
        display: flex;
        .item-content {
          flex: 3;
          display: flex;
          font-size: 13px;
          padding-bottom: 5px;
        }
        .item-action {
          flex: 1;
          .icon-edit {
            margin-right: 5px;
            color: var(--themeColor);
          }
          .icon-delete {
            color: var(--themeColor);
          }
        }
      }
    }
  }
</style>

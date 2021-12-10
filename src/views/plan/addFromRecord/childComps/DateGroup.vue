<template>
  <div class="date-group">
    <div class="group-date small">训练日期 {{group[0].date}}</div>
    <div class="group-parts">{{parts}}</div>
    <div class="group-moves small">
      <div class="move-item">{{group[0].name}}</div>
      <div class="move-item" v-if="group[1]">{{group[1].name}} ...</div>
    </div>
    <div class="group-action" @click="onGroupClick">
      <span>选择</span>
      <span class="iconfont icon-arrow-right-bold"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DateGroup',
  data () {
    return {}
  },
  props: {
    index: {
      type: Number
    },
    group: {
      type: Array
    }
  },
  computed: {
    parts () {
      // 拼接的部位字符串
      const str = this.group.reduce((preVal, curVal) => {
        return preVal.indexOf(curVal.part) === -1 ? preVal + curVal.part + '，' : preVal
      }, '')
      return str.substr(0, str.length - 1)
    },
    moves () {
      return this.group[0].name
    }
  },
  created () {},
  methods: {
    onGroupClick () {
      this.$emit('onGroupClick', this.group, this.index)
    }
  }
}
</script>

<style lang="less" scoped>
.date-group {
  margin: 10px 0;
  padding: 10px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  .group-date {
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  .group-parts {
    font-weight: 600;
    padding: 10px 0;
  }
  .group-action {
    display: flex;
    padding-top: 10px;
    justify-content: space-between;
  }
}
.small {
  font-size: 12px;
  color: #ccc;
}
</style>

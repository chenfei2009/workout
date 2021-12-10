<template>
  <div class="dialog" v-show="dialogVisible">
    <div class="dialog-main">
      <div class="dialog-title bold">{{title}}</div>
      <div class="dialog-content"
        v-if="content.length>0"
        >{{content}}</div>
      <div class="dialog-footer">
        <button class="btn-cancel"
          @click="dialogClose"
          v-if="!okOnly"
          >取消</button>
        <button class="btn-confirm"
          @click="dialogConfirm"
          >确认</button>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="dialog-mask"></div>
    <!-- /遮罩层 -->
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    content: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    okOnly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    dialogClose () {
      this.$emit('dialogClose')
    },
    dialogConfirm () {
      this.$emit('dialogConfirm')
    }
  }
}
</script>

<style lang="less" scoped>
  /* 遮罩层 */
  .dialog-mask {
    position: fixed;
    z-index: 9;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,.5);
  }

  .dialog-main {
    position: fixed;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 90vw;
    // height: 25vh;
    border-radius: 10px;
    .dialog-title {
      text-align: center;
      margin: 20px 0;
    }
    .dialog-content {
      text-align: center;
      margin-bottom: 20px;
    }
    .dialog-footer {
      // position: fixed;
      // bottom: 0;
      display: flex;
      width: 100%;
      button {
        flex: 1;
        background-color: transparent;
        border-top: 1px solid #eee;
        padding: 15px 0;
        font-size: 16px;
      }
      .btn-cancel {
        border-right: 1px solid #eee;
      }
      .btn-confirm {
        color: var(--themeColor);
      }
    }
  }
</style>

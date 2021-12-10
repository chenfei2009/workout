<template>
  <div class="add-movement container">
    <Header>
      <span class="btn-back iconfont icon-arrow-left-bold" @click="goBack" slot="back"></span>
      <span slot="title">编辑训练计划</span>
      <span slot="share" class="iconfont icon-share"></span>
    </Header>
    <!-- 选择动作 -->
    <div class="main">
      <form action="#">
        <div class="form-group">
          <label for="name">计划名称</label>
          <input type="text" placeholder="点击输入计划名称" id="name" v-model="formData.name">
        </div>
      </form>
      <!-- 动作列表 -->
      <a href="#/part"><div class="btn">添加动作+</div></a>
      <ul class="move-list">动作列表</ul>
      <footer>
        <div class="btn btn-plain" @click="handelSubmit">保存计划</div>
      </footer>
    </div>
    <!-- /选择动作 -->
    <!-- 抽屉组件 -->
    <Drawer :drawer="isShowDrawer"
      :height="'50vh'"
      @confirm="handleDrawerConfirm"
      @cancel="handleDrawerClose">
      <!-- 选择器组件 -->
      <SelectSwiper :options="optionList"
        :transiton="transiton"
        ref="SelectSwiperRef"
        ></SelectSwiper>
      <!-- /选择器组件 -->
    </Drawer>
    <!-- /抽屉组件 -->
    <!-- <SelectSwiper :options="optionList" :transiton="transiton"></SelectSwiper> -->
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue'
import Drawer from '@/components/common/Drawer.vue'
import SelectSwiper from '@/components/content/SelectSwiper.vue'

import { addMove } from '@/network/movement.js'

export default {
  name: 'EditPlan',
  data () {
    return {
      part: '',
      pid: null,
      movementItem: {},
      isShowDrawer: false,
      formData: {
        name: ''
      },
      transiton: true
    }
  },
  components: {
    Header,
    Drawer,
    SelectSwiper
  },
  computed: {
    swiper () {
      return this.$refs.SelectSwiperRef.swiper
    }
  },
  created () {
    this.part = this.$route.params.part
    this.pid = this.$route.params.pid
  },
  mounted () {
    // this.part = this.$route.params.part
    // console.log('父组件', this.transiton)
    // this.transiton = true
    // this.$nextTick(() => {
    //   this.transiton = true
    //   console.log('父组件', this.transiton)
    // })
  },
  updated () {
    // this.$nextTick(() => {
    //   this.transiton = true
    //   console.log('父组件', this.transiton)
    // })
  },
  methods: {
    // 监听抽屉中确认按钮点击事件
    handleDrawerConfirm () {
      this.isShowDrawer = false
      this.formData.value = this.swiper.activeIndex
      console.log('DrawerConfirm', this.formData.value)
    },
    /*
      监听抽屉中取消按钮点击事件
    */
    handleDrawerClose () {
      this.isShowDrawer = false
      // this.$refs.SelectSwiperRef.swiper.activeIndex = this.formData.value
      this.swiper.slideTo(this.formData.value, 1000, false)
      console.log('DrawerConfirm', this.formData.value)
    },
    /*
      监听保存动作按钮点击事件
    */
    async handelSubmit () {
      // 表单预验证
      if (!this.formData.name) return alert('请输入名称')
      // 发送请求
      const params = {
        id: 0,
        pid: this.pid,
        part: this.part,
        name: this.formData.name,
        type: this.formData.value
      }
      const { data: res } = await addMove(params)
      if (res.meta.status !== 200) return alert(res.meta.msg)
      // 跳转页面并携带参数
      // this.$router.push({ name: 'Movement', params: { ...this.item, ...this.formData } })
      this.$router.push({ name: 'Movement', params: { pid: this.pid } })
    },
    // 返回上一级页面
    goBack () {
      this.$router.push({ name: 'Movement', params: { pid: this.pid } })
    }
  }
}
</script>

<style lang="less" scoped>
  .swiper-wrap {
    position: relative;
    background-color: #fff;
    // overflow: hidden;
    // height: 400px;
    .line {
      position: absolute;
      margin: 0 20px;
      width: ~'calc(100% - 40px)';
      height: 1px;
      background-color: #ccc;
      top: 100px;
    }
    .line-bottom {
      top: 150px;
    }
  }

  // .swiper {
  //   // position: absolute;
  //   // box-sizing: border-box;
  //   // width: 200px;
  //   // height: 180px;
  //   // top: 0;
  //   // left: 50%;
  //   // margin-left: -100px;
  // }

  .swiper-wrap /deep/ .swiper-container {
    // position: absolute;
    // overflow: visible !important;
    width: 100vw;
    height: 250px;
    // top: 50px;
  }

  .swiper-wrap /deep/ .swiper-slide {
    height: 50px !important;
  }

  .swiper-wrap /deep/ .swiper-slide div {
    text-align: center;
    height: 100%;
    line-height: 50px;
    // color: #ccc;
    // padding: 20px 0;
  }

  .swiper-slide-active div {
    // font-size: 20px;
    color: #333;
    font-weight: 600;
    // transition: all 0.5s;
  }

  .transition {
    transition: all 0.5s;
  }

  .swiper-slide {
    color: #ccc;
  }

  .swiper-slide-prev, .swiper-slide-next {
    color: #999;
  }

  .add-movement {
    // 形成 BFC 否则会上边距塌陷
    overflow: hidden;
    .title {
      text-align: center;
      margin: 20px 0;
    }
    form {
      padding: 10px;
      .form-group {
        margin-bottom: 30px;
        label {
          margin-right: 30px;
        }
        input {
          font-size: 14px;
          background-color: var(--bgColor);
        }
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

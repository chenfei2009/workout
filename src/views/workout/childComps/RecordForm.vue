<template>
  <div class="workout-form">
    <Card>
      <div class="card-item">部位：{{move.part}}</div>
      <div class="card-item">动作：{{move.name}}</div>
      <div class="card-item">第 {{move.count}} 组</div>
      <section v-if="move.type==2">
        <form action="#">
          <div class="form-group card-item">
            <label for="timerType">计时方式</label>
            <input type="radio" name="timerType" value="0" v-model="timerType" @change="onTypeChange">手动输入
            <input type="radio" name="timerType" value="1" v-model="timerType" @change="onTypeChange">计时器
          </div>
          <div class="form-group card-item">
            <label for="timer">时长</label>
            <span v-if="timerType==0"
              @click="isShowDrawer=true"
              >{{formatTime}}</span>
            <div v-else>
              <!-- <span v-if="!isShowCounter" @click="isShowCounter=true">点击此处开始计时</span> -->
              <span v-if="!isShowCounter" @click="startCounter">点击此处开始计时</span>
              <span v-if="isShowCounter">{{formatTime}}</span>
              <!-- <span v-if="isShowCounter">{{recordForm.timer | timerFilter}}</span> -->
            </div>
            <input type="text" v-show="false" id="timer" v-model="recordForm.timer">
          </div>
          <div class="form-group card-item">
            <label for="distance">距离</label>
            <input type="text" id="distance" v-model="recordForm.distance">
          </div>
        </form>
      </section>
      <section v-else>
        <form action="#">
          <div class="form-group card-item">
            <label for="unit">单位</label>
            <input type="radio" name="unit" value="kg" v-model="recordForm.unit">公斤/kg
            <input type="radio" name="unit" value="lbs" v-model="recordForm.unit">磅/lbs
          </div>
          <div class="form-group card-item" v-show="move.type==0">
            <label for="weight">重量</label>
            <!-- <input type="text" id="weight" v-model="formatWeight" placeholder="0为自重"> -->
            <input type="text" id="weight" v-model="recordForm.weight" placeholder="0为自重">
          </div>
          <div class="form-group card-item">
            <label for="times">次数</label>
            <input type="text" id="times" v-model="recordForm.times">
          </div>
        </form>
      </section>
    </Card>
    <!-- 抽屉组件 -->
    <Drawer :drawer="isShowDrawer"
      :height="'50vh'"
      @confirm="handleDrawerConfirm"
      @cancel="handleDrawerClose">
      <!-- 选择器组件 -->
      <div class="select-wrapper">
        <div class="item-wrapper">
          <SelectSwiper :options="hourList"
            :transiton="transiton"
            ref="hourSwiperRef"
            ></SelectSwiper>
        </div>
        <div class="item-wrapper">
          <SelectSwiper :options="minuteList"
            :transiton="transiton"
            ref="minuteSwiperRef"
            ></SelectSwiper>
        </div>
        <div class="item-wrapper">
          <SelectSwiper :options="secondList"
            :transiton="transiton"
            ref="secondSwiperRef"
            ></SelectSwiper>
        </div>
      </div>
      <!-- /选择器组件 -->
    </Drawer>
    <!-- /抽屉组件 -->
  </div>
</template>

<script>
import formatTimer from '@/utils/formatTimer.js'

import Card from '@/components/common/Card.vue'
import Drawer from '@/components/common/Drawer.vue'
import SelectSwiper from '@/components/content/SelectSwiper.vue'

export default {
  name: 'WorkoutForm',
  data () {
    return {
      timerType: 0, // 计时方式
      recordForm: {
        unit: 'kg', // 单位
        weight: 0, // 重量
        times: 0, // 次数
        // volume: 0, // 单组容量
        timer: 0, // 时长
        distance: 0, // 距离
        breaktime: 0 // 组间休息
      },
      // formatTimer: '0小时 0分钟 0秒',
      isShowCounter: false, // 是否显示计时器
      isShowDrawer: false, // 是否显示抽屉
      hourList: [], // 小时 swiper 选项
      minuteList: [], // 分钟 swiper 选项
      secondList: [], // 秒 swiper 选项
      transiton: true,
      counter: null
    }
  },
  props: {
    move: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: { Card, Drawer, SelectSwiper },
  created () {
    this.hourList = this.initList(5)
    this.minuteList = this.initList(59)
    this.secondList = this.initList(59)
  },
  computed: {
    formatTime () {
      return formatTimer(this.recordForm.timer)
    },
    hour () {
      return this.$refs.hourSwiperRef.swiper.activeIndex
    },
    minute () {
      return this.$refs.minuteSwiperRef.swiper.activeIndex
    },
    second () {
      return this.$refs.secondSwiperRef.swiper.activeIndex
    }
  },
  filters: {
    timerFilter (timer) {
      return formatTimer(timer)
    }
  },
  beforeDestroy () {
    if (this.counter) {
      clearInterval(this.counter)
      this.counter = null
    }
  },
  methods: {
    /**
     * 初始化 swiper 数据
     */
    initList (length) {
      const list = []
      for (let i = 0; i <= length; i++) {
        list.push({ value: i, label: i })
      }
      return list
    },

    /**
     * 监听抽屉中确认按钮点击事件
     */
    handleDrawerConfirm () {
      this.isShowDrawer = false
      this.formatTimer = `${this.hour}小时 ${this.minute}分钟 ${this.second}秒`
      this.recordForm.timer = this.hour * 3600 + this.minute * 60 + this.second
      console.log(this.recordForm)
    },

    /**
     * 监听抽屉中取消按钮点击事件
     */
    handleDrawerClose () {
      this.isShowDrawer = false
      // this.$refs.SelectSwiperRef.swiper.activeIndex = this.formData.value
      // this.swiper.slideTo(this.formData.value, 1000, false)
      console.log('DrawerConfirm')
    },

    /**
     * 监听计时器 开始计时 点击事件
     */
    startCounter () {
      this.isShowCounter = true
      this.recordForm.timer = 0
      this.counter = setInterval(() => this.recordForm.timer++, 1000)
    },

    /**
     * 计时方式切换事件
     */
    onTypeChange () {
      // 从计时器切换到手动输入
      if (this.counter) {
        this.isShowCounter = false
        this.recordForm.timer = 0
        clearInterval(this.counter)
        this.counter = null
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .card {
    .card-item {
      margin: 0 0 20px 10px;
      display: flex;
      align-items: center;
    }
    .card-item && :first-child {
      color: #ccc;
    }
    :last-child {
      margin-bottom: 0;
    }
    :nth-child(n+4) {
      padding-left: 50px;
    }
    .form-group {
      label {
        margin-right: 20px;
      }
    }
  }

  .select-wrapper {
    display: flex;
    padding: 0 15px;
    .item-wrapper {
      flex: 1;
      width: 100%;
    }
  }
</style>

<template>
  <div class="swiper-outter">
    <div class="line line-top"></div>
    <div class="line line-bottom"></div>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="item in options" :key="item.value">
        <div :class="{transition: transiton}" :value=item.value>{{item.label}}</div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// 引入插件
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'SelectSwiper',
  data () {
    return {
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 5,
        centeredSlides: true,
        // initialSlide: 0
        // 监听swiper从一个slide过渡到另一个slide结束时的事件
        on: {
          // slideChangeTransitionEnd
          slideChangeTransitionEnd: () => {
            const i = this.swiper.activeIndex
            this.$emit('valueChange', i)
          }
        }
      }
    }
  },
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    transiton: {
      type: Boolean,
      default: false // 过渡效果
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
    // transiton () {
    //   return 'transition: all 5s;'
    //   // return this.$nextTick(() => {
    //   //   return 'transition: all 5s;'
    //   // })
    // }
  },
  created () {},
  mounted () {
    this.swiper.slideTo(0, 1000, false)
    this.$emit('valueChange', this.swiper.activeIndex)
    // this.$nextTick(() => {
    //   this.transiton = true
    // })
  },
  methods: {}
}
</script>

<style lang="less" scoped>
  .swiper-outter {
    position: relative;
    background-color: #fff;
    // overflow: hidden;
    // height: 400px;
  }

  /* 选中区域上下边界 */
  .swiper-outter .line {
    position: absolute;
    // margin: 0 20px;
    // width: ~'calc(100% - 40px)';
    width: 100%;
    height: 1px;
    background-color: #ccc;
    top: 100px;
  }

  .swiper-outter .line-bottom {
    top: 150px;
  }

  .swiper-outter /deep/ .swiper-container {
    // position: absolute;
    // overflow: visible !important;
    // width: 100vw;
    height: 250px;
    // top: 50px;
  }

  .swiper-outter /deep/ .swiper-slide {
    height: 50px !important;
  }

  .swiper-outter /deep/ .swiper-slide div {
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
</style>

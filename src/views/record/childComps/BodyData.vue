<template>
  <form class="body-data" action="#">
    <div class="form-item">
      <label for="height">身高</label>
      <input type="text" id="height" placeholder="输入身高 (cm)" v-model="formData.height">
    </div>
    <div class="form-item">
      <label for="weight">体重</label>
      <input type="text" id="weight" placeholder="输入体重 (kg)" v-model="formData.weight">
    </div>
    <div class="form-item">
      <label for="body-fat">体脂率</label>
      <input type="text" id="body-fat" placeholder="输入体脂率 (%)" v-model="formData.bodyFat">
    </div>
    <div class="btn-warpper">
      <div class="btn btn-primary" @click="onSubmitData">保存</div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'BodyData',
  props: {
    formData: {
      type: Object
    }
  },
  data () {
    return {}
  },
  methods: {
    onSubmitData () {
      this.$emit('onSubmitData')
    }
  }
}
</script>

<style lang="less" scoped>
  .body-data {
    margin: 10px 0;
    background-color: #fff;
    .form-item {
      padding: 15px 25px;
      display: flex;
      label {
        flex: 1;
        // height: 25px;
      }
      input {
        flex: 3;
      }
    }
    .btn-warpper {
      display: flex;
      justify-content: center;
      .btn {
        width: 20vw;
        padding: 5px 15px;
        margin: 10px 0;
        font-size: 14px;
        text-align: center;
      }
    }
  }
</style>

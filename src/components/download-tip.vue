<template>
  <div class="download-tip" v-if="show">
    <span class="text-blue text">下载APP</span>
    <span class="text">，即可与查找人取得联系!</span>
    <span class="no-show" @click="hide">
      <span class="origin-badge">不再显示</span>
      <span class="close">&times;</span>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  },
  methods: {
    hide() {
      this.show = false;
    }
  }
};
</script>
<style lang="stylus">
.download-tip
  position fixed
  z-index 2
  top 0
  left 0
  right 0
  height 50px
  padding 0 16px
  font-size 14px
  color #fff
  background rgba(0,0,0, 0.7)
  .text
    font-weight 700
    line-height 50px
  .no-show
    float right
    display inline-block
    height 50px
    .origin-badge
      display inline-block
      height 20px
      line-height 20px
      margin-top 15px
      font-size 12px
      padding 0 8px
      background #ff7011
      border-radius 10px
      vertical-align top

    .close
      display inline-block
      height 20px
      line-height 20px
      margin-top 12px
      font-size 20px
      vertical-align top
</style>

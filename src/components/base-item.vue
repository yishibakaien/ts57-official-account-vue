<template>
  <div class="base-item border-bottom">
    <div class="img-box" :style="{backgroundImage:'url(' + url + ')'}"></div>
    <div class="name">大边</div>
    <div class="time">4小时前</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: require('../../static/images/patterns1.png')
    };
  }
};
</script>
<style lang="stylus">
@import '../common/styles/mixin.styl';
  .base-item
    box-sizing border-box
    background #fff
    padding 12px
    .img-box
      padding-top 90%
      centerPic()
    .name
      height 30px
      line-height 30px
      ellipsisLn(1)
    .time
      height 20px
      line-height 20px
      font-size 12px
      color #999
</style>

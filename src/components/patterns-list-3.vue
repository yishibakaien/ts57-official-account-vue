<template>
  <div class="patterns-list-3">
    <div class="list-wrapper">
      <div class="title">
        <rank-tag></rank-tag>
        <span class="name">国心服装</span><span class="detail">新增10款/共200款</span><i class="iconfont icon-back"></i>
      </div>
      <div class="pic-wrapper">
        <div class="pic-item" :style="{backgroundImage:'url(' + url.a + ')'}">
        </div>
        <div class="pic-item" :style="{backgroundImage:'url(' + url.b + ')'}"></div>
        <div class="pic-item" :style="{backgroundImage:'url(' + url.c + ')'}"></div>
      </div>
      <div class="footer">
        <div class="time">2小时前</div>
      </div>
    </div>
  </div>
</template>

<script>
import rankTag from './rank-tag';
export default {
  data() {
    return {
      url: {
        a: require('../../static/images/patterns1.png'),
        b: require('../../static/images/patterns2.png'),
        c: require('../../static/images/patterns3.png')
      }
    };
  },
  components: {
    rankTag
  }
};
</script>
<style lang="stylus">
@import '../common/styles/mixin.styl';
.patterns-list-3
  background #fff
  .list-wrapper
    padding 0 16px
    .title
      height 40px
      line-height 40px
      width 100%
      span
        display inline-block
        float left
        &.detail
          margin-left 16px
          color #666
          font-size 14px
      .icon-back
        float right
    .pic-wrapper
      display flex
      .pic-item
        flex 1
        padding-top 32%
        centerPic()
        &:not(:first-child)
          margin-left 2%
    .footer
      height 40px
      line-height 40px
      width 100%
      font-size 12px
      color #999
</style>

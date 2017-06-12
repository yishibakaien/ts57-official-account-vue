<template>
  <div class="patterns-list-3">
    <div class="list-wrapper">
      <div class="title">
        <rank-tag v-if="type==='hotPatterns'"></rank-tag>
        <span class="name">{{item.companyName}}</span><span class="detail">新增{{item.newCount}}款/共{{item.totalCount}}款</span><i class="iconfont icon-back"></i>
      </div>
      <div class="pic-wrapper">
        <div v-for="_item in item.productList" class="pic-item" :style="{backgroundImage:'url(' + _item.defaultPicUrl + ')'}">
        </div>
        <!-- <div class="pic-item" :style="{backgroundImage:'url(' + url.b + ')'}"></div>
        <div class="pic-item" :style="{backgroundImage:'url(' + url.c + ')'}"></div> -->
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
  props: {
    item: {
      type: Object
    },
    type: {
      type: String
    }
  },
  data() {
    return {};
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
        max-width 60%
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
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

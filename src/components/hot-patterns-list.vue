<template>
  <div class="hot-patterns-list">
    <div class="list-wrapper">
      <div class="title">
        <rank-tag :num="index"></rank-tag>
        <span class="detail">搜索量<span class="text-blue">{{item.searchs}}</span>/共<span class="text-blue">{{item.sameCount}}</span>款</span>
        <i class="iconfont icon-back"></i>
      </div>
      <div class="pic-wrapper">
        <!-- <div v-for="_item in item.pics" class="pic-item" :style="{backgroundImage:'url(' + miniPic(_item, 200) + ')'}"> -->
        <div v-for="_item in item.pics" class="pic-item" v-patternsPic="{pic:_item, size:200}">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rankTag from './rank-tag';
import { miniPic } from '../common/js/utils';
export default {
  props: {
    item: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  methods: {
    miniPic() {
      return miniPic.apply(null, arguments);
    }
  },
  components: {
    rankTag
  }
};
</script>
<style lang="stylus">
@import '../common/styles/mixin.styl';
.hot-patterns-list
  background #fff
  .list-wrapper
    padding 0 16px 16px 16px
    .title
      display flex
      height 40px
      line-height 40px
      width 100%
      .detail
        flex 1
        color #666
        font-size 14px
      .icon-back
        flex 0 0 20px
        width 20px
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

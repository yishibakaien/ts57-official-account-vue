<template>
  <div class="add-patterns-list" @click="addPattersListClick([item.companyId, item.isWebsite, item.indexName])">
    <div class="list-wrapper">
      <div class="title">
        <span class="name">{{item.companyName}}</span>
        <span class="detail">新增 <span class="text-blue">{{item.newCount}}</span> 款/共 <span class="text-blue">{{item.totalCount}}</span> 款</span>
        <i class="iconfont icon-back"></i>
      </div>
      <div class="pic-wrapper">
        <!-- <div v-for="_item in item.productList" class="pic-item" :style="{backgroundImage:'url(' + miniPic(_item.defaultPicUrl, 200) + ')'}"> -->
        <div v-for="_item in item.productList" class="pic-item" v-patternsPic="{pic:_item.defaultPicUrl, size:200}">
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
import { miniPic } from '../common/js/utils';
export default {
  props: {
    item: {
      type: Object
    },
    type: {
      type: String
    }
  },
  methods: {
    addPattersListClick(companyId) {
      this.$emit('listClick', companyId);
    },
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
.add-patterns-list
  background #fff
  .list-wrapper
    padding 0 16px
    .title
      display flex
      height 40px
      line-height 40px
      width 100%
      .name
        flex 1
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
      .detail
        flex 0 0 130px
        width 130px
        text-align right
        color #666
        font-size 14px
      .icon-back
        flex 0 0 10px
        width 10px
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

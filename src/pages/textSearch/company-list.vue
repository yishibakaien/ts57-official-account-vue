<template>
  <div class="company-list-item" @click="addPattersListClick(item.companyId)">
    <div class="head-icon">
      <img :src="item.companyHeadIcon ? item.companyHeadIcon : '/static/images/default_avatar.png'" alt="" class="head-icon-pic" width="70" height="70">
    </div>
    <div class="desc">
      <p class="title">{{item.companyName}}</p>
      <p class="address">{{item.address}}</p>
      <p class="count">共 <span class="text-blue">{{item.countProduct}}</span> 款花型</p>
      <i class="iconfont icon-back"></i>
    </div>
  </div>
</template>

<script>
// import rankTag from './rank-tag';
import { miniPic } from '../../common/js/utils';
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
  }
};
</script>
<style lang="stylus">
@import '../../common/styles/mixin.styl';
.company-list-item
  display flex
  .head-icon
    flex 0 0 70px
    width 70px
    height 70px
    margin-right 12px
    overflow hidden
    .head-icon-pic
      border-radius 4px
  .desc
    flex 1
    position relative

    .title
      font-size 16px
      height 20px
      line-height 20px
      ellipsisLn(1)
    .address
      font-size 14px
      line-height 16px
      color #999
      margin-right 16px
      ellipsisLn(2)
    .count
      position absolute
      bottom 0
      line-height 16px
      height 16px
      font-size 12px
      color #999
    .icon-back
      position absolute
      right 0px
      top 25px
      color #999

</style>

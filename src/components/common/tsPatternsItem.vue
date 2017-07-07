<template>
  <div class="base-item" @click="itemClick">
    <!-- <div class="img-box" :style="{backgroundImage:'url(' + _miniPic(item.defaultPicUrl, 200) + ')'}"></div> -->
    <div class="img-box" v-patternsPic="{pic: item.defaultPicUrl, size: 300, name: item.companyName}">
      <div class="recomend" v-if="item.isBest === 1">推荐</div>
    </div>
    <div class="name">{{item.productNo}}</div>
    <div style="visibility:hidden;clear:both;"></div>
    <div class="message-wrapper">
      <div class="company-name">{{item.companyName}}</div>
      <div class="price">{{money(item.price, item.priceUnit)}}</div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    money(money, unit) {
      return this.formatMoney(money, unit);
    },
    itemClick() {
      this.$router.push({
        path: `/patternsDetail?companyId=${this.item.companyId}&dataId=${this.item.id}`
      });
    },
    getUserName(item) {
      if (!item.user) {
        return '';
      }
      if (this.userType === 1) {
        var name = item.user.userName;
        // 用户类型为厂家
        if (name.length < 7) {
          return name;
        }
        return name.substr(0, 6) + '...';
      } else {
        return '';
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
  @import '../../common/styles/mixin.styl';
  .base-item
    box-sizing border-box
    background #fff
    padding 12px
    .img-box
      position relative
      padding-top 90%
      centerPic()
      .recomend
        position absolute
        font-size 14px
        width 100px
        text-align center
        height 22px
        line-height 22px
        top 10px
        right -30px
        background #ff7011
        color #fff
        transform rotate(45deg)
    .name
      height 30px
      line-height 30px
      width 100%
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    .message-wrapper
      display flex
      .company-name
        flex 3
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        font-size 14px
      .price
        flex 2
        text-align right
        font-size 12px
        color #f56565
</style>

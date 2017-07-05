<template>
  <div class="base-item" @click="itemClick">
    <div class="img-box" :style="{backgroundImage:'url(' + miniPic(getPic(item), 200) + ')'}"></div>
    <div class="name">{{getName(item)}}</div>
    <div class="time">{{getTime(item)}}</div>
    <div style="visibility:hidden;clear:both;"></div>
    <div class="clearfix" v-if="userType === 1">{{getUserName(item)}}</div>
  </div>
</template>

<script>
import {
  formatCategory,
  formatDate,
  miniPic
} from '../common/js/utils';
export default {
  data() {
    return {
      userType: Number(localStorage['userType'])
    };
  },
  props: {
    item: {
      type: Object
    },
    type: {
      type: String
    }
  },
  methods: {
    miniPic() {
      return miniPic.apply(null, arguments);
    },
    itemClick() {
      if (this.type !== 'lookingFor') {
        this.$router.push({
          path: `/patternsDetail?companyId=${this.item.companyId}&dataId=${this.item.id}`
        });
      }
    },
    getName(item) {
      console.log(item);
      if (this.type === 'lookingFor') {
        return formatCategory(item.category);
      }
      return item.productNo;
    },
    getTime(item) {
      var time;
      var fmt = 'MM-dd hh:mm';
      if (this.type === 'lookingFor') {
        time = new Date(item.createDate);
        return formatDate(time, fmt);
      }
      time = new Date(item.publishDate);
      return formatDate(time, fmt);
    },
    getPic(item) {
      if (this.type === 'lookingFor') {
        return item.searchSource;
      }
      return item.defaultPicUrl;
    },
    getUserName(item) {
      var name = item.user.userName;
      if (this.userType === 1) {
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
      float left
      ellipsisLn(1)
    .time
      height 30px
      line-height 30px
      float right
      font-size 12px
      color #999
</style>

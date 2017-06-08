<template>
  <div class="base-item" @click="itemClick">
    <div class="img-box" :style="{backgroundImage:'url(' + item.defaultPicUrl + ')'}"></div>
    <div class="name">{{item.productNo}}</div>
    <div class="time">{{formatTime(item.publishDate)}}</div>
  </div>
</template>

<script>
import {
  formatCategory,
  formatDate
} from '../common/js/utils';
export default {
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    format(category) {
      return formatCategory(category);
    },
    itemClick() {
      this.$emit('itemClick');
    },
    formatTime(time) {
      if (!time) {
        return '';
      }
      return formatDate(time, 'yyyy-MM-dd');
    }
  }
  // data() {
  //   return {
  //     url: require('../../static/images/patterns1.png')
  //   };
  // }
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

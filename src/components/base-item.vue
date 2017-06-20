<template>
  <div class="base-item" @click="itemClick">
    <div class="img-box" :style="{backgroundImage:'url(' + miniPic(getPic(item), 200) + ')'}"></div>
    <div class="name">{{getName(item)}}</div>
    <div class="time">{{getTime(item)}}</div>
  </div>
</template>

<script>
import {
  formatCategory,
  formatDate,
  miniPic
} from '../common/js/utils';
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
    miniPic() {
      return miniPic.apply(null, arguments);
    },
    itemClick() {
      this.$router.push({
        path: `/patternsDetail?companyId=${this.item.companyId}&dataId=${this.item.id}`
      });
      // this.$emit('itemClick', this.item.id);
    },
    getName(item) {
      if (this.type === 'lookingFor') {
        return formatCategory(item.category);
      }
      return item.productNo;
    },
    getTime(item) {
      var time;
      var fmt = 'yyyy-MM-dd';
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
      ellipsisLn(1)
    .time
      height 20px
      line-height 20px
      font-size 12px
      color #999
</style>

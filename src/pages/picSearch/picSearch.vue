<template>
  <div class="pic-search-page">
    <div class="search-category">

    </div>
    <div class="text">最近搜花记录</div>
    <div class="search-history">
      <div class="history-img" :style="{backgroundImage:'url(' + url + ')'}">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: require('../../../static/images/patterns1.png'),
      category: ['搜面料', '搜大边', '搜小边', '搜睫毛']
    };
  }
};
</script>
<style lang="stylus">
@import '../../common/styles/mixin.styl';
.search-category
  display flex
  padding 20px 0
  text-align center
  background #fff
  .category
    flex 1
    .item
      display inline-block
      font-size 14px
      padding 8px 12px
      border-radius 4px
      border 1px solid #666
.text
  padding 14px
  font-size 14px
  color #999
.search-history
  background #fff
  .history-img
    width 30%
</style>

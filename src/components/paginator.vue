<template>
  <div class="paginator-wrapper">
      <div class="has-more" v-if="true">查看更多</div>
      <div class="no-more" v-if="false">没有更多了</div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="stylus">
  .paginator-wrapper
    margin 16px 0
    width 100%
    height 40px
    line-height 40px
    text-align center
    color #666
    font-size 14px
    background #fff
    .has-more
      &:active
        color #4c93fd
</style>

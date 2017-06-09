<template>
  <div class="paginator-wrapper">
      <div class="has-more" v-show="hasMore" @click="seeMore">查看更多</div>
      <div class="no-more" v-show="!hasMore">没有更多了</div>
  </div>
</template>

<script>
export default {
  props: {
    hasMore: {
      type: Boolean
    }
  },
  mounted() {
    console.log('paginator mounted', this.hasMore);
  },
  methods: {
    seeMore() {
      this.$emit('more');
    }
  }
};
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

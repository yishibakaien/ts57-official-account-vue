<template>
  <div class="add-patterns-page">
    <p class="brand">最近一周热搜排行榜</p>
    <div class="patterns-list-container" v-for="item in [1,2,3]">
      <patterns-list-3></patterns-list-3>
    </div>
    <paginator></paginator>
  </div>
</template>

<script>
import {
  patternsList3,
  paginator
} from '../../components/index.js';
export default {
  components: {
    'patterns-list-3': patternsList3,
    paginator
  }
};
</script>
<style lang="stylus">
  .brand
    padding 12px 16px
    font-size 12px
    color #666
  .patterns-list-container
    margin-top 12px
    &:nth-of-type(1)
      margin-top 0
</style>

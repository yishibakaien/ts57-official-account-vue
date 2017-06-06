<template>
  <div class="categroy-all">
    <div class="patterns-item" v-for="item in [1,2,3,4,5,6,7]">
      <base-item></base-item>
    </div>
    <div class="clearfix"></div>
    <paginator></paginator>
  </div>
</template>

<script>
import {
  paginator,
  baseItem
} from '../../../components/index.js';
export default {
  components: {
    paginator,
    baseItem
  },
  created() {
    console.log('all created');
  },
  mounted() {
    console.log('all mounted');
  }
};
</script>
<style lang="stylus">
  .patterns-item
    width 50%
    box-sizing border-box
    float left
    border-right 1px solid #f7f7f7
    &:nth-of-type(2n)
      border-right 0
</style>

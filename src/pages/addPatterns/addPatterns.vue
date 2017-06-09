<template>
  <div class="add-patterns-page">
    <p class="brand">昨日上新<span class="text-blue">1200</span>款新花</p>
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
} from '../../components/index';
import {
    listCompanyNewProduct
} from '../../common/api/api';
export default {
  components: {
    'patterns-list-3': patternsList3,
    paginator
  },
  mounted() {
    listCompanyNewProduct({
        pageNo: 1,
        pageSize: 10
    }, function(res) {
        console.log('厂家上新', res);
    });
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

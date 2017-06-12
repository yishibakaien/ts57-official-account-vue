<template>
  <div class="add-patterns-page">
    <p class="brand">昨日上新<span class="text-blue">1200</span>款新花</p>
    <div class="patterns-list-container" @click="guideToDownload" v-for="item in list">
      <patterns-list-3 :item="item" :type="type"></patterns-list-3>
    </div>
    <paginator @more="seeMore" :hasMore="hasMore" v-show="requestDone"></paginator>
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
import guide from '../../common/js/guide';
import {
  loading,
  hide
} from '../../common/js/tip/toast';
export default {
  data() {
    return {
      type: 'addPatterns',
      list: [],
      hasMore: false,
      requestDone: false
    };
  },
  components: {
    'patterns-list-3': patternsList3,
    paginator
  },
  mounted() {
    var _this = this;
    loading();
    listCompanyNewProduct({
        pageNo: 1,
        pageSize: 10
    }, function(res) {
        hide();
        _this.requestDone = true;
        console.log('厂家上新', res);
        _this.list = res.data.list;
        if (res.data.pageNO < res.data.totalPage) {
          console.log('还有更多分页');
          _this.hasMore = true;
        } else {
          console.log('没有更多分页了');
          _this.hasMore = false;
        }
    });
  },
  methods: {
    seeMore() {
      guide('您可以在统搜57APP中查看更多细节，是否前往下载？');
    },
    guideToDownload() {
      guide('您可以在统搜57APP中查看更多细节，是否前往下载？');
    }
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

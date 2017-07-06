<template>
  <div class="add-patterns-page">
    <p class="brand">昨日上新 <span class="text-blue">{{totalNum}}</span> 款新花</p>
    <div class="patterns-list-container" v-for="item in list">
      <add-patterns-list :item="item" :type="type" @listClick="guideToStore"></add-patterns-list>
    </div>
    <paginator @more="guideToDownload" :hasMore="hasMore" v-show="requestDone"></paginator>
  </div>
</template>

<script>
import {
    addPatternsList,
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
      requestDone: false,
      totalNum: 0
    };
  },
  components: {
    'add-patterns-list': addPatternsList,
    paginator
  },
  mounted() {
    var _this = this;
    loading();
    listCompanyNewProduct({
        pageNo: 1,
        pageSize: 40
    }, function(res) {
        console.log('厂家上新', res);
        hide();
        _this.requestDone = true;
        _this.totalNum = res.data.totalNum;

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
    guideToDownload() {
      guide();
    },
    guideToStore([companyId, isWebsite, indexName]) {
//    console.log(companyId, isWebsite, indexName);
      if (isWebsite === 1) {
        location.href = 'http://' + indexName + '.ts57.cn';
      }
      if (isWebsite === 0) {
        location.href = 'http://www.ts57.cn/share/index.html?companyId=' + companyId;
      }
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

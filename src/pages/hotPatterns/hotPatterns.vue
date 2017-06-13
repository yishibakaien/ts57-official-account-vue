<template>
  <div class="add-patterns-page">
    <p class="brand">最近一周热搜排行榜</p>
    <div class="patterns-list-container" @click="guideToDownload" v-for="(item, index) in list">
      <hot-patterns-pist :item="item" :index="index + 1"></hot-patterns-pist>
    </div>
    <paginator @more="guideToDownload" :hasMore="hasMore"></paginator>
  </div>
</template>

<script>
import { hotPatternsList, paginator } from '../../components/index';
import guide from '../../common/js/guide';
import { loading, hide } from '../../common/js/tip/toast';
import { burstHot } from '../../common/api/api';
export default {
  data() {
    return {
      list: [],
      hasMore: true
    };
  },
  mounted() {
    var _this = this;
    loading();
    burstHot({
      pageNo: 2,
      pageSize: 10
    }, function(res) {
      hide();
      _this.list = res.data.list;
      // if (res.)
      console.log('爆款热搜加载成功', res);
    });
  },
  components: {
    'hot-patterns-pist': hotPatternsList,
    paginator
  },
  methods: {
    seeMore() {
      console.log('点击查看更多');
    },
    guideToDownload() {
      guide('您可以在统搜57APP中查看详情，是否前往下载？');
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

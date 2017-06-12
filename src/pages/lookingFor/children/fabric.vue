<template>
  <div class="categroy-all">
    <div class="item-wrapper" v-for="item in list" @click="guideToDownload">
      <base-item :item="item" :type="type"></base-item>
    </div>
    <div class="clearfix"></div>
    <paginator  @more="guideToDownload" :hasMore="hasMore" v-show="requestDone"></paginator>
  </div>
</template>

<script>
import {
  paginator,
  baseItem
} from '../../../components/index';
import {
  history
} from '../../../common/api/api';
import {
  loading,
  hide,
  info
} from '../../../common/js/tip/toast';
import guide from '../../../common/js/guide';
export default {
  data() {
    return {
      list: [],
      type: 'lookingFor',
      hasMore: false,
      requestDone: false
    };
  },
  created() {
    console.log('fabric created');
    var _this = this;
    loading();
    history({
      category: 100010,
      pageNo: 1,
      pageSize: 10
    }, function(res) {
      hide();
      console.log('fabric', res);
      _this.list = res.data.list;
      _this.requestDone = true;
      if (res.data.pageNO < res.data.totalPage) {
        _this.hasMore = true;
      }
    }, function(err) {
      info({
        text: '错误:' + err.message
      });
    });
  },
  methods: {
    guideToDownload() {
      guide();
    }
  },
  mounted() {
    console.log('fabric mounted');
  },
  components: {
    paginator,
    baseItem
  }
};
</script>
<style lang="stylus">
@import '../../../common/styles/mixin';
.item-wrapper
  itemListLayout()
</style>

<template>
  <div class="categroy-all">
    <div class="item-wrapper" v-for="item in list">
      <base-item :item="item" :type="type" @itemClick="itemClick"></base-item>
    </div>
    <div class="clearfix"></div>
    <ts-model-t v-show="modelShow" @cancelMethod="hideModel">
      <p class="tipsInfo">
        成为会员，请联系热线电话：4008013357
      </p>
    </ts-model-t>
    <paginator  @more="guideToDownload" :hasMore="hasMore" v-show="requestDone"></paginator>
  </div>
</template>

<script>
import {
  paginator
} from '../../../components/index';

import baseItem from '../looking-base-item.vue';

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
      userType: Number(localStorage['userType']),
      modelShow: false,
      list: [],
      hasMore: false,
      requestDone: false
    };
  },
  created() {
    var _this = this;
    loading();
    history({
      pageNo: 1,
      category: 100010,
      pageSize: 10
    }, function(res) {
      hide();
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
    },

    hideModel() {
      this.modelShow = false;
    },
    itemClick(id) {
      if (this.userType === 1) {
        // 厂家
        this.$router.push({
          path: '/picSearch',
          query: {
            id: id
          }
        });
      }
      // 贸易商
      if (this.userType === 2) {
        this.modelShow = true;
      }
    }
  },
  mounted() {
    console.log('all mounted');
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

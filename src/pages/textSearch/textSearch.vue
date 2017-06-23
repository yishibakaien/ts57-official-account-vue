<template>
  <div class="text-search-page">
    <div class="tab border-bottom">
      <div class="tab-item" v-for="item in tabArr">
        <span class="tab-text" :class="{active: activeTab===item.type}" @click="doTab(item.type)">{{item.text}}</span>
      </div>
    </div>
    <div class="result-container clearfix" v-show="activeTab===1">
      <div class="text">花型搜索结果：</div>
      <div class="noop-tip" v-show="noPatterns">暂无搜索结果</div>
      <div class="patterns-item-wrapper" v-for="item in patternsResultArr">
        <base-item :item="item"></base-item>
      </div>
      <paginator v-if="patternsResultArr.length" :hasMore="hasMore" @more="loadMore"></paginator>
    </div>
    <div class="result-container clearfix" v-show="activeTab===2">
      <div class="text">厂家搜索结果：</div>
      <div class="noop-tip" v-show="noCompany">暂无搜索结果</div>
      <div class="company-list-wrapper" v-for="item in companyResultArr">
        <company-list :item="item"></company-list>
      </div>
      <paginator v-if="companyResultArr.length" :hasMore="hasMore" @more="loadMore"></paginator>
    </div>

  </div>
</template>

<script>
// AlloyTeam 图片裁剪
// import AlloyCrop from '../../common/js/crop/crop';
// import AlloyCrop from '../../common/js/newCrop/alloyCrop.js';
import {
  // 文本搜花
  search,
  // 文本搜公司
  searchCompany
  // encoded,
  // polling,
  // getResult,
  // searchHistory
} from '../../common/api/api';
console.log(search, searchCompany);
import {
  // formatCategory
} from '../../common/js/utils';

// import blackTip from '../../common/js/tip/blackTip';

import {
  paginator,
  baseItem
} from '../../components/index';
import companyList from './company-list.vue';
import {
  // info,
  loading,
  // success,
  hide
} from '../../common/js/tip/toast';

// import guide from '../../common/js/guide';
export default {
  components: {
    paginator,
    baseItem,
    companyList
  },
  data() {
    return {
      // tabArr: [{type: 1, text: '花型结果'}],
      tabArr: [{type: 1, text: '花型结果'}, {type: 2, text: '厂家结果'}],
      activeTab: 1,
      type: 1,
      hasMore: false,
      keywords: '',
      patternsOption: {
        keywords: '',
        pageSize: 20
      },
      noPatterns: false,
      noCompany: false,
      patternsResultArr: [],
      companyResultArr: []
    };
  },
  mounted() {
    // console.log('参数：', this.$route.query.img);
    var keywords = this.$route.query.key;
    var type = Number(this.$route.query.type);
    // var type = 1;
    console.log(this.$route.query);
    console.log(keywords, type);
    if (type) {
      // 花型 1 工厂 2
      this.type = type;
    }
    if (keywords) {
      this.keywords = keywords;
    }
    this.doTab(type);
  },
  methods: {
    doTab(type) {
      var _this = this;
      this.activeTab = type;
      if (this.activeTab === 1) {
        if (_this.patternsResultArr.length) {
          return;
        }
        loading();
        search({
          keywords: this.keywords,
          pageSize: 20
        }, function(res) {
          console.log('文本搜花结果', res);
          hide();
          if (res.data.list.length === 0) {
            _this.noPatterns = true;
          } else {
            _this.noPatterns = false;
          }
          _this.patternsResultArr = _this.patternsResultArr.concat(res.data.list);
        });
      }
      if (this.activeTab === 2) {
        if (_this.companyResultArr.length) {
          return;
        }
        loading();
        searchCompany({
          companyName: this.keywords,
          pageSize: 20
        }, function(res) {
          console.log('搜厂结果', res);
          hide();
          if (res.data.list.length === 0) {
            _this.noCompany = true;
          } else {
            _this.noCompany = false;
          }
          _this.companyResultArr = _this.companyResultArr.concat(res.data.list);
          console.log(_this.companyResultArr);
        });
      }
    },
    loadMore() {
      this.getResult();
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/styles/mixin.styl';
.tab
  display flex
  box-sizing border-box
  position fixed
  z-index 1
  width 100%
  top 0
  left 0
  right 0
  height 40px
  line-height 40px
  background #fff
  text-align center
  font-size 14px
  .tab-item
    flex 1
    .tab-text
      display inline-block
      box-sizing border-box
      height 40px
      line-height 40px
      &.active
        color #4c93fd
        border-bottom 2px solid #4c93fd
.noop-tip
  font-size 14px
  text-align center
  margin 30px auto
  color #999
.search-category
  background #fff
  position relative
  height 100px
  padding-top 20px
  .pic-wrapper
    center()
    centerPic()
    border1px()
    display inline-block
    height 30px
    width 30px
    padding 32px
    // border 1px solid #d8d8d8
    background-color #f2f2f2
    border-radius 2px
    .icon-tianjiatupian
      position relative
      font-size 30px
      color #aaa
.search-button-box
  background #fff
  padding 12px 0
  .button
    display inline-block
    padding 4px 8px
    font-size 14px
    width 20%
    margin-left 5%
    &:first-child
      margin-left 2.5%
.text
  padding 14px
  font-size 14px
  color #999
.result-container
  margin-top 40px
  // padding-bottom 32px
  .patterns-item-wrapper
    itemListLayout()
  .company-list-wrapper
    padding 16px
    background #fff
    margin-bottom 8px
.receive-id-box
  display flex
  background #fff
  padding 16px
  .receive-id-box
    flex 0 0 80px
  .receive-pic-message
    flex 1
    p
      line-height 20px
      font-size 14px
      height 20px
      margin-left 16px
      &.receive-type
        ellipsisLn(1)
      &.receive-person
        ellipsisLn(1)
      &.receive-tip
        height 40px
        color #999
        ellipsisLn(2)
</style>

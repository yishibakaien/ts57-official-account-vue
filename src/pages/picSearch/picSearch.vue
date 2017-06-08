<template>
  <div class="pic-search-page">
    <div class="search-category">
      <input type="file" capture="camera" name="file" ref="file" @change="uploadPic" style="display:none;">
      <div class="pic-wrapper border1px" :style="{backgroundImage:'url(' + cropPic + ')'}" @click="choosePic">
        <i class="iconfont icon-xiangji" :style="{display: cropPic ? 'none' : 'inline-block'}"></i>
      </div>
    </div>
    <div class="search-button-box">
      <button class="button button-blue" v-for="item in category" @click="doSearch(item.category)">{{item.text}}</button>
    </div>
    <div class="result-container clearfix">
      <div class="text">搜索结果：</div>
      <div class="item-wrapper" v-for="item in resultArr">
        <base-item :item="item"></base-item>
      </div>
    </div>

    <paginator v-if="resultArr.length" :hasMore="hasMore" @more="loadMore"></paginator>
  </div>
</template>

<script>
// AlloyTeam 图片裁剪
import AlloyCrop from '../../common/js/crop/crop';
import {
  encoded,
  polling,
  getResult
} from '../../common/api/api';

import {
  formatCategory
} from '../../common/js/utils';

import blackTip from '../../common/js/tip/blackTip';

import {
  paginator,
  baseItem
} from '../../components/index';

export default {
  components: {
    paginator,
    baseItem
  },
  data() {
    return {
      category: [
        {text: '搜面料', category: 100010},
        {text: '搜大边', category: 100011},
        {text: '搜小边', category: 100012},
        {text: '搜睫毛', category: 100013}
      ],
      cropPic: '',
      resultArr: [],
      hasMore: false,
      pageNo: 1,
      searchCategory: '',
      id: '', // 轮询之后获得的id
      tip: null,
      isSearching: false
    };
  },
  methods: {
    choosePic() {
      this.$refs.file.click();
    },
    uploadPic() {
      var _this = this;
      var file = this.$refs.file.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = function() {
          var url = reader.result;
          _this.handleChoosePic(url);
        };
        reader.readAsDataURL(file);
      }
    },
    handleChoosePic(url) {
      var _this = this;
      /* eslint-disable no-new */
      new AlloyCrop({
          image_src: url,
          circle: false,
          width: 240,
          height: 240,
          ok: function(base64, canvas) {
              _this.cropPic = base64;
          },
          cancel: function() {},
          ok_text: '截取',
          cancel_text: '取消'
      });
    },
    doSearch(category) {
      if (!this.cropPic) {
        alert('请先上传一张图片');
        return;
      }
      var _this = this;
      if (_this.isSearching) {
        return;
      }
      _this.isSearching = true;
      _this.pageNo = 1;
      _this.searchCategory = category;
      _this.resultArr = []; // 置空resultArr
      _this.tip = blackTip({
        text: '搜索' + formatCategory(category) + '中',
        time: 100000
      });
      encoded({
        category: this.searchCategory,
        searchType: 300,
        encoded: this.cropPic
      }, function(res) {
        var searchKey = res.data.searchKey;
        var timer = setInterval(function() {
          polling({
            searchKey: searchKey
          }, function(res) {
            console.log(res.data);
            if (res.data !== -1) {
              _this.id = res.data;
              clearInterval(timer);
              timer = null;

              _this.getResult(_this.isSearching);
            }
          });
        }, 1000);
      }, function(res) {
        console.log('返回结果失败', res);
      });
    },
    getResult(isSearching) {
      var _this = this;
      var args = arguments;
      if (args.length === 0) {
        if (_this.isSearching) {
          return;
        }
        var b = blackTip({
          text: '正在加载中',
          time: 100000
        });
      }
      getResult({
        id: _this.id,
        pageNo: _this.pageNo,
        pageSize: 10
      }, function(res) {
        if (args.length) {
          _this.tip.remove();
          blackTip({
            type: 'success',
            text: '已完成'
          });
        } else {
          b.remove();
        }
        _this.resultArr = _this.resultArr.concat(res.data.list);
        // 如果返回结果小于 pageSize
        if (res.data.list.length === res.data.pageSize) {
          _this.hasMore = true;
          _this.pageNo++;
          // console.log('hasMore', _this.hasMore);
        }
        _this.isSearching = false;
        console.log('搜图最终返回结果', res);
      }, function(res) {
        if (_this.tip) {
           _this.tip.remove();
        }
      });
    },
    loadMore() {
      this.getResult();
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/styles/mixin.styl';

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
    .icon-xiangji
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
  // padding-bottom 32px
  .item-wrapper
    float left
    width 50%
    box-sizing border-box
    &:nth-of-type(even)
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    &:nth-of-type(odd)
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      border-right: 1px solid transparent;
</style>

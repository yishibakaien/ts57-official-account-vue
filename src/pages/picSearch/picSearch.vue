<template>
  <div class="pic-search-page">
    <div v-if="!receive.receiveId">
      <div class="search-category">
        <input type="file" name="file" accept="image/*" ref="file" @change="uploadPic" style="display:none;">
        <div class="pic-wrapper border1px" :style="{backgroundImage:'url(' + cropPic + ')'}" @click="choosePic">
          <i class="iconfont icon-tianjiatupian" :style="{display: cropPic ? 'none' : 'inline-block'}"></i>
        </div>
      </div>
      <!-- <div class="search-button-box">
        <button class="button button-blue" v-for="item in category" @click="doSearch(item.category)" :disabled="isSearching || !cropPic">{{item.text}}</button>
      </div> -->
    </div>
    <div v-if="receive.receiveId">
        <div class="receive-id-box">
          <div class="receive-pic-box">
            <img class="receive-pic" :src="receive.receiveSrc" width="80" height="80">
          </div>
          <div class="receive-pic-message">
            <p class="receive-type">查找类型：{{receive.category}}</p>
            <p class="receive-person">查找人：{{ receive.user && receive.user.userName ? receive.user.userName : ''}}</p>
            <p class="receive-tip">温馨提示：白色的花型图片更利于找到匹配花型</p>
          </div>
        </div>
    </div>
    <div class="result-container clearfix">
      <div class="text">搜索结果：</div>
      <p class="noresult-tip" v-if="noResult">非常抱歉，未能找到结果，请稍后再试</p>
      <div class="item-wrapper" v-for="item in resultArr">
        <!-- <base-item :item="item"></base-item> -->
        <ts-patterns-item :item="item"></ts-patterns-item>
      </div>
    </div>
    <paginator v-if="resultArr.length" :hasMore="hasMore" @more="loadMore"></paginator>

    <div id="cropperWrapper" ref="cropperWrapper" style="display: none;position: absolute;z-index: 101;top: 0;bottom: 0;width: 100%">
        <img id="cropperImage" ref="cropper" style="max-width: 100%">
    </div>
  </div>
</template>

<script>
// AlloyTeam 图片裁剪
import AlloyCrop from '../../common/js/crop/crop';
console.log(AlloyCrop);

var Cropper = require('../../common/js/cropNew/cropper.js').Cropper;
// import Cropper from '../../common/js/cropNew/cropper.js';

console.log('Cropper', Cropper);
// import AlloyCrop from '../../common/js/newCrop/alloyCrop.js';
import {
  encoded,
  polling,
  getResult,
  searchHistory
} from '../../common/api/api';

import {
  formatCategory,
  checkAndroid
} from '../../common/js/utils';

// import blackTip from '../../common/js/tip/blackTip';

import {
  paginator
  // baseItem
} from '../../components/index';
// import baseItem from './base-item.vue';
import {
  info,
  loading,
  success,
  hide
} from '../../common/js/tip/toast';

// import guide from '../../common/js/guide';
export default {
  components: {
    paginator
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
      isSearching: false,
      receive: {
        receiveId: '',
        receiveSrc: '',
        category: '',
        user: {}
      },
      noResult: false
    };
  },
  mounted() {
    // console.log('参数：', this.$route.query.img);
    var img = this.$route.query.img;
    var id = this.$route.query.id;

    if (img) {
      console.log('获取的route的图片', this.$route.query.img);
      this.handleChoosePic(this.$route.query.img);
    }

    if (id) {
      this.id = id;
      this.receive.receiveId = id;
      this.historySearch(id);
    }
    if (checkAndroid()) {
      this.$refs.file.setAttribute('captrue', 'camera');
    }
  },
  methods: {
    // guideToDownload() {
    //   guide('查看详情需要下载APP,是否前往下载?');
    // },
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
          // alert(url.length);
          _this.handleChoosePic(url);
        };
        reader.readAsDataURL(file);
      }
    },
    handleChoosePic(url) {
        // alert('进入了切图');
        var _this = this;
        // alert(url);
        /* eslint-disable no-new */
        // try {

        // AlloyCrop({
        //     image_src: url,
        //     circle: false,
        //     width: 240,
        //     height: 240,
        //     ok: function(base64) {
        //         _this.cropPic = base64;
        //     },
        //     cancel: function() {},
        //     ok_text: '截取',
        //     cancel_text: '取消'
        // });
        _this.$refs.cropper.src = url;
        var cropper = new Cropper(_this.$refs.cropper, {
            scalable: false,
            zoomable: false,
            autoCropArea: 0.6,
            minCropBoxWidth: 60,
            minCropBoxHeight: 60
        });
        console.log(cropper);
        _this.$refs.cropperWrapper.style.display = 'block';
        setTimeout(function() {
            bindCropEvent();
        }, 500);
        function bindCropEvent() {
            var btns = document.querySelectorAll('.btn-cell');
            console.log(btns, btns.length);
            Array.prototype.forEach.call(btns, function(item) {
                item.onclick = picCroped;
            });
        }
        function picCroped() {
            var category = Number(this.getAttribute('category'));
            // console.log(category);

            var base64 = cropper.getCroppedCanvas().toDataURL();
            console.log(base64);
            if (base64.length > 1000000) {
                alert('图片体积过大，您截取的图片大小需要再减少 ' + Math.floor(((base64.length / 1000000) - 1) * 100) + '% 左右');
                hide();
                return;
            };

            _this.$refs.cropperWrapper.style.display = 'none';

            _this.cropPic = base64;

            console.log('base64.length', base64.length);

            cropper.destroy();

            loading({
              text: '搜索' + _this.type(category) + '中'
            });

            _this.doSearch(category);
            // picSearchQueryParams.category = category;
            // picSearchQueryParams.encoded = base64;
            // doPicSearch();
        }
    },
    doSearch(category) {
      // 没有上传图片，则返回
      // if (!this.cropPic) {
      //   alert('请先上传一张图片');
      //   return;
      // }
      var _this = this;
      // 正在搜索中的状态，返回
      // if (_this.isSearching) {
      //   return;
      // }
      _this.noResult = false;
      _this.isSearching = true;
      _this.pageNo = 1;
      _this.searchCategory = category;
      _this.resultArr = []; // 每次点击搜索按钮 置空resultArr
      // 显示提示信息
      // _this.tip = blackTip({
      //   text: '搜索' + formatCategory(category) + '中',
      //   time: 100000
      // });
      loading({
        text: '搜索' + formatCategory(category) + '中'
      });
      // 提交base64 图片码
      encoded({
        category: this.searchCategory,
        searchType: 300,
        timeout: 60000,
        encoded: this.cropPic
      }, function(res) {
        if (res.code === 1004020) {
          alert(res.message);
        }
        if (res.code !== 0) {
          _this.noResult = true;
        }
        // 获得搜索key
        var searchKey = res.data.searchKey;
        // 开启轮询定时器
        var timer = setInterval(function() {
          polling({
            searchKey: searchKey
          }, function(res) {
            console.log(res.data);
            // 当轮询结果不为 -1 时，表示搜索完毕
            if (res.data !== -1) {
              // 记录此次搜索id
              _this.id = res.data;
              // 清空定时器
              clearInterval(timer);
              hide();
              // 如果没有 id 即不是传搜索结果 id 值 进入页面
              if (!_this.$route.query.id) {
                _this.$router.push({
                  path: 'picSearchResult?id=' + _this.id
                });
              }
              timer = null;
              // 根据id请求 搜索结果
              // 传一个参数 用来标记 是加载更多还是 重新请求
              _this.getResult(_this.isSearching);
            }
          });
        }, 1000);
      }, function(res) {
        info({
          text: '查找失败' + res.message
        });
        _this.isSearching = false;
      });
    },
    getResult(isSearching) {
      var _this = this;
      // 有args.length === 0 表示 来自点击搜索的那一下
      var args = arguments;
      console.log('args', args);
      if (args.length === 0) {
        if (_this.isSearching) {
          return;
        }
        loading({
          text: '正在加载中'
        });
      }
      getResult({
        id: _this.id,
        pageNo: _this.pageNo,
        pageSize: 10
      }, function(res) {
        if (args.length) {
          if (!res.data.list.length) {
            _this.noResult = true;
            return;
          }
          success({
            text: '已完成'
          });
        } else {
          hide();
        }
        var list = res.data.list.slice();

        list.sort(_this.sortByKey('isBest'));

        _this.resultArr = _this.resultArr.concat(list);
        // 如果返回结果小于 pageSize
        if (res.data.list.length === res.data.pageSize) {
          _this.hasMore = true;
          _this.pageNo++;
          // console.log('hasMore', _this.hasMore);
        }
        _this.isSearching = false;
        console.log('搜图最终返回结果', res);
      }, function(res) {
        _this.isSearching = false;
        info({
          text: res.message ? res.message : '请求出错'
        });
        // if (_this.tip) {
        //    _this.tip.remove();
        // }
      });
    },
    historySearch(id) {
      var _this = this;
      this.getResult();
      searchHistory({
        id: id
      }, function(res) {
        console.log('根据历史记录id搜索的图片结果', res);
        _this.receive.category = formatCategory(res.data.category);
        _this.receive.receiveSrc = res.data.searchSource;
        _this.receive.user = res.data.user;
      });
    },
    loadMore() {
      this.getResult();
    }
  }
};
</script>
<style lang="stylus">
@import '../../common/styles/mixin.styl';
// @import '../../common/js/cropNew/cropper.styl';
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
.noresult-tip
  text-align center
  padding 14px
  font-size 14px
  color #999
.result-container
  // padding-bottom 32px
  .item-wrapper
    itemListLayout()
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

// 截图组件
/*!
 * Cropper.js v1.0.0-rc.3
 * https://github.com/fengyuanchen/cropperjs
 *
 * Copyright (c) 2017 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2017-07-07T12:56:42.462Z
 */

.cropper-container {
  font-size: 0;
  line-height: 0;

  position: relative;

  -webkit-user-select: none;

     -moz-user-select: none;

      -ms-user-select: none;

          user-select: none;

  direction: ltr;
  -ms-touch-action: none;
      touch-action: none
}

.cropper-container img {
  /* Avoid margin top issue (Occur only when margin-top <= -height) */
  display: block;
  min-width: 0 !important;
  max-width: none !important;
  min-height: 0 !important;
  max-height: none !important;
  width: 100%;
  height: 100%;
  image-orientation: 0deg
}

.cropper-wrap-box,
.cropper-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.cropper-wrap-box {
  overflow: hidden;
}

.cropper-drag-box {
  opacity: 0;
  background-color: #fff;
}

.cropper-modal {
  opacity: .6;
  background-color: #000;
}

.cropper-view-box {
  display: block;
  overflow: hidden;

  width: 100%;
  height: 100%;

  outline: 1px solid #39f;
  outline-color: rgba(51, 153, 255, 0.75);
}

.cropper-dashed {
  position: absolute;

  display: block;

  opacity: .5;
  border: 0 dashed #eee
}

.cropper-dashed.dashed-h {
  top: 33.33333%;
  left: 0;
  width: 100%;
  height: 33.33333%;
  border-top-width: 1px;
  border-bottom-width: 1px
}

.cropper-dashed.dashed-v {
  top: 0;
  left: 33.33333%;
  width: 33.33333%;
  height: 100%;
  border-right-width: 1px;
  border-left-width: 1px
}

.cropper-center {
  position: absolute;
  top: 50%;
  left: 50%;

  display: block;

  width: 0;
  height: 0;

  opacity: .75
}

.cropper-center:before,
  .cropper-center:after {
  position: absolute;
  display: block;
  content: ' ';
  background-color: #eee
}

.cropper-center:before {
  top: 0;
  left: -3px;
  width: 7px;
  height: 1px
}

.cropper-center:after {
  top: -3px;
  left: 0;
  width: 1px;
  height: 7px
}

.cropper-face,
.cropper-line,
.cropper-point {
  position: absolute;

  display: block;

  width: 100%;
  height: 100%;

  opacity: .1;
}

.cropper-face {
  top: 0;
  left: 0;

  background-color: #fff;
}

.cropper-line {
  background-color: #39f
}

.cropper-line.line-e {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: e-resize
}

.cropper-line.line-n {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: n-resize
}

.cropper-line.line-w {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: w-resize
}

.cropper-line.line-s {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: s-resize
}

.cropper-point {
  width: 5px;
  height: 5px;

  opacity: .75;
  background-color: #39f
}

.cropper-point.point-e {
  top: 50%;
  right: -3px;
  margin-top: -3px;
  cursor: e-resize
}

.cropper-point.point-n {
  top: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize
}

.cropper-point.point-w {
  top: 50%;
  left: -3px;
  margin-top: -3px;
  cursor: w-resize
}

.cropper-point.point-s {
  bottom: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: s-resize
}

.cropper-point.point-ne {
  top: -3px;
  right: -3px;
  cursor: ne-resize
}

.cropper-point.point-nw {
  top: -3px;
  left: -3px;
  cursor: nw-resize
}

.cropper-point.point-sw {
  bottom: -3px;
  left: -3px;
  cursor: sw-resize
}

.cropper-point.point-se {
  right: -3px;
  bottom: -3px;
  width: 20px;
  height: 20px;
  cursor: se-resize;
  opacity: 1
}

@media (min-width: 768px) {

  .cropper-point.point-se {
    width: 15px;
    height: 15px
  }
}

@media (min-width: 992px) {

  .cropper-point.point-se {
    width: 10px;
    height: 10px
  }
}

@media (min-width: 1200px) {

  .cropper-point.point-se {
    width: 5px;
    height: 5px;
    opacity: .75
  }
}

.cropper-point.point-se:before {
  position: absolute;
  right: -50%;
  bottom: -50%;
  display: block;
  width: 200%;
  height: 200%;
  content: ' ';
  opacity: 0;
  background-color: #39f
}

.cropper-invisible {
  opacity: 0;
}

.cropper-bg {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
}

.cropper-hide {
  position: absolute;

  display: block;

  width: 0;
  height: 0;
}

.cropper-hidden {
  display: none !important;
}

.cropper-move {
  cursor: move;
}

.cropper-crop {
  cursor: crosshair;
}

.cropper-disabled .cropper-drag-box,
.cropper-disabled .cropper-face,
.cropper-disabled .cropper-line,
.cropper-disabled .cropper-point {
  cursor: not-allowed;
}

/*2017年7月28日17:14:11  cqw 新增*/
.cropper-btn-wrapper {
  position: absolute;
  width: 100%;
  display: flex;
  bottom: 0;
  height: 60px;
  background: rgba(0,0,0,0.7);
  color: #fff;
}
.cropper-btn-wrapper .btn-cell {
  flex: 1;
  height: 60px;
  text-align: center;
}
.cropper-btn-text {
  display: inline-block;
  position: absolute;
  bottom: 60px;
  text-align: center;
  line-height: 25px;
  font-size: 14px;
  width: 100%;
}
.cropper-btn {
  display: inline-block;
  line-height: 25px;
  margin-top: 17px;
  font-size: 14px;
  border-radius: 4px;
  width: 70px;
  height: 25px;
  border: 1px solid #fff;
}
</style>

<template>
  <div class="pic-search-page">
    <div v-if="!receive.receiveId">
      <div class="search-category">
        <input type="file" name="file" accept="image/*" ref="file" @change="uploadPic" style="display:none;">
        <div class="pic-wrapper border1px" :style="{backgroundImage:'url(' + cropPic + ')'}" @click="choosePic">
          <i class="iconfont icon-tianjiatupian" :style="{display: cropPic ? 'none' : 'inline-block'}"></i>
        </div>
      </div>
      <div class="search-button-box">
        <button class="button button-blue" v-for="item in category" @click="doSearch(item.category)" :disabled="isSearching || !cropPic">{{item.text}}</button>
      </div>
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
      <div class="item-wrapper" v-for="item in resultArr">
        <!-- <base-item :item="item"></base-item> -->
        <ts-patterns-item :item="item"></ts-patterns-item>
      </div>
    </div>

    <paginator v-if="resultArr.length" :hasMore="hasMore" @more="loadMore"></paginator>
  </div>
</template>

<script>
// AlloyTeam 图片裁剪
import AlloyCrop from '../../common/js/crop/crop';
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
      }
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
        AlloyCrop({
            image_src: url,
            circle: false,
            width: 240,
            height: 240,
            ok: function(base64) {
                _this.cropPic = base64;
            },
            cancel: function() {},
            ok_text: '截取',
            cancel_text: '取消'
        });
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
        encoded: this.cropPic
      }, function(res) {
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
          success({
            text: '已完成'
          });
        } else {
          hide();
        }
        var list = res.data.list.slice();

        function sortByKey(key) {
          return function(a, b) {
            return a[key] - b[key];
          }
        }

        list.sort(sortByKey('isBest'));

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
</style>

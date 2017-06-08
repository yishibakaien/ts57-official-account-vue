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
  </div>
</template>

<script>
// AlloyTeam 图片裁剪
import AlloyCrop from '../../common/js/crop/crop';
import {
  encoded
} from '../../common/api/api';
export default {
  data() {
    return {
      category: [
        {text: '搜面料', category: 100010},
        {text: '搜大边', category: 100011},
        {text: '搜小边', category: 100012},
        {text: '搜睫毛', category: 100013}
      ],
      cropPic: ''
    };
  },
  methods: {
    choosePic() {
      this.$refs.file.click();
    },
    uploadPic() {
      var file = this.$refs.file.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = () => {
          var url = reader.result;
          this.handleChoosePic(url);
        };
        reader.readAsDataURL(file);
      } else {
        // this.$toast('出错');
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

      encoded({
        category: category,
        searchType: 300,
        encoded: this.cropPic
      }, function(res) {
        console.log('搜图返回结果', res);
      }, function(res) {
        console.log('返回结果失败', res);
      });
    }
  }
};
</script>
<style lang="stylus">
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
.search-history
  background #fff
  .history-img
    width 30%
</style>

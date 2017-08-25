<template>
  <div class="patterns-detail-wrapper">
    <div class="patterns-pic-wrapper" :style="{backgroundImage: 'url(' + defaultPicUrl + ')'}"></div>
    <div class="desc-wrapper border-bottom">
        <div class="left">
            <div class="serial-number" id="productNo">
            <!-- #20001 -->{{productNo}}
            </div>
            <div class="price">
                <span class="price-text">参考价:&nbsp;&nbsp;</span><span class="money" id="price">{{price}}
                <!-- ￥10.00/码 -->
                </span>
            </div>
        </div>
        <div class="right" @click="guideToDownload">
            <div class="save" id="star">
            <span class="view-num" id="viewNum">{{viewCount}}</span>
                <!-- <i class="iconfont icon-star"></i> -->
                <!-- <span class="text">收藏</span> -->
            </div>
            <div class="page-view">

                <span>次浏览</span>
            </div>
        </div>
    </div>

    <div class="message border-bottom" id="companyMessage">
        <div class="avatar-wrapper">
            <img class="avatar" id="avatar" width="60" height="60" :src="companyMessage.companyHeadIcon ? companyMessage.companyHeadIcon : '../../static/images/default_avatar.png'">
        </div>
        <div class="content-wrapper" @click="guideToStore([companyMessage.id, companyMessage.indexName, companyMessage.isWebsite])">
            <div class="content">
                <div class="title">
                    <span class="tag" :class="{factory: companyMessage.companyType===1, stalls: companyMessage.companyType===2}" id="tag"></span><span class="name" id="companyName">
                    <!-- 福建坐视布管网络科技有限公司福建坐视布管网络科技有限公司 -->
                    {{companyMessage.companyName}}
                    </span>
                </div>
                <div class="desc" id="companyBusiness">
                  主营：{{companyMessage.companyExtendBO.companyBusiness}}
                </div>
            </div>
        </div>
        <i class="iconfont icon-back"></i>
    </div>

    <div class="patterns-params">
        <div class="parameter">
            <span class="name">类型:</span><span class="value" id="category">
            <!-- 面料 -->{{' ' + category}}
            </span>
        </div>
        <div class="parameter">
            <span class="name">成分:</span><span class="value" id="ingredient">
            <!-- 棉纶 -->{{' ' + ingredient}}
            </span>
        </div>
        <div class="parameter">
            <span class="name">库存:</span><span class="value" id="stock">
            <!-- 1000码 -->{{' ' + stock}}
            </span>
        </div>
        <div class="parameter">
            <span class="name">货型:</span><span class="value" id="shape">
            <!-- 胚布 -->{{' ' + productShape}}
            </span>
        </div>
        <div class="parameter">
            <span class="name">幅宽:</span><span class="value" id="width">
            <!-- 150cm -->{{' ' + width}}
            </span>
        </div>
        <div class="parameter">
            <span class="name">花高:</span><span class="value" id="height">
            <!-- 15cm -->{{' ' + height}}
            </span>
        </div>
        <!-- <div class="parameter">
            <span class="name">出码率:</span><span class="value">90%</span>
        </div> -->
    </div>
    <!-- <div class="footer border-top" @click="guideToDownload">
        <div class="dress" id="dress"><span class="pink">3D</span><span class="text">试衣</span></div>
        <div class="call" id="tel">
            <i class="iconfont icon-iconfontdianhua"></i>
            <span class="text">拨打电话</span>
        </div>
    </div> -->
  </div>
</template>

<script>
  import { getProduct, getCompanyInfo } from '@/common/api/api';
  import { miniPic, formateMoney, formatStockUnit, formatProduceShape, formatCategory } from '../../common/js/utils';
  import guide from '../../common/js/guide';
  // import { info } from '@/common/js/tip/toast';
  export default {
    data() {
      return {
        defaultPicUrl: '',
        productNo: '',
        price: '',
        viewCount: 0,
        productShape: '',
        category: '',
        ingredient: '',
        stock: '',
        width: '',
        height: '',
        companyMessage: {
          companyExtendBO: {}
        }
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        var _this = this;
        console.log(this.$route.query.dataId);
        getProduct({ id: this.$route.query.dataId }, function(res) {
          console.log('花型详情', res);
          var data = res.data;
          _this.defaultPicUrl = miniPic(data.defaultPicUrl, 400);
          _this.productNo = data.productNo;
          _this.price = formateMoney(data.price, data.priceUnit);
          _this.viewCount = data.viewCount;
          _this.stock = (data.stock ? data.stock : '0') + ' ' + formatStockUnit(data.stockUnit);
          _this.ingredient = data.ingredient;
          _this.category = formatCategory(data.category);
          _this.productShape = formatProduceShape(data.productShape);
          _this.width = data.width;
          _this.height = data.height;
        });
        getCompanyInfo({ companyId: this.$route.query.companyId }, function(res) {
            console.log('公司信息', res);
            _this.companyMessage = res.data;
            // _this.companyMessage.companyName = res.data.companyName;
            // _this.companyMessage.companyBusiness = res.data.companyExtendBO.companyBusiness;
            // _this.companyMessage.companyAvatar = res.data.companyHeadIcon;
            // _this.companyMessage.userType = res.data.userType;
          });
      },
      guideToDownload() {
        guide();
      },
      guideToStore([companyId, indexName, isWebsite]) {
        // alert('http://' + indexName + '.lacewang.cn');
        location.href = 'http://' + indexName + '.lacewang.cn';
        // if (isWebsite === 1) {
        //   location.href = 'http://' + indexName + '.ts57.cn';
        // }
        // if (isWebsite === 0) {
        //   location.href = 'http://www.ts57.cn/share/index.html?companyId=' + companyId;
        // }
      }
    },
    computed: {}
  };
</script>

<style lang="stylus" scoped>
@import '../../common/styles/mixin.styl';

.tag {
    display: inline-block;
    position: relative;
    height: 16px;
    width: 16px;
    color: #fff;
    font-size: 12px;
}

.tag.factory {
    font-weight: 700;
    background: #3385ff
}

.tag.factory:after {
    content: '厂';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}

.tag.stalls {
    font-weight: 700;
    background: #ff7011;
}

.tag.stalls:after {
    content: '贸';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}

.patterns-pic-wrapper {
    position: relative;
    width: 100%;
    padding-top: 70%;
    centerPic();
}
.desc-wrapper {
    display: flex;
    padding: 16px;
    background: #fff;
}
.desc-wrapper .left {
    -webkit-flex: 1;
    flex: 1;
}
.desc-wrapper .left .serial-number {
    // height: 16px;
    line-height: 16px;
    font-size: 16px;
}
.desc-wrapper .left .price {
    margin-top: 12px;
    font-size: 14px;
}
.desc-wrapper .left .price .price-text {
    color: #666;
}
.desc-wrapper .left .price .money {
    color: #439cfd;
}
// 2017年5月20日15:49:28 这里做了改动
.desc-wrapper .right {
    -webkit-flex: 0 0 70px;
    flex: 0 0 70px;
    width: 70px;
    // border-left: 1px solid #d9d9d9;
    text-align: center;
}
.desc-wrapper .right .view-num {
    // line-height: 25px;
    // color: #ff7011;
    font-size: 14px;
}
.desc-wrapper .right .save {
    border-left: 1px solid #d9d9d9;
    width: 100%;
    padding: 4px 0;
}
.desc-wrapper .right .icon-star {
    font-size: 20px;
    color: rgba(7, 17, 27, 0.3);
}
.desc-wrapper .right .text {
    font-size: 14px;
    color: #666;
}
.desc-wrapper .right .page-view {
    margin-top: 4px;
    font-size: 12px;
    color: #999;
}
.message {
    display: flex;
    position: relative;
    box-sizing: border-box;
    height: 72px;
    padding: 8px 15px;
    overflow: hidden;
    background: #fff;
}
.message .avatar-wrapper {
    flex: 0 0 60px;
    width: 60px;
    border-radius: 5px;
    overflow: hidden;
    margin-right: 10px;
}
.message .avatar-wrapper .avatar {
    display: inline-block;
    border-radius: 5px;
}
.message .content-wrapper {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    position: relative;
    overflow: hidden;
}
.message .content-wrapper .content {
    flex: 1;
    -webkit-flex: 1;
    position: relative;
    overflow: hidden;
    margin-top: 8px;
}
.message .content-wrapper .content .title {
    height: 16px;
    padding-right: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.message .content-wrapper .content .desc {
    width: 90%;
    height: 16px;
    line-height: 16px;
    margin-top: 5px;
    font-size: 11px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #666;
}
.message .title .tag {
    margin-right: 6px;
}
.message .title .tag,.message .title .name {
    line-height: 16px;
    font-size: 14px;
    vertical-align: top;
}
.message .content-wrapper .star-wrapper {
    flex: 0 0 57px;
    -webkit-flex: 0 0 57px;
    width: 57px;
    display: flex;
}
.message .icon-back{
    display: inline-block;
    position: absolute;
    height: 16px;
    line-height: 16px;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: #999
}
.patterns-params {
    padding: 0 16px;
    margin: 8px 0 80px 0;
    background: #fff;
}
.patterns-params .parameter {
    display: flex;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    border-bottom: 1px dashed #d9d9d9;
}
.patterns-params .parameter:last-child {
    border-bottom: 0;
}
.patterns-params .parameter .name {
    flex: 0 0 60px;
    width: 60px;
    display: inline-block;
    text-align: right;
}
.patterns-params .parameter .value {
    flex: 1;
    display: inline-block;
    margin-left: 20px;
    ellipsisLn(1);
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
}
/*footer*/
.footer {
    display: flex;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #fff;
}
.footer .dress {
    -webkit-flex: 1;
    flex: 1;
    font-size: 0;
}
.footer .dress .pink {
    display: inline-block;
    font-size: 16px;
    font-weight: 700;
    color: #ff0033;
}
.footer .dress .text {
    display: inline-block;
    font-size: 15px;
}
.footer .call {
    -webkit-flex: 1;
    flex: 1;
    background: #439cfd;
    color: #fff;
}
.footer .call .icon-iconfontdianhua {
    font-size: 20px;
}
.footer .call .text {
    font-size: 15px;
}
</style>

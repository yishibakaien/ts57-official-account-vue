<template>
  <div class="lookingfor-page">
    <div class="tab border-bottom">
      <div class="tab-item" v-for="(item, index) in tabItem" @click="select(item)" :class="{active: activeItem === item.info.route}" >
        <span class="text">{{item.text}}</span>
      </div>
    </div>
    <div class="patterns-container clearfix">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="btn-box border-top" v-if="userType === '2'">
      <button class="button button-blue button-block" @click="toRelease">发布求购</button>
    </div>
    <div class="btn-box border-top" v-if="userType === '1'">
      <button class="button button-blue button-block" @click="toRelease">发布供应</button>
    </div>
    <download-tip></download-tip>
  </div>
</template>

<script>
import {
  paginator,
  downloadTip
} from '../../components/index.js';
export default {
  data() {
    return {
      tabItem: [{
        text: '全部',
        info: {
          route: 'all',
          category: null
        }
      }, {
        text: '面料',
        info: {
          route: 'fabric',
          category: 100010
        }
      }, {
        text: '大边',
        info: {
          route: 'bigSide',
          category: 100011
        }
      }, {
        text: '小边',
        info: {
          route: 'smallSide',
          category: 100012
        }
      }, {
        text: '睫毛',
        info: {
          route: 'eyelash',
          category: 100013
        }
      }],
      activeItem: 'all',
      userType: localStorage.userType
    };
  },
  methods: {
    select(item) {
      // 高亮
      this.activeItem = item.info.route;
      // 路由
      this.$router.replace({
        path: '/lookingFor/' + item.info.route
      });
    },
    toRelease() {
      if (this.userType === '2') {
        // 档口
        this.$router.push({
          path: '/releaseBuy'
        });
      } else if (this.userType === '1') {
        // 厂家
        this.$router.push({
          path: '/releaseSupply'
        });
      }
    }
  },
  components: {
    paginator,
    downloadTip
  }
};
</script>
<style lang="stylus">
.tab
  display flex
  position fixed
  z-index 1
  top 0
  left 0
  right 0
  height 40px
  line-height 40px
  width 100%
  text-align center
  background #fff
  .tab-item
    flex 1
    .text
      display inline-block
      box-sizing border-box
      height 40px
      line-height 40px
    &.active
      color #4c93fd
      .text
          border-bottom 2px solid #4c93fd
.patterns-container
  margin-top 40px
  padding-bottom 100px
.btn-box
  position fixed
  bottom 0
  left 0
  right 0
  padding 8px 16px
  background #fff
.tipsInfo {
  text-align: center;
  font-size: 14px;
  line-height: 40px;
}
</style>

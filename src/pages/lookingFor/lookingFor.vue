<template>
  <div class="lookingfor-page">
    <div class="tab border-bottom">
      <div class="tab-item" v-for="(item, index) in tabItem" @click="select(item, index)" :class="{active: activeItem===item}" >
        <span class="text">{{item}}</span>
      </div>
    </div>
    <div class="patterns-container clearfix">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="btn-box border-top" v-if="false">
      <button class="button button-blue button-block">发布求购</button>
    </div>
    <div class="btn-box border-top">
      <button class="button button-blue button-block">发布供应</button>
    </div>
    <download-tip></download-tip>
  </div>
</template>

<script>
import {
  patternsList3,
  paginator,
  downloadTip
} from '../../components/index.js';
export default {
  data() {
    return {
      tabItem: ['全部', '面料', '大边', '小边', '睫毛'],
      tabItemRouter: ['all', 'fabric', 'bigSide', 'smallSide', 'eyelash'],
      activeItem: '全部'
    };
  },
  methods: {
    select(item, index) {
      // 高亮
      this.activeItem = item;
      // 路由
      this.$router.push({
        path: '/lookingFor/' + this.tabItemRouter[index]
      });
    }
  },
  components: {
    'patterns-list-3': patternsList3,
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
</style>

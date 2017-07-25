<template>
  <div id="app">
    <toast></toast>
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>

</template>

<script>
import { toast } from './components/index';
export default {
  components: {
    toast
  }
};
</script>

<style lang="stylus">
// 字体图标，其余页面无需引用
@import './common/styles/iconfont.css';
@import './common/styles/base.styl';
@import './common/styles/reset.styl';
body
  background #f2f2f2
  color #333
</style>

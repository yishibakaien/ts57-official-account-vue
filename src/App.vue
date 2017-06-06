<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style lang="stylus">
// 字体图标，其余页面无需引用
@import './common/styles/iconfont.css';
@import './common/styles/base.styl';
@import './common/css/main.css';
body
  background #f2f2f2
  color #333
</style>

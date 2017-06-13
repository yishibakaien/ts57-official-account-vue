<template>
  <div class="rank-tag" v-if="num < 4">
      <div class="top">TOP</div>
      <div class="number">{{num}}</div>
  </div>
</template>

<script>
export default {
  props: {
    num: {
      type: Number
    }
  }
};
</script>
<style lang="stylus">
.rank-tag {
    display inline-block;
    float: left;
    margin-left: -6px;
    text-align: center;
    background: #ff7011;
    color: #fff;
    transform: scale(0.5);
}
.rank-tag .top {
    height: 15px;
    line-height: 15px;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);
    padding: 3px 3px;
}
.rank-tag .number {
    position: relative;
    height: 13px;
    line-height: 15px;
    font-size: 15px;
}
.rank-tag .number:after {
    position: absolute;
    content: ' ';
    left: 0;
    bottom: -30px;
    border-top: 15px solid #ff7011;
    border-right: 15px solid transparent;
    border-left: 15px solid transparent;
    border-bottom: 15px solid transparent;
}

</style>

<template>
  <div class="lookingfor-page">
    <div class="tab border-bottom">
      <div class="tab-item" v-for="(item, index) in tabItem" @click="select(item)" :class="{active: activeItem===item}" >
        <span class="text">{{item}}</span>
      </div>
    </div>

  </div>
</template>

<script>
import {
  patternsList3,
  paginator
} from '../../components/index.js';
export default {
  data() {
    return {
      tabItem: ['全部', '面料', '大边', '小边', '睫毛'],
      activeItem: '全部'
    };
  },
  methods: {
    select(item) {
      this.activeItem = item;
    }
  },
  components: {
    'patterns-list-3': patternsList3,
    paginator
  }
};
</script>
<style lang="stylus">
.tab
  display flex
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


</style>


<!-- 废弃 暂时用confirm 代替 -->
<template>
  <div class="alert" v-show="isShow">
    <div class="overlay"></div>
    <transition name="fade">
      <div class="flashModel animated zoomIn">
        <div class="content1">
          <div class="title">您无此权限</div>
          <p>成为会员请联系热线电话:</p>
          <p>4008013357</p>
        </div>
        <div class="content2">
          <a class="cancel" href="javascript:;" @click="cancelMethod">稍后再说</a>
          <a class="yes" href="tel:4008013357">拨打热线</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      isShow: state => state.toast.isShow,
      text: state => state.toast.text,
      type: state => state.toast.type
    })
  }
};
</script>
<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active
  transition: all 0.1s;
.fade-enter, .fade-leave-active
  opacity: 0;
  transform: scale(0.8);

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
  z-index: 4999;
}
.alert {
  margin: 0;
  padding: 0;
  line-height: 1.6;
  position: fixed;
  z-index: 5000;
  width: 7.6em;
  min-height: 7.6em;
  top: 180px;
  left: 50%;
  margin-left: -3.8em;
  background: rgba(17,17,17,0.7);
  text-align: center;
  border-radius: 5px;
  color: #fff;
  word-break: break-all
}


</style>

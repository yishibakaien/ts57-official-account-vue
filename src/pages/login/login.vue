<template>
  <div class="login">
    <div class="input-wrapper">
      <input class="input" type="tel" maxlength="11" v-model="inputObject.userMobile" @blur="checkUserMobile" placeholder="请输入登录手机号码">
      <span class="border-bottom spliter" style="display:block"></span>
      <input class="input" type="password" @blur="checkPWD" v-model="inputObject.userPWD" placeholder="请输入密码">
    </div>
    <div class="v-code-wrapper border-top" v-if="picUrl">
        <input class="input" maxlength="4" @blur="checkCode" v-model="inputObject.picCode" type="text" placeholder="请输入验证码">
        <div class="v-code-image-wrapper">
          <img :src="picUrl" class="v-code-image">
        </div>
    </div>
    <div class="button-wrapper">
      <button class="button button-blue button-block" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import {
  testPWD,
  testSMSCode,
  testMobile
} from '../../common/js/regExp';
import {
  // getVerifyCode,
  login,
  checkPhone,
  getVerifyCode
} from '../../common/api/api';
// import md5 from 'blueimp-md5';
// import aes from 'aes-js';
import aes from '../../common/js/aes/mode-ecb';
import {
  objectAssign
} from '../../common/js/utils';
import {
  loading,
  success,
  info
} from '../../common/js/tip/toast';
// import {} from '../../components/index.js';
export default {
    data() {
        return {
            picUrl: '',
            hasPicCode: false,
            inputObject: {
              userMobile: '',
              userPWD: '',
              picCode: ''
            }
        };
    },
    methods: {
      checkUserMobile() {
        if (!testMobile(this.inputObject.userMobile)) {
          info({
            text: '手机号不正确'
          });
          return;
        }
        checkPhone({
          mobile: this.inputObject.userMobile
        }, function(res) {
          console.log('检查手机号码', res);
          if (res.data === false) {
            info({
              text: '手机号未注册',
              time: 1500
            });
          }
        });
      },
      checkPWD() {
        if (!testPWD(this.inputObject.userPWD)) {
          info({
            text: '密码格式错误',
            time: 1500
          });
          return;
        }
      },
      checkCode() {
        if (!testSMSCode(this.inputObject.picCode)) {
          info({
            text: '验证码格式不正确',
            time: 1500
          });
          return;
        }
      },
      checkInputObject() {
        var obj = this.inputObject;
        for (var key in obj) {
          if (!obj[key]) {
            return false;
          }
        }
      },
      login() {
        loading({
          text: '请稍后..'
        });
        var _this = this;
        // 复制data
        var data = objectAssign({}, this.inputObject);
        data.userPWD = aes(this.inputObject.userPWD);
        console.log(data);
        if (!testPWD(this.inputObject.userPWD)) {
          info({
            text: '密码格式错误',
            time: 1500
          });
          return;
        }
        if (!testMobile(this.inputObject.userMobile)) {
          info({
            text: '手机号不正确'
          });
          return;
        }

        if (this.hasPicCode) {
          if (!testSMSCode(this.inputObject.picCode)) {
            info({
              text: '验证码格式不正确',
              time: 1500
            });
            return;
          }
        }

        login(data, function(res, status, xhr) {
          if (res.code === 0) {
            success({
              text: '登录成功',
              complete: function() {
                console.log('success-complete');
                var redirect = decodeURIComponent(_this.$route.query.redirect);
                _this.$router.replace({
                  path: redirect
                });
              }
            });
            console.log('登录成功用户数据', res);
            console.log('登录成功x-token', xhr.getResponseHeader('x-token'));
            localStorage['x-token'] = xhr.getResponseHeader('x-token');
          }
          if (res.code === 2000004) {
            getVerifyCode({}, function(res) {
              console.log('获取图片验证码', res);
              _this.picUrl = 'data:image/jpeg;base64,' + res.data;
            });
          }
        }, function(res) {
          console.log('登录失败', res);
        });
      }
    }
};
</script>
<style lang="stylus">
.login
  .input-wrapper
    padding-left 16px
    background #fff
    .input
      display inline-block
      width 100%
      height 50px
  .v-code-wrapper
    display flex
    padding-left 16px
    background #fff
    .input
      flex 1
      display inline-block
      height 50px
    .v-code-image-wrapper
      flex 0 0 100px
      width 100px
      height 50px
      .v-code-image
        display inline-block
        width 100%
        height 100%
  .button-wrapper
    padding 32px 16px
</style>

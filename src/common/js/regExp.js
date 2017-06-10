// 电话
function testMobile(tel) {
    return /^1(3|4|5|7|8)[0-9]\d{8}$/.test(tel || '');
}
// 密码
function testPWD(pwd) {
    return /.{6,16}/.test(pwd || '');
}
// 图片验证码
function testSMSCode(str) {
    return /\d{4}/.test(str || '');
}

export {
  testMobile,
  testPWD,
  testSMSCode
};

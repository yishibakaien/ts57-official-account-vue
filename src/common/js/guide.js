
export default function(str) {
  var _str = str ? str : '您可以在统搜57APP中进行此项操作，是否前往下载？';
  var result = confirm(_str);
  if (result) {
    location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=cn.ts57.app';
  }
}

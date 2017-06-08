'use strict';
/**
 * 返回图片base64地址
 */
// function uploadPictrue(file, resolve) {
//     if (file.files && file.files[0]) {
//         var reader = new FileReader();
//         reader.onload = function(evt) {
//             // alert('转码完毕图片地址为:', evt.target.result);
//             resolve(evt.target.result);
//         };
//         reader.readAsDataURL(file.files[0]);
//     }
// }
// module.exports = uploadPictrue;
//

// 上传图片，传入input[type=file] 的onchange 事件
// 返回一个 Promise 对象
function uploadPictrue(e) {
  return _getBase64Image(e);
}

function _getBase64Image(file) {
  let reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (evt) => {
      resolve(evt.target.result);
    };
    reader.onerror = (evt) => {
      reject(evt);
    };
    reader.readAsDataURL(file);
  });
}

export default uploadPictrue;


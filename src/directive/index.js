import { miniPic } from '../common/js/utils';
// 加载图片
export const loadImg = {
  bind(el) {
    let img = new Image();
    img.src = el.dataset.src;
    el.style.cssText = 'transition: "";opacity: 0;';
    img.onload = function() {
      if (img.complete) {
        el.src = img.src;
        el.style.cssText = 'transition: .5s;opacity: 1;';
      }
    };
    img.onerror = function() {
      el.src = 'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=1427827064,1355978036&fm=85&s=07A0FD028B7435880CEC5401030030E2';
      el.style.cssText = 'transition: .5s;opacity: 1;';
    };
  }
};
// 加载错误图片(头像)
export const errorImg = value => {
  if (!value) {
    return;
  }
  value.onerror = function() {
    value.src = '/static/images/assets/defaultHeadIcon.svg';
  };
  value.src = (!value.src)
    ? '/static/images/assets/defaultHeadIcon.svg'
    : value.src;
};
// 加载错误图片(公司logo)
export const errorLogo = value => {
  if (!value) {
    return;
  }
  value.onerror = function() {
    value.src = '/static/images/assets/defaultHeadIcon.svg';
  };
  value.src = (!value.src)
    ? '/static/images/assets/defaultHeadIcon.svg'
    : value.src;
};
// input聚焦
export const focus = (el) => {
	el.focus();
};

// 花型图片(背景)加载
export function patternsPic(el, args) {
  var formatPicUrl = miniPic(args.value.pic, args.value.size);
  var _img = new Image();
  _img.onload = function() {
    el.style.backgroundImage = 'url(' + formatPicUrl + ')';
  };
  _img.onerror = function() {
    // el.style.backgroundImage = 'url(/static/images/assets/defaultFlower.svg)';
    el.style.cssText = 'background-color:#ccc;text-align:center;position:relative';
    // el.style.backgroundColor = '#ccc';
    // el.style.textAlign = 'center';
    // el.style.position = 'relative';
    el.innerHTML = '<p style="position:absolute;top:50%;left:50%;width:80%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;transform:translateX(-50%) translateY(-50%);-webkit-transform:translateX(-50%) translateY(-50%);color:#fff">' + (args.value.name ? args.value.name : '') + '</p>';
  };
  _img.src = formatPicUrl;
}

export function formatCategory(num) {
	num = Number(num);
	if (num === 100010) {
		return '面料';
	} else if (num === 100011) {
		return '大边';
	} else if (num === 100012) {
		return '小边';
	} else if (num === 100013) {
		return '睫毛';
	} else {
		return '未分类';
	}
}

export function formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : _padLeftZero(str));
		}
	}
	return fmt;

	function _padLeftZero(str) {
		return ('00' + str).substr(str.length);
	}
};

// 判断是安卓还是IOS
export function checkIOS() {
	let u = navigator.userAgent;
	// var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
	let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
	if (isiOS) {
		return true;
	} else {
		return false;
	}
}

// Object.assign
export function objectAssign(target, source) {
  if (!target || !source) {
    return target || {};
  }
  if (target instanceof Object) {
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target;
}

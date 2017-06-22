export function formatCategory(num) {
    if (/(number|string)/.test(num)) {
        throw new Error('typeof argument expect number or string.');
    }
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
export function checkAndroid() {
  return navigator.userAgent.indexOf('Android') > -1;
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
// 阿里云OSS 图片mini 化
// 文档：https://help.aliyun.com/document_detail/44957.html?spm=5176.87240.400427.42.4GrM0b
export function miniPic() {
    var url = Array.prototype.shift.call(arguments);
    // 判断参数
    if (url.indexOf('?x-oss-process=image') === -1) {
        url += '?x-oss-process=image';
    }
    var options = Array.prototype.shift.call(arguments);
    if (Object.prototype.toString.apply(options) === '[object Object]') {
        return url + '/resize,w_' + options.w + ',h_' + options.h;
    }
    if (/(number|string)/.test(typeof options)) {
        return url + '/resize,w_' + options + ',h_' + options;
    }
    // 默认缩小为 300 * 300
    return url + '/resize,w_300,h_300';
}

export function formateMoney(price, unit) {
    // 金额以 分 作为单位
    if (!price) {
        return '价格面议';
    }
    unit = Number(unit);
    var _unit = '';
    if (unit === 400010) {
        _unit = '码';
    } else if (unit === 400011) {
        _unit = '公斤';
    } else if (unit === 400012) {
        _unit = '条';
    }
    return '￥ ' + (price / 100) + ' / ' + _unit;
}
export function formatStockUnit(unit) {
    unit = Number(unit);
    var _unit = '';
    if (unit === 400010) {
        _unit = '码';
    } else if (unit === 400011) {
        _unit = '公斤';
    } else if (unit === 400012) {
        _unit = '条';
    }
    return _unit;
}

export function formatProduceShape(num) {
    if (num === 200010) {
        return '胚布';
    } else if (num === 200011) {
        return '成品';
    } else {
        return '成品';
    }
}

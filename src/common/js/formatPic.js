
function formatPic() {
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

var _img = (function() {
    var img = new Image();
    return function(src) {
        img.src = src;
    };
})();

var proxyImage = (function() {
    var img = new Image();
    img.onload = function() {
        _img(this.src);
    };
    return function(src) {
        _img('/images/default_banner.png');
        img.src = src;
    };
})();

function setCookie(name, value, expiresHours) {
    var cookieString = name + '=' + escape(value);
    //判断是否设置过期时间,0代表关闭浏览器时失效
    if (expiresHours > 0) {
        var date = new Date();
        date.setTime(date.getTime + expiresHours * 3600 * 1000);
        cookieString = cookieString + '; expires=' + date.toGMTString();
    }
    document.cookie = cookieString;
}

function getCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split('; ');
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split('=');
        if (arr[0] == name) {
            return unescape(arr[1]);
        } else {
            return '';
        }
    }
}

function deleteCookie(name) {
    var date = new Date();
    date.setTime(date.getTime() - 10000); //设定一个过去的时间即可
    document.cookie = name + '=v; expires=' + date.toGMTString();
}

module.exports = {
    setCookie,
    getCookie,
    deleteCookie
}

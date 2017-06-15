'use strict';
// var env = 'test_new'; // 开发环境
var env = 'test'; // 测试环境

var headers = {
    'x-version': '1.0',
    'x-client': '4'
};

var baseURL = (function(env) {
    var urls = {
        dev: 'http://localhost:3001',
        test: 'http://192.168.2.11:8080',
        test_new: 'http://api.tswq.wang',
        prod: ''
    };
    return urls[env];
})(env);

export {
    headers,
    baseURL
};

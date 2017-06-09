'use strict';
var env = 'test'; // 开发环境
// var env = 'test'; // 测试环境

var headers = {
    'x-version': '1.0',
    'x-client': '4'
};

var baseURL = (function(env) {
    var baseURL;
    var urls = {
        dev: 'http://localhost:3001',
        test: 'http://192.168.2.11:8080',
        test_new: 'http://192.168.2.11/api',
        prod: ''
    };
    if (env === 'dev') {
        baseURL = urls.dev + '/api'; // 这里的这个 /api 是proxy跨域代理的配置
    }
    if (env === 'test') {
        baseURL = urls.test;
    }
    if (env === 'prod') {
        baseURL = urls.prod;
    }
    if (env === 'test_new') {
        baseURL = urls.test_new;
    }
    return baseURL;
})(env);

export {
    headers,
    baseURL
};

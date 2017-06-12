'use strict';

import { headers, baseURL } from '../config/config';

import { Ajax } from './ajax';

import { info } from '../js/tip/toast';
import router from '../../router';
// console.log(loading, error);
const API = {
    lyf: {
        releaseCompanySupply: '/companySupply/releaseCompanySupply', // 发布供应
        releaseProductBuy: '/productBuy/releaseProductBuy', // 发布求购
        getProductBuy: '/productBuy/getProductBuy', // 求购详情
        addProduct: '/product/addProduct', // 新增花型
        addIngredient: '/ingredient/addIngredient', // 自定义成分
        listHomeProductBuys: '/productBuy/listHomeProductBuys', // 求购列表
        byTypeKey: '/front/dicTree/byTypeKey', // 字典
        listIngredients: '/ingredient/listIngredients', // 获取成分列表
        token: '/file/token' // OSS token
    },
    user: {
        login: '/front/user/login', // 登录
        checkPhone: '/front/user/checkPhone', // 检查手机号码是否存在
        getVerifyCode: '/front/user/getVerifyCode' // 获取图片验证码
    },
    main: {
        // 首页进来之后需要展示的信息
        // ①、[获取系统定义花型分类列表] 获取data(Array) Array[0] 爆款 Array[1] 新品 里的id 参数
        listSystemProductCategory: '/productCategory/listSystemProductCategory',

        // ②、[获取自定义花型分类列表] 获取data.list(Array) 获取 Array[index] 里的id 参数
        listUserProductCategory: '/productCategory/listUserProductCategory',

        // ③、用 ① 和 ② 获取获取到的id 到 [工厂or档口管理] 下的 [店铺分类绑定的花型列表]当做classId传参
        listCompanyBindingProduct: '/productCategoryBanding/listCompanyBindingProduct',

        // 店铺供应列表
        listVisitCompanySupplys: '/companySupply/listVisitCompanySupplys',

        // 2017年5月18日 新增？
        // 店铺系统定义花型分类列表
        listVisitSystemProductCategory: '/productCategory/listVisitSystemProductCategory',

        // 2017年5月18日 新增？
        // 店铺自定义花型分类列表
        listVisitUserProductCategory: '/productCategory/listVisitUserProductCategory',

        // 获取店铺花型列表
        listVistitCompanyProducts: '/product/listVistitCompanyProducts'
    },
    company: {
        // 获取档口OR工厂信息
        getCompanyInfo: '/company/getCompanyInfo',

        // 获取简单的公司信息
        getCompanySimpleInfo: '/company/getCompanySimpleInfo',

        // 店铺花型分类
        listProductCategory: '/productCategory/listProductCategory',

        // 获取花型列表
        listProducts: '/product/listProducts',

        // 获取分类绑定的花型列表
        listBindingProduct: '/productCategoryBanding/listBindingProduct'
    },
    list: {
        listCompanyNewProduct: '/product/listCompanyNewProduct'
    },
    detail: {
        // 获取花型详情
        getProduct: '/product/getProduct/',

        // 获取供应详情
        getCompanySupply: '/companySupply/getCompanySupply/'
    },
    search: {
        // 文本搜索
        search: '/product/search',
        // 图片搜索会返回阿里云url
        encoded: '/search/encoded',
        // 图片搜索发起后像客户端 轮询 搜索结果
        polling: '/search/polling/',
        // 通过url 搜索图片
        url: '/search/url',
        // 获取最终的结果
        getResult: '/search/getResult',

        // 爆款热搜列表
        burstHot: '/search/burstHot',
        // 大家在找
        history: '/search/history'
    }
};

const METHODS = {
    get: 'GET',
    post: 'POST'
};

function _formatData(method, data) {
    if (!data) {
        return '';
    }
    if (method === METHODS.get) {
        return data;
    } else if (method === METHODS.post) {
        return JSON.stringify(data);
    }
}

function _fetch(method = METHODS.get, data, url, cb, err) {
    let _headers = headers;
    // 登录之后的token
    if (localStorage['x-token']) {
      _headers['x-token'] = localStorage['x-token'];
    }
    let param = {
        method: method,
        url: baseURL + url,
        headers: _headers,
        data: _formatData(method, data),
        success: function(res, status, xhr) {
            if (res.code !== 0) {
                info({
                    text: res.message
                });
                if (res.code === 210018) {
                  // 用户未登录，清空本地缓存
                  localStorage.clear();
                  console.log(router);
                  router.push({
                    path: 'login'
                  });
                }
            }
            if (typeof cb === 'function') {
                // cb.apply(this, arguments);
                cb(res, status, xhr);
            }
        },
        error: function(res) {
            info({
                text: '请检查网络'
            });
            // 待定 也blackTip 统一处理
            if (typeof err === 'function') {
                err(res);
            }
        }
    };
    // console.log(param);
    Ajax(param);
}

// 检查手机号码，此接口没有跨域问题
export function checkPhone(data, cb, err) {
    return _fetch(METHODS.get, data, API.user.checkPhone, cb, err);
}
// 用户登录
export function login(data, cb, err) {
  return _fetch(METHODS.post, data, API.user.login, cb, err);
}
// 获取图片验证码
export function getVerifyCode(data, cb, err) {
  return _fetch(METHODS.post, data, API.user.getVerifyCode, cb, err);
}

// 获取公司信息(详细)
export function getCompanyInfo(data, cb, err) {
    return _fetch(METHODS.get, data, API.company.getCompanyInfo, cb, err);
}

// 获取公司信息(简单)
export function getCompanySimpleInfo(data, cb, err) {
    return _fetch(METHODS.post, data, API.company.getCompanySimpleInfo, cb, err);
}

// 获取花型分类信息
export function listProductCategory(data, cb, err) {
    return _fetch(METHODS.get, data, API.company.listProductCategory, cb, err);
}

// 获取花型列表
export function listProducts(data, cb, err) {
    return _fetch(METHODS.post, data, API.company.listProducts, cb, err);
}

// 获取自定义花型分类列表
export function listUserProductCategory(data, cb, err) {
    return _fetch(METHODS.post, data, API.main.listUserProductCategory, cb, err);
}

// 获取系统定义花型分类列表
export function listSystemProductCategory(data, cb, err) {
    return _fetch(METHODS.get, data, API.main.listSystemProductCategory, cb, err);
}

// 获取分类绑定的花型列表
export function listBindingProduct(data, cb, err) {
    return _fetch(METHODS.get, data, API.company.listBindingProduct, cb, err);
}

// 获取花型详情
export function getProduct(data, cb, err) {
    let _data = data;
    let url = API.detail.getProduct.toString() + _data.id.toString();
    return _fetch(METHODS.get, {}, url, cb, err);
}

// 获取供应详情
export function getCompanySupply(data, cb, err) {
    let _data = data;
    let url = API.detail.getCompanySupply.toString() + _data.id.toString();
    return _fetch(METHODS.get, {}, url, cb, err);
}

// 店铺分类绑定的花型列表
export function listCompanyBindingProduct(data, cb, err) {
    return _fetch(METHODS.get, data, API.main.listCompanyBindingProduct, cb, err);
}

// 店铺供应列表
export function listVisitCompanySupplys(data, cb, err) {
    return _fetch(METHODS.get, data, API.main.listVisitCompanySupplys, cb, err);
}

// 2017年5月18日 新增？
// 店铺系统定义花型分类列表
export function listVisitSystemProductCategory(data, cb, err) {
    return _fetch(METHODS.get, data, API.main.listVisitSystemProductCategory, cb, err);
}

// 2017年5月18日 新增？
// 店铺自定义花型分类列表
export function listVisitUserProductCategory(data, cb, err) {
    return _fetch(METHODS.post, data, API.main.listVisitUserProductCategory, cb, err);
}

// 获取店铺花型列表
export function listVistitCompanyProducts(data, cb, err) {
    return _fetch(METHODS.post, data, API.main.listVistitCompanyProducts, cb, err);
}

// 搜索
export function search(data, cb, err) {
    return _fetch(METHODS.post, data, API.search.search, cb, err);
}
// 图片搜索
export function encoded(data, cb, err) {
    return _fetch(METHODS.post, data, API.search.encoded, cb, err);
}
// 图片搜索结果 轮询
export function polling(data, cb, err) {
    let _data = data;
    let url = API.search.polling.toString() + _data.searchKey.toString();
    return _fetch(METHODS.get, {}, url, cb, err);
}
// 通过url搜索 图片
export function urlSearch(data, cb, err) {
    return _fetch(METHODS.post, data, API.search.url, cb, err);
}

// 获取搜索结果 图片
export function getResult(data, cb, err) {
    return _fetch(METHODS.get, data, API.search.getResult, cb, err);
}
// 厂家上新
export function listCompanyNewProduct(data, cb, err) {
    return _fetch(METHODS.get, data, API.list.listCompanyNewProduct, cb, err);
}

// lyf qpi
// 求购详情
export function getProductBuy(data, cb, err) {
    let _data = data;
    let url = API.lyf.getProductBuy.toString() + '/' + _data.id.toString();
    return _fetch(METHODS.get, {}, url, cb, err);
}
// 自定义成分
export function addIngredient(data, cb, err) {
    return _fetch(METHODS.post, data, API.lyf.addIngredient, cb, err);
}
// OSS token
export function token(data, cb, err) {
    return _fetch(METHODS.post, data, API.lyf.token, cb, err);
}
// 获取成分列表
export function listIngredients(data, cb, err) {
    return _fetch(METHODS.get, data, API.lyf.listIngredients, cb, err);
}
// 新增花型
export function addProduct(data, cb, err) {
    return _fetch(METHODS.post, data, API.lyf.addProduct, cb, err);
}
// 发布供应
export function releaseCompanySupply(data, cb, err) {
    return _fetch(METHODS.post, data, API.lyf.releaseCompanySupply, cb, err);
}
// 发布求购
export function releaseProductBuy(data, cb, err) {
    return _fetch(METHODS.post, data, API.lyf.releaseProductBuy, cb, err);
}
<<<<<<< HEAD
// 求购列表
export function listHomeProductBuys(data, cb, err) {
    return _fetch(METHODS.get, data, API.lyf.listHomeProductBuys, cb, err);
=======

// 爆款热搜
export function burstHot(data, cb, err) {
  return _fetch(METHODS.get, data, API.search.burstHot, cb, err);
}

// 大家在找
export function history(data, cb, err) {
  return _fetch(METHODS.get, data, API.search.history, cb, err);
>>>>>>> b57fb08289434ef8f29a12ecb854156d47f17c3b
}

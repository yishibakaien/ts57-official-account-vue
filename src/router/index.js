import Vue from 'vue';
import Router from 'vue-router';
import {
    addPatterns,
    hotPatterns,
    lookingFor,
    picSearch,
    login,

    // lyf
    newPatterns,
    releaseBuy,
    releaseSupply,
    buyDetail
} from '../pages/pages.js';

Vue.use(Router);
// 大家在找页面 二级路由 按需加载
const lookingForAll = resolve => require(['../pages/lookingFor/children/all'], resolve);
const lookingForFabric = resolve => require(['../pages/lookingFor/children/fabric'], resolve);
const lookingForBigSide = resolve => require(['../pages/lookingFor/children/bigSide'], resolve);
const lookingForSmallSide = resolve => require(['../pages/lookingFor/children/smallSide'], resolve);
const lookingForEyelash = resolve => require(['../pages/lookingFor/children/eyelash'], resolve);

export default new Router({
    routes: [{
        path: '/login',
        name: 'login',
        component: login
    }, {
        path: '/addPatterns',
        name: 'addPatterns',
        component: addPatterns
    }, {
        path: '/hotPatterns',
        name: 'hotPatterns',
        component: hotPatterns
    }, {
        path: '/lookingFor',
        redirect: '/lookingFor/all',
        name: 'lookingFor',
        component: lookingFor,
        children: [{
            // 全部
            path: 'all',
            component: lookingForAll
        }, {
            // 面料
            path: 'fabric',
            component: lookingForFabric
        }, {
            // 大边
            path: 'bigSide',
            component: lookingForBigSide
        }, {
            // 小边
            path: 'smallSide',
            component: lookingForSmallSide
        }, {
            // 睫毛
            path: 'eyelash',
            component: lookingForEyelash
        }]
    }, {
        path: '/picSearch',
        name: 'picSearch',
        component: picSearch
    }, {
        path: '/newPatterns',
        name: 'newPatterns',
        component: newPatterns
    }, {
        path: '/releaseBuy',
        name: 'releaseBuy',
        component: releaseBuy
    }, {
        path: '/releaseSupply',
        name: 'releaseSupply',
        component: releaseSupply
    }, {
        path: '/buyDetail',
        name: 'buyDetail',
        component: buyDetail
    }]
});

import Vue from 'vue';
import Router from 'vue-router';
import {
    addPatterns,
    hotPatterns,
    lookingFor,
    picSearch,
    patternsDetail,
    login,
    textSearch,
    // lyf
    newPatterns,
    releaseBuy,
    releaseSupply,
    releaseSuccess,
    releaseBefore,
    buyDetail,
    listPage,
    supplyList,
    supplyDetail,
    newEnter,
    searchCompany,
//  listSelect,
    zsbg,
    tsNav
} from '../pages/pages';
// import {
//     getCookie
// } from '../common/js/cookie/cookie';

// import {
//     authorizeUrl
// } from '../common/api/api';

Vue.use(Router);
// 大家在找页面 二级路由 按需加载
const lookingForAll = resolve => require(['../pages/lookingFor/children/all'], resolve);
const lookingForFabric = resolve => require(['../pages/lookingFor/children/fabric'], resolve);
const lookingForBigSide = resolve => require(['../pages/lookingFor/children/bigSide'], resolve);
const lookingForSmallSide = resolve => require(['../pages/lookingFor/children/smallSide'], resolve);
const lookingForEyelash = resolve => require(['../pages/lookingFor/children/eyelash'], resolve);

var routes = {
    mode: 'history',
    routes: [{
        path: '/',
        redirect: '/tsNav'
    }, {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: '登录'
        }
    }, {
        path: '/tsNav',
        name: 'tsNav',
        component: tsNav,
        meta: {
            title: '导航'
        }
    }, {
        path: '/addPatterns',
        name: 'addPatterns',
        component: addPatterns,
        meta: {
            needAuth: true,
            title: '厂家上新'
        }
    }, {
        path: '/hotPatterns',
        name: 'hotPatterns',
        component: hotPatterns,
        meta: {
            title: '爆款热搜'
        }
    }, {
        path: '/lookingFor',
        redirect: '/lookingFor/all',
        name: 'lookingFor',
        component: lookingFor,
        meta: {
            needAuth: true,
            title: '大家在找'
        },
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
        // 文本搜索
        path: '/textSearch',
        name: 'textSearch',
        component: textSearch
    }, {
        path: '/picSearch',
        name: 'picSearch',
        component: picSearch,
        meta: {
            title: '快照搜花'
        }
    }, {
        path: '/newPatterns',
        name: 'newPatterns',
        component: newPatterns,
        meta: {
            needAuth: true,
            title: '新增花型'
        }
    }, {
        path: '/releaseBuy',
        name: 'releaseBuy',
        component: releaseBuy,
        meta: {
            needAuth: true,
            title: '发布求购'
        }
    }, {
        path: '/releaseSupply',
        name: 'releaseSupply',
        component: releaseSupply,
        meta: {
            needAuth: true,
            title: '发布供应'
        }
    }, {
        path: '/releaseBefore',
        name: 'releaseBefore',
        component: releaseBefore,
        meta: {
            needAuth: true,
            title: '跳转中'
        }
    }, {
        path: '/buyDetail',
        name: 'buyDetail',
        component: buyDetail,
        meta: {
            needAuth: true,
            title: '求购详情'
        }
    }, {
        path: '/supplyDetail',
        name: 'supplyDetail',
        component: supplyDetail,
        meta: {
            needAuth: true,
            title: '供应详情'
        }
    }, {
        path: '/supplyList',
        name: 'supplyList',
        component: supplyList,
        meta: {
            needAuth: true,
            title: '供应列表'
        }
    }, {
        path: '/listSelect',
        name: 'listPage',
        component: listPage,
        meta: {
            needAuth: true,
            title: '供应求购'
        }
    }, {
        path: '/releaseSuccess',
        name: 'releaseSuccess',
        component: releaseSuccess,
        meta: {
            title: '成功发布'
        }
    }, {
        path: '/newEnter',
        name: 'newEnter',
        component: newEnter,
        meta: {
            title: '入驻信息'
        }
    }, {
        path: '/searchCompany',
        name: 'searchCompany',
        component: searchCompany,
        meta: {
            title: '搜索结果'
        }
    }, {
        path: '/patternsDetail',
        name: 'patternsDetail',
        component: patternsDetail,
        meta: {
            title: '花型详情'
        }
    }, {
        path: '/zsbg',
        name: 'zsbg',
        component: zsbg,
        meta: {
            title: '坐视布管简介'
        }
    }]
};

var router = new Router(routes);

// 页面路由钩子，判断进入的页面是够需要登录验证(needAuth);
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.needAuth)) {
        if (localStorage['x-token']) {
            next();
        } else {
        alert(to.fullPath);
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            });
        }
    } else {
        next();
    }
});

// 现在需要生成微信授权url
// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.needAuth)) {
//         if (getCookie['x-token']) {
//             next();
//         } else {
//             console.log('location.host', location.host);
//             authorizeUrl({
//                 redirectUrl: location.host + '/login'
//             }, function(res) {
//                 alert(JSON.stringify(res));
//                 location.href = res.data;
//             });
//         }
//     } else {
//         next();
//     }
// });

export default router;

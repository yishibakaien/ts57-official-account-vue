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
    buyDetail,
    buyList,
    releaseSuccess,
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
        path: '/buyDetail',
        name: 'buyDetail',
        component: buyDetail,
        meta: {
            needAuth: true,
            title: '求购详情'
        }
    }, {
        path: '/buyList',
        name: 'buyList',
        component: buyList,
        meta: {
            needAuth: true,
            title: '求购列表'
        }
    }, {
        path: '/releaseSuccess',
        name: 'releaseSuccess',
        component: releaseSuccess,
        meta: {
            title: '成功发布'
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

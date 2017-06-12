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
    releaseSuccess
} from '../pages/pages.js';

Vue.use(Router);
// 大家在找页面 二级路由 按需加载
const lookingForAll = resolve => require(['../pages/lookingFor/children/all'], resolve);
const lookingForFabric = resolve => require(['../pages/lookingFor/children/fabric'], resolve);
const lookingForBigSide = resolve => require(['../pages/lookingFor/children/bigSide'], resolve);
const lookingForSmallSide = resolve => require(['../pages/lookingFor/children/smallSide'], resolve);
const lookingForEyelash = resolve => require(['../pages/lookingFor/children/eyelash'], resolve);

var routes = {
    routes: [{
        path: '/login',
        name: 'login',
        component: login
    }, {
        path: '/addPatterns',
        name: 'addPatterns',
        component: addPatterns,
        meta: {
          needAuth: true
        }
    }, {
        path: '/hotPatterns',
        name: 'hotPatterns',
        component: hotPatterns
    }, {
        path: '/lookingFor',
        redirect: '/lookingFor/all',
        name: 'lookingFor',
        component: lookingFor,
        meta: {
          needAuth: true
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
        component: picSearch
    }, {
        path: '/newPatterns',
        name: 'newPatterns',
        component: newPatterns,
        meta: {
          needAuth: true
        }
    }, {
        path: '/releaseBuy',
        name: 'releaseBuy',
        component: releaseBuy,
        meta: {
          needAuth: true
        }
    }, {
        path: '/releaseSupply',
        name: 'releaseSupply',
        component: releaseSupply,
        meta: {
          needAuth: true
        }
    }, {
        path: '/buyDetail',
        name: 'buyDetail',
        component: buyDetail,
        meta: {
          needAuth: true
        }
    }, {
        path: '/buyList',
        name: 'buyList',
        component: buyList,
        meta: {
          needAuth: true
        }
    }, {
        path: '/releaseSuccess',
        name: 'releaseSuccess',
        component: releaseSuccess
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

export default router;

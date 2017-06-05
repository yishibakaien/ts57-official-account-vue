import Vue from 'vue';
import Router from 'vue-router';
import {
    addPatterns,
    hotPatterns,
    lookingFor
} from '../pages/pages.js';

Vue.use(Router);
const lookingForAll = resolve => {
    require.ensure([], () => resolve(require('../pages/lookingFor/children/all')))
};
export default new Router({
    routes: [{
        path: '/addPatterns',
        name: 'addPatterns',
        component: addPatterns
    }, {
        path: '/hotPatterns',
        name: 'hotPatterns',
        component: hotPatterns
    }, {
        path: '/lookingFor',
        rederict: '/lookingFor/all',
        name: 'lookingFor',
        component: lookingFor,
        children: [{
            path: 'all',
            component: lookingForAll
        }]
    }]
});

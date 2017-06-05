import Vue from 'vue';
import Router from 'vue-router';
import {
    addPatterns
} from '../pages/pages.js';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/addPatterns',
        name: 'addPatterns',
        component: addPatterns
    }]
});

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './common/store/store';
import router from './router';
import * as directive from './directive/';
import * as filters from './filter/';

import tsComponents from '@/Components/common/index.js';

Vue.use(tsComponents);

Object.keys(directive).forEach(k => Vue.directive(k, directive[k]));
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
Object.keys(filters).forEach(k => { Vue.prototype[k] = filters[k]; });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});

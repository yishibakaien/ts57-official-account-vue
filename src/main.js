// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './common/store/store';
import router from './router';

import tsComponents from '@/Components/common/index.js';

import {Button, Cell} from 'mint-ui';
Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);

Vue.use(tsComponents);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});

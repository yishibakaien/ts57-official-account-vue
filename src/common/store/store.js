'use strict';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import toast from './module/toast';

export default new Vuex.Store({
  modules: {
    toast
  }
});

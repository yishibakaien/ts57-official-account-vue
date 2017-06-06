import imgUp from './imgUp.vue';
import tsRadio from './tsRadio.vue';
import tsInput from './tsInput.vue';
import border from './1px.vue';
import tsGo from './tsGo.vue';
// import aliUpload from './aliUpload/aliUpload.vue';
const Components = {
 imgUp,
 tsRadio,
 border,
 tsInput,
 tsGo
// 	aliUpload
};
const install = function(Vue) {
  for (let i in Components) {
    Vue.component(i, Components[i]);
};
// Vue.$messagebox = Vue.prototype.$messagebox = tsMessageBox;
// Vue.$toast = Vue.prototype.$toast = tsToast;
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};
Components.install = install;
export default Components;

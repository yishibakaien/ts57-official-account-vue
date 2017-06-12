import tsRadio from './tsRadio.vue';
import tsRadioC from './tsRadio-circle.vue';
import tsInput from './tsInput.vue';
import border from './1px.vue';
import tsGo from './tsGo.vue';
import tsModel from './tsModel.vue';
import tsModelC from './tsModelCustom.vue';
import tsButton from './tsButton.vue';
import aliUpload from './aliUpload/aliUpload.vue';
const Components = {
	tsRadio,
	tsRadioC,
	border,
	tsInput,
	tsGo,
	tsModel,
	tsModelC,
	tsButton,
	aliUpload
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

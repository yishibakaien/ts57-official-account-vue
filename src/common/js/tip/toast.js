// toast 快捷使用方式
import store from '../../store/store';

export function loading(options) {
  store.commit('SHOW', options);
}
export function hide() {
  store.commit('HIDE');
}
export function info(options) {
  options.type = 'info';
  store.dispatch('SHOW', options);
}
export function success(options) {
  options.type = 'success';
  store.dispatch('SHOW', options);
}
export function error(options) {
  options.type = 'error';
  store.dispatch('SHOW', options);
}

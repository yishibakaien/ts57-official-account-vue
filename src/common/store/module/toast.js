export default {
  state: {
    isShow: false,
    text: '',
    type: ''
  },
  mutations: {
    HIDE(state) {
      state.isShow = false;
    },
    SHOW(state, options) {
      state.isShow = true;
      state.text = options.text;
      state.type = options.type || 'loading';
    }
  }
};


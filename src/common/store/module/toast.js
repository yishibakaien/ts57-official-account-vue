// type 支持 loading/success/info 默认 loading
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
        SHOW(state, { type = 'loading', text = '正在加载中' }) {
            state.isShow = true;
            // 默认加载中
            state.text = text;
            // 默认laoding
            state.type = type;
        }
    },
    actions: {
        // 展示一定时间后隐藏
        SHOW({ commit }, options) {
            commit('SHOW', options);
            setTimeout(() => {
                commit('HIDE');
            }, options.time || 1000);
        }
    }
};

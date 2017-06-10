// type 支持 loading/success/info/error 默认 loading
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
            // 默认加载中
            state.text = options && options.text || '正在加载中';
            // 默认laoding
            state.type = options && options.type || 'loading';
        }
    },
    actions: {
        // 展示一定时间后隐藏
        SHOW({ commit }, options) {
            // 保证展示一个
            commit('HIDE');
            commit('SHOW', options);
            setTimeout(() => {
                commit('HIDE');
                (options && typeof options.complete === 'function') && options.complete();
            }, options.time || 1000);
        }
    }
};

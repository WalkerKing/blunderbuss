import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment(state, payload) {
            state.count += payload
        }
    },
    actions: {
        increment({ commit }, payload) {
            setTimeout(() => {
                commit('increment', payload);

            },2000);
        }
    }
})

export default store

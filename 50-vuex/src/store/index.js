import Vue from 'vue'
import Vuex from 'vuex'
const Vue = require('vue')
const Vuex = require('vuex')
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment(state, payload) {
          state.count += payload.payload
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

store.commit({
  type: 'increment',
  payload: 10
});
console.log(store.state.count);

export default store

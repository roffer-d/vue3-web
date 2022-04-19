/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Tangtao
 * @Date: 2021-03-23 18:39:08
 * @LastEditors: Seven
 * @LastEditTime: 2021-03-23 20:59:47
 */
const state = () => ({
  source: []
})

// getters
const getters = {
  getSource: (state, getters, rootState) => {
    return state.source
  }
}
// mutations
const mutations = {
  sourceMutations (state, params) {
    state.source.push(params)
  },
  clearAxiosPromisCancelMutations (state, params) {
    state.source[params].f("取消重复请求")
    state.source.splice(params)
  },
  clearAllAxiosPromisCancelMutations: (state) => {
    if (state.source.length) {
      state.source.forEach(e => {
        e && e.f("路由跳转取消上个页面所有未完成请求")
      });
      state.source = []
    }
  }
}

// actions
const actions = {
  sourceActions ({ state, commit }, params) {
    commit('sourceMutations', params)
  },
  clearAxiosPromisCancelAction ({ state, commit }, params) {
    commit('clearAxiosPromisCancelMutations', params)
  },
  clearAllAxiosPromisCancelAction ({ state, commit }) {
    commit('clearAllAxiosPromisCancelMutations')
  }
}

export default {
  name: "axiosPromise",
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
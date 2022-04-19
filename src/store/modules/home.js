/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Tangtao
 * @Date: 2021-03-23 18:39:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-11 13:28:45
 */
const state = {
  source: [],
  name: "1232132",
  userInfo: {
    userName: "111111"
  }
}

// getters
const getters = {
  getName: (state, getters, rootState) => {
    return state.name
  },
  getUserInfo: (state, getters, rootState) => {
    return state.userInfo
  }
}

// mutations
const mutations = {
  setNameMutations (state, params) {
    state.name = params
  },
  setUserInfoMutations (state, params) {
    state.userInfo = params
  }
}

// actions
const actions = {
  setNameActions ({ state, commit }, params) {
    commit('setNameMutations', params)
  },
  setUserInfoActions ({ state, commit }, params) {
    commit('setUserInfoMutations', params)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
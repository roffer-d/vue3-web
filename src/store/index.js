import { createStore, createLogger } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { modules } from './modules';
const debug = process.env.NODE_ENV !== 'production'
const dataState = createPersistedState({
  // 默认存储在localStorage
  storage: window.localStorage,
  // 本地存储数据的键名
  key: 'mine',
  // 指定需要存储的模块，如果是模块下具体的数据需要加上模块名称，如user.token
  paths: ['home.userInfo']
})
export default createStore({
  modules,
  strict: debug,
  plugins: debug ? [createLogger(), dataState] : [dataState]
})
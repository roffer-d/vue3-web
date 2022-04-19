/*
 * @Author: your name
 * @Date: 2022-03-03 19:51:22
 * @LastEditTime: 2022-04-04 22:45:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \mobile-vite-ui\src\store\index.js
 */
import { createStore, createLogger } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { modules } from './modules';
const debug = process.env.NODE_ENV !== 'production'
const dataState = createPersistedState({
  // 默认存储在localStorage 现改为sessionStorage
  storage: window.sessionStorage,
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
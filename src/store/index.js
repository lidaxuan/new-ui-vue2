/*
 * @Author: web.范庆龙
 * @Date: 2020-04-26 10:40:48
 * @LastEditors: web.范庆龙
 * @LastEditTime: 2020-04-26 10:45:43
 * @Description: file content
 */
import Vue from 'vue';
import Vuex from 'vuex';
import utils from "@/utils";
import getters from './getters';
const files = require.context('./modules', false, /\.js$/);
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: utils.readFile(files),
    getters,
    plugins: [createPersistedState({
        key: 'S',
        storage: window.sessionStorage,   //选择 sessionStorage 进行存储
        paths: []
    }), createPersistedState({
        key: 'L',
        storage: window.localStorage,   //选择 localStorage 进行存储
        paths: ['layoutMenus','homeMenus','user']
    })]
})

export default store

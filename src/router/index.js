/*
 * @Author: web.范庆龙
 * @Date: 2020-04-26 10:40:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-15 17:39:29
 * @Description: file content
 */
import Vue from 'vue';
import VueRouter from "vue-router";

import Layout from '@/components/layouts/index.vue';
import overAll from "./overAll";
import store from "../store";

import utils from "@/utils";
import NProgress from 'nprogress' //进度条
import 'nprogress/nprogress.css'// 进度条样式

NProgress.configure({ showSpinner: false }) // 不显示螺旋加载
const vueFiles = require.context('./modules', true, /\.js$/);
Vue.use(VueRouter);
//解决重复点击报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const children = Object.values(utils.readFile(vueFiles)).flat();




const routes = [
    ...overAll,
    {
        path: "/index",
        name: 'index',
        component: Layout,
        children
    }
]

const router = new VueRouter({
    mode: 'hash',
    routes,
    // base: process.env.VUE_APP_BASE_URL,
})
// router.beforeEach((to, from, next) => {
//     // 开启进度条
//     NProgress.start();
//     if (to.path == "/login") {
//         next();
//     } else {
//         if (store.state.user.token) {
//
//             next();
//         } else {
//             next({path: '/login', replace: true});
//         }
//     }
// })
router.beforeEach((to, from, next) => {
    // 开启进度条
    NProgress.start();
    console.log(to.path == "/login" || to.path == '/signInPage');
    if (to.path == "/signInPage" || to.path == '/login') {
        next();
    } else {
        if (store.state.user.token) {
            next();
        } else {
            next({ path: '/login', replace: true });
        }
    }
})
router.afterEach((to) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    NProgress.done();// 结束Progress
})

export default router;

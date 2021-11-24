/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-10-25 17:54:58
 * @FilePath: /newUi/src/router/overAll.js
 */
const err401 = r =>
    require.ensure([], () => r(require("@/views/error/err401.vue")), "home");
const err404 = r =>
    require.ensure([], () => r(require("@/views/error/err404.vue")), "home");
const err403 = r =>
    require.ensure([], () => r(require("@/views/error/err403.vue")), "home");
const err500 = r =>
    require.ensure([], () => r(require("@/views/error/err500.vue")), "home");
const login = r =>
    require.ensure([], () => r(require("@/views/Login")), "home");
const signInPage = r =>
    require.ensure([], () => r(require("@/views/signInPage")), "home");
    
export default [
    {
        path: "*",
        component: err404
    },
    {
        path: "/401",
        component: err401,
        name: "401"
    },
    {
        path: "/403",
        component: err403,
        name: "403"
    },
    {
        path: "/404",
        component: err404,
        name: "404"
    },
    {
        path: "/500",
        component: err500,
        name: "500"
    },
    {
        path: "/login",
        component: login,
        name: "login",
        hidden: true
    },
    {
        path: '/',
        redirect: {
            name: 'signInPage',
        },
    },
    {
        path: '/signInPage',
        name: 'signInPage',
        component: signInPage
    },
];

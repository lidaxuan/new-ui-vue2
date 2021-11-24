/*
 * @version: v1.2.0
 * @Author: 范庆龙
 * @Date: 2020-06-25 12:09:53
 * @LastEditors: web.duanzhaozhao
 * @LastEditTime: 2020-11-26 11:05:48
 * 用法：挂在到vue原型全局
 *
 * 就可以直接  this.$HttpNomal.labelAll().then(res=>{})
 */
// const isProduction = process.env.NODE_ENV === 'production'; //根据环境处理
// const isTest= process.env.NODE_ENV === 'test'; //根据环境处理
// const isDev= process.env.NODE_ENV === 'dev'; //根据环境处理

const Api = [
    {
        name:"douyin",//api下文件名
        http:"$api",//this.$HttpNomal.labelAll().then(res=>{})
        localUrl:"/api/webcall-operate/",//baseUrl
        devUrl:"//dev-prd19.easyliao.com/webcall-operate/",//baseUrl
        testUrl: "//prd19.easyliao.com/webcall-operate/",//baseUrl
        proUrl: "/douyin",//baseUrl
    }
]

exports.Api = Api;
module.exports.Api = Api

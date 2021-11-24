import axios from 'axios';
import {Api} from "./baseUrl";
import {serveApi} from "./request";

const isProduction = process.env.NODE_ENV === 'production'; //根据环境处理
const isTest = process.env.NODE_ENV === 'test'; //根据环境处理
const isDev = process.env.NODE_ENV === 'dev'; //根据环境处理
// const islocal= process.env.NODE_ENV === 'local'; //根据环境处理
let apiArr = []
Api.forEach((item) => {
    let instance = {}
    instance.http = item.http;
    instance.fun = serveApi(axios.create({
        baseURL: isProduction ? item.proUrl : isTest ? item.testUrl : isDev ? item.devUrl : item.localUrl,
        timeout: 600000 // 请求超时时间
    }), item.name)
    apiArr.push(instance);
})


export default apiArr;

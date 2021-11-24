/*
 * @version: v1.2.0
 * @Author: 范庆龙
 * @Date: 2021-08-16 10:19:28
 * @LastEditors: 范庆龙
 * @LastEditTime: 2021-08-19 17:07:31
 * @FilePath: \my-project\src\service\request.js
 */
// import service from "../api";
import {Message} from "element-ui";
import auth from '@/utils/auth';
import store from '@/store';

export function _FormData(params,flag) {
    let newParams;
    if(flag=="form-data"){
          newParams = new FormData();
    }else {
        newParams = new URLSearchParams();
    }
    for (let i in params) {
        newParams.append(i, params[i]);
    }
    return newParams;
}

export function storageFun(msg) {
    Message.alert(msg, '提示', {
        confirmButtonText: '确定',
        callback: () => {
            auth.jumpLogin(); // 跳转登录
        }
    });
}

/**
 * get xxx/xxx?id=1 $api.method({id});
 * post xxx/xxx $api.method(id);
 * post xxx/xxx?id=1 $api.method({config:{params:{id}}})
 * /拼接 xxx/xxx/id  $api.method(id,{splicingParams:id});
 * formData xxx/xxx $api.method(id, {contentType:'x-form'}) || $api.method(id, {contentType:'form-data'})
 *
 */
//拦截器

export function serveApi(instance,name) {
    let service=  require(`../api/${name}`).default;

    const HttpList = {};//包裹请求的容器
    // 请求格式/参数的统一
    for (let key in service) {
        let api = service[key];//url  method
        //async能避免进入回调地狱
        //params 请求参数 obj 配置及个性传参
        HttpList[key] = async function ( params,obj = {}) {
            let {config = {}, contentType = null, splicingParams = undefined} = obj
         // 拼接的参数
            // config 配置参数 object
            // contentType 请求头 str 可传入不同Content-Type （传入form-data 可使用formData对象接收参数）
            // splicingParams 默认undefined 传入str 将在url直接加参数
            // contentType判断
            if (contentType) {
                switch (contentType) {
                    case "text/html":
                        config.headers = {
                            "content-type": "text/html;charset=utf-8",
                        }
                        break;
                    case "x-form":
                        config.headers = {
                            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                        };
                        // form-data对象
                        params = _FormData(params);
                        break;
                    case "form-data":
                        config.headers = {
                            "content-type": "multipart/form-data;charset=utf-8",
                        }
                        // form-data对象
                        params = _FormData(params,"form-data");
                        break;
                    default:
                        config.headers = {
                            "content-type": "application/json;charset=utf-8",
                        }
                        break;
                }
            }

            let response = {};
            //不同请求的判断get post put 根据后台接口需求而定
            if (api.method === "post" || api.method === "put" || api.method === "patch") {
                try {
                    response = await instance[api.method](splicingParams == undefined ? api.url : api.url + "/" + splicingParams, params, config);
                } catch (err) {
                    response = err;
                }
            } else if (api.method === "delete" || api.method === "get") {
                config.params = params;
                try {
                    response = await instance[api.method](splicingParams == undefined ? api.url : api.url + "/" + splicingParams, config);

                } catch (err) {
                    response = err;
                }
            }

            return response;
        }
    }
    //请求拦截器的
    instance.interceptors.request.use(config => {
        if (store.getters.token) {
            config.headers['Authorization'] = store.state.user.token;
        }
        return config;
    }, err => {
        return err;
    });
    //http response 拦截器
    instance.interceptors.response.use(res => {
        let data = res.data;
        switch (data.code) {
            case 200:
                break;
            default:
                break;
        }
        return res.data;
    }, (err) => {
        let data = err.response.data;
        if (err.response.status == 401) {
            storageFun(data.msg || "token失效，请重新登陆。")
            store.dispatch('setToken', '');
        }
        return err;
    });
    return HttpList;
}

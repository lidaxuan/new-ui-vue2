/*
 * @version: v1.2.0
 * @Author: 范庆龙
 * @Date: 2021-08-13 11:43:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-15 16:23:42
 * @FilePath: /newUi/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/*ElementUI*/
// import ElWebBasic from 'el-web-basic';
import ElementUI from 'element-ui';
import directiveList from './directives';
import './assets/base/reset/index.scss';
import './assets/style/element-variables.scss'
import './assets/base/common/layoutColor.scss'
import IconClass from './components/icon/IconClass';
import utils from "@/utils";
// Vue.use(ElWebBasic);
Vue.use(ElementUI);
Vue.config.productionTip = false;
import server from './service';
server.forEach((item) => {
    Vue.prototype[item.http] = item.fun;
})
utils.loadIconUrl();//加载iconurl

// 注册指令
Object.keys(directiveList || {}).forEach(key => {
    Vue.directive(key, directiveList[key]);
});
Vue.prototype.hasAuthority = function (authorities) {
    return authorities.split(',').some(item => {
        return store.state.menus.authCodeArr.includes(item)
    })
}
// icon组件挂载全局
Vue.component('icon-class', IconClass)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

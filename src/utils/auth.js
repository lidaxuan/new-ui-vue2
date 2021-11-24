/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-11-05 17:08:20
 * @FilePath: /newUi/src/utils/auth.js
 */

class Auth {
  constructor() {
    // 登录认证服务
    this.originUrl = window.location.origin + "/webcall-operate/view";
    // this.unified = process.env.VUE_APP_LOGIN_URL + "?redirectUri=" + this.originUrl;
    this.unified = this.originUrl + "/#/signInPage";
  }
  // 获取token
  async getToken(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.hash.split('?');
    let key = r[1] ? r[1].split('=')[1] : '';
    if (r) {
      return unescape(key);
    }
    return null;
  }
  // 跳转认证登录
  jumpLogin() {
    window.location.href = this.unified;
  }
  // 进入项目
  async jumpOriginUrl() {
    console.log(this.originUrl);
    window.history.pushState(null, null, this.originUrl + '')
  }
}

export default new Auth();

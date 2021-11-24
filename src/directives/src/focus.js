/* jshint esversion: 6 */
/*
 * @Description:
 * @Author: 范庆龙
 * @Date: 2021-10-09 14:55:48
 * @FilePath: /code/el-web-basic/package/directives/focus.js
 */

export default {
    inserted: function (el) {
        const input = el.querySelector("input");
        if (input == null) {
            // 聚焦元素
            el.focus();
        } else {
            input.focus();

            // 聚焦元素
        }
    }
}

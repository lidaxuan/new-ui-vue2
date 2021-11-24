/*
 * @Author: web.范庆龙
 * @Date: 2020-04-26 10:40:48
 * @LastEditors: web.范庆龙
 * @LastEditTime: 2020-04-26 10:45:43
 * @Description: file content
 */
import * as types from "../types";
// import home from "./home";
import findData from '@/utils/findData'
// 标签页去重
const resetHomeTag = (arr) => {
    const hash = {};
    const newArray = arr.reduce((item, next) => {
        hash[next.id] ? '' : hash[next.id] = true && item.push(next);
        return item;
    }, [])
    return newArray;
}
const layoutMenus = {
    state: {
        // 所有菜单
        nomalMenu: [],
        // 面包屑
        breadcrumb: [],
        sideMenu: [],////选中菜单数据
        defaultActiveMenu: "",//选中
        authCodeArr: [],//权限
        layoutTag: [],
        layoutTagId: [],
        defaultActiveHorizontalMenu:"",//横向菜单选中
        removeCurrentTagId:"",//删除当前tag标签记录
    },
    mutations: {
        [types.BREADCRUMB]: (state, breadcrumb) => {
            state.breadcrumb = breadcrumb;
        },
        [types.SIDEMENU]: (state, sideMenu) => {
            state.sideMenu = sideMenu;
        },
        [types.NOMALMENU]: (state, nomalMenu) => {
            state.nomalMenu = nomalMenu;
        },
        [types.DEFAULTACTIVEMENU]: (state, defaultActiveMenu) => {
            state.defaultActiveMenu = defaultActiveMenu;
        },
        [types.DEFAULTACTIVEHORIZINTALMENU]: (state, defaultActiveHorizontalMenu) => {
            state.defaultActiveHorizontalMenu = defaultActiveHorizontalMenu;
        },
        [types.AUTHCODEARR]: (state, authCodeArr) => {
            state.authCodeArr = authCodeArr;
        },
        [types.REMOVECURRENTTAGID]: (state, removeCurrentTagId) => {
            state.removeCurrentTagId = removeCurrentTagId;
        },
        [types.LAYOUTTAG]: (state, layoutTag) => {
            if(layoutTag!=""){
                state.layoutTag.push(layoutTag)
                state.layoutTag = resetHomeTag(state.layoutTag.filter(item=> item));
            }else {
                let obj = findData.getParentId(resetHomeTag(state.layoutTag.filter(item=> item)), state.defaultActiveMenu);
                state.layoutTag = [obj];
            }

        },
        [types.LAYOUTTAGID]: (state, layoutTagId) => {
            state.layoutTagId = layoutTagId;
        },
    },
    actions: {
        setBreadcrumb({commit}, breadcrumb = []) {
            commit(types.BREADCRUMB, breadcrumb);
        },
        setSideMenu({commit}, sideMenu = []) {
            commit(types.SIDEMENU, sideMenu);
        },
        setNomalMenu({commit}, nomalMenu = []) {
            commit(types.NOMALMENU, nomalMenu);
        },
        setDefaultActiveMenu({commit}, defaultActiveMenu = "") {
            commit(types.DEFAULTACTIVEMENU, defaultActiveMenu);
        },
        setRemoveCurrentTagId({commit}, removeCurrentTagId = "") {
            commit(types.REMOVECURRENTTAGID, removeCurrentTagId);
        },
        setDefaultActiveHorizontalMenu({commit}, defaultActiveHorizontalMenu = "") {
            commit(types.DEFAULTACTIVEHORIZINTALMENU, defaultActiveHorizontalMenu);
        },
        setAuthCodeArr({commit}, authCodeArr = []) {
            commit(types.AUTHCODEARR, authCodeArr);
        },
        setLayoutTag({commit}, layoutTag = []) {
            commit(types.LAYOUTTAG, layoutTag);
        },
        setLayoutTagId({commit, state}, layoutTagId = []) {
            let layoutTag = state.layoutTag;
            let index = layoutTag.findIndex(item => {
                return item.id == state.removeCurrentTagId;
            });
            layoutTag=layoutTag.filter(item=>{return item.id!=state.removeCurrentTagId})
            if(layoutTag.length>0){
                state.layoutTag = layoutTag;
                if(state.removeCurrentTagId==state.defaultActiveMenu ){
                    state.defaultActiveMenu = layoutTag[index] ?layoutTag[index].id :layoutTag[layoutTag.length-1].id;
                }
            }
            commit(types.LAYOUTTAGID, layoutTagId);
        }
    }
}
export default layoutMenus;

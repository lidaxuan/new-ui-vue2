<template>
    <div class="layoutMenu">
        <el-menu :collapse-transition="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                 @select="handleSelect">
            <el-menu-item v-for="menu in menuList" :index="menu.id" :ref="'tabs'" class="flex ai-center" :key="menu.id">
                <icon-class :icon-class="menu.icon" font="26" color="var(--layoutTopMenuCol)"/>
                <span class="pl-5 menuName">{{menu.name}}</span>
            </el-menu-item>
            <div :style="styleObj" class="positon-a styleBj"></div>
        </el-menu>
    
    </div>

</template>

<script>
    import nomalMenu from '@/mock/nomalMenu.json'
    import findData from '@/utils/findData'
    import {mapGetters} from "vuex";

    export default {

        name: "LayoutHeaderLeft",
        data() {
            return {
                activeIndex: '0',
                menuList: [],
                result: [],
                styleObj: {}
            };
        },
        computed: {
            ...mapGetters([
                'defaultActiveMenu',
                'defaultActiveHorizontalMenu',
                'layoutSetting',
                'breadcrumb',
                'easyDetail',
                'authCodeArr',
                'userMsg',
            ])
        },
        watch: {
            defaultActiveHorizontalMenu: {
                handler(newVal) {
                    this.activeIndex = newVal
                    if (newVal != this.easyDetail[0].id) {
                        this.setIndex(Number(newVal));
                        this.comFun(newVal);
                    } else {
                        this.styleObj = {
                            'width': '0px',
                        }
                    }

                },
                deep: true,
            },


        },
        created() {
            this.getMenu(nomalMenu);
            this.activeIndex = this.defaultActiveHorizontalMenu;
        },
        methods: {
            fifterMenuAuthCode(treeData = [], map = []) {
                for (var i = treeData.length; i > 0; i--) {
                    if (map.indexOf(treeData[i - 1].authCode) == -1) {
                        treeData.splice(i - 1, 1);
                    } else {
                        if (treeData[i - 1].children) {
                            this.fifterMenuAuthCode(treeData[i - 1].children, map)
                        }
                    }
                }
                return treeData;
            },
            getMenu(nomalMenu) {
                this.result = findData.treeLevel(nomalMenu);
                // let tempArray = this.authCodeArr.map(item => {
                //     return item.name;
                // })
                // let tempArray1 = this.authCodeArr.map(item => {
                //     return item.authority;
                // })
                // if (tempArray.indexOf(this.userMsg.userId) == -1) {
                //     this.menuList = this.fifterMenuAuthCode(nomalMenu, tempArray1)
                // } else {
                //
                // }
                return this.menuList = nomalMenu;
            },
            handleSelect(key) {
                this.setIndex(key);
                this.comFun(key);
                this.$store.dispatch("setDefaultActiveHorizontalMenu", key);
                let obj = nomalMenu.find(item => {
                    return item.id == key;
                })
                this.$store.dispatch("setDefaultActiveMenu", obj.children ? this.getChildrenId(obj.children): obj.id);
            },
            getChildrenId(treeData) {
                for (let i = 0; i < treeData.length; i++) {
                    const item = treeData[i];
                    if (item.disabled) {
                        continue;
                    }
                    if (item.children) {
                        return this.test(item.children);
                    } else {
                        return item.id;
                    }
                }
            },
            dispatchBreadcrumb(defaultActive, menuList) {
                let dispatch = findData.findParentArr(defaultActive, this.result, menuList)
                this.$store.dispatch("setBreadcrumb", dispatch)
            },
            comFun(key) {
                let obj = nomalMenu.find(item => {
                    return item.id == key;
                })
                if (this.layoutSetting.layout.value == "1") {
                    if (obj.children) {
                        this.$store.dispatch("setLayoutTag", obj.children[1]);
                        this.dispatchBreadcrumb(this.defaultActiveMenu, this.menuList)
                        this.$router.push(obj.children ? obj.children[1].path : obj.path);
                    } else {
                        this.$store.dispatch("setLayoutTag", obj);
                        this.dispatchBreadcrumb(obj.id, this.menuList)
                        this.$router.push(obj.path);
                    }
                    this.$store.dispatch("setSideMenu", obj.children ? obj.children : [obj]);
                }
            },
            setIndex(val) {
                this.activeIndex = val + '';
                this.styleObj = {
                    'height': '2px',
                    'width': this.$refs.tabs[val].$el.offsetWidth + 'px',
                    'margin-left': this.$refs.tabs[val].$el.offsetLeft + 'px',
                    'transition': 'all 0.3s linear',
                    'bottom': '-1px',
                    'position': 'absolute'
                }
            },
        },

        mounted() {
            if (this.activeIndex != this.easyDetail[0].id) {
                this.setIndex(Number(this.activeIndex))
                this.comFun(this.activeIndex);

            }

        }
    }
</script>

<style lang='scss' scoped>
    .layoutMenu {
        ::v-deep .el-menu {
            background: var(--layoutTopMenuBg);
        }
        
        .el-menu--horizontal > .el-menu-item {
            height: 67px;
            line-height: 67px;
            
            &:focus, &:hover {
                background: none;
            }
    
            i,.menuName {
                color: var(--layoutTopMenuCol) !important;
            }
    
            &.is-active i, &.is-active .menuName, &:hover i, &:hover .menuName {
                color: var(--layoutTopMenuIsActive) !important;
            }
            &.is-active .menuName, &:hover .menuName {
                font-weight: 600;
            }
            &.is-active {
                border-bottom: 0px solid transparent;
            }
        }
        
        .styleBj {
            background: var(--layoutTopMenuIsActive);
        }
    }

</style>

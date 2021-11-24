<template>
    <el-menu
          :default-active="defaultActiveMenu"
          :default-openeds='defaultOpeneds'
          :unique-opened="true"
          class="pt-22"
          :collapse-transition="false"
          @open="handleOpen"
          @select="handleSelect"
          :collapse="isCollapse">
        <LayoutSideItem :menuData="menuList" :is-collapse="isCollapse" :class="isCollapse?'el-menu--collapse':''"/>
    </el-menu>

</template>

<script>
    import LayoutSideItem from './LayoutSideItem.vue'
    import findData from '@/utils/findData'
    import {mapGetters} from "vuex";

    export default {
        name: 'LayoutSide',
        props: ["isCollapse"],
        components: {
            LayoutSideItem
        },
        computed: {
            ...mapGetters([
                'breadcrumb',
                'routeView',
                'nomalMenu',
                'sideMenu',
                'defaultActiveMenu',
                'layoutTag',
                'layoutSetting',
                'defaultActiveHorizontalMenu',

            ])
        },
        watch: {
            sideMenu: {
                handler(newVal) {
                    this.menuList = this.dufFun(newVal);
                },
                deep: true,
            },
            'layoutSetting.layout': {
                handler(newVal) {
                    this.getLayout(newVal.value);
                },
                deep: true,
            }
        },
        data() {
            return {
                menuList: [],
                result: [],
                defaultOpeneds: [],
            };
        },
        methods: {
            dufFun(setHomeSideMenu) {
                let other = setHomeSideMenu.map(o => {
                    o.pid = "0";
                    return o;
                }).filter(item => {
                    return item.disabled != true
                });
                return  other;
            },
            dispatchBreadcrumb(defaultActive, menuList) {
                let dispatch = findData.findParentArr(defaultActive, this.result, menuList)
                this.$store.dispatch("setBreadcrumb", dispatch)
            },
            handleOpen(key) {
                let dispatch = findData.findParentArr(this.defaultActiveMenu, this.result, this.menuList).map(item => {
                    return item.id;
                })
                let isS = findData.getParentId(this.menuList, key)
                let isS1 = findData.getParentId([isS], this.defaultActiveMenu)
                let isS2 = findData.findParentArr(key, this.result, this.menuList).map(item => {
                    return item.id;
                })
                if (isS1 == undefined) {
                    this.defaultOpeneds = isS2;
                } else {
                    this.defaultOpeneds = dispatch;
                }

            },
            handleSelect(key) {
                let dispatch = findData.findParentArr(key, this.result, this.menuList).map(item => {
                    return item.id;
                })
                this.dispatchBreadcrumb(key, this.menuList)
                let obj = findData.getParentId(this.menuList, key);
                this.$store.dispatch("setDefaultActiveHorizontalMenu", dispatch[0]);
                this.$store.dispatch("setDefaultActiveMenu",key)
                this.defaultOpeneds = dispatch;
                this.$store.dispatch("setLayoutTag", obj);
                this.$router.push(obj.path);

            },
            getLayout(value){
                this.result = findData.treeLevel(this.nomalMenu);
                if ( value == "0") {
                    this.menuList = JSON.parse(JSON.stringify(this.nomalMenu))
                    for (let o of this.menuList || []) {
                        if(o.children) {
                            for (let j of o.children || []) {
                                j.pid = "1";
                                j.icon = "";
                            }
                        }
                    }
                    if (this.breadcrumb == '' || this.layoutTag == '') {
                        this.$store.dispatch("setDefaultActiveMenu", this.menuList[0].children?this.menuList[0].children[1].id:this.menuList[0].id)
                        this.$store.dispatch("setLayoutTag", this.menuList[0].children?this.menuList[0].children[1]:this.menuList[0]);
                        this.defaultOpeneds = [this.menuList[0].id];
                        this.$router.push(this.menuList[0].children?this.menuList[0].children[1].path:this.menuList[0].path);
                        this.dispatchBreadcrumb(this.defaultActiveMenu, this.menuList);
                    } else {
                        const a = this.breadcrumb[this.breadcrumb.length - 1];
                        if (a.path != "./detail") {
                            const b = this.breadcrumb.map(item => {
                                return item.id;
                            })
                            this.defaultOpeneds = b;
                            this.$router.push(a.path);
                            this.dispatchBreadcrumb(this.defaultActiveMenu, this.menuList);
                            this.$store.dispatch("setLayoutTag", a);
                        }
                        this.$store.dispatch("setDefaultActiveMenu", this.defaultActiveMenu)
                    }
                }else {
                    this.menuList = this.dufFun(this.sideMenu);
                }
        
            }
        },
        mounted() {
            this.getLayout(this.layoutSetting.layout.value)

        },
    }
</script>


<!--<style lang="scss">-->
<!--   .el-menu&#45;&#45;collapse {-->
<!--        width: 80px !important;-->
<!--    }-->
<!--</style>-->
<style lang="scss" scoped>
    .el-menu {
        border-right: none;
        box-shadow: 2px 4px 4px 0px rgba(21, 34, 50, 0.08);
        background-color: var(--layoutSideMenuBg);
        z-index: 2;
        .isCollapseMore{
            bottom: 77px;
            left: 50%;
            margin-left: -13px;
            background: #F9F8FD;
        }
    }
</style>

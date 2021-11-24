<template>
    <el-drawer
          custom-class="eDrawer"
          v-bind="$attrs" v-on="$listeners"
          :class="mainClass"
    >
        <div slot="title" class="eDrawerTitle">
            <div :class="['eDrawerTitle_icon', 'icon','iconfont',titleIcon]" :style="{fontSize:titleIconSize,color:titleIconColor,background:titleIconBg}" align="center"/>
            <div class="eDrawerTitle_name">{{title}}</div>
        </div>
        <div class="eDrawer__body" :style="footerIsShow?'height:calc(100% - '+footerHeight+')':'height:100%'">
            <slot/>
        </div>
        <div class="eDrawer__footer" v-if="footerIsShow" :style="{height:footerHeight,lineHeight:footerHeight}" :align="footerBtnPosition">
            <slot name="footer"></slot>
        </div>
    </el-drawer>
</template>

<script>
    export default {
        name: "Dra",
        data() {
            return {
                footerIsShow: false
            }
        },
        computed: {
            mainClass: function () {
                return {
                    'inner': this.inner
                }
            },
        },
        props: {
            // 是否在父级元素中打开
            inner: {
                type: Boolean,
                default: false,
            },
            title: {
                type: String,
                default: "默认标题",
            },
            titleIconSize: {
                type: String,
                default: "40px",
            },
            titleIcon: {
                type: String,
                default: "icon-E-E1",//头部icon
            },
            titleIconColor: {
                type: String,
                default: "#fff",//图标样色
            },
            titleIconBg: {
                type: String,
                default: "#6359CA",//图标背景色
            },
            footerBtnPosition: {
                type: String,
                default: "right",//底部确定 取消按钮的位置left center
            },
            footerHeight: {
                type: String,
                default: "80px",//底部高度
            },

        },
        mounted() {
            if (this.inner) {
                let box = this.$el.parentNode
                box.style.position = 'relative';
            }
            if (this.$scopedSlots.footer) {
                this.footerIsShow = true;
            }
        }

    }

</script>

<style lang="scss" scoped>
    ::v-deep .el-drawer__header {
        padding: 0;
        margin-bottom: 0;
        border-bottom: 1px solid #D8D8D8;
        height: 67px;
        padding: 0 24px;
    }
    /* 某个元素内部显示 */
     .inner {
        position: absolute;
    }
    .eDrawer {
        &Title {
            display: flex;
            align-items: center;
            &_icon {
                display: inline-block;
                width: 40px;
                height: 40px;
                line-height: 40px;
                border-radius: 14px;
                font-size: 25px;
                color: #ffffff;
            }
            
            &_name {
                margin-left: 10px;
            }
        }
        &__body{
            overflow-x: hidden;
        }
        &__footer {
            padding: 0 24px;
            background: #FFFFFF;
            box-shadow: 0px 0px 10px 0px #CDD3EC;
            border-radius: 1px;
            position: absolute;
            width: 100%;
            bottom: 0;
        }
        
    }

</style>

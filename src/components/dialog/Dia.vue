<template>
    <el-dialog
          custom-class="eDialog"
          v-bind="$attrs" v-on="$listeners"
    >
        <div slot="title" class="eDialogTitle">
            <div :class="['eDialogTitle_icon', 'icon','iconfont',titleIcon]" :style="{fontSize:titleIconSize,color:titleIconColor,background:titleIconBg}" align="center"/>
            <div class="eDialogTitle_name">{{title}}</div>
        </div>
        <div class="eDialog__body" :style="footerIsShow?'height:calc(100% - 60px)':'height:100%'">
            <slot/>
        </div>
 
        <div slot="footer" align="center" v-if="footerIsShow">
            <slot name="footer"></slot>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "Dia",
        data() {
            return {
                footerIsShow: false
            }
        },
        props: {
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
                default: "#6359CA",//图标背景
            },
            footerBtnPosition: {
                type: String,
                default: "right",//底部确定 取消按钮的位置left center
            },

        },
        mounted() {
            if (this.$scopedSlots.footer) {
                this.footerIsShow = true;
            }
        }

    }

</script>

<style lang="scss" scoped>
    ::v-deep .el-dialog__header {
        padding: 0;
        margin-bottom: 10px;
        border-bottom: 1px solid #D8D8D8;
        height: 60px;
        line-height: 60px;
        padding: 0 20px;
    }
    /* 某个元素内部显示 */
    .inner {
        position: absolute;
    }
    .eDialog {
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
    
        
    }
    ::v-deep .el-dialog__footer {
        background: #FFFFFF;
        padding: 15px;
        border-top:1px solid #CDD3EC;
        /*box-shadow: 0px 0px 10px 0px #CDD3EC;*/
    }
</style>

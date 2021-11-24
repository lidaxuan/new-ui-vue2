<template>
    <div class="switchEl plr10" ref="switch" :id="id"
         v-bind="$attrs"
         :style="{width:(Number(width.replace('px',''))-22)+'px', 'justify-content':justifyContent, height:(Number(this.height.replace('px',''))-2)+'px',borderColor,borderWidth,borderStyle}"
    >
        <div v-if="statePosition!='l'" :title="title" class="switchTitle">
            <span>{{title}}</span>
        </div>
        <div v-if="statePosition=='l'">{{myVal?activeText: inactiveText}}</div>
        <div class="switchBox">
            <div v-if="statePosition=='lr' ">{{inactiveText}}</div>
            <el-popover
                  placement="top"
                  width="160"
                  @show="showFun"
                  v-if="isPopover"
                  v-model="visible">
                <p>是否确认{{myVal?"开启":"关闭"}}吗？</p>
                <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="cancelFun">取消</el-button>
                    <el-button type="primary" size="mini" @click="sureFun">确定</el-button>
                </div>
                <el-switch
                      slot="reference"
                      ref="sw"
                      class="m-5"
                      :disabled="disabled"
                      :active-value="activeValue"
                      :inactive-value="inactiveValue"
                      @change="onchangefun"
                      v-bind="$attrs">
                </el-switch>
                <!--                <el-button slot="reference">删除</el-button>-->
            </el-popover>
            <el-switch
                  v-if="!isPopover"
                  slot="reference"
                  ref="sw"
                  :disabled="disabled"
                  :active-value="activeValue"
                  :inactive-value="inactiveValue"
                  class="m-5"
                  @change="onchangefun"
                  v-bind="$attrs" v-on="$listeners">
            </el-switch>
            <div v-if="statePosition=='lr' ">{{activeText}}</div>
            <div v-if="statePosition=='r' ">{{myVal?activeText: inactiveText}}</div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'SwitchEl',
        data() {
            return {
                tooltipDisabled: true,
                visible: false,
                id: '',
                modelVal: "",
                myVal: false,
            }
        },
        model: {
            props: "value",
            event: "cc"
        },
        props: {
            title: {
                type: String,
                default: "提示"//左边静态标题
            },
            titleSize: {
                type: String,
                default: "14px"//左边静态标题字体大小
            },
            height: {
                type: [String, Number],
                default: "30px"//左边静态标题字体大小
            },
            stateText: {
                type: [String, Boolean, Number]//switch 的model值
            },
            justifyContent: {
                type: String,
                default: "space-between"//开关的位置
            },
            width: {
                type: [String, Number],
                default: "100%"//整个框的宽度
            },
            activeValue: {
                type: [String, Boolean, Number]//switch 的model值
            },
            inactiveValue: {
                type: [String, Boolean, Number]//switch 的model值
            },
            isPopover: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },

            borderColor: {
                type: String,
                default: "#DCDFE6" //整个框的border 颜色
            },
            borderWidth: {
                type: String,
                default: "1px" //整个框的border宽度
            },
            borderStyle: {
                type: String,
                default: "solid" //整个框的边框样式
            },
            statePosition: {
                type: String,
                default: "lr"//;lr Switch左右边展示状态 ，i是在Switch内部展示状态 r是在父级dom最右边展示状态 l是在父级dom最左边展示状态
            },
            activeText: {
                type: String,
                default: "是"//switch active
            },
            inactiveText: {
                type: String,
                default: "否"//switch inactive
            },
            innerTextWidth: {
                type: String,
                default: "40px" //状态在switch里要设置这个宽度 避免显示不全
            },
            beforeChange: Function
        },
        created() {
            this.id = "sw" + this.guid();
            this.comA(this.stateText)
        },

        methods: {
            guid() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0,
                          v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            },
            insertRule(sheet, ruleKey, ruleValue, index) {
                return sheet.insertRule ? sheet.insertRule(ruleKey + '{' + ruleValue + '}', index) : sheet.addRule(ruleKey, ruleValue, index);
            },
            showFun() {
                if(this.disabled){
                    this.visible = false;
                }else {
                    this.visible = true;
                }
            },
            isinner() {
                if (this.statePosition == 'i') {
                    let core = this.$refs.sw.$el.children[1];
                    this.insertRule(document.styleSheets[0], '#' + this.id + ' ' + '.el-switch__core:before', 'content:"' + this.activeText + '";color: #fff;', 0)
                    this.insertRule(document.styleSheets[0], '#' + this.id + ' ' + '.is-checked .el-switch__core:before', 'content:"' + this.inactiveText + '";color: #fff;', 0)
                    core.style.width = this.innerTextWidth;
                }
            },
            isDef(v) {
                return v !== undefined && v !== null
            },
            // 是否为Promise
            isPromise(val) {
                return (
                      this.isDef(val) &&
                      typeof val.then === 'function' &&
                      typeof val.catch === 'function'
                )
            },
            //
            
            promise(v) {
                let shouldChange=this.beforeChange(v);
                if (this.isPromise(shouldChange)) {
                    shouldChange.then(() => {
                        this.comA(v);
                    }).catch((e) => {
                        console.log(e)
                    });
                } else if (shouldChange) {
                    this.comA(v);
                }
            },
            comA(v) {
                if (v.constructor == Boolean) {
                    if (this.stateText) {
                        this.myVal = false;
                        this.$emit('cc', false)

                    } else {
                        this.myVal = true;
                        this.$emit('cc', true)
                    }
                } else {
                    if (v == this.activeValue) {
                        this.myVal = false;
                        this.$emit('change', this.activeValue)
                        this.$emit('cc', this.activeValue)

                    } else {
                        this.myVal = true;
                        this.$emit('cc', this.inactiveValue)
                    }
                }
            },
            comB(state) {
                this.visible = false;
                if (state) {
                    this.$emit('cc', true)
                    this.myVal = true;
                } else {
                    this.myVal = false;
                    this.$emit('cc', false)
                }
            },
            cancelFun() {
                if (this.activeValue.constructor == Boolean || this.inactiveValue.constructor == Boolean) {
                    this.comB(this.stateText);
                } else {
                    this.visible = false;
                    if (this.modelVal == this.activeValue) {
                        this.$emit('cc', this.inactiveValue);
                    } else {
                        this.$emit('cc', this.activeValue);

                    }
                }
            },
            sureFun() {
                this.visible = false;
                this.promise(this.modelVal);
            },
            onchangefun(v) {
                if (this.isPopover) {
                    this.modelVal = v;
                } else {
                    this.promise(v)
                }
            }
        },
        mounted() {
            this.isinner();
        }
    };
</script>

<style lang="scss" scoped>
    .switchEl {
        display: flex;
        align-items: center;
        border-radius: 4px;
    }
    
    .plr10 {
        padding: 0px 10px;
    }
    
    
    .switchBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 20px;
    }
    
    .switchTitle {
        cursor: pointer;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    
    .m-5 {
        margin: 0 5px;
    }
    
    ::v-deep .el-switch__core::before {
        position: absolute;
        top: 0;
        right: 5px;
    }
    
    .is-checked ::v-deep .el-switch__core::before {
        position: absolute;
        top: 0;
        left: 5px;
    }

</style>

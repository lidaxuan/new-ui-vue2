<template>
    <div class="comment-main">
        <div v-if="douyinAuthList.length" style="height: 100%;">
            <div class="comment-top">
                <div class="comment-select">
                    <icon-class icon-class="icon-Z-Z1" font="30" :color="'#7E84A3'" style="margin-right:10px;position: relative;top: 3px;"/>
                    <el-form>
                        <el-form-item prop="thirdName" >
                            <el-select
                                v-model="queryForm.thirdName"
                                placeholder="请选择"
                                clearable
                                filterable
                                @change="changeDouyin"
                                style="width: 200px;">
                                <el-option
                                v-for="(item, index) in douyinAuthList"
                                :key="index"
                                :label="item.thirdName"
                                :value="item.thirdId"/>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="comment-sync-btn">
                    <e-button-n size="small" type="oper" icon="icon-F-F32" @click="sync()">同步获取更新</e-button-n>
                </div>
            </div>
            <div class="comment-bottom">
                <div class="comment-opus">
                    <div class="title">
                        作品列表
                        <el-tooltip class="item" effect="dark" content="列表显示已授权抖音账号发布的作品和作品数据" placement="top-start">
                            <icon-class icon-class="icon-F-F4" font="24" :color="'#D3D4DD'" class="icon"/>
                        </el-tooltip>
                    </div>
                    <div class="opus-list">
                        <div v-loading="videoLoading" v-if="videoList && videoList.length">
                            <oups v-for="(item, index) in videoList" :key="index" :item="item"  @backSelect="backSelect" :class="item.item_id == selectChose?'op_selctP':''"></oups>
                            <div class="more" @click="moreVideoClick" v-if="moreVideo">
                                <icon-class icon-class="icon-F-F34" font="24" :color="'#506AFD'" class="icon-pos"/>
                                加载更多...
                            </div>
                        </div>
                        <div v-else class="nodata">
                            <img src="../../assets/img/webcall/no-data1.png" class="imgData" alt="">
                        </div>
                        
                    </div>
                </div>
                <div class="comment-list">
                    <div class="title">
                        <div>
                            评论列表
                            <el-tooltip class="item" effect="dark" content="列表显示已选作品最近的粉丝评论数据，根据评论时间排序" placement="top-start">
                                <icon-class icon-class="icon-F-F4" font="24" :color="'#D3D4DD'" class="icon"/>
                            </el-tooltip>
                        </div>
                        <div>
                            <e-button-n size="small" type="oper" @click="batchClick()" :disabled="bathDisabled">批量回复</e-button-n>
                        </div>
                    </div>
                    <div class="comment-content">
                        <div class="table-th">
                            <div class="check-box">
                                <el-checkbox v-model="checkedAll" :disabled="disabled" :indeterminate="indeterminate" @change="changeCheckBox"></el-checkbox>
                            </div>
                            <div class="text">评论内容</div>
                        </div>
                        <div v-if="commentList.length" v-loading="commentLoading" class="comment-content-main">
                            <commentList  v-for="(item, index) in commentList" :key="index" :item="item" :thirdId="thirdId" :itemId="itemId" @singleClick="singleClick" @resize="resize"></commentList>
                            <div class="more" v-if="moreComment" @click="getCommentList()">
                                <icon-class icon-class="icon-F-F34" font="24" :color="'#506AFD'" class="icon-pos"/>
                                加载更多...
                            </div>
                        </div>
                        <div v-else class="nodata">
                            <img src="../../assets/img/webcall/no-data1.png" class="imgData" alt="">
                        </div>


                        
                    </div>
                </div>
            </div>

            <batchComment ref="batch" @reset="reset"></batchComment>
        </div>
        <div class="nodata" v-else>
            <div style="text-align: center;">
                <img src="../../assets/img/webcall/nodata.png" class="imgData"  alt="">
                <div>
                    授权的账号已过期，重新授权
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import oups from './opus.vue'
import commentList from './commentList.vue'
import batchComment from './batchComment.vue'
import moment from 'moment'
export default {
  props: [],
  data() {
    return {
        queryForm: {
            thirdName: '',
        },
        douyinAuthList: [],
        videoList: [],
        commentList: [],
        thirdId: '',
        pageVideoNo: 0, // 视屏
        pageCommentNo: 0, // 评论
        pageSize: 10, 
        thirdId: '', // 授权抖音id
        itemId: '', // 视频id
        checkedAll: false,


        // loading 加载
        videoLoading: false, // video 懒加载
        moreVideo: false, // video 加载更多按钮的控制
        commentLoading: false, // 评论列表
        moreComment: false, // 评论列表加载更多

        indeterminate: false,
        selectComment: [],
        selectChose: '',
        arrFlag: [],
        disabled: true,
        bathDisabled: true
    }
  },
  components: {
      oups,
      commentList,
      batchComment
  },
  mounted() {},
  created() {
      this.getAuthList()
  },
  methods: {
      // 同步更新
    sync() {
        this.pageVideoNo = 0
        this.pageCommentNo = 0
        this.videoList = []
        this.commentList = []
        this.getVideoList(this.thirdId)
    },
    // 批量回复
    batchClick() {
        let index = 0
        this.commentList.map(item => {
            if (item.check) {
                index ++ 
                this.selectComment.push(item)
            }

        })
        if (index < 1) {
            this.$message.error('请选中你要批量评论的评论')
        } else {
            let parms = {
                index: index,
                itemId: this.itemId,
                thirdId: this.thirdId,
                selectComment: this.selectComment
            }
            this.$refs.batch.open(parms);
        }
    },
    // 刷新回调
    resize() {
        this.getCommentList()
    },

    reset() {
        this.getCommentList()
        this.checkedAll = false
    },
    // 全选 callback 返回的值
    changeCheckBox(val) {
        if (val) {
            this.commentList.map(item => {
                item.check  = true
                this.bathDisabled = false
            })
        } else {
            this.commentList.map(item => {
                item.check  = false
                this.bathDisabled = true
            })
        }
        this.indeterminate = false
    },
    // 触发单个checkbox
    singleClick(item) {
        console.log(item, 'item--')
        this.arrFlag = []
        if (this.commentList.length == 1) {
            if (item.check) {
                this.checkedAll = true
            } else {
                this.checkedAll = false
            }
        } else {
             // 获取全部的状态
            for (let i = 0; i < this.commentList.length; i++) {
                 this.arrFlag.push(this.commentList[i].check)
            }

            let flagTrue = this.arrFlag.every((val) => { // 只能判断全部为true
                return val == true // 判断全部
            })
            let flagFalse = this.arrFlag.every((val) => {
                return val == false // 判断全部为false
            })

            if (flagTrue) {
                this.checkedAll = true
                this.indeterminate = false
            } else if (flagFalse) {
                this.checkedAll = false
                this.indeterminate = false
            } else {
                this.indeterminate = true
                this.checkedAll = false
            }

        }

        this.commentList.map(item => {
            if (item.check) {
                this.bathDisabled = false
            }
        })

    },
    //  获取授权列表
    getAuthList() {
        let params = {}
        this.$api.getAuthList(params).then(res => {
            if (res.code == 200 && res.data.length) {
                this.douyinAuthList = res.data
                this.queryForm.thirdName = res.data[0].thirdName
                this.getVideoList(res.data[0].thirdId)
                this.thirdId = res.data[0].thirdId
            }
        })
    }, 
    changeDouyin(val) {
        this.pageVideoNo = 0
        this.pageCommentNo = 0
        this.getVideoList(val)
        this.thirdId = val
        this.videoList = []
        this.commentList = []
    },
    // 视频列表
    getVideoList(val) {
        let params = Object.assign({}, {
            thirdId: val,
            pageNo: this.pageVideoNo,
            pageSize: this.pageSize,
        })
        this.videoLoading = true
         this.$api.getVideoList(params).then(res => {
            if (!res || res.code !== 200) {
                this.videoLoading = false
                this.$message.error(res && res.msg ? res.msg : '响应错误');
                return;
            }
            this.videoLoading = false
            
            let {list, hasMore, nextPageNo} = res.data
            if (hasMore) {
                this.pageVideoNo = nextPageNo
            }

            list.map(item => {
                item.createTime = moment.unix(item.create_time).format('YYYY-MM-DD HH:mm:ss');
            })
            
            let _list = []
            _list = this.videoList.concat(list)
            this.videoList = _list
            
            this.moreVideo = hasMore
            this.getCommentList(this.videoList[0].item_id)
            this.itemId = this.videoList[0].item_id
            this.selectChose = this.videoList[0].item_id

        }).catch(()=> {
            this.videoLoading = false
        });
    },
    // 查看更多的 videoList
    moreVideoClick() {
        this.getVideoList(this.thirdId)
    },
    //  选中视频
    backSelect(item) {
        this.pageVideoNo = 0
        this.pageCommentNo = 0
        this.selectChose = ''
        this.commentList = []
        this.moreComment = false
        this.itemId = item.item_id
        this.getCommentList()
        this.selectChose = item.item_id
    },
    // 取抖音号视频评论列表
    getCommentList(val) {
        let params = Object.assign({}, {
            pageNo: this.pageCommentNo,
            pageSize: this.pageSize,
            itemId: val || this.itemId,
            thirdId: this.thirdId
        })
        this.commentLoading = true
        this.$api.getCommentList(params).then(res => {
            if (!res || res.code !== 200) {
                this.commentLoading = false
                this.$message.error(res && res.msg ? res.msg : '响应错误');
                return;
            }

            let {list, hasMore, nextPageNo} = res.data
            if (hasMore) {
                this.pageCommentNo = nextPageNo
            }

            list.map(item => {
                // 对时间戳进行处理
                item.check = false
                item.isReplay = false
                item.replay = ''
                item.createTime = moment.unix(item.create_time).format('YYYY-MM-DD HH:mm:ss');
            })
            
            let _list = []
            _list = this.commentList.concat(list)
            this.commentList = _list
            this.disabled = this.commentList.length > 0 ? false : true // checkbox 框的控制
            
            this.moreComment = hasMore

            this.commentLoading = false
        }).catch(()=> {
            this.commentLoading = false
        });
    }, 
   
  }
}

</script>
<style lang="scss" scoped>
.op_selctP{
    background: #F5F7FA !important;
}
.comment-main{
    height: calc(100% - 74px);
    background: #fff;
    padding: 20px 15px;
    padding-top: 30px;
    border-radius: 8px;
    .comment-top{
        height: 60px;
        display: flex;
        justify-content: space-between;
        .comment-select{
            display: flex;
            
        }
    }
    .comment-bottom{
        border: 1px solid #EBECF1;
        height: calc(100% - 70px);
        display: flex;
        .comment-opus{
            width: 300px;
            height: 100%;
            border-right: 1px solid #EBECF1;
            .title{
                height: 60px;
                line-height: 60px;
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: bold;
                color: #344563;
                padding-left: 15px;
                .icon{
                    position: relative;
                    top: 3px;
                }
            }
            .opus-list{
                height: calc(100% - 60px);
                overflow-y: auto;
                text-align: center;
                position: relative;
            }
        }
        .comment-list{
            flex: 1;
            padding:0px 22px;
            .title{
                display: flex;
                height: 60px;
                justify-content: space-between;
                align-items: center;
                .icon{
                    position: relative;
                    top: 3px;
                }
            }
            .comment-content{
                height: calc(100% - 80px);
                border: 1px solid #EBECF1;
                position: relative;
                .table-th{
                    height: 40px;
                    display: flex;
                    align-items: center;
                    .check-box{
                        width: 40px;
                        height: 40px;
                        border-right: 1px solid #EBECF1;
                        border-bottom: 1px solid #EBECF1;
                        text-align: center;
                        line-height: 40px;
                    }
                    .text{
                        font-size: 14px;
                        height: 40px;
                        font-family: PingFang SC;
                        font-weight: 500;
                        color: #333333;
                        padding-left: 12.5px;
                        line-height: 40px;
                        flex: 1;
                        border-bottom: 1px solid #EBECF1;
                    }
                }
                .comment-content-main{
                    height: calc(100% - 40px);
                    overflow-y: auto;
                }
            }
            .nodata{
               .imgData{
                    width: 100px;
                    height: 100px;
                } 
            }
        }
    }
    .more{
        width: 100%;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #506AFD;
        line-height: 14px;
        cursor: pointer;
        text-align: center;
    }
    .icon-pos{
        position: relative;
        top: 6px;
    }
}
.nodata{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #909399;
    .imgData{
        width: 100px;
        height: 100px;
    }
}

</style>
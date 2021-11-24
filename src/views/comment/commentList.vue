<template>
    <div class="content">
        <div class="item-check">
             <el-checkbox v-model="item.check" @change="singleCheckBox(item)"></el-checkbox>
        </div>
        <div class="item-content">
            <div class="text1">
                {{item.content}}
            </div>
            <div class="option">
                <div class="data">{{item.createTime}}</div>
                <div class="operate">
                    <e-button-n icon="icon-F-F29"  type="text-primary" @click="item.isReplay = true">回复</e-button-n>
                    <e-button-n icon="icon-F-F30"  type="text-primary" @click="commentTop(item)">
                        <span v-if="!item.top">评论置顶</span>
                        <span v-else>已置顶</span>
                    </e-button-n>
                </div>
            </div>
            <div class="reply" v-if="item.isReplay">
                <el-input type="textarea" v-model="item.replay" placeholder="请输入回复内容" maxlength="500" show-word-limit></el-input>
                <div class="reply-operate">
                    <div>
                        <e-button-n @click="item.isReplay = false" size="small">取消</e-button-n>
                        <e-button-n  type="oper" @click="replayClick(item)" size="small">回复</e-button-n>
                    </div>
                </div>
            </div>
            <div v-if="item.reply_comment_total">
                <e-button-n type="text-primary">{{item.reply_comment_total}}条回复</e-button-n>
                <e-button-n type="text-primary" @click="tabClick">
                    <span v-if="isShowReplay">收起</span>
                    <span v-else>展开</span>
                </e-button-n>
            </div>
            <div class="reply-message" v-if="isShowReplay">
                <div class="reply-message-item" v-for="(zitem, zindex) in replayList" :key="zindex">
                    <div>
                        {{zitem.content}}
                    </div>
                    <div class="date">
                        {{zitem.createTime}}
                    </div>
                </div>
                <div @click="moreReplyClick()" v-if="moreReply" style="margin-top: 10px;">
                    <e-button-n icon="icon-F-F32"  type="text-primary">更多...</e-button-n>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
  props: ['item', 'thirdId', 'itemId'],
  data() {
    return {
        checked: false,
        pageReplyNo: 1, // 评论回复
        pageSize: 10, 
        replyLoading: false, // 评论回复列表
        moreReply: false, // 回复加载更多
        replayList: [],
        isShowReplay: false
    }
  },
  components: {
  },
  mounted() {
  },
  methods: {
    //   点击展开 查看回复的评论
    tabClick() {
        this.getCommReplyList()
        this.isShowReplay = !this.isShowReplay
    },
    // 查看更多的回复评论
    moreReplyClick() {
        this.getCommReplyList()
    },
    singleCheckBox(val) {
        this.$emit('singleClick', val)
    },
    // 获取抖音号视频评论回复列表
    getCommReplyList(){
        let params = {
            pageNo: this.pageReplyNo,
            pageSize: this.pageSize,
            thirdId: this.thirdId,
            itemId: this.itemId,
            commentId: this.item.comment_id
        }
        this.replyLoading = true
        this.$api.getCommReplyList(params).then(res => {
            if (!res || res.code !== 200) {
                this.replyLoading = false
                this.$message.error(res && res.msg ? res.msg : '响应错误');
                return;
            }
            let {list, hasMore, nextPageNo} = res.data
            if (hasMore) {
                this.pageReplyNo = nextPageNo
            }

            list.map(item => {
                item.createTime = moment.unix(item.create_time).format('YYYY-MM-DD HH:mm:ss');
            })

            let _list = []
            _list = this.replayList.concat(list)
            this.replayList = _list
            this.moreReply = hasMore

            this.replyLoading = false
        }).catch(() => {
            this.replyLoading = false
        })
    }, 
    // 回复评论  单条 单个回复
    replayClick(item){
        let params = {
            content: item.replay,
            thirdId: this.thirdId,
            commentList: [
                {
                    commentId: item.comment_id,
                    itemId: this.itemId
                }
            ]
        }

        this.$api.sendComment(params).then(res => {
            console.log(res, 'ressd')
            if(res.code == 200){
                this.$message.success('评论成功')
                this.getCommReplyList()
                item.isReplay = false
            }
        })
        
    },
    // 置顶评论
    commentTop(val) {
        let params = {
            thirdId: this.thirdId,
            top: !val.top,
            itemId: this.itemId,
            commentId: val.comment_id
        }
        this.$api.sendCommentTop(params).then(res => {
            if (res.code == 200) {
                this.$emit('resize')
            }
        })
    }

  }
}

</script>
<style lang="scss" scoped>
.content{
    display: flex;
    min-height: 60px;
    .item-check{
        width: 40px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #EBECF1;
        border-bottom: 1px solid #EBECF1;
    }
    .item-content{
        flex: 1;
        min-height: 60px;
        border-bottom: 1px solid #EBECF1;
        padding: 20px 15px;
        .text1{
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #606266;
            line-height: 18px;
        }
        .option{
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .data{
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #C0C4CC;
            }
            .operate{
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #506AFD;
            }
        }


        .reply{
            &-operate{
                display: flex;
                align-items: center;
                justify-content: flex-end;
                margin-top: 10px;
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #506AFD;
            }
        }
        .reply-message{
            min-height: 50px;
            background: #F4F4F5;
            border-radius: 4px;
            margin-top: 20px;
            padding: 0px 15px 15px 15px;
            &-item{
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #606266;
                line-height: 20px;
                border-bottom: 1px solid #DCDFE6;
                padding-top: 10px;
                .date{
                    font-size: 12px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #C0C4CC;
                    line-height: 30px;
                }
            }
        }
        .reply-message-item:last-child{
            border-bottom: none;
        }
    }
    .icon-pos{
        position: relative;
        top: 5px;
    }
}
.ml10{
    margin-left: 10px;
}
</style>
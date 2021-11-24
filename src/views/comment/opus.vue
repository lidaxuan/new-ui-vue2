<template>
    <div class="opus-item" @click="selectClick()">
        <div class="ocps-img">
            <img :src="item.cover" alt="">
        </div>
        <div class="ocps-content">
            <div class="ocps-title">{{item.title}}</div>
            <div class="ocps-option">
                <div>
                    <!-- 查看数 -->
                    <icon-class icon-class="icon-F-F24" font="24" :color="'#D3D4DD'" class="icon"/>
                    {{item.statistics.play_count || 0}}
                </div>
                <div> 
                    <!-- 点赞数 -->
                    <icon-class icon-class="icon-F-F31" font="24" :color="'#D3D4DD'" class="icon"/>
                    {{item.statistics.digg_count || 0}}
                </div>
                <div>
                    <!-- 回复数 -->
                    <icon-class icon-class="icon-F-F29" font="24" :color="'#D3D4DD'" class="icon"/>
                    {{item.statistics.comment_count || 0}}
                </div>
            </div>
            <div class="staus">
                <span class="t1" v-if="item.video_status == '1'">
                    已发布
                </span>
                <span class="t1" v-else-if="item.video_status == '2'">
                    不适宜公开
                </span>
                <span class="t1" v-if="item.video_status == '4'">
                    审核中
                </span>
                <span class="t2">{{item.createTime}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ['item'],
  data() {
    return {
        selectChose: ''
    }
  },
  components: {
  },
  mounted() {
  },
  methods: {
    selectClick(){
        this.$emit('backSelect', this.item)
    }
  }
}

</script>
<style lang="scss" scoped>
.opus-item{
    width: 270px;
    // height: 105px;
    padding: 15px;
    background: #FFF;
    display: flex;
    cursor: pointer;
    .ocps-img{
        flex-shrink: 0;
        width: 50px;
        height: 75px;
        background: #CDCBD5;
        border-radius: 4px;
        img{
            width: 50px;
            height: 75px; 
        }
    }
    .ocps-content{
        margin-left: 10px;
        .ocps-title{
            width: 210px;
            height: 25px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #344563;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .ocps-option{
            width: 200px;
            height: 25px;
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #909399;
            .icon{
                position: relative;
                top: 3px;
            }
        }
        .staus{
            height: 25px;
            display: flex;
            align-items: flex-end;
            .t1{
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #67C23A;
                line-height: 20px;
                width: 70px;
                text-align: left;
            }
            .t2{
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #909399;
                line-height: 20px;
                
            }
        }
    }
}
</style>
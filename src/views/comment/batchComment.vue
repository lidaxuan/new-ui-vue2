<template>
  <e-drawer-sp
    :visible.sync="drawer"
    :footerCancelFun="close"
    title="批量回复"
    :inner="inner"
    titleIcon="icon-E-E3"
    append-to-body
    size="552px">
    <div class="tip">
       <icon-class icon-class="icon-F-F5" font="24" :color="'#506AFD'" class="icon-pos"/>
        已经评论{{index}}条数据
    </div>
    <el-form  :rules="rules" label-position="top" size="small">
      <el-form-item label="" prop="title" >
        <el-input v-model="title" type="textarea"  :rows="10"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <e-button-n type="default" @click="close()">取消</e-button-n>
      <e-button-n type="primary" @click="confirm()">确认</e-button-n>
    </template>
  </e-drawer-sp>
</template>

<script>

export default {
  props: {
    inner: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      drawer: false,
      title: '',
      index: 0,
      selectComment: [],
      itemId: '',
      thirdId: '',
      rules: {
        name: [
          { required: true, message: '请输入访客标签', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    open(parms) {
      console.log(parms, 'parms')
      this.index = parms.index
      this.selectComment = parms.selectComment
      this.itemId = parms.itemId
      this.thirdId = parms.thirdId
      this.drawer = true;
    },
    close() {
      this.drawer = false;
    },
    confirm() {
      let commentList = []
      this.selectComment.map(item => {
        let obj = {
          commentId: item.comment_id,
          itemId: this.itemId
        }
        commentList.push(obj)
      })
      let params = {
        content: this.title,
        thirdId: this.thirdId,
        commentList: commentList
      }
      this.$api.sendComment(params).then(res => {
          if(res.code == 200){
              this.$message.success('评论成功')
              this.drawer = false
              this.$emit('reset')
          }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tip{
    height: 12px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #7D8DBF;
    line-height: 20px;
    margin-bottom: 30px;
}
.icon-pos{
  position: relative;
  top: 5px;
}
</style>

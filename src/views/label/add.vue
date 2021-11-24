<template>
  <e-drawer-sp
    :visible.sync="drawer"
    :footerCancelFun="close"
    :title="title"
    :inner="inner"
    titleIcon="icon-E-E3"
    append-to-body
    size="552px">
    <div class="tip">
       <icon-class icon-class="icon-F-F5" font="24" :color="'#506AFD'" class="icon-pos"/>
        客服接待访客，会话过程中访客会话内容命中设置的关键词，自动给访客添加标签
    </div>
    <el-form :model="form" :rules="rules" label-position="top" size="small">
      <el-form-item label="访客标签" prop="title" >
        <el-input v-model="form.title" maxlength='6' placeholder="请输入访客标签" show-word-limit/>
      </el-form-item>
      <el-form-item label="匹配关键词" required>
        <div v-for="(item, index) in form.content"
          :key="index"
          class="condition">
          <el-row style="width: 100%;">
            <el-col :span="22" style="padding-right: 10px;">
                <el-form-item :prop="`content.${index}.name`"
                  :rules="{ required: true, message: '请输入相应的关键字', trigger: 'blur' }">
                  <el-input v-model="item.name" maxlength='6' placeholder="请输入关键词" show-word-limit/>
                </el-form-item>
            </el-col>
            <el-col :span="2" v-if="form.content.length != 1">
              <e-button-n type="text-default" icon="icon-F-F14" @click="minus(index)" style="line-height: 32px; float: right;"/>
            </el-col>
          </el-row>
        </div>
        <e-button-n size="small" type="oper" icon="icon-F-F2" @click="plus()" v-if="form.content && form.content.length <5">添加关键词</e-button-n>
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
      form: {
        title: '',
        content: [
          {name: ''}
        ]
      },
      updateId: '',
      openStatus: '',
      rules: {
        name: [
          { required: true, message: '请输入访客标签', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    plus() {
      if(this.form.content && this.form.content.length >= 5) {
        this.$message.error('添加关键词不能超过5个')
        return false
      }
      this.form.content.push({
        name: '',
      });
    },
    minus(index) {
      this.form.content.splice(index, 1);
    },
    confirm() {
      if(!this.form.title){
        this.$message.error('标签不可为空');
        return
      }
      for (let i = 0;i < this.form.content.length;i++){
        if(!this.form.content[i].name){
          this.$message.error('请添加匹配关键词');
          return false
        }
      }
      let arr = []
      this.form.content.map(val => {
        arr.push(val.name)
      })
    
      let params  = Object.assign({}, {
        title: this.form.title,
        content: arr.join(','),
        
      })

      if (this.title == '添加标签') {
        params.openStatus = 0
        this.$api.addChannelTag(params).then(res => {
          if (res.code == 200) {
            this.$message('添加成功')
            this.drawer = false
            this.$emit('renew')
          }
        })
      } else {
        params.id = this.updateId
        params.openStatus = this.openStatus
        this.$api.updateChannelTag(params).then(res => {
          if (res.code == 200) {
            this.$message('修改成功')
            this.drawer = false
            this.$emit('renew')
          }
        })
      }
      
    },

    open(val) {
      this.title = val.type == 'add'?'添加标签':'修改标签'

      if (val.type == 'edit') {
        this.form.content = []
        let arr = val.row.content.split(',')
        Object.keys(arr).forEach(val => {
          this.form.content.push({
            name: arr[val]
          })
        })
        this.updateId = val.row.id
        this.openStatus = val.row.openStatus
        this.form.title = val.row.title
      }
      this.drawer = true;
    },
    close() {
      this.drawer = false;
    },
  },
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

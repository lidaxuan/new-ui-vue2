<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-11-15 16:42:05
 * @FilePath: /newUi/src/views/signInPage.vue
-->
<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-11-01 19:54:48
 * @FilePath: /admin-website/src/pages/login/login.vue
-->
<template>
  <div class="center-box hmax">
    <div class="login-box w-400 h-250 hmax">
      <el-form ref="loginform" :model="dynamicValidateForm" :rules="rules" label-width="0" class="form-box">
        <el-form-item label="" prop="userName">
          <el-input v-model="dynamicValidateForm.userName" class="w-300" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="dynamicValidateForm.password" class="w-300" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-button type="primary" class="w-300" @click="submitForm()">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      dynamicValidateForm: {
        userName: '',
        password: '',
      },
    };
  },
  computed: {},
  watch: {
    // temObj: {
    //   handler(newVal, oldVal) {
    //   },
    //   deep: true, // 深度
    //   immediate: true, // 立即执行
    // },
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs.loginform.validate((valid) => {
        if (!valid) {
          return;
        }
        const token =
          'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiLmmJPogYrnp5HmioAiLCJpc3MiOiLmmJPogYrnp5HmioAiLCJpYXQiOjE2MzY5NzA0NzgsImV4cCI6MTYzNzA1Njg3OCwiY29tcGFueUlkIjoxMDE4MSwidXNlcklkIjoicHJkMTAiLCJkZXBhcnRtZW50SWQiOjE0MjgwLCJnZW5lcmF0ZVRpbWUiOiIyMDIxLTExLTE1IDE4OjAxOjE4IiwianRpIjoiNmUzMDNiZmQtZGRiNS00MzA1LTliMDItZGMwY2E2MDM2OGQzIn0.iDjZnnKmk7xny9c26vpPxWe9lhcTAxhisAbrdJqjyGIZ3xZmbGNqrt1JB0s4TlS5tTb41ZATUqWnkzTObZsuKUQhxUNJRuaszgu0DL6Kjpzp1_b38QI14DrN0Q5SM9Eb3yXcgZJHpZ2DFPhB6LWNrQAUDsSiep5oMh4-QApY02k';
        this.$router.push('/login?access_token=' + token);
      });
    },
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.hmax {
  height: 100%;
}
.center-box {
  display: flex;
  align-items: center;
  justify-content: center;
  // background: url('../../assets/images/login-bg.jpeg') no-repeat;
  background-size: 100%;

  .login-box {
    border-radius: 5px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075);
    transition: all 0.1s ease;
    background: linear-gradient(45deg, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000);
    background-size: 400%;
    animation: animate 20s linear infinite;
    display: flex;
    align-items: center;
    justify-content: center;
    .form-box {
      border-radius: 5px;
      background: #fff;
      height: calc(100% - 6px);
      width: calc(100% - 6px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  .login-box:after {
    filter: blur(20px);
  }

  @keyframes animate {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 300% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
}
</style>
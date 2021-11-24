<!--
 * @version: v1.2.0
 * @Author: 范庆龙
 * @Date: 2021-09-03 14:24:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-15 16:29:54
 * @FilePath: /newUi/src/components/layouts/src/layoutHeader/LayoutHeaderRight.vue
-->
<template>
  <div class="flex ai-center">
    <!--        -->
    <!--        <icon-class class="mr-43 cursor-p" @click.native="drawer = true" icon-class="icon-C-C1" font="20"-->
    <!--                    color="var(&#45;&#45;layoutTopMenuCol)"/>-->
    <!--        <LayoutHeaderMessage class="cursor-p mr-36"/>-->

    <!--        <icon-class class="mr-40 cursor-p" icon-class="icon-C-C3" @iconClick="detailsFun" font="20" color="var(&#45;&#45;layoutTopMenuCol)"/>-->

    <icon-class
      :title="isFullscreen ? '全屏' : '取消全屏'"
      class="mr-40 cursor-p"
      :icon-class="isFullscreen ? 'icon-C-C6' : 'icon-C-C7'"
      @iconClick="isScreenFull"
      font="24"
      color="var(--layoutTopMenuCol)"
    />
    <icon-class class="mr-44 cursor-p" icon-class="icon-C-C13" @iconClick="settingFun" font="24" color="var(--layoutTopMenuCol)" />

    <el-button type="primary" size="mini" font="14" class="w-32 h-32 mr-12 btnName" circle>
      {{ $route.path == '/oldLayout' || $route.path == '/newLayout' ? '雯' : userMsg.userId.charAt(0) }}
    </el-button>
    <el-dropdown class="mr-14" trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        {{ $route.path == '/oldLayout' || $route.path == '/newLayout' ? '李乐雯' : userMsg.userId }} <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="p-0 popoverCard">
        <div class="w-232 pt-15">
          <div align="center" class="el-dropdown-name" font="16">
            {{ $route.path == '/oldLayout' || $route.path == '/newLayout' ? '李乐雯' : userMsg.userId }}
          </div>
          <div align="center" class="ptb-5 el-dropdown-easyChat" font="12">
            {{ $route.path == '/oldLayout' || $route.path == '/newLayout' ? '易聊科技 • 渠道销售顾问' : userMsg.sub }}
          </div>
        </div>

        <el-dropdown-item v-for="item in dropdown" :key="item.id" class="flex ai-center pl-55" font="12" style="font-weight: 600" :command="item.id" divided>
          <icon-class :icon-class="item.icon" font="20" color="var(--layoutTopMenuCol)" />
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!--        <icon-class @iconClick="client" class="cursor-p" icon-class="icon-C-C4" font="20" color="var(&#45;&#45;layoutTopMenuCol)"/>-->
    <!--        <Dra-->
    <!--              :visible.sync="drawer"-->
    <!--              title="外呼拨打电话"-->
    <!--              titleIcon="icon-E-E9"-->
    <!--              footerBtnPosition="right"-->
    <!--              append-to-body-->
    <!--              titleIconBg="var(&#45;&#45;layoutMain-6359CA)"-->
    <!--              size="396px"-->
    <!--        >-->
    <!--            <layout-header-kcall/>-->
    <!--    -->
    <!--        </Dra>-->
  </div>
</template>

<script>
// import LayoutHeaderMessage from "./LayoutHeaderMessage";
// import LayoutHeaderKcall from "./LayoutHeaderKcall"

// import Dra from '@/components/drawer/Dra.vue';
import { mapGetters } from 'vuex';
//引入全屏插件
import screenfull from 'screenfull';

export default {
  name: 'LayoutHeaderRight',
  components: {
    // LayoutHeaderMessage,
    // LayoutHeaderKcall,
  },
  computed: {
    ...mapGetters(['userMsg']),
  },
  data() {
    return {
      isShow: false,
      isDetails: false,
      isFullscreen: true,
      dropdown: [
        {
          id: '1',
          name: '修改密码',
          icon: 'icon-C-C8',
        },
        {
          id: '2',
          name: '意见反馈',
          icon: 'icon-C-C9',
        },
        {
          id: '3',
          name: '坐席配置',
          icon: 'icon-C-C10',
        },
        {
          id: '4',
          name: '退出登录',
          icon: 'icon-C-C11',
        },
      ],
    };
  },

  methods: {
    isScreenFull() {
      if (!screenfull.isEnabled) {
        // 如果不支持进入全屏，发出不支持提示
        this.$message({
          message: '您的浏览器版本过低不支持全屏显示！',
          type: 'warning',
        });
        return false;
      }
      screenfull.toggle();
      this.isFullscreen = screenfull.isFullscreen;
    },
    client() {
      this.isShow = !this.isShow;
      this.$emit('client', this.isShow);
    },
    detailsFun() {
      this.isDetails = !this.isDetails;
      this.$emit('isDetails', this.isDetails);
    },
    settingFun() {
      this.$emit('setting', true);
    },
    theme(type) {
      // this.$store.commit('upDate', {themeType: type});
      window.document.documentElement.setAttribute('data-theme', type);
    },
    handleCommand(command) {
      if (command == '4') {
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.popoverCard.el-popper[x-placement^='bottom'] .popper__arrow {
  display: none !important;
}

.popoverCard.el-popper[x-placement^='bottom'] {
  margin-top: 18px !important;
}

.popoverCard.el-popper {
  top: 50px !important;
}

::v-deep .el-badge__content.is-fixed {
  right: 13px;
}

.el-dropdown-menu--medium .el-dropdown-menu__item.el-dropdown-menu__item--divided {
  margin-top: 0px;
}

.el-dropdown-menu__item i {
  margin-right: 8px;
}

.el-dropdown-menu--medium .el-dropdown-menu__item.el-dropdown-menu__item--divided:before {
  height: 0;
}

.el-dropdown-menu--medium .el-dropdown-menu__item {
  line-height: 37px;
  height: 37px;
}
.el-dropdown-link {
  color: var(--layoutTopMenuCol);
}
.btnName,
.btnName:hover,
.btnName:focus {
  background-color: var(--layoutTopMenuBtn);
  border-color: var(--layoutTopMenuBtn);
  color: var(--layoutTopMenuBtnCol);
}
.el-dropdown-menu {
  border: none;

  .el-dropdown-name {
    font-weight: 600;
    color: $-color-344563;
  }

  .el-dropdown-easyChat {
    font-weight: 400;
    color: #7e84a3;
  }

  .el-dropdown-menu__item {
    font-weight: 500;
    color: $-color-344563;
  }

  .el-dropdown-menu__item:not(.is-disabled):hover,
  .el-dropdown-menu__item:focus {
    background-color: var(--layoutMain-6359CA);
    color: $-color-ffffff;
    border-radius: 1px;

    &:hover ::v-deep i {
      color: $-color-ffffff !important;
    }
  }
}
</style>

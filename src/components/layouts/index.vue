<template>
  <div class="layout flex jc-between position-r" height="100%">
    <el-container class="overflow-y-a position-r layout-container position-a" :style="styleObj" width="100%" height="100%">
      <el-aside class="position-r overflow-i layout-elaside" :width="isCollapseShow ? '65px' : '235px'">
        <div class="br-1 layout-aside">
          <div class="h-68 layout-aside-box" width="100%">
            <div :class="['layout-aside-boxIcon position-r', 'h-66 flex ai-center', 'pl-15', isCollapse ? 'w-48' : 'w-219']">
              <icon-class icon-class="icon-A-A1" font="28" color="var(--layoutBeacon)" />
              <div align="center" :class="['position-a mt-5', isCollapse ? '' : 'pl-12']" v-if="!isCollapse">
                <div font-weight="600" class="w-95" font="18">BEACON</div>
                <div font-weight="600" font="12" style="transform: scale(0.51); margin-top: -4px">EASYLIAO TECHNOLOGY</div>
              </div>
            </div>
          </div>
          <!--                    <div class="h-38" v-if="layoutSetting.tag.value=='1'" style="background-color: #ffffff">-->
          <!--                        <div :style="{width: isCollapse?'calc(100% - 16px)':'calc(100% - 12px)'}" style="-->
          <!--    border-right: 1px solid rgba(21, 34, 50, 0.08);" height="100%"></div>-->
          <!--                    </div>-->
          <LayoutSide class="overflow-y-a overflow-x-h layout-menu" :isCollapse="isCollapse" height="100%" />
        </div>
        <!-- 折叠按钮 -->
        <div class="layout-aside-collapse position-a" @click="collapseChage">
          <div class="w-27 h-27 flex jc-center ai-center layout-aside-collapseBtn">
            <el-button round size="mini"><i font-weight="600" :class="isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i> </el-button>
          </div>
        </div>
      </el-aside>
      <el-main class="p-0 position-r overflow-h" height="100%">
        <el-header class="layout-nav h-68 position-a" width="100%">
          <LayoutHeader @setting="settingFun" />
        </el-header>
        <layout-tag
          v-model="defaultValue"
          :tags-list="tagsList"
          @tabClick="tabClick"
          @closeAll="closeAll"
          @closeCru="closeCru"
          @lrClose="lrClose"
          v-if="layoutSetting.tag.value == '1'"
        ></layout-tag>
        <div
          class="layout-main plr-24 pb-24 overflow-a position-r mt-68 pt-32"
          :style="layoutSetting.tag.value == '1' ? 'height: calc(100% - 107px)' : 'height: calc(100% - 68px)'"
        >
          <LayoutBreadcrumb class="mb-30" />
          <div class="layout-routeView" v-loading="routeView">
            <keep-alive>
              <transition name="left-to-right" mode="out-in" appear>
                <router-view v-if="$route.meta.keepAlive"></router-view>
              </transition>
            </keep-alive>
            <transition name="left-to-right" mode="out-in" appear>
              <router-view v-if="!$route.meta.keepAlive"></router-view>
            </transition>
          </div>
        </div>
        <!--                <el-backtop target=".layout-routeView .layout-main" :bottom="100">-->
        <!--                    <div class="el-icon-caret-top" style="border-radius: 50%"> </div>-->
        <!--                </el-backtop>-->
      </el-main>
    </el-container>
    <!--        <layout-client class="layout-client w-250 overflow-h position-a" height="100%"-->
    <!--        ></layout-client>-->
    <Dra
      :visible.sync="settingLayout"
      title="系统主题设置"
      titleIconBg="var(--layoutMain-6359CA)"
      titleIcon="icon-D1-A6"
      footerBtnPosition="right"
      append-to-body
      size="396px"
    >
      <LayoutSetting></LayoutSetting>
    </Dra>
  </div>
</template>
<script>
import utils from '@/utils';
import Dra from '@/components/drawer/Dra.vue';
import colorSetting from '@/utils/layoutColorSetting';

const vueFiles = require.context('./src', false, /\.vue$/);
import LayoutHeader from './src/layoutHeader/index';
import LayoutSetting from './src/layoutSetting/index';
// import LayoutClient from "./src/layoutClient/index";
import { mapGetters } from 'vuex';
import layoutTag from '@/mixins/layoutTag';
import LayoutTag from './src/LayoutTag';

export default {
  name: 'Layout',
  mixins: [layoutTag],
  computed: {
    ...mapGetters(['routeView', 'authCodeArr', 'userMsg', 'nomalMenu', 'defaultActiveMenu', 'layoutSetting', 'layoutTag', 'easyDetail']),
  },

  watch: {
    // "$route"(to) {
    //     let tempArray = this.authCodeArr.map(item => {
    //         return item.name;
    //     })
    //     let tempArray1 = this.authCodeArr.map(item => {
    //         return item.authority;
    //     })
    //     // 路由权限控制  tempArray1.indexOf(to.meta.authCode)!=-1
    //     if (tempArray.indexOf(this.userMsg.userId) == -1 && tempArray1.indexOf(to.meta.authCode) != -1) {
    //         this.$router.push("./404");
    //     }
    // },
    'layoutSetting.tag.value'(v) {
      if (v == 1) {
        this.$store.dispatch('setLayoutTag', '');
      }
    },
  },
  data() {
    return {
      isCollapse: false,
      isCollapseShow: false,
      client: true,
      settingLayout: false,
      styleObj: {},
      asideObj: {},
    };
  },
  components: {
    LayoutTag,
    LayoutHeader,
    // LayoutClient,
    LayoutSetting,
    Dra,
    ...utils.readFile(vueFiles),
  },
  methods: {
    // 侧边栏折叠
    collapseChage() {
      this.isCollapseShow = !this.isCollapseShow;
      if (this.isCollapseShow) {
        setTimeout(() => {
          this.isCollapse = !this.isCollapse;
        }, 300);
      } else {
        this.isCollapse = !this.isCollapse;
      }
    },
    settingFun(v) {
      this.settingLayout = v;
    },
    comSetColor(value) {
      // 初始化主题色和布局
      colorSetting.setLayoutColor(value);
      colorSetting.isThemeLayout(this.layoutSetting.themeLayout.value, value);
    },
  },
  mounted() {
    if (this.layoutSetting.color.value != '') {
      this.comSetColor(this.layoutSetting.color.value);
    } else {
      this.comSetColor(this.layoutSetting.color.pickerColor);
    }
  },
};
</script>

<style lang='scss' scoped>
.layout-main {
  box-sizing: border-box;
}

.layout-container {
  z-index: 2;
  transition: all 0.3s linear;
}

.layout-elaside {
  transition: all 0.3s linear;
  height: calc(100% - 30px);
}

.left-to-right-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.left-to-right-enter-active,
.left-to-right-leave-active {
  transition: all 0.3s;
}

.left-to-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.layoutTag {
  position: absolute;
  z-index: 1;
  top: 68px;
}

@import '~@scss/home/layouts';
</style>

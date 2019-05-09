<template>
  <div id="app">
    <v-header ref="header" @add-load="addLoad"></v-header>
    <div class="a-content">
      <mq-layout mq="md+">
        <keep-alive>
          <router-view :user="user" @no-sign="noSign"></router-view>
        </keep-alive>
      </mq-layout>
    </div>
    <v-footer @add-load="addLoad"></v-footer>
    <div class="lodingwrap" v-show="loadingShow">
      <radial-progress-bar
        :diameter="200"
        :completed-steps="completedSteps"
        :total-steps="totalSteps"
        class="loading"
      >
        <p v-if="completedSteps!==100">Hey,你好呀!
          <br>
          {{completedSteps}}%
          <br>
        </p>
        <p v-if="completedSteps===60&&$mq===sm">手机暂未适配</p>
        <p v-bind:class="{welcome:show}">{{noticeText}}</p>
      </radial-progress-bar>
    </div>
  </div>
</template>

<script>
import RadialProgressBar from "@/components/common/RadialProgressBar";
import vFooter from "@/components/footer";
import vHeader from "@/components/header";

export default {
  name: "app",
  data() {
    return {
      user: [
        {
          username: "",
          avatar: "",
          level: "",
          id: ""
        }
      ],
      show: false,
      completedSteps: 0,
      totalSteps: 100,
      noticeText: "...",
      loadingShow: "true",
      loadTime: 2000
    };
  },
  components: {
    RadialProgressBar,
    vFooter,
    vHeader
  },
  watch: {
    //预加载时候的提示文字根据进度而改变
    completedSteps() {
      if (this.completedSteps < 20) {
        this.noticeText = "开始加载中";
      }
      if (this.completedSteps >= 20 && this.completedSteps < 40) {
        this.noticeText = "刚开始有点慢";
      }
      if (this.completedSteps >= 40 && this.completedSteps < 60) {
        this.noticeText = "就快要好了";
      }
      if (this.completedSteps >= 60 && this.completedSteps < 80) {
        if (this.$mq === "sm") {
          this.noticeText = "请移步PC端或旋转手机";
        } else {
          this.noticeText = "就差最后一点点";
        }
      }
      if (this.completedSteps === 100) {
        this.noticeText = "欢迎进入";
        this.show = true;
        let t = setTimeout(this.hideLoading, 500);
        //					console.log(this.loadingShow)
      }
    }
  },
  created() {
    this.addLoad();
    this.$root.eventHub.$on("getUser", user => {
      this.user = user;
    });

    console.log(
      "%c 嘿,你好呀!\n这里并没有什么新鲜的东西可以看的,你可以仔细在我博客里去找找。\n——iBaiWei's blog",
      "color: #333;font-size: 12px;font-weight: light;font-family:font1;line-height:2em;"
    );
  },
  mounted() {
    this.addLoad();
  },
  methods: {
    hideLoading() {
      this.loadingShow = false;
    },
    noSign() {
      this.$refs.header.openLogform();
    },
    addLoad() {
      this.loadTime -= 200;
      setTimeout(res => {
        this.completedSteps += 20;
      }, this.loadTime);
      //console.log(this.completedSteps)
    }
  }
};
</script>

<style lang="less">
@import url("assets/css/style.css");
@import url("assets/css/reset.css");
@color1: #41b883;
@color2: #2c3e50;
@font-face {
  font-family: "font1";
  src: url("./assets/fonts/font1.otf");
  src: url("./assets/fonts/font1.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}
.vue-message {
  z-index: 2 !important;
  display: none !important;
}
.ivu-tabs-tab {
  color: #969696 !important;
  font-weight: bold;
  font-family: "microsoft yahei" !important;
  margin-bottom: 5px;
}

.ivu-tabs-tab:hover {
  color: #333 !important;
}

.ivu-tabs-tab {
  font-size: 13px;
  font-weight: 300;
}

.ivu-tabs-ink-bar {
  height: 2px;
  background-color: #000 !important;
}

.ivu-tabs-nav .ivu-tabs-tab .ivu-icon {
  width: 14px;
  height: 14px;
  margin-right: 4px;
  position: relative;
  top: 2px;
}

.ivu-icon {
  font-size: 20px;
}

.ivu-tabs-nav .ivu-tabs-tab-active {
  color: #000 !important;
}

.ivu-modal-content {
  border-radius: 0px !important;
}

.no-radius {
  border-radius: 0px !important;
}

.a-content {
  flex: 1;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  margin-top: 64px;
}

.ivu-form-item-error-tip {
  font-size: 12px !important;
  margin: 0px 0 10px 0 !important;
}

body {
  position: relative;
  font-family: "font1", "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei" !important;
}

.ivu-steps-item.ivu-steps-status-finish .ivu-steps-tail > i:after {
  color: #000 !important;
}

.ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner {
  background-color: #fff !important;
  border-color: @color1 !important;
}

.ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner span,
.ivu-steps-item.ivu-steps-status-finish
  .ivu-steps-head-inner
  > .ivu-steps-icon {
  color: @color1 !important;
}

.ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner {
  border-color: @color1 !important;
  background-color: @color1 !important;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  box-sizing: border-box;
  padding: 0 20px 96px 20px;
  margin: 0;
  font-family: "font1", "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei" !important;
  height: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @color2;
}

.lodingwrap {
  position: absolute;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  .loading {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    margin: auto;
    p {
      text-align: center;
      color: #003300;
      line-height: 0;
      font-weight: 500;
    }
    p:first-child {
      line-height: 1.5;
    }
    p + p {
      line-height: 1.5;
      margin-top: 0;
      padding-bottom: 0;
    }
    p.welcome {
      font-weight: 700;
      color: @color1;
      font-size: 18px;
    }
  }
}
</style>
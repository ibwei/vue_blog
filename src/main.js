// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueResource from "vue-resource";
import iView from "iview";
import "iview/dist/styles/iview.css";
import VueMq from "vue-mq";
//Vue.http.options.emulateJSON=true
Vue.use(iView);
Vue.use(VueResource);
Vue.config.productionTip = false;

// 部分代码省略
iView.LoadingBar.config({
  color: "#41b883",
  failedColor: "#f00",
  height: 3
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

Vue.use(VueMq, {
  breakpoints: {
    // default breakpoints - customize this
    sm: 768,
    md: 992,
    lg: Infinity
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: {
    App
  },
  data: {
    eventHub: new Vue()
  }
});

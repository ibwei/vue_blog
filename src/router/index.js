import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
const blog = () => import("../components/blog.vue");
const me = () => import("../components/me.vue");
const artical = () => import("../components/artical.vue");
const write = () => import("../components/write.vue");
const contact = () => import("../components/contact.vue");
const app = () => import("../App.vue");
const helloWorld = () => import("../components/HelloWorld.vue");
const notfound = () => import("../components/notfound.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      component: helloWorld,
      meta: {
        title: "Flipped心情分享社区"
      }
    },
    {
      path: "/hello",
      component: helloWorld,
      meta: {
        title: "Flipped心情分享社区"
      }
    },
    {
      path: "/blog",
      component: blog,
      meta: {
        title: "文章列表"
      }
    },
    {
      path: "/me",
      component: me,
      meta: {
        title: "个人中心"
      }
    },
    {
      path: "/artical/:id",
      name: "artical",
      component: artical,
      meta: {
        title: "文章详情"
      }
    },
    {
      path: "/write",
      component: write,
      meta: {
        title: "我要发表"
      }
    },
    {
      path: "/contact",
      component: contact,
      meta: {
        title: "关于作者"
      }
    },
    {
      path: "/error",
      component: notfound,
      meta: {
        title: "页面走丢了..."
      }
    },
    { path: "*", redirect: "/error" }
  ]
});

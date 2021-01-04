import {
  createRouter,
  createWebHistory,
  createMemoryHistory
} from "vue-router";
import Home from "../views/Home.vue";
import Index from "../views/Index.vue";
import About from "../views/About.vue";
import Test from "../views/Test.vue";
import NotFound from "../views/404.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
      keywords: "damowang, 标签，home",
      description: "www.damowangzhu.com"
    }
  },
  {
    path: "/",
    alias: "/index",
    name: "Index",
    component: Index,
    meta: {
      title: "首页 | Index"
    }
  },
  {
    path: "/about",
    name: "About",
    component: About
    // component: () => // 报错 编译路径问题？
    //   //   // import(/* webpackChunkName: "about" */ "../views/About.vue")
    //   import("../views/About.vue")
  },
  {
    path: "/test",
    name: "Test",
    component: Test
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound
  }
];

export default function() {
  return createRouter({
    history: process.env.VUE_APP_SSR
      ? createMemoryHistory()
      : createWebHistory(),
    routes
  });
}

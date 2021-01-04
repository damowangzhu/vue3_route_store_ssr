import { createApp, createSSRApp } from "vue";
import App from "./App.vue";
import createRouter from "./router";
import createStore from "./store";
import { sync } from "vuex-router-sync";

// sync(store, router);

// createApp(App)
//   .use(store)
//   .use(router)
//   .mount("#app");

// const app = process.env.VUE_APP_SSR ? createSSRApp(App) : createApp(App);
// app.use(store);
// app.use(router);

// console.log(111111);

export default function() {
  const app = process.env.VUE_APP_SSR ? createSSRApp(App) : createApp(App);
  const router = createRouter();
  const store = createStore();
  sync(store, router);
  app.use(store).use(router);

  return {
    app,
    store,
    router
  };
}

// export function createApp() {
//   // 创建 router 和 store 实例
//   const router = createRouter();
//   const store = createStore();

//   // 同步路由状态(route state)到 store
//   sync(store, router);

//   // 创建应用程序实例，将 router 和 store 注入
//   const app = new Vue({
//     router,
//     store,
//     render: h => h(App)
//   });

//   // 暴露 app, router 和 store。
//   return { app, router, store };
// }

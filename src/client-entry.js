import createApp from "./app";
const { app, router, store } = createApp();

router.isReady().then(() => {
  console.log("client router ready");
  app.mount("#app", true);

  if (!window.__INITIAL_STATE__) {
    // fix client-only 页面 title
    document.title = router.currentRoute.value.meta.title || "竹子";
    !router.currentRoute.value.matched.length &&
      (window.location.href = "/404");
  }
});

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
} else {
  // 客户端渲染 预取数据
  app.mixin({
    beforeMount() {
      const { asyncData } = this.$options;
      if (asyncData) {
        this.dataPromise = asyncData({
          store: this.$store,
          route: this.$route
        });
      }
    },
    beforeRouteUpdate(to, from, next) {
      const { asyncData } = this.$options;
      if (asyncData) {
        asyncData({
          store: this.$store,
          route: to
        })
          .then(next)
          .catch(next);
      } else {
        next();
      }
    }
  });
}

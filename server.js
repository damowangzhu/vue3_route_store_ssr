const path = require("path");
const Koa = require("koa");
const server = new Koa();
const staticPath = require("koa-static");
const { renderToString } = require("@vue/server-renderer");

const templateHTML = require("fs").readFileSync(
  path.join(__dirname, "dist/client/indexc.html"),
  "utf-8"
);

const manifest = require(path.join(__dirname, "dist/server/manifest.json"));
const appPath = path.join(__dirname, "dist", "server", manifest["app.js"]);
const createApp = require(appPath).default;

server.use(staticPath(path.join(__dirname, "dist/client")));

server.use(async (ctx, next) => {
  const { app, router, store } = await createApp(ctx);
  const html = await renderToString(app);
  const meta = router.currentRoute.value.meta;

  ctx.body = templateHTML
    .replace(
      '<div id="app"></div>',
      `<div id="app" SSR>${html}</div><script>window.__INITIAL_STATE__ = ${JSON.stringify(
        store.state
      )}</script>`
    )
    .replace("&title", meta.title || "竹子")
    .replace("&keywords", meta.keywords || "")
    .replace("&description", meta.description || "");
});

server.listen(3000, () => {
  console.log("  Server running at");
  console.log("  - Local: \x1b[36mhttp://localhost:\x1b[96m3000/");
});

const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const nodeExternals = require("webpack-node-externals");
const SSR = process.env.VUE_APP_SSR;
const target = SSR ? "server" : "client";

module.exports = {
  publicPath: "./",
  indexPath: "indexc.html",
  outputDir: `dist/${target}`,
  chainWebpack: webpackConfig => {
    webpackConfig.module.rule("vue").uses.delete("cache-loader");
    webpackConfig.module.rule("js").uses.delete("cache-loader");
    webpackConfig.module.rule("ts").uses.delete("cache-loader");
    webpackConfig.module.rule("tsx").uses.delete("cache-loader");

    webpackConfig
      .plugin("manifest")
      .use(new WebpackManifestPlugin({ fileName: "manifest.json" }));

    webpackConfig
      .entry("app")
      .clear()
      .add(`./src/${target}-entry.js`);

    if (SSR) {
      webpackConfig.target("node");
      webpackConfig.output.libraryTarget("commonjs2");
      webpackConfig.externals(nodeExternals({ allowlist: /\.(css|vue)$/ }));
      webpackConfig.optimization.splitChunks(false).minimize(false);
      webpackConfig.plugins.delete("hmr");
      webpackConfig.plugins.delete("preload");
      webpackConfig.plugins.delete("prefetch");
      webpackConfig.plugins.delete("progress");
      webpackConfig.plugins.delete("friendly-errors");
    }
  }
};

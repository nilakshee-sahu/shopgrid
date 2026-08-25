const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://shopgrid-3joz.onrender.com/",
      changeOrigin: true,
    }),
  );
};
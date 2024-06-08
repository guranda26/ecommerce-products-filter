import { createProxyMiddleware } from "http-proxy-middleware";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const API_URL = "https://zoommer-api.lemon.do/v1";

const proxy = createProxyMiddleware({
  target: API_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/products": "/Products/v3",
  },
  onProxyReq(proxyReq, req, res) {
    proxyReq.setHeader("Authorization", "Bearer YOUR_API_TOKEN");
  },
});

export default function handler(req, res) {
  proxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }
  });
}

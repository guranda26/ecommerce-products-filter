import { createProxyMiddleware } from "http-proxy-middleware";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["s3.zoommer.ge"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://zoommer-api.lemon.do/v1/:path*",
      },
    ];
  },
};

export default nextConfig;

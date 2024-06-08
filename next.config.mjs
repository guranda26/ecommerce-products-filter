const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.zoommer.ge",
        pathname: "**",
      },
    ],
  },
  async rewrites() {
    return [];
  },
  async redirects() {
    return [
      {
        source: "/api/:path*",
        destination: "https://zoommer-api.lemon.do/v1/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "172.20.10.12"],
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/image/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "mosaic.scdn.co",
        pathname: "/image/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["react-icons"],
  reactStrictMode: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/mock/",
          outputPath: "static/mock/",
          name: "[name].[hash].[ext]",
          esModule: false,
        },
      },
    });

    return config;
  },
};

export default nextConfig;

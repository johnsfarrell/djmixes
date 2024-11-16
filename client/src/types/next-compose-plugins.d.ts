declare module "next-compose-plugins" {
  import { NextConfig } from "next";
  import { Plugin } from "next/dist/build/webpack-config";

  type NextComposePlugins = (
    plugins: Plugin[],
    nextConfig: NextConfig,
  ) => NextConfig;

  const withPlugins: NextComposePlugins;

  export default withPlugins;
}

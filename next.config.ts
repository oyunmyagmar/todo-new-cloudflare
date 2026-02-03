import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

const nextConfig: NextConfig = {};

const initDev = async () => {
  if (process.env.NODE_ENV === "development") {
    await setupDevPlatform();
  }
};

initDev();

export default nextConfig;

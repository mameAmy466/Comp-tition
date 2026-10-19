const { i18n } = require("./next-i18next.config");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: [
      "cms.acan.group",
      "img.youtube.com",
      "i.vimeocdn.com",
      "www.dailymotion.com",
      "actu.rts.sn",
      "tvestatic.acan.group",
      "dev.acan.group",
      "daara.acan.group",
      "acan-fullpage-scroll.vercel.app",
    ],
  },
  i18n: {
    ...i18n,
    localeDetection: true,
  },
  trailingSlash: true,
  webpack: (config, { dev }) => {
    if (dev) config.cache = { type: "memory" };
    return config;
  },
};

module.exports = nextConfig;

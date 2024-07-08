/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.talkiebot.com.br", "talkiebot.com.br", "psychic-tribble-9jj5gg9xv56277j-3100.app.github.dev"],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.talkiebot.com.br", "talkiebot.com.br"],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = nextConfig;

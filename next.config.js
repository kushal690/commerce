/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["bidhan.blob.core.windows.net"],
  },
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: "4mb",
  },
};

module.exports = nextConfig;

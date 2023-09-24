/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  images: {
    domains: ["bidhan.blob.core.windows.net"],
  },
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: "4mb",
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  experimental: {
    optimisticClientCache: true,
    ppr: true,
  },
}

let config = nextConfig

if (!!process.env.ANALYZE) {
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
  })
  config = withBundleAnalyzer(nextConfig)
}

export default config

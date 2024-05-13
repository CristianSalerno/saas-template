/** @type {import('next').NextConfig} */
const nextjsConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@repo/ui",
    "@repo/common",
    "@repo/database",
    "@repo/auth",
    "@repo/trpc",
    "@repo/lib",
    "@repo/analytics",
    "@repo/stripe",
  ],
  images: {
    remotePatterns: [
      {
        hostname: "tailwindui.com",
      },
    ],
  },
};

module.exports = nextjsConfig;

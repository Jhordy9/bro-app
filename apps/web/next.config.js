/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  experimental: {
    forceSwcTransforms: true,
  },
  compiler: {
    relay: require('./relay.config')
  }
};

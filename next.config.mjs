import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config;
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
});

export default nextConfig;

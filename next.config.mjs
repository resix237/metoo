/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["media.licdn.com"],
  },
  // Enable standalone output for Docker deployment
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

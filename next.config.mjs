/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["media.licdn.com"],
  },
  // Enable standalone output for Docker deployment
  output: 'standalone',
};

export default nextConfig;

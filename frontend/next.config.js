/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  transpilePackages: ['framer-motion', 'lucide-react'],
  images: {
    unoptimized: true,
  },
  async rewrites() {
    if (process.env.BACKEND_URL && process.env.BACKEND_URL !== 'http://localhost:5000') {
      return [
        {
          source: '/api/v1/:path*',
          destination: `${process.env.BACKEND_URL}/api/v1/:path*`,
        },
      ];
    }
    return [];
  },
};

module.exports = nextConfig;


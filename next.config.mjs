/** @type {import('next').NextConfig} */
const nextConfig = {

    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://localhost:3002/:path*', // URL de ton backend
          },
        ];
      },
};

export default nextConfig;

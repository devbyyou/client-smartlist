// next.config.js
module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3002/:path*', // URL de ton backend
        },
      ];
    },
  };
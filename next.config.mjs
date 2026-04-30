/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
        search: ''
      }
    ]
  },
   async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://bike-accessories-backend.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;

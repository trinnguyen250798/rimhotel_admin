import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
    
    turbopack: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1', // Thêm cả IP này nếu localhost mapping sang 127.0.0.1
        port: '8000',
        pathname: '/storage/**',
      },
    ],
    // Cho phép Next.js fetch ảnh từ các địa chỉ loopback/nội bộ
    dangerouslyAllowSVG: true, 
    unoptimized: true, // Giải pháp tạm thời nếu vẫn bị chặn trên localhost
  },
};

export default nextConfig;

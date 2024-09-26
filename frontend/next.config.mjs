/** @type {import('next').NextConfig} */
import TerserPlugin from "terser-webpack-plugin";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig = {
  experimental: {
    swcDecorators: true, // SWC 데코레이터 지원 활성화
  },
  reactStrictMode: false,
  webpack: (config) => {
    config.optimization = {
      ...config.optimization,
      minimize: isProduction,
      minimizer: isProduction
        ? [
            new TerserPlugin({
              parallel: true,
              terserOptions: {
                format: {
                  comments: false,
                },
                compress: {
                  drop_console: true,
                },
              },
              extractComments: false,
            }),
          ]
        : [],
    };
    return config;
  },

  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;

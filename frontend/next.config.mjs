import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
import TerserPlugin from "terser-webpack-plugin";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig = {
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

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wimg.mk.co.kr",
        pathname: "/**",
      },
    ],
  },
};

export default withNextVideo(nextConfig, { folder: "videos" });

/** @type {import('next').NextConfig} */

const path = require("path");

console.log(process.env.AWS_BUCKET);
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "https",
        hostname: process.env.AWS_BUCKET,
      },
    ],
  },
};

module.exports = nextConfig;

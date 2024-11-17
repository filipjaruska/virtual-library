/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**/*",
      },
      {
        protocol: "https",
        hostname: "mighty-citadel-92312-bd2c74c8f386.herokuapp.com",
      },
    ],
  },
};

export default nextConfig;

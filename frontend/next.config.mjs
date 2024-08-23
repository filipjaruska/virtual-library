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
                hostname: "tasteful-respect-ed15c7ec66.media.strapiapp.com",
            }
        ],
    },
};

export default nextConfig;

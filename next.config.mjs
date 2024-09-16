// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**", // Permite cualquier imagen desde Firebase Storage
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**", // Permite cualquier imagen desde via.placeholder.com
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/login",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

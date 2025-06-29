/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['randomuser.me'], // ✅ allow external images from this domain
  },
};

export default nextConfig;

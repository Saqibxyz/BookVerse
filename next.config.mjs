/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_ADMIN_KEY: process.env.NEXT_PUBLIC_ADMIN_KEY, // Use NEXT_PUBLIC_ADMIN_KEY for public variables
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignore ESLint errors during builds (Vercel deploy)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during builds (Vercel deploy)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

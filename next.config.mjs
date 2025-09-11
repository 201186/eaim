/** next.config.mjs */
const nextConfig = {
  eslint: {
    // ignore ESLint errors during builds on Vercel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ignore TypeScript errors during builds on Vercel
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

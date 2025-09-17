// next-sitemap.config.js
const fs = require("fs");
const path = require("path");

function getBlogSlugs() {
  // possible locations for your posts folder
  const candidates = [
    path.join(process.cwd(), "posts"),
    path.join(process.cwd(), "src", "posts"),
    path.join(process.cwd(), "content", "blog"),
  ];

  for (const dir of candidates) {
    if (fs.existsSync(dir)) {
      return fs
        .readdirSync(dir)
        .filter((file) => file.match(/\.(mdx|md)$/i))
        .map((file) => file.replace(/\.(mdx|md)$/i, ""));
    }
  }
  return [];
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://educationaim.in",
  generateRobotsTxt: true,
  outDir: "./public",

  additionalPaths: async () => {
    const slugs = getBlogSlugs();
    return slugs.map((s) => ({
      loc: `/blog/${s}`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.7,
    }));
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Docker dev build: output = "standalone" (unchanged).
  // Cloudflare Pages build: NEXT_STATIC=true -> static export to ./out.
  output: process.env.NEXT_STATIC === "true" ? "export" : "standalone",
};

module.exports = nextConfig;
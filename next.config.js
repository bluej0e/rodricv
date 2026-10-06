/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // For static site generation
  trailingSlash: true,  // /work/ -> work/index.html, which Netlify serves directly
}

module.exports = nextConfig 
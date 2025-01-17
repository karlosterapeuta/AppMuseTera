/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-big-calendar', 'moment'],
  experimental: {
    esmExternals: 'loose'
  }
}

module.exports = nextConfig
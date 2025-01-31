const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-big-calendar', 'jspdf', 'html2canvas'],
  experimental: {
    esmExternals: true,
    largePageDataBytes: 128 * 100000,
  },
  images: {
    domains: ['jztbkimlcrfndooyhohg.supabase.co'],
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  distDir: '.next',
  generateEtags: true,
  optimizeFonts: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'), // Caminho absoluto para evitar erros
    };
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);

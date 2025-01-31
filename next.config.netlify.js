/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['jztbkimlcrfndooyhohg.supabase.co'],
    unoptimized: true,
  },
  transpilePackages: ['react-big-calendar', 'moment'],
  experimental: {
    esmExternals: 'loose', // Mantenha "loose" ou altere para "strict" caso necessário
  },
  typescript: {
    ignoreBuildErrors: false, // Desabilitado para pegar erros de TypeScript durante o build
  },
  eslint: {
    ignoreDuringBuilds: false, // Desabilitado para pegar erros de linting durante o build
  },
  output: 'standalone', // Pode manter isso dependendo da configuração de deploy
  poweredByHeader: false,
  compress: true,
  swcMinify: true, // Deixe ativado para otimização do código
  reactStrictMode: true, // Ativado para melhores práticas em desenvolvimento, pode ser desativado para depuração
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? true : false, // Remover console apenas em produção
  },
}

module.exports = nextConfig

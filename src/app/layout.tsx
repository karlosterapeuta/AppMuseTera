import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Providers } from '@/components/providers'
import { LayoutClient } from '@/components/LayoutClient'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true
})

export const metadata = {
  title: 'Sistema de Gerenciamento',
  description: 'Sistema de Gerenciamento para Musicoterapeutas',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          <LayoutClient>
            {children}
          </LayoutClient>
        </Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
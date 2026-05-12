import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'TaoFans | Figuritas del Mundial 2026',
  description: 'Registrá tus figuritas faltantes y coordiná tu pedido. El álbum más fácil de completar.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,900;1,900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ background: '#080808', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TaoFans | Figuritas del Mundial 2026',
  description: 'Registra tus figuritas faltantes y coordina tu pedido.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="google-site-verification" content="vDBWwzUE7TqsrhrAcl4zoWERypW2MuwaBBIn90VItPU" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ background: '#080808', color: '#fff', margin: 0, padding: 0 }}>
        {children}
        <script dangerouslySetInnerHTML={{ __html: `
            const obs = new IntersectionObserver((entries) => {
              entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
            }, { threshold: 0.15 });
            document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
          ` }} />
      </body>
    </html>
  )
}
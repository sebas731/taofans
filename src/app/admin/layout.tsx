import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const DISPLAY = { fontFamily: "'Barlow Condensed', sans-serif" }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  // Debug: ver qué usuario está logueado
  console.log('USER EMAIL:', user.email)
  console.log('USER ID:', user.id)

  const { data: admin, error } = await supabase
    .from('admins')
    .select('*')

  console.log('ADMINS EN DB:', JSON.stringify(admin))
  console.log('ERROR:', error)

  const esAdmin = admin?.some(a => a.email === user.email || a.user_id === user.id)
  console.log('ES ADMIN:', esAdmin)

  if (!esAdmin) redirect('/dashboard')

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{ background: '#080808', borderBottom: '1px solid #1E1E1E', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Link href="/admin" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ ...DISPLAY, fontSize: 22, fontWeight: 900, color: '#E8003D' }}>TAOFANS</span>
              <span style={{ background: '#E8003D', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>ADMIN</span>
            </Link>
            <div style={{ display: 'flex', gap: 4 }}>
              {[
                { href: '/admin', label: '📊 Dashboard' },
                { href: '/admin/usuarios', label: '👥 Usuarios' },
              ].map((item) => (
                <Link key={item.href} href={item.href}
                  style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, textDecoration: 'none', fontWeight: 500, padding: '6px 12px', borderRadius: 8 }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/dashboard" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none' }}>
            ← Volver al sitio
          </Link>
        </div>
      </nav>
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>
        {children}
      </main>
    </div>
  )
}
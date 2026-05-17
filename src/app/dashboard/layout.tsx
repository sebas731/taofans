import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardNav from '@/components/layout/DashboardNav'

const DEMO_MODE = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  let esAdmin = false
  let profile = { nombre: 'Usuario Demo', email: 'demo@demo.com' }

  if (!DEMO_MODE) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/auth/login')

    const [{ data: profileData }, { data: adminData }] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).single(),
      supabase.rpc('es_admin', { usuario_id: user.id }),
    ])

    if (profileData) profile = profileData
    if (adminData) esAdmin = true
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <DashboardNav user={profile} esAdmin={esAdmin} />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>
        {children}
      </main>
    </div>
  )
}
import DashboardNav from '@/components/layout/DashboardNav'

const DEMO_MODE = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  if (!DEMO_MODE) {
    const { createClient } = await import('@/lib/supabase/server')
    const { redirect } = await import('next/navigation')
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/auth/login')
  }

  const demoProfile = { nombre: 'Usuario Demo', email: 'demo@demo.com' }

  return (
    <div className="field-bg min-h-screen">
      <DashboardNav user={demoProfile} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}

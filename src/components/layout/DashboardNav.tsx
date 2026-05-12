'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface Props {
  user: { nombre: string; email: string } | null
}

export default function DashboardNav({ user }: Props) {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="font-display text-2xl text-brand-400 tracking-widest">
          ⚽ MUNDIAL 2026
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/dashboard/mis-pedidos" className="text-white/50 hover:text-white text-sm transition-colors">
            Mis pedidos
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-white/60 text-sm hidden sm:block">
              Hola, {user?.nombre ?? 'jugador'} 👋
            </span>
            <button
              onClick={handleLogout}
              className="text-white/40 hover:text-white text-sm transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

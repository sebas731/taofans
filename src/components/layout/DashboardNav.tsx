'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'

const DISPLAY = { fontFamily: "'Barlow Condensed', sans-serif" }

export default function DashboardNav({ user }: { user: { nombre: string; email: string } | null }) {
  const router = useRouter()
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') { setDark(true); document.documentElement.setAttribute('data-theme', 'dark') }
  }, [])

  function toggleTheme() {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <nav style={{
      borderBottom: '1px solid var(--border)',
      background: 'var(--nav-bg)',
      backdropFilter: 'blur(10px)',
      position: 'sticky', top: 0, zIndex: 40
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        <Link href="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>⚽</span>
          <span style={{ ...DISPLAY, fontSize: 24, fontWeight: 900, color: '#E8003D', letterSpacing: '0.08em' }}>TAOFANS</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link href="/dashboard/mis-pedidos" style={{ color: 'var(--text-secondary)', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}>
            Mis pedidos
          </Link>
          <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            Hola, {user?.nombre ?? 'usuario'} 👋
          </span>
          <button onClick={toggleTheme} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontSize: 16, color: 'var(--text-secondary)' }}>
            {dark ? '☀️' : '🌙'}
          </button>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: 14, cursor: 'pointer', fontWeight: 500 }}>
            Salir
          </button>
        </div>
      </div>
    </nav>
  )
}
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'

const DISPLAY = { fontFamily: "'Barlow Condensed', sans-serif" }

interface Props {
  user: { nombre: string; email: string } | null
  esAdmin?: boolean
}

export default function DashboardNav({ user, esAdmin = false }: Props) {
  const router = useRouter()
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      setDark(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    }
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
    <nav style={{ borderBottom: '1px solid var(--border)', background: 'var(--nav-bg)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 40 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>

        {/* Logo */}
        <Link href="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <img src="/logo.png" alt="TaoFans" style={{ height: 32, width: 'auto' }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
          <span style={{ ...DISPLAY, fontSize: 24, fontWeight: 900, letterSpacing: '0.06em' }}>
            TAO<span style={{ color: '#E8003D' }}>FANS</span>
          </span>
        </Link>

        {/* Derecha */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

          {/* Nombre usuario — solo desktop */}
          <span style={{ color: 'var(--text-secondary)', fontSize: 13, flexShrink: 0 }} className="desktop-only">
            {user?.nombre ?? 'usuario'}
          </span>

          {/* Botón admin */}
          {esAdmin && (
            <a href="/admin" style={{
              background: '#E8003D', color: '#fff', fontSize: 12, fontWeight: 700,
              padding: '6px 14px', borderRadius: 8, textDecoration: 'none',
              letterSpacing: '0.06em', flexShrink: 0, ...DISPLAY
            }}>
              ⚙️ ADMIN
            </a>
          )}

          {/* Modo oscuro */}
          <button onClick={toggleTheme} style={{
            background: 'none', border: '1px solid var(--border)',
            borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontSize: 15
          }}>
            {dark ? '☀️' : '🌙'}
          </button>

          {/* Salir */}
          <button onClick={handleLogout} style={{
            background: 'none', border: '1px solid var(--border)', borderRadius: 8,
            padding: '6px 14px', color: 'var(--text-secondary)', fontSize: 13,
            cursor: 'pointer', fontWeight: 500
          }}>
            Salir
          </button>
        </div>
      </div>
    </nav>
  )
}
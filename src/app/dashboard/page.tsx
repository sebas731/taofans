'use client'

import { useState, useEffect } from 'react'
import FiguitasSelector from '@/components/FiguitasSelector'
import { createClient } from '@/lib/supabase/client'

const DISPLAY = { fontFamily: "'Barlow Condensed', sans-serif" }

const CAMPANAS = [
  {
    id: 'mundial-2026',
    nombre: 'Mundial 2026',
    sub: 'Panini · FIFA Official',
    total: 980,
    activa: true,
    color: '#E8003D',
    gradiente: 'linear-gradient(135deg, #E8003D 0%, #FF6B35 100%)',
    emoji: '🏆',
    tag: 'MÁS POPULAR',
    bg: '/carrusel/foto1.jpg',
  },
  {
    id: '3reyes-2026',
    nombre: 'Mundial 3Reyes',
    sub: '3Reyes · Edición Especial',
    total: 588,
    activa: false,
    color: '#6B21C8',
    gradiente: 'linear-gradient(135deg, #6B21C8 0%, #A855F7 100%)',
    emoji: '👑',
    tag: 'PRÓXIMAMENTE',
    bg: '',
  },
  {
    id: 'liga-peru-2025',
    nombre: 'Liga 1 Perú',
    sub: 'Temporada 2025',
    total: 320,
    activa: false,
    color: '#FFE000',
    gradiente: 'linear-gradient(135deg, #FFE000 0%, #FF8C00 100%)',
    emoji: '🇵🇪',
    tag: 'PRÓXIMAMENTE',
    bg: '',
  },
]

export default function DashboardPage() {
  const [campanaActiva, setCampanaActiva] = useState<string | null>(null)
  const [userId, setUserId] = useState<string>('demo-user')
  const [initialTengo, setInitialTengo] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({ tengo: 0, pedidos: 0 })
  const [userName, setUserName] = useState('')

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setUserId(user.id)

      const [{ data: profile }, { data: tengo }, { count: pedidos }] = await Promise.all([
        supabase.from('profiles').select('nombre').eq('id', user.id).single(),
        supabase.from('figuritas_tengo').select('codigo').eq('user_id', user.id),
        supabase.from('pedidos').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
      ])

      if (profile) setUserName(profile.nombre)
      setStats({ tengo: tengo?.length ?? 0, pedidos: pedidos ?? 0 })
    }
    loadUser()
  }, [])

  async function seleccionarCampana(id: string) {
    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase.from('figuritas_tengo').select('codigo').eq('user_id', user.id)
      setInitialTengo(data?.map((f: { codigo: string }) => f.codigo) ?? [])
    }
    setCampanaActiva(id)
    setLoading(false)
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 48 }}>⚽</div>
        <p style={{ ...DISPLAY, fontSize: 24, color: 'var(--text-secondary)' }}>Cargando tu colección...</p>
      </div>
    )
  }

  if (campanaActiva) {
    const campana = CAMPANAS.find((c) => c.id === campanaActiva)
    return (
      <div>
        {/* Header campaña */}
        <div style={{ background: campana?.gradiente, borderRadius: 20, padding: '1.5rem 2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <button onClick={() => setCampanaActiva(null)}
            style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 10, padding: '8px 16px', cursor: 'pointer', color: '#fff', fontSize: 13, fontWeight: 600, backdropFilter: 'blur(8px)' }}>
            ← Volver
          </button>
          <span style={{ fontSize: 40 }}>{campana?.emoji}</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 2 }}>{campana?.sub}</p>
            <h1 style={{ ...DISPLAY, fontSize: 36, fontWeight: 900, color: '#fff', textTransform: 'uppercase', lineHeight: 1 }}>
              {campana?.nombre}
            </h1>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: '8px 16px', backdropFilter: 'blur(8px)' }}>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', marginBottom: 2 }}>Total figuritas</p>
            <p style={{ ...DISPLAY, fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{campana?.total}</p>
          </div>
        </div>

        <FiguitasSelector initialTengo={initialTengo} userId={userId} />

        <Footer />
      </div>
    )
  }

  return (
    <div>
      {/* ── BIENVENIDA PERSONALIZADA ── */}
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 4 }}>
          {new Date().getHours() < 12 ? '🌅 Buenos días' : new Date().getHours() < 18 ? '☀️ Buenas tardes' : '🌙 Buenas noches'}{userName ? `, ${userName}` : ''}
        </p>
        <h1 style={{ ...DISPLAY, fontSize: 48, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase', lineHeight: 1 }}>
          MI COLECCIÓN
        </h1>
      </div>

      {/* ── STATS RÁPIDAS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: '2rem' }}>
        {[
          { icon: '🎴', label: 'Figuritas tengo', value: stats.tengo, color: '#00A859', bg: '#00A85915' },
          { icon: '📦', label: 'Pedidos enviados', value: stats.pedidos, color: '#E8003D', bg: '#E8003D15' },
          { icon: '🏆', label: 'Álbumes activos', value: 1, color: '#FFE000', bg: '#FFE00015' },
        ].map((s) => (
          <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.color}30`, borderRadius: 16, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 28 }}>{s.icon}</span>
            <div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 2 }}>{s.label}</p>
              <p style={{ ...DISPLAY, fontSize: 32, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── CAMPAÑAS ── */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h2 style={{ ...DISPLAY, fontSize: 28, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
            🎯 Álbumes disponibles
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {CAMPANAS.map((c) => (
            <div key={c.id}
              onClick={() => c.activa && seleccionarCampana(c.id)}
              style={{
                borderRadius: 20, overflow: 'hidden', cursor: c.activa ? 'pointer' : 'not-allowed',
                opacity: c.activa ? 1 : 0.6, position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: c.activa ? `0 8px 32px ${c.color}30` : 'none',
                border: `1px solid ${c.color}40`,
              }}
              onMouseEnter={e => { if (c.activa) { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px ${c.color}50` }}}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = c.activa ? `0 8px 32px ${c.color}30` : 'none' }}
            >
              {/* Gradiente header */}
              <div style={{ background: c.gradiente, padding: '2rem 1.5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
                {/* Decorativo */}
                <div style={{ position: 'absolute', right: -20, top: -20, fontSize: 120, opacity: 0.15, lineHeight: 1 }}>{c.emoji}</div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                  <div>
                    <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 99, letterSpacing: '0.1em', backdropFilter: 'blur(8px)' }}>
                      {c.tag}
                    </span>
                    <h3 style={{ ...DISPLAY, fontSize: 32, fontWeight: 900, color: '#fff', textTransform: 'uppercase', lineHeight: 1, marginTop: 10, marginBottom: 4 }}>
                      {c.nombre}
                    </h3>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{c.sub}</p>
                  </div>
                  <span style={{ fontSize: 44 }}>{c.emoji}</span>
                </div>
              </div>

              {/* Footer de la card */}
              <div style={{ background: 'var(--bg-card)', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 2 }}>Total figuritas</p>
                  <p style={{ ...DISPLAY, fontSize: 24, fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>{c.total}</p>
                </div>
                <div style={{ background: c.activa ? c.color : 'var(--border)', color: c.activa ? (c.color === '#FFE000' ? '#080808' : '#fff') : 'var(--text-secondary)', padding: '10px 20px', borderRadius: 10, fontWeight: 700, fontSize: 13, ...DISPLAY, letterSpacing: '0.06em' }}>
                  {c.activa ? 'VER ÁLBUM →' : 'PRÓXIMAMENTE'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ACCESOS RÁPIDOS ── */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ ...DISPLAY, fontSize: 28, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
          ⚡ Accesos rápidos
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {[
            { icon: '📋', titulo: 'Mis pedidos', desc: 'Ver historial de pedidos', href: '/dashboard/mis-pedidos', color: '#00C2E0' },
            { icon: '💬', titulo: 'Contactar vendedor', desc: 'WhatsApp directo', href: `https://wa.me/${process.env.NEXT_PUBLIC_VENDEDOR_WHATSAPP}`, color: '#00A859', external: true },
            { icon: '🎴', titulo: 'Pedir faltantes', desc: 'Generar pedido rápido', href: '#campanas', color: '#E8003D' },
          ].map((item) => (
            <a key={item.titulo}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              style={{ background: 'var(--bg-card)', border: `1px solid var(--border)`, borderRadius: 16, padding: '1.25rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 14, transition: 'all 0.2s', borderLeft: `4px solid ${item.color}` }}>
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{item.titulo}</p>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 900, color: '#E8003D' }}>TAOFANS</span>
      <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
        © 2026 TaoFans · Desarrollado por <strong>Sebastian Mamani</strong>
      </p>
      <div style={{ display: 'flex', gap: 16 }}>
        <a href={`https://wa.me/${process.env.NEXT_PUBLIC_VENDEDOR_WHATSAPP ?? ''}`} style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>WhatsApp</a>
        <a href={`mailto:${process.env.NEXT_PUBLIC_VENDEDOR_EMAIL ?? ''}`} style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>Email</a>
      </div>
    </footer>
  )
}
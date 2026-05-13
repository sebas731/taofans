'use client'

import { useState } from 'react'
import FiguitasSelector from '@/components/FiguitasSelector'

const DISPLAY = { fontFamily: "'Barlow Condensed', sans-serif" }

const CAMPANAS = [
  {
    id: 'mundial-2026',
    nombre: 'Mundial 2026',
    sub: 'Panini · FIFA Official',
    total: 670,
    activa: true,
    color: '#E8003D',
    emoji: '🏆',
    tag: 'MÁS POPULAR',
  },
  {
    id: 'champions-2025',
    nombre: 'Champions 24/25',
    sub: 'Panini · UEFA Official',
    total: 588,
    activa: true,
    color: '#00C2E0',
    emoji: '⭐',
    tag: 'DISPONIBLE',
  },
  {
    id: 'liga-peru-2025',
    nombre: 'Liga 1 Perú 2025',
    sub: 'Álbum oficial peruano',
    total: 320,
    activa: false,
    color: '#6B21C8',
    emoji: '🇵🇪',
    tag: 'PRÓXIMAMENTE',
  },
]

export default function DashboardPage() {
  const [campanaActiva, setCampanaActiva] = useState<string | null>(null)

  if (campanaActiva) {
    const campana = CAMPANAS.find((c) => c.id === campanaActiva)
    return (
      <div>
        {/* Header campaña activa */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '2rem' }}>
          <button
            onClick={() => setCampanaActiva(null)}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600 }}
          >
            ← Volver
          </button>
          <div>
            <h1 style={{ ...DISPLAY, fontSize: 36, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase', lineHeight: 1 }}>
              {campana?.emoji} {campana?.nombre}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>
              Selecciona las figuritas que te faltan y envía el pedido
            </p>
          </div>
          <div style={{ marginLeft: 'auto', padding: '4px 12px', borderRadius: 6, background: campana?.color, color: ['#00C2E0', '#FFE000'].includes(campana?.color ?? '') ? '#080808' : '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em' }}>
            {campana?.tag}
          </div>
        </div>

        <FiguitasSelector initialFaltantes={[]} userId="demo-user" />
      </div>
    )
  }

  return (
    <div>
      {/* Título */}
      <div style={{ marginBottom: '2.5rem' }}>
        <p style={{ ...DISPLAY, fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', color: '#E8003D', marginBottom: 6 }}>BIENVENIDO</p>
        <h1 style={{ ...DISPLAY, fontSize: 56, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase', lineHeight: 0.95 }}>
          ELIGE TU<br />ÁLBUM
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 8, fontSize: 15 }}>
          Selecciona la campaña para empezar a registrar tus figuritas faltantes.
        </p>
      </div>

      {/* Cards campañas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {CAMPANAS.map((c) => (
          <div
            key={c.id}
            onClick={() => c.activa && setCampanaActiva(c.id)}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              overflow: 'hidden',
              opacity: c.activa ? 1 : 0.5,
              cursor: c.activa ? 'pointer' : 'not-allowed',
              transition: 'transform 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { if (c.activa) { (e.currentTarget as HTMLElement).style.borderColor = c.color; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)' }}}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = 'none' }}
          >
            <div style={{ height: 4, background: c.color }} />
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', padding: '4px 10px', borderRadius: 4, background: c.activa ? c.color : '#1E1E1E', color: ['#00C2E0', '#FFE000'].includes(c.color) ? '#080808' : '#fff' }}>
                  {c.tag}
                </span>
                <span style={{ fontSize: 28 }}>{c.emoji}</span>
              </div>

              <h3 style={{ ...DISPLAY, fontSize: 30, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase', lineHeight: 1, marginBottom: 4 }}>
                {c.nombre}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>{c.sub}</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>
                <span>Total figuritas</span>
                <span>{c.total}</span>
              </div>
              <div style={{ height: 3, background: 'var(--border)', borderRadius: 99 }}>
                <div style={{ height: '100%', width: 0, background: c.color, borderRadius: 99 }} />
              </div>

              <div style={{ marginTop: '1.25rem', padding: '10px', borderRadius: 8, background: c.activa ? c.color : 'var(--border)', color: ['#00C2E0', '#FFE000'].includes(c.color) || !c.activa ? '#080808' : '#fff', textAlign: 'center', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', fontFamily: "'Barlow Condensed', sans-serif" }}>
                {c.activa ? 'EMPEZAR →' : 'PRÓXIMAMENTE'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>⚽</span>
          <span style={{ ...DISPLAY, fontSize: 20, fontWeight: 900, color: '#E8003D' }}>TAOFANS</span>
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center' }}>
          © 2026 TaoFans · Desarrollado por <strong>Sebastian Mamani</strong>
        </p>
        <div style={{ display: 'flex', gap: 16 }}>
          <a href={`https://wa.me/${process.env.NEXT_PUBLIC_VENDEDOR_WHATSAPP ?? ''}`} style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>WhatsApp</a>
          <a href={`mailto:${process.env.NEXT_PUBLIC_VENDEDOR_EMAIL ?? ''}`} style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>Email</a>
        </div>
      </footer>
    </div>
  )
}
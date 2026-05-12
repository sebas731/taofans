'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Campana {
  id: string
  nombre: string
  sub: string
  total: number
  activa: boolean
  accentColor: string
  emoji: string
  tag: string
  tagStyle: React.CSSProperties
}

const DISPLAY = { fontFamily: "'Barlow Condensed', sans-serif" }

export default function CampanaCard({ c }: { c: Campana }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#111',
        border: `1px solid ${hovered ? c.accentColor : '#1E1E1E'}`,
        borderRadius: 16,
        overflow: 'hidden',
        opacity: c.activa ? 1 : 0.5,
        transform: hovered ? 'translateY(-4px)' : 'none',
        transition: 'transform 0.2s ease, border-color 0.2s ease',
      }}
    >
      <div style={{ height: 4, background: c.accentColor }} />
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <span style={{ ...c.tagStyle, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', padding: '4px 10px', borderRadius: 4 }}>
            {c.tag}
          </span>
          <span style={{ fontSize: 28 }}>{c.emoji}</span>
        </div>

        <h3 style={{ ...DISPLAY, fontSize: 34, fontWeight: 900, color: '#fff', textTransform: 'uppercase' as const, lineHeight: 1, marginBottom: 4 }}>
          {c.nombre}
        </h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: '1.5rem' }}>{c.sub}</p>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>
            <span>Tu progreso</span>
            <span>0 / {c.total} figuritas</span>
          </div>
          <div style={{ height: 3, background: '#1E1E1E', borderRadius: 99 }}>
            <div style={{ height: '100%', width: 0, background: c.accentColor, borderRadius: 99 }} />
          </div>
        </div>

        {c.activa ? (
          <Link href="/auth/registro" className="btn-primary" style={{
            width: '100%', textAlign: 'center', display: 'block',
            background: c.accentColor,
            color: ['#00C2E0', '#FFE000'].includes(c.accentColor) ? '#080808' : '#fff',
          }}>
            EMPEZAR →
          </Link>
        ) : (
          <button disabled className="btn-ghost" style={{ width: '100%', opacity: 0.4, cursor: 'not-allowed' }}>
            PRÓXIMAMENTE
          </button>
        )}
      </div>
    </div>
  )
}

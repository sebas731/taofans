'use client'

import { useState, useEffect } from 'react'
import FiguitasSelector from '@/components/FiguitasSelector'
import { createClient } from '@/lib/supabase/client'

const DISPLAY = { fontFamily: "'Barlow Condensed', sans-serif" }

const CAMPANAS = [
  { id: 'mundial-2026', nombre: 'Mundial 2026', sub: 'Panini · FIFA Official', total: 980, activa: true, color: '#E8003D', emoji: '🏆', tag: 'MÁS POPULAR' },
  { id: 'mundial-2026', nombre: 'Album mundial 3Reyes', sub: '3REYES', total: 588, activa: false, color: '#00C2E0', emoji: '⭐', tag: 'PRÓXIMAMENTE' },
  { id: 'liga-peru-2025', nombre: 'Liga 1 Perú 2025', sub: 'Álbum oficial peruano', total: 320, activa: false, color: '#6B21C8', emoji: '🇵🇪', tag: 'PRÓXIMAMENTE' },
]

export default function DashboardPage() {
  const [campanaActiva, setCampanaActiva] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [initialTengo, setInitialTengo] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  async function seleccionarCampana(id: string) {
    setLoading(true)
    const supabase = createClient()

    // Obtener usuario real
    const { data: { user } } = await supabase.auth.getUser()
    const uid = user?.id ?? 'demo-user'
    setUserId(uid)

    // Cargar figuritas que ya tiene
    if (user) {
      const { data } = await supabase
        .from('figuritas_tengo')
        .select('codigo')
        .eq('user_id', uid)
      setInitialTengo(data?.map((f: { codigo: string }) => f.codigo) ?? [])
    }

    setCampanaActiva(id)
    setLoading(false)
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, flexDirection: 'column', gap: 12 }}>
        <div style={{ ...DISPLAY, fontSize: 32, color: 'var(--text-primary)' }}>Cargando...</div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Obteniendo tu colección</p>
      </div>
    )
  }

  if (campanaActiva) {
    const campana = CAMPANAS.find((c) => c.id === campanaActiva)
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '2rem' }}>
          <button
            onClick={() => setCampanaActiva(null)}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600 }}>
            ← Volver
          </button>
          <span style={{ fontSize: 36 }}>{campana?.emoji}</span>
          <div>
            <h1 style={{ ...DISPLAY, fontSize: 36, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase' as const, lineHeight: 1 }}>
              {campana?.nombre}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>
              Marca las figuritas que ya tienes — las demás se incluirán en tu pedido
            </p>
          </div>
          <div style={{ marginLeft: 'auto', padding: '4px 12px', borderRadius: 6, background: campana?.color, color: ['#00C2E0', '#FFE000'].includes(campana?.color ?? '') ? '#080808' : '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em' }}>
            {campana?.tag}
          </div>
        </div>

        <FiguitasSelector initialTengo={initialTengo} userId={userId ?? 'demo-user'} />

        <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>⚽</span>
            <span style={{ ...DISPLAY, fontSize: 20, fontWeight: 900, color: '#E8003D' }}>TAOFANS</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
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

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <p style={{ ...DISPLAY, fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', color: '#E8003D', marginBottom: 6 }}>BIENVENIDO</p>
        <h1 style={{ ...DISPLAY, fontSize: 56, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase' as const, lineHeight: 0.95 }}>
          ELIGE TU<br />ÁLBUM
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 8, fontSize: 15 }}>
          Selecciona la campaña para registrar tu colección y pedir las que te faltan.
        </p>
      </div>
      {/* Carrusel */}
    <div style={{ position: 'relative', marginBottom: '2.5rem', borderRadius: 16, overflow: 'hidden', height: 280, background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <div id="carrusel" style={{ display: 'flex', height: '100%', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollBehavior: 'smooth', gap: 0 }}>
        {[
          { src: '/carrusel/foto1.png', alt: 'Álbum Mundial 2026' },
          { src: '/carrusel/foto2.png', alt: 'Figuritas Panini' },
          { src: '/carrusel/foto3.png', alt: 'Colección Mundial' },
          
        ].map((img, i) => (
          <div key={i} style={{ minWidth: '100%', height: '100%', scrollSnapAlign: 'start', flexShrink: 0, position: 'relative', background: '#1E1E1E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={img.src}
              alt={img.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                // Si no existe la imagen muestra placeholder
                (e.currentTarget as HTMLImageElement).style.display = 'none'
              }}
            />
            {/* Overlay con texto */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 900, color: '#fff', textTransform: 'uppercase' }}>{img.alt}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botones navegación */}
      <button
        onClick={() => {
          const el = document.getElementById('carrusel')
          if (el) el.scrollBy({ left: -el.offsetWidth, behavior: 'smooth' })
        }}
        style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', color: '#fff', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        ‹
      </button>
      <button
        onClick={() => {
          const el = document.getElementById('carrusel')
          if (el) el.scrollBy({ left: el.offsetWidth, behavior: 'smooth' })
        }}
        style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', color: '#fff', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        ›
      </button>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
        {[0,1,2,3,4].map((i) => (
          <button key={i}
            onClick={() => {
              const el = document.getElementById('carrusel')
              if (el) el.scrollTo({ left: el.offsetWidth * i, behavior: 'smooth' })
            }}
            style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', padding: 0 }} />
        ))}
      </div>
    </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {CAMPANAS.map((c) => (
          <div
            key={c.id}
            onClick={() => c.activa && seleccionarCampana(c.id)}
            onMouseEnter={e => { if (c.activa) { (e.currentTarget as HTMLElement).style.borderColor = c.color; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)' }}}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = 'none' }}
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 16, overflow: 'hidden',
              opacity: c.activa ? 1 : 0.5,
              cursor: c.activa ? 'pointer' : 'not-allowed',
              transition: 'transform 0.2s, border-color 0.2s',
            }}>
            <div style={{ height: 4, background: c.color }} />
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', padding: '4px 10px', borderRadius: 4,background: c.activa ? c.color : '#666666', color: c.activa && ['#00C2E0', '#FFE000'].includes(c.color) ? '#080808' : '#fff' }}>
                  {c.tag}
                </span>
                <span style={{ fontSize: 28 }}>{c.emoji}</span>
              </div>
              <h3 style={{ ...DISPLAY, fontSize: 30, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase' as const, lineHeight: 1, marginBottom: 4 }}>
                {c.nombre}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>{c.sub}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>
                <span>Total figuritas</span>
                <span>{c.total}</span>
              </div>
              <div style={{ height: 3, background: 'var(--border)', borderRadius: 99, marginBottom: '1.25rem' }} />
              <div style={{ padding: '10px', borderRadius: 8, background: c.activa ? c.color : 'var(--border)', color: ['#00C2E0', '#FFE000'].includes(c.color) || !c.activa ? '#080808' : '#fff', textAlign: 'center', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', ...DISPLAY }}>
                {c.activa ? 'VER ÁLBUM →' : 'PRÓXIMAMENTE'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>⚽</span>
          <span style={{ ...DISPLAY, fontSize: 20, fontWeight: 900, color: '#E8003D' }}>TAOFANS</span>
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
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
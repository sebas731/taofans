import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import CampanaCard from '@/components/CampanaCard'

const CAMPANAS = [
  {
    id: 'mundial-2026',
    nombre: 'Mundial 2026',
    sub: 'Panini · FIFA Official',
    total: 670,
    activa: true,
    accentColor: '#E8003D',
    emoji: '🏆',
    tag: 'MÁS POPULAR',
    tagStyle: { background: '#E8003D', color: '#fff' },
  },
  {
    id: 'champions-2025',
    nombre: 'Champions 24/25',
    sub: 'Panini · UEFA Official',
    total: 588,
    activa: true,
    accentColor: '#00C2E0',
    emoji: '⭐',
    tag: 'DISPONIBLE',
    tagStyle: { background: '#00C2E0', color: '#080808' },
  },
  {
    id: 'liga-peru-2025',
    nombre: 'Liga 1 Perú 2025',
    sub: 'Álbum oficial peruano',
    total: 320,
    activa: false,
    accentColor: '#6B21C8',
    emoji: '🇵🇪',
    tag: 'PRÓXIMAMENTE',
    tagStyle: { background: '#1E1E1E', color: '#fff' },
  },
]

const DISPLAY = { fontFamily: "'Barlow Condensed', sans-serif" }

export default async function HomePage() {
  const DEMO_MODE = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')

  if (!DEMO_MODE) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) redirect('/dashboard')
  }

  return (
    <div style={{ background: '#080808', minHeight: '100vh', color: '#fff' }}>

      {/* ── NAV ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid #1E1E1E', background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 24 }}>⚽</span>
            <span style={{ ...DISPLAY, fontSize: 28, fontWeight: 900, color: '#FFE000', letterSpacing: '0.08em' }}>TAOFANS</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/auth/login" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}>
              Iniciar sesión
            </Link>
            <Link href="/auth/registro" className="btn-primary" style={{ fontSize: 13, padding: '8px 20px' }}>
              EMPEZAR GRATIS
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '5rem', paddingBottom: '6rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>

        {/* Big decorative "26" background */}
        <div style={{ position: 'absolute', right: -60, top: -40, ...DISPLAY, fontSize: 'clamp(300px, 40vw, 500px)', fontWeight: 900, color: 'rgba(255,255,255,0.025)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
          26
        </div>

        {/* Color accent bars top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', height: 4 }}>
          {['#E8003D','#6B21C8','#00C2E0','#FFE000','#00A859','#FF5C00'].map((c, i) => (
            <div key={i} style={{ flex: 1, background: c }} />
          ))}
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '3rem' }}>

          {/* LEFT */}
          <div style={{ flex: 1 }}>

          {/* Badge */}

          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E8003D', borderRadius: 4, padding: '6px 14px', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em' }}>🔥 CAMPAÑA ACTIVA</span>
            <span style={{ fontSize: 12, fontWeight: 400, opacity: 0.85 }}>Mundial 2026 Panini</span>
          </div>

          {/* Main headline */}
          <h1 style={{ ...DISPLAY, fontSize: 'clamp(72px, 12vw, 160px)', fontWeight: 900, lineHeight: 0.9, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
            <span style={{ display: 'block', color: '#fff' }}>COMPLETÁ</span>
            <span style={{ display: 'block', color: '#FFE000' }}>TU ÁLBUM</span>
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.2)' }}>SIN VUELTAS.</span>
          </h1>

          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', maxWidth: 520, lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Marcá las figuritas que te faltan, elegí tu álbum y coordiná el pedido directo por WhatsApp. Rápido, fácil y con stock real.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/auth/registro" className="btn-primary" style={{ fontSize: 16 }}>
              ✨ EMPEZAR GRATIS
            </Link>
            <a href="#campanas" className="btn-ghost" style={{ fontSize: 15 }}>
              Ver álbumes ↓
            </a>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '3rem', marginTop: '4rem', flexWrap: 'wrap' }}>
            {[
              { num: '+500', label: 'Coleccionistas' },
              { num: '+10', label: 'Álbumes distintos' },
              { num: '100%', label: 'Figuritas originales' },
              { num: '24h', label: 'Respuesta máxima' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ ...DISPLAY, fontSize: 40, fontWeight: 900, color: '#FFE000', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>{/* cierre LEFT */}

          {/* Imagen álbum */}
          <div style={{ flexShrink: 0, width: 320, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start', marginTop: '2rem' }}>
            
            {/* Círculo grande fondo */}
            <div style={{ position: 'absolute', width: 340, height: 340, borderRadius: '50%', border: '2px solid rgba(255,224,0,0.15)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            
            {/* Círculo mediano */}
            <div style={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', border: '2px solid rgba(232,0,61,0.2)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />

            {/* Cuadrado con bordes redondeados rotado */}
            <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: 40, border: '1px solid rgba(0,194,224,0.2)', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(15deg)' }} />

            {/* Imagen */}
            <img
              src="/album.png"
              alt="Álbum Mundial 2026 Panini"
              style={{ width: '85%', borderRadius: 16, transform: 'rotate(-3deg)', position: 'relative', zIndex: 1 }}
            />
          </div>

        </div>
      </section>

      {/* ── MARQUEE TICKER ── */}

      {/* ── MARQUEE TICKER ── */}
      <div style={{ background: '#FFE000', overflow: 'hidden', padding: '10px 0', borderTop: '1px solid #1E1E1E' }}>
        <div className="marquee-inner" style={{ color: '#080808', fontWeight: 700, fontSize: 13, letterSpacing: '0.12em', fontFamily: "'Barlow Condensed', sans-serif" }}>
          {Array(6).fill('⚽ MUNDIAL 2026 · PANINI OFICIAL · FIGURITAS GARANTIZADAS · PEDÍ POR WHATSAPP · COMPLETÁ TU ÁLBUM · ').map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── CAMPAÑAS ── */}
      <section id="campanas" style={{ padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div style={{ marginBottom: '3rem' }}>
            <div style={{ ...DISPLAY, fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', color: '#FFE000', marginBottom: 8 }}>CAMPAÑAS ACTIVAS</div>
            <h2 style={{ ...DISPLAY, fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.95, color: '#fff' }}>
              ELEGÍ TU<br />ÁLBUM
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {CAMPANAS.map((c) => (
              <CampanaCard key={c.id} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section style={{ padding: '6rem 1.5rem', borderTop: '1px solid #1E1E1E' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ ...DISPLAY, fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', color: '#00C2E0', marginBottom: 8 }}>SERVICIOS</div>
            <h2 style={{ ...DISPLAY, fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.95, color: '#fff' }}>
              ¿CÓMO<br />FUNCIONA?
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, background: '#1E1E1E', borderRadius: 16, overflow: 'hidden' }}>
            {[
              { num: '01', icon: '📋', color: '#E8003D', titulo: 'Registrá tus faltantes', desc: 'Creá tu cuenta gratis, elegí el álbum y marcá una por una las figuritas que todavía no tenés. Tu lista se guarda automáticamente.' },
              { num: '02', icon: '💬', color: '#FFE000', titulo: 'Enviá el pedido por WhatsApp', desc: 'Con un clic generamos el mensaje con todas tus figuritas y lo mandamos directo a nuestro WhatsApp para coordinar la entrega.' },
              { num: '03', icon: '🏆', color: '#00C2E0', titulo: 'Completá tu álbum', desc: 'Coordinamos la entrega, te enviamos lo que necesitás y actualizás tu progreso. Así de simple y sin vueltas.' },
            ].map((s) => (
              <div key={s.num} style={{ background: '#111', padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ ...DISPLAY, fontSize: 100, fontWeight: 900, color: 'rgba(255,255,255,0.04)', position: 'absolute', top: -10, right: 16, lineHeight: 1 }}>{s.num}</div>
                <div style={{ width: 3, height: 40, background: s.color, borderRadius: 99, marginBottom: '1.5rem' }} />
                <div style={{ fontSize: 36, marginBottom: '1rem' }}>{s.icon}</div>
                <h3 style={{ ...DISPLAY, fontSize: 26, fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: '0.75rem', lineHeight: 1.1 }}>{s.titulo}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE NOSOTROS ── */}
      <section style={{ padding: '6rem 1.5rem', borderTop: '1px solid #1E1E1E' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <div style={{ ...DISPLAY, fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', color: '#6B21C8', marginBottom: 8 }}>QUIÉNES SOMOS</div>
            <h2 style={{ ...DISPLAY, fontSize: 'clamp(48px, 6vw, 72px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.95, color: '#fff', marginBottom: '1.5rem' }}>
              SOMOS<br /><span style={{ color: '#FFE000' }}>TAOFANS</span>
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: '1rem' }}>
              Somos coleccionistas apasionados que decidimos hacer más fácil el proceso de completar álbumes. Entendemos la emoción de pegar la última figurita que faltaba.
            </p>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              Contamos con stock permanente de los álbumes más populares y atención personalizada. Conseguís exactamente lo que necesitás, cuando lo necesitás.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { num: '+500', label: 'Clientes' },
                { num: '+10', label: 'Álbumes' },
                { num: '100%', label: 'Originales' },
              ].map((s) => (
                <div key={s.label} style={{ background: '#111', border: '1px solid #1E1E1E', borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
                  <div style={{ ...DISPLAY, fontSize: 32, fontWeight: 900, color: '#FFE000' }}>{s.num}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { color: '#E8003D', icon: '✅', titulo: 'Figuritas 100% originales', desc: 'Solo trabajamos con productos Panini y editoriales oficiales.' },
              { color: '#FFE000', icon: '⚡', titulo: 'Respuesta rápida', desc: 'Respondemos pedidos por WhatsApp en menos de 24 horas.' },
              { color: '#00C2E0', icon: '📦', titulo: 'Envíos a todo el país', desc: 'Despachamos a cualquier ciudad. También entrega en mano.' },
              { color: '#6B21C8', icon: '🔒', titulo: 'Plataforma segura', desc: 'Tu información y pedidos están protegidos en todo momento.' },
            ].map((item) => (
              <div key={item.titulo} style={{ background: '#111', border: '1px solid #1E1E1E', borderLeft: `3px solid ${item.color}`, borderRadius: 12, padding: '1rem 1.25rem', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14, color: '#fff', marginBottom: 2 }}>{item.titulo}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ padding: '6rem 1.5rem', borderTop: '1px solid #1E1E1E', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {/* Color bar */}
          <div style={{ display: 'flex', height: 6, borderRadius: 99, overflow: 'hidden', marginBottom: '3rem', maxWidth: 200, margin: '0 auto 3rem' }}>
            {['#E8003D','#6B21C8','#00C2E0','#FFE000'].map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
          </div>
          <h2 style={{ ...DISPLAY, fontSize: 'clamp(56px, 10vw, 120px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.9, marginBottom: '1.5rem' }}>
            <span style={{ color: '#fff' }}>¿LISTO PARA</span><br />
            <span style={{ color: '#FFE000' }}>COMPLETARLO?</span>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', marginBottom: '2.5rem' }}>
            Creá tu cuenta gratis, marcá tus faltantes y coordiná el pedido hoy mismo.
          </p>
          <Link href="/auth/registro" className="btn-primary" style={{ fontSize: 18, padding: '1rem 3rem' }}>
            ✨ EMPEZAR GRATIS AHORA
          </Link>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', marginTop: '1rem' }}>Sin tarjeta de crédito · Gratis para siempre</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid #1E1E1E', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>⚽</span>
            <span style={{ ...DISPLAY, fontSize: 22, fontWeight: 900, color: '#FFE000', letterSpacing: '0.08em' }}>TAOFANS</span>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>© 2026 TaoFans. Hecho con pasión por el fútbol.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_VENDEDOR_WHATSAPP ?? ''}`} style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, textDecoration: 'none' }}>WhatsApp</a>
            <a href={`mailto:${process.env.NEXT_PUBLIC_VENDEDOR_EMAIL ?? ''}`} style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, textDecoration: 'none' }}>Email</a>
          </div>
        </div>
      </footer>

    </div>
  )
}

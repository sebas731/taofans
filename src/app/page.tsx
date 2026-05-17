import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import CampanaCard from '@/components/CampanaCard'

const CAMPANAS = [
  {
    id: 'mundial-2026',
    nombre: 'Mundial 2026',
    sub: 'Panini · FIFA Official',
    total: 980,
    activa: true,
    accentColor: '#E8003D',
    emoji: '🏆',
    tag: 'MÁS POPULAR',
    tagStyle: { background: '#000000', color: '#fff' },
  },
  {
    id: 'champions-2025',
    nombre: 'Album Mundial 3Reyes',
    sub: '3REYES',
    total: 588,
    activa: false,
    accentColor: '#6B21C8',
    emoji: '⭐',
    tag: 'PRÓXIMAMENTE',
    tagStyle: { background: '#e5e7eb', color: '#1f2937' },
  },
  {
    id: 'liga-peru-2025',
    nombre: 'Liga 1 Perú 2025',
    sub: 'Álbum oficial peruano',
    total: 320,
    activa: false,
    accentColor: '#00C2E0',
    emoji: '🇵🇪',
    tag: 'PRÓXIMAMENTE',
    tagStyle: { background: '#e5e7eb', color: '#1f2937' },
  },
]

const DISPLAY = { fontFamily: "'Barlow Condensed', sans-serif" }

const BarraMundial = ({ height = 8 }: { height?: number }) => (
  <div style={{ display: 'flex', height, width: '100%', overflow: 'hidden' }}>
    <div style={{ flex: 1, background: '#E8003D' }} />
    <div style={{ flex: 1, background: '#6B21C8' }} />
    <div style={{ flex: 1, background: '#00C2E0' }} />
    <div style={{ flex: 1, background: '#FFD700' }} />
  </div>
)

export default async function HomePage() {
  const DEMO_MODE = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')

  if (!DEMO_MODE) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) redirect('/dashboard')
  }

  return (
    <div style={{ 
      background: '#ffffff', 
      minHeight: '100vh', 
      color: '#000000', 
      overflowX: 'hidden',
      position: 'relative'
    }}>
      
      {/* ── FONDO DE FORMAS GEOMÉTRICAS VIBRANTES ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div className="geo-float-1" style={{ position: 'absolute', top: '-5rem', right: '-10rem', width: '800px', height: '1200px', background: '#6B21C8', clipPath: 'polygon(40% 0%, 100% 0%, 60% 100%, 0% 100%)', opacity: 0.05 }} />
        <div className="geo-float-2" style={{ position: 'absolute', top: '20rem', left: '-15rem', width: '700px', height: '900px', background: '#E8003D', clipPath: 'polygon(0% 20%, 100% 0%, 80% 100%, 0% 80%)', opacity: 0.04 }} />
        <div className="geo-float-3" style={{ position: 'absolute', top: '50rem', right: '-5rem', width: '600px', height: '600px', background: '#FFD700', borderRadius: '50%', opacity: 0.06 }} />
        <div className="geo-float-4" style={{ position: 'absolute', top: '90rem', left: '-5rem', width: '900px', height: '1000px', background: '#00C2E0', clipPath: 'polygon(20% 0%, 100% 30%, 70% 100%, 0% 80%)', opacity: 0.04 }} />
      </div>

      <BarraMundial height={10} />

      {/* ── NAV ASIMÉTRICO ── */}
      <nav style={{ background: '#ffffff', borderBottom: '4px solid #000000', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', height: 74, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ ...DISPLAY, fontSize: 36, fontWeight: 900, color: '#000000', letterSpacing: '0.02em', transform: 'skewX(-10deg)', display: 'inline-block' }}>
              TAOFANS
            </span>
          </Link>

          <div style={{ display: 'flex', gap: 4, position: 'absolute', left: '50%', transform: 'translateX(-50%) skewX(-12deg)' }} className="desktop-only">
            {[
              { href: '#campanas', label: 'Álbumes' },
              { href: '#servicios', label: 'Cómo funciona' },
              { href: '#nosotros', label: 'Nosotros' },
            ].map((item) => (
              <a key={item.href} href={item.href}
                style={{ color: '#000000', fontSize: 13, textDecoration: 'none', fontWeight: 900, padding: '10px 20px', letterSpacing: '0.05em', textTransform: 'uppercase', border: '2px solid transparent', transition: 'all 0.2s' }}>
                {item.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/auth/login" style={{ color: '#000000', fontSize: 13, textDecoration: 'none', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Iniciar sesión
            </Link>
            <Link href="/auth/registro" style={{ fontSize: 13, padding: '12px 26px', backgroundColor: '#E8003D', color: '#fff', border: '3px solid #000000', fontWeight: 900, borderRadius: 0, textDecoration: 'none', letterSpacing: '0.06em', boxShadow: '4px 4px 0px #000000', transform: 'skewX(-10deg)' }}>
              <span style={{ display: 'inline-block', transform: 'skewX(10deg)' }}>EMPEZAR GRATIS</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', paddingTop: '8rem', paddingBottom: '9rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: '5rem', flexWrap: 'wrap' }}>
          
          <div style={{ flex: 1, minWidth: 320 }}>
            <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', background: '#000000', color: '#ffffff', padding: '10px 20px', marginBottom: '2.5rem', fontWeight: 900, fontSize: 12, letterSpacing: '0.15em', transform: 'rotate(-2deg) skewX(-10deg)', boxShadow: '4px 4px 0px #FFD700' }}>
              ⚡ EN STOCK · MUNDIAL 2026 ACTIVO
            </div>

            <h1 className="hero-h1" style={{ ...DISPLAY, fontSize: 'clamp(60px, 9vw, 115px)', fontWeight: 900, lineHeight: 0.78, marginBottom: '2.5rem', textTransform: 'uppercase', letterSpacing: '-0.04em', color: '#000000' }}>
              <span style={{ display: 'block', transform: 'skewX(-6deg)' }}>COMPLETA TU</span>
              <span style={{ display: 'block', color: '#6B21C8', transform: 'skewX(-6deg) rotate(-1deg)', transformOrigin: 'left' }}>COLECCIÓN</span>
              <span style={{ display: 'block', color: '#00C2E0', transform: 'skewX(-6deg)' }}>AL INSTANTE.</span>
            </h1>

            <p style={{ fontSize: 18, color: '#1F2937', maxWidth: 500, lineHeight: 1.6, marginBottom: '3rem', fontWeight: 600 }}>
              Olvídate de las repetidas. Filtra tus cartas y figuritas faltantes digitalmente, arma tu lista en segundos y recíbelas directo por WhatsApp.
            </p>

            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <Link href="/auth/registro" style={{ fontSize: 16, padding: '18px 42px', backgroundColor: '#000000', color: '#fff', fontWeight: 900, borderRadius: 0, textDecoration: 'none', letterSpacing: '0.05em', border: '3px solid #000000', boxShadow: '6px 6px 0px #E8003D', transform: 'skewX(-10deg)' }}>
                <span style={{ display: 'inline-block', transform: 'skewX(10deg)' }}>🚀 REGÍSTRATE GRATIS</span>
              </Link>
              <a href="#campanas" style={{ ...DISPLAY, fontSize: 16, padding: '18px 32px', color: '#000000', fontWeight: 900, textDecoration: 'none', border: '3px solid #000000', letterSpacing: '0.05em', boxShadow: '4px 4px 0px #00C2E0', transform: 'skewX(-10deg)' }}>
                <span style={{ display: 'inline-block', transform: 'skewX(10deg)' }}>EXPLORAR ↓</span>
              </a>
            </div>

            <div style={{ display: 'flex', gap: '2rem', marginTop: '5.5rem', flexWrap: 'wrap' }}>
              {[
                { num: '+500', label: 'Coleccionistas', bg: '#6B21C8' },
                { num: '100%', label: 'Originales', bg: '#00C2E0' },
                { num: '0', label: 'Repetidas', bg: '#E8003D' },
              ].map((s) => (
                <div key={s.label} style={{ borderLeft: `6px solid ${s.bg}`, paddingLeft: '14px', transform: 'skewX(-10deg)' }}>
                  <div style={{ ...DISPLAY, fontSize: 44, fontWeight: 900, color: '#000000', lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: 12, color: '#4B5563', marginTop: 4, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="album-frame" style={{ flexShrink: 0, width: 380, margin: '0 auto', position: 'relative', transform: 'rotate(2deg)' }}>
            <div style={{ position: 'absolute', top: -30, left: -20, width: '110%', height: '110%', backgroundColor: '#FFD700', clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)', zIndex: -2 }} />
            <div style={{ position: 'absolute', top: -15, left: -35, width: '105%', height: '105%', backgroundColor: '#6B21C8', clipPath: 'polygon(0% 10%, 90% 0%, 100% 90%, 10% 100%)', zIndex: -1 }} />
            
            <div style={{ background: '#ffffff', border: '4px solid #000000', padding: '24px', position: 'relative', boxShadow: '12px 12px 0px #000000', transform: 'skewY(-4deg)' }}>
              <div style={{ position: 'absolute', top: -4, left: 40, width: 120, height: 8 }}>
                <BarraMundial height={8} />
              </div>
              <img src="/album.png" alt="Álbum Colección Oficial" style={{ width: '100%', display: 'block', border: '3px solid #000000', transform: 'skewY(4deg)' }} />
            </div>
          </div>

        </div>
      </section>

      <BarraMundial height={16} />

      {/* ── SECCIÓN ÁLBUMES & COLECCIONES ── */}
      <section id="campanas" style={{ padding: '8rem 1.5rem', position: 'relative', zIndex: 1, backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          
          <div style={{ marginBottom: '5rem', borderBottom: '4px solid #000000', paddingBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <div style={{ transform: 'skewX(-8deg)' }}>
              <div style={{ ...DISPLAY, fontSize: 15, fontWeight: 900, letterSpacing: '0.25em', color: '#E8003D', marginBottom: 8 }}>PANEL DE CONTROL</div>
              <h2 style={{ ...DISPLAY, fontSize: 'clamp(48px, 8vw, 85px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.8, color: '#000000' }}>
                ÁLBUMES Y <span style={{ color: '#6B21C8' }}>COLECCIONES</span>
              </h2>
            </div>
            <div style={{ ...DISPLAY, fontSize: 22, fontWeight: 900, backgroundColor: '#FFD700', color: '#000000', border: '3px solid #000000', padding: '10px 24px', transform: 'rotate(-2deg) skewX(-10deg)', boxShadow: '4px 4px 0px #000000' }}>
              FASE DE GRUPOS 2026
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: 36 }}>
            {CAMPANAS.map((c, idx) => (
              <div className="campana-card" key={c.id} style={{ 
                background: '#ffffff', 
                border: '4px solid #000000', 
                boxShadow: `8px 8px 0px ${idx === 0 ? '#E8003D' : idx === 1 ? '#6B21C8' : '#00C2E0'}`, 
                padding: '1.5rem', 
                borderRadius: 0, 
                position: 'relative',
                transform: idx % 2 === 0 ? 'rotate(0.5deg)' : 'rotate(-0.5deg)'
              }}>
                <CampanaCard c={c} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN PROCESO (CORTES POLIGONALES PASO A PASO) ── CORREGIDA */}
      <section id="servicios" style={{ 
        padding: '9rem 1.5rem', 
        backgroundColor: '#ffffff', 
        borderTop: '4px solid #000000', 
        borderBottom: '4px solid #000000', 
        position: 'relative', 
        zIndex: 1 
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          
          <div style={{ marginBottom: '6rem', textAlign: 'left', maxWidth: 750, transform: 'skewX(-6deg)' }}>
            <div style={{ ...DISPLAY, fontSize: 15, fontWeight: 900, letterSpacing: '0.2em', color: '#6B21C8', marginBottom: 10 }}>
              SISTEMA INTELIGENTE
            </div>
            <h2 style={{ ...DISPLAY, fontSize: 'clamp(42px, 6.5vw, 76px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.85, color: '#000000' }}>
              PROCESO DE RELLENO EN <span style={{ color: '#E8003D' }}>3 PASOS</span>
            </h2>
            <p style={{ fontSize: 17, color: '#374151', marginTop: 20, fontWeight: 600, transform: 'skewX(6deg)', transformOrigin: 'left' }}>
              Monitorea tus colecciones desde nuestra plataforma digital y recíbelas de forma rápida y empaquetada.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48 }}>
            {[
              { 
                num: '26', 
                step: '01',
                imgSrc: '/selecciona.PNG',
                titulo: 'Checklist Digital', 
                desc: 'Registra tus faltantes seleccionando los casilleros de tu álbum. La plataforma calcula tu porcentaje exacto de completado automáticamente.',
                color: '#E8003D',
                clip: 'polygon(0% 0%, 100% 0%, 88% 100%, 0% 100%)'
              },
              { 
                num: '26', 
                step: '02',
                imgSrc: '/pide.jfif',
                titulo: 'Orden Relámpago', 
                desc: 'El algoritmo agrupa y organiza tus códigos de menor a mayor, enviando un formato limpio e impecable directo a nuestro canal de WhatsApp.',
                color: '#00C2E0',
                clip: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)'
              },
              { 
                num: '26', 
                step: '03',
                imgSrc: '/delivery.png',
                titulo: 'Despacho Foil Protegido', 
                desc: 'Separamos tu lote de figuritas directo de nuestro inventario y coordinamos envíos locales o nacionales con empaques rígidos antiflexión.',
                color: '#6B21C8',
                clip: 'polygon(0% 0%, 100% 0%, 100% 85%, 0% 100%)'
              },
            ].map((s) => (
              <div key={s.step} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
                
                {/* Contenedor de Imagen de Alto Impacto */}
                <div style={{ 
                  width: '100%', 
                  height: 320, 
                  backgroundColor: '#ffffff', 
                  border: '4px solid #000000', 
                  clipPath: s.clip,
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: `8px 8px 0px ${s.color}`
                }}>
                  {/* Número "26" Masivo de Fondo */}
                  <div style={{ 
                    ...DISPLAY, 
                    position: 'absolute', 
                    bottom: '-40px', 
                    right: '-10px', 
                    fontSize: 260, 
                    fontWeight: 900, 
                    color: s.color, 
                    opacity: 0.22, 
                    lineHeight: 1,
                    userSelect: 'none',
                    transform: 'skewX(-10deg)',
                    zIndex: 1
                  }}>{s.num}</div>

                  {/* Tag de Paso */}
                  <div style={{ ...DISPLAY, position: 'absolute', top: 20, left: 20, background: '#000000', color: '#ffffff', padding: '8px 18px', fontSize: 14, fontWeight: 900, letterSpacing: '0.08em', transform: 'skewX(-12deg)', zIndex: 10 }}>
                    PASO {s.step}
                  </div>

                  <img src={s.imgSrc} alt={s.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>

                {/* Textos de descripción robustos y bien espaciados */}
                <div style={{ paddingRight: '0.5rem' }}>
                  <h3 style={{ ...DISPLAY, fontSize: 32, fontWeight: 900, color: '#000000', textTransform: 'uppercase', marginBottom: '0.8rem', letterSpacing: '-0.02em', transform: 'skewX(-6deg)', transformOrigin: 'left' }}>
                    {s.titulo}
                  </h3>
                  <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.6, fontWeight: 600 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECCIÓN NOSOTROS ── */}
      <section id="nosotros" style={{ padding: '8rem 1.5rem', background: '#ffffff', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '6rem', alignItems: 'center' }}>
          
          <div>
            <div className="stat-box feature-item" style={{ ...DISPLAY, fontSize: 15, fontWeight: 900, letterSpacing: '0.2em', color: '#00C2E0', marginBottom: 10, transform: 'skewX(-8deg)' }}>
              NUESTRA FILOSOFÍA
            </div>
            <h2 style={{ ...DISPLAY, fontSize: 'clamp(42px, 6vw, 76px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.85, color: '#000000', marginBottom: '2.5rem', transform: 'skewX(-8deg)' }}>
              TU HUB DE <span style={{ color: '#FFD700', WebkitTextStroke: '2px #000', textShadow: '4px 4px 0px #000' }}>COLECCIONES</span>
            </h2>
            <p style={{ fontSize: 16, color: '#1F2937', lineHeight: 1.8, marginBottom: '1.5rem', fontWeight: 600 }}>
              Somos fanáticos del coleccionismo organizado. Transformamos el intercambio caótico y los sobres llenos de repetidas en un proceso moderno, transparente y 100% digital.
            </p>
            <p style={{ fontSize: 16, color: '#1F2937', lineHeight: 1.8, marginBottom: '3.5rem', fontWeight: 600 }}>
              Mantenemos bases de datos actualizadas con las licencias oficiales más codiciadas, asegurando un centro de distribución óptimo para coleccionistas exigentes en todo el país.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { num: '+500', label: 'Usuarios', border: '#E8003D', rot: '-2deg' },
                { num: '+10', label: 'Campañas', border: '#6B21C8', rot: '3deg' },
                { num: '100%', label: 'Garantía', border: '#00C2E0', rot: '-1deg' },
              ].map((s) => (
                <div className="stat-item" key={s.label} style={{ backgroundColor: '#ffffff', border: '3px solid #000000', padding: '1.75rem 1rem', textAlign: 'center', boxShadow: `5px 5px 0px #000000`, transform: `rotate(${s.rot}) skewX(-5deg)` }}>
                  <div style={{ ...DISPLAY, fontSize: 36, fontWeight: 900, color: '#000000', lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: 11, color: s.border, marginTop: 6, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <div style={{ 
              width: '100%', 
              height: 300, 
              backgroundColor: '#ffffff', 
              border: '4px solid #000000', 
              clipPath: 'polygon(0% 15%, 100% 0%, 100% 85%, 0% 100%)', 
              boxShadow: '10px 10px 0px #000000',
              position: 'relative',
              transform: 'rotate(-1deg)'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))', zIndex: 1 }} />
              <img src="/img_panini.avif" alt="Álbumes y cartas coleccionables" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { titulo: 'Licencias Oficiales', desc: 'Suministramos exclusivamente material auténtico Panini, 3Reyes y firmas oficiales del rubro.', dot: '#E8003D' },
                { titulo: 'Sincronización Inmediata', desc: 'Automatizamos las listas para que no pierdas tiempo transcribiendo códigos manualmente.', dot: '#6B21C8' },
                { titulo: 'Protección Física de Envíos', desc: 'Cada cromo o figurita se agrupa de forma milimétrica para evitar dobleces o desgastes en las esquinas.', dot: '#00C2E0' },
              ].map((item) => (
                <div key={item.titulo} style={{ backgroundColor: '#ffffff', border: '3px solid #000000', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: 18, boxShadow: '4px 4px 0px #000000', transform: 'skewX(-6deg)' }}>
                  <div style={{ width: 14, height: 14, backgroundColor: item.dot, border: '3px solid #000000', flexShrink: 0, transform: 'rotate(45deg)' }} />
                  <div style={{ transform: 'skewX(6deg)' }}>
                    <p style={{ ...DISPLAY, fontWeight: 900, fontSize: 18, color: '#000000', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{item.titulo}</p>
                    <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.5, fontWeight: 600 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── BLOQUE INFERIOR CTA ── */}
      <div style={{ 
        backgroundColor: '#ffffff', 
        borderTop: '4px solid #000000', 
        position: 'relative', 
        width: '100vw', 
        left: '50%', 
        right: '50%', 
        marginLeft: '-50vw', 
        marginRight: '-50vw',
        zIndex: 10
      }}>
        
        <div style={{ position: 'absolute', top: -5, left: '0', width: '100%', height: '10px', background: 'linear-gradient(95deg, #E8003D, #6B21C8, #00C2E0, #FFD700)' }} />

        <section style={{ padding: '9rem 1.5rem 7rem 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '0', left: '-10%', width: '40%', height: '100%', backgroundColor: '#6B21C8', clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 100%)', opacity: 0.03, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '0', right: '-10%', width: '40%', height: '100%', backgroundColor: '#E8003D', clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0 100%)', opacity: 0.03, pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h2 style={{ 
              ...DISPLAY, 
              fontSize: 'clamp(68px, 11vw, 130px)', 
              fontWeight: 900, 
              textTransform: 'uppercase', 
              lineHeight: 0.75, 
              color: '#000000',
              letterSpacing: '-0.04em',
              marginBottom: '2.5rem',
              transform: 'skewX(-8deg) rotate(-1deg)'
            }}>
              ¿LISTO PARA<br />
              <span style={{ color: '#ffffff', WebkitTextStroke: '3px #000000', textShadow: '6px 6px 0px #E8003D', display: 'inline-block', marginTop: '10px' }}>COMPLETARLO?</span>
            </h2>
            
            <p style={{ fontSize: 22, color: '#1F2937', marginBottom: '4rem', maxWidth: 650, margin: '0 auto 4rem', fontWeight: 600 }}>
              Crea tu cuenta gratis, marca tus faltantes y coordina el pedido hoy mismo.
            </p>

            <Link href="/auth/registro" style={{ 
              ...DISPLAY,
              fontSize: 24, 
              padding: '22px 64px', 
              backgroundColor: '#000000', 
              color: '#ffffff', 
              fontWeight: 900, 
              borderRadius: 0, 
              textDecoration: 'none', 
              display: 'inline-flex',
              alignItems: 'center',
              gap: 14,
              letterSpacing: '0.06em',
              boxShadow: '8px 8px 0px #6B21C8',
              border: '4px solid #000000',
              textTransform: 'uppercase',
              transform: 'skewX(-10deg) rotate(1deg)'
            }}>
              <span style={{ display: 'inline-block', transform: 'skewX(10deg)' }}>🚀 EMPEZAR GRATIS AHORA</span>
            </Link>

            <p style={{ fontSize: 13, color: '#4B5563', marginTop: '3rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              · SIN TARJETA DE CRÉDITO · GRATIS PARA SIEMPRE ·
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: '4px solid #000000', padding: '4rem 2rem', width: '100%', backgroundColor: '#ffffff' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2.5rem' }}>
            <span style={{ ...DISPLAY, fontSize: 34, fontWeight: 900, color: '#000000', letterSpacing: '0.04em', transform: 'skewX(-8deg)', display: 'inline-block' }}>TAOFANS</span>
            <p style={{ fontSize: 13, color: '#374151', fontWeight: 700 }}>© 2026 TaoFans · Desarrollado por Sebastian Mamani</p>
            <div style={{ display: 'flex', gap: '3rem' }}>
              <a href={`https://wa.me/${process.env.NEXT_PUBLIC_VENDEDOR_WHATSAPP ?? ''}`} style={{ color: '#000000', fontSize: 14, textDecoration: 'none', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '2px solid #E8003D' }}>WhatsApp</a>
              <a href={`mailto:${process.env.NEXT_PUBLIC_VENDEDOR_EMAIL ?? ''}`} style={{ color: '#000000', fontSize: 14, textDecoration: 'none', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '2px solid #00C2E0' }}>Email</a>
            </div>
          </div>
        </footer>

      </div>

    </div>
  )
}
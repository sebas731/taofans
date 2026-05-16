'use client'

import { useState, useMemo } from 'react'
import { GRUPOS, Pais, generarFiguritasAlbum } from '@/types'
import EnviarPedidoModal from './EnviarPedidoModal'
import { createClient } from '@/lib/supabase/client'

interface Props {
  initialTengo: string[]
  userId: string
}

const DISPLAY = { fontFamily: "'Barlow Condensed', sans-serif" }
const COLORES_GRUPO: Record<string, string> = {
  'Especiales': '#FFE000',
  'Grupo A': '#E8003D', 'Grupo B': '#6B21C8',
  'Grupo C': '#00C2E0', 'Grupo D': '#00A859',
  'Grupo E': '#FF5C00', 'Grupo F': '#E8003D',
  'Grupo G': '#6B21C8', 'Grupo H': '#00C2E0',
  'Grupo I': '#00A859', 'Grupo J': '#FF5C00',
  'Grupo K': '#E8003D', 'Grupo L': '#6B21C8',
}

export default function FiguitasSelector({ initialTengo, userId }: Props) {
  const [tengo, setTengo] = useState<Set<string>>(new Set(initialTengo))
  const [saving, setSaving] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [grupoActivo, setGrupoActivo] = useState('Grupo A')
  const [paisActivo, setPaisActivo] = useState<Pais | null>(null)
  const [busqueda, setBusqueda] = useState('')

  const todasLasFiguritas = useMemo(() => generarFiguritasAlbum(), [])
  const total = todasLasFiguritas.length
  const totalTengo = tengo.size
  const pct = Math.round((totalTengo / total) * 100)
  const faltantes = todasLasFiguritas.filter(f => !tengo.has(f.codigo)).map(f => f.codigo)

  async function toggleFigurita(codigo: string) {
    const supabase = createClient()
    setSaving(true)
    const nuevas = new Set(tengo)
    if (nuevas.has(codigo)) {
      nuevas.delete(codigo)
      await supabase.from('figuritas_tengo').delete().eq('user_id', userId).eq('codigo', codigo)
    } else {
      nuevas.add(codigo)
      await supabase.from('figuritas_tengo').upsert({ user_id: userId, codigo })
    }
    setTengo(nuevas)
    setSaving(false)
  }

  const color = COLORES_GRUPO[grupoActivo] ?? '#FFE000'
  const paisesDelGrupo = GRUPOS[grupoActivo] ?? []
  const figuritasPais = paisActivo
    ? todasLasFiguritas.filter((f) => f.pais === paisActivo.nombre)
    : []

  const figuritasFiltradas = busqueda
    ? todasLasFiguritas.filter((f) =>
        f.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
        f.pais.toLowerCase().includes(busqueda.toLowerCase()))
    : []

  return (
    <>
      {/* Stats bar */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Tengo', value: totalTengo, color: '#00A859' },
            { label: 'Me faltan', value: faltantes.length, color: '#E8003D' },
            { label: 'Completado', value: `${pct}%`, color: '#00C2E0' },
            { label: 'Total álbum', value: total, color: 'var(--text-primary)' },
          ].map((s) => (
            <div key={s.label}>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{s.label}</p>
              <p style={{ ...DISPLAY, fontSize: 32, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {saving && <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Guardando...</span>}
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary"
            style={{ background: '#E8003D', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            📩 PEDIR FALTANTES ({faltantes.length})
          </button>
        </div>
      </div>

      {/* Barra progreso global */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '0.75rem 1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
          <span>Progreso del álbum</span>
          <span style={{ color: '#00A859', fontWeight: 700 }}>{totalTengo} / {total}</span>
        </div>
        <div style={{ height: 8, background: 'var(--border)', borderRadius: 99 }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #00A859, #00C2E0)', borderRadius: 99, transition: 'width 0.4s' }} />
        </div>
      </div>

      {/* Búsqueda */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={busqueda}
          onChange={(e) => { setBusqueda(e.target.value); setPaisActivo(null) }}
          placeholder="Buscar por código o país (ej: ARG, Brasil...)"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 16px', fontSize: 14, color: 'var(--text-primary)', outline: 'none', width: '100%', maxWidth: 380 }}
        />
      </div>

      {busqueda ? (
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 12 }}>
            {figuritasFiltradas.length} resultados para "{busqueda}"
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {figuritasFiltradas.map((f) => {
              const tiene = tengo.has(f.codigo)
              return (
                <button key={f.codigo} onClick={() => toggleFigurita(f.codigo)}
                  style={{
                    width: 72, height: 96, borderRadius: 10, cursor: 'pointer', border: 'none',
                    background: tiene ? '#00A85918' : 'var(--bg-card)',
                    outline: tiene ? `2px solid #00A859` : `1px solid var(--border)`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
                    transition: 'all 0.15s', position: 'relative', overflow: 'hidden',
                    transform: tiene ? 'scale(1.06)' : 'scale(1)',
                  }}>
                  <span style={{ fontSize: 9, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>{f.pais.slice(0, 8)}</span>
                  <span style={{ ...DISPLAY, fontSize: 15, fontWeight: 900, color: tiene ? '#00A859' : 'var(--text-primary)' }}>{f.codigo}</span>
                  {tiene && <span style={{ fontSize: 14 }}>✓</span>}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: tiene ? '#00A859' : 'var(--border)' }} />
                </button>
              )
            })}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>

        {/* Tabs grupos — horizontal scroll en móvil */}
        <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
          <div style={{ display: 'flex', gap: 6, minWidth: 'max-content' }}>
            {Object.keys(GRUPOS).map((grupo) => {
              const activo = grupoActivo === grupo
              const col = COLORES_GRUPO[grupo] ?? '#FFE000'
              const tengoEnGrupo = todasLasFiguritas.filter(f => f.grupo === grupo && tengo.has(f.codigo)).length
              const totalGrupo = todasLasFiguritas.filter(f => f.grupo === grupo).length
              const pctGrupo = Math.round((tengoEnGrupo / totalGrupo) * 100)
              return (
                <button key={grupo}
                  onClick={() => { setGrupoActivo(grupo); setPaisActivo(null) }}
                  style={{
                    padding: '7px 14px', borderRadius: 20, cursor: 'pointer', flexShrink: 0,
                    border: activo ? `1px solid ${col}` : '1px solid var(--border)',
                    background: activo ? `${col}18` : 'var(--bg-card)',
                    color: activo ? col : 'var(--text-secondary)',
                    fontWeight: 600, fontSize: 13, transition: 'all 0.15s',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                  {grupo}
                  <span style={{ fontSize: 10, opacity: 0.7 }}>{pctGrupo}%</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Centro */}
        <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>Grupos</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {Object.keys(GRUPOS).map((grupo) => {
                const activo = grupoActivo === grupo
                const col = COLORES_GRUPO[grupo] ?? '#FFE000'
                const tengoEnGrupo = todasLasFiguritas.filter(f => f.grupo === grupo && tengo.has(f.codigo)).length
                const totalGrupo = todasLasFiguritas.filter(f => f.grupo === grupo).length
                const pctGrupo = Math.round((tengoEnGrupo / totalGrupo) * 100)
                return (
                  <button key={grupo}
                    onClick={() => { setGrupoActivo(grupo); setPaisActivo(null) }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '9px 12px', borderRadius: 8, cursor: 'pointer',
                      border: activo ? `1px solid ${col}` : '1px solid var(--border)',
                      background: activo ? `${col}18` : 'var(--bg-card)',
                      color: activo ? col : 'var(--text-secondary)',
                      fontWeight: 600, fontSize: 13, textAlign: 'left', transition: 'all 0.15s',
                    }}>
                    {activo && <span style={{ width: 3, height: 14, background: col, borderRadius: 99, marginRight: 8, flexShrink: 0 }} />}
                    <span style={{ flex: 1 }}>{grupo}</span>
                    <span style={{ fontSize: 10, color: pctGrupo === 100 ? '#00A859' : 'var(--text-secondary)' }}>
                      {pctGrupo}%
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Centro */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {!paisActivo ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 4, height: 28, background: color, borderRadius: 99 }} />
                  <h2 style={{ ...DISPLAY, fontSize: 32, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                    {grupoActivo}
                  </h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
                  {paisesDelGrupo.map((pais) => {
                    const tengoEnPais = todasLasFiguritas.filter(f => f.pais === pais.nombre && tengo.has(f.codigo)).length
                    const totalPais = todasLasFiguritas.filter(f => f.pais === pais.nombre).length
                    const pctPais = Math.round((tengoEnPais / totalPais) * 100)
                    return (
                      <button key={pais.codigo}
                        onClick={() => setPaisActivo(pais)}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = color; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = 'none' }}
                        style={{
                          background: 'var(--bg-card)', border: `1px solid var(--border)`,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                          borderRadius: 16, padding: 0, cursor: 'pointer',
                          textAlign: 'center', transition: 'all 0.2s',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
                          position: 'relative', overflow: 'hidden',
                        }}>
                        {/* Top color bar */}
                        <div style={{ width: '100%', height: 4, background: pctPais === 100 ? '#00A859' : color, flexShrink: 0 }} />

                        {/* Fondo con bandera grande semitransparente */}
                        <div style={{ position: 'relative', width: '100%', padding: '1.25rem 1rem 0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                          {/* Bandera como imagen desde CDN */}
                              <img
                                src={`https://flagcdn.com/96x72/${pais.iso}.png`}
                                alt={pais.nombre}
                                style={{ width: 72, height: 54, objectFit: 'cover', borderRadius: 6, position: 'relative', zIndex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                                onError={(e) => {
                                  // Si no carga la imagen, muestra el emoji
                                  (e.currentTarget as HTMLImageElement).style.display = 'none'
                                  const next = e.currentTarget.nextElementSibling as HTMLElement
                                  if (next) next.style.display = 'block'
                                }}
                              />
                              <span style={{ fontSize: 44, lineHeight: 1, display: 'none', position: 'relative', zIndex: 1 }}>{pais.bandera}</span>
                          {/* Nombre con fondo para contraste */}
                          <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                            <p style={{ ...DISPLAY, fontSize: 16, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase' as const, lineHeight: 1, marginBottom: 2 }}>
                              {pais.nombre}
                            </p>
                            <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                              {tengoEnPais} / {totalPais}
                            </p>
                          </div>
                        </div>
                        <div style={{ width: '100%' }}>
                          <div style={{ height: 3, background: 'var(--border)', borderRadius: 99 }}>
                            <div style={{ height: '100%', width: `${pctPais}%`, background: pctPais === 100 ? '#00A859' : color, borderRadius: 99 }} />
                          </div>
                          <p style={{ fontSize: 10, marginTop: 4 }}>
                            {pctPais === 100
                              ? <span style={{ color: '#00A859', fontWeight: 600 }}>✓ Completo</span>
                              : <span style={{ color: '#E8003D', fontWeight: 600 }}>Faltan {totalPais - tengoEnPais}</span>
                            }
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div>
                {/* Header país */}
                <div style={{
                  background: `${color}12`, border: `1px solid ${color}40`,
                  borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: 20,
                  display: 'flex', alignItems: 'center', gap: 20,
                }}>
                  <button onClick={() => setPaisActivo(null)}
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
                    ← Volver
                  </button>
                  <span style={{ fontSize: 64, lineHeight: 1, flexShrink: 0 }}>{paisActivo.bandera}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 11, color: color, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>{paisActivo.grupo}</p>
                    <h2 style={{ ...DISPLAY, fontSize: 38, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase', lineHeight: 1, marginBottom: 8 }}>
                      {paisActivo.nombre}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ flex: 1, height: 4, background: 'var(--border)', borderRadius: 99 }}>
                        <div style={{ height: '100%', background: '#00A859', borderRadius: 99, width: `${Math.round((figuritasPais.filter(f => tengo.has(f.codigo)).length / paisActivo.total) * 100)}%`, transition: 'width 0.3s' }} />
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)', flexShrink: 0 }}>
                        {figuritasPais.filter(f => tengo.has(f.codigo)).length} / {paisActivo.total}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                        const supabase = createClient()
                        const nuevas = new Set(tengo)
                        const allTiene = figuritasPais.every(f => tengo.has(f.codigo))
                        if (allTiene) {
                          figuritasPais.forEach(f => nuevas.delete(f.codigo))
                          await supabase
                            .from('figuritas_tengo')
                            .delete()
                            .eq('user_id', userId)
                            .in('codigo', figuritasPais.map(f => f.codigo))
                        } else {
                          figuritasPais.forEach(f => nuevas.add(f.codigo))
                          await supabase
                            .from('figuritas_tengo')
                            .upsert(figuritasPais.map(f => ({ user_id: userId, codigo: f.codigo })))
                        }
                        setTengo(nuevas)
                      }}
                    style={{ background: '#00A859', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer', ...DISPLAY, letterSpacing: '0.06em', flexShrink: 0 }}>
                    {figuritasPais.every(f => tengo.has(f.codigo)) ? 'QUITAR TODAS' : 'TENGO TODAS'}
                  </button>
                </div>

                {/* Instrucción */}
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
                  Toca las figuritas que <strong style={{ color: '#00A859' }}>ya tienes</strong> — las que queden sin marcar se incluirán en tu pedido.
                </p>

                {/* Grid figuritas */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))', gap: 8 }}>
                  {figuritasPais.map((f) => {
                    const tiene = tengo.has(f.codigo)
                    return (
                      <button key={f.codigo} onClick={() => toggleFigurita(f.codigo)} title={f.codigo}
                        style={{
                          width: 72, height: 96, borderRadius: 10, cursor: 'pointer', border: 'none',
                          background: tiene ? '#00A85918' : 'var(--bg-card)',
                          outline: tiene ? `2px solid #00A859` : `1px solid var(--border)`,
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5,
                          boxShadow: tiene ? `0 6px 16px #00A85944` : '0 2px 6px rgba(0,0,0,0.08)',
                          transition: 'all 0.15s',
                          transform: tiene ? 'scale(1.06)' : 'scale(1)',
                          position: 'relative', overflow: 'hidden',
                        }}>
                        <span style={{ fontSize: 22 }}>{paisActivo.bandera}</span>
                        <span style={{ ...DISPLAY, fontSize: 15, fontWeight: 900, color: tiene ? '#00A859' : 'var(--text-primary)', lineHeight: 1 }}>
                          {f.codigo}
                        </span>
                        {tiene && <span style={{ fontSize: 12, color: '#00A859' }}>✓</span>}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: tiene ? '#00A859' : color }} />
                      </button>
                    )
                  })}
                </div>
                {/* Guardar */}
                <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button
                    onClick={async () => {
                      const supabase = createClient()
                      setSaving(true)
                      await supabase
                        .from('figuritas_tengo')
                        .delete()
                        .eq('user_id', userId)
                        .in('codigo', figuritasPais.map(f => f.codigo))
                      const tengoEnPais = figuritasPais.filter(f => tengo.has(f.codigo))
                      if (tengoEnPais.length > 0) {
                        await supabase
                          .from('figuritas_tengo')
                          .upsert(tengoEnPais.map(f => ({ user_id: userId, codigo: f.codigo })))
                      }
                      setSaving(false)
                    }}
                    className="btn-primary"
                    style={{ background: '#00A859' }}
                    disabled={saving}
                  >
                    {saving ? 'Guardando...' : '💾 GUARDAR CAMBIOS'}
                  </button>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                    {figuritasPais.filter(f => tengo.has(f.codigo)).length} / {paisActivo!.total} marcadas
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showModal && (
        <EnviarPedidoModal
          faltantes={faltantes}
          userId={userId}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
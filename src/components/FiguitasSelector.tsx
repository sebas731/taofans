'use client'

import { useState, useMemo } from 'react'
import { GRUPOS, Pais, generarFiguritasAlbum } from '@/types'
import EnviarPedidoModal from './EnviarPedidoModal'
import { createClient } from '@/lib/supabase/client'

interface Props {
  initialFaltantes: string[]
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

export default function FiguitasSelector({ initialFaltantes, userId }: Props) {
  const [faltantes, setFaltantes] = useState<Set<string>>(new Set(initialFaltantes))
  const [saving, setSaving] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [grupoActivo, setGrupoActivo] = useState('Grupo A')
  const [paisActivo, setPaisActivo] = useState<Pais | null>(null)
  const [busqueda, setBusqueda] = useState('')

  const todasLasFiguritas = useMemo(() => generarFiguritasAlbum(), [])
  const total = todasLasFiguritas.length
  const totalFaltantes = faltantes.size
  const pct = Math.round(((total - totalFaltantes) / total) * 100)

  async function toggleFigurita(codigo: string) {
    const supabase = createClient()
    setSaving(true)
    const nuevas = new Set(faltantes)
    if (nuevas.has(codigo)) {
      nuevas.delete(codigo)
      await supabase.from('figuritas_faltantes').delete().eq('user_id', userId).eq('codigo', codigo)
    } else {
      nuevas.add(codigo)
      await supabase.from('figuritas_faltantes').upsert({ user_id: userId, codigo })
    }
    setFaltantes(nuevas)
    setSaving(false)
  }

  const paisesDelGrupo = GRUPOS[grupoActivo] ?? []
  const color = COLORES_GRUPO[grupoActivo] ?? '#FFE000'

  // Figuritas del país activo
  const figuritasPais = paisActivo
    ? todasLasFiguritas.filter((f) => f.pais === paisActivo.nombre)
    : []

  const figuritasFiltradas = busqueda
    ? todasLasFiguritas.filter((f) => f.codigo.toLowerCase().includes(busqueda.toLowerCase()) || f.pais.toLowerCase().includes(busqueda.toLowerCase()))
    : figuritasPais

  return (
    <>
      {/* Stats bar */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Faltantes', value: totalFaltantes, color: '#E8003D' },
            { label: 'Total álbum', value: total, color: 'var(--text-primary)' },
            { label: 'Completado', value: `${pct}%`, color: '#00A859' },
          ].map((s) => (
            <div key={s.label}>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{s.label}</p>
              <p style={{ ...DISPLAY, fontSize: 32, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {saving && <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Guardando...</span>}
          <button onClick={() => setShowModal(true)} disabled={totalFaltantes === 0} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            📩 ENVIAR PEDIDO ({totalFaltantes})
          </button>
        </div>
      </div>

      {/* Búsqueda global */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          value={busqueda}
          onChange={(e) => { setBusqueda(e.target.value); setPaisActivo(null) }}
          placeholder="Buscar figurita por código o país (ej: ARG, BRA3...)"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 16px', fontSize: 14, color: 'var(--text-primary)', outline: 'none', width: '100%', maxWidth: 400 }}
        />
      </div>

      {/* Si hay búsqueda activa */}
      {busqueda ? (
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 12 }}>{figuritasFiltradas.length} resultados para "{busqueda}"</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(56px, 1fr))', gap: 6 }}>
            {figuritasFiltradas.map((f) => {
              const sel = faltantes.has(f.codigo)
              return (
                <button key={f.codigo} onClick={() => toggleFigurita(f.codigo)} title={`${f.codigo} - ${f.pais}`}
                  className="sticker-card"
                  style={{ aspectRatio: '1', borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: 'pointer', border: 'none', background: sel ? '#FFE000' : 'var(--bg-card)', color: sel ? '#080808' : 'var(--text-secondary)', outline: sel ? '2px solid #FFE000' : `1px solid var(--border)` }}>
                  {f.codigo}
                </button>
              )
            })}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>

          {/* LEFT: Grupos + Países */}
          <div style={{ minWidth: 220, flex: '0 0 220px' }}>
            {/* Tabs grupos */}
            <div style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Grupos</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {Object.keys(GRUPOS).map((grupo) => {
                  const activo = grupoActivo === grupo
                  const col = COLORES_GRUPO[grupo] ?? '#FFE000'
                  const faltantesGrupo = todasLasFiguritas.filter(f => f.grupo === grupo && faltantes.has(f.codigo)).length
                  return (
                    <button key={grupo} onClick={() => { setGrupoActivo(grupo); setPaisActivo(null) }}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 8, cursor: 'pointer', border: activo ? `1px solid ${col}` : '1px solid var(--border)', background: activo ? `${col}18` : 'var(--bg-card)', color: activo ? col : 'var(--text-secondary)', fontWeight: 600, fontSize: 13, textAlign: 'left' }}>
                      <span>{grupo}</span>
                      {faltantesGrupo > 0 && <span style={{ fontSize: 10, background: '#E8003D', color: '#fff', borderRadius: 99, padding: '2px 6px' }}>{faltantesGrupo}</span>}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Lista países del grupo */}
            <div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Países</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {paisesDelGrupo.map((pais) => {
                  const activo = paisActivo?.codigo === pais.codigo
                  const faltantesPais = todasLasFiguritas.filter(f => f.pais === pais.nombre && faltantes.has(f.codigo)).length
                  return (
                    <button key={pais.codigo} onClick={() => setPaisActivo(pais)}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, cursor: 'pointer', border: activo ? `1px solid ${color}` : '1px solid var(--border)', background: activo ? `${color}18` : 'var(--bg-card)', textAlign: 'left' }}>
                      <span style={{ fontSize: 22 }}>{pais.bandera}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1 }}>{pais.nombre}</p>
                        <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{pais.codigo}1 – {pais.codigo}{pais.total}</p>
                      </div>
                      {faltantesPais > 0 && <span style={{ fontSize: 10, background: '#E8003D', color: '#fff', borderRadius: 99, padding: '2px 6px', flexShrink: 0 }}>{faltantesPais}</span>}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Figuritas del país seleccionado */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {!paisActivo ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300, color: 'var(--text-secondary)', gap: 12 }}>
                <span style={{ fontSize: 48 }}>👈</span>
                <p style={{ fontSize: 15 }}>Selecciona un país para ver sus figuritas</p>
              </div>
            ) : (
              <div>
                {/* Header país */}
                <div style={{ background: `${color}12`, border: `1px solid ${color}30`, borderRadius: 16, padding: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <span style={{ fontSize: 72, lineHeight: 1 }}>{paisActivo.bandera}</span>
                  <div>
                    <p style={{ fontSize: 12, color: color, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{paisActivo.grupo}</p>
                    <h2 style={{ ...DISPLAY, fontSize: 40, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase', lineHeight: 1, marginBottom: 4 }}>{paisActivo.nombre}</h2>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                      {paisActivo.codigo}1 – {paisActivo.codigo}{paisActivo.total} · {figuritasPais.filter(f => faltantes.has(f.codigo)).length} faltantes
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const supabase = createClient()
                      const nuevas = new Set(faltantes)
                      const allSel = figuritasPais.every(f => faltantes.has(f.codigo))
                      if (allSel) {
                        figuritasPais.forEach(f => { nuevas.delete(f.codigo); supabase.from('figuritas_faltantes').delete().eq('user_id', userId).eq('codigo', f.codigo) })
                      } else {
                        figuritasPais.forEach(f => { nuevas.add(f.codigo); supabase.from('figuritas_faltantes').upsert({ user_id: userId, codigo: f.codigo }) })
                      }
                      setFaltantes(nuevas)
                    }}
                    style={{ marginLeft: 'auto', background: color, color: ['#FFE000','#00C2E0'].includes(color) ? '#080808' : '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 700, fontSize: 12, cursor: 'pointer', letterSpacing: '0.06em' }}
                  >
                    {figuritasPais.every(f => faltantes.has(f.codigo)) ? 'QUITAR TODOS' : 'SELECCIONAR TODOS'}
                  </button>
                </div>

                {/* Grid figuritas */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(56px, 1fr))', gap: 6 }}>
                  {figuritasPais.map((f) => {
                    const sel = faltantes.has(f.codigo)
                    return (
                      <button key={f.codigo} onClick={() => toggleFigurita(f.codigo)} title={f.codigo}
                        className="sticker-card"
                        style={{ aspectRatio: '1', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: 'none', background: sel ? color : 'var(--bg-card)', color: sel ? (['#FFE000','#00C2E0'].includes(color) ? '#080808' : '#fff') : 'var(--text-secondary)', outline: sel ? `2px solid ${color}` : `1px solid var(--border)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
                        <span style={{ fontSize: 9, opacity: 0.6 }}>{f.codigo.replace(/\d+/, '')}</span>
                        <span>{f.codigo.replace(/[A-Z]+/, '')}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showModal && (
        <EnviarPedidoModal
          faltantes={[...faltantes]}
          userId={userId}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
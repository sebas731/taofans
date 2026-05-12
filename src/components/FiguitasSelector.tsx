'use client'

import { useState, useCallback, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { GRUPOS_MUNDIAL, generarFiguritas } from '@/types'
import EnviarPedidoModal from './EnviarPedidoModal'

interface Props {
  initialFaltantes: number[]
  userId: string
}

const DISPLAY = { fontFamily: "'Barlow Condensed', sans-serif" }

export default function FiguitasSelector({ initialFaltantes, userId }: Props) {
  const [faltantes, setFaltantes] = useState<Set<number>>(new Set(initialFaltantes))
  const [saving, setSaving] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [grupoActivo, setGrupoActivo] = useState(Object.keys(GRUPOS_MUNDIAL)[0])
  const [busqueda, setBusqueda] = useState('')

  const todasLasFiguritas = useMemo(() => generarFiguritas(), [])

  const figuritasDelGrupo = useMemo(() => {
    const grupo = GRUPOS_MUNDIAL[grupoActivo]
    if (!grupo) return []
    const nums = new Set<number>()
    grupo.forEach(({ rango }) => {
      for (let i = rango[0]; i <= rango[1]; i++) nums.add(i)
    })
    return todasLasFiguritas.filter((f) => nums.has(f.numero))
  }, [grupoActivo, todasLasFiguritas])

  const figuritasFiltradas = useMemo(() => {
    if (!busqueda) return figuritasDelGrupo
    const q = busqueda.toLowerCase()
    return figuritasDelGrupo.filter(
      (f) => f.nombre.toLowerCase().includes(q) || String(f.numero).includes(q)
    )
  }, [figuritasDelGrupo, busqueda])

  const toggleFigurita = useCallback(async (numero: number) => {
    const supabase = createClient()
    setSaving(true)
    const nuevas = new Set(faltantes)
    if (nuevas.has(numero)) {
      nuevas.delete(numero)
      await supabase.from('figuritas_faltantes').delete().eq('user_id', userId).eq('numero', numero)
    } else {
      nuevas.add(numero)
      await supabase.from('figuritas_faltantes').upsert({ user_id: userId, numero })
    }
    setFaltantes(nuevas)
    setSaving(false)
  }, [faltantes, userId])

  const totalFaltantes = faltantes.size
  const pct = Math.round(((todasLasFiguritas.length - totalFaltantes) / todasLasFiguritas.length) * 100)

  return (
    <>
      {/* Stats bar */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Faltantes', value: totalFaltantes, color: '#E8003D' },
            { label: 'Total álbum', value: todasLasFiguritas.length, color: 'var(--text-primary)' },
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
          <button
            onClick={() => setShowModal(true)}
            disabled={totalFaltantes === 0}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            📩 ENVIAR PEDIDO ({totalFaltantes})
          </button>
        </div>
      </div>

      {/* Grupo tabs */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: 16 }}>
        {Object.keys(GRUPOS_MUNDIAL).map((grupo) => {
          const nums = new Set<number>()
          GRUPOS_MUNDIAL[grupo].forEach(({ rango }) => {
            for (let i = rango[0]; i <= rango[1]; i++) nums.add(i)
          })
          const faltantesEnGrupo = [...nums].filter((n) => faltantes.has(n)).length
          const activo = grupoActivo === grupo

          return (
            <button
              key={grupo}
              onClick={() => { setGrupoActivo(grupo); setBusqueda('') }}
              style={{
                whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
                background: activo ? '#FFE000' : 'var(--bg-card)',
                color: activo ? '#080808' : 'var(--text-secondary)',
                border: activo ? '1px solid #FFE000' : '1px solid var(--border)',
              }}
            >
              {grupo}
              {faltantesEnGrupo > 0 && (
                <span style={{ marginLeft: 6, fontSize: 11, padding: '2px 6px', borderRadius: 99, background: activo ? '#080808' : '#E8003D', color: '#fff' }}>
                  {faltantesEnGrupo}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Buscar */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por número o país..."
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 16px', fontSize: 14, color: 'var(--text-primary)', outline: 'none', width: 280 }}
        />
      </div>

      {/* Países */}
      {GRUPOS_MUNDIAL[grupoActivo]?.map(({ pais, rango }) => {
        const figsPais = figuritasFiltradas.filter((f) => f.pais === pais && f.numero >= rango[0] && f.numero <= rango[1])
        if (figsPais.length === 0) return null
        const faltantesEnPais = figsPais.filter((f) => faltantes.has(f.numero)).length
        const allSelected = figsPais.every((f) => faltantes.has(f.numero))

        return (
          <div key={pais} style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <h3 style={{ ...DISPLAY, fontSize: 22, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase' }}>{pais}</h3>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>({rango[0]}–{rango[1]})</span>
              {faltantesEnPais > 0 && (
                <span style={{ fontSize: 12, color: '#E8003D', fontWeight: 600 }}>{faltantesEnPais} faltante{faltantesEnPais !== 1 ? 's' : ''}</span>
              )}
              <button
                onClick={() => {
                  const supabase = createClient()
                  const nuevas = new Set(faltantes)
                  if (allSelected) {
                    figsPais.forEach((f) => { nuevas.delete(f.numero); supabase.from('figuritas_faltantes').delete().eq('user_id', userId).eq('numero', f.numero) })
                  } else {
                    figsPais.forEach((f) => { nuevas.add(f.numero); supabase.from('figuritas_faltantes').upsert({ user_id: userId, numero: f.numero }) })
                  }
                  setFaltantes(nuevas)
                }}
                style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {allSelected ? 'Deseleccionar todos' : 'Seleccionar todos'}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(44px, 1fr))', gap: 6 }}>
              {figsPais.map((f) => {
                const sel = faltantes.has(f.numero)
                return (
                  <button
                    key={f.numero}
                    onClick={() => toggleFigurita(f.numero)}
                    title={f.nombre}
                    className="sticker-card"
                    style={{
                      aspectRatio: '1', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: 'none', transition: 'all 0.12s',
                      background: sel ? '#FFE000' : 'var(--bg-card)',
                      color: sel ? '#080808' : 'var(--text-secondary)',
                      outline: sel ? '2px solid #FFE000' : `1px solid var(--border)`,
                    }}
                  >
                    {f.numero}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      {figuritasFiltradas.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '3rem 0' }}>
          No se encontraron figuritas con ese criterio.
        </div>
      )}

      {showModal && (
        <EnviarPedidoModal
          faltantes={[...faltantes].sort((a, b) => a - b)}
          userId={userId}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
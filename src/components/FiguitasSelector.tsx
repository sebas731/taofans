'use client'

import { useState, useCallback, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { GRUPOS_MUNDIAL, generarFiguritas } from '@/types'
import EnviarPedidoModal from './EnviarPedidoModal'

interface Props {
  initialFaltantes: number[]
  userId: string
}

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

  const toggleFigurita = useCallback(
    async (numero: number) => {
      const supabase = createClient()
      setSaving(true)

      const nuevas = new Set(faltantes)
      if (nuevas.has(numero)) {
        nuevas.delete(numero)
        await supabase
          .from('figuritas_faltantes')
          .delete()
          .eq('user_id', userId)
          .eq('numero', numero)
      } else {
        nuevas.add(numero)
        await supabase
          .from('figuritas_faltantes')
          .upsert({ user_id: userId, numero })
      }

      setFaltantes(nuevas)
      setSaving(false)
    },
    [faltantes, userId]
  )

  const totalFaltantes = faltantes.size

  return (
    <>
      {/* Stats bar */}
      <div className="glass rounded-xl p-4 mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider">Faltantes</p>
            <p className="font-display text-3xl text-brand-400">{totalFaltantes}</p>
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider">Total álbum</p>
            <p className="font-display text-3xl text-white">{todasLasFiguritas.length}</p>
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider">Completado</p>
            <p className="font-display text-3xl text-green-400">
              {Math.round(((todasLasFiguritas.length - totalFaltantes) / todasLasFiguritas.length) * 100)}%
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {saving && <span className="text-white/40 text-sm self-center">Guardando...</span>}
          <button
            onClick={() => setShowModal(true)}
            disabled={totalFaltantes === 0}
            className="btn-primary flex items-center gap-2"
          >
            📩 Enviar pedido ({totalFaltantes})
          </button>
        </div>
      </div>

      {/* Grupo tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {Object.keys(GRUPOS_MUNDIAL).map((grupo) => {
          const grupoData = GRUPOS_MUNDIAL[grupo]
          const nums = new Set<number>()
          grupoData.forEach(({ rango }) => {
            for (let i = rango[0]; i <= rango[1]; i++) nums.add(i)
          })
          const faltantesEnGrupo = [...nums].filter((n) => faltantes.has(n)).length

          return (
            <button
              key={grupo}
              onClick={() => { setGrupoActivo(grupo); setBusqueda('') }}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                grupoActivo === grupo
                  ? 'bg-brand-500 text-field-dark'
                  : 'glass text-white/60 hover:text-white'
              }`}
            >
              {grupo}
              {faltantesEnGrupo > 0 && (
                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                  grupoActivo === grupo ? 'bg-field-dark/30' : 'bg-brand-500/30 text-brand-300'
                }`}>
                  {faltantesEnGrupo}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Buscar */}
      <div className="mb-4">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por número o país..."
          className="input-field max-w-xs"
        />
      </div>

      {/* Paises dentro del grupo */}
      {GRUPOS_MUNDIAL[grupoActivo]?.map(({ pais, rango }) => {
        const figsPais = figuritasFiltradas.filter(
          (f) => f.pais === pais && f.numero >= rango[0] && f.numero <= rango[1]
        )
        if (figsPais.length === 0) return null

        const faltantesEnPais = figsPais.filter((f) => faltantes.has(f.numero)).length

        return (
          <div key={pais} className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="font-display text-xl text-white">{pais}</h3>
              <span className="text-white/30 text-sm">({rango[0]}–{rango[1]})</span>
              {faltantesEnPais > 0 && (
                <span className="text-brand-400 text-sm font-medium">
                  {faltantesEnPais} faltante{faltantesEnPais !== 1 ? 's' : ''}
                </span>
              )}
              <button
                className="ml-auto text-xs text-white/30 hover:text-white/60 transition-colors"
                onClick={() => {
                  const supabase = createClient()
                  const allSelected = figsPais.every((f) => faltantes.has(f.numero))
                  const nuevas = new Set(faltantes)
                  if (allSelected) {
                    figsPais.forEach((f) => {
                      nuevas.delete(f.numero)
                      supabase.from('figuritas_faltantes').delete().eq('user_id', userId).eq('numero', f.numero)
                    })
                  } else {
                    figsPais.forEach((f) => {
                      nuevas.add(f.numero)
                      supabase.from('figuritas_faltantes').upsert({ user_id: userId, numero: f.numero })
                    })
                  }
                  setFaltantes(nuevas)
                }}
              >
                {figsPais.every((f) => faltantes.has(f.numero)) ? 'Deseleccionar todos' : 'Seleccionar todos'}
              </button>
            </div>

            <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 lg:grid-cols-20 gap-1.5">
              {figsPais.map((f) => (
                <button
                  key={f.numero}
                  onClick={() => toggleFigurita(f.numero)}
                  className={`sticker-card aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                    faltantes.has(f.numero)
                      ? 'bg-brand-500 text-field-dark selected'
                      : 'glass text-white/50 hover:text-white hover:bg-white/10'
                  }`}
                  title={f.nombre}
                >
                  {f.numero}
                </button>
              ))}
            </div>
          </div>
        )
      })}

      {figuritasFiltradas.length === 0 && (
        <div className="text-center text-white/40 py-12">
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

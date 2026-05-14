'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

// DESPUÉS
interface Props {
  faltantes: string[]
  userId: string
  onClose: () => void
}

export default function EnviarPedidoModal({ faltantes, userId, onClose }: Props) {
  const [mensaje, setMensaje] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const vendedorWhatsapp = process.env.NEXT_PUBLIC_VENDEDOR_WHATSAPP ?? '5491100000000'
  const vendedorEmail    = process.env.NEXT_PUBLIC_VENDEDOR_EMAIL    ?? 'vendedor@email.com'
  const vendedorNombre   = process.env.NEXT_PUBLIC_VENDEDOR_NOMBRE   ?? 'Vendedor'

  const textoPedido =
    `🎴 *Pedido de Figuritas - Mundial 2026*\n\n` +
    `Me faltan ${faltantes.length} figurita${faltantes.length !== 1 ? 's' : ''}:\n` +
    `*Códigos:* ${faltantes.join(', ')}\n` +
    (mensaje ? `\n💬 ${mensaje}` : '')

  async function guardarPedido() {
    const supabase = createClient()
    await supabase.from('pedidos').insert({
      user_id: userId,
      figuritas: faltantes,
      mensaje,
      estado: 'pendiente',
    })
  }

  async function enviarWhatsApp() {
    setEnviando(true)
    await guardarPedido()
    const url = `https://wa.me/${vendedorWhatsapp}?text=${encodeURIComponent(textoPedido)}`
    window.open(url, '_blank')
    setEnviando(false)
    setEnviado(true)
  }

  async function enviarEmail() {
    setEnviando(true)
    await guardarPedido()
    const subject = encodeURIComponent('Pedido Figuritas Mundial 2026')
    const body = encodeURIComponent(textoPedido.replace(/\*/g, ''))
    window.open(`mailto:${vendedorEmail}?subject=${subject}&body=${body}`, '_blank')
    setEnviando(false)
    setEnviado(true)
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass rounded-2xl w-full max-w-lg animate-slide-up" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="font-display text-3xl text-white">ENVIAR PEDIDO</h2>
            <p className="text-white/50 text-sm">a {vendedorNombre}</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white text-2xl">✕</button>
        </div>

        <div className="p-6 space-y-5">
          {/* Resumen */}
          <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-4">
            <p className="text-brand-300 text-sm font-medium mb-2">
              📋 {faltantes.length} figurita{faltantes.length !== 1 ? 's' : ''} seleccionada{faltantes.length !== 1 ? 's' : ''}
            </p>
            <p className="text-white/60 text-xs leading-relaxed">
              {faltantes.slice(0, 30).join(' · ')}
              {faltantes.length > 30 && ` · ... y ${faltantes.length - 30} más`}
            </p>
          </div>

          {/* Preview del mensaje */}
          <div>
            <label className="text-white/60 text-sm block mb-2">Vista previa del mensaje</label>
            <div className="bg-black/30 rounded-xl p-4 text-white/70 text-sm font-mono whitespace-pre-line">
              {textoPedido}
            </div>
          </div>

          {/* Mensaje adicional */}
          <div>
            <label className="text-white/60 text-sm block mb-2">Agregar nota (opcional)</label>
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Ej: Disponible los lunes, prefiero entrega en mano..."
              rows={3}
              className="input-field resize-none"
            />
          </div>

          {enviado && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-300 rounded-xl p-4 text-sm text-center">
              ✅ Pedido registrado. Tu vendedor lo recibirá enseguida.
            </div>
          )}

          {/* Botones de envío */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={enviarWhatsApp}
              disabled={enviando}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-95 disabled:opacity-50"
            >
              <span className="text-xl">💬</span>
              WhatsApp
            </button>

            <button
              onClick={enviarEmail}
              disabled={enviando}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-95 disabled:opacity-50"
            >
              <span className="text-xl">📧</span>
              Email
            </button>
          </div>

          <button onClick={onClose} className="btn-ghost w-full text-center">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

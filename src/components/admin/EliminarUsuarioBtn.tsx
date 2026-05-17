'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function EliminarUsuarioBtn({ userId, nombre }: { userId: string; nombre: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function eliminar() {
    if (!confirm(`¿Eliminar a ${nombre}? Esta acción no se puede deshacer.`)) return
    setLoading(true)
    const supabase = createClient()
    await supabase.from('figuritas_tengo').delete().eq('user_id', userId)
    await supabase.from('pedidos').delete().eq('user_id', userId)
    await supabase.from('profiles').delete().eq('id', userId)
    router.refresh()
    setLoading(false)
  }

  return (
    <button onClick={eliminar} disabled={loading}
      style={{ fontSize: 12, padding: '5px 10px', borderRadius: 6, background: '#E8003D20', color: '#E8003D', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
      {loading ? '...' : 'Eliminar'}
    </button>
  )
}
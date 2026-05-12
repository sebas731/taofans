import { createClient } from '@/lib/supabase/server'

export default async function MisPedidosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: pedidos } = await supabase
    .from('pedidos')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  const estadoColor = {
    pendiente:  'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    procesado:  'bg-blue-500/20   text-blue-300   border-blue-500/30',
    entregado:  'bg-green-500/20  text-green-300  border-green-500/30',
  }

  const estadoLabel = {
    pendiente:  '⏳ Pendiente',
    procesado:  '📦 En proceso',
    entregado:  '✅ Entregado',
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-5xl text-white">MIS PEDIDOS</h1>
        <p className="text-white/50 mt-1">Historial de todos tus pedidos enviados al vendedor.</p>
      </div>

      {!pedidos || pedidos.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-6xl mb-4">📋</p>
          <p className="text-white/50 text-lg">Todavía no enviaste ningún pedido.</p>
          <a href="/dashboard" className="btn-primary inline-block mt-6">
            Ir a mis faltantes
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="glass rounded-xl p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-display text-lg text-white">
                      {pedido.figuritas?.length ?? 0} figuritas
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full border ${estadoColor[pedido.estado as keyof typeof estadoColor] ?? estadoColor.pendiente}`}>
                      {estadoLabel[pedido.estado as keyof typeof estadoLabel] ?? pedido.estado}
                    </span>
                  </div>

                  <p className="text-white/40 text-xs mb-2">
                    Números: {(pedido.figuritas as number[])?.slice(0, 20).join(', ')}
                    {(pedido.figuritas as number[])?.length > 20 && ` ... y ${pedido.figuritas.length - 20} más`}
                  </p>

                  {pedido.mensaje && (
                    <p className="text-white/50 text-sm italic">"{pedido.mensaje}"</p>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-white/30 text-xs">
                    {new Date(pedido.created_at).toLocaleDateString('es-AR', {
                      day: '2-digit', month: 'short', year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

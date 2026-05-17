import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const DISPLAY = { fontFamily: "'Barlow Condensed', sans-serif" }

export default async function AdminUsuariosPage() {
  const supabase = await createClient()

  const { data: usuarios } = await supabase
    .from('admin_usuarios')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ ...DISPLAY, fontSize: 13, color: '#E8003D', letterSpacing: '0.15em', marginBottom: 4 }}>ADMINISTRACIÓN</p>
        <h1 style={{ ...DISPLAY, fontSize: 48, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase' as const }}>
          USUARIOS ({usuarios?.length ?? 0})
        </h1>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        {usuarios?.map((u: any) => (
          <div key={u.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{u.nombre}</p>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{u.email} {u.whatsapp && `· 📱 ${u.whatsapp}`}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ ...DISPLAY, fontSize: 20, fontWeight: 900, color: '#00A859' }}>{u.total_tengo}</p>
                <p style={{ fontSize: 10, color: 'var(--text-secondary)' }}>figuritas</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ ...DISPLAY, fontSize: 20, fontWeight: 900, color: '#E8003D' }}>{u.total_pedidos}</p>
                <p style={{ fontSize: 10, color: 'var(--text-secondary)' }}>pedidos</p>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <Link href={`/admin/usuarios/${u.id}`}
                  style={{ fontSize: 12, padding: '5px 10px', borderRadius: 6, background: '#00C2E020', color: '#00C2E0', textDecoration: 'none', fontWeight: 600 }}>
                  Ver
                </Link>
                <EliminarBtn userId={u.id} nombre={u.nombre} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EliminarBtn({ userId, nombre }: { userId: string; nombre: string }) {
  return (
    <form action={async () => {
      'use server'
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      await supabase.from('figuritas_tengo').delete().eq('user_id', userId)
      await supabase.from('pedidos').delete().eq('user_id', userId)
      await supabase.from('profiles').delete().eq('id', userId)
    }}>
      <button type="submit"
        style={{ fontSize: 12, padding: '5px 10px', borderRadius: 6, background: '#E8003D20', color: '#E8003D', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
        Eliminar
      </button>
    </form>
  )
}
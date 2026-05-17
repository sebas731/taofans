import { createClient } from '@/lib/supabase/server'

const DISPLAY = { fontFamily: "'Barlow Condensed', sans-serif" }

export default async function AdminPage() {
  const supabase = await createClient()

  const [
    { count: totalUsuarios },
    { count: totalPedidos },
    { data: pedidosRecientes },
    { data: usuariosRecientes },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('pedidos').select('*', { count: 'exact', head: true }),
    supabase.from('pedidos').select('*, profiles(nombre, email)').order('created_at', { ascending: false }).limit(5),
    supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(5),
  ])

  const stats = [
    { label: 'Usuarios registrados', value: totalUsuarios ?? 0, color: '#00C2E0', icon: '👥' },
    { label: 'Pedidos enviados', value: totalPedidos ?? 0, color: '#E8003D', icon: '📦' },
  ]

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ ...DISPLAY, fontSize: 13, color: '#E8003D', letterSpacing: '0.15em', marginBottom: 4 }}>PANEL DE CONTROL</p>
        <h1 style={{ ...DISPLAY, fontSize: 48, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
          DASHBOARD ADMIN
        </h1>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: '2rem' }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: s.color }} />
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>{s.icon} {s.label}</p>
            <p style={{ ...DISPLAY, fontSize: 48, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 20 }}>
        {/* Pedidos recientes */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem' }}>
          <h2 style={{ ...DISPLAY, fontSize: 24, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Pedidos recientes
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {pedidosRecientes?.map((p: any) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--border)' }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{p.profiles?.nombre ?? 'Usuario'}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{p.figuritas?.length ?? 0} figuritas · {new Date(p.created_at).toLocaleDateString('es-PE')}</p>
                </div>
                <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 99, background: p.estado === 'entregado' ? '#00A85920' : '#FFE00020', color: p.estado === 'entregado' ? '#00A859' : '#FFE000', fontWeight: 600 }}>
                  {p.estado}
                </span>
              </div>
            ))}
            {!pedidosRecientes?.length && <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>No hay pedidos aún.</p>}
          </div>
        </div>

        {/* Usuarios recientes */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem' }}>
          <h2 style={{ ...DISPLAY, fontSize: 24, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Usuarios recientes
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {usuariosRecientes?.map((u: any) => (
              <div key={u.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--border)' }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{u.nombre}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{u.email}</p>
                </div>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{new Date(u.created_at).toLocaleDateString('es-PE')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
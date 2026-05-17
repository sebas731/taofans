import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
//import EliminarUsuarioBtn from '@/components/admin/EliminarUsuarioBtn'

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
        <h1 style={{ ...DISPLAY, fontSize: 48, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
          USUARIOS ({usuarios?.length ?? 0})
        </h1>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        {/* Header tabla */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr auto', gap: 12, padding: '12px 16px', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
          {['Nombre', 'Email', 'Figuritas', 'Pedidos', 'Registro', 'Acciones'].map((h) => (
            <p key={h} style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</p>
          ))}
        </div>

        {/* Filas */}
        {usuarios?.map((u: any) => (
          <div key={u.id} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr auto', gap: 12, padding: '14px 16px', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{u.nombre}</p>
              {u.whatsapp && <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>📱 {u.whatsapp}</p>}
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{u.email}</p>
            <p style={{ ...DISPLAY, fontSize: 20, fontWeight: 900, color: '#00A859' }}>{u.total_tengo}</p>
            <p style={{ ...DISPLAY, fontSize: 20, fontWeight: 900, color: '#E8003D' }}>{u.total_pedidos}</p>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{new Date(u.created_at).toLocaleDateString('es-PE')}</p>
            <div style={{ display: 'flex', gap: 6 }}>
              <Link href={`/admin/usuarios/${u.id}`}
                style={{ fontSize: 12, padding: '5px 10px', borderRadius: 6, background: '#00C2E020', color: '#00C2E0', textDecoration: 'none', fontWeight: 600 }}>
                Ver
              </Link>
          <button
                onClick={() => alert('Eliminar: ' + u.nombre)}
                style={{ fontSize: 12, padding: '5px 10px', borderRadius: 6, background: '#E8003D20', color: '#E8003D', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                Eliminar
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
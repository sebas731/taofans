import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const DISPLAY = { fontFamily: "'Barlow Condensed', sans-serif" }

export default async function AdminUsuarioDetallePage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const [{ data: usuario }, { data: pedidos }, { data: figuritas }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', params.id).single(),
    supabase.from('pedidos').select('*').eq('user_id', params.id).order('created_at', { ascending: false }),
    supabase.from('figuritas_tengo').select('codigo').eq('user_id', params.id),
  ])

  if (!usuario) notFound()

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '2rem' }}>
        <Link href="/admin/usuarios"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '7px 14px', textDecoration: 'none', color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600 }}>
          ← Volver
        </Link>
        <div>
          <h1 style={{ ...DISPLAY, fontSize: 36, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase' }}>{usuario.nombre}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{usuario.email} {usuario.whatsapp && `· 📱 ${usuario.whatsapp}`}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: '2rem' }}>
        {[
          { label: 'Figuritas que tiene', value: figuritas?.length ?? 0, color: '#00A859' },
          { label: 'Pedidos enviados', value: pedidos?.length ?? 0, color: '#E8003D' },
          { label: 'Le faltan', value: 993 - (figuritas?.length ?? 0), color: '#FFE000' },
        ].map((s) => (
          <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: s.color }} />
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>{s.label}</p>
            <p style={{ ...DISPLAY, fontSize: 40, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Pedidos */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ ...DISPLAY, fontSize: 24, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Pedidos ({pedidos?.length ?? 0})
        </h2>
        {pedidos?.length === 0 && <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>No ha enviado pedidos aún.</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {pedidos?.map((p: any) => (
            <div key={p.id} style={{ padding: '12px 16px', background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{p.figuritas?.length ?? 0} figuritas solicitadas</p>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 99, background: '#FFE00020', color: '#FFE000', fontWeight: 600 }}>{p.estado}</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                Códigos: {(p.figuritas as string[])?.slice(0, 10).join(', ')}
                {(p.figuritas as string[])?.length > 10 && ` ... y ${p.figuritas.length - 10} más`}
              </p>
              {p.mensaje && <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4, fontStyle: 'italic' }}>"{p.mensaje}"</p>}
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 6 }}>{new Date(p.created_at).toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Figuritas que tiene */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem' }}>
        <h2 style={{ ...DISPLAY, fontSize: 24, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Figuritas que tiene ({figuritas?.length ?? 0})
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {figuritas?.map((f) => (
            <span key={f.codigo} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, background: '#00A85920', color: '#00A859', fontWeight: 600 }}>
              {f.codigo}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
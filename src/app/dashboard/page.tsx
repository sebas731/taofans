import FiguitasSelector from '@/components/FiguitasSelector'

const DEMO_MODE = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')

export default async function DashboardPage() {
  let numerosFaltantes: number[] = []

  if (!DEMO_MODE) {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { data: faltantes } = await supabase
      .from('figuritas_faltantes')
      .select('numero')
      .eq('user_id', user!.id)
    numerosFaltantes = faltantes?.map((f) => f.numero) ?? []
  }

  return (
    <div>
      {DEMO_MODE && (
        <div className="mb-4 bg-brand-500/10 border border-brand-500/30 text-brand-300 text-sm rounded-xl px-4 py-3">
          ⚡ <strong>Modo Demo</strong> — Las figuritas no se guardan hasta conectar Supabase.
        </div>
      )}
      <div className="mb-8">
        <h1 style={{ ...{ fontFamily: "'Barlow Condensed', sans-serif" }, fontSize: 48, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
          MIS FALTANTES
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>
          Haz clic en cada figurita que te falta. Después envía el pedido a tu vendedor.
        </p>
      </div>
      <FiguitasSelector initialFaltantes={numerosFaltantes} userId="demo-user" />
    </div>
  )
}

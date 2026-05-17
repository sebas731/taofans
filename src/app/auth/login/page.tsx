'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    
    // 1. Intentar iniciar sesión en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError('Email o contraseña incorrectos.')
      setLoading(false)
      return
    }

    if (authData?.user) {
      try {
        // 2. Consultar directamente a la base de datos si el ID es de un administrador
        const { data: checkAdmin, error: rpcError } = await supabase.rpc('es_admin', { 
          usuario_id: authData.user.id 
        })

        // Si la función devuelve true, te mandamos directo a /admin
        if (!rpcError && checkAdmin === true) {
          router.push('/admin')
          router.refresh()
          return
        }
      } catch (err) {
        console.error('Error al validar el rol de administrador:', err)
      }

      // 3. Si no es administrador (o falló el RPC), va al dashboard estándar
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="glass rounded-2xl p-8 max-w-md w-full mx-auto">
      <h2 className="font-display text-4xl text-white mb-1">BIENVENIDO</h2>
      <p className="text-white/50 mb-8 text-sm">Ingresá a tu cuenta para ver tus faltantes</p>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="text-white/60 text-sm block mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="input-field"
          />
        </div>

        <div>
          <label className="text-white/60 text-sm block mb-1">Contraseña</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-field"
              style={{ paddingRight: 44 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'rgba(255,255,255,0.5)' }}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
          {loading ? 'Ingresando...' : 'Entrar →'}
        </button>
      </form>

      <p className="text-white/40 text-sm text-center mt-6">
        ¿No tenés cuenta?{' '}
        <Link href="/auth/registro" className="text-brand-400 hover:text-brand-300">
          Registrate gratis
        </Link>
      </p>
    </div>
  )
}
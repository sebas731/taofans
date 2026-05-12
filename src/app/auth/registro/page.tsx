'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function RegistroPage() {
  const router = useRouter()
  const [form, setForm] = useState({ nombre: '', email: '', whatsapp: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirm) {
      setError('Las contraseñas no coinciden.')
      return
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    setLoading(true)
    const supabase = createClient()

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { nombre: form.nombre, whatsapp: form.whatsapp },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      // Guardar perfil en tabla profiles
      await supabase.from('profiles').upsert({
        id: data.user.id,
        nombre: form.nombre,
        email: form.email,
        whatsapp: form.whatsapp,
      })
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="glass rounded-2xl p-8">
      <h2 className="font-display text-4xl text-white mb-1">CREAR CUENTA</h2>
      <p className="text-white/50 mb-8 text-sm">Gratis y sin complicaciones</p>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="text-white/60 text-sm block mb-1">Tu nombre</label>
          <input name="nombre" type="text" required value={form.nombre} onChange={handleChange}
            placeholder="Juan Pérez" className="input-field" />
        </div>

        <div>
          <label className="text-white/60 text-sm block mb-1">Email</label>
          <input name="email" type="email" required value={form.email} onChange={handleChange}
            placeholder="tu@email.com" className="input-field" />
        </div>

        <div>
          <label className="text-white/60 text-sm block mb-1">
            WhatsApp <span className="text-white/30">(opcional, para que te contactemos)</span>
          </label>
          <input name="whatsapp" type="tel" value={form.whatsapp} onChange={handleChange}
            placeholder="5491112345678" className="input-field" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-white/60 text-sm block mb-1">Contraseña</label>
            <input name="password" type="password" required value={form.password} onChange={handleChange}
              placeholder="••••••••" className="input-field" />
          </div>
          <div>
            <label className="text-white/60 text-sm block mb-1">Confirmar</label>
            <input name="confirm" type="password" required value={form.confirm} onChange={handleChange}
              placeholder="••••••••" className="input-field" />
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
          {loading ? 'Creando cuenta...' : 'Crear cuenta gratis →'}
        </button>
      </form>

      <p className="text-white/40 text-sm text-center mt-6">
        ¿Ya tenés cuenta?{' '}
        <Link href="/auth/login" className="text-brand-400 hover:text-brand-300">
          Iniciá sesión
        </Link>
      </p>
    </div>
  )
}

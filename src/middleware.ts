import { NextResponse, type NextRequest } from 'next/server'

const DEMO_MODE = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')

export async function middleware(request: NextRequest) {
  const { createServerClient } = await import('@supabase/ssr')
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (DEMO_MODE) {
    return NextResponse.next({ request })
  }

  // 1. Si el usuario intenta entrar a /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      return NextResponse.redirect(url)
    }

    // Verificar en la base de datos si es administrador usando el RPC seguro
    const { data: esAdmin } = await supabase.rpc('es_admin', { usuario_id: user.id })

    if (!esAdmin) {
      // Si está logueado pero NO es admin, lo rebotamos al dashboard común
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }

    return supabaseResponse
  }

  // 2. Si no está logueado e intenta entrar al dashboard
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // 3. Si el usuario YA está logueado e intenta ir a las páginas de /auth (Login/Registro)
  if (user && request.nextUrl.pathname.startsWith('/auth')) {
    // Verificamos si es admin para saber a dónde redirigir desde el login
    const { data: esAdmin } = await supabase.rpc('es_admin', { usuario_id: user.id })

    const url = request.nextUrl.clone()
    url.pathname = esAdmin ? '/admin' : '/dashboard' // <-- Redirección inteligente
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*', '/admin/:path*'],
}
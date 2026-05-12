import { NextResponse, type NextRequest } from 'next/server'

// MODO DEMO: sin autenticación para ver el diseño local
// Cuando conectes Supabase, reemplazá este archivo con middleware.production.ts

const DEMO_MODE = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')

export async function middleware(request: NextRequest) {
  if (DEMO_MODE) {
    // En modo demo dejamos pasar todo sin verificar auth
    return NextResponse.next({ request })
  }

  // --- Producción: activar cuando tengas Supabase real ---
  const { createServerClient } = await import('@supabase/ssr')
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
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

  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  if (user && request.nextUrl.pathname.startsWith('/auth')) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
}

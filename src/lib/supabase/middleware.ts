import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip Supabase auth processing entirely for public static routes
  // This avoids sending large auth cookies in headers for pages that don't need them
  const publicPaths = [
    '/',
    '/about',
    '/contact',
    '/features',
    '/pricing',
    '/corporate',
    '/affiliate',
    '/catalog',
    '/use-cases',
  ]
  const isPublicStatic =
    publicPaths.some((p) => pathname === p || pathname.startsWith(p + '/')) &&
    !pathname.startsWith('/dashboard') &&
    !pathname.startsWith('/orders') &&
    !pathname.startsWith('/wallet') &&
    !pathname.startsWith('/integrations') &&
    !pathname.startsWith('/reports')

  if (isPublicStatic) {
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const protectedPaths = ['/dashboard', '/orders', '/wallet', '/integrations', '/reports']
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  )

  if (isProtectedPath && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  const authPaths = ['/auth/login', '/auth/signup']
  const isAuthPath = authPaths.some((path) =>
    pathname.startsWith(path),
  )

  if (isAuthPath && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

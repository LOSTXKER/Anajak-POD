import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        try {
          await prisma.profile.upsert({
            where: { id: user.id },
            update: {
              email: user.email!,
              name: user.user_metadata?.name || user.user_metadata?.full_name || user.email?.split('@')[0],
              avatarUrl: user.user_metadata?.avatar_url,
            },
            create: {
              id: user.id,
              email: user.email!,
              name: user.user_metadata?.name || user.user_metadata?.full_name || user.email?.split('@')[0],
              avatarUrl: user.user_metadata?.avatar_url,
            },
          })
        } catch {
          // Profile creation failed but auth succeeded -- don't block login
        }
      }
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_error`)
}

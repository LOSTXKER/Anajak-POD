import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getWallet } from '@/lib/db/wallet'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ balance: 0 })
    }

    const wallet = await getWallet(user.id)
    return NextResponse.json({ balance: wallet ? Number(wallet.balance) : 0 })
  } catch {
    return NextResponse.json({ balance: 0 })
  }
}

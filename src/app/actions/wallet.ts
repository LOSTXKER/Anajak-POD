'use server'

import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const WithdrawalSchema = z.object({
  amount: z.number().min(100, 'จำนวนเงินขั้นต่ำ 100 บาท'),
  bankAccount: z.string().min(10, 'กรุณากรอกเลขบัญชีธนาคาร'),
  bankName: z.string().min(1, 'กรุณาเลือกธนาคาร'),
})

export type WalletActionState = {
  error?: string
  success?: boolean
} | null

export async function requestWithdrawal(
  _prevState: WalletActionState,
  formData: FormData,
): Promise<WalletActionState> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'กรุณาเข้าสู่ระบบ' }
  }

  const parsed = WithdrawalSchema.safeParse({
    amount: Number(formData.get('amount')),
    bankAccount: formData.get('bankAccount'),
    bankName: formData.get('bankName'),
  })

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }
  }

  const wallet = await prisma.wallet.findUnique({
    where: { profileId: user.id },
  })

  if (!wallet || Number(wallet.balance) < parsed.data.amount) {
    return { error: 'ยอดเงินในกระเป๋าไม่เพียงพอ' }
  }

  await prisma.$transaction([
    prisma.wallet.update({
      where: { profileId: user.id },
      data: {
        balance: { decrement: parsed.data.amount },
      },
    }),
    prisma.transaction.create({
      data: {
        walletId: wallet.id,
        amount: -parsed.data.amount,
        type: 'WITHDRAWAL',
      },
    }),
  ])

  revalidatePath('/wallet')
  return { success: true }
}

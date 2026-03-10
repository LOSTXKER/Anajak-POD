'use server'

import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const UpdateProfileSchema = z.object({
  name: z.string().min(1, 'กรุณากรอกชื่อ'),
  phone: z.string().optional(),
})

export type ProfileState = {
  error?: string
  success?: boolean
} | null

export async function updateProfile(
  _prevState: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'กรุณาเข้าสู่ระบบ' }
  }

  const parsed = UpdateProfileSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
  })

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }
  }

  await prisma.profile.upsert({
    where: { id: user.id },
    update: {
      name: parsed.data.name,
      phone: parsed.data.phone,
    },
    create: {
      id: user.id,
      email: user.email!,
      name: parsed.data.name,
      phone: parsed.data.phone,
    },
  })

  revalidatePath('/dashboard')
  return { success: true }
}

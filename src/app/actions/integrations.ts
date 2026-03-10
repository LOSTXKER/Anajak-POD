'use server'

import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const ConnectPlatformSchema = z.object({
  platform: z.string().min(1),
  shopName: z.string().min(1, 'กรุณากรอกชื่อร้าน'),
  apiKey: z.string().optional(),
})

export async function connectPlatform(data: z.infer<typeof ConnectPlatformSchema>) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'กรุณาเข้าสู่ระบบ' }
  }

  const validated = ConnectPlatformSchema.parse(data)

  const integration = await prisma.integration.create({
    data: {
      profileId: user.id,
      platform: validated.platform,
      shopName: validated.shopName,
      apiKey: validated.apiKey,
      isConnected: true,
    },
  })

  revalidatePath('/integrations')
  return { success: true, integration }
}

export async function disconnectPlatform(integrationId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'กรุณาเข้าสู่ระบบ' }
  }

  const existing = await prisma.integration.findUnique({
    where: { id: integrationId },
  })

  if (!existing || existing.profileId !== user.id) {
    return { error: 'ไม่พบการเชื่อมต่อ' }
  }

  await prisma.integration.update({
    where: { id: integrationId },
    data: { isConnected: false },
  })

  revalidatePath('/integrations')
  return { success: true }
}

export async function reconnectPlatform(integrationId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'กรุณาเข้าสู่ระบบ' }
  }

  const existing = await prisma.integration.findUnique({
    where: { id: integrationId },
  })

  if (!existing || existing.profileId !== user.id) {
    return { error: 'ไม่พบการเชื่อมต่อ' }
  }

  await prisma.integration.update({
    where: { id: integrationId },
    data: { isConnected: true },
  })

  revalidatePath('/integrations')
  return { success: true }
}

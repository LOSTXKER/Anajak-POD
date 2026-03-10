'use server'

import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const SaveDesignSchema = z.object({
  productId: z.string().uuid(),
  canvasData: z.unknown(),
  previewUrl: z.string().url().optional(),
})

const UpdateDesignSchema = SaveDesignSchema.extend({
  id: z.string().uuid(),
})

export async function saveDesign(data: z.infer<typeof SaveDesignSchema>) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'กรุณาเข้าสู่ระบบเพื่อบันทึกดีไซน์' }
  }

  const validated = SaveDesignSchema.parse(data)

  const design = await prisma.design.create({
    data: {
      profileId: user.id,
      productId: validated.productId,
      canvasData: validated.canvasData as object,
      previewUrl: validated.previewUrl,
      status: 'draft',
    },
  })

  revalidatePath('/dashboard/library')
  return { success: true, design }
}

export async function updateDesign(data: z.infer<typeof UpdateDesignSchema>) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'กรุณาเข้าสู่ระบบ' }
  }

  const validated = UpdateDesignSchema.parse(data)

  const existing = await prisma.design.findUnique({ where: { id: validated.id } })
  if (!existing || existing.profileId !== user.id) {
    return { error: 'ไม่พบดีไซน์' }
  }

  const design = await prisma.design.update({
    where: { id: validated.id },
    data: {
      productId: validated.productId,
      canvasData: validated.canvasData as object,
      previewUrl: validated.previewUrl,
    },
  })

  revalidatePath('/dashboard/library')
  return { success: true, design }
}

export async function deleteDesign(designId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'กรุณาเข้าสู่ระบบ' }
  }

  const existing = await prisma.design.findUnique({ where: { id: designId } })
  if (!existing || existing.profileId !== user.id) {
    return { error: 'ไม่พบดีไซน์' }
  }

  await prisma.design.delete({ where: { id: designId } })

  revalidatePath('/dashboard/library')
  return { success: true }
}

export async function publishDesign(designId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'กรุณาเข้าสู่ระบบ' }
  }

  const existing = await prisma.design.findUnique({ where: { id: designId } })
  if (!existing || existing.profileId !== user.id) {
    return { error: 'ไม่พบดีไซน์' }
  }

  const design = await prisma.design.update({
    where: { id: designId },
    data: { status: 'published' },
  })

  revalidatePath('/dashboard/library')
  return { success: true, design }
}

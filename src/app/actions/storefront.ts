'use server'

import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const StorefrontSchema = z.object({
  storeUrl: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  primaryColor: z.string().optional(),
  shippingFee: z.number().min(0).optional(),
  freeShipMinimum: z.number().min(0).optional(),
  fbPixelId: z.string().optional(),
  gaTrackingId: z.string().optional(),
  lineTagId: z.string().optional(),
})

export type StorefrontState = {
  error?: string
  success?: boolean
} | null

export async function getStorefrontSettings() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const seller = await prisma.seller.findUnique({
    where: { profileId: user.id },
    include: { storefront: true },
  })

  return seller?.storefront ?? null
}

export async function saveStorefrontSettings(
  _prevState: StorefrontState,
  formData: FormData,
): Promise<StorefrontState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'กรุณาเข้าสู่ระบบ' }

  const parsed = StorefrontSchema.safeParse({
    storeUrl: formData.get('storeUrl') || undefined,
    title: formData.get('title') || undefined,
    description: formData.get('description') || undefined,
    primaryColor: formData.get('primaryColor') || undefined,
    shippingFee: formData.get('shippingFee') ? Number(formData.get('shippingFee')) : undefined,
    freeShipMinimum: formData.get('freeShipMinimum') ? Number(formData.get('freeShipMinimum')) : undefined,
    fbPixelId: formData.get('fbPixelId') || undefined,
    gaTrackingId: formData.get('gaTrackingId') || undefined,
    lineTagId: formData.get('lineTagId') || undefined,
  })

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }
  }

  let seller = await prisma.seller.findUnique({ where: { profileId: user.id } })

  if (!seller) {
    seller = await prisma.seller.create({
      data: {
        profileId: user.id,
        storeName: parsed.data.title || 'My Store',
        storeSlug: `store-${user.id.substring(0, 8)}`,
      },
    })
  }

  await prisma.storefrontSettings.upsert({
    where: { sellerId: seller.id },
    update: parsed.data,
    create: {
      sellerId: seller.id,
      ...parsed.data,
    },
  })

  revalidatePath('/storefront')
  return { success: true }
}

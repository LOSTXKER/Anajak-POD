import { createClient } from '@/lib/supabase/server'

export const STORAGE_BUCKETS = {
  DESIGNS: 'designs',
  PRODUCTS: 'products',
  AVATARS: 'avatars',
} as const

export async function uploadDesignImage(
  file: File,
  userId: string,
): Promise<{ url: string } | { error: string }> {
  const supabase = await createClient()

  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${Date.now()}.${fileExt}`

  const { error } = await supabase.storage
    .from(STORAGE_BUCKETS.DESIGNS)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    return { error: `อัพโหลดไฟล์ไม่สำเร็จ: ${error.message}` }
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(STORAGE_BUCKETS.DESIGNS).getPublicUrl(fileName)

  return { url: publicUrl }
}

export async function uploadAvatar(
  file: File,
  userId: string,
): Promise<{ url: string } | { error: string }> {
  const supabase = await createClient()

  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/avatar.${fileExt}`

  const { error } = await supabase.storage
    .from(STORAGE_BUCKETS.AVATARS)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true,
    })

  if (error) {
    return { error: `อัพโหลดรูปโปรไฟล์ไม่สำเร็จ: ${error.message}` }
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(STORAGE_BUCKETS.AVATARS).getPublicUrl(fileName)

  return { url: publicUrl }
}

export async function deleteDesignImage(
  filePath: string,
): Promise<{ success: boolean } | { error: string }> {
  const supabase = await createClient()

  const { error } = await supabase.storage
    .from(STORAGE_BUCKETS.DESIGNS)
    .remove([filePath])

  if (error) {
    return { error: `ลบไฟล์ไม่สำเร็จ: ${error.message}` }
  }

  return { success: true }
}

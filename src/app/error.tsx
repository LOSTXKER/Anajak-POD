'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('App error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-red-50 px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">!</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">เกิดข้อผิดพลาด</h1>
        <p className="text-slate-500 mb-8">
          ขออภัย เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้ง
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-ci-blue text-white rounded-xl font-bold hover:bg-ci-blueDark transition-colors"
        >
          ลองใหม่
        </button>
      </div>
    </div>
  )
}

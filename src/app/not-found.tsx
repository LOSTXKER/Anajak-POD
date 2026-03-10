import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">404</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">ไม่พบหน้านี้</h1>
        <p className="text-slate-500 mb-8">
          หน้าที่คุณต้องการอาจถูกย้าย ลบ หรือไม่เคยมีอยู่
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-ci-blue text-white rounded-xl font-bold hover:bg-ci-blueDark transition-colors"
          >
            กลับหน้าแรก
          </Link>
          <Link
            href="/catalog"
            className="px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors"
          >
            ดูสินค้าทั้งหมด
          </Link>
        </div>
      </div>
    </div>
  )
}

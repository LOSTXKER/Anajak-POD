import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ข้อกำหนดการใช้งาน',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/" className="text-ci-blue text-sm font-medium hover:underline mb-8 inline-block">&larr; กลับหน้าแรก</Link>
        <h1 className="text-3xl font-bold text-slate-800 mb-8">ข้อกำหนดการใช้งาน</h1>
        <div className="prose prose-slate max-w-none bg-white rounded-2xl p-8 border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mt-2">1. การยอมรับข้อกำหนด</h2>
          <p className="text-slate-600">การใช้งานเว็บไซต์ anajak.com ถือว่าท่านยอมรับข้อกำหนดและเงื่อนไขเหล่านี้ทั้งหมด</p>
          <h2 className="text-lg font-bold text-slate-800 mt-6">2. บริการของเรา</h2>
          <p className="text-slate-600">Anajak POD ให้บริการ Print on Demand สำหรับการออกแบบและสั่งผลิตเสื้อยืดและสินค้าอื่นๆ ตามความต้องการ</p>
          <h2 className="text-lg font-bold text-slate-800 mt-6">3. การสั่งซื้อและชำระเงิน</h2>
          <p className="text-slate-600">คำสั่งซื้อจะถือว่าสมบูรณ์เมื่อท่านได้ชำระเงินเรียบร้อยแล้ว เราขอสงวนสิทธิ์ในการปฏิเสธคำสั่งซื้อที่ไม่เหมาะสม</p>
          <h2 className="text-lg font-bold text-slate-800 mt-6">4. ทรัพย์สินทางปัญญา</h2>
          <p className="text-slate-600">ลิขสิทธิ์ในดีไซน์ที่ท่านอัปโหลดเป็นของท่าน ท่านรับรองว่าดีไซน์ดังกล่าวไม่ละเมิดสิทธิ์ของบุคคลอื่น</p>
          <h2 className="text-lg font-bold text-slate-800 mt-6">5. ข้อจำกัดความรับผิดชอบ</h2>
          <p className="text-slate-600">เราจะไม่รับผิดชอบต่อความเสียหายที่เกิดจากความล่าช้าในการจัดส่ง หรือเหตุสุดวิสัยอื่นๆ</p>
          <p className="text-slate-400 text-sm mt-8">อัปเดตล่าสุด: มีนาคม 2026</p>
        </div>
      </div>
    </div>
  )
}

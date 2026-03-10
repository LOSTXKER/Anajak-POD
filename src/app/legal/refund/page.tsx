import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'นโยบายคืนเงิน',
}

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/" className="text-ci-blue text-sm font-medium hover:underline mb-8 inline-block">&larr; กลับหน้าแรก</Link>
        <h1 className="text-3xl font-bold text-slate-800 mb-8">นโยบายคืนเงินและเปลี่ยนสินค้า</h1>
        <div className="prose prose-slate max-w-none bg-white rounded-2xl p-8 border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mt-2">1. เงื่อนไขการคืนเงิน</h2>
          <p className="text-slate-600">เนื่องจากสินค้าของเราเป็นสินค้าสั่งทำพิเศษ (Made to Order) เราจึงไม่สามารถรับคืนสินค้าได้ในกรณีทั่วไป ยกเว้นกรณีที่สินค้ามีข้อบกพร่องจากการผลิต</p>
          <h2 className="text-lg font-bold text-slate-800 mt-6">2. สินค้าที่มีข้อบกพร่อง</h2>
          <p className="text-slate-600">หากสินค้าที่ได้รับมีข้อบกพร่องจากการผลิต (เช่น สีผิดเพี้ยน งานพิมพ์ไม่สมบูรณ์ ขนาดไม่ตรง) กรุณาแจ้งเราภายใน 7 วัน พร้อมรูปถ่ายสินค้า เราจะดำเนินการผลิตใหม่หรือคืนเงินให้</p>
          <h2 className="text-lg font-bold text-slate-800 mt-6">3. การยกเลิกคำสั่งซื้อ</h2>
          <p className="text-slate-600">ท่านสามารถยกเลิกคำสั่งซื้อได้ก่อนเข้าสู่กระบวนการผลิต หากสั่งซื้อเข้าสู่ขั้นตอนการผลิตแล้ว จะไม่สามารถยกเลิกหรือคืนเงินได้</p>
          <h2 className="text-lg font-bold text-slate-800 mt-6">4. ระยะเวลาคืนเงิน</h2>
          <p className="text-slate-600">เงินจะถูกคืนภายใน 7-14 วันทำการ ผ่านช่องทางการชำระเงินเดิมที่ท่านใช้</p>
          <h2 className="text-lg font-bold text-slate-800 mt-6">5. การติดต่อ</h2>
          <p className="text-slate-600">หากมีปัญหาเกี่ยวกับคำสั่งซื้อ กรุณาติดต่อเราผ่านหน้า <Link href="/contact" className="text-ci-blue hover:underline">ติดต่อเรา</Link></p>
          <p className="text-slate-400 text-sm mt-8">อัปเดตล่าสุด: มีนาคม 2026</p>
        </div>
      </div>
    </div>
  )
}

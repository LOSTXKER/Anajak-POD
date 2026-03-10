import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'นโยบายความเป็นส่วนตัว',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/" className="text-ci-blue text-sm font-medium hover:underline mb-8 inline-block">&larr; กลับหน้าแรก</Link>
        <h1 className="text-3xl font-bold text-slate-800 mb-8">นโยบายความเป็นส่วนตัว</h1>
        <div className="prose prose-slate max-w-none bg-white rounded-2xl p-8 border border-slate-100">
          <p className="text-slate-600 leading-relaxed">บริษัท อนาจักร จำกัด (&quot;เรา&quot;) ให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของท่าน</p>
          <h2 className="text-lg font-bold text-slate-800 mt-6">1. ข้อมูลที่เราเก็บรวบรวม</h2>
          <p className="text-slate-600">เราเก็บรวบรวมข้อมูลที่จำเป็นสำหรับการให้บริการ ได้แก่ ชื่อ-นามสกุล อีเมล เบอร์โทรศัพท์ ที่อยู่จัดส่ง และข้อมูลการชำระเงิน</p>
          <h2 className="text-lg font-bold text-slate-800 mt-6">2. วัตถุประสงค์การใช้ข้อมูล</h2>
          <p className="text-slate-600">ข้อมูลของท่านจะถูกใช้เพื่อ: ดำเนินการสั่งซื้อและจัดส่งสินค้า, ติดต่อสื่อสารเกี่ยวกับคำสั่งซื้อ, ปรับปรุงบริการของเรา</p>
          <h2 className="text-lg font-bold text-slate-800 mt-6">3. การรักษาความปลอดภัย</h2>
          <p className="text-slate-600">เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลของท่าน รวมถึงการเข้ารหัส SSL และการจำกัดการเข้าถึงข้อมูล</p>
          <h2 className="text-lg font-bold text-slate-800 mt-6">4. สิทธิของท่าน</h2>
          <p className="text-slate-600">ท่านมีสิทธิในการเข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลของท่าน โดยติดต่อเราผ่านช่องทางที่กำหนด</p>
          <p className="text-slate-400 text-sm mt-8">อัปเดตล่าสุด: มีนาคม 2026</p>
        </div>
      </div>
    </div>
  )
}

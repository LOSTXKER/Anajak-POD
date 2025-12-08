import Link from 'next/link';
import { Facebook, Instagram, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';

export default function LandingFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & About */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-white text-slate-900 p-1.5 rounded-lg font-bold text-xl leading-none">
                POD
              </div>
              <div className="font-bold text-xl tracking-tight text-white">
                Anajak<span className="text-ci-blue">POD</span>
              </div>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              แพลตฟอร์ม Print on Demand อันดับ 1 ของไทย ผลิตโดยโรงงาน Anajak T-Shirt 
              ประสบการณ์กว่า 20 ปี คุณภาพระดับส่งออก สั่งง่าย ส่งไว ไม่มีขั้นต่ำ
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-ci-blue transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-ci-blue transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-ci-blue transition-colors">
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">เมนูลัด</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/catalog" className="hover:text-ci-blue transition-colors">แคตตาล็อกสินค้า</Link>
              </li>
              <li>
                <Link href="/designer" className="hover:text-ci-blue transition-colors">เริ่มออกแบบ</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-ci-blue transition-colors">ราคาและแพคเกจ</Link>
              </li>
              <li>
                <Link href="/corporate" className="hover:text-ci-blue transition-colors">สั่งผลิตเพื่อองค์กร</Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-ci-blue transition-colors">ฟีเจอร์ทั้งหมด</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">ช่วยเหลือ</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="hover:text-ci-blue transition-colors">วิธีการสั่งซื้อ</Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-ci-blue transition-colors">การจัดส่งสินค้า</Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-ci-blue transition-colors">การรับประกัน/เปลี่ยนคืน</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-ci-blue transition-colors">คำถามที่พบบ่อย</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ci-blue transition-colors">ติดต่อเรา</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">ติดต่อเรา</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-ci-blue shrink-0 mt-1" />
                <span>
                  123 ถนนตัวอย่าง แขวงตัวอย่าง<br />
                  เขตตัวอย่าง กรุงเทพฯ 10XXX
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-ci-blue shrink-0" />
                <a href="tel:02-123-4567" className="hover:text-white transition-colors">02-123-4567</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-ci-blue shrink-0" />
                <a href="mailto:hello@anajakpod.com" className="hover:text-white transition-colors">hello@anajakpod.com</a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-ci-blue shrink-0" />
                <span className="text-green-400">Line: @anajakpod</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© 2025 Anajak POD by Anajak T-Shirt Co., Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


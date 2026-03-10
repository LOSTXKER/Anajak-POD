import Link from 'next/link';
import { Facebook, Instagram, MessageCircle, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & About */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="bg-white text-slate-900 p-2 rounded-xl font-heading font-bold text-lg leading-none">
                POD
              </div>
              <div className="font-heading font-bold text-xl tracking-tight text-white">
                Anajak<span className="text-ci-blue">POD</span>
              </div>
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed text-sm">
              แพลตฟอร์ม Print on Demand อันดับ 1 ของไทย 
              ผลิตโดยโรงงาน Anajak T-Shirt ประสบการณ์กว่า 20 ปี 
              คุณภาพระดับส่งออก สั่งง่าย ส่งไว ไม่มีขั้นต่ำ
            </p>
            <div className="flex gap-3">
              <Link 
                href="#" 
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-ci-blue transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link 
                href="#" 
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-ci-blue transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link 
                href="#" 
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-green-500 transition-colors"
                aria-label="LINE"
              >
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">สินค้าและบริการ</h3>
            <ul className="space-y-3">
              {[
                { href: '/catalog', label: 'แคตตาล็อกสินค้า' },
                { href: '/designer', label: 'เริ่มออกแบบ' },
                { href: '/pricing', label: 'ราคาและแพคเกจ' },
                { href: '/corporate', label: 'สั่งผลิตเพื่อองค์กร' },
                { href: '/features', label: 'ฟีเจอร์ทั้งหมด' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">ช่วยเหลือ</h3>
            <ul className="space-y-3">
              {[
                { href: '/contact', label: 'วิธีการสั่งซื้อ' },
                { href: '/contact', label: 'การจัดส่งสินค้า' },
                { href: '/contact', label: 'การรับประกัน/เปลี่ยนคืน' },
                { href: '/contact', label: 'คำถามที่พบบ่อย' },
                { href: '/contact', label: 'ติดต่อเรา' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">ติดต่อเรา</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-ci-blue shrink-0 mt-0.5" />
                <span className="text-sm">
                  123 ถนนตัวอย่าง แขวงตัวอย่าง<br />
                  เขตตัวอย่าง กรุงเทพฯ 10XXX
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-ci-blue shrink-0" />
                <a href="tel:02-123-4567" className="text-sm hover:text-white transition-colors">02-123-4567</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-ci-blue shrink-0" />
                <a href="mailto:hello@anajakpod.com" className="text-sm hover:text-white transition-colors">hello@anajakpod.com</a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-green-400 shrink-0" />
                <span className="text-sm text-green-400 font-medium">Line: @anajakpod</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Parent Brand Link */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <span className="text-slate-500 text-sm">บริการจาก</span>
            <Link 
              href="https://anajak-tshirt.com" 
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors group"
            >
              <span className="font-bold text-white">🏭 Anajak T-Shirt Co., Ltd.</span>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </Link>
            <span className="text-slate-500 text-sm">โรงงานผลิตเสื้อยืดคุณภาพ ประสบการณ์กว่า 20 ปี</span>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {currentYear} Anajak POD. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/legal/privacy" className="hover:text-white transition-colors">
              นโยบายความเป็นส่วนตัว
            </Link>
            <Link href="/legal/terms" className="hover:text-white transition-colors">
              ข้อกำหนดการใช้งาน
            </Link>
            <Link href="/legal/refund" className="hover:text-white transition-colors">
              นโยบายคืนเงิน
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

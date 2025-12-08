'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-ci-blue text-white p-1.5 rounded-lg font-bold text-xl leading-none group-hover:scale-105 transition-transform">
              POD
            </div>
            <div className={`font-bold text-xl tracking-tight transition-colors ${isScrolled ? 'text-slate-800' : 'text-slate-800'}`}>
              Anajak<span className="text-ci-blue">POD</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/catalog" className="text-slate-600 hover:text-ci-blue font-medium transition-colors">
              แคตตาล็อก
            </Link>
            <Link href="/corporate" className="text-slate-600 hover:text-ci-blue font-medium transition-colors">
              องค์กร/B2B
            </Link>
            <Link href="/features" className="text-slate-600 hover:text-ci-blue font-medium transition-colors">
              ฟีเจอร์
            </Link>
            <Link href="/pricing" className="text-slate-600 hover:text-ci-blue font-medium transition-colors">
              ราคา
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/dashboard" className="text-slate-600 hover:text-ci-blue font-bold transition-colors">
              เข้าสู่ระบบ
            </Link>
            <Link 
              href="/designer" 
              className="bg-ci-blue hover:bg-ci-blueDark text-white px-5 py-2.5 rounded-xl font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg shadow-ci-blue/20 flex items-center gap-2"
            >
              เริ่มออกแบบเลย
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl p-4 flex flex-col gap-4">
          <Link href="/catalog" className="text-slate-600 font-medium p-2 hover:bg-slate-50 rounded-lg">
            แคตตาล็อก
          </Link>
          <Link href="/corporate" className="text-slate-600 font-medium p-2 hover:bg-slate-50 rounded-lg">
            องค์กร/B2B
          </Link>
          <Link href="/features" className="text-slate-600 font-medium p-2 hover:bg-slate-50 rounded-lg">
            ฟีเจอร์
          </Link>
          <Link href="/pricing" className="text-slate-600 font-medium p-2 hover:bg-slate-50 rounded-lg">
            ราคา
          </Link>
          <hr className="border-slate-100" />
          <Link href="/dashboard" className="text-slate-600 font-bold p-2 hover:bg-slate-50 rounded-lg">
            เข้าสู่ระบบ
          </Link>
          <Link 
            href="/designer" 
            className="bg-ci-blue text-white px-5 py-3 rounded-xl font-bold text-center"
          >
            เริ่มออกแบบเลย
          </Link>
        </div>
      )}
    </header>
  );
}


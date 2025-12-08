'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Palette } from 'lucide-react';

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

  const navLinks = [
    { href: '/catalog', label: 'แคตตาล็อก' },
    { href: '/corporate', label: 'องค์กร/B2B' },
    { href: '/features', label: 'ฟีเจอร์' },
    { href: '/pricing', label: 'ราคา' },
  ];

  return (
    <header 
      className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="bg-gradient-to-br from-ci-blue to-ci-blueDark text-white p-2 rounded-xl font-heading font-bold text-lg leading-none group-hover:scale-105 transition-transform shadow-lg shadow-ci-blue/20">
                POD
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-ci-yellow rounded-full border-2 border-white" />
            </div>
            <div className="font-heading font-bold text-xl tracking-tight">
              <span className="text-slate-800">Anajak</span>
              <span className="text-ci-blue">POD</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="px-4 py-2 text-slate-600 hover:text-ci-blue font-medium transition-colors rounded-lg hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link 
              href="/dashboard" 
              className="px-4 py-2 text-slate-600 hover:text-ci-blue font-bold transition-colors"
            >
              เข้าสู่ระบบ
            </Link>
            <Link 
              href="/designer" 
              className="bg-ci-blue hover:bg-ci-blueDark text-white px-5 py-2.5 rounded-xl font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg shadow-ci-blue/25 flex items-center gap-2"
            >
              <Palette className="w-4 h-4" />
              เริ่มออกแบบเลย
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col gap-1 mb-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-slate-600 font-medium p-3 hover:bg-slate-50 rounded-xl transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="border-t border-slate-100 pt-4 space-y-3">
            <Link 
              href="/dashboard" 
              className="block text-center text-slate-600 font-bold p-3 hover:bg-slate-50 rounded-xl transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              เข้าสู่ระบบ
            </Link>
            <Link 
              href="/designer" 
              className="block bg-ci-blue text-white px-5 py-4 rounded-xl font-bold text-center hover:bg-ci-blueDark transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              เริ่มออกแบบเลย
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

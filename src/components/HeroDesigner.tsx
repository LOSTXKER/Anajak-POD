'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Type, Plus, Trash2, ArrowRight, Check,
  Sparkles, ChevronRight, Palette
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Types
interface DesignElement {
  id: string;
  type: 'text';
  content: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
}

// Shirt colors with names
const SHIRT_COLORS = [
  { color: '#000000', name: 'ดำ' },
  { color: '#ffffff', name: 'ขาว' },
  { color: '#1e40af', name: 'น้ำเงิน' },
  { color: '#374151', name: 'เทาเข้ม' },
  { color: '#9ca3af', name: 'เทา' },
  { color: '#0ea5e9', name: 'ฟ้า' },
  { color: '#dc2626', name: 'แดง' },
  { color: '#7f1d1d', name: 'แดงเข้ม' },
  { color: '#ea580c', name: 'ส้ม' },
  { color: '#eab308', name: 'เหลือง' },
  { color: '#16a34a', name: 'เขียว' },
  { color: '#22c55e', name: 'เขียวอ่อน' },
  { color: '#06b6d4', name: 'ฟ้าน้ำทะเล' },
  { color: '#ec4899', name: 'ชมพู' },
  { color: '#a855f7', name: 'ม่วง' },
  { color: '#1e293b', name: 'กรมท่า' },
];

// Sizes
const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

// Print techniques
const TECHNIQUES = [
  { id: 'dtf', name: 'DTF', desc: 'ติดทนสุด', icon: '🎯' },
  { id: 'dtg', name: 'DTG', desc: 'ราคาเหมา', icon: '🖨️' },
];

// Mobile Preview Colors (Popular only)
const MOBILE_COLORS = [
  { color: '#ffffff', name: 'ขาว' },
  { color: '#000000', name: 'ดำ' },
  { color: '#1e40af', name: 'น้ำเงิน' },
  { color: '#dc2626', name: 'แดง' },
];

export default function HeroDesigner() {
  // States
  const [elements, setElements] = useState<DesignElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  // Product states
  const [shirtColor, setShirtColor] = useState('#ffffff');
  const [selectedSize, setSelectedSize] = useState('M');
  const [technique, setTechnique] = useState('dtf');
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');
  
  // UI states
  const [showTextInput, setShowTextInput] = useState(false);
  const [newText, setNewText] = useState('');
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Price calculation
  const basePrice = 120;
  const printPrice = elements.length > 0 ? (technique === 'dtf' ? 35 : 25) : 0;
  const totalPrice = basePrice + printPrice;

  // Focus input when shown
  useEffect(() => {
    if (showTextInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showTextInput]);

  // Add text element
  const addText = (text?: string) => {
    const newElement: DesignElement = {
      id: `el-${Date.now()}`,
      type: 'text',
      content: text || newText || 'ข้อความ',
      x: 20 + Math.random() * 60,
      y: 30 + Math.random() * 40,
      fontSize: 18,
      fontFamily: 'Kanit',
      color: shirtColor === '#ffffff' || shirtColor === '#eab308' || shirtColor === '#9ca3af' ? '#1e293b' : '#ffffff',
    };
    setElements([...elements, newElement]);
    setSelectedId(newElement.id);
    setShowTextInput(false);
    setNewText('');
  };

  // Delete selected
  const deleteSelected = () => {
    if (selectedId) {
      setElements(elements.filter(el => el.id !== selectedId));
      setSelectedId(null);
    }
  };

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent, el: DesignElement) => {
    e.stopPropagation();
    setSelectedId(el.id);
    setIsDragging(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - el.x,
        y: e.clientY - rect.top - el.y,
      });
    }
  };

  const handleDrag = (e: React.MouseEvent) => {
    if (!isDragging || !selectedId || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left - dragOffset.x, rect.width - 60));
    const y = Math.max(0, Math.min(e.clientY - rect.top - dragOffset.y, rect.height - 20));
    setElements(elements.map(el => el.id === selectedId ? { ...el, x, y } : el));
  };

  const handleDragEnd = () => setIsDragging(false);

  // Get color name
  const getColorName = (color: string) => SHIRT_COLORS.find(c => c.color === color)?.name || 'ขาว';

  return (
    <>
      {/* ==================== MOBILE VERSION ==================== */}
      <div className="lg:hidden">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-w-sm mx-auto">
          {/* Mobile T-Shirt Preview */}
          <div className="relative bg-gradient-to-br from-slate-100 to-slate-50 p-6">
            {/* Color picker - simple */}
            <div className="absolute top-4 right-4 flex gap-1.5 z-10">
              {MOBILE_COLORS.map((c) => (
                <button
                  key={c.color}
                  onClick={() => setShirtColor(c.color)}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${
                    shirtColor === c.color
                      ? 'border-ci-blue ring-2 ring-ci-blue/30 scale-110'
                      : 'border-slate-300'
                  }`}
                  style={{ backgroundColor: c.color }}
                />
              ))}
            </div>

            {/* T-Shirt */}
            <div className="relative w-full max-w-[240px] mx-auto aspect-[3/4]">
              <Image
                src="/shirt/front.png"
                alt="T-Shirt"
                fill
                className="object-contain drop-shadow-lg select-none pointer-events-none"
                style={{
                  filter: shirtColor === '#000000' || shirtColor === '#1e293b' ? 'brightness(0.2)' : 'none',
                  backgroundColor: shirtColor === '#ffffff' ? 'transparent' : shirtColor,
                  maskImage: 'url(/shirt/front.png)',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: 'url(/shirt/front.png)',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                }}
                priority
              />
              
              {/* Design area hint */}
              <div 
                className="absolute border-2 border-dashed border-ci-blue/30 rounded-lg flex items-center justify-center"
                style={{ top: '20%', left: '25%', width: '50%', height: '40%' }}
              >
                <div className="text-center text-ci-blue/50">
                  <Plus className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-xs font-medium">พื้นที่ออกแบบ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Info & CTA */}
          <div className="p-4 space-y-4">
            {/* Product info */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">เสื้อยืด Premium</p>
                <p className="text-sm text-slate-500">เริ่มต้น ฿120 • DTF/DTG</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">16 สี • 7 ไซส์</p>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/designer"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-ci-blue to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              <Palette className="w-5 h-5" />
              เริ่มออกแบบเลย
              <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
              <span>✓ ไม่ต้องสมัคร</span>
              <span>✓ ออกแบบฟรี</span>
              <span>✓ ส่งใน 2-3 วัน</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== DESKTOP VERSION ==================== */}
      <div className="hidden lg:block w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Top Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1 px-2 py-1 bg-ci-blue text-white rounded-full">
                <Check className="w-3 h-3" /> เลือกสินค้า
              </span>
              <ChevronRight className="w-3 h-3" />
              <span className="px-2 py-1 bg-ci-blue/10 text-ci-blue rounded-full font-medium">ออกแบบ</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-400">ตรวจสอบ</span>
            </div>
            <div className="text-sm font-bold text-slate-700">
              ราคา <span className="text-ci-blue">฿{totalPrice}</span>
            </div>
          </div>

          <div className="flex">
            {/* Left Panel - Product Options */}
            <div className="w-60 border-r border-slate-200 p-4 space-y-4 bg-slate-50/50">
              {/* Product Info */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Image src="/shirt/front.png" alt="Shirt" width={40} height={40} className="object-contain" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">Anajak Semi 32</p>
                  <p className="text-xs text-slate-500">฿{basePrice}</p>
                </div>
              </div>

              {/* Print Technique */}
              <div>
                <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
                  <span className="w-1 h-4 bg-ci-blue rounded-full"></span>
                  เทคนิคการพิมพ์
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {TECHNIQUES.map((tech) => (
                    <button
                      key={tech.id}
                      onClick={() => setTechnique(tech.id)}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        technique === tech.id
                          ? 'border-ci-blue bg-blue-50 ring-1 ring-ci-blue'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-lg">{tech.icon}</span>
                      <p className="text-xs font-bold text-slate-700">{tech.name}</p>
                      <p className="text-[10px] text-slate-500">{tech.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
                  <span className="w-1 h-4 bg-ci-blue rounded-full"></span>
                  สีเสื้อ
                </p>
                <div className="grid grid-cols-6 gap-1.5">
                  {SHIRT_COLORS.map((c) => (
                    <button
                      key={c.color}
                      onClick={() => setShirtColor(c.color)}
                      className={`w-7 h-7 rounded-md border-2 transition-all hover:scale-110 ${
                        shirtColor === c.color
                          ? 'border-ci-blue ring-2 ring-ci-blue/30 scale-110'
                          : 'border-slate-300'
                      }`}
                      style={{ backgroundColor: c.color }}
                      title={c.name}
                    >
                      {shirtColor === c.color && (
                        <Check className={`w-4 h-4 mx-auto ${c.color === '#ffffff' || c.color === '#eab308' || c.color === '#9ca3af' ? 'text-slate-800' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
                  <span className="w-1 h-4 bg-ci-blue rounded-full"></span>
                  ไซส์
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-9 h-8 rounded-md border text-xs font-bold transition-all ${
                        selectedSize === size
                          ? 'border-ci-blue bg-ci-blue text-white'
                          : 'border-slate-200 text-slate-600 hover:border-ci-blue'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Center - Canvas */}
            <div className="flex-1 p-4 bg-gradient-to-br from-slate-100 to-slate-50 min-h-[450px] relative">
              {/* View Toggle */}
              <div className="absolute bottom-3 left-3 bg-white rounded-lg shadow border border-slate-200 flex p-0.5 z-20">
                <button
                  onClick={() => setViewSide('front')}
                  className={`px-3 py-1 text-xs font-bold rounded transition-all ${
                    viewSide === 'front' ? 'bg-ci-blue text-white' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  ด้านหน้า
                </button>
                <button
                  onClick={() => setViewSide('back')}
                  className={`px-3 py-1 text-xs font-bold rounded transition-all ${
                    viewSide === 'back' ? 'bg-ci-blue text-white' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  ด้านหลัง
                </button>
              </div>

              {/* T-Shirt Canvas */}
              <div
                ref={canvasRef}
                className="relative w-full max-w-[300px] mx-auto aspect-[3/4]"
                onMouseMove={handleDrag}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onClick={() => setSelectedId(null)}
              >
                {/* Shirt */}
                <Image
                  src={viewSide === 'front' ? '/shirt/front.png' : '/shirt/back.png'}
                  alt="T-Shirt"
                  fill
                  className="object-contain drop-shadow-lg select-none pointer-events-none"
                  style={{
                    filter: shirtColor === '#000000' || shirtColor === '#1e293b' || shirtColor === '#374151' ? 'brightness(0.2)' : 'none',
                    backgroundColor: shirtColor === '#ffffff' ? 'transparent' : shirtColor,
                    maskImage: `url(/shirt/${viewSide}.png)`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskImage: `url(/shirt/${viewSide}.png)`,
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                  }}
                  priority
                />

                {/* Print Area */}
                <div
                  className={`absolute rounded transition-all ${
                    elements.length === 0
                      ? 'border-2 border-dashed border-slate-300 bg-slate-200/20'
                      : 'border border-dashed border-slate-300/50'
                  }`}
                  style={{ top: '18%', left: '25%', width: '50%', height: '45%' }}
                >
                  {/* Elements */}
                  {elements.map((el) => (
                    <div
                      key={el.id}
                      onMouseDown={(e) => handleDragStart(e, el)}
                      onClick={(e) => e.stopPropagation()}
                      className={`absolute cursor-move select-none transition-all ${
                        selectedId === el.id
                          ? 'ring-2 ring-ci-blue ring-offset-1 rounded z-20'
                          : 'hover:ring-1 hover:ring-ci-blue/50 rounded z-10'
                      }`}
                      style={{ left: el.x, top: el.y }}
                    >
                      <span
                        style={{
                          fontSize: el.fontSize,
                          fontFamily: el.fontFamily,
                          color: el.color,
                          whiteSpace: 'nowrap',
                          fontWeight: 'bold',
                          textShadow: el.color === '#ffffff' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
                        }}
                      >
                        {el.content}
                      </span>
                      {selectedId === el.id && (
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteSelected(); }}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow"
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                  ))}

                  {/* Empty State */}
                  {elements.length === 0 && !showTextInput && (
                    <button
                      onClick={() => setShowTextInput(true)}
                      className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 hover:text-ci-blue transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full border-2 border-dashed border-current flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <Plus className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium">พื้นที่ออกแบบ</span>
                      <span className="text-[10px] opacity-70">21 × 30 ซม.</span>
                    </button>
                  )}

                  {/* Text Input */}
                  {showTextInput && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm z-30 rounded p-3">
                      <div className="w-full space-y-2">
                        <input
                          ref={inputRef}
                          type="text"
                          value={newText}
                          onChange={(e) => setNewText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && newText && addText()}
                          placeholder="พิมพ์ข้อความ..."
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-ci-blue focus:border-transparent outline-none"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => setShowTextInput(false)}
                            className="flex-1 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
                          >
                            ยกเลิก
                          </button>
                          <button
                            onClick={() => addText()}
                            disabled={!newText}
                            className="flex-1 px-3 py-1.5 text-xs text-white bg-ci-blue rounded-lg hover:bg-blue-700 disabled:opacity-50"
                          >
                            เพิ่ม
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Toolbar */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white rounded-lg shadow border border-slate-200 p-1">
                <span className="text-xs text-slate-400 px-2">เพิ่ม:</span>
                <button
                  onClick={() => setShowTextInput(true)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded transition-colors"
                >
                  <Type className="w-3.5 h-3.5" />
                  ข้อความ
                </button>
              </div>
            </div>

            {/* Right Panel - Summary */}
            <div className="w-52 border-l border-slate-200 p-4 bg-white">
              <p className="text-xs font-bold text-slate-700 mb-3">สรุปรายการ</p>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">สรุปราคา</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">เสื้อ ({selectedSize})</span>
                  <span className="font-medium">฿{basePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">ค่าสกรีน</span>
                  <span className="font-medium">฿{printPrice}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between">
                  <span className="font-bold text-slate-700">ราคารวม</span>
                  <span className="font-bold text-ci-blue text-lg">฿{totalPrice}</span>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-[10px] text-slate-400 mb-1">เปลี่ยนสีเสื้อ (ที่เลือกไว้)</p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full border-2 border-slate-300" style={{ backgroundColor: shirtColor }}></div>
                    <span className="text-xs text-slate-600">{getColorName(shirtColor)}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 mb-1">ดูไซส์ (ที่เลือกไว้)</p>
                  <div className="flex gap-1">
                    {['S', 'M', 'L', 'XL'].map((s) => (
                      <span
                        key={s}
                        className={`w-7 h-6 flex items-center justify-center rounded text-[10px] font-bold ${
                          selectedSize === s
                            ? 'bg-ci-blue text-white'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/designer"
                className="mt-4 w-full flex items-center justify-center gap-1.5 px-3 py-3 bg-ci-blue text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                ถัดไป
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

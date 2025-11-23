'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Type, 
  Image as ImageIcon, 
  UploadCloud, 
  Shapes, 
  Shirt,
  Undo2, 
  Redo2, 
  ZoomIn, 
  ZoomOut, 
  ShoppingCart, 
  ChevronLeft,
  ChevronRight,
  Trash2, 
  Copy, 
  Layers, 
  Bold,
  Italic,
  Underline,
  ArrowUp,
  ArrowDown,
  SlidersHorizontal,
  Sticker,
  MousePointer2,
  Move,
  Minus,
  Plus,
  Info,
  Check,
  Ruler,
  Maximize2
} from 'lucide-react';
import Link from 'next/link';

// Constants
const FONTS = [
  { name: 'Sarabun', family: 'font-sans' },
  { name: 'Kanit', family: 'font-serif' },
  { name: 'Prompt', family: 'font-mono' },
  { name: 'Mitr', family: 'font-sans' },
];

const SHAPES = [
  { type: 'rect', class: 'rounded-lg' },
  { type: 'circle', class: 'rounded-full' },
  { type: 'triangle', class: 'clip-triangle' },
];

const STICKERS = ['🔥', '⚡', '❤️', '⭐', '💀', '🌈', '🎵', '🚀', '🐱', '👑', '🍕'];

// Types
type ElementType = 'text' | 'image' | 'shape' | 'sticker';

interface DesignElement {
  id: string;
  type: ElementType;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  color?: string;
  backgroundColor?: string;
  opacity: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  textAlign?: 'left' | 'center' | 'right';
  brightness?: number;
  contrast?: number;
  grayscale?: number;
  side?: 'front' | 'back';
}

export default function DesignerClient() {
  // UI State
  const [activeTool, setActiveTool] = useState<'product' | 'text' | 'uploads' | 'elements' | 'layers' | null>('text');
  const [zoom, setZoom] = useState(100);
  const [shirtColor, setShirtColor] = useState('#ffffff');
  const [shirtSize, setShirtSize] = useState('M'); // Preview size
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['S', 'M', 'L', 'XL']);
  const [technique, setTechnique] = useState<'printing' | 'embroidery'>('printing');
  const [printingType, setPrintingType] = useState<'dtg' | 'dtflex'>('dtg');
  const [showFilters, setShowFilters] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [showRulers, setShowRulers] = useState(true);
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');
  
  // Pricing Config
  const BASE_PRICE = 290;
  const SIZE_SURCHARGES: Record<string, number> = {
    '2XL': 40, '3XL': 60, '4XL': 80, '5XL': 100
  };
  const TECHNIQUE_COSTS = {
    'printing': 0,
    'embroidery': 150
  };
  const PRINT_TYPE_COSTS = {
    'dtg': 0,
    'dtflex': 50
  };

  // Price Calculation
  const sizeSurcharge = SIZE_SURCHARGES[shirtSize] || 0;
  const techniqueCost = TECHNIQUE_COSTS[technique];
  const printTypeCost = technique === 'printing' ? PRINT_TYPE_COSTS[printingType] : 0;
  const shirtBasePrice = BASE_PRICE + sizeSurcharge;
  const printingPrice = techniqueCost + printTypeCost;
  const currentPrice = shirtBasePrice + printingPrice;

  // Real-world dimensions for scaling (Approximate for T-shirt print area)
  const PRINT_AREA_WIDTH_CM = 30; // Standard print width
  const PRINT_AREA_HEIGHT_CM = 40; // Standard print height
  
  const SHIRT_SPECS: Record<string, { width: number, length: number }> = {
    'XS': { width: 41, length: 66 },
    'S': { width: 46, length: 71 },
    'M': { width: 51, length: 74 },
    'L': { width: 56, length: 76 },
    'XL': { width: 61, length: 79 },
    '2XL': { width: 66, length: 81 },
    '3XL': { width: 71, length: 84 },
    '4XL': { width: 76, length: 86 },
    '5XL': { width: 81, length: 89 },
  };

  const SIZES = Object.keys(SHIRT_SPECS);
  
  const BASE_SHIRT_WIDTH_PX = 500; // The visual width of the shirt on screen at 100% zoom

  const MOCKUP_IMAGES = {
    front: '/shirt/front.png', 
    back: '/shirt/back.png'
  };
  const COLORS = [
    { name: 'Black', value: '#000000', class: 'bg-black border-black' },
    { name: 'White', value: '#ffffff', class: 'bg-white border-slate-200' },
    { name: 'Navy', value: '#1e3a8a', class: 'bg-blue-900 border-blue-900' },
    { name: 'Dark Heather', value: '#334155', class: 'bg-slate-700 border-slate-700' },
    { name: 'Sport Grey', value: '#9ca3af', class: 'bg-gray-400 border-gray-400' },
    { name: 'Royal', value: '#2563eb', class: 'bg-blue-600 border-blue-600' },
    { name: 'Red', value: '#dc2626', class: 'bg-red-600 border-red-600' },
    { name: 'Maroon', value: '#7f1d1d', class: 'bg-red-900 border-red-900' },
    { name: 'Orange', value: '#ea580c', class: 'bg-orange-600 border-orange-600' },
    { name: 'Gold', value: '#eab308', class: 'bg-yellow-500 border-yellow-500' },
    { name: 'Forest Green', value: '#166534', class: 'bg-green-800 border-green-800' },
    { name: 'Irish Green', value: '#16a34a', class: 'bg-green-600 border-green-600' },
    { name: 'Light Blue', value: '#38bdf8', class: 'bg-sky-400 border-sky-400' },
    { name: 'Pink', value: '#ec4899', class: 'bg-pink-500 border-pink-500' },
    { name: 'Purple', value: '#7e22ce', class: 'bg-purple-700 border-purple-700' },
    { name: 'Charcoal', value: '#4b5563', class: 'bg-gray-600 border-gray-600' },
  ];

  // Design State
  const [elements, setElements] = useState<DesignElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const elementStartPos = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const currentShirtSpec = SHIRT_SPECS[shirtSize] || SHIRT_SPECS['M'];
  const pixelsPerCm = BASE_SHIRT_WIDTH_PX / currentShirtSpec.width;
  
  // Calculate print area dimensions relative to shirt
  const printAreaWidthPercent = (PRINT_AREA_WIDTH_CM / currentShirtSpec.width) * 100;
  const printAreaHeightPercent = (PRINT_AREA_HEIGHT_CM / (currentShirtSpec.width * 1.2)) * 100; // Aspect ratio approx
  
  const selectedElement = elements.find(el => el.id === selectedId);

  const STEPS = [
    { id: 1, label: 'Product', status: 'completed' },
    { id: 2, label: 'Design', status: 'current' },
    { id: 3, label: 'Review', status: 'upcoming' },
  ];

  useEffect(() => {
    // Global Mouse Events for Dragging/Resizing
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && selectedId) {
        const dx = (e.clientX - dragStartPos.current.x) / (zoom / 100);
        const dy = (e.clientY - dragStartPos.current.y) / (zoom / 100);
        
        updateElement(selectedId, {
          x: elementStartPos.current.x + dx,
          y: elementStartPos.current.y + dy
        });
      } else if (isResizing && selectedId) {
        const dx = (e.clientX - dragStartPos.current.x) / (zoom / 100);
        // Simple proportional resizing based on width change
        const newWidth = Math.max(20, elementStartPos.current.width + dx);
        const scaleFactor = newWidth / elementStartPos.current.width;
        const newHeight = elementStartPos.current.height * scaleFactor;

        // Update based on type
        const updates: Partial<DesignElement> = { width: newWidth, height: newHeight };
        
        // Scale font size for text/stickers
        if (selectedElement?.fontSize) {
           updates.fontSize = (elementStartPos.current.width / 10) * scaleFactor * 10; // Approximate scaling
           // Better: Store initial font size and scale it
           // customized logic inside update if needed
        }

        updateElement(selectedId, updates);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, selectedId, zoom, selectedElement]);

  // Helpers
  const addElement = (type: ElementType, content: string, extraProps = {}) => {
    // Default dimensions based on type
    let width = 200;
    let height = 50;
    if (type === 'image' || type === 'shape' || type === 'sticker') {
      width = 100;
      height = 100;
    }

      const newEl: DesignElement = {
      id: Date.now().toString(), type, content, 
      x: 150, y: 200, // Center-ish
      width, height,
      rotation: 0, opacity: 100,
      color: '#000000', fontSize: 32, fontFamily: 'Sarabun', fontWeight: 'normal', fontStyle: 'normal', textAlign: 'center',
      brightness: 100, contrast: 100, grayscale: 0,
      side: viewSide, // Add to current side
      ...extraProps
    };
    setElements(prev => [...prev, newEl]);
    setSelectedId(newEl.id);
  };

  const updateElement = (id: string | null, changes: Partial<DesignElement>) => {
    if (!id) return;
    setElements(prev => prev.map(el => el.id === id ? { ...el, ...changes } : el));
  };

  const deleteElement = (id: string | null) => {
    if (!id) return;
    setElements(prev => prev.filter(el => el.id !== id));
    setSelectedId(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => event.target?.result && addElement('image', event.target.result as string, { width: 200, height: 200 });
      reader.readAsDataURL(file);
    }
  };

  const duplicateElement = () => {
    if (!selectedElement) return;
    const newEl = { ...selectedElement, id: Date.now().toString(), x: selectedElement.x + 20, y: selectedElement.y + 20 };
    setElements(prev => [...prev, newEl]);
    setSelectedId(newEl.id);
  };

  const moveLayer = (direction: 'up' | 'down') => {
    if (!selectedId) return;
    const index = elements.findIndex(el => el.id === selectedId);
    if (index === -1) return;
    const newElements = [...elements];
    if (direction === 'up' && index < elements.length - 1) {
      [newElements[index], newElements[index + 1]] = [newElements[index + 1], newElements[index]];
    } else if (direction === 'down' && index > 0) {
      [newElements[index], newElements[index - 1]] = [newElements[index - 1], newElements[index]];
    }
    setElements(newElements);
  };

  // Interaction Handlers
  const handleDragStart = (e: React.MouseEvent, el: DesignElement) => {
    e.stopPropagation();
    setSelectedId(el.id);
    setShowFilters(false);
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    elementStartPos.current = { x: el.x, y: el.y, width: el.width, height: el.height };
  };

  const handleTextEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedId) {
      updateElement(selectedId, { content: e.target.value });
    }
  };

  const handleResizeStart = (e: React.MouseEvent, el: DesignElement) => {
    e.stopPropagation();
    setIsResizing(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    elementStartPos.current = { x: el.x, y: el.y, width: el.width, height: el.height };
  };

  // Components
  const SidebarItem = ({ icon: Icon, label, id, isActive, onClick }: any) => (
    <button onClick={() => onClick(id)} className={`w-full aspect-square flex flex-col items-center justify-center gap-1 transition-all duration-200 relative group ${isActive ? 'text-ci-blue bg-blue-50/80' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
      <Icon className={`w-6 h-6 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
      <span className="text-[10px] font-bold">{label}</span>
      {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-ci-blue rounded-r-full" />}
    </button>
  );

  const Divider = () => <div className="h-6 w-px bg-slate-200 mx-1"></div>;

  return (
    <div className="flex h-screen bg-slate-50/50 overflow-hidden font-sans text-slate-800">
      
      {/* 1. Left Sidebar */}
      <div className="w-[72px] bg-white border-r border-slate-200 flex flex-col items-center py-4 z-30 shadow-sm flex-shrink-0">
        <Link href="/catalog" className="mb-6 w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg hover:scale-105 transition-transform">A</Link>
        <div className="w-full flex-1 space-y-1">
          <SidebarItem icon={Shirt} label="Product" id="product" isActive={activeTool === 'product'} onClick={setActiveTool} />
          <SidebarItem icon={Type} label="Text" id="text" isActive={activeTool === 'text'} onClick={setActiveTool} />
          <SidebarItem icon={UploadCloud} label="Uploads" id="uploads" isActive={activeTool === 'uploads'} onClick={setActiveTool} />
          <SidebarItem icon={Shapes} label="Elements" id="elements" isActive={activeTool === 'elements'} onClick={setActiveTool} />
          <SidebarItem icon={Layers} label="Layers" id="layers" isActive={activeTool === 'layers'} onClick={setActiveTool} />
        </div>
      </div>

      {/* 2. Slide-out Panel */}
      <div className={`w-80 bg-white border-r border-slate-200 flex flex-col z-20 shadow-xl transition-all duration-300 absolute left-[72px] top-0 bottom-0 transform ${activeTool ? 'translate-x-0' : '-translate-x-full opacity-0 pointer-events-none'}`}>
        <div className="h-14 border-b border-slate-100 flex items-center justify-between px-6 bg-white/80 backdrop-blur sticky top-0 z-10">
          <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2 capitalize">{activeTool}</h2>
          <button onClick={() => setActiveTool(null)} className="p-2 hover:bg-slate-100 rounded-full"><ChevronLeft className="w-5 h-5 text-slate-400" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {activeTool === 'product' && (
            <div className="space-y-8 px-2">
              {/* Product Summary Card */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="aspect-square w-full bg-white rounded-xl border border-slate-200 mb-3 p-4 flex items-center justify-center relative overflow-hidden">
                   <img src="https://www.pngall.com/wp-content/uploads/2016/04/T-Shirt-PNG-File.png" className="w-full h-full object-contain mix-blend-multiply" />
                   <div className="absolute bottom-2 right-2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                     ฿{currentPrice}
                   </div>
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">Premium Cotton T-Shirt</h3>
                <p className="text-xs text-slate-500">High quality, 100% cotton, sustainable.</p>
              </div>

              {/* Customization Options */}
              <div className="space-y-6">
                {/* Technique Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Technique</label>
                  <div className="p-1 bg-slate-100 rounded-xl flex gap-1">
                     {['Printing', 'Embroidery'].map((t) => (
                       <button 
                         key={t}
                         onClick={() => setTechnique(t.toLowerCase() as any)}
                         className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${technique === t.toLowerCase() ? 'bg-white text-ci-blue shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                       >
                         {t}
                       </button>
                     ))}
                  </div>
                </div>

                {/* Colors */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Color</label>
                    <span className="text-xs font-bold text-slate-700">{COLORS.find(c => c.value === shirtColor)?.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {COLORS.map((c) => (
                      <button 
                        key={c.value} 
                        onClick={() => setShirtColor(c.value)} 
                        className={`w-8 h-8 rounded-full shadow-sm transition-transform hover:scale-110 relative ${shirtColor === c.value ? 'ring-2 ring-offset-2 ring-ci-blue scale-110' : 'ring-1 ring-slate-200'}`}
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sizes</label>
                    <button onClick={() => setSelectedSizes(selectedSizes.length === SIZES.length ? [] : [...SIZES])} className="text-[10px] font-bold text-ci-blue hover:underline">
                      {selectedSizes.length === SIZES.length ? 'Clear All' : 'Select All'}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map((s) => {
                      const isSelected = selectedSizes.includes(s);
                      return (
                        <button 
                          key={s} 
                          onClick={() => {
                             const newSizes = isSelected ? selectedSizes.filter(sz => sz !== s) : [...selectedSizes, s];
                             setSelectedSizes(newSizes);
                             if (!isSelected) setShirtSize(s); 
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${isSelected ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTool === 'text' && (
            <div className="space-y-4">
              <button onClick={() => addElement('text', 'Heading', { fontSize: 48, fontWeight: 'bold' })} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-2xl hover:scale-[1.02] transition-transform shadow-lg">Add Heading</button>
              <button onClick={() => addElement('text', 'Subheading', { fontSize: 32, fontWeight: 'medium' })} className="w-full py-3 bg-white border-2 border-slate-200 rounded-xl font-bold text-lg text-slate-700 hover:border-slate-900">Add Subheading</button>
              <button onClick={() => addElement('text', 'Body Text', { fontSize: 24 })} className="w-full py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-500 hover:bg-slate-100">Add Body Text</button>
            </div>
          )}
          {activeTool === 'uploads' && (
            <div className="text-center">
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              <button onClick={() => fileInputRef.current?.click()} className="w-full border-2 border-dashed border-ci-blue/30 bg-ci-blue/5 rounded-2xl p-8 mb-6 hover:bg-ci-blue/10 transition-colors">
                <UploadCloud className="w-10 h-10 text-ci-blue mx-auto mb-2" />
                <p className="text-sm font-bold text-ci-blue">Upload Media</p>
              </button>
            </div>
          )}
          {activeTool === 'elements' && (
            <div className="space-y-8">
              <div className="grid grid-cols-3 gap-3">
                 {SHAPES.map((s, i) => <div key={i} onClick={() => addElement('shape', s.type, { backgroundColor: '#94a3b8' })} className={`h-16 bg-slate-200 hover:bg-slate-300 cursor-pointer ${s.class}`} />)}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {STICKERS.map((s, i) => <button key={i} onClick={() => addElement('sticker', s, { fontSize: 64 })} className="text-2xl hover:scale-125 transition-transform">{s}</button>)}
              </div>
            </div>
          )}
          {activeTool === 'layers' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-4 p-1 bg-slate-100 rounded-lg">
                <button 
                  onClick={() => setViewSide('front')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${viewSide === 'front' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                >
                  Front
                </button>
                <button 
                  onClick={() => setViewSide('back')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${viewSide === 'back' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                >
                  Back
                </button>
              </div>
              
              {elements.filter(el => el.side === viewSide).slice().reverse().map((el, i) => (
                <div key={el.id} 
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${selectedId === el.id ? 'border-ci-blue bg-blue-50/50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                  onClick={() => setSelectedId(el.id)}
                >
                  <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                    {el.type === 'text' && <Type className="w-4 h-4" />}
                    {el.type === 'image' && <ImageIcon className="w-4 h-4" />}
                    {el.type === 'shape' && <Shapes className="w-4 h-4" />}
                    {el.type === 'sticker' && <Sticker className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate text-slate-700">{el.content.startsWith('data:') ? 'Image' : el.content}</p>
                    <p className="text-[10px] text-slate-400 capitalize">{el.type}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); deleteElement(el.id); }} className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {elements.filter(el => el.side === viewSide).length === 0 && (
                <div className="text-center py-10 text-slate-400">
                  <Layers className="w-12 h-12 mx-auto mb-2 opacity-20" />
                  <p className="text-sm">No layers on {viewSide}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. Main Workspace */}
      <div className={`flex-1 flex flex-col relative transition-all duration-300 ${activeTool ? 'pl-80' : ''}`}>
        
        {/* Top Bar */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 shadow-sm relative">
           {/* Left: Tools */}
           <div className="flex items-center gap-4 z-20 relative">
              <div className="flex bg-slate-100 rounded-lg p-1">
                 <button className="p-1.5 hover:bg-white rounded text-slate-500 hover:shadow-sm"><Undo2 className="w-4 h-4" /></button>
                 <button className="p-1.5 hover:bg-white rounded text-slate-500 hover:shadow-sm"><Redo2 className="w-4 h-4" /></button>
              </div>
           </div>

           {/* Center: Process Stepper */}
           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 z-10 bg-white/90 backdrop-blur px-4 py-1 rounded-full border border-slate-100 shadow-sm">
              {STEPS.map((step, i) => (
                <div key={step.id} className="flex items-center gap-1">
                  {i > 0 && <div className="w-4 h-px bg-slate-200" />}
                  <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full transition-colors ${step.status === 'completed' ? 'text-green-600 bg-green-50' : step.status === 'current' ? 'text-slate-900 bg-slate-100' : 'text-slate-300'}`}>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold border ${step.status === 'completed' ? 'bg-green-100 border-green-200' : step.status === 'current' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200'}`}>
                      {step.status === 'completed' ? <Check className="w-2.5 h-2.5" /> : step.id}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider">{step.label}</span>
                  </div>
                </div>
              ))}
           </div>

           {/* Right: Actions */}
           <div className="flex items-center gap-2 z-20 relative">
              {/* Price Tag */}
              <div className="flex flex-col items-end leading-none mr-4">
                   <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">Total</span>
                   <span className="text-xl font-black text-slate-900 tracking-tight">฿{currentPrice.toLocaleString()}</span>
              </div>

              {/* Buttons */}
              <button className="h-10 px-4 text-slate-500 font-bold text-sm hover:text-slate-900 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-200 transition-all">
                Preview
              </button>
              <button className="h-10 px-6 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30 transition-all flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0">
                 <ShoppingCart className="w-4 h-4" />
                 <span>Add to Cart</span>
              </button>
           </div>
        </div>

        {/* Context Toolbar */}
        {selectedElement && (
           <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 bg-white rounded-xl shadow-xl border border-slate-200 px-4 py-2 flex items-center gap-3 animate-in slide-in-from-top-4 fade-in duration-200">
              {selectedElement.type === 'text' && (
                 <>
                    <div className="w-full px-2 pb-2 border-b border-slate-100 mb-2">
                      <input 
                        type="text" 
                        value={selectedElement.content} 
                        onChange={handleTextEdit}
                        className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-ci-blue focus:ring-1 focus:ring-ci-blue/20"
                        placeholder="Enter text..."
                      />
                    </div>
                    <div className="relative group">
                      <button className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-100 rounded-lg text-sm font-medium w-28 justify-between"><span className="truncate">{selectedElement.fontFamily}</span><ChevronRight className="w-3 h-3 rotate-90 text-slate-400" /></button>
                      <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-lg hidden group-hover:block py-1 max-h-48 overflow-y-auto z-50">
                        {FONTS.map(f => (<button key={f.name} onClick={() => updateElement(selectedId, { fontFamily: f.name })} className={`w-full text-left px-3 py-2 hover:bg-slate-50 text-sm ${f.family}`}>{f.name}</button>))}
                      </div>
                    </div>
                    <Divider />
                    <div className="flex items-center bg-slate-100 rounded-lg">
                       <button onClick={() => updateElement(selectedId, { fontSize: Math.max(12, (selectedElement.fontSize || 32) - 4) })} className="p-1.5 hover:bg-slate-200 rounded-l-lg text-slate-600"><Minus className="w-3 h-3" /></button>
                       <span className="w-8 text-center text-xs font-bold">{selectedElement.fontSize}</span>
                       <button onClick={() => updateElement(selectedId, { fontSize: Math.min(200, (selectedElement.fontSize || 32) + 4) })} className="p-1.5 hover:bg-slate-200 rounded-r-lg text-slate-600"><Plus className="w-3 h-3" /></button>
                    </div>
                    <Divider />
                    <div className="flex items-center gap-2 relative group">
                       <div className="w-6 h-6 rounded border border-slate-300" style={{ backgroundColor: selectedElement.color }}></div>
                       <input type="color" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => updateElement(selectedId, { color: e.target.value })} />
                    </div>
                    <Divider />
                    <div className="flex items-center gap-1">
                       <button onClick={() => updateElement(selectedId, { fontWeight: selectedElement.fontWeight === 'bold' ? 'normal' : 'bold' })} className={`p-1.5 rounded hover:bg-slate-100 ${selectedElement.fontWeight === 'bold' ? 'bg-slate-200' : ''}`}><Bold className="w-4 h-4" /></button>
                       <button onClick={() => updateElement(selectedId, { fontStyle: selectedElement.fontStyle === 'italic' ? 'normal' : 'italic' })} className={`p-1.5 rounded hover:bg-slate-100 ${selectedElement.fontStyle === 'italic' ? 'bg-slate-200' : ''}`}><Italic className="w-4 h-4" /></button>
                       <button onClick={() => updateElement(selectedId, { textDecoration: selectedElement.textDecoration === 'underline' ? 'none' : 'underline' })} className={`p-1.5 rounded hover:bg-slate-100 ${selectedElement.textDecoration === 'underline' ? 'bg-slate-200' : ''}`}><Underline className="w-4 h-4" /></button>
                    </div>
                 </>
              )}
              {selectedElement.type === 'sticker' && (
                 <>
                    <div className="flex items-center gap-2 text-slate-500"><Sticker className="w-4 h-4" /><span className="text-xs font-bold uppercase">Sticker</span></div>
                    <Divider />
                    <div className="flex items-center bg-slate-100 rounded-lg">
                       <button onClick={() => updateElement(selectedId, { fontSize: Math.max(24, (selectedElement.fontSize || 64) - 8) })} className="p-1.5 hover:bg-slate-200 rounded-l-lg text-slate-600"><Minus className="w-3 h-3" /></button>
                       <span className="w-8 text-center text-xs font-bold">{selectedElement.fontSize}</span>
                       <button onClick={() => updateElement(selectedId, { fontSize: Math.min(300, (selectedElement.fontSize || 64) + 8) })} className="p-1.5 hover:bg-slate-200 rounded-r-lg text-slate-600"><Plus className="w-3 h-3" /></button>
                    </div>
                    <Divider />
                    <div className="flex items-center gap-3 px-2">
                       <span className="text-xs font-bold text-slate-500 uppercase">Opacity</span>
                       <input type="range" min="0" max="100" value={selectedElement.opacity} onChange={(e) => updateElement(selectedId, { opacity: parseInt(e.target.value) })} className="w-24 accent-ci-blue h-1 bg-slate-200 rounded-lg appearance-none" />
                    </div>
                 </>
              )}
              {(selectedElement.type === 'shape' || selectedElement.type === 'image') && (
                 <>
                    {selectedElement.type === 'shape' && (
                      <div className="flex items-center gap-3 px-2">
                        <span className="text-xs font-bold text-slate-500 uppercase">Color</span>
                        <div className="flex items-center gap-2 relative">
                          <div className="w-8 h-8 rounded-lg border border-slate-300 shadow-sm" style={{ backgroundColor: selectedElement.backgroundColor }}></div>
                          <input type="color" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => updateElement(selectedId, { backgroundColor: e.target.value })} />
                        </div>
                      </div>
                    )}
                    {selectedElement.type === 'image' && (
                      <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${showFilters ? 'bg-ci-blue text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}><SlidersHorizontal className="w-4 h-4" /> Filters</button>
                    )}
                    {showFilters && selectedElement.type === 'image' && (
                       <div className="absolute top-full left-0 mt-2 p-4 bg-white rounded-xl shadow-xl border border-slate-200 w-64 z-50 space-y-3">
                          <div><div className="flex justify-between mb-1"><span className="text-xs text-slate-500">Brightness</span><span className="text-xs">{selectedElement.brightness}%</span></div><input type="range" min="0" max="200" value={selectedElement.brightness} onChange={(e) => updateElement(selectedId, { brightness: parseInt(e.target.value) })} className="w-full accent-ci-blue h-1 bg-slate-200 rounded-lg appearance-none" /></div>
                          <div><div className="flex justify-between mb-1"><span className="text-xs text-slate-500">Contrast</span><span className="text-xs">{selectedElement.contrast}%</span></div><input type="range" min="0" max="200" value={selectedElement.contrast} onChange={(e) => updateElement(selectedId, { contrast: parseInt(e.target.value) })} className="w-full accent-ci-blue h-1 bg-slate-200 rounded-lg appearance-none" /></div>
                       </div>
                    )}
                    <Divider />
                    <div className="flex items-center gap-3 px-2"><span className="text-xs font-bold text-slate-500 uppercase">Opacity</span><input type="range" min="0" max="100" value={selectedElement.opacity} onChange={(e) => updateElement(selectedId, { opacity: parseInt(e.target.value) })} className="w-24 accent-ci-blue h-1 bg-slate-200 rounded-lg appearance-none" /></div>
                 </>
              )}
              <Divider />
              <div className="flex items-center gap-1"><button onClick={() => moveLayer('up')} className="p-1.5 hover:bg-slate-100 rounded text-slate-500"><ArrowUp className="w-4 h-4" /></button><button onClick={() => moveLayer('down')} className="p-1.5 hover:bg-slate-100 rounded text-slate-500"><ArrowDown className="w-4 h-4" /></button></div>
              <Divider />
              <div className="flex items-center gap-1"><button onClick={duplicateElement} className="p-1.5 hover:bg-slate-100 rounded text-slate-500"><Copy className="w-4 h-4" /></button><button onClick={() => deleteElement(selectedId)} className="p-1.5 hover:bg-red-50 rounded text-red-500"><Trash2 className="w-4 h-4" /></button></div>
           </div>
        )}

        {/* Canvas */}
        <div className="flex-1 overflow-hidden flex items-center justify-center bg-slate-100 relative" onClick={() => { setSelectedId(null); setShowFilters(false); }}>
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
           
           {/* Front/Back Toggle */}
           <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-md border border-slate-200 flex p-1 gap-1 z-30">
              <button onClick={() => setViewSide('front')} className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${viewSide === 'front' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>Front</button>
              <button onClick={() => setViewSide('back')} className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${viewSide === 'back' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>Back</button>
           </div>

           <div ref={containerRef} className="relative w-[500px] h-[600px] transition-transform duration-200" style={{ transform: `scale(${zoom / 100})` }}>
              {/* Shirt Image */}
              <img 
                src={viewSide === 'front' ? MOCKUP_IMAGES.front : MOCKUP_IMAGES.back}
                className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl select-none transition-all duration-300"
                style={{ 
                  filter: shirtColor === '#000000' ? 'brightness(0.2)' : 'none', 
                  backgroundColor: shirtColor === '#ffffff' ? 'transparent' : shirtColor, 
                  maskImage: `url(${viewSide === 'front' ? MOCKUP_IMAGES.front : MOCKUP_IMAGES.back})`, 
                  maskSize: 'contain', 
                  maskRepeat: 'no-repeat', 
                  maskPosition: 'center',
                  WebkitMaskImage: `url(${viewSide === 'front' ? MOCKUP_IMAGES.front : MOCKUP_IMAGES.back})`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center'
                }} 
                draggable={false} 
              />

              {/* Print Area */}
              <div 
                className={`absolute transition-all z-10 overflow-visible group/area ${showRulers ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}
                style={{
                  width: `${printAreaWidthPercent}%`,
                  height: `${(PRINT_AREA_HEIGHT_CM / currentShirtSpec.width) * 100}%`, // Rough aspect ratio estimate for height
                  top: '20%', // Fixed top offset approx
                  left: '50%',
                  transform: 'translateX(-50%)',
                  border: showRulers ? '1px dashed rgba(59, 130, 246, 0.5)' : 'none' // Only show border when rulers active or hovering
                }}
              >
                 
                 {/* Rulers */}
                 {showRulers && (
                   <>
                     {/* Top Ruler */}
                     <div className="absolute -top-6 left-0 w-full h-6 border-b border-slate-300 bg-white/80 backdrop-blur flex items-end justify-between text-[8px] text-slate-400 px-1 select-none">
                        <span>0</span>
                        <span className="font-bold text-ci-blue">{PRINT_AREA_WIDTH_CM} {unit}</span>
                     </div>
                     {/* Left Ruler */}
                     <div className="absolute top-0 -left-6 w-6 h-full border-r border-slate-300 bg-white/80 backdrop-blur flex flex-col items-end justify-between text-[8px] text-slate-400 py-1 select-none">
                        <span>0</span>
                        <span>{PRINT_AREA_HEIGHT_CM}</span>
                     </div>
                     {/* Grid Lines */}
                     <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/area:opacity-10 transition-opacity" 
                          style={{ 
                            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
                            backgroundSize: `${pixelsPerCm}px ${pixelsPerCm}px`
                          }} 
                     />
                   </>
                 )}

                 {elements.filter(el => el.side === viewSide).map((el) => (
                   <div
                     key={el.id}
                     onMouseDown={(e) => handleDragStart(e, el)}
                     onClick={(e) => e.stopPropagation()}
                     className={`absolute cursor-move select-none group ${selectedId === el.id ? 'z-50' : 'z-20'}`}
                     style={{ left: el.x, top: el.y, width: el.width, height: el.height }}
                   >
                     {/* Measurement Labels (Show when selected or hovering) */}
                     {showRulers && (selectedId === el.id || isResizing) && (
                       <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap z-50 shadow-sm pointer-events-none">
                          {(el.width / pixelsPerCm).toFixed(1)} x {(el.height / pixelsPerCm).toFixed(1)} {unit}
                       </div>
                     )}

                     {/* Content */}
                     <div className={`relative w-full h-full ${selectedId === el.id ? 'ring-2 ring-ci-blue ring-offset-2' : 'hover:ring-1 hover:ring-ci-blue/30'}`}>
                        {el.type === 'text' && (
                          <div style={{ fontSize: el.fontSize, color: el.color, fontFamily: el.fontFamily, fontWeight: el.fontWeight, fontStyle: el.fontStyle, textDecoration: el.textDecoration, opacity: el.opacity / 100, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: el.textAlign, whiteSpace: 'nowrap' }}>{el.content}</div>
                        )}
                        {el.type === 'sticker' && (
                           <div style={{ fontSize: el.fontSize, opacity: el.opacity / 100, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{el.content}</div>
                        )}
                        {el.type === 'image' && (
                          <img src={el.content} className="w-full h-full object-contain" style={{ opacity: el.opacity / 100, filter: `brightness(${el.brightness}%) contrast(${el.contrast}%) grayscale(${el.grayscale}%)` }} draggable={false} />
                        )}
                        {el.type === 'shape' && (
                          <div className={`w-full h-full ${el.content === 'circle' ? 'rounded-full' : el.content === 'triangle' ? 'clip-triangle' : 'rounded-lg'}`} style={{ backgroundColor: el.backgroundColor || el.color, opacity: el.opacity / 100 }} />
                        )}
                        
                        {/* Resize Handle (Bottom Right) - Only show when selected */}
                        {selectedId === el.id && (
                          <>
                            {/* Corner Indicators for Real Scale Feel */}
                            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-ci-blue"></div>
                            <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-ci-blue"></div>
                            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-ci-blue"></div>
                            
                            <div 
                              className="absolute -bottom-2 -right-2 w-5 h-5 bg-white border-2 border-ci-blue rounded-full cursor-se-resize z-50 shadow-sm flex items-center justify-center"
                              onMouseDown={(e) => handleResizeStart(e, el)}
                            >
                               <Maximize2 className="w-2 h-2 text-ci-blue" />
                            </div>
                          </>
                        )}
                     </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Zoom Control */}
           <div className="absolute bottom-6 right-6 bg-white rounded-lg shadow-md border border-slate-200 flex items-center p-1 gap-2 z-50">
              <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="p-1 hover:bg-slate-100 rounded"><ZoomOut className="w-4 h-4" /></button>
              <span className="text-xs font-bold w-8 text-center">{zoom}%</span>
              <button onClick={() => setZoom(z => Math.min(150, z + 10))} className="p-1 hover:bg-slate-100 rounded"><ZoomIn className="w-4 h-4" /></button>
           </div>

           {/* View Controls (Top Right) */}
           <div className="absolute top-6 right-6 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col p-3 gap-3 z-50 min-w-[180px]">
              {/* Price Details */}
              <div className="space-y-1.5">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Price Breakdown</span>
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Shirt ({shirtSize})</span>
                    <span className="font-medium text-slate-900">฿{shirtBasePrice}</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Screening</span>
                    <span className="font-medium text-slate-900">+{printingPrice}</span>
                 </div>
              </div>
              <div className="h-px w-full bg-slate-100" />

              {/* Size Preview */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Preview Size</span>
                <div className="flex bg-slate-100 rounded-lg p-0.5">
                  {['S', 'M', 'XL'].map(s => (
                    <button 
                      key={s}
                      onClick={() => setShirtSize(s)}
                      className={`w-6 h-6 flex items-center justify-center rounded-md text-[10px] font-bold transition-all ${shirtSize === s ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-px w-full bg-slate-100" />
              {/* Real Scale Toggle */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Real Scale</span>
                <button 
                  onClick={() => setShowRulers(!showRulers)} 
                  className={`w-8 h-5 rounded-full transition-colors relative ${showRulers ? 'bg-ci-blue' : 'bg-slate-200'}`}
                >
                   <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform shadow-sm ${showRulers ? 'left-4' : 'left-1'}`} />
                </button>
              </div>
              {/* Unit Toggle */}
              {showRulers && (
                <div className="flex items-center justify-between gap-2 animate-in slide-in-from-top-1 fade-in duration-200">
                   <span className="text-[10px] font-bold text-slate-400 uppercase">Unit</span>
                   <button onClick={() => setUnit(u => u === 'cm' ? 'in' : 'cm')} className="px-2 py-1 rounded bg-slate-100 text-[10px] font-bold text-slate-600 hover:bg-slate-200 min-w-[2rem]">
                      {unit}
                   </button>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}

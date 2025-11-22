'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Type, 
  Image as ImageIcon, 
  UploadCloud, 
  Shapes, 
  LayoutTemplate, 
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
  Plus
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
}

export default function DesignerClient() {
  // UI State
  const [activeTool, setActiveTool] = useState<'templates' | 'text' | 'uploads' | 'elements' | 'layers' | null>('text');
  const [zoom, setZoom] = useState(100);
  const [shirtColor, setShirtColor] = useState('#ffffff');
  const [showFilters, setShowFilters] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  
  // Design State
  const [elements, setElements] = useState<DesignElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const elementStartPos = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const selectedElement = elements.find(el => el.id === selectedId);

  useEffect(() => {
    if (elements.length === 0) addElement('text', 'ANAJAK DESIGN');

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
      brightness: 100, contrast: 100, grayscale: 0, ...extraProps
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
          <SidebarItem icon={LayoutTemplate} label="Design" id="templates" isActive={activeTool === 'templates'} onClick={setActiveTool} />
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
        </div>
      </div>

      {/* 3. Main Workspace */}
      <div className={`flex-1 flex flex-col relative transition-all duration-300 ${activeTool ? 'pl-80' : ''}`}>
        
        {/* Top Bar */}
        <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="flex bg-slate-100 rounded-lg p-1">
                 <button className="p-1.5 hover:bg-white rounded text-slate-500 hover:shadow-sm"><Undo2 className="w-4 h-4" /></button>
                 <button className="p-1.5 hover:bg-white rounded text-slate-500 hover:shadow-sm"><Redo2 className="w-4 h-4" /></button>
              </div>
              <Divider />
              <div className="flex items-center gap-3">
                 <span className="text-[10px] font-bold text-slate-400 uppercase">Shirt Color</span>
                 <div className="flex gap-1.5">
                   {['#ffffff', '#000000', '#1e3a8a', '#dc2626', '#f59e0b'].map(c => (
                     <button key={c} onClick={() => setShirtColor(c)} className={`w-5 h-5 rounded-full border shadow-sm transition-transform hover:scale-110 ${shirtColor === c ? 'ring-2 ring-offset-1 ring-ci-blue' : ''}`} style={{ backgroundColor: c }} />
                   ))}
                 </div>
              </div>
           </div>
           <div className="flex gap-3 items-center">
              <button className="px-4 py-2 text-slate-600 font-bold text-sm hover:bg-slate-50 rounded-lg transition-colors">Preview</button>
              <button className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 shadow-lg shadow-slate-900/20 transition-all flex items-center gap-2">
                 <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
           </div>
        </div>

        {/* Context Toolbar */}
        {selectedElement && (
           <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 bg-white rounded-xl shadow-xl border border-slate-200 px-4 py-2 flex items-center gap-3 animate-in slide-in-from-top-4 fade-in duration-200">
              {selectedElement.type === 'text' && (
                 <>
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
           
           <div ref={containerRef} className="relative w-[500px] h-[600px] transition-transform duration-200" style={{ transform: `scale(${zoom / 100})` }}>
              {/* Shirt Image */}
              <img src="https://www.pngall.com/wp-content/uploads/2016/04/T-Shirt-PNG-File.png" className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl select-none" style={{ filter: shirtColor === '#000000' ? 'brightness(0.2)' : 'none', backgroundColor: shirtColor === '#ffffff' ? 'transparent' : shirtColor, maskImage: 'url(https://www.pngall.com/wp-content/uploads/2016/04/T-Shirt-PNG-File.png)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }} draggable={false} />

              {/* Print Area */}
              <div className="absolute top-[22%] left-[28%] w-[44%] h-[55%] border border-dashed border-ci-blue/20 hover:border-ci-blue/60 transition-colors z-10 overflow-hidden">
                 {elements.map((el) => (
                   <div
                     key={el.id}
                     onMouseDown={(e) => handleDragStart(e, el)}
                     className={`absolute cursor-move select-none group ${selectedId === el.id ? 'z-50' : 'z-20'}`}
                     style={{ left: el.x, top: el.y, width: el.width, height: el.height }}
                   >
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
                          <div 
                            className="absolute -bottom-2 -right-2 w-5 h-5 bg-white border-2 border-ci-blue rounded-full cursor-se-resize z-50 shadow-sm"
                            onMouseDown={(e) => handleResizeStart(e, el)}
                          />
                        )}
                     </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Zoom Control */}
           <div className="absolute bottom-6 right-6 bg-white rounded-lg shadow-md border border-slate-200 flex items-center p-1 gap-2">
              <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="p-1 hover:bg-slate-100 rounded"><ZoomOut className="w-4 h-4" /></button>
              <span className="text-xs font-bold w-8 text-center">{zoom}%</span>
              <button onClick={() => setZoom(z => Math.min(150, z + 10))} className="p-1 hover:bg-slate-100 rounded"><ZoomIn className="w-4 h-4" /></button>
           </div>
        </div>
      </div>
    </div>
  );
}

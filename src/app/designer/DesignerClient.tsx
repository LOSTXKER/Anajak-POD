'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Type, 
  Image as ImageIcon, 
  UploadCloud, 
  Upload,
  Shapes, 
  Shirt,
  Save,
  Undo2, 
  Redo2, 
  ZoomIn, 
  ZoomOut, 
  ShoppingCart, 
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
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
  Maximize2,
  Sparkles,
  ExternalLink,
  Search,
  Library,
  FolderOpen,
  Grid,
  List,
  MoreVertical,
  AlignLeft,
  AlignCenter,
  AlignRight,
  X,
  Store,
  FileEdit,
  Edit2,
  Heart, Star, Zap, Ghost, Flame, Sun, Moon, Cloud, Music, Camera, Video, Mic, Headphones, MapPin, Globe, Anchor, Compass, Feather, Key, Lock, Bell, Tag, Flag, Award, Gift, Trophy, Crown, Diamond, Skull, Rocket, Plane, Car, Bike, Leaf, Flower, TreeDeciduous, Snowflake, Droplets, Umbrella, Glasses, Watch,   Shirt as ShirtIcon, Scissors,
  Spline
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

const STICKERS = ['🔥', '⚡', '❤️', '⭐', '💀', '🌈', '🎵', '🚀', '🐱', '👑', '🍕', '🎉', '😎', '👀', '💡', '💪', '🍔', '⚽', '🎮', '🚗'];

// Icon Library
const AVAILABLE_ICONS: Record<string, any> = {
  Heart, Star, Zap, Ghost, Flame, Sun, Moon, Cloud, Music, 
  Camera, Video, Mic, Headphones, MapPin, Globe, Anchor, Compass, 
  Feather, Key, Lock, Bell, Tag, Flag, Award, Gift, Trophy, 
  Crown, Diamond, Skull, Rocket, Plane, Car, Bike, Leaf, Flower, 
  TreeDeciduous, Snowflake, Droplets, Umbrella, Glasses, Watch, 
  Shirt: ShirtIcon, Scissors
};

// Mock User Library Data
const MY_LIBRARY_ASSETS = [
  { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=150&q=80', name: 'My Dog Logo' },
  { id: '2', type: 'image', url: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=150&q=80', name: 'Vintage Badge' },
  { id: '3', type: 'image', url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=150&q=80', name: 'Abstract Art' },
];

const AI_TOOLS = [
  { name: 'Midjourney', url: 'https://www.midjourney.com', description: 'High quality artistic images', icon: '🎨' },
  { name: 'DALL-E 3', url: 'https://openai.com/dall-e-3', description: 'Easy to use, great prompt adherence', icon: '🤖' },
  { name: 'Bing Image Creator', url: 'https://www.bing.com/images/create', description: 'Free, powered by DALL-E 3', icon: '✨' },
  { name: 'Leonardo.ai', url: 'https://leonardo.ai', description: 'Great for game assets & style consistency', icon: '🦁' },
  { name: 'Stable Diffusion', url: 'https://stability.ai', description: 'Open source, highly customizable', icon: '🌊' },
];

  const ICON_CATEGORIES = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'nature', label: 'ธรรมชาติ', items: ['Sun', 'Moon', 'Cloud', 'Leaf', 'Flower', 'TreeDeciduous', 'Snowflake', 'Droplets', 'Flame'] },
    { id: 'objects', label: 'สิ่งของ', items: ['Camera', 'Video', 'Mic', 'Headphones', 'Watch', 'Glasses', 'Umbrella', 'Key', 'Lock', 'Bell', 'Tag', 'Flag', 'Anchor', 'Compass', 'MapPin', 'Globe'] },
    { id: 'shapes', label: 'สัญลักษณ์', items: ['Heart', 'Star', 'Zap', 'Ghost', 'Music', 'Feather', 'Diamond', 'Skull'] },
    { id: 'awards', label: 'รางวัล', items: ['Award', 'Gift', 'Trophy', 'Crown'] },
    { id: 'travel', label: 'ท่องเที่ยว', items: ['Rocket', 'Plane', 'Car', 'Bike'] },
  ];

// Types
type ElementType = 'text' | 'image' | 'shape' | 'sticker' | 'icon';

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
  curveType?: 'none' | 'circle' | 'arc' | 'wave';
  curveStrength?: number;
  effectType?: 'none' | 'shadow' | 'lift' | 'hollow' | 'splice' | 'outline' | 'echo' | 'glitch' | 'neon' | 'background';
  effectColor?: string;
  effectOffset?: number;
  effectBlur?: number;
  effectWidth?: number;
  effectDirection?: number;
  effectOpacity?: number;
}

export default function DesignerClient() {
  const router = useRouter();
  // UI State
  const [activeTool, setActiveTool] = useState<'product' | 'text' | 'uploads' | 'elements' | 'layers' | 'ai' | 'library' | 'text-effects' | null>('text');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [shirtColor, setShirtColor] = useState('#ffffff');
  const [availableColors, setAvailableColors] = useState<string[]>(['#ffffff']); // Selected colors for the product
  const [shirtSize, setShirtSize] = useState('M'); // Preview size
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['S', 'M', 'L', 'XL']);
  const [technique, setTechnique] = useState<'printing' | 'embroidery'>('printing');
  const [printingType, setPrintingType] = useState<'dtg' | 'dtflex'>('dtg');
  const [showFilters, setShowFilters] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [showRulers, setShowRulers] = useState(false);
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');
  const [showControls, setShowControls] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [fontSearchQuery, setFontSearchQuery] = useState('');
  const [showCurveSettings, setShowCurveSettings] = useState(false);
  
  // Snap Guides State
  const [snapX, setSnapX] = useState<number | null>(null);
  const [snapY, setSnapY] = useState<number | null>(null);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempText, setTempText] = useState('');
  const [currentCartId, setCurrentCartId] = useState<string | null>(null); // ID of the cart item being edited
  
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Check if we are editing an existing cart item
    const editItemId = localStorage.getItem('anajak_edit_item_id');
    if (editItemId) {
        const savedCart = localStorage.getItem('anajak_cart');
        if (savedCart) {
            try {
                const cartItems = JSON.parse(savedCart);
                const itemToEdit = cartItems.find((item: any) => item.id === editItemId);
                if (itemToEdit) {
                    setCurrentCartId(itemToEdit.id);
                    setShirtColor(itemToEdit.color);
                    setShirtSize(itemToEdit.size);
                    setTechnique(itemToEdit.technique);
                    if (itemToEdit.elements) {
                        setElements(itemToEdit.elements);
                    }
                }
            } catch (e) {
                console.error('Failed to load item to edit', e);
            }
        }
        // Clear the flag so refreshing doesn't reload it if we navigate away and back
        localStorage.removeItem('anajak_edit_item_id');
    }
  }, []);

  // History State
  const [history, setHistory] = useState<DesignElement[][]>([[]]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  
  const toggleColorSelection = (color: string) => {
    setShirtColor(color); // Always preview the clicked color
    setAvailableColors(prev => {
      if (prev.includes(color)) {
         if (prev.length === 1) return prev; // Prevent deselecting the last color
         return prev.filter(c => c !== color);
      }
      return [...prev, color];
    });
  };

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
  const elementStartPos = useRef({ x: 0, y: 0, width: 0, height: 0, fontSize: 0, rotation: 0 });

  const currentShirtSpec = SHIRT_SPECS[shirtSize] || SHIRT_SPECS['M'];
  const pixelsPerCm = BASE_SHIRT_WIDTH_PX / currentShirtSpec.width;
  
  // Calculate print area dimensions relative to shirt
  const printAreaWidthPercent = (PRINT_AREA_WIDTH_CM / currentShirtSpec.width) * 100;
  const printAreaHeightPercent = (PRINT_AREA_HEIGHT_CM / (currentShirtSpec.width * 1.2)) * 100; // Aspect ratio approx
  
  const selectedElement = elements.find(el => el.id === selectedId);

  const STEPS = [
    { id: 1, label: 'เลือกสินค้า', status: 'completed' },
    { id: 2, label: 'ออกแบบ', status: 'current' },
    { id: 3, label: 'ตรวจสอบ', status: 'upcoming' },
  ];

  // History Management
  const addToHistory = (newElements: DesignElement[]) => {
    const newHistory = history.slice(0, currentHistoryIndex + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setCurrentHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex(prev => prev - 1);
      setElements(history[currentHistoryIndex - 1]);
    }
  };

  const redo = () => {
    if (currentHistoryIndex < history.length - 1) {
      setCurrentHistoryIndex(prev => prev + 1);
      setElements(history[currentHistoryIndex + 1]);
    }
  };

  const handleTextEditStart = (el: DesignElement) => {
    if (el.type === 'text') {
      setEditingId(el.id);
      setTempText(el.content);
      // Wait for render to focus
      setTimeout(() => {
        if (textAreaRef.current) {
          textAreaRef.current.focus();
          textAreaRef.current.select();
        }
      }, 0);
    }
  };

  const handleTextEditEnd = () => {
    if (editingId) {
        // Update with final text
        // Also trigger measureText to auto-resize if needed
        const el = elements.find(e => e.id === editingId);
        if (el && el.type === 'text') {
            const fs = el.fontSize || 32;
            const font = el.fontFamily || 'Sarabun';
            const dims = measureText(tempText, fs, font);
            
            updateElementWithHistory(editingId, { 
                content: tempText,
                width: Math.max(20, dims.width + 10),
                height: Math.max(el.height, dims.height)
            });
        }
        setEditingId(null);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTempText(e.target.value);
    // Auto-expand textarea height while typing if needed? 
    // For now, let's just update the content in real-time visually on the textarea
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (editingId) return; // Disable shortcuts while editing text
      
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;

      // Delete
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedId) {
           const newElements = elements.filter(el => el.id !== selectedId);
           setElements(newElements);
           addToHistory(newElements);
           setSelectedId(null);
        }
      }

      // Undo/Redo
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      }

      // Nudge
      if (selectedId && selectedElement) {
        const step = e.shiftKey ? 10 : 1;
        let newX = selectedElement.x;
        let newY = selectedElement.y;
        let changed = false;

        if (e.key === 'ArrowLeft') { newX -= step; changed = true; }
        if (e.key === 'ArrowRight') { newX += step; changed = true; }
        if (e.key === 'ArrowUp') { newY -= step; changed = true; }
        if (e.key === 'ArrowDown') { newY += step; changed = true; }

        if (changed) {
          e.preventDefault();
          const newElements = elements.map(el => el.id === selectedId ? { ...el, x: newX, y: newY } : el);
          setElements(newElements);
          // Debounce history add for nudging could be better, but simple for now
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, elements, currentHistoryIndex, history]); // Add history deps

  useEffect(() => {
    // Global Mouse Events for Dragging/Resizing
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && selectedId && selectedElement) { // Added selectedElement check
        const dx = (e.clientX - dragStartPos.current.x) / (zoom / 100);
        const dy = (e.clientY - dragStartPos.current.y) / (zoom / 100);
        
        let newX = elementStartPos.current.x + dx;
        let newY = elementStartPos.current.y + dy;

        const SNAP_THRESHOLD = 5;
        const CANVAS_WIDTH = 500;
        const CANVAS_HEIGHT = 600;
        
        // Target edges (un-snapped initially)
        const tWidth = selectedElement.width;
        const tHeight = selectedElement.height;
        let tLeft = newX;
        let tRight = newX + tWidth;
        let tCenterX = newX + tWidth / 2;
        
        let tTop = newY;
        let tBottom = newY + tHeight;
        let tCenterY = newY + tHeight / 2;

        let bestSnapX: number | null = null;
        let minDiffX = SNAP_THRESHOLD;
        let bestSnapY: number | null = null;
        let minDiffY = SNAP_THRESHOLD;

        // 1. Snap to Canvas Center
        const canvasCenterX = CANVAS_WIDTH / 2;
        const canvasCenterY = CANVAS_HEIGHT / 2;

        if (Math.abs(tCenterX - canvasCenterX) < minDiffX) {
            newX = canvasCenterX - tWidth / 2;
            bestSnapX = canvasCenterX;
            minDiffX = Math.abs(tCenterX - canvasCenterX);
        }
        if (Math.abs(tCenterY - canvasCenterY) < minDiffY) {
            newY = canvasCenterY - tHeight / 2;
            bestSnapY = canvasCenterY;
            minDiffY = Math.abs(tCenterY - canvasCenterY);
        }

        // 2. Snap to Other Objects
        const otherElements = elements.filter(el => el.id !== selectedId && el.side === viewSide);
        
        otherElements.forEach(other => {
            // X Alignment
            const oLeft = other.x;
            const oRight = other.x + other.width;
            const oCenterX = other.x + other.width / 2;
            const oTop = other.y;
            const oBottom = other.y + other.height;
            const oCenterY = other.y + other.height / 2;

            // Snap Target Left to Other (Left, Right, Center)
            if (Math.abs(tLeft - oLeft) < minDiffX) { newX = oLeft; bestSnapX = oLeft; minDiffX = Math.abs(tLeft - oLeft); }
            if (Math.abs(tLeft - oRight) < minDiffX) { newX = oRight; bestSnapX = oRight; minDiffX = Math.abs(tLeft - oRight); }
            if (Math.abs(tLeft - oCenterX) < minDiffX) { newX = oCenterX; bestSnapX = oCenterX; minDiffX = Math.abs(tLeft - oCenterX); }

            // Snap Target Right to Other (Left, Right, Center)
            if (Math.abs(tRight - oLeft) < minDiffX) { newX = oLeft - tWidth; bestSnapX = oLeft; minDiffX = Math.abs(tRight - oLeft); }
            if (Math.abs(tRight - oRight) < minDiffX) { newX = oRight - tWidth; bestSnapX = oRight; minDiffX = Math.abs(tRight - oRight); }
            if (Math.abs(tRight - oCenterX) < minDiffX) { newX = oCenterX - tWidth; bestSnapX = oCenterX; minDiffX = Math.abs(tRight - oCenterX); }

            // Snap Target Center to Other (Left, Right, Center)
            if (Math.abs(tCenterX - oLeft) < minDiffX) { newX = oLeft - tWidth/2; bestSnapX = oLeft; minDiffX = Math.abs(tCenterX - oLeft); }
            if (Math.abs(tCenterX - oRight) < minDiffX) { newX = oRight - tWidth/2; bestSnapX = oRight; minDiffX = Math.abs(tCenterX - oRight); }
            if (Math.abs(tCenterX - oCenterX) < minDiffX) { newX = oCenterX - tWidth/2; bestSnapX = oCenterX; minDiffX = Math.abs(tCenterX - oCenterX); }

            // Y Alignment (similar logic)
             if (Math.abs(tTop - oTop) < minDiffY) { newY = oTop; bestSnapY = oTop; minDiffY = Math.abs(tTop - oTop); }
             if (Math.abs(tTop - oBottom) < minDiffY) { newY = oBottom; bestSnapY = oBottom; minDiffY = Math.abs(tTop - oBottom); }
             if (Math.abs(tTop - oCenterY) < minDiffY) { newY = oCenterY; bestSnapY = oCenterY; minDiffY = Math.abs(tTop - oCenterY); }

             if (Math.abs(tBottom - oTop) < minDiffY) { newY = oTop - tHeight; bestSnapY = oTop; minDiffY = Math.abs(tBottom - oTop); }
             if (Math.abs(tBottom - oBottom) < minDiffY) { newY = oBottom - tHeight; bestSnapY = oBottom; minDiffY = Math.abs(tBottom - oBottom); }
             if (Math.abs(tBottom - oCenterY) < minDiffY) { newY = oCenterY - tHeight; bestSnapY = oCenterY; minDiffY = Math.abs(tBottom - oCenterY); }

             if (Math.abs(tCenterY - oTop) < minDiffY) { newY = oTop - tHeight/2; bestSnapY = oTop; minDiffY = Math.abs(tCenterY - oTop); }
             if (Math.abs(tCenterY - oBottom) < minDiffY) { newY = oBottom - tHeight/2; bestSnapY = oBottom; minDiffY = Math.abs(tCenterY - oBottom); }
             if (Math.abs(tCenterY - oCenterY) < minDiffY) { newY = oCenterY - tHeight/2; bestSnapY = oCenterY; minDiffY = Math.abs(tCenterY - oCenterY); }
        });

        setSnapX(bestSnapX);
        setSnapY(bestSnapY);

        setElements(prev => prev.map(el => el.id === selectedId ? { ...el, x: newX, y: newY } : el));
      } else if (isResizing && selectedId && selectedElement && resizeHandle) {
        const dx = (e.clientX - dragStartPos.current.x) / (zoom / 100);
        const dy = (e.clientY - dragStartPos.current.y) / (zoom / 100);
        
        const start = elementStartPos.current;
        let newX = start.x;
        let newY = start.y;
        let newWidth = start.width;
        let newHeight = start.height;

        // Aspect Ratio for proportional resizing
        const aspectRatio = start.width / start.height;

        if (['ne', 'nw', 'se', 'sw'].includes(resizeHandle)) {
           // CORNER RESIZE: Proportional (Scale)
           if (resizeHandle.includes('e')) {
              newWidth = Math.max(20, start.width + dx);
           } else {
              newWidth = Math.max(20, start.width - dx);
              newX = start.x + (start.width - newWidth);
           }
           
           // Enforce aspect ratio based on new width
           newHeight = newWidth / aspectRatio;

           if (resizeHandle.includes('n')) {
              newY = start.y + (start.height - newHeight);
           }
           
           // Update element
           const updates: Partial<DesignElement> = { x: newX, y: newY, width: newWidth, height: newHeight };
           
           // Scale font size for text/stickers (Correctly based on start size)
           if (start.fontSize) {
             updates.fontSize = start.fontSize * (newWidth / start.width);
           }
           
           setElements(prev => prev.map(el => el.id === selectedId ? { ...el, ...updates } : el));

        } else {
           // SIDE RESIZE: Free (Crop/Wrap)
           if (resizeHandle === 'e' || resizeHandle === 'w') {
              if (resizeHandle === 'e') {
                newWidth = Math.max(20, start.width + dx);
              } else {
                newWidth = Math.max(20, start.width - dx);
                newX = start.x + (start.width - newWidth);
              }
           }
           
           if (resizeHandle === 'n' || resizeHandle === 's') {
              if (resizeHandle === 's') {
                newHeight = Math.max(20, start.height + dy);
              } else {
                newHeight = Math.max(20, start.height - dy);
                newY = start.y + (start.height - newHeight);
              }
           }
           
           // For side resize, we DON'T scale font size, just dimensions (like Canva)
           setElements(prev => prev.map(el => el.id === selectedId ? { ...el, x: newX, y: newY, width: newWidth, height: newHeight } : el));
        }
      }
    };

    const handleMouseUp = () => {
      if (isDragging || isResizing) {
         // Add to history on drag end
         addToHistory(elements);
      }
      setIsDragging(false);
      setIsResizing(false);
      setResizeHandle(null);
      setSnapX(null);
      setSnapY(null);
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, selectedId, zoom, selectedElement, elements]); // Added elements dependency for history snapshot

  // Auto-close Text Effects panel if no text element is selected
  useEffect(() => {
    if (activeTool === 'text-effects') {
        if (!selectedElement || selectedElement.type !== 'text') {
            setActiveTool(null);
        }
    }
  }, [selectedElement, activeTool]);

  // Text Measurement Helper
  const measureText = (text: string, fontSize: number, fontFamily: string) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return { width: 200, height: 50 };

    context.font = `${fontSize}px ${fontFamily}`;
    const metrics = context.measureText(text);
    
    // Height estimation (Canvas measureText height is tricky, usually fontSize * 1.2 is decent for tight fit)
    // But for Thai, we need a bit more.
    const width = Math.ceil(metrics.width);
    const height = Math.ceil(fontSize * 1.2); // Tight fit for line-height 1 + buffer

    return { width, height };
  };

  // Helpers
  const addElement = (type: ElementType, content: string, extraProps: any = {}) => {
    // Default dimensions based on type
    let width = 200;
    let height = 50;

    if (type === 'text') {
      const fs = extraProps.fontSize || 32;
      const font = extraProps.fontFamily || 'Sarabun';
      const dims = measureText(content, fs, font);
      width = dims.width + 10; // Add small buffer for anti-aliasing/padding
      height = dims.height;
    }

    if (type === 'image' || type === 'shape' || type === 'sticker' || type === 'icon') {
      width = 100;
      height = 100;
    }

      const newEl: DesignElement = {
      id: Date.now().toString(), type, content, 
      x: 250 - width/2, y: 300 - height/2, // Start at center
      width, height,
      rotation: 0, opacity: 100,
      color: '#000000', fontSize: 32, fontFamily: 'Sarabun', fontWeight: 'normal', fontStyle: 'normal', textAlign: 'center',
      brightness: 100, contrast: 100, grayscale: 0,
      side: viewSide, // Add to current side
      ...extraProps
    };
    const newElements = [...elements, newEl];
    setElements(newElements);
    addToHistory(newElements);
    setSelectedId(newEl.id);
  };

  const updateElement = (id: string | null, changes: Partial<DesignElement>) => {
    if (!id) return;
    const newElements = elements.map(el => el.id === id ? { ...el, ...changes } : el);
    setElements(newElements);
    // Note: For continuous updates like color picker, we might want to debounce history
    // But for now, let's add history for simple clicks. 
    // Ideally we separate "committing" changes vs "previewing".
    // For simplicity in this context, we might skip addToHistory here and rely on explicit actions or just add it.
    // Let's add it to be safe, though it might create many history steps for sliders.
  };
  
  // Better update for history: only call addToHistory on "final" actions.
  // But since updateElement is used by sliders, we need to be careful.
  // Let's create a separate function for "Finalize Update" or just use mouseUp on sliders.
  // For buttons (bold, italic, align), we should add history.
  
  const updateElementWithHistory = (id: string | null, changes: Partial<DesignElement>) => {
      if (!id) return;
      const newElements = elements.map(el => el.id === id ? { ...el, ...changes } : el);
      setElements(newElements);
      addToHistory(newElements);
  };

  const deleteElement = (id: string | null) => {
    if (!id) return;
    const newElements = elements.filter(el => el.id !== id);
    setElements(newElements);
    addToHistory(newElements);
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
    addToHistory(newElements); // Add to history for layer moves
  };

  // Interaction Handlers
  const handleDragStart = (e: React.MouseEvent, el: DesignElement) => {
    e.stopPropagation();
    setSelectedId(el.id);
    setShowFilters(false);
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    elementStartPos.current = { 
      x: el.x, 
      y: el.y, 
      width: el.width, 
      height: el.height,
      fontSize: el.fontSize || 0,
      rotation: el.rotation
    };
  };

  const handleTextEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedId && selectedElement) {
      // Auto-resize width on text change to keep it tight
      // But we only update width, keeping height manual or proportionally updated if we wanted?
      // Actually, user expects box to grow with text usually.
      
      const fs = selectedElement.fontSize || 32;
      const font = selectedElement.fontFamily || 'Sarabun';
      const dims = measureText(e.target.value, fs, font);
      
      updateElement(selectedId, { 
        content: e.target.value,
        width: Math.max(20, dims.width + 10), // Buffer
        // height: dims.height // Optional: update height too? Let's keep height manual/fixed for now as user might have cropped it? 
        // Actually, usually typing extends the box.
        height: Math.max(selectedElement.height, dims.height)
      });
    }
  };

  const handleResizeStart = (e: React.MouseEvent, el: DesignElement, handle: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeHandle(handle);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    elementStartPos.current = { 
      x: el.x, 
      y: el.y, 
      width: el.width, 
      height: el.height,
      fontSize: el.fontSize || 0,
      rotation: el.rotation
    };
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

  const handleSaveClick = () => {
    setShowReviewModal(true);
  };

  const handleFinalSave = (action: 'template' | 'cart') => {
    // Common Item Data
    const itemData = {
      id: currentCartId || crypto.randomUUID(),
      name: 'เสื้อยืด Cotton พรีเมียม', // Should be dynamic based on product
      color: shirtColor,
      colorName: COLORS.find(c => c.value === shirtColor)?.name || 'Custom',
      availableColors: availableColors, // Save selected colors
      size: shirtSize,
      availableSizes: selectedSizes, // Save selected sizes
      technique: technique,
      price: currentPrice,
      previewImage: viewSide === 'front' ? MOCKUP_IMAGES.front : MOCKUP_IMAGES.back,
      elements: elements,
      updatedAt: new Date().toISOString(),
      variants: 1,
      profit: 0 // Default profit
    };

    if (action === 'cart') {
      // 1. Add to Cart
      const cartItem = {
        ...itemData,
        quantity: 1,
        timestamp: Date.now()
      };

      const existingCart = localStorage.getItem('anajak_cart');
      let cart = existingCart ? JSON.parse(existingCart) : [];
      
      if (currentCartId) {
          cart = cart.map((item: any) => item.id === currentCartId ? { ...cartItem, quantity: item.quantity } : item);
      } else {
          cart.push(cartItem);
      }
      
      localStorage.setItem('anajak_cart', JSON.stringify(cart));
      router.push('/cart');

    } else {
      // 2. Save as Template
      const templateItem = {
        ...itemData,
        productName: itemData.name,
        status: 'draft' // Default status is always draft now
      };

      const existingTemplates = localStorage.getItem('anajak_templates');
      let templates = existingTemplates ? JSON.parse(existingTemplates) : [];
      
      const existingIndex = templates.findIndex((t: any) => t.id === templateItem.id);
      if (existingIndex >= 0) {
          templates[existingIndex] = templateItem;
      } else {
          templates.push(templateItem);
      }
      
      localStorage.setItem('anajak_templates', JSON.stringify(templates));
      router.push('/templates');
    }
    
    setShowReviewModal(false);
  };

  return (
    <div className="flex h-screen bg-slate-50/50 overflow-hidden font-sans text-slate-800">
      
      {/* 1. Left Sidebar */}
      <div className="w-[72px] bg-white border-r border-slate-200 flex flex-col items-center py-4 z-30 shadow-sm flex-shrink-0">
        <Link href="/catalog" className="mb-6 w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg hover:scale-105 transition-transform">A</Link>
        <div className="w-full flex-1 space-y-1">
          <SidebarItem icon={Shirt} label="สินค้า" id="product" isActive={activeTool === 'product'} onClick={setActiveTool} />
          <SidebarItem icon={Type} label="ข้อความ" id="text" isActive={activeTool === 'text'} onClick={setActiveTool} />
          <SidebarItem icon={UploadCloud} label="อัปโหลด" id="uploads" isActive={activeTool === 'uploads'} onClick={setActiveTool} />
          <SidebarItem icon={Library} label="คลังของฉัน" id="library" isActive={activeTool === 'library'} onClick={setActiveTool} />
          <SidebarItem icon={Sparkles} label="AI Gen" id="ai" isActive={activeTool === 'ai'} onClick={setActiveTool} />
          <SidebarItem icon={Shapes} label="องค์ประกอบ" id="elements" isActive={activeTool === 'elements'} onClick={setActiveTool} />
          <SidebarItem icon={Layers} label="เลเยอร์" id="layers" isActive={activeTool === 'layers'} onClick={setActiveTool} />
        </div>
      </div>

      {/* 2. Slide-out Panel */}
      <div className={`w-80 bg-white border-r border-slate-200 flex flex-col z-20 shadow-xl transition-all duration-300 absolute left-[72px] top-0 bottom-0 transform ${activeTool ? 'translate-x-0' : '-translate-x-full opacity-0 pointer-events-none'}`}>
        <div className="h-14 border-b border-slate-100 flex items-center justify-between px-6 bg-white/80 backdrop-blur sticky top-0 z-10">
          <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2 capitalize">
            {activeTool === 'product' ? 'สินค้า' : 
             activeTool === 'text' ? 'ข้อความ' : 
             activeTool === 'uploads' ? 'อัปโหลด' : 
             activeTool === 'library' ? 'คลังของฉัน' : 
             activeTool === 'ai' ? 'สร้างภาพ AI' : 
             activeTool === 'text-effects' ? 'เอฟเฟกต์' :
             activeTool === 'elements' ? 'องค์ประกอบ' : 'เลเยอร์'}
          </h2>
          <button onClick={() => setActiveTool(null)} className="p-2 hover:bg-slate-100 rounded-full"><ChevronLeft className="w-5 h-5 text-slate-400" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {/* Removed font-selector panel as per request to integrate into text panel */}
          {activeTool === 'text-effects' && (
            <div className="space-y-8">
               {/* Style Section */}
               <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-800 text-sm">สไตล์ข้อความ</h3>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded-full">เลือก 1 แบบ</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                     {[
                       { id: 'none', label: 'ปกติ', preview: 'Aa', style: {} },
                       { id: 'shadow', label: 'มีเงา', preview: 'Aa', style: { textShadow: '2px 2px 0px rgba(0,0,0,0.2)' } },
                       { id: 'lift', label: 'ยกนูน', preview: 'Aa', style: { textShadow: '0px 4px 8px rgba(0,0,0,0.3)' } },
                       { id: 'hollow', label: 'ตัวกลวง', preview: 'Aa', style: { WebkitTextStroke: '1px currentColor', color: 'transparent' } },
                       { id: 'splice', label: 'ซ้อนทับ', preview: 'Aa', style: { WebkitTextStroke: '1px currentColor', color: 'transparent', textShadow: '2px 2px 0px #cbd5e1' } },
                       { id: 'outline', label: 'เส้นขอบ', preview: 'Aa', style: { WebkitTextStroke: '2px currentColor', color: 'transparent', fontWeight: 'bold' } },
                       { id: 'echo', label: 'สะท้อน', preview: 'Aa', style: { textShadow: '2px 2px 0px rgba(0,0,0,0.1), 4px 4px 0px rgba(0,0,0,0.1)' } },
                       { id: 'neon', label: 'นีออน', preview: 'Aa', style: { textShadow: '0 0 10px currentColor', color: 'white' } },
                       { id: 'glitch', label: 'กลิตช์', preview: 'Aa', style: { textShadow: '2px 0px #ef4444, -2px 0px #3b82f6' } },
                       { id: 'background', label: 'พื้นหลัง', preview: 'Aa', style: { backgroundColor: 'currentColor', color: 'white', padding: '0 4px', borderRadius: '4px' } },
                     ].map((effect) => (
                       <button
                         key={effect.id}
                         onClick={() => updateElementWithHistory(selectedId, { 
                            effectType: effect.id as any,
                            effectColor: effect.id === 'neon' ? '#ec4899' : 
                                   effect.id === 'background' ? '#fcd34d' : 
                                   effect.id === 'shadow' ? '#000000' :
                                   selectedElement?.color,
                            effectOffset: effect.id === 'shadow' ? 4 : 2,
                            effectBlur: effect.id === 'neon' ? 10 : effect.id === 'lift' ? 8 : 0,
                            effectWidth: effect.id === 'outline' ? 2 : 1,
                            effectOpacity: 100,
                            effectDirection: 45,
                            backgroundColor: effect.id === 'background' ? '#fcd34d' : 'transparent'
                         })}
                         className={`flex items-center gap-3 p-3 rounded-xl border transition-all group text-left relative overflow-hidden ${selectedElement?.effectType === effect.id || (!selectedElement?.effectType && effect.id === 'none') ? 'border-ci-blue bg-blue-50/50 ring-1 ring-ci-blue' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                       >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold ${effect.id === 'background' ? 'text-slate-800' : 'text-slate-700'}`} style={effect.style}>
                             {effect.preview}
                          </div>
                          <span className={`text-xs font-bold ${selectedElement?.effectType === effect.id || (!selectedElement?.effectType && effect.id === 'none') ? 'text-ci-blue' : 'text-slate-600'}`}>{effect.label}</span>
                          
                          {(selectedElement?.effectType === effect.id || (!selectedElement?.effectType && effect.id === 'none')) && (
                            <div className="absolute top-2 right-2 w-2 h-2 bg-ci-blue rounded-full shadow-sm" />
                          )}
                       </button>
                     ))}
                  </div>

                  {/* Effect Settings */}
                  {selectedElement?.effectType && selectedElement.effectType !== 'none' && (
                    <div className="mt-4 space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                           <h4 className="text-xs font-bold text-slate-800">ปรับแต่งเอฟเฟกต์</h4>
                        </div>

                        {/* Color Picker */}
                        {(['shadow', 'outline', 'neon', 'background', 'echo', 'hollow', 'splice', 'glitch'].includes(selectedElement.effectType)) && (
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase">สีเอฟเฟกต์</label>
                                    <div className="w-4 h-4 rounded border border-slate-200" style={{ backgroundColor: selectedElement.effectColor || '#000' }} />
                                </div>
                                <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                                    {[selectedElement.color, '#000000', '#ffffff', '#1e3a8a', '#dc2626', '#ea580c', '#eab308', '#16a34a', '#38bdf8', '#ec4899', '#7e22ce'].map((c, i) => (
                                        <button 
                                            key={i}
                                            onClick={() => updateElementWithHistory(selectedId, { effectColor: c })}
                                            className={`w-6 h-6 rounded-full border border-slate-200 flex-shrink-0 ${selectedElement.effectColor === c ? 'ring-2 ring-offset-1 ring-ci-blue' : ''}`}
                                            style={{ backgroundColor: c }}
                                        />
                                    ))}
                                    <input 
                                        type="color" 
                                        value={selectedElement.effectColor || '#000000'}
                                        onChange={(e) => updateElement(selectedId, { effectColor: e.target.value })}
                                        onBlur={() => addToHistory(elements)}
                                        className="w-6 h-6 rounded-full border-0 p-0 overflow-hidden flex-shrink-0 cursor-pointer"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Distance / Offset */}
                        {['shadow', 'lift', 'echo', 'glitch'].includes(selectedElement.effectType) && (
                           <div className="space-y-1">
                              <div className="flex justify-between">
                                 <label className="text-[10px] font-bold text-slate-500 uppercase">ระยะห่าง</label>
                                 <span className="text-[10px] text-slate-400">{selectedElement.effectOffset ?? 0}</span>
                              </div>
                              <input 
                                type="range" min="0" max="50" 
                                value={selectedElement.effectOffset ?? 4} 
                                onChange={(e) => updateElement(selectedId, { effectOffset: parseInt(e.target.value) })}
                                onMouseUp={() => addToHistory(elements)}
                                className="w-full accent-ci-blue h-1 bg-slate-200 rounded-lg appearance-none"
                              />
                           </div>
                        )}

                        {/* Direction */}
                        {['shadow', 'echo'].includes(selectedElement.effectType) && (
                           <div className="space-y-1">
                              <div className="flex justify-between">
                                 <label className="text-[10px] font-bold text-slate-500 uppercase">ทิศทาง</label>
                                 <span className="text-[10px] text-slate-400">{selectedElement.effectDirection ?? 45}°</span>
                              </div>
                              <input 
                                type="range" min="0" max="360" 
                                value={selectedElement.effectDirection ?? 45} 
                                onChange={(e) => updateElement(selectedId, { effectDirection: parseInt(e.target.value) })}
                                onMouseUp={() => addToHistory(elements)}
                                className="w-full accent-ci-blue h-1 bg-slate-200 rounded-lg appearance-none"
                              />
                           </div>
                        )}

                        {/* Blur */}
                        {['shadow', 'lift', 'neon'].includes(selectedElement.effectType) && (
                           <div className="space-y-1">
                              <div className="flex justify-between">
                                 <label className="text-[10px] font-bold text-slate-500 uppercase">ความฟุ้ง</label>
                                 <span className="text-[10px] text-slate-400">{selectedElement.effectBlur ?? 0}</span>
                              </div>
                              <input 
                                type="range" min="0" max="50" 
                                value={selectedElement.effectBlur ?? 0} 
                                onChange={(e) => updateElement(selectedId, { effectBlur: parseInt(e.target.value) })}
                                onMouseUp={() => addToHistory(elements)}
                                className="w-full accent-ci-blue h-1 bg-slate-200 rounded-lg appearance-none"
                              />
                           </div>
                        )}

                        {/* Width / Thickness */}
                        {['outline', 'hollow', 'splice'].includes(selectedElement.effectType) && (
                           <div className="space-y-1">
                              <div className="flex justify-between">
                                 <label className="text-[10px] font-bold text-slate-500 uppercase">ความหนาเส้น</label>
                                 <span className="text-[10px] text-slate-400">{selectedElement.effectWidth ?? 1}px</span>
                              </div>
                              <input 
                                type="range" min="0" max="10" step="0.5"
                                value={selectedElement.effectWidth ?? 1} 
                                onChange={(e) => updateElement(selectedId, { effectWidth: parseFloat(e.target.value) })}
                                onMouseUp={() => addToHistory(elements)}
                                className="w-full accent-ci-blue h-1 bg-slate-200 rounded-lg appearance-none"
                              />
                           </div>
                        )}
                        
                        {/* Padding - for Background */}
                        {['background'].includes(selectedElement.effectType) && (
                           <div className="space-y-1">
                              <div className="flex justify-between">
                                 <label className="text-[10px] font-bold text-slate-500 uppercase">ขนาดพื้นหลัง</label>
                                 <span className="text-[10px] text-slate-400">{selectedElement.effectWidth ?? 4}</span>
                              </div>
                              <input 
                                type="range" min="0" max="20" 
                                value={selectedElement.effectWidth ?? 4} 
                                onChange={(e) => updateElement(selectedId, { effectWidth: parseInt(e.target.value) })}
                                onMouseUp={() => addToHistory(elements)}
                                className="w-full accent-ci-blue h-1 bg-slate-200 rounded-lg appearance-none"
                              />
                           </div>
                        )}
                        
                         {/* Roundness - for Background */}
                        {['background'].includes(selectedElement.effectType) && (
                           <div className="space-y-1">
                              <div className="flex justify-between">
                                 <label className="text-[10px] font-bold text-slate-500 uppercase">ความมน</label>
                                 <span className="text-[10px] text-slate-400">{selectedElement.effectBlur ?? 4}</span>
                              </div>
                              <input 
                                type="range" min="0" max="20" 
                                value={selectedElement.effectBlur ?? 4} 
                                onChange={(e) => updateElement(selectedId, { effectBlur: parseInt(e.target.value) })}
                                onMouseUp={() => addToHistory(elements)}
                                className="w-full accent-ci-blue h-1 bg-slate-200 rounded-lg appearance-none"
                              />
                           </div>
                        )}
                    </div>
                  )}
               </div>

               <div className="h-px w-full bg-slate-100" />

               {/* Shape Section */}
               <div>
                  <h3 className="font-bold text-slate-800 text-sm mb-4">การดัดโค้ง</h3>
                  <div className="bg-slate-50 rounded-2xl p-1.5 flex gap-1 border border-slate-100">
                     <button
                        onClick={() => updateElementWithHistory(selectedId, { curveType: 'none' })}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${!selectedElement?.curveType || selectedElement?.curveType === 'none' ? 'bg-white shadow-sm text-ci-blue ring-1 ring-slate-200' : 'text-slate-500 hover:bg-white/50'}`}
                     >
                        <Type className="w-4 h-4" />
                        <span>ปกติ</span>
                     </button>
                     <button
                        onClick={() => updateElementWithHistory(selectedId, { curveType: 'arc', width: selectedElement?.width && selectedElement.width < 200 ? 250 : selectedElement?.width })}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${selectedElement?.curveType === 'arc' ? 'bg-white shadow-sm text-ci-blue ring-1 ring-slate-200' : 'text-slate-500 hover:bg-white/50'}`}
                     >
                        <div className="w-4 h-4 border-t-2 border-current rounded-t-full mt-1" />
                        <span>โค้ง</span>
                     </button>
                     <button
                        onClick={() => updateElementWithHistory(selectedId, { curveType: 'circle', width: selectedElement?.width && selectedElement.width < 200 ? 250 : selectedElement?.width })}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${selectedElement?.curveType === 'circle' ? 'bg-white shadow-sm text-ci-blue ring-1 ring-slate-200' : 'text-slate-500 hover:bg-white/50'}`}
                     >
                        <div className="w-4 h-4 border-2 border-current rounded-full" />
                        <span>วงกลม</span>
                     </button>
                  </div>

                  {/* Curve Settings */}
                  {(selectedElement?.curveType === 'arc' || selectedElement?.curveType === 'circle' || selectedElement?.curveType === 'wave') && (
                     <div className="mt-4 space-y-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        {selectedElement.curveType !== 'circle' && (
                           <>
                              <div className="flex justify-between items-center">
                                 <span className="text-xs font-bold text-slate-500">ระดับความโค้ง</span>
                                 <span className="text-xs font-bold text-ci-blue bg-blue-50 px-2 py-0.5 rounded">{selectedElement.curveStrength ?? 50}%</span>
                              </div>
                              <div className="relative h-6 flex items-center">
                                 <div className="absolute left-0 right-0 h-1 bg-slate-100 rounded-full"></div>
                                 <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    value={selectedElement.curveStrength ?? 50} 
                                    onChange={(e) => updateElement(selectedId, { curveStrength: parseInt(e.target.value) })} 
                                    onMouseUp={() => addToHistory(elements)}
                                    className="w-full absolute inset-0 opacity-0 cursor-pointer z-10" 
                                 />
                                 <div 
                                    className="absolute h-4 w-4 bg-white border-2 border-ci-blue rounded-full shadow-sm pointer-events-none transition-all"
                                    style={{ left: `calc(${selectedElement.curveStrength ?? 50}% - 8px)` }}
                                 />
                                 <div 
                                    className="absolute left-0 h-1 bg-ci-blue rounded-l-full pointer-events-none"
                                    style={{ width: `${selectedElement.curveStrength ?? 50}%` }}
                                 />
                              </div>
                           </>
                        )}
                        
                        {/* Diameter / Width Control for all curve types */}
                        <div className="pt-2 border-t border-slate-100 mt-2">
                           <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-bold text-slate-500">ความกว้าง (เส้นผ่านศูนย์กลาง)</span>
                              <span className="text-xs font-bold text-slate-400">{Math.round(selectedElement.width)} px</span>
                           </div>
                           <input 
                              type="range" 
                              min="100" 
                              max="800" 
                              value={selectedElement.width} 
                              onChange={(e) => updateElement(selectedId, { width: parseInt(e.target.value) })}
                              onMouseUp={() => addToHistory(elements)}
                              className="w-full accent-ci-blue h-1 bg-slate-200 rounded-lg appearance-none" 
                           />
                        </div>
                     </div>
                  )}
               </div>
            </div>
          )}
          {activeTool === 'product' && (
            <div className="space-y-8 px-2">
              {/* Product Summary Card */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="aspect-square w-full bg-white rounded-xl border border-slate-200 mb-3 p-4 flex items-center justify-center relative overflow-hidden">
                   <img src="https://www.pngall.com/wp-content/uploads/2016/04/T-Shirt-PNG-File.png" className="w-full h-full object-contain mix-blend-multiply" />
                   <div className="absolute bottom-2 right-2 bg-ci-blue text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                     ฿{currentPrice}
                   </div>
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">เสื้อยืด Cotton พรีเมียม</h3>
                <p className="text-xs text-slate-500">ผ้าคอตตอน 100% คุณภาพสูง ใส่สบาย ระบายอากาศดี</p>
              </div>

              {/* Customization Options */}
              <div className="space-y-6">
                {/* Technique Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">เทคนิคการพิมพ์</label>
                  <div className="p-1 bg-slate-100 rounded-xl flex gap-1">
                     {[{ id: 'printing', label: 'สกรีน' }, { id: 'embroidery', label: 'ปัก' }].map((t) => (
                       <button 
                         key={t.id}
                         onClick={() => setTechnique(t.id as any)}
                         className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${technique === t.id ? 'bg-white text-ci-blue shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                       >
                         {t.label}
                       </button>
                     ))}
                  </div>
                </div>

                {/* Colors */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">สีเสื้อที่ต้องการ</label>
                    <button onClick={() => setAvailableColors(availableColors.length === COLORS.length ? [shirtColor] : COLORS.map(c => c.value))} className="text-[10px] font-bold text-ci-blue hover:underline">
                      {availableColors.length === COLORS.length ? 'ล้างค่า' : 'เลือกทั้งหมด'}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {COLORS.map((c) => {
                      const isSelected = availableColors.includes(c.value);
                      const isActive = shirtColor === c.value;
                      
                      return (
                        <button 
                          key={c.value} 
                          onClick={() => toggleColorSelection(c.value)} 
                          className={`w-8 h-8 rounded-full shadow-sm transition-all relative group ${isActive ? 'ring-2 ring-offset-2 ring-ci-blue scale-110 z-10' : 'ring-1 ring-slate-200 hover:scale-105 hover:shadow-md'}`}
                          style={{ backgroundColor: c.value }}
                          title={c.name}
                        >
                           {/* Selected Indicator (Checkmark) */}
                           {isSelected && (
                             <div className="absolute inset-0 flex items-center justify-center">
                               <div className="bg-black/20 rounded-full p-0.5 backdrop-blur-[1px]">
                                 <Check className="w-3 h-3 text-white stroke-[3]" />
                               </div>
                             </div>
                           )}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-slate-400">
                    * คลิกเพื่อเลือกสีเสื้อที่ต้องการสั่งทำ (สีปัจจุบัน: <span className="font-bold text-slate-600">{COLORS.find(c => c.value === shirtColor)?.name}</span>)
                  </p>
                </div>

                {/* Sizes */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">ไซส์ที่ต้องการ</label>
                    <button onClick={() => setSelectedSizes(selectedSizes.length === SIZES.length ? [] : [...SIZES])} className="text-[10px] font-bold text-ci-blue hover:underline">
                      {selectedSizes.length === SIZES.length ? 'ล้างค่า' : 'เลือกทั้งหมด'}
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
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${isSelected ? 'bg-ci-blue text-white border-ci-blue' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}
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
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search fonts" 
                  value={fontSearchQuery}
                  onChange={(e) => setFontSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-transparent focus:bg-white border focus:border-ci-blue rounded-xl text-sm transition-all outline-none"
                />
              </div>

              <button onClick={() => addElement('text', 'ข้อความ', { fontSize: 32 })} className="w-full py-3 bg-gradient-to-r from-ci-blue to-blue-600 text-white rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform shadow-lg shadow-ci-blue/20 flex items-center justify-center gap-2">
                <Type className="w-5 h-5" />
                เพิ่มกล่องข้อความ
              </button>
              
              {/* Curved Text Section */}
              <div className="space-y-3">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <h3 className="font-bold text-slate-800 text-sm">Curved Text</h3>
                       <span className="bg-slate-100 text-slate-500 text-[10px] px-1.5 py-0.5 rounded font-medium">Editable</span>
                    </div>
                    <button className="text-xs text-slate-400 hover:text-ci-blue underline decoration-dotted underline-offset-2">Show more</button>
                 </div>
                 <div className="grid grid-cols-3 gap-2">
                    {/* Mock Curved Text Items */}
                    <button onClick={() => addElement('text', 'Curved', { fontSize: 32, curveType: 'circle', width: 250, height: 250 })} className="aspect-square bg-white rounded-xl border border-slate-200 hover:border-ci-blue hover:shadow-md flex items-center justify-center p-2 group transition-all overflow-hidden">
                       <div className="w-full h-full rounded-full border-2 border-dashed border-slate-300 group-hover:border-ci-blue/50 flex items-center justify-center">
                          <span className="text-[8px] font-bold text-slate-400 group-hover:text-ci-blue -rotate-12">Circle</span>
                       </div>
                    </button>
                    <button onClick={() => addElement('text', 'Wavy', { fontSize: 32, curveType: 'wave', width: 300, height: 100 })} className="aspect-square bg-white rounded-xl border border-slate-200 hover:border-ci-blue hover:shadow-md flex items-center justify-center p-2 group transition-all overflow-hidden">
                       <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[8px] font-bold text-slate-400 group-hover:text-ci-blue transform skew-x-12">Wavy</span>
                       </div>
                    </button>
                    <button onClick={() => addElement('text', 'Arc', { fontSize: 32, curveType: 'arc', width: 300, height: 150 })} className="aspect-square bg-white rounded-xl border border-slate-200 hover:border-ci-blue hover:shadow-md flex items-center justify-center p-2 group transition-all overflow-hidden">
                        <div className="w-full h-full border-t-2 border-dashed border-slate-300 group-hover:border-ci-blue/50 rounded-t-full mt-4 flex justify-center pt-1">
                          <span className="text-[8px] font-bold text-slate-400 group-hover:text-ci-blue">Arc</span>
                       </div>
                    </button>
                 </div>
              </div>

              {/* My Fonts & Upload */}
              <div className="space-y-3">
                 <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-800 text-sm">My fonts</h3>
                    <span className="bg-blue-100 text-blue-600 text-[10px] px-1.5 py-0.5 rounded font-bold">New</span>
                 </div>
                 <button className="w-full py-2.5 border border-slate-300 rounded-xl flex items-center justify-center gap-2 hover:border-ci-blue hover:text-ci-blue hover:bg-blue-50 transition-all text-slate-600 font-bold text-sm bg-white">
                    <Upload className="w-4 h-4" />
                    Upload font
                 </button>
              </div>

              <div className="h-px w-full bg-slate-100" />
              
              {/* Font List */}
              <div>
                 <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">All Fonts</h3>
                 <div className="space-y-1">
                    {FONTS.filter(f => f.name.toLowerCase().includes(fontSearchQuery.toLowerCase())).map((f) => (
                      <button 
                        key={f.name} 
                        onClick={() => {
                          if (selectedId && selectedElement?.type === 'text') {
                            updateElementWithHistory(selectedId, { fontFamily: f.name });
                          } else {
                            addElement('text', 'ข้อความ', { fontFamily: f.name, fontSize: 32 });
                          }
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 transition-all group flex items-center justify-between ${selectedElement?.fontFamily === f.name ? 'bg-blue-50 ring-1 ring-ci-blue' : 'bg-white border border-slate-100'}`}
                      >
                        <span className={`text-base ${f.family} ${selectedElement?.fontFamily === f.name ? 'text-ci-blue' : 'text-slate-700'}`}>{f.name}</span>
                        {selectedElement?.fontFamily === f.name && <Check className="w-4 h-4 text-ci-blue" />}
                      </button>
                    ))}
                 </div>
                 {FONTS.filter(f => f.name.toLowerCase().includes(fontSearchQuery.toLowerCase())).length === 0 && (
                    <div className="text-center py-8 text-slate-400 text-sm">
                       No fonts found
                    </div>
                 )}
              </div>
            </div>
          )}
          {activeTool === 'uploads' && (
            <div className="text-center">
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              <button onClick={() => fileInputRef.current?.click()} className="w-full border-2 border-dashed border-ci-blue/30 bg-blue-50/30 rounded-2xl p-8 mb-6 hover:bg-blue-50/60 hover:border-ci-blue/50 transition-all group">
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8 text-ci-blue" />
                </div>
                <p className="text-sm font-bold text-slate-700 mb-1">คลิกเพื่ออัปโหลด</p>
                <p className="text-xs text-slate-400">รองรับไฟล์ JPG, PNG</p>
              </button>
            </div>
          )}
          {activeTool === 'library' && (
            <div className="space-y-4">
               <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-800 text-base">รูปภาพของฉัน</h3>
                  <Link href="/dashboard/library" className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-ci-blue transition-colors" title="จัดการคลังภาพ">
                    <ExternalLink className="w-4 h-4" />
                  </Link>
               </div>
               
               
               <div className="grid grid-cols-2 gap-3">
                 {/* Upload New Button */}
                 <button onClick={() => fileInputRef.current?.click()} className="aspect-square border-2 border-dashed border-ci-blue/30 bg-blue-50/30 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-ci-blue/50 hover:bg-blue-50/50 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform text-ci-blue">
                      <Plus className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-ci-blue">อัปโหลดใหม่</span>
                 </button>
                 
                 {/* Assets */}
                 {MY_LIBRARY_ASSETS.map((asset) => (
                   <div key={asset.id} className="group relative aspect-square bg-slate-100 rounded-xl overflow-hidden cursor-pointer border border-slate-200 hover:border-ci-blue hover:shadow-md transition-all" onClick={() => addElement('image', asset.url)}>
                      <img src={asset.url} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-[10px] text-white font-bold truncate">{asset.name}</p>
                      </div>
                      <button className="absolute top-2 right-2 p-1 bg-white/90 rounded-full shadow-sm opacity-0 group-hover:opacity-100 hover:bg-white text-slate-600 hover:text-red-500 transition-all transform translate-y-2 group-hover:translate-y-0">
                        <Trash2 className="w-3 h-3" />
                      </button>
                   </div>
                 ))}
               </div>
            </div>
          )}
          {activeTool === 'ai' && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
                <Sparkles className="w-8 h-8 text-ci-blue mx-auto mb-2" />
                <h3 className="font-bold text-blue-900 text-sm">สร้างภาพด้วย AI</h3>
                <p className="text-xs text-blue-600 mt-1">ใช้เครื่องมือเหล่านี้สร้างภาพสวยๆ แล้วนำมาอัปโหลดที่นี่</p>
              </div>
              
              <div className="space-y-3">
                {AI_TOOLS.map((tool, i) => (
                  <a 
                    key={i} 
                    href={tool.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:border-ci-blue hover:bg-blue-50/50 transition-all group"
                  >
                    <div className="text-2xl bg-white w-10 h-10 rounded-lg border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <h4 className="font-bold text-sm text-slate-800 group-hover:text-ci-blue">{tool.name}</h4>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-ci-blue" />
                      </div>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{tool.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
          {activeTool === 'elements' && (
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search elements..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-transparent focus:bg-white border focus:border-ci-blue rounded-xl text-sm transition-all outline-none"
                />
              </div>

              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
                {ICON_CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${activeCategory === cat.id ? 'bg-ci-blue text-white' : 'bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-ci-blue'}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Icons Grid */}
              <div className="space-y-4">
                 {ICON_CATEGORIES.filter(c => activeCategory === 'all' || activeCategory === c.id).map(category => {
                   if (category.id === 'all') return null;
                   
                   const items = category.items?.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
                   if (!items?.length) return null;

                   return (
                     <div key={category.id} className="space-y-3">
                       <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                         {category.label}
                         <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{items.length}</span>
                       </h3>
                       <div className="grid grid-cols-4 gap-3">
                         {items.map(iconName => {
                           const Icon = AVAILABLE_ICONS[iconName];
                           if (!Icon) return null;
                           return (
                             <button 
                               key={iconName} 
                               onClick={() => addElement('icon', iconName, { color: '#1e293b' })} 
                               className="aspect-square bg-white rounded-xl border border-slate-200 hover:border-ci-blue hover:shadow-md flex items-center justify-center text-slate-700 hover:text-ci-blue transition-all group"
                               title={iconName}
                             >
                               <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                             </button>
                           );
                         })}
                       </div>
                     </div>
                   );
                 })}
              </div>
              
              {/* Stickers */}
              {(activeCategory === 'all' || activeCategory === 'shapes') && !searchQuery && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Stickers & Emojis</h3>
              <div className="grid grid-cols-5 gap-2">
                    {STICKERS.map((s, i) => <button key={i} onClick={() => addElement('sticker', s, { fontSize: 64 })} className="text-2xl hover:scale-125 transition-transform p-2 hover:bg-slate-50 rounded-xl">{s}</button>)}
              </div>
                </div>
              )}

              {/* Basic Shapes */}
              {(activeCategory === 'all' || activeCategory === 'shapes') && !searchQuery && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Basic Shapes</h3>
                  <div className="grid grid-cols-3 gap-3">
                     {SHAPES.map((s, i) => <div key={i} onClick={() => addElement('shape', s.type, { backgroundColor: '#94a3b8' })} className={`h-12 bg-slate-200 hover:bg-slate-300 cursor-pointer transition-colors ${s.class}`} />)}
                  </div>
                </div>
              )}
            </div>
          )}
          {activeTool === 'layers' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-4 p-1 bg-slate-100 rounded-lg">
                <button 
                  onClick={() => setViewSide('front')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${viewSide === 'front' ? 'bg-white shadow text-ci-blue' : 'text-slate-500'}`}
                >
                  ด้านหน้า
                </button>
                <button 
                  onClick={() => setViewSide('back')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${viewSide === 'back' ? 'bg-white shadow text-ci-blue' : 'text-slate-500'}`}
                >
                  ด้านหลัง
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
                    <button onClick={undo} disabled={currentHistoryIndex <= 0} className={`p-1.5 rounded transition-colors ${currentHistoryIndex <= 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-white hover:shadow-sm hover:text-ci-blue'}`}>
                      <Undo2 className="w-4 h-4" />
                    </button>
                    <button onClick={redo} disabled={currentHistoryIndex >= history.length - 1} className={`p-1.5 rounded transition-colors ${currentHistoryIndex >= history.length - 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-white hover:shadow-sm hover:text-ci-blue'}`}>
                      <Redo2 className="w-4 h-4" />
                    </button>
              </div>
           </div>

           {/* Center: Process Stepper */}
           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 z-10 bg-white/90 backdrop-blur px-4 py-1 rounded-full border border-slate-100 shadow-sm">
              {STEPS.map((step, i) => (
                <div key={step.id} className="flex items-center gap-1">
                  {i > 0 && <div className="w-4 h-px bg-slate-200" />}
                  <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full transition-colors ${step.status === 'completed' ? 'text-green-600 bg-green-50' : step.status === 'current' ? 'text-ci-blue bg-blue-50' : 'text-slate-300'}`}>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold border ${step.status === 'completed' ? 'bg-green-100 border-green-200' : step.status === 'current' ? 'bg-ci-blue text-white border-ci-blue' : 'bg-white border-slate-200'}`}>
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
                   <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">ราคารวม</span>
                   <span className="text-xl font-black text-slate-900 tracking-tight">฿{currentPrice.toLocaleString()}</span>
              </div>

              {/* Buttons */}
              <button className="h-10 px-4 text-slate-500 font-bold text-sm hover:text-ci-blue hover:bg-blue-50 rounded-xl border border-transparent hover:border-blue-100 transition-all">
                ดูตัวอย่าง
              </button>
              <button onClick={handleSaveClick} className="h-10 px-6 bg-gradient-to-r from-ci-blue to-blue-600 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-ci-blue/30 hover:-translate-y-0.5 transition-all flex items-center gap-2 active:translate-y-0">
                 <Save className="w-4 h-4" />
                 <span>บันทึก</span>
              </button>
           </div>
        </div>

        {/* Context Toolbar */}
        {selectedElement && !editingId && (
           <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 bg-white rounded-xl shadow-xl border border-slate-200 px-4 py-2 flex items-center gap-3 animate-in slide-in-from-top-4 fade-in duration-200">
              {selectedElement.type === 'text' && (
                 <>
                    <div className="relative group">
                      <button onClick={() => setActiveTool(activeTool === 'text' ? null : 'text')} className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-100 rounded-lg text-sm font-medium w-28 justify-center border border-slate-200 text-center">
                        <span className="truncate">{selectedElement.fontFamily}</span>
                      </button>
                    </div>
                    <Divider />
                    <div className="flex items-center bg-slate-100 rounded-lg">
                       <button onClick={() => updateElementWithHistory(selectedId, { fontSize: Math.max(12, (selectedElement.fontSize || 32) - 4) })} className="p-1.5 hover:bg-slate-200 rounded-l-lg text-slate-600"><Minus className="w-3 h-3" /></button>
                       <span className="w-8 text-center text-xs font-bold">{Math.round(selectedElement.fontSize || 0)}</span>
                       <button onClick={() => updateElementWithHistory(selectedId, { fontSize: Math.min(200, (selectedElement.fontSize || 32) + 4) })} className="p-1.5 hover:bg-slate-200 rounded-r-lg text-slate-600"><Plus className="w-3 h-3" /></button>
                    </div>
                    <Divider />
                    <div className="flex items-center gap-2 relative group">
                       <div className="w-6 h-6 rounded border border-slate-300" style={{ backgroundColor: selectedElement.color }}></div>
                       <input type="color" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => updateElement(selectedId, { color: e.target.value })} onBlur={(e) => updateElementWithHistory(selectedId, { color: e.target.value })} />
                    </div>
                    <Divider />
                    <div className="flex items-center gap-1">
                       <button onClick={() => updateElementWithHistory(selectedId, { fontWeight: selectedElement.fontWeight === 'bold' ? 'normal' : 'bold' })} className={`p-1.5 rounded hover:bg-slate-100 ${selectedElement.fontWeight === 'bold' ? 'bg-slate-200' : ''}`}><Bold className="w-4 h-4" /></button>
                       <button onClick={() => updateElementWithHistory(selectedId, { fontStyle: selectedElement.fontStyle === 'italic' ? 'normal' : 'italic' })} className={`p-1.5 rounded hover:bg-slate-100 ${selectedElement.fontStyle === 'italic' ? 'bg-slate-200' : ''}`}><Italic className="w-4 h-4" /></button>
                       <button onClick={() => updateElementWithHistory(selectedId, { textDecoration: selectedElement.textDecoration === 'underline' ? 'none' : 'underline' })} className={`p-1.5 rounded hover:bg-slate-100 ${selectedElement.textDecoration === 'underline' ? 'bg-slate-200' : ''}`}><Underline className="w-4 h-4" /></button>
                    </div>
                    <Divider />
                    <div className="flex items-center gap-1">
                       <button onClick={() => updateElementWithHistory(selectedId, { textAlign: 'left' })} className={`p-1.5 rounded hover:bg-slate-100 ${selectedElement.textAlign === 'left' ? 'bg-slate-200' : ''}`}><AlignLeft className="w-4 h-4" /></button>
                       <button onClick={() => updateElementWithHistory(selectedId, { textAlign: 'center' })} className={`p-1.5 rounded hover:bg-slate-100 ${selectedElement.textAlign === 'center' || !selectedElement.textAlign ? 'bg-slate-200' : ''}`}><AlignCenter className="w-4 h-4" /></button>
                       <button onClick={() => updateElementWithHistory(selectedId, { textAlign: 'right' })} className={`p-1.5 rounded hover:bg-slate-100 ${selectedElement.textAlign === 'right' ? 'bg-slate-200' : ''}`}><AlignRight className="w-4 h-4" /></button>
                    </div>
                    <Divider />
                    {/* Effects Button */}
                    <button 
                      onClick={() => setActiveTool('text-effects')} 
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTool === 'text-effects' ? 'bg-ci-blue text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-ci-blue'}`}
                    >
                      เอฟเฟกต์
                    </button>
                 </>
              )}
              {selectedElement.type === 'sticker' && (
                 <>
                    <div className="flex items-center gap-2 text-slate-500"><Sticker className="w-4 h-4" /><span className="text-xs font-bold uppercase">Sticker</span></div>
                    <Divider />
                    <div className="flex items-center bg-slate-100 rounded-lg">
                       <button onClick={() => updateElementWithHistory(selectedId, { fontSize: Math.max(24, (selectedElement.fontSize || 64) - 8) })} className="p-1.5 hover:bg-slate-200 rounded-l-lg text-slate-600"><Minus className="w-3 h-3" /></button>
                       <span className="w-8 text-center text-xs font-bold">{Math.round(selectedElement.fontSize || 0)}</span>
                       <button onClick={() => updateElementWithHistory(selectedId, { fontSize: Math.min(300, (selectedElement.fontSize || 64) + 8) })} className="p-1.5 hover:bg-slate-200 rounded-r-lg text-slate-600"><Plus className="w-3 h-3" /></button>
                    </div>
                    <Divider />
                    <div className="flex items-center gap-3 px-2">
                       <span className="text-xs font-bold text-slate-500 uppercase">Opacity</span>
                       <input type="range" min="0" max="100" value={selectedElement.opacity} onChange={(e) => updateElement(selectedId, { opacity: parseInt(e.target.value) })} onMouseUp={() => addToHistory(elements)} className="w-24 accent-ci-blue h-1 bg-slate-200 rounded-lg appearance-none" />
                    </div>
                 </>
              )}
              {selectedElement.type === 'icon' && (
                 <>
                    <div className="flex items-center gap-2 text-slate-500">
                       <div className="w-4 h-4">{AVAILABLE_ICONS[selectedElement.content] && <span className="w-4 h-4 flex items-center justify-center"><Search className="w-3 h-3" /></span>}</div>
                       <span className="text-xs font-bold uppercase">Icon</span>
                    </div>
                    <Divider />
                    <div className="flex items-center gap-3 px-2">
                        <span className="text-xs font-bold text-slate-500 uppercase">Color</span>
                        <div className="flex items-center gap-2 relative">
                          <div className="w-8 h-8 rounded-lg border border-slate-300 shadow-sm" style={{ backgroundColor: selectedElement.color }}></div>
                          <input type="color" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => updateElement(selectedId, { color: e.target.value })} onBlur={(e) => updateElementWithHistory(selectedId, { color: e.target.value })} />
                        </div>
                    </div>
                    <Divider />
                    <div className="flex items-center gap-3 px-2">
                       <span className="text-xs font-bold text-slate-500 uppercase">Opacity</span>
                       <input type="range" min="0" max="100" value={selectedElement.opacity} onChange={(e) => updateElement(selectedId, { opacity: parseInt(e.target.value) })} onMouseUp={() => addToHistory(elements)} className="w-24 accent-ci-blue h-1 bg-slate-200 rounded-lg appearance-none" />
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
                          <input type="color" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => updateElement(selectedId, { backgroundColor: e.target.value })} onBlur={(e) => updateElementWithHistory(selectedId, { backgroundColor: e.target.value })} />
                        </div>
                      </div>
                    )}
                    {selectedElement.type === 'image' && (
                      <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${showFilters ? 'bg-ci-blue text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}><SlidersHorizontal className="w-4 h-4" /> Filters</button>
                    )}
                    {showFilters && selectedElement.type === 'image' && (
                       <div className="absolute top-full left-0 mt-2 p-4 bg-white rounded-xl shadow-xl border border-slate-200 w-64 z-50 space-y-3">
                          <div><div className="flex justify-between mb-1"><span className="text-xs text-slate-500">Brightness</span><span className="text-xs">{selectedElement.brightness}%</span></div><input type="range" min="0" max="200" value={selectedElement.brightness} onChange={(e) => updateElement(selectedId, { brightness: parseInt(e.target.value) })} onMouseUp={() => addToHistory(elements)} className="w-full accent-ci-blue h-1 bg-slate-200 rounded-lg appearance-none" /></div>
                          <div><div className="flex justify-between mb-1"><span className="text-xs text-slate-500">Contrast</span><span className="text-xs">{selectedElement.contrast}%</span></div><input type="range" min="0" max="200" value={selectedElement.contrast} onChange={(e) => updateElement(selectedId, { contrast: parseInt(e.target.value) })} onMouseUp={() => addToHistory(elements)} className="w-full accent-ci-blue h-1 bg-slate-200 rounded-lg appearance-none" /></div>
                       </div>
                    )}
                    <Divider />
                    <div className="flex items-center gap-3 px-2"><span className="text-xs font-bold text-slate-500 uppercase">Opacity</span><input type="range" min="0" max="100" value={selectedElement.opacity} onChange={(e) => updateElement(selectedId, { opacity: parseInt(e.target.value) })} onMouseUp={() => addToHistory(elements)} className="w-24 accent-ci-blue h-1 bg-slate-200 rounded-lg appearance-none" /></div>
                 </>
              )}
              <Divider />
              <div className="flex items-center gap-1">
                 <button onClick={() => moveLayer('up')} className="p-1.5 hover:bg-slate-100 rounded text-slate-500" title="เลื่อนขึ้น">
                    <ArrowUp className="w-4 h-4" />
                 </button>
                 <button onClick={() => moveLayer('down')} className="p-1.5 hover:bg-slate-100 rounded text-slate-500" title="เลื่อนลง">
                    <ArrowDown className="w-4 h-4" />
                 </button>
              </div>
              <Divider />
              <div className="flex items-center gap-1"><button onClick={duplicateElement} className="p-1.5 hover:bg-slate-100 rounded text-slate-500"><Copy className="w-4 h-4" /></button><button onClick={() => deleteElement(selectedId)} className="p-1.5 hover:bg-red-50 rounded text-red-500"><Trash2 className="w-4 h-4" /></button></div>
           </div>
        )}

        {/* Canvas */}
        <div className="flex-1 overflow-hidden flex items-center justify-center bg-slate-100 relative" onClick={() => { setSelectedId(null); setShowFilters(false); }}>
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
           
           {/* Front/Back Toggle */}
           <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-md border border-slate-200 flex p-1 gap-1 z-30">
              <button onClick={() => setViewSide('front')} className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${viewSide === 'front' ? 'bg-ci-blue text-white' : 'text-slate-500 hover:bg-slate-50'}`}>ด้านหน้า</button>
              <button onClick={() => setViewSide('back')} className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${viewSide === 'back' ? 'bg-ci-blue text-white' : 'text-slate-500 hover:bg-slate-50'}`}>ด้านหลัง</button>
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
                className="absolute transition-all z-10 overflow-visible group/area"
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
                     <div className="absolute -top-6 left-0 w-full h-6 border-b border-slate-300/50 flex items-end justify-between text-[8px] text-slate-400 px-1 select-none">
                        <span>0</span>
                        <span className="font-bold text-ci-blue">{PRINT_AREA_WIDTH_CM} {unit}</span>
                     </div>
                     {/* Left Ruler */}
                     <div className="absolute top-0 -left-6 w-6 h-full border-r border-slate-300/50 flex flex-col items-end justify-between text-[8px] text-slate-400 py-1 select-none">
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

                 {/* Snap Guides */}
                 {snapX !== null && (
                    <div className="absolute top-0 bottom-0 w-px bg-ci-blue z-50 pointer-events-none" style={{ left: snapX }}></div>
                 )}
                 {snapY !== null && (
                    <div className="absolute left-0 right-0 h-px bg-ci-blue z-50 pointer-events-none" style={{ top: snapY }}></div>
                 )}

                 {elements.filter(el => el.side === viewSide).map((el, index) => (
                   <div
                     key={el.id}
                     onMouseDown={(e) => handleDragStart(e, el)}
                     onClick={(e) => e.stopPropagation()}
                     className="absolute cursor-move select-none group"
                     style={{ left: el.x, top: el.y, width: el.width, height: el.height, zIndex: 10 + index }}
                   >
                     {/* Content */}
                     <div className={`relative w-full h-full ${selectedId === el.id && !editingId ? '' : !editingId ? 'hover:ring-1 hover:ring-ci-blue/30' : ''}`}
                          onDoubleClick={(e) => { e.stopPropagation(); handleTextEditStart(el); }}
                     >
                        {el.type === 'text' && (
                          editingId === el.id ? (
                            <textarea
                                ref={textAreaRef}
                                value={tempText}
                                onChange={handleTextChange}
                                onBlur={handleTextEditEnd}
                                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleTextEditEnd(); }}}
                                style={{
                                    fontSize: el.fontSize,
                                    color: el.color,
                                    fontFamily: el.fontFamily,
                                    fontWeight: el.fontWeight,
                                    fontStyle: el.fontStyle,
                                    textDecoration: el.textDecoration,
                                    textAlign: el.textAlign,
                                    lineHeight: 1,
                                    padding: '0 5px',
                                    width: '100%',
                                    height: '100%',
                                    resize: 'none',
                                    border: 'none',
                                    outline: 'none',
                                    background: 'transparent',
                                    overflow: 'hidden',
                                    whiteSpace: 'pre'
                                }}
                            />
                          ) : (
                            el.curveType && el.curveType !== 'none' ? (
                               <svg width="100%" height="100%" viewBox={`0 0 ${el.width} ${el.height}`} style={{ overflow: 'visible' }}>
                                   <defs>
                                       <path id={`curve-${el.id}`} d={
                                           el.curveType === 'circle' 
                                            ? (() => {
                                                const rx = el.width / 2;
                                                const ry = el.height / 2;
                                                // Start at bottom, go clockwise (Left -> Top -> Right -> Bottom)
                                                // This places 50% offset at the Top
                                                return `M ${rx},${el.height} a ${rx},${ry} 0 1,1 0,-${el.height} a ${rx},${ry} 0 1,1 0,${el.height}`;
                                            })()
                                            : el.curveType === 'arc'
                                            ? (() => {
                                                const strength = el.curveStrength ?? 50;
                                                const bendY = el.height - ((strength / 50) * (el.height * 1.5));
                                                return `M 0,${el.height} Q ${el.width/2},${bendY} ${el.width},${el.height}`;
                                            })()
                                            : (() => {
                                                const strength = el.curveStrength ?? 50;
                                                const amplitude = (strength / 50) * (el.height / 2);
                                                return `M 0,${el.height/2} Q ${el.width/4},${(el.height/2) - amplitude} ${el.width/2},${el.height/2} T ${el.width},${el.height/2}`;
                                            })()
                                       } />
                                   </defs>
                                   
                                   {/* Outline/Stroke Layer (Behind) */}
                                   {['outline', 'hollow', 'splice'].includes(el.effectType || '') && (
                                      <text 
                                          fontSize={el.fontSize}
                                          fontFamily={el.fontFamily}
                                          fontWeight={el.fontWeight}
                                          fontStyle={el.fontStyle}
                                          opacity={el.opacity / 100}
                                          dominantBaseline="middle"
                                          textAnchor="middle"
                                          fill="transparent"
                                          stroke={el.effectColor ?? '#1e293b'}
                                          strokeWidth={`${el.effectType === 'hollow' || el.effectType === 'splice' ? (el.effectWidth ?? 1) : (el.effectWidth ?? 2)}px`}
                                          strokeLinejoin="round"
                                          filter={el.effectType === 'splice' ? 'drop-shadow(2px 2px 0px #cbd5e1)' : undefined}
                                      >
                                          <textPath href={`#curve-${el.id}`} startOffset="50%">
                                              {el.content}
                                          </textPath>
                                      </text>
                                   )}

                                   {/* Main Text Layer */}
                                   <text 
                                       fontSize={el.fontSize}
                                       fontFamily={el.fontFamily}
                                       fontWeight={el.fontWeight}
                                       fontStyle={el.fontStyle}
                                       fill={['hollow', 'splice', 'outline'].includes(el.effectType || '') ? 'transparent' : el.color}
                                       opacity={el.opacity / 100}
                                       dominantBaseline="middle"
                                       textAnchor="middle"
                                       style={{
                                           ...(el.effectType === 'shadow' || el.effectType === 'lift' || el.effectType === 'echo' || el.effectType === 'glitch' ? { 
                                                textShadow: (() => {
                                                    const rad = (el.effectDirection ?? 45) * (Math.PI / 180);
                                                    const dist = el.effectOffset ?? (el.effectType === 'shadow' ? 4 : 2);
                                                    const x = Math.round(Math.cos(rad) * dist);
                                                    const y = Math.round(Math.sin(rad) * dist);
                                                    const blur = el.effectBlur ?? 0;
                                                    const color = el.effectColor ?? 'rgba(0,0,0,0.2)';
                                                    
                                                    if (el.effectType === 'echo') {
                                                        return `${x}px ${y}px 0px ${color}, ${x*2}px ${y*2}px 0px ${color}`;
                                                    }
                                                    if (el.effectType === 'glitch') {
                                                        return `${dist}px 0px ${el.effectColor ?? '#ef4444'}, -${dist}px 0px #3b82f6`;
                                                    }
                                                    return `${x}px ${y}px ${blur}px ${color}`;
                                                })()
                                           } : {}),
                                           ...(el.effectType === 'neon' ? { 
                                                textShadow: `0 0 ${el.effectBlur ?? 10}px ${el.effectColor ?? '#ec4899'}, 0 0 ${(el.effectBlur ?? 10)*2}px ${el.effectColor ?? '#ec4899'}`, 
                                                fill: '#ffffff' 
                                           } : {}),
                                       }}
                                   >
                                       <textPath href={`#curve-${el.id}`} startOffset="50%">
                                           {el.content}
                                       </textPath>
                                   </text>
                               </svg>
                            ) : (
                                <div style={{ 
                                    fontSize: el.fontSize, 
                                    color: el.color, 
                                    fontFamily: el.fontFamily, 
                                    fontWeight: el.fontWeight, 
                                    fontStyle: el.fontStyle, 
                                    textDecoration: el.textDecoration, 
                                    opacity: el.opacity / 100, 
                                    width: '100%', 
                                    height: '100%', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: el.textAlign,
                                    whiteSpace: 'pre',
                                    overflow: 'hidden',
                                    lineHeight: 1,
                                    padding: el.effectType === 'background' ? `0 ${el.effectWidth ?? 4}px` : '0 5px',
                                    
                                    // Effect Styles
                                    ...(el.effectType === 'shadow' || el.effectType === 'lift' || el.effectType === 'echo' || el.effectType === 'glitch' ? { 
                                         textShadow: (() => {
                                             const rad = (el.effectDirection ?? 45) * (Math.PI / 180);
                                             const dist = el.effectOffset ?? (el.effectType === 'shadow' ? 4 : 2);
                                             const x = Math.round(Math.cos(rad) * dist);
                                             const y = Math.round(Math.sin(rad) * dist);
                                             const blur = el.effectBlur ?? 0;
                                             const color = el.effectColor ?? 'rgba(0,0,0,0.2)';
                                             
                                             if (el.effectType === 'echo') {
                                                 return `${x}px ${y}px 0px ${color}, ${x*2}px ${y*2}px 0px ${color}`;
                                             }
                                             if (el.effectType === 'glitch') {
                                                 return `${dist}px 0px #ef4444, -${dist}px 0px #3b82f6`;
                                             }
                                             return `${x}px ${y}px ${blur}px ${color}`;
                                         })()
                                    } : {}),
                                    ...(el.effectType === 'neon' ? { 
                                         textShadow: `0 0 ${el.effectBlur ?? 10}px ${el.effectColor ?? '#ec4899'}, 0 0 ${(el.effectBlur ?? 10)*2}px ${el.effectColor ?? '#ec4899'}`, 
                                         color: '#ffffff' 
                                    } : {}),
                                    ...(el.effectType === 'hollow' ? { 
                                         WebkitTextStroke: `${el.effectWidth ?? 1}px ${el.effectColor ?? '#1e293b'}`, 
                                         color: 'transparent' 
                                    } : {}),
                                    ...(el.effectType === 'splice' ? { 
                                         WebkitTextStroke: `${el.effectWidth ?? 1}px ${el.effectColor ?? '#1e293b'}`, 
                                         color: 'transparent', 
                                         textShadow: '2px 2px 0px #cbd5e1' 
                                    } : {}),
                                    ...(el.effectType === 'outline' ? { 
                                         WebkitTextStroke: `${el.effectWidth ?? 2}px ${el.effectColor ?? '#1e293b'}`, 
                                         color: 'transparent', 
                                         fontWeight: 'bold' 
                                    } : {}),
                                    ...(el.effectType === 'background' ? { 
                                         backgroundColor: el.effectColor ?? '#fcd34d', 
                                         color: '#ffffff', 
                                         borderRadius: `${el.effectBlur ?? 4}px` 
                                    } : {}),
                                }}>
                                    {el.content}
                                </div>
                            )
                          )
                        )}
                        {el.type === 'sticker' && (
                           <div style={{ fontSize: el.fontSize, opacity: el.opacity / 100, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{el.content}</div>
                        )}
                        {el.type === 'icon' && AVAILABLE_ICONS[el.content] && (
                           <div style={{ color: el.color, opacity: el.opacity / 100, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {(() => {
                                const Icon = AVAILABLE_ICONS[el.content];
                                return <Icon className="w-full h-full" strokeWidth={1.5} />;
                              })()}
                           </div>
                        )}
                        {el.type === 'image' && (
                          <img src={el.content} className="w-full h-full object-cover" style={{ opacity: el.opacity / 100, filter: `brightness(${el.brightness}%) contrast(${el.contrast}%) grayscale(${el.grayscale}%)` }} draggable={false} />
                        )}
                        {el.type === 'shape' && (
                          <div className={`w-full h-full ${el.content === 'circle' ? 'rounded-full' : el.content === 'triangle' ? 'clip-triangle' : 'rounded-lg'}`} style={{ backgroundColor: el.backgroundColor || el.color, opacity: el.opacity / 100 }} />
                        )}
                     </div>
                   </div>
                 ))}

                 {/* Selection Overlay (Always on top) */}
                 {selectedElement && selectedElement.side === viewSide && (
                    <div 
                        className="absolute pointer-events-none z-[100]"
                        style={{ left: selectedElement.x, top: selectedElement.y, width: selectedElement.width, height: selectedElement.height }}
                    >
                         {/* Measurement Labels */}
                         {showRulers && (isResizing || selectedId) && (
                           <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-ci-blue text-white text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap z-50 shadow-sm pointer-events-none">
                              {(selectedElement.width / pixelsPerCm).toFixed(1)} x {(selectedElement.height / pixelsPerCm).toFixed(1)} {unit === 'cm' ? 'ซม.' : 'นิ้ว'}
                            </div>
                         )}
                         
                         {/* Bounding Box Lines (Blue) */}
                         <div className="absolute -top-[1px] -left-[1px] -right-[1px] -bottom-[1px] border border-ci-blue pointer-events-none"></div>

                         {/* Corner Handles */}
                         <div 
                           className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-ci-blue rounded-full cursor-nw-resize z-50 shadow-sm hover:scale-125 transition-transform pointer-events-auto"
                           onMouseDown={(e) => handleResizeStart(e, selectedElement, 'nw')} 
                         ></div>
                         <div 
                           className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-ci-blue rounded-full cursor-ne-resize z-50 shadow-sm hover:scale-125 transition-transform pointer-events-auto"
                           onMouseDown={(e) => handleResizeStart(e, selectedElement, 'ne')}
                         ></div>
                         <div 
                           className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-ci-blue rounded-full cursor-sw-resize z-50 shadow-sm hover:scale-125 transition-transform pointer-events-auto"
                           onMouseDown={(e) => handleResizeStart(e, selectedElement, 'sw')}
                         ></div>
                         <div 
                           className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-ci-blue rounded-full cursor-se-resize z-50 shadow-sm hover:scale-125 transition-transform pointer-events-auto"
                           onMouseDown={(e) => handleResizeStart(e, selectedElement, 'se')}
                         ></div>

                         {/* Side Handles */}
                         <div className="absolute top-1/2 -left-[5px] -translate-y-1/2 w-2.5 h-5 bg-white border border-ci-blue rounded-full cursor-w-resize z-50 shadow-sm hover:scale-y-125 transition-transform pointer-events-auto" onMouseDown={(e) => handleResizeStart(e, selectedElement, 'w')}></div>
                         <div className="absolute top-1/2 -right-[5px] -translate-y-1/2 w-2.5 h-5 bg-white border border-ci-blue rounded-full cursor-e-resize z-50 shadow-sm hover:scale-y-125 transition-transform pointer-events-auto" onMouseDown={(e) => handleResizeStart(e, selectedElement, 'e')}></div>
                         
                         {selectedElement.type !== 'text' && (
                           <>
                             <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-5 h-2.5 bg-white border border-ci-blue rounded-full cursor-n-resize z-50 shadow-sm hover:scale-x-125 transition-transform pointer-events-auto" onMouseDown={(e) => handleResizeStart(e, selectedElement, 'n')}></div>
                             <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-5 h-2.5 bg-white border border-ci-blue rounded-full cursor-s-resize z-50 shadow-sm hover:scale-x-125 transition-transform pointer-events-auto" onMouseDown={(e) => handleResizeStart(e, selectedElement, 's')}></div>
                          </>
                        )}
                         
                         {/* Rotate Handle */}
                         <div 
                             className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border border-slate-300 rounded-full flex items-center justify-center cursor-move shadow-sm hover:bg-slate-50 z-50 pointer-events-auto"
                             onMouseDown={(e) => handleDragStart(e, selectedElement)}
                         >
                            <Move className="w-3 h-3 text-slate-500" />
                     </div>
                   </div>
                 )}
              </div>
           </div>

           {/* Zoom Control */}
           <div className="absolute bottom-6 right-6 bg-white rounded-lg shadow-md border border-slate-200 flex items-center p-1 gap-2 z-50">
              <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-ci-blue"><ZoomOut className="w-4 h-4" /></button>
              <span className="text-xs font-bold w-8 text-center text-slate-700">{zoom}%</span>
              <button onClick={() => setZoom(z => Math.min(150, z + 10))} className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-ci-blue"><ZoomIn className="w-4 h-4" /></button>
           </div>

           {/* View Controls (Top Right) */}
           <div className={`absolute top-6 right-6 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col z-50 transition-all duration-200 ${showControls ? 'w-[220px] p-3' : 'w-10 h-10 p-0 items-center justify-center overflow-hidden'}`}>
              
              {!showControls && (
                  <button onClick={() => setShowControls(true)} className="w-full h-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl" title="Show View Options">
                     <SlidersHorizontal className="w-5 h-5" />
                  </button>
              )}

              <div className={`space-y-2 ${showControls ? 'opacity-100' : 'opacity-0 hidden'}`}>
                  <div className="flex items-center justify-between">
                       <span className="text-xs font-bold text-slate-800">ตัวเลือกมุมมอง</span>
                       <button onClick={() => setShowControls(false)} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600">
                          <ChevronUp className="w-4 h-4" />
                       </button>
                  </div>
                  
                  <div className="h-px w-full bg-slate-100" />

              {/* Price Details */}
              <div className="space-y-1.5">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">สรุปราคา</span>
                 <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500">เสื้อ ({shirtSize})</span>
                    <span className="font-medium text-slate-900">฿{shirtBasePrice}</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500">ค่าสกรีน</span>
                    <span className="font-medium text-slate-900">+{printingPrice}</span>
                 </div>
              </div>
              <div className="h-px w-full bg-slate-100" />

              {/* Color Preview (Selected Colors Only) */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">เปลี่ยนสีเสื้อ (ที่เลือกไว้)</span>
                <div className="flex flex-wrap gap-1.5">
                  {availableColors.map((colorValue) => {
                    const colorObj = COLORS.find(c => c.value === colorValue);
                    return (
                      <button 
                        key={colorValue} 
                        onClick={() => setShirtColor(colorValue)} 
                        className={`w-5 h-5 rounded-full shadow-sm transition-transform hover:scale-110 ${shirtColor === colorValue ? 'ring-2 ring-offset-1 ring-ci-blue scale-110' : 'ring-1 ring-slate-200'}`}
                        style={{ backgroundColor: colorValue }}
                        title={colorObj?.name || 'Custom Color'}
                      />
                    );
                  })}
                  {availableColors.length === 0 && (
                     <span className="text-xs text-slate-400">- กรุณาเลือกสีจากเมนูสินค้า -</span>
                  )}
                </div>
              </div>
              <div className="h-px w-full bg-slate-100" />

              {/* Size Preview (Selected Sizes Only) */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">ดูไซส์อื่น (ที่เลือกไว้)</span>
                    <div className="flex flex-wrap gap-1">
                      {SIZES.filter(s => selectedSizes.includes(s)).map(s => (
                    <button 
                      key={s}
                      onClick={() => setShirtSize(s)}
                          className={`h-7 min-w-[2rem] px-1 flex items-center justify-center rounded-md text-[10px] font-bold transition-all ${shirtSize === s ? 'bg-ci-blue text-white shadow-sm' : 'bg-slate-100 text-slate-400 hover:bg-blue-50 hover:text-ci-blue'}`}
                    >
                      {s}
                    </button>
                  ))}
                  {selectedSizes.length === 0 && (
                     <span className="text-xs text-slate-400">- กรุณาเลือกไซส์จากเมนูสินค้า -</span>
                  )}
                </div>
              </div>
              <div className="h-px w-full bg-slate-100" />
              {/* Real Scale Toggle */}
              <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">ขนาดจริง</span>
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
                       <span className="text-[10px] font-bold text-slate-400 uppercase">หน่วย</span>
                   <button onClick={() => setUnit(u => u === 'cm' ? 'in' : 'cm')} className="px-2 py-1 rounded bg-slate-100 text-[10px] font-bold text-slate-600 hover:bg-slate-200 min-w-[2rem]">
                          {unit === 'cm' ? 'ซม.' : 'นิ้ว'}
                   </button>
                </div>
              )}
              </div>
           </div>
        </div>
      </div>
      {/* Review Modal (Modern Full Screen Overlay) */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col animate-in slide-in-from-bottom-10 duration-300">
           {/* Header */}
           <div className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
              <div className="flex items-center gap-4">
                 <button onClick={() => setShowReviewModal(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-all">
                    <ChevronLeft className="w-6 h-6" />
                 </button>
                 <div>
                    <h2 className="text-xl font-bold text-slate-900">ตรวจสอบรายละเอียด</h2>
                    <p className="text-sm text-slate-500">ขั้นตอนสุดท้ายก่อนบันทึก</p>
                 </div>
              </div>

              {/* Center: Process Stepper */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 z-10 bg-slate-50/50 backdrop-blur px-4 py-1.5 rounded-full border border-slate-200/50 shadow-sm">
                 {[
                   { id: 1, label: 'เลือกสินค้า', status: 'completed' },
                   { id: 2, label: 'ออกแบบ', status: 'completed' },
                   { id: 3, label: 'ตรวจสอบ', status: 'current' },
                 ].map((step, i) => (
                   <div key={step.id} className="flex items-center gap-1">
                     {i > 0 && <div className="w-4 h-px bg-slate-200" />}
                     <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full transition-colors ${step.status === 'completed' ? 'text-green-600 bg-green-50' : step.status === 'current' ? 'text-ci-blue bg-blue-50' : 'text-slate-300'}`}>
                       <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold border ${step.status === 'completed' ? 'bg-green-100 border-green-200' : step.status === 'current' ? 'bg-ci-blue text-white border-ci-blue' : 'bg-white border-slate-200'}`}>
                         {step.status === 'completed' ? <Check className="w-2.5 h-2.5" /> : step.id}
                       </div>
                       <span className="text-[10px] font-bold uppercase tracking-wider">{step.label}</span>
                     </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Content */}
           <div className="flex-1 overflow-y-auto">
              <div className="max-w-6xl mx-auto p-4 md:p-8">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left: Product Preview Gallery */}
                    <div className="lg:col-span-7 space-y-6">
                       <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
                          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
                          
                          <div className="relative z-10 flex flex-col items-center">
                             <div className="w-full flex justify-between items-center mb-8">
                                <span className="px-4 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg shadow-slate-900/20">
                                   {viewSide === 'front' ? 'ด้านหน้า (Front)' : 'ด้านหลัง (Back)'}
                                </span>
                                <div className="flex bg-slate-100 rounded-full p-1 border border-slate-200">
                                   <button onClick={() => setViewSide('front')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${viewSide === 'front' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>Front</button>
                                   <button onClick={() => setViewSide('back')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${viewSide === 'back' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>Back</button>
                                </div>
                             </div>
                             
                             <div className="relative w-full max-w-[500px] aspect-square transition-transform duration-500 group-hover:scale-105">
                                <img 
                                   src={viewSide === 'front' ? MOCKUP_IMAGES.front : MOCKUP_IMAGES.back} 
                                   alt="Product Preview" 
                                   className="w-full h-full object-contain drop-shadow-2xl" 
                                />
                             </div>
                          </div>
                       </div>
                       
                       {/* Mini Specs Row */}
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center">
                             <p className="text-xs text-slate-400 font-bold uppercase mb-1">สีที่เลือก ({availableColors.length})</p>
                             <div className="flex items-center justify-center -space-x-2">
                                {availableColors.slice(0, 4).map((c, i) => (
                                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: c }} />
                                ))}
                                {availableColors.length > 4 && (
                                  <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-500">
                                    +{availableColors.length - 4}
                                  </div>
                                )}
                             </div>
                          </div>
                          <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center">
                             <p className="text-xs text-slate-400 font-bold uppercase mb-1">ไซส์ที่เลือก ({selectedSizes.length})</p>
                             <span className="font-black text-slate-800 text-lg">{selectedSizes.length > 2 ? 'Multiple' : selectedSizes.join(', ')}</span>
                          </div>
                          <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center">
                             <p className="text-xs text-slate-400 font-bold uppercase mb-1">เทคนิค</p>
                             <span className="font-bold text-slate-700 text-sm">{technique === 'printing' ? 'DTG' : 'Embroidery'}</span>
                          </div>
                          <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center">
                             <p className="text-xs text-slate-400 font-bold uppercase mb-1">เลเยอร์</p>
                             <span className="font-bold text-slate-700 text-sm">{elements.length} ชิ้น</span>
                          </div>
                       </div>
                    </div>

                    {/* Right: Actions & Pricing */}
                    <div className="lg:col-span-5 space-y-6 sticky top-24">
                       <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
                          <div className="mb-8">
                             <h3 className="text-2xl font-black text-slate-900 mb-2">สรุปรายการสั่งทำ</h3>
                             <p className="text-slate-500 leading-relaxed">
                                ตรวจสอบความถูกต้องของดีไซน์ก่อนบันทึก หรือสั่งผลิต หากต้องการแก้ไขสามารถกดปุ่มย้อนกลับได้
                             </p>
                          </div>

                          <div className="space-y-4 mb-8">
                             <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
                                <div className="flex items-center justify-between">
                                   <span className="text-sm font-bold text-slate-600">สีที่เลือก:</span>
                                   <div className="flex flex-wrap justify-end gap-1 max-w-[60%]">
                                      {availableColors.map(c => (
                                         <div key={c} className="w-4 h-4 rounded-full border border-slate-200 shadow-sm" style={{ backgroundColor: c }} title={COLORS.find(col => col.value === c)?.name} />
                                      ))}
                                   </div>
                                </div>
                                <div className="flex items-center justify-between border-t border-slate-200/50 pt-3">
                                   <span className="text-sm font-bold text-slate-600">ไซส์ที่เลือก:</span>
                                   <span className="text-sm font-bold text-slate-900">{selectedSizes.join(', ')}</span>
                                </div>
                             </div>

                             <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="font-bold text-slate-600">ราคาต่อชิ้น</span>
                                <span className="font-bold text-slate-900 text-lg">฿{currentPrice.toLocaleString()}</span>
                             </div>
                             {/* Profit Estimation (Optional display) */}
                             <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <div className="flex flex-col">
                                   <span className="font-bold text-emerald-800">กำไรโดยประมาณ</span>
                                   <span className="text-[10px] text-emerald-600 uppercase font-bold tracking-wide">หากนำไปขายต่อ</span>
                                </div>
                                <span className="font-bold text-emerald-600 text-lg">+฿{Math.round(currentPrice * 0.4).toLocaleString()}</span>
                             </div>
                          </div>

                          <div className="space-y-3">
                             <button onClick={() => handleFinalSave('cart')} className="w-full h-14 bg-gradient-to-r from-ci-blue to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-ci-blue/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group">
                                <div className="bg-white/20 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
                                   <ShoppingCart className="w-5 h-5" />
                                </div>
                                ใส่ตะกร้าสั่งผลิต
                             </button>
                             
                             <button onClick={() => handleFinalSave('template')} className="w-full h-14 bg-white border-2 border-slate-100 text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center gap-3">
                                <Save className="w-5 h-5 text-slate-400" />
                                บันทึกเป็นเทมเพลต
                             </button>
                          </div>
                          
                          <div className="mt-6 text-center">
                             <p className="text-xs text-slate-400">
                                *ราคานี้รวมค่าสกรีนและค่าเสื้อแล้ว (ยังไม่รวมค่าส่ง)
                             </p>
                          </div>
                       </div>
                    </div>

                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}


'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  Clipboard,
  Layers, 
  Bold,
  Italic,
  Underline,
  Strikethrough,
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
  FolderOpen,
  Grid,
  List,
  MoreVertical,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignHorizontalDistributeCenter,
  AlignVerticalDistributeCenter,
  AlignStartVertical,
  AlignEndVertical,
  AlignCenterVertical,
  AlignStartHorizontal,
  AlignEndHorizontal,
  AlignCenterHorizontal,
  X,
  Store,
  FileEdit,
  Edit2,
  Heart, Star, Zap, Ghost, Flame, Sun, Moon, Cloud, Music, Camera, Video, Mic, Headphones, MapPin, Globe, Anchor, Compass, Feather, Key, Lock, Unlock, Bell, Tag, Flag, Award, Gift, Trophy, Crown, Diamond, Skull, Rocket, Plane, Car, Bike, Leaf, Flower, TreeDeciduous, Snowflake, Droplets, Umbrella, Glasses, Watch, Shirt as ShirtIcon, Scissors,
  Spline,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Download,
  Eye,
  EyeOff,
  Box,
  GripVertical,
  ChevronUpCircle,
  ChevronDownCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getProducts, type Product } from '@/lib/mockData';

// Constants
const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 400;

const FONTS = [
  // Thai Fonts
  { name: 'Sarabun', category: 'thai', style: 'sans-serif' },
  { name: 'Kanit', category: 'thai', style: 'sans-serif' },
  { name: 'Prompt', category: 'thai', style: 'sans-serif' },
  { name: 'Mitr', category: 'thai', style: 'sans-serif' },
  { name: 'IBM Plex Sans Thai', category: 'thai', style: 'sans-serif' },
  { name: 'Bai Jamjuree', category: 'thai', style: 'sans-serif' },
  { name: 'K2D', category: 'thai', style: 'sans-serif' },
  { name: 'Chakra Petch', category: 'thai', style: 'sans-serif' },
  { name: 'Pridi', category: 'thai', style: 'serif' },
  { name: 'Thasadith', category: 'thai', style: 'sans-serif' },
  { name: 'Itim', category: 'thai', style: 'handwriting' },
  { name: 'Mali', category: 'thai', style: 'handwriting' },
  { name: 'Sriracha', category: 'thai', style: 'handwriting' },
  { name: 'Charm', category: 'thai', style: 'handwriting' },
  { name: 'Charmonman', category: 'thai', style: 'handwriting' },
  { name: 'Srisakdi', category: 'thai', style: 'display' },
  // English Fonts
  { name: 'Montserrat', category: 'english', style: 'sans-serif' },
  { name: 'Poppins', category: 'english', style: 'sans-serif' },
  { name: 'Oswald', category: 'english', style: 'sans-serif' },
  { name: 'Playfair Display', category: 'english', style: 'serif' },
  { name: 'Bebas Neue', category: 'english', style: 'display' },
  { name: 'Righteous', category: 'english', style: 'display' },
  { name: 'Lobster', category: 'english', style: 'handwriting' },
  { name: 'Pacifico', category: 'english', style: 'handwriting' },
  { name: 'Dancing Script', category: 'english', style: 'handwriting' },
  { name: 'Shadows Into Light', category: 'english', style: 'handwriting' },
  { name: 'Permanent Marker', category: 'english', style: 'display' },
  { name: 'Bangers', category: 'english', style: 'display' },
  { name: 'Creepster', category: 'english', style: 'display' },
  { name: 'Special Elite', category: 'english', style: 'display' },
  { name: 'Press Start 2P', category: 'english', style: 'display' },
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
  letterSpacing?: number;
  lineHeight?: number;
  brightness?: number;
  contrast?: number;
  grayscale?: number;
  side?: 'front' | 'back';
  curveType?: 'none' | 'circle' | 'arc' | 'wave';
  curveStrength?: number;
  effectType?: 'none' | 'shadow' | 'lift' | 'hollow' | 'splice' | 'outline' | 'echo' | 'glitch' | 'neon' | 'background';
  effectColor?: string;
  effectColor2?: string;
  effectOffset?: number;
  effectBlur?: number;
  effectWidth?: number;
  effectDirection?: number;
  effectOpacity?: number;
  textColorOnBg?: string;
  textStrokeColor?: string;
  textStrokeWidth?: number;
  locked?: boolean;
  visible?: boolean;
  flipX?: boolean;
  flipY?: boolean;
}

export default function DesignerClient() {
  const router = useRouter();
  // UI State
  const [activeTool, setActiveTool] = useState<'product' | 'text' | 'uploads' | 'elements' | 'layers' | 'ai' | 'text-effects' | null>('text');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [shirtColor, setShirtColor] = useState('#ffffff');
  const [availableColors, setAvailableColors] = useState<string[]>(['#ffffff']); // Selected colors for the product
  const [shirtSize, setShirtSize] = useState('M'); // Preview size
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['S', 'M', 'L', 'XL']);
  const [technique, setTechnique] = useState<'dtf' | 'dtg'>('dtf');
  const products = getProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]); // Default to first product
  const [showFilters, setShowFilters] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [showRulers, setShowRulers] = useState(false);
  const [showMeasurementGuides, setShowMeasurementGuides] = useState(false);
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');
  const [showControls, setShowControls] = useState(true); // Default expanded to show summary
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
  
  // New states for rotation and clipboard
  const [isRotating, setIsRotating] = useState(false);
  const [clipboard, setClipboard] = useState<DesignElement | null>(null);
  const [showAlignMenu, setShowAlignMenu] = useState(false);
  
  // Keyboard shortcuts modal
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  
  // Multi-select
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Export modal
  const [showExportModal, setShowExportModal] = useState(false);
  
  // Preview modal
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewMode, setPreviewMode] = useState<'2d' | '3d'>('2d');
  
  // View options panel
  const [showViewOptions, setShowViewOptions] = useState(false);
  
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

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

  // Pricing Config (base price from selected product)
  const BASE_PRICE = selectedProduct.price;
  const SIZE_SURCHARGES: Record<string, number> = {
    '2XL': 40, '3XL': 60, '4XL': 80, '5XL': 100
  };
  
  // DTF/DTG Print Pricing (based on dimensions in inches)
  // จุดแรก = cluster ที่ใหญ่ที่สุด, จุดถัดไป = clusters ที่เหลือ
  const DTF_TIERS = [
    { maxW: 2, maxH: 2, firstPrice: 30, nextPrice: 5, label: 'LOGO (2×2")' },
    { maxW: 3, maxH: 4, firstPrice: 80, nextPrice: 25, label: 'A7 (3×4")' },
    { maxW: 4, maxH: 6, firstPrice: 90, nextPrice: 30, label: 'A6 (4×6")' },
    { maxW: 6, maxH: 8, firstPrice: 110, nextPrice: 35, label: 'A5 (6×8")' },
    { maxW: 8, maxH: 12, firstPrice: 130, nextPrice: 45, label: 'A4 (8×12")' },
    { maxW: 12, maxH: 16, firstPrice: 150, nextPrice: 75, label: 'A3 (12×16")' },
    { maxW: 16, maxH: 21, firstPrice: 200, nextPrice: 95, label: 'A2 (16×21")' },
    { maxW: 21, maxH: 28, firstPrice: 250, nextPrice: 145, label: 'A1 (21×28")' },
  ];
  
  // DTG แพงกว่า DTF ฿50 ต่อจุด
  const DTG_EXTRA_PER_POINT = 50;

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
  
  // Get selected element(s)
  const selectedElement = elements.find(el => el.id === selectedId);
  const selectedElements = elements.filter(el => selectedIds.includes(el.id));
  
  // Clustering Algorithm - Group elements that overlap or are close together
  const clusterElements = (elements: DesignElement[], side: 'front' | 'back') => {
    const sideElements = elements.filter(el => el.side === side && el.visible !== false);
    if (sideElements.length === 0) return [];

    const CLUSTER_MARGIN = 5; // pixels - only group if overlapping or touching
    
    // Helper: Check if two bounding boxes overlap or are close
    const boxesOverlap = (el1: DesignElement, el2: DesignElement) => {
      const box1 = {
        left: el1.x - CLUSTER_MARGIN,
        right: el1.x + (el1.width || 100) + CLUSTER_MARGIN,
        top: el1.y - CLUSTER_MARGIN,
        bottom: el1.y + (el1.height || 50) + CLUSTER_MARGIN
      };
      const box2 = {
        left: el2.x,
        right: el2.x + (el2.width || 100),
        top: el2.y,
        bottom: el2.y + (el2.height || 50)
      };
      
      // Check if boxes intersect
      return !(box1.right < box2.left || 
               box1.left > box2.right || 
               box1.bottom < box2.top || 
               box1.top > box2.bottom);
    };
    
    // Build clusters using Union-Find approach
    const parent: number[] = sideElements.map((_, i) => i);
    
    const find = (i: number): number => {
      if (parent[i] !== i) parent[i] = find(parent[i]);
      return parent[i];
    };
    
    const union = (i: number, j: number) => {
      const pi = find(i);
      const pj = find(j);
      if (pi !== pj) parent[pi] = pj;
    };
    
    // Check all pairs and union if they overlap
    for (let i = 0; i < sideElements.length; i++) {
      for (let j = i + 1; j < sideElements.length; j++) {
        if (boxesOverlap(sideElements[i], sideElements[j])) {
          union(i, j);
        }
      }
    }
    
    // Group elements by their root parent
    const clusterMap = new Map<number, DesignElement[]>();
    sideElements.forEach((el, i) => {
      const root = find(i);
      if (!clusterMap.has(root)) clusterMap.set(root, []);
      clusterMap.get(root)!.push(el);
    });
    
    return Array.from(clusterMap.values());
  };

  // Calculate cluster metrics and dimensions in inches
  const getClusterBoundingBox = (cluster: DesignElement[]) => {
    if (cluster.length === 0) return { 
      x: 0, y: 0, width: 0, height: 0, 
      widthInch: 0, heightInch: 0,
      widthCm: 0, heightCm: 0
    };

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    // Convert pixels to inches (based on print area scale)
    // Print area: ~12 inches wide = ~295px, so 1px ≈ 0.04 inch
    const PIXELS_TO_INCH = 12 / 295; // ~0.04
    
    cluster.forEach(el => {
      let elWidth = el.width || 100;
      let elHeight = el.height || 50;
      
      // สำหรับ Text (โดยเฉพาะ Curved Text) - คำนวณจากขนาดจริงของตัวอักษร
      if (el.type === 'text') {
        const fontSize = el.fontSize || 32;
        const textContent = el.content || '';
        
        // ประมาณความกว้างจาก text length × font size × 0.6 (average char width ratio)
        const estimatedTextWidth = textContent.length * fontSize * 0.6;
        const estimatedTextHeight = fontSize * 1.2; // line height
        
        // ใช้ค่าที่เล็กกว่าระหว่าง bounding box กับ estimated size
        // เพื่อให้ยุติธรรมกับ curved text ที่มี bounding box ใหญ่
        if (el.curveType && el.curveType !== 'none') {
          // Curved text: ใช้ขนาด text จริง
          elWidth = Math.min(elWidth, estimatedTextWidth);
          elHeight = Math.min(elHeight, estimatedTextHeight * 2); // curved อาจสูงกว่าปกติ
        }
      }
      
      minX = Math.min(minX, el.x);
      minY = Math.min(minY, el.y);
      maxX = Math.max(maxX, el.x + elWidth);
      maxY = Math.max(maxY, el.y + elHeight);
    });

    const width = maxX - minX;
    const height = maxY - minY;

    // แปลงเป็นนิ้ว (ปัดขึ้น)
    const widthInch = Math.ceil(width * PIXELS_TO_INCH);
    const heightInch = Math.ceil(height * PIXELS_TO_INCH);
    
    // แปลงเป็น cm ด้วย (1 inch = 2.54 cm)
    const widthCm = Math.ceil(widthInch * 2.54);
    const heightCm = Math.ceil(heightInch * 2.54);

    return { 
      x: minX, y: minY, width, height, 
      widthInch, heightInch,
      widthCm, heightCm
    };
  };

  // Get price tier for a cluster (based on dimensions in inches)
  const getPriceTier = (widthInch: number, heightInch: number) => {
    // Find the smallest tier that fits the dimensions
    return DTF_TIERS.find(tier => 
      widthInch <= tier.maxW && heightInch <= tier.maxH
    ) || DTF_TIERS[DTF_TIERS.length - 1];
  };

  // Calculate clusters and pricing
  const frontClusters = clusterElements(elements, 'front');
  const backClusters = clusterElements(elements, 'back');
  const allClusters = [...frontClusters, ...backClusters];

  // คำนวณราคาแต่ละ cluster พร้อม tier
  const clusterPricesRaw = allClusters.map(cluster => {
    const bbox = getClusterBoundingBox(cluster);
    const tier = getPriceTier(bbox.widthInch, bbox.heightInch);
    return { cluster, bbox, tier };
  });
  
  // เรียงลำดับตามราคาจุดแรก (ใหญ่สุดก่อน) เพื่อหาจุดแรก
  const sortedClusters = [...clusterPricesRaw].sort((a, b) => 
    b.tier.firstPrice - a.tier.firstPrice
  );
  
  // คำนวณราคาแต่ละ cluster (จุดแรก vs จุดถัดไป)
  const clusterPrices = clusterPricesRaw.map((cp, idx) => {
    const isFirstPoint = sortedClusters[0] === cp; // cluster นี้คือจุดแรก?
    const basePrice = isFirstPoint ? cp.tier.firstPrice : cp.tier.nextPrice;
    const dtgExtra = technique === 'dtg' ? DTG_EXTRA_PER_POINT : 0;
    
    return {
      ...cp,
      isFirstPoint,
      basePrice,
      dtgExtra,
      totalPrice: basePrice + dtgExtra
    };
  });

  // Price Calculation
  const sizeSurcharge = SIZE_SURCHARGES[shirtSize] || 0;
  
  // รวมราคาทุก cluster (จุดแรก + จุดถัดไป + DTG extra ถ้ามี)
  const printingPrice = clusterPrices.reduce((sum, cp) => sum + cp.totalPrice, 0);

  const currentPrice = BASE_PRICE + sizeSurcharge + printingPrice;
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const elementStartPos = useRef({ x: 0, y: 0, width: 0, height: 0, fontSize: 0, rotation: 0 });
  const rotationStartAngle = useRef(0);

  const currentShirtSpec = SHIRT_SPECS[shirtSize] || SHIRT_SPECS['M'];
  const pixelsPerCm = BASE_SHIRT_WIDTH_PX / currentShirtSpec.width;
  
  // Calculate print area dimensions relative to shirt
  const printAreaWidthPercent = (PRINT_AREA_WIDTH_CM / currentShirtSpec.width) * 100;
  const printAreaHeightPercent = (PRINT_AREA_HEIGHT_CM / (currentShirtSpec.width * 1.2)) * 100; // Aspect ratio approx

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

    if (type === 'image' || type === 'shape' || type === 'sticker') {
      width = 100;
      height = 100;
    }
    
    if (type === 'icon') {
      width = 80;
      height = 80;
    }

      // Position at center of print area
      // Print area is approximately 60% of 500px canvas width = ~300px
      // Elements' x/y are relative to the print area div (not the canvas)
      // So to center: x = printAreaWidth/2 - elementWidth/2
      const printAreaWidth = (PRINT_AREA_WIDTH_CM / 51) * 500; // ~295px for size M
      const printAreaCenterX = printAreaWidth / 2; // ~147px (center of print area)
      const printAreaCenterY = 150; // Upper-middle of print area (starts at y=0 of print area div)

      const newEl: DesignElement = {
      id: Date.now().toString(), type, content, 
      x: printAreaCenterX - width/2, y: printAreaCenterY - height/2, // Center in print area
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
  };

  const updateElementWithHistory = (id: string | null, changes: Partial<DesignElement>) => {
    if (!id) return;
    const newElements = elements.map(el => el.id === id ? { ...el, ...changes } : el);
    setElements(newElements);
    addToHistory(newElements);
  };

  // Copy element to clipboard
  const copyElement = useCallback(() => {
    if (selectedId) {
      const el = elements.find(e => e.id === selectedId);
      if (el) setClipboard({ ...el });
    }
  }, [selectedId, elements]);

  // Paste element from clipboard
  const pasteElement = useCallback(() => {
    if (clipboard) {
      const newEl: DesignElement = {
        ...clipboard,
        id: `element-${Date.now()}`,
        x: clipboard.x + 20,
        y: clipboard.y + 20,
      };
      const newElements = [...elements, newEl];
      setElements(newElements);
      addToHistory(newElements);
      setSelectedId(newEl.id);
    }
  }, [clipboard, elements]);

  // Toggle lock for selected element
  const toggleLockSelectedElement = useCallback(() => {
    if (selectedId) {
      const el = elements.find(e => e.id === selectedId);
      if (el) {
        updateElementWithHistory(selectedId, { locked: !el.locked });
      }
    }
  }, [selectedId, elements]);

  // Toggle lock by ID (for layer panel)
  const toggleLockById = (id: string) => {
    const el = elements.find(e => e.id === id);
    if (el) {
      updateElementWithHistory(id, { locked: !el.locked });
    }
  };

  // Toggle visibility by ID (for layer panel)
  const toggleVisibilityById = (id: string) => {
    const el = elements.find(e => e.id === id);
    if (el) {
      updateElementWithHistory(id, { visible: el.visible === false ? true : false });
    }
  };

  // Duplicate element
  const duplicateElement = useCallback(() => {
    if (selectedId) {
      const el = elements.find(e => e.id === selectedId);
      if (el) {
        const newEl: DesignElement = {
          ...el,
          id: `element-${Date.now()}`,
          x: el.x + 20,
          y: el.y + 20,
        };
        const newElements = [...elements, newEl];
        setElements(newElements);
        addToHistory(newElements);
        setSelectedId(newEl.id);
      }
    }
  }, [selectedId, elements]);

  // Align elements
  const alignElements = (alignment: string) => {
    if (!selectedId) return;
    const el = elements.find(e => e.id === selectedId);
    if (!el) return;

    let changes: Partial<DesignElement> = {};
    const canvasCenterX = CANVAS_WIDTH / 2;
    const canvasCenterY = CANVAS_HEIGHT / 2;

    switch (alignment) {
      case 'left': changes = { x: 0 }; break;
      case 'center': changes = { x: canvasCenterX - el.width / 2 }; break;
      case 'right': changes = { x: CANVAS_WIDTH - el.width }; break;
      case 'top': changes = { y: 0 }; break;
      case 'middle': changes = { y: canvasCenterY - el.height / 2 }; break;
      case 'bottom': changes = { y: CANVAS_HEIGHT - el.height }; break;
    }
    updateElementWithHistory(selectedId, changes);
  };

  // Flip element
  const flipElement = (direction: 'horizontal' | 'vertical') => {
    if (!selectedId) return;
    const el = elements.find(e => e.id === selectedId);
    if (!el) return;

    if (direction === 'horizontal') {
      updateElementWithHistory(selectedId, { flipX: !el.flipX });
    } else {
      updateElementWithHistory(selectedId, { flipY: !el.flipY });
    }
  };

  // Move layer up/down
  const moveLayer = (id: string, direction: 'up' | 'down') => {
    const index = elements.findIndex(el => el.id === id);
    if (index === -1) return;

    const newElements = [...elements];
    if (direction === 'up' && index < elements.length - 1) {
      [newElements[index], newElements[index + 1]] = [newElements[index + 1], newElements[index]];
    } else if (direction === 'down' && index > 0) {
      [newElements[index], newElements[index - 1]] = [newElements[index - 1], newElements[index]];
    }
    setElements(newElements);
    addToHistory(newElements);
  };

  // Measure text dimensions
  const measureText = (text: string, fontSize: number, fontFamily: string, options?: { fontWeight?: string; letterSpacing?: number; fontStyle?: string }) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return { width: 200, height: 50 };

    context.font = `${options?.fontStyle || 'normal'} ${options?.fontWeight || 'normal'} ${fontSize}px ${fontFamily}`;
    const metrics = context.measureText(text);
    
    const width = Math.ceil(metrics.width + (options?.letterSpacing || 0) * text.length);
    const height = Math.ceil(fontSize * 1.5);
    return { width, height };
  };

  // Update text element with auto-resize
  const updateTextElementWithAutoResize = (id: string, changes: Partial<DesignElement>) => {
    const elementToUpdate = elements.find(el => el.id === id);
    if (!elementToUpdate || elementToUpdate.type !== 'text') return;

    const newElement = { ...elementToUpdate, ...changes };
    const newContent = newElement.content;
    const newFontSize = newElement.fontSize || 32;
    const newFontFamily = newElement.fontFamily || 'Sarabun';
    const newFontWeight = newElement.fontWeight;
    const newFontStyle = newElement.fontStyle;
    const newLetterSpacing = newElement.letterSpacing;

    const dims = measureText(newContent, newFontSize, newFontFamily, {
      fontWeight: newFontWeight,
      fontStyle: newFontStyle,
      letterSpacing: newLetterSpacing,
    });

    const newWidth = Math.max(20, dims.width + 10);
    const newHeight = Math.max(elementToUpdate.height, dims.height);

    const deltaWidth = newWidth - elementToUpdate.width;
    const deltaHeight = newHeight - elementToUpdate.height;

    const updatedChanges = {
      ...changes,
      width: newWidth,
      height: newHeight,
      x: elementToUpdate.x - deltaWidth / 2,
      y: elementToUpdate.y - deltaHeight / 2,
    };
    updateElementWithHistory(id, updatedChanges);
  };

  // Handle curveType change with proper dimension recalculation
  const handleCurveTypeChange = (id: string | null, newCurveType: 'none' | 'arc' | 'circle' | 'wave') => {
    if (!id) return;
    const elementToUpdate = elements.find(el => el.id === id);
    if (!elementToUpdate || elementToUpdate.type !== 'text') return;

    const content = elementToUpdate.content;
    const fontSize = elementToUpdate.fontSize || 32;
    const fontFamily = elementToUpdate.fontFamily || 'Sarabun';
    const fontWeight = elementToUpdate.fontWeight;
    const fontStyle = elementToUpdate.fontStyle;
    const letterSpacing = elementToUpdate.letterSpacing;

    // Measure actual text dimensions
    const textDims = measureText(content, fontSize, fontFamily, {
      fontWeight,
      fontStyle,
      letterSpacing,
    });

    let newWidth: number;
    let newHeight: number;

    if (newCurveType === 'none') {
      // Normal text: fit to actual text size
      newWidth = Math.max(20, textDims.width + 10);
      newHeight = textDims.height;
    } else if (newCurveType === 'circle') {
      // Circle: need square bounding box, min size based on text length
      const minSize = Math.max(150, textDims.width * 0.8, fontSize * 4);
      newWidth = minSize;
      newHeight = minSize;
    } else if (newCurveType === 'arc') {
      // Arc: need wider box for the curve
      const minWidth = Math.max(200, textDims.width * 1.2);
      const minHeight = Math.max(80, fontSize * 2.5);
      newWidth = minWidth;
      newHeight = minHeight;
    } else if (newCurveType === 'wave') {
      // Wave: similar to arc but shorter height
      const minWidth = Math.max(200, textDims.width * 1.2);
      const minHeight = Math.max(60, fontSize * 2);
      newWidth = minWidth;
      newHeight = minHeight;
    } else {
      newWidth = elementToUpdate.width;
      newHeight = elementToUpdate.height;
    }

    // Calculate position adjustment to keep element centered
    const deltaWidth = newWidth - elementToUpdate.width;
    const deltaHeight = newHeight - elementToUpdate.height;

    const changes: Partial<DesignElement> = {
      curveType: newCurveType,
      width: newWidth,
      height: newHeight,
      x: elementToUpdate.x - deltaWidth / 2,
      y: elementToUpdate.y - deltaHeight / 2,
    };

    updateElementWithHistory(id, changes);
  };

  // Keyboard shortcuts (must be after useCallback definitions)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      if (cmdOrCtrl && e.key === 'c') { e.preventDefault(); copyElement(); }
      if (cmdOrCtrl && e.key === 'v') { e.preventDefault(); pasteElement(); }
      if (cmdOrCtrl && e.key === 'd') { e.preventDefault(); duplicateElement(); }
      if (cmdOrCtrl && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      if (cmdOrCtrl && e.key === 'z' && e.shiftKey) { e.preventDefault(); redo(); }
      if (cmdOrCtrl && e.key === 'l') { e.preventDefault(); toggleLockSelectedElement(); }
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) { e.preventDefault(); deleteElement(selectedId); }
      if (e.key === 'Escape') { setSelectedId(null); setSelectedIds([]); }
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key) && selectedId) {
        e.preventDefault();
        const el = elements.find(el => el.id === selectedId);
        if (el && !el.locked) {
          const step = e.shiftKey ? 10 : 1;
          let changes: Partial<DesignElement> = {};
          if (e.key === 'ArrowUp') changes = { y: el.y - step };
          if (e.key === 'ArrowDown') changes = { y: el.y + step };
          if (e.key === 'ArrowLeft') changes = { x: el.x - step };
          if (e.key === 'ArrowRight') changes = { x: el.x + step };
          updateElement(selectedId, changes);
        }
      }
      if (e.key === '?') { setShowKeyboardShortcuts(true); }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, elements, copyElement, pasteElement, duplicateElement, toggleLockSelectedElement]);

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

  // Export Functions
  const exportAsPNG = async () => {
    if (!canvasRef.current) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      setSelectedId(null); // Hide selection handles
      await new Promise(resolve => setTimeout(resolve, 100));
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: null,
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = `design-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
      alert('ไม่สามารถส่งออกไฟล์ได้');
    }
  };

  const exportAsJPG = async () => {
    if (!canvasRef.current) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      setSelectedId(null);
      await new Promise(resolve => setTimeout(resolve, 100));
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = `design-${Date.now()}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
      alert('ไม่สามารถส่งออกไฟล์ได้');
    }
  };

  const exportAsSVG = () => {
    // SVG export - creates text representation
    const svgElements = elements
      .filter(el => el.side === viewSide && el.visible !== false)
      .map(el => {
        if (el.type === 'text') {
          return `<text x="${el.x}" y="${el.y + (el.fontSize || 32)}" font-size="${el.fontSize}" font-family="${el.fontFamily}" fill="${el.color}" opacity="${el.opacity / 100}">${el.content}</text>`;
        }
        return '';
      })
      .join('\n');

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}" viewBox="0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}">
${svgElements}
</svg>`;

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.download = `design-${Date.now()}.svg`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  const exportAsPDF = async () => {
    if (!canvasRef.current) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      
      setSelectedId(null);
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 0.9);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      
      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
      pdf.save(`design-${Date.now()}.pdf`);
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('ไม่สามารถส่งออกไฟล์ PDF ได้');
    }
  };

  const handleSaveClick = () => {
    setShowReviewModal(true);
  };

  const handleFinalSave = (action: 'template' | 'cart') => {
    // Common Item Data
    const itemData = {
      id: currentCartId || crypto.randomUUID(),
      name: selectedProduct.title,
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
                        onClick={() => handleCurveTypeChange(selectedId, 'none')}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${!selectedElement?.curveType || selectedElement?.curveType === 'none' ? 'bg-white shadow-sm text-ci-blue ring-1 ring-slate-200' : 'text-slate-500 hover:bg-white/50'}`}
                     >
                        <Type className="w-4 h-4" />
                        <span>ปกติ</span>
                     </button>
                     <button
                        onClick={() => handleCurveTypeChange(selectedId, 'arc')}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${selectedElement?.curveType === 'arc' ? 'bg-white shadow-sm text-ci-blue ring-1 ring-slate-200' : 'text-slate-500 hover:bg-white/50'}`}
                     >
                        <div className="w-4 h-4 border-t-2 border-current rounded-t-full mt-1" />
                        <span>โค้ง</span>
                     </button>
                     <button
                        onClick={() => handleCurveTypeChange(selectedId, 'circle')}
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
            <div className="space-y-5">
              {/* Current Product Card with Change Button */}
              <div className="flex gap-3 p-3 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-100">
                <div className="w-16 h-16 bg-white rounded-lg border border-slate-200 p-1.5 flex-shrink-0">
                   <img 
                     src={selectedProduct.imageUrl || 'https://www.pngall.com/wp-content/uploads/2016/04/T-Shirt-PNG-File.png'} 
                     className="w-full h-full object-cover rounded-md" 
                     alt={selectedProduct.title}
                   />
                   </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-800 text-sm leading-tight line-clamp-1">{selectedProduct.title}</h3>
                      {selectedProduct.badge && (
                        <span className="inline-block text-[9px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-md mt-0.5 font-medium">
                          {selectedProduct.badge}
                        </span>
                      )}
                </div>
                    <span className="bg-ci-blue text-white text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                      ฿{selectedProduct.price}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mb-2 line-clamp-1">{selectedProduct.description}</p>
                  <button
                    onClick={() => setShowProductModal(true)}
                    className="w-full py-1.5 px-3 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-ci-blue hover:text-ci-blue transition-all flex items-center justify-center gap-1.5"
                  >
                    <Shirt className="w-3.5 h-3.5" />
                    เปลี่ยนสินค้า
                  </button>
                </div>
              </div>

              {/* Current Selection Summary */}
              <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg border border-blue-100">
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm flex-shrink-0" 
                  style={{ backgroundColor: shirtColor }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-700">
                    {COLORS.find(c => c.value === shirtColor)?.name} • {shirtSize}
                  </p>
                </div>
                <span className="text-[10px] text-ci-blue font-medium">กำลังแสดง</span>
              </div>

              {/* Section Divider */}
              <div className="h-px bg-slate-100" />

                {/* Technique Selector */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 bg-ci-blue rounded-full" />
                  <label className="text-xs font-bold text-slate-700">เทคนิคการพิมพ์</label>
                </div>
                <div className="p-1 bg-slate-100 rounded-lg flex gap-1">
                   {[
                     { id: 'dtf', label: 'DTF', desc: 'คิดตามจุด', icon: '🎨' }, 
                     { id: 'dtg', label: 'DTG', desc: 'ราคาเหมา', icon: '🖨️' }
                   ].map((t) => (
                       <button 
                         key={t.id}
                         onClick={() => setTechnique(t.id as any)}
                       className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${technique === t.id ? 'bg-white text-ci-blue shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                     >
                       <div className="flex flex-col items-center gap-0.5">
                         <div className="flex items-center gap-1">
                           <span>{t.icon}</span>
                           <span>{t.label}</span>
                         </div>
                         <span className="text-[9px] opacity-70">{t.desc}</span>
                       </div>
                       </button>
                     ))}
                  </div>
                </div>

              {/* Print Size & Price Breakdown */}
              {allClusters.length > 0 && (
                <>
                  {/* Section Divider */}
                  <div className="h-px bg-slate-100" />

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1 h-4 bg-ci-blue rounded-full" />
                      <label className="text-xs font-bold text-slate-700">
                        ค่าสกรีน ({technique.toUpperCase()})
                      </label>
                    </div>

                    {/* Cluster breakdown - same for DTF and DTG */}
                    <div className="space-y-2">
                      {clusterPrices.map((cp, idx) => (
                        <div 
                          key={idx} 
                          className={`flex items-center justify-between p-2.5 rounded-lg ${
                            cp.isFirstPoint 
                              ? 'bg-pink-50 border-2 border-pink-200' 
                              : 'bg-slate-50 border border-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 text-white rounded-full flex items-center justify-center text-[10px] font-bold ${
                              cp.isFirstPoint ? 'bg-pink-500' : 'bg-slate-400'
                            }`}>
                              {idx + 1}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-700">
                                {cp.bbox.widthInch}×{cp.bbox.heightInch}" ({cp.tier.label.split(' ')[0]})
                              </p>
                              <p className="text-[10px] text-slate-500">
                                {cp.isFirstPoint ? 'จุดแรก (ใหญ่สุด)' : 'จุดถัดไป'}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-bold text-pink-600">฿{cp.basePrice}</div>
                            {cp.dtgExtra > 0 && (
                              <div className="text-[10px] text-blue-500">+฿{cp.dtgExtra} (DTG)</div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {/* Total */}
                      <div className="flex items-center justify-between p-2.5 bg-slate-100 rounded-lg border-2 border-slate-200">
                        <span className="text-xs font-bold text-slate-700">
                          รวม {clusterPrices.length} จุดสกรีน
                        </span>
                        <span className="text-sm font-bold text-ci-blue">
                          ฿{printingPrice}
                        </span>
                      </div>
                      
                      {technique === 'dtg' && clusterPrices.length > 0 && (
                        <p className="text-[10px] text-blue-600 text-center">
                          🖨️ DTG แพงกว่า DTF ฿{DTG_EXTRA_PER_POINT}/จุด
                        </p>
                      )}
                    </div>

                    {/* Price Summary */}
                    <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between text-slate-600">
                          <span>ราคาเสื้อ ({shirtSize})</span>
                          <span>฿{BASE_PRICE + (SIZE_SURCHARGES[shirtSize] || 0)}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>ค่าพิมพ์ ({technique.toUpperCase()})</span>
                          <span>฿{printingPrice}</span>
                        </div>
                        <div className="h-px bg-slate-200" />
                        <div className="flex justify-between font-bold text-slate-800 text-sm">
                          <span>ราคารวม</span>
                          <span className="text-ci-blue">฿{currentPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Section Divider */}
              <div className="h-px bg-slate-100" />

                {/* Colors */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-ci-blue rounded-full" />
                    <label className="text-xs font-bold text-slate-700">สีเสื้อ</label>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{availableColors.length} สี</span>
                  </div>
                    <button onClick={() => setAvailableColors(availableColors.length === COLORS.length ? [shirtColor] : COLORS.map(c => c.value))} className="text-[10px] font-bold text-ci-blue hover:underline">
                      {availableColors.length === COLORS.length ? 'ล้างค่า' : 'เลือกทั้งหมด'}
                    </button>
                  </div>
                
                <div className="flex flex-wrap gap-2">
                    {COLORS.map((c) => {
                      const isSelected = availableColors.includes(c.value);
                      const isActive = shirtColor === c.value;
                      return (
                        <button 
                          key={c.value} 
                          onClick={() => toggleColorSelection(c.value)} 
                        className={`w-8 h-8 rounded-lg transition-all relative group ${isActive ? 'ring-2 ring-ci-blue scale-110 z-10' : 'ring-1 ring-slate-200 hover:scale-105'}`}
                          style={{ backgroundColor: c.value }}
                          title={c.name}
                        >
                           {isSelected && (
                             <div className="absolute inset-0 flex items-center justify-center">
                             <Check className={`w-3.5 h-3.5 ${c.value === '#ffffff' ? 'text-ci-blue' : 'text-white'} drop-shadow-sm`} strokeWidth={3} />
                             </div>
                           )}
                         {isActive && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-ci-blue rounded-full" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

              {/* Section Divider */}
              <div className="h-px bg-slate-100" />

                {/* Sizes */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-ci-blue rounded-full" />
                    <label className="text-xs font-bold text-slate-700">ไซส์</label>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{selectedSizes.length} ไซส์</span>
                  </div>
                    <button onClick={() => setSelectedSizes(selectedSizes.length === SIZES.length ? [] : [...SIZES])} className="text-[10px] font-bold text-ci-blue hover:underline">
                      {selectedSizes.length === SIZES.length ? 'ล้างค่า' : 'เลือกทั้งหมด'}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map((s) => {
                      const isSelected = selectedSizes.includes(s);
                    const isActive = shirtSize === s;
                      return (
                        <button 
                          key={s} 
                          onClick={() => {
                             const newSizes = isSelected ? selectedSizes.filter(sz => sz !== s) : [...selectedSizes, s];
                             setSelectedSizes(newSizes);
                             if (!isSelected) setShirtSize(s); 
                          }}
                        className={`min-w-[42px] px-3 py-2 rounded-lg text-xs font-bold border transition-all relative ${
                          isSelected 
                            ? 'bg-ci-blue text-white border-ci-blue' 
                            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'
                        }`}
                      >
                        {s}
                        {isActive && isSelected && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white" />
                        )}
                        </button>
                      );
                    })}
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
              
              {/* Font List - Thai Fonts */}
              <div className="mb-6">
                 <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">🇹🇭 ฟอนต์ไทย</h3>
                 <div className="space-y-1">
                    {FONTS.filter(f => f.category === 'thai' && f.name.toLowerCase().includes(fontSearchQuery.toLowerCase())).map((f) => (
                      <button 
                        key={f.name} 
                        onClick={() => {
                          if (selectedId && selectedElement?.type === 'text') {
                            updateTextElementWithAutoResize(selectedId, { fontFamily: f.name });
                          } else {
                            addElement('text', f.style === 'handwriting' ? 'สวัสดี' : 'ข้อความ', { fontFamily: f.name, fontSize: 32 });
                          }
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 transition-all group flex items-center justify-between ${selectedElement?.fontFamily === f.name ? 'bg-blue-50 ring-1 ring-ci-blue' : 'bg-white border border-slate-100'}`}
                      >
                        <span className="text-base text-slate-700" style={{ fontFamily: f.name }}>
                          {f.style === 'handwriting' ? 'สวัสดี' : 'ข้อความ'} <span className="text-slate-400 text-xs ml-1">{f.name}</span>
                        </span>
                        {selectedElement?.fontFamily === f.name && <Check className="w-4 h-4 text-ci-blue" />}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Font List - English Fonts */}
              <div>
                 <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">🌍 English Fonts</h3>
                 <div className="space-y-1">
                    {FONTS.filter(f => f.category === 'english' && f.name.toLowerCase().includes(fontSearchQuery.toLowerCase())).map((f) => (
                      <button 
                        key={f.name} 
                        onClick={() => {
                          if (selectedId && selectedElement?.type === 'text') {
                            updateTextElementWithAutoResize(selectedId, { fontFamily: f.name });
                          } else {
                            addElement('text', f.style === 'handwriting' ? 'Hello' : 'Design', { fontFamily: f.name, fontSize: 32 });
                          }
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 transition-all group flex items-center justify-between ${selectedElement?.fontFamily === f.name ? 'bg-blue-50 ring-1 ring-ci-blue' : 'bg-white border border-slate-100'}`}
                      >
                        <span className="text-base text-slate-700" style={{ fontFamily: f.name }}>
                          {f.style === 'handwriting' ? 'Hello' : 'Design'} <span className="text-slate-400 text-xs ml-1">{f.name}</span>
                        </span>
                        {selectedElement?.fontFamily === f.name && <Check className="w-4 h-4 text-ci-blue" />}
                      </button>
                    ))}
                 </div>
                 {FONTS.filter(f => f.name.toLowerCase().includes(fontSearchQuery.toLowerCase())).length === 0 && (
                    <div className="text-center py-8 text-slate-400 text-sm">
                       ไม่พบฟอนต์
                    </div>
                 )}
              </div>
            </div>
          )}
          {activeTool === 'uploads' && (
            <div className="space-y-4">
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              
              {/* Upload Button - Compact */}
              <button onClick={() => fileInputRef.current?.click()} className="w-full border-2 border-dashed border-ci-blue/30 bg-blue-50/30 rounded-xl p-4 hover:bg-blue-50/60 hover:border-ci-blue/50 transition-all group flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-5 h-5 text-ci-blue" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-700">อัปโหลดรูปภาพ</p>
                  <p className="text-xs text-slate-400">JPG, PNG</p>
            </div>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-[10px] text-slate-400 font-medium">คลังของฉัน</span>
                <div className="flex-1 h-px bg-slate-200" />
                    </div>
                 
              {/* Library Grid */}
              <div className="grid grid-cols-2 gap-3">
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

                {/* Empty State if no assets */}
                {MY_LIBRARY_ASSETS.length === 0 && (
                  <div className="col-span-2 text-center py-8 text-slate-400">
                    <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">ยังไม่มีรูปภาพในคลัง</p>
                  </div>
                )}
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
              {/* Layer Summary */}
              <div className="flex items-center justify-between px-2 py-1 mb-2">
                <span className="text-xs text-slate-500">
                  {elements.filter(el => el.side === viewSide).length} เลเยอร์
                </span>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    {elements.filter(el => el.side === viewSide && el.locked).length}
                  </span>
                  <span className="flex items-center gap-1">
                    <EyeOff className="w-3 h-3" />
                    {elements.filter(el => el.side === viewSide && el.visible === false).length}
                  </span>
                </div>
              </div>

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
              
              {elements.filter(el => el.side === viewSide).slice().reverse().map((el, i, arr) => (
                <div key={el.id} 
                  className={`flex items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer ${selectedId === el.id ? 'border-ci-blue bg-blue-50/50' : 'border-slate-200 hover:border-slate-300 bg-white'} ${el.visible === false ? 'opacity-50' : ''}`}
                  onClick={() => setSelectedId(el.id)}
                >
                  {/* Layer Icon */}
                  <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                    {el.type === 'text' && <Type className="w-4 h-4" />}
                    {el.type === 'image' && <ImageIcon className="w-4 h-4" />}
                    {el.type === 'shape' && <Shapes className="w-4 h-4" />}
                    {el.type === 'sticker' && <Sticker className="w-4 h-4" />}
                    {el.type === 'icon' && <Star className="w-4 h-4" />}
                  </div>
                  
                  {/* Layer Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate text-slate-700">
                      {el.content.startsWith('data:') ? 'Image' : el.content.substring(0, 15)}
                      {el.content.length > 15 && '...'}
                    </p>
                    <p className="text-[10px] text-slate-400 capitalize flex items-center gap-1">
                      {el.type}
                      {el.locked && <Lock className="w-2.5 h-2.5" />}
                    </p>
                  </div>
                  
                  {/* Layer Controls */}
                  <div className="flex items-center gap-0.5">
                    {/* Visibility Toggle */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleVisibilityById(el.id); }}
                      className={`p-1 rounded transition-colors ${el.visible === false ? 'bg-slate-200 text-slate-500' : 'hover:bg-slate-100 text-slate-400 hover:text-slate-600'}`}
                      title={el.visible === false ? 'แสดง' : 'ซ่อน'}
                    >
                      {el.visible === false ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    
                    {/* Lock Toggle */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleLockById(el.id); }}
                      className={`p-1 rounded transition-colors ${el.locked ? 'bg-amber-100 text-amber-600' : 'hover:bg-slate-100 text-slate-400 hover:text-slate-600'}`}
                      title={el.locked ? 'ปลดล็อค' : 'ล็อค'}
                    >
                      {el.locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                    </button>
                    
                    {/* Move Up */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); moveLayer(el.id, 'up'); }}
                      className="p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded transition-colors disabled:opacity-30"
                      disabled={i === 0}
                      title="เลื่อนขึ้น"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    
                    {/* Move Down */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); moveLayer(el.id, 'down'); }}
                      className="p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded transition-colors disabled:opacity-30"
                      disabled={i === arr.length - 1}
                      title="เลื่อนลง"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    
                    {/* Delete */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteElement(el.id); }} 
                      className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded transition-colors"
                      title="ลบ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  </div>
                </div>
              ))}
              {elements.filter(el => el.side === viewSide).length === 0 && (
                <div className="text-center py-10 text-slate-400">
                  <Layers className="w-12 h-12 mx-auto mb-2 opacity-20" />
                  <p className="text-sm">ไม่มีเลเยอร์ใน{viewSide === 'front' ? 'ด้านหน้า' : 'ด้านหลัง'}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. Main Workspace */}
      <div className={`flex-1 flex flex-col relative transition-all duration-300 ${activeTool ? 'pl-80' : ''}`}>
        
        {/* Top Bar - Cleaner Design */}
        <div className="h-12 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-10 shadow-sm flex-shrink-0">
           {/* Left: Undo/Redo + Stepper */}
           <div className="flex items-center gap-3">
              <div className="flex bg-slate-100 rounded-lg p-0.5">
                    <button onClick={undo} disabled={currentHistoryIndex <= 0} className={`p-1.5 rounded transition-colors ${currentHistoryIndex <= 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-white hover:shadow-sm hover:text-ci-blue'}`} title="ย้อนกลับ (Ctrl+Z)">
                      <Undo2 className="w-4 h-4" />
                    </button>
                    <button onClick={redo} disabled={currentHistoryIndex >= history.length - 1} className={`p-1.5 rounded transition-colors ${currentHistoryIndex >= history.length - 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-white hover:shadow-sm hover:text-ci-blue'}`} title="ทำซ้ำ (Ctrl+Shift+Z)">
                      <Redo2 className="w-4 h-4" />
                    </button>
           </div>

              {/* Inline Stepper - Compact */}
              <div className="hidden md:flex items-center gap-0.5 text-xs">
              {STEPS.map((step, i) => (
                   <div key={step.id} className="flex items-center">
                     {i > 0 && <div className="w-3 h-px bg-slate-200 mx-1" />}
                     <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${step.status === 'completed' ? 'text-green-600' : step.status === 'current' ? 'text-ci-blue bg-blue-50' : 'text-slate-300'}`}>
                       <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${step.status === 'completed' ? 'bg-green-100 text-green-600' : step.status === 'current' ? 'bg-ci-blue text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {step.status === 'completed' ? <Check className="w-2.5 h-2.5" /> : step.id}
                    </div>
                       <span className="font-semibold hidden lg:inline">{step.label}</span>
                  </div>
                </div>
              ))}
              </div>
           </div>

           {/* Right: Price + Actions */}
           <div className="flex items-center gap-2">
              {/* Compact Price */}
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                   <span className="text-xs text-slate-500">ราคา</span>
                   <span className="text-base font-bold text-slate-900">฿{currentPrice.toLocaleString()}</span>
              </div>

              <Divider />
              
              {/* Tool Buttons */}
              <button 
                onClick={() => setShowKeyboardShortcuts(true)} 
                className="p-2 text-slate-400 hover:text-ci-blue hover:bg-blue-50 rounded-lg transition-all" 
                title="คีย์ลัด (?)"
              >
                <Info className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setShowPreviewModal(true)} 
                className="h-9 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium text-sm transition-all flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              
              <Divider />
              
              <button onClick={handleSaveClick} className="h-9 px-5 bg-ci-blue hover:bg-ci-blueDark text-white rounded-lg font-semibold text-sm transition-all flex items-center gap-2">
                 <span>ถัดไป</span>
                 <ChevronRight className="w-4 h-4" />
              </button>
           </div>
        </div>

        {/* Context Toolbar - Fixed below header (always visible) */}
        <div className="h-11 bg-white/95 backdrop-blur-sm border-b border-slate-100 flex items-center justify-center px-3 z-10 flex-shrink-0">
           {selectedElement && !editingId ? (
           <div className="flex items-center gap-2">
              {selectedElement.type === 'text' && (
                 <>
                    <div className="relative">
                      <button onClick={() => setActiveTool(activeTool === 'text' ? null : 'text')} className="flex items-center gap-1 px-2 py-1 hover:bg-slate-100 rounded text-xs font-medium w-20 justify-center border border-slate-200">
                        <span className="truncate">{selectedElement.fontFamily}</span>
                      </button>
                    </div>
                    <Divider />
                    <div className="flex items-center bg-slate-100 rounded">
                       <button onClick={() => updateTextElementWithAutoResize(selectedId, { fontSize: Math.max(12, (selectedElement.fontSize || 32) - 4) })} className="p-1 hover:bg-slate-200 rounded-l text-slate-600"><Minus className="w-3 h-3" /></button>
                       <span className="w-6 text-center text-[10px] font-bold">{Math.round(selectedElement.fontSize || 0)}</span>
                       <button onClick={() => updateTextElementWithAutoResize(selectedId, { fontSize: Math.min(200, (selectedElement.fontSize || 32) + 4) })} className="p-1 hover:bg-slate-200 rounded-r text-slate-600"><Plus className="w-3 h-3" /></button>
                    </div>
                    <Divider />
                    <div className="flex items-center relative">
                       <div className="w-5 h-5 rounded border border-slate-300" style={{ backgroundColor: selectedElement.color }}></div>
                       <input type="color" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => updateElement(selectedId, { color: e.target.value })} onBlur={(e) => updateElementWithHistory(selectedId, { color: e.target.value })} />
                    </div>
                    <Divider />
                    <div className="flex items-center">
                       <button onClick={() => updateElementWithHistory(selectedId, { fontWeight: selectedElement.fontWeight === 'bold' ? 'normal' : 'bold' })} className={`p-1 rounded hover:bg-slate-100 ${selectedElement.fontWeight === 'bold' ? 'bg-slate-200' : ''}`}><Bold className="w-3.5 h-3.5" /></button>
                       <button onClick={() => updateElementWithHistory(selectedId, { fontStyle: selectedElement.fontStyle === 'italic' ? 'normal' : 'italic' })} className={`p-1 rounded hover:bg-slate-100 ${selectedElement.fontStyle === 'italic' ? 'bg-slate-200' : ''}`}><Italic className="w-3.5 h-3.5" /></button>
                       <button onClick={() => updateElementWithHistory(selectedId, { textDecoration: selectedElement.textDecoration === 'underline' ? 'none' : 'underline' })} className={`p-1 rounded hover:bg-slate-100 ${selectedElement.textDecoration === 'underline' ? 'bg-slate-200' : ''}`}><Underline className="w-3.5 h-3.5" /></button>
                    </div>
                    <Divider />
                    <div className="flex items-center">
                       <button onClick={() => updateElementWithHistory(selectedId, { textAlign: 'left' })} className={`p-1 rounded hover:bg-slate-100 ${selectedElement.textAlign === 'left' ? 'bg-slate-200' : ''}`}><AlignLeft className="w-3.5 h-3.5" /></button>
                       <button onClick={() => updateElementWithHistory(selectedId, { textAlign: 'center' })} className={`p-1 rounded hover:bg-slate-100 ${selectedElement.textAlign === 'center' || !selectedElement.textAlign ? 'bg-slate-200' : ''}`}><AlignCenter className="w-3.5 h-3.5" /></button>
                       <button onClick={() => updateElementWithHistory(selectedId, { textAlign: 'right' })} className={`p-1 rounded hover:bg-slate-100 ${selectedElement.textAlign === 'right' ? 'bg-slate-200' : ''}`}><AlignRight className="w-3.5 h-3.5" /></button>
                    </div>
                    <Divider />
                    {/* Effects Button */}
                    <button 
                      onClick={() => setActiveTool('text-effects')} 
                      className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${activeTool === 'text-effects' ? 'bg-ci-blue text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
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
              <div className="flex items-center gap-1"><button onClick={duplicateElement} className="p-1.5 hover:bg-slate-100 rounded text-slate-500" title="สำเนา"><Copy className="w-4 h-4" /></button><button onClick={() => deleteElement(selectedId)} className="p-1.5 hover:bg-red-50 rounded text-red-500" title="ลบ"><Trash2 className="w-4 h-4" /></button></div>
           </div>
           ) : (
              <div className="flex items-center gap-3">
                 <span className="text-xs text-slate-400 mr-2">เพิ่ม:</span>
                 <button 
                   onClick={() => setActiveTool('text')} 
                   className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${activeTool === 'text' ? 'text-ci-blue bg-blue-50' : 'text-slate-600 hover:text-ci-blue hover:bg-blue-50'}`}
                 >
                   <Type className="w-3.5 h-3.5" />
                   <span>ข้อความ</span>
                 </button>
                 <button 
                   onClick={() => setActiveTool('uploads')}
                   className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${activeTool === 'uploads' ? 'text-ci-blue bg-blue-50' : 'text-slate-600 hover:text-ci-blue hover:bg-blue-50'}`}
                 >
                   <ImageIcon className="w-3.5 h-3.5" />
                   <span>รูปภาพ</span>
                 </button>
                 <button 
                   onClick={() => setActiveTool('elements')}
                   className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${activeTool === 'elements' ? 'text-ci-blue bg-blue-50' : 'text-slate-600 hover:text-ci-blue hover:bg-blue-50'}`}
                 >
                   <Shapes className="w-3.5 h-3.5" />
                   <span>รูปทรง</span>
                 </button>
                 <div className="w-px h-5 bg-slate-200 mx-1" />
                 <div className="flex items-center gap-1 text-xs text-slate-400">
                    <span>Zoom:</span>
                    <button onClick={() => setZoom(Math.max(25, zoom - 25))} className="p-1 hover:bg-slate-100 rounded"><Minus className="w-3 h-3" /></button>
                    <span className="w-10 text-center font-medium text-slate-600">{zoom}%</span>
                    <button onClick={() => setZoom(Math.min(200, zoom + 25))} className="p-1 hover:bg-slate-100 rounded"><Plus className="w-3 h-3" /></button>
                 </div>
           </div>
        )}
        </div>

        {/* Canvas - Centered in available space */}
        <div className="flex-1 overflow-hidden flex items-center justify-center bg-slate-100/80 relative" onClick={() => { setSelectedId(null); setShowFilters(false); }}>
           {/* Dot pattern background */}
           <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
           
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

              {/* Print Area - Always show subtle boundary for better UX */}
              <div 
                className="absolute transition-all z-10 overflow-visible group/area"
                style={{
                  width: `${printAreaWidthPercent}%`,
                  height: `${(PRINT_AREA_HEIGHT_CM / currentShirtSpec.width) * 100}%`, // Rough aspect ratio estimate for height
                  top: '20%', // Fixed top offset approx
                  left: '50%',
                  transform: 'translateX(-50%)',
                  border: showRulers ? '1px dashed rgba(59, 130, 246, 0.5)' : '1px dashed rgba(148, 163, 184, 0.3)' // Always show subtle border for print area
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

                 {/* Print Area Label - Show when no elements */}
                 {elements.filter(el => el.side === viewSide).length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       <div className="flex flex-col items-center text-slate-300/60">
                          <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center mb-2">
                             <Plus className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-medium">พื้นที่ออกแบบ</span>
                          <span className="text-[10px]">{PRINT_AREA_WIDTH_CM} × {PRINT_AREA_HEIGHT_CM} ซม.</span>
                       </div>
                    </div>
                 )}
                 
                 {/* Measurement Guide Overlays - A7 to A2 */}
                 {showMeasurementGuides && (
                   <>
                     {[
                       { label: 'A7', width: 74, height: 105, color: 'emerald' },
                       { label: 'A6', width: 105, height: 148, color: 'blue' },
                       { label: 'A5', width: 148, height: 210, color: 'purple' },
                       { label: 'A4', width: 210, height: 297, color: 'orange' },
                     ].map((guide) => {
                       // Convert mm to pixels (rough scale)
                       const scale = 0.5; // adjust based on canvas scale
                       const w = guide.width * scale;
                       const h = guide.height * scale;
                       return (
                         <div
                           key={guide.label}
                           className={`absolute border border-dashed border-${guide.color}-400/40 pointer-events-none`}
                           style={{
                             left: '50%',
                             top: '50%',
                             transform: 'translate(-50%, -50%)',
                             width: w,
                             height: h
                           }}
                         >
                           <div className={`absolute -top-4 left-0 bg-${guide.color}-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm`}>
                             {guide.label} ({guide.width}×{guide.height}mm)
                           </div>
                         </div>
                       );
                     })}
                   </>
                 )}

                 {/* Cluster Bounding Boxes - Show for DTF/DTG */}
                 {(viewSide === 'front' ? frontClusters : backClusters).map((cluster, idx) => {
                   // ตรวจสอบว่า cluster มี curved text หรือไม่
                   const hasCurvedText = cluster.some(el => 
                     el.type === 'text' && el.curveType && el.curveType !== 'none'
                   );
                   
                   const bbox = getClusterBoundingBox(cluster);
                   const tier = getPriceTier(bbox.widthInch, bbox.heightInch);
                   const clusterInfo = clusterPrices.find(cp => cp.cluster === cluster);
                   const isFirst = clusterInfo?.isFirstPoint;
                   const labelBg = isFirst ? 'bg-pink-500' : 'bg-slate-500';
                   
                   // สำหรับ curved text - แสดงแค่ label ไม่แสดงกรอบ
                   if (hasCurvedText) {
                     return (
                       <div
                         key={`cluster-${idx}`}
                         className="absolute pointer-events-none z-[5]"
                         style={{
                           left: bbox.x,
                           top: bbox.y - 25
                         }}
                       >
                         <div className={`${labelBg} text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm whitespace-nowrap`}>
                           {isFirst ? 'จุดแรก' : 'จุดถัดไป'}: {bbox.widthInch}×{bbox.heightInch}" ({tier.label.split(' ')[0]})
                         </div>
                       </div>
                     );
                   }
                   
                   const borderColor = isFirst ? 'border-pink-400/70' : 'border-slate-400/50';
                   const bgColor = isFirst ? 'bg-pink-50/10' : 'bg-slate-50/10';
                   
                   return (
                     <div
                       key={`cluster-${idx}`}
                       className={`absolute border-2 border-dashed ${borderColor} ${bgColor} pointer-events-none z-[5] rounded-lg transition-opacity`}
                       style={{
                         left: bbox.x - 5,
                         top: bbox.y - 5,
                         width: bbox.width + 10,
                         height: bbox.height + 10
                       }}
                     >
                       <div className={`absolute -top-6 left-0 ${labelBg} text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm whitespace-nowrap pointer-events-auto`}>
                         {isFirst ? 'จุดแรก' : 'จุดถัดไป'}: {bbox.widthInch}×{bbox.heightInch}" ({tier.label.split(' ')[0]})
                       </div>
                     </div>
                   );
                 })}

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
                           <div style={{ color: el.color, opacity: el.opacity / 100, width: '100%', height: '100%', overflow: 'hidden' }}>
                              {(() => {
                                const Icon = AVAILABLE_ICONS[el.content];
                                return <Icon style={{ width: '115%', height: '115%', marginLeft: '-7.5%', marginTop: '-7.5%' }} strokeWidth={1.5} />;
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
                         
                         {/* Bounding Box Lines (Blue - More visible) */}
                         {/* Selection Border - ซ่อนสำหรับ Curved Text */}
                         {!(selectedElement.type === 'text' && selectedElement.curveType && selectedElement.curveType !== 'none') && (
                           <div className="absolute -top-[1px] -left-[1px] -right-[1px] -bottom-[1px] border-2 border-ci-blue pointer-events-none rounded-sm"></div>
                         )}
                         
                         {/* Corner Resize Handles (4 corners only - proportional resize) */}
                         <div 
                           className="absolute -top-2 -left-2 w-4 h-4 bg-white border-2 border-ci-blue rounded-sm cursor-nwse-resize z-50 shadow-md hover:scale-110 hover:bg-blue-50 transition-all pointer-events-auto"
                           onMouseDown={(e) => handleResizeStart(e, selectedElement, 'nw')} 
                         ></div>
                         <div 
                           className="absolute -top-2 -right-2 w-4 h-4 bg-white border-2 border-ci-blue rounded-sm cursor-nesw-resize z-50 shadow-md hover:scale-110 hover:bg-blue-50 transition-all pointer-events-auto"
                           onMouseDown={(e) => handleResizeStart(e, selectedElement, 'ne')}
                         ></div>
                         <div 
                           className="absolute -bottom-2 -left-2 w-4 h-4 bg-white border-2 border-ci-blue rounded-sm cursor-nesw-resize z-50 shadow-md hover:scale-110 hover:bg-blue-50 transition-all pointer-events-auto"
                           onMouseDown={(e) => handleResizeStart(e, selectedElement, 'sw')}
                         ></div>
                         <div 
                           className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border-2 border-ci-blue rounded-sm cursor-nwse-resize z-50 shadow-md hover:scale-110 hover:bg-blue-50 transition-all pointer-events-auto"
                           onMouseDown={(e) => handleResizeStart(e, selectedElement, 'se')}
                         ></div>
                         
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
                  <button onClick={() => setShowControls(true)} className="w-full h-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl" title="แสดงสรุปรายการ">
                     <SlidersHorizontal className="w-5 h-5" />
                  </button>
              )}

              <div className={`space-y-2 ${showControls ? 'opacity-100' : 'opacity-0 hidden'}`}>
                  <div className="flex items-center justify-between">
                       <span className="text-xs font-bold text-slate-800">สรุปรายการ</span>
                       <button onClick={() => setShowControls(false)} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600">
                          <ChevronUp className="w-4 h-4" />
                       </button>
                  </div>
                  
                  <div className="h-px w-full bg-slate-100" />

              {/* Price Details */}
              <div className="space-y-2">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">สรุปราคา</span>
                
                {/* Shirt Price */}
                 <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500">เสื้อ ({shirtSize})</span>
                  <span className="font-medium text-slate-900">฿{BASE_PRICE + sizeSurcharge}</span>
                 </div>

                {/* Printing Price Breakdown */}
                {allClusters.length > 0 ? (
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-bold text-slate-600 flex items-center gap-1">
                      <div className="w-0.5 h-3 bg-ci-blue rounded-full" />
                      ค่าสกรีน ({technique.toUpperCase()})
                    </div>
                    {clusterPrices.map((cp, idx) => (
                      <div 
                        key={idx} 
                        className={`flex items-center justify-between py-1.5 px-2 rounded-md text-[10px] ${
                          cp.isFirstPoint 
                            ? 'bg-pink-50 border border-pink-200' 
                            : 'bg-slate-50 border border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <div className={`w-4 h-4 text-white rounded-full flex items-center justify-center text-[8px] font-bold ${
                            cp.isFirstPoint ? 'bg-pink-500' : 'bg-slate-400'
                          }`}>
                            {idx + 1}
                          </div>
                          <span className="font-medium text-slate-700">
                            {cp.bbox.widthInch}×{cp.bbox.heightInch}" ({cp.tier.label.split(' ')[0]})
                          </span>
                        </div>
                        <span className="font-bold text-slate-800">฿{cp.totalPrice}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-200">
                      <span className="text-slate-600 font-medium">รวมค่าพิมพ์</span>
                      <span className="font-bold text-ci-blue">฿{printingPrice}</span>
                    </div>
                  </div>
                ) : (
                 <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500">ค่าสกรีน</span>
                    <span className="font-medium text-slate-400">฿0</span>
                  </div>
                )}

                {/* Total Price */}
                <div className="h-px w-full bg-slate-200" />
                <div className="flex justify-between items-center text-sm pt-1">
                  <span className="font-bold text-slate-700">ราคารวม</span>
                  <span className="font-bold text-ci-blue text-base">฿{currentPrice}</span>
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
              
              {/* Measurement Guides Toggle */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">กรอบวัด (A7-A4)</span>
                <button 
                  onClick={() => setShowMeasurementGuides(!showMeasurementGuides)} 
                  className={`w-8 h-5 rounded-full transition-colors relative ${showMeasurementGuides ? 'bg-ci-blue' : 'bg-slate-200'}`}
                >
                   <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform shadow-sm ${showMeasurementGuides ? 'left-4' : 'left-1'}`} />
                </button>
              </div>
           </div>
        </div>
      </div>
      </div>
      {/* Review Modal - Clean Checkout Style */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col">
           {/* Simple Header */}
           <div className="h-14 bg-white border-b border-slate-200 flex items-center px-4 gap-3">
              <button 
                onClick={() => setShowReviewModal(false)} 
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-all"
              >
                 <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-bold text-slate-900 flex-1">ตรวจสอบรายการ</h2>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                 <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                 <span className="hidden sm:inline">สินค้า</span>
                 <div className="w-4 h-px bg-slate-300" />
                 <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                 <span className="hidden sm:inline">ออกแบบ</span>
                 <div className="w-4 h-px bg-slate-300" />
                 <span className="w-6 h-6 rounded-full bg-ci-blue text-white flex items-center justify-center text-[10px] font-bold">3</span>
                 <span className="hidden sm:inline font-medium text-ci-blue">ตรวจสอบ</span>
              </div>
           </div>

           {/* Content */}
           <div className="flex-1 overflow-y-auto">
              <div className="max-w-6xl mx-auto p-4 lg:p-6">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Left: Preview Section */}
                    <div className="space-y-4">
                       {/* Mockup Card */}
                       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                          {/* Toggle Front/Back */}
                          <div className="flex border-b border-slate-100">
                             <button 
                                onClick={() => setViewSide('front')} 
                                className={`flex-1 py-3 text-sm font-semibold transition-all ${viewSide === 'front' ? 'text-ci-blue border-b-2 border-ci-blue bg-blue-50/50' : 'text-slate-500 hover:text-slate-700'}`}
                             >
                                ด้านหน้า
                             </button>
                             <button 
                                onClick={() => setViewSide('back')} 
                                className={`flex-1 py-3 text-sm font-semibold transition-all ${viewSide === 'back' ? 'text-ci-blue border-b-2 border-ci-blue bg-blue-50/50' : 'text-slate-500 hover:text-slate-700'}`}
                             >
                                ด้านหลัง
                             </button>
                          </div>
                          
                          {/* Mockup Image */}
                          <div className="p-6 bg-gradient-to-b from-slate-50 to-white">
                             <div className="aspect-square max-w-md mx-auto flex items-center justify-center">
                                <img 
                                   src={viewSide === 'front' ? MOCKUP_IMAGES.front : MOCKUP_IMAGES.back} 
                                   alt="Preview" 
                                   className="max-w-full max-h-full object-contain drop-shadow-lg" 
                                />
                             </div>
                          </div>
                          
                          {/* Color Swatches */}
                          <div className="px-4 py-3 bg-slate-50 border-t border-slate-100">
                             <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-medium text-slate-500">สี:</span>
                                {availableColors.map(c => (
                                   <button
                                      key={c}
                                      onClick={() => setShirtColor(c)}
                                      className={`w-7 h-7 rounded-full border-2 transition-all ${shirtColor === c ? 'border-ci-blue scale-110 ring-2 ring-ci-blue/30' : 'border-slate-200 hover:scale-105'}`}
                                      style={{ backgroundColor: c }}
                                      title={COLORS.find(col => col.value === c)?.name}
                                   />
                                ))}
                             </div>
                          </div>
                       </div>
                       
                       {/* Product Info Card */}
                       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                          <div className="flex gap-4">
                             <div className="w-16 h-16 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                                <img 
                                   src={selectedProduct.imageUrl || 'https://www.pngall.com/wp-content/uploads/2016/04/T-Shirt-PNG-File.png'} 
                                   className="w-full h-full object-cover" 
                                   alt={selectedProduct.title}
                                />
                             </div>
                             <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                   <div>
                                      <h3 className="font-bold text-slate-900">{selectedProduct.title}</h3>
                                      <p className="text-sm text-slate-500 line-clamp-1">{selectedProduct.description}</p>
                                   </div>
                                   {selectedProduct.badge && (
                                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full whitespace-nowrap">
                                         {selectedProduct.badge}
                                      </span>
                                   )}
                                </div>
                                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                                   <span>{selectedProduct.fabricGrade}</span>
                                   <span>•</span>
                                   <span>{selectedProduct.fiberType}</span>
                                   {selectedProduct.thickness && (
                                      <>
                                         <span>•</span>
                                         <span>{selectedProduct.thickness}</span>
                                      </>
                                   )}
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="space-y-4">
                       {/* Order Summary Card */}
                       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                          <div className="p-4 border-b border-slate-100">
                             <h3 className="font-bold text-slate-900">สรุปรายการ</h3>
                          </div>
                          
                          <div className="p-4 space-y-4">
                             {/* Sizes */}
                             <div>
                                <div className="flex items-center justify-between mb-2">
                                   <span className="text-sm font-medium text-slate-600">ไซส์ที่เลือก</span>
                                   <span className="text-xs text-slate-400">{selectedSizes.length} ไซส์</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                   {selectedSizes.map(size => (
                                      <span key={size} className="px-3 py-1.5 bg-slate-100 rounded-lg text-sm font-semibold text-slate-700">
                                         {size}
                                      </span>
                                   ))}
                                </div>
                             </div>
                             
                             {/* Colors */}
                             <div>
                                <div className="flex items-center justify-between mb-2">
                                   <span className="text-sm font-medium text-slate-600">สีที่เลือก</span>
                                   <span className="text-xs text-slate-400">{availableColors.length} สี</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                   {availableColors.map(c => {
                                      const colorName = COLORS.find(col => col.value === c)?.name;
                                      return (
                                         <div key={c} className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded-lg">
                                            <div className="w-4 h-4 rounded-full border border-slate-200" style={{ backgroundColor: c }} />
                                            <span className="text-xs text-slate-600">{colorName}</span>
                                         </div>
                                      );
                                   })}
                                </div>
                             </div>

                             {/* Design Stats */}
                             <div className="pt-3 border-t border-slate-100">
                                <div className="flex items-center justify-between mb-2">
                                   <span className="text-sm font-medium text-slate-600">รายละเอียดดีไซน์</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                   <div className="text-center p-2 bg-blue-50 rounded-lg">
                                      <p className="text-lg font-bold text-blue-600">{elements.length}</p>
                                      <p className="text-[10px] text-blue-600/70">Elements</p>
                                   </div>
                                   <div className="text-center p-2 bg-purple-50 rounded-lg">
                                      <p className="text-lg font-bold text-purple-600">{allClusters.length}</p>
                                      <p className="text-[10px] text-purple-600/70">จุดสกรีน</p>
                                   </div>
                                   <div className="text-center p-2 bg-pink-50 rounded-lg">
                                      <p className="text-lg font-bold text-pink-600">{technique.toUpperCase()}</p>
                                      <p className="text-[10px] text-pink-600/70">เทคนิค</p>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>

                       {/* Price Summary Card */}
                       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                          <div className="p-4 border-b border-slate-100">
                             <h3 className="font-bold text-slate-900">ราคา</h3>
                          </div>
                          
                          <div className="p-4 space-y-3">
                             <div className="flex justify-between text-sm">
                                <span className="text-slate-600">ราคาสินค้า</span>
                                <span className="font-medium">฿{selectedProduct.price}</span>
                             </div>
                             {sizeSurcharge > 0 && (
                                <div className="flex justify-between text-sm">
                                   <span className="text-slate-600">ค่าไซส์ ({shirtSize})</span>
                                   <span className="font-medium">+฿{sizeSurcharge}</span>
                                </div>
                             )}
                             {printingPrice > 0 && (
                                <div className="flex justify-between text-sm">
                                   <span className="text-slate-600">ค่าสกรีน ({allClusters.length} จุด)</span>
                                   <span className="font-medium">฿{printingPrice}</span>
                                </div>
                             )}
                             
                             <div className="pt-3 mt-3 border-t border-slate-200">
                                <div className="flex justify-between items-center">
                                   <span className="font-semibold text-slate-900">รวมทั้งหมด</span>
                                   <span className="text-2xl font-black text-ci-blue">฿{currentPrice}</span>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-1">ราคาต่อชิ้น • ยังไม่รวมค่าจัดส่ง</p>
                             </div>
                          </div>
                       </div>

                       {/* Action Buttons */}
                       <div className="space-y-3">
                          <button 
                             onClick={() => handleFinalSave('cart')} 
                             className="w-full h-12 bg-ci-blue text-white rounded-xl font-bold text-sm hover:bg-ci-blueDark transition-all flex items-center justify-center gap-2 shadow-lg shadow-ci-blue/30"
                          >
                             <ShoppingCart className="w-5 h-5" />
                             บันทึกและใส่ตะกร้า
                          </button>
                          <button 
                             onClick={() => handleFinalSave('template')} 
                             className="w-full h-11 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                          >
                             <Save className="w-4 h-4" />
                             บันทึกเป็นเทมเพลต
                          </button>
                       </div>
                    </div>
                    
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Keyboard Shortcuts Modal */}
      {showKeyboardShortcuts && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setShowKeyboardShortcuts(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Info className="w-5 h-5 text-slate-600" />
                </div>
                <h3 className="font-bold text-lg text-slate-800">คีย์ลัด</h3>
              </div>
              <button onClick={() => setShowKeyboardShortcuts(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
              <ShortcutRow keys={['Ctrl', 'C']} desc="คัดลอก" />
              <ShortcutRow keys={['Ctrl', 'V']} desc="วาง" />
              <ShortcutRow keys={['Ctrl', 'D']} desc="สำเนา" />
              <ShortcutRow keys={['Ctrl', 'Z']} desc="ย้อนกลับ" />
              <ShortcutRow keys={['Ctrl', 'Shift', 'Z']} desc="ทำซ้ำ" />
              <ShortcutRow keys={['Ctrl', 'L']} desc="ล็อค/ปลดล็อค" />
              <ShortcutRow keys={['Delete']} desc="ลบ" />
              <ShortcutRow keys={['Escape']} desc="ยกเลิกการเลือก" />
              <ShortcutRow keys={['↑', '↓', '←', '→']} desc="เลื่อนตำแหน่ง 1px" />
              <ShortcutRow keys={['Shift', '↑↓←→']} desc="เลื่อนตำแหน่ง 10px" />
              <ShortcutRow keys={['?']} desc="แสดงคีย์ลัด" />
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setShowPreviewModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-ci-blue/10 rounded-lg">
                  <Eye className="w-5 h-5 text-ci-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">Preview</h3>
                  <p className="text-xs text-slate-400">ดูตัวอย่างงานออกแบบ</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* 2D/3D Toggle */}
                <div className="flex bg-slate-100 rounded-lg p-1">
                  <button 
                    onClick={() => setPreviewMode('2d')}
                    className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${previewMode === '2d' ? 'bg-white text-ci-blue shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    2D
                  </button>
                  <button 
                    onClick={() => setPreviewMode('3d')}
                    className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${previewMode === '3d' ? 'bg-white text-ci-blue shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    3D
                  </button>
                </div>
                <button onClick={() => setShowPreviewModal(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Preview Content */}
            <div className="p-8 bg-gradient-to-br from-slate-50 to-slate-100">
              <div className="flex justify-center">
                {previewMode === '2d' ? (
                  /* 2D Preview - Front & Back */
                  <div className="flex gap-8">
                    <div className="text-center">
                      <div className="w-72 h-80 bg-white rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden border border-slate-200">
                        <img 
                          src={MOCKUP_IMAGES.front}
                          className="w-full h-full object-contain"
                          style={{ 
                            filter: shirtColor === '#000000' ? 'brightness(0.2)' : 'none', 
                            backgroundColor: shirtColor === '#ffffff' ? 'transparent' : shirtColor, 
                            maskImage: `url(${MOCKUP_IMAGES.front})`, 
                            maskSize: 'contain', 
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskImage: `url(${MOCKUP_IMAGES.front})`,
                            WebkitMaskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center'
                          }}
                        />
                        {/* Design overlay for front */}
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-40 flex items-center justify-center">
                          {elements.filter(el => el.side === 'front' && el.visible !== false).slice(0, 3).map((el, i) => (
                            <div key={el.id} className="absolute text-xs" style={{ transform: `scale(0.3)` }}>
                              {el.type === 'text' && <span style={{ color: el.color, fontFamily: el.fontFamily }}>{el.content}</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm font-bold text-slate-600 mt-3">ด้านหน้า</p>
                    </div>
                    <div className="text-center">
                      <div className="w-72 h-80 bg-white rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden border border-slate-200">
                        <img 
                          src={MOCKUP_IMAGES.back}
                          className="w-full h-full object-contain"
                          style={{ 
                            filter: shirtColor === '#000000' ? 'brightness(0.2)' : 'none', 
                            backgroundColor: shirtColor === '#ffffff' ? 'transparent' : shirtColor, 
                            maskImage: `url(${MOCKUP_IMAGES.back})`, 
                            maskSize: 'contain', 
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskImage: `url(${MOCKUP_IMAGES.back})`,
                            WebkitMaskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center'
                          }}
                        />
                      </div>
                      <p className="text-sm font-bold text-slate-600 mt-3">ด้านหลัง</p>
                    </div>
                  </div>
                ) : (
                  /* 3D Preview - Placeholder */
                  <div className="w-full max-w-lg">
                    <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl shadow-lg flex flex-col items-center justify-center border border-slate-200">
                      <div className="w-20 h-20 bg-slate-300 rounded-full flex items-center justify-center mb-4">
                        <Box className="w-10 h-10 text-slate-500" />
                      </div>
                      <p className="text-lg font-bold text-slate-600">3D Preview</p>
                      <p className="text-sm text-slate-400 mt-1">หมุนดูได้ 360°</p>
                      <p className="text-xs text-slate-400 mt-4 px-8 text-center">
                        ฟีเจอร์ 3D Preview กำลังพัฒนา<br/>จะพร้อมใช้งานเร็วๆ นี้
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Footer with Color & Size Controls */}
            <div className="px-6 py-4 border-t border-slate-100 bg-white space-y-4">
              {/* Color Selector */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">สีเสื้อ</label>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((colorValue) => {
                    const colorObj = COLORS.find(c => c.value === colorValue);
                    return (
                      <button 
                        key={colorValue} 
                        onClick={() => setShirtColor(colorValue)} 
                        className={`w-8 h-8 rounded-lg shadow-sm transition-all ${shirtColor === colorValue ? 'ring-2 ring-ci-blue scale-110' : 'ring-1 ring-slate-200 hover:scale-105'}`}
                        style={{ backgroundColor: colorValue }}
                        title={colorObj?.name || 'Custom Color'}
                      >
                        {shirtColor === colorValue && (
                          <div className="w-full h-full flex items-center justify-center">
                            <Check className={`w-4 h-4 ${colorValue === '#ffffff' ? 'text-ci-blue' : 'text-white'} drop-shadow-sm`} strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">ไซส์</label>
                <div className="flex flex-wrap gap-2">
                  {selectedSizes.map(s => (
                    <button 
                      key={s}
                      onClick={() => setShirtSize(s)}
                      className={`h-8 min-w-[2.5rem] px-3 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                        shirtSize === s 
                          ? 'bg-ci-blue text-white shadow-md scale-105' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="text-sm text-slate-600">
                  <span className="font-medium">ราคา: </span>
                  <span className="font-bold text-ci-blue text-base">฿{currentPrice}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => { setShowPreviewModal(false); setShowExportModal(true); }} 
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium text-sm transition-all flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>ดาวน์โหลด</span>
                  </button>
                  <button onClick={() => setShowPreviewModal(false)} className="px-6 py-2 bg-ci-blue text-white rounded-lg font-bold text-sm hover:bg-ci-blueDark transition-all">
                    ปิด
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Selection Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setShowProductModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-ci-blue/10 rounded-lg">
                  <Shirt className="w-5 h-5 text-ci-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">เลือกสินค้า</h3>
                  <p className="text-xs text-slate-500">เลือกสินค้าที่ต้องการออกแบบ</p>
                </div>
              </div>
              <button onClick={() => setShowProductModal(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Product Grid */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)] custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowProductModal(false);
                    }}
                    className={`flex flex-col gap-3 p-4 rounded-xl border-2 transition-all text-left hover:shadow-lg ${
                      selectedProduct.id === product.id
                        ? 'bg-blue-50 border-ci-blue ring-2 ring-ci-blue/20'
                        : 'bg-white border-slate-200 hover:border-ci-blue'
                    }`}
                  >
                    <div className="aspect-square w-full bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
                      <img
                        src={product.imageUrl || 'https://www.pngall.com/wp-content/uploads/2016/04/T-Shirt-PNG-File.png'}
                        className="w-full h-full object-cover"
                        alt={product.title}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-bold text-slate-800 text-sm leading-tight flex-1">
                          {product.title}
                        </h4>
                        {selectedProduct.id === product.id && (
                          <Check className="w-4 h-4 text-ci-blue flex-shrink-0" />
                        )}
                      </div>
                      {product.badge && (
                        <span className="inline-block text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md mb-1.5 font-medium">
                          {product.badge}
                        </span>
                      )}
                      <p className="text-[11px] text-slate-500 line-clamp-2 mb-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-ci-blue">฿{product.price}</span>
                        {product.fabricGrade && (
                          <span className="text-[10px] text-slate-400">{product.fabricGrade}</span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <p className="text-xs text-slate-500">
                สินค้าที่เลือก: <span className="font-bold text-slate-700">{selectedProduct.title}</span>
              </p>
              <button 
                onClick={() => setShowProductModal(false)} 
                className="px-6 py-2 bg-ci-blue text-white rounded-lg font-bold text-sm hover:bg-ci-blueDark transition-all"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}

      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setShowExportModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Download className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">ส่งออกไฟล์</h3>
                  <p className="text-xs text-slate-400">เลือกรูปแบบที่ต้องการ</p>
                </div>
              </div>
              <button onClick={() => setShowExportModal(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-3">
              <button onClick={() => { exportAsPNG(); setShowExportModal(false); }} className="w-full flex items-center gap-4 p-4 border-2 border-slate-200 rounded-xl hover:border-ci-blue hover:bg-blue-50 transition-all group">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-green-500/30">
                  PNG
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-slate-800 group-hover:text-ci-blue">PNG (แนะนำ)</h4>
                  <p className="text-xs text-slate-400">รูปภาพคุณภาพสูง พื้นหลังโปร่งใส</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-ci-blue" />
              </button>

              <button onClick={() => { exportAsJPG(); setShowExportModal(false); }} className="w-full flex items-center gap-4 p-4 border-2 border-slate-200 rounded-xl hover:border-ci-blue hover:bg-blue-50 transition-all group">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-500/30">
                  JPG
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-slate-800 group-hover:text-ci-blue">JPG</h4>
                  <p className="text-xs text-slate-400">ไฟล์เล็กกว่า เหมาะสำหรับแชร์</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-ci-blue" />
              </button>

              <button onClick={() => { exportAsSVG(); setShowExportModal(false); }} className="w-full flex items-center gap-4 p-4 border-2 border-slate-200 rounded-xl hover:border-ci-blue hover:bg-blue-50 transition-all group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/30">
                  SVG
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-slate-800 group-hover:text-ci-blue">SVG</h4>
                  <p className="text-xs text-slate-400">Vector สำหรับงานพิมพ์คุณภาพสูง</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-ci-blue" />
              </button>

              <button onClick={() => { exportAsPDF(); setShowExportModal(false); }} className="w-full flex items-center gap-4 p-4 border-2 border-slate-200 rounded-xl hover:border-ci-blue hover:bg-blue-50 transition-all group">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-red-500/30">
                  PDF
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-slate-800 group-hover:text-ci-blue">PDF</h4>
                  <p className="text-xs text-slate-400">เอกสารสำหรับส่งโรงพิมพ์</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-ci-blue" />
              </button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}

// Helper component for keyboard shortcuts
function ShortcutRow({ keys, desc }: { keys: string[]; desc: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-600">{desc}</span>
      <div className="flex items-center gap-1">
        {keys.map((key, i) => (
          <span key={i}>
            <kbd className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-mono text-slate-700 shadow-sm">
              {key === 'Ctrl' ? (typeof navigator !== 'undefined' && navigator.platform.includes('Mac') ? '⌘' : 'Ctrl') : key}
            </kbd>
            {i < keys.length - 1 && <span className="text-slate-300 mx-0.5">+</span>}
          </span>
        ))}
      </div>
    </div>
  );
}




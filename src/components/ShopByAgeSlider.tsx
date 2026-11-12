'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  images: string;
  ageRange?: string | null;
  stock?: number;
  shortDesc?: string | null;
}

interface AgeCategory {
  id: string;
  age: string;
  shortLabel: string;
  badge: string;
  title: string;
  desc: string;
  icon: string;
  toyImg: string;
  toyName: string;
  bgGradient: string;
  badgeBg: string;
  badgeText: string;
  activeRing: string;
  accentColor: string;
  href: string;
  ageQuery: string;
}

// 7 Modern, Joyful, Toy-First Age Developmental Categories
const AGE_CATEGORIES: AgeCategory[] = [
  {
    id: '0-18m',
    age: '0 - 18 Months',
    shortLabel: '0-18 M',
    badge: 'BABY & SENSORY',
    title: 'Sensory & First Shapes',
    desc: 'Tactile wooden shapes, soft sorters & fine motor grasping',
    icon: '👶',
    toyImg: '/images/tangram-woodiness.jpg',
    toyName: 'Montessori Wooden Sorter',
    bgGradient: 'from-amber-100/90 via-orange-50 to-amber-200/50',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    badgeText: 'text-amber-800',
    activeRing: 'ring-amber-500 border-amber-400',
    accentColor: '#d97706',
    href: '/shop?age=0-3%20Years',
    ageQuery: '0-3 Years',
  },
  {
    id: '18-36m',
    age: '18 - 36 Months',
    shortLabel: '18-36 M',
    badge: 'TODDLER EXPLORER',
    title: 'Stacking & Balance',
    desc: 'Equilibrium towers, chunky blocks & early spatial logic',
    icon: '🧸',
    toyImg: '/images/tetra-tower.jpg',
    toyName: 'Tetra Tower Balance Game',
    bgGradient: 'from-emerald-100/90 via-teal-50 to-emerald-200/50',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    badgeText: 'text-emerald-800',
    activeRing: 'ring-emerald-500 border-emerald-400',
    accentColor: '#16a34a',
    href: '/shop?age=0-3%20Years',
    ageQuery: '0-3 Years',
  },
  {
    id: '3-5y',
    age: '3 - 5 Years',
    shortLabel: '3-5 YRS',
    badge: 'PRESCHOOL & HABITS',
    title: 'Routines & Daily Planners',
    desc: 'Visual daily habit checklists, sliding toggles & preschool focus',
    icon: '🎨',
    toyImg: '/images/habit-tracker.jpg',
    toyName: 'Habit Tracker Slider Board',
    bgGradient: 'from-sky-100/90 via-blue-50 to-sky-200/50',
    badgeBg: 'bg-sky-100 text-sky-900 border-sky-300',
    badgeText: 'text-sky-800',
    activeRing: 'ring-sky-500 border-sky-400',
    accentColor: '#0284c7',
    href: '/shop?age=3-5%20Years',
    ageQuery: '3-5 Years',
  },
  {
    id: '5-7y',
    age: '5 - 7 Years',
    shortLabel: '5-7 YRS',
    badge: 'BUILDING & ACTIVE',
    title: 'Magnetic Tiles & Toolbox',
    desc: 'Electric toy drill toolboxes, 3D magnetic rods & active games',
    icon: '🧩',
    toyImg: '/images/creative-puzzle-box.jpg',
    toyName: 'Creative Drill Toolbox (232 Pcs)',
    bgGradient: 'from-purple-100/90 via-fuchsia-50 to-purple-200/50',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
    badgeText: 'text-purple-800',
    activeRing: 'ring-purple-500 border-purple-400',
    accentColor: '#9333ea',
    href: '/shop?age=6-8%20Years',
    ageQuery: '6-8 Years',
  },
  {
    id: '7-9y',
    age: '7 - 9 Years',
    shortLabel: '7-9 YRS',
    badge: 'ART & CREATIVITY',
    title: 'Instant Cameras & Mosaics',
    desc: 'Zero-ink instant thermal print cameras, magnetic mosaics & art',
    icon: '📷',
    toyImg: '/images/instant-print-camera.jpg',
    toyName: 'DIY Instant Print Kids Camera',
    bgGradient: 'from-rose-100/90 via-pink-50 to-rose-200/50',
    badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
    badgeText: 'text-rose-800',
    activeRing: 'ring-rose-500 border-rose-400',
    accentColor: '#e11d48',
    href: '/shop?age=6-8%20Years',
    ageQuery: '6-8 Years',
  },
  {
    id: '9-12y',
    age: '9 - 12 Years',
    shortLabel: '9-12 YRS',
    badge: 'STEM SCIENCE LABS',
    title: 'Chemistry & Astronomy',
    desc: 'Safe chemical reactions, rotating planetarium & physics experiments',
    icon: '🔬',
    toyImg: '/images/super-chemistry-lab.jpg',
    toyName: 'Super Chemistry Lab Kit',
    bgGradient: 'from-cyan-100/90 via-teal-50 to-cyan-200/50',
    badgeBg: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    badgeText: 'text-cyan-800',
    activeRing: 'ring-cyan-600 border-cyan-400',
    accentColor: '#0891b2',
    href: '/shop?age=8%2B%20Years',
    ageQuery: '8+ Years',
  },
  {
    id: '12plus',
    age: '12+ Years',
    shortLabel: '12+ YRS',
    badge: 'ADVANCED DISCOVERY',
    title: 'Optics & Robotics',
    desc: '450X optical laboratory microscopes & 155+ science experiment stations',
    icon: '🚀',
    toyImg: '/images/educational-microscope.jpg',
    toyName: 'Educational Microscope (450X)',
    bgGradient: 'from-slate-200/80 via-slate-100 to-emerald-100/60',
    badgeBg: 'bg-slate-900 text-white border-slate-700',
    badgeText: 'text-slate-900',
    activeRing: 'ring-slate-900 border-slate-800',
    accentColor: '#0f172a',
    href: '/shop?age=8%2B%20Years',
    ageQuery: '8+ Years',
  },
];

// Fallback curated toys with latest live database prices
const DEFAULT_AGE_TOYS: Record<string, ProductItem[]> = {
  '0-18m': [
    {
      id: 'fb-tangram',
      name: 'Montessori Geometric Tangram Wood Puzzle',
      slug: 'tangram-wooden-puzzle-set',
      price: 319,
      compareAtPrice: 329,
      images: JSON.stringify(['/images/tangram-woodiness.jpg']),
      ageRange: '0-3 Years',
      shortDesc: 'Smooth non-toxic wooden shape sorter for early grasping & logic.',
    },
    {
      id: 'fb-tetra',
      name: 'Tetra Tower Stacking & Balance Blocks',
      slug: 'balance-tower',
      price: 329,
      compareAtPrice: 385,
      images: JSON.stringify(['/images/tetra-tower.jpg']),
      ageRange: '2-5 Years',
      shortDesc: 'Vibrant balance tower to build hand-eye coordination.',
    },
    {
      id: 'fb-mag-sticks',
      name: 'Findo 36-Piece 3D Magnetic Sticks & Balls Set',
      slug: '36-pcs-magnetic-sticks-building-set',
      price: 849,
      compareAtPrice: 999,
      images: JSON.stringify(['/images/magnetic-sticks-36pcs.jpg']),
      ageRange: '2-6 Years',
      shortDesc: 'Chunky magnetic discovery set for toddlers.',
    },
    {
      id: 'fb-magna',
      name: 'Ekta Magna Play Magnetic Art & Puzzle Kit',
      slug: 'ekta-magna-play-magnetic-art-puzzle',
      price: 549,
      compareAtPrice: 659,
      images: JSON.stringify(['/images/magna-play-magnets.jpg']),
      ageRange: '4-8 Years',
      shortDesc: '300 colorful round magnets with creative design patterns.',
    },
  ],
  '18-36m': [
    {
      id: 'fb-tetra',
      name: 'Tetra Tower Stacking & Balance Blocks',
      slug: 'balance-tower',
      price: 329,
      compareAtPrice: 385,
      images: JSON.stringify(['/images/tetra-tower.jpg']),
      ageRange: '2-5 Years',
      shortDesc: 'Vibrant balance tower to build hand-eye coordination.',
    },
    {
      id: 'fb-tangram',
      name: 'Montessori Geometric Tangram Wood Puzzle',
      slug: 'tangram-wooden-puzzle-set',
      price: 319,
      compareAtPrice: 329,
      images: JSON.stringify(['/images/tangram-woodiness.jpg']),
      ageRange: '0-3 Years',
      shortDesc: 'Smooth non-toxic wooden shape sorter for early grasping & logic.',
    },
    {
      id: 'fb-mag-sticks',
      name: 'Findo 36-Piece 3D Magnetic Sticks & Balls Set',
      slug: '36-pcs-magnetic-sticks-building-set',
      price: 849,
      compareAtPrice: 999,
      images: JSON.stringify(['/images/magnetic-sticks-36pcs.jpg']),
      ageRange: '2-6 Years',
      shortDesc: 'Chunky magnetic discovery set for toddlers.',
    },
  ],
  '3-5y': [
    {
      id: 'fb-habit',
      name: 'Findo Kids Daily Routine & Habit Checklist Board',
      slug: 'habit-tracker',
      price: 349,
      compareAtPrice: 369,
      images: JSON.stringify(['/images/habit-tracker.jpg']),
      ageRange: '3-8 Years',
      shortDesc: 'Interactive slider board to build morning & evening routines.',
    },
    {
      id: 'fb-tetra',
      name: 'Tetra Tower Stacking & Balance Game',
      slug: 'balance-tower',
      price: 329,
      compareAtPrice: 385,
      images: JSON.stringify(['/images/tetra-tower.jpg']),
      ageRange: '2-5 Years',
      shortDesc: 'Exciting multiplayer tower stacking game for family fun.',
    },
    {
      id: 'fb-drill',
      name: 'Creative Puzzle Box with Electric Drill (232 Pcs)',
      slug: 'creative-puzzle-box',
      price: 949,
      compareAtPrice: 1199,
      images: JSON.stringify(['/images/creative-puzzle-box.jpg']),
      ageRange: '3-8 Years',
      shortDesc: 'Safe battery drill with screws & creative pegs.',
    },
    {
      id: 'fb-tangram',
      name: 'Montessori Geometric Tangram Wood Puzzle',
      slug: 'tangram-wooden-puzzle-set',
      price: 319,
      compareAtPrice: 329,
      images: JSON.stringify(['/images/tangram-woodiness.jpg']),
      ageRange: '2-5 Years',
      shortDesc: 'Cognitive shape matching puzzle with smooth wooden finish.',
    },
  ],
  '5-7y': [
    {
      id: 'fb-camera',
      name: 'Findo DIY Instant Print Kids Digital Camera',
      slug: 'kids-instant-print-digital-camera',
      price: 1499,
      compareAtPrice: 1600,
      images: JSON.stringify(['/images/instant-print-camera.jpg']),
      ageRange: '4-10 Years',
      shortDesc: 'Zero-ink instant thermal printing camera with photo filters.',
    },
    {
      id: 'fb-habit',
      name: 'Findo Kids Daily Routine & Habit Checklist Board',
      slug: 'habit-tracker',
      price: 349,
      compareAtPrice: 369,
      images: JSON.stringify(['/images/habit-tracker.jpg']),
      ageRange: '3-8 Years',
      shortDesc: 'Interactive routine slider board for calm mornings.',
    },
    {
      id: 'fb-drill',
      name: 'Creative Puzzle Box with Electric Drill (232 Pcs)',
      slug: 'creative-puzzle-box',
      price: 949,
      compareAtPrice: 1199,
      images: JSON.stringify(['/images/creative-puzzle-box.jpg']),
      ageRange: '3-8 Years',
      shortDesc: '232-piece pegboard suitcase with battery-powered drill.',
    },
    {
      id: 'fb-magna',
      name: 'Ekta Magna Play Magnetic Art & Puzzle Kit',
      slug: 'ekta-magna-play-magnetic-art-puzzle',
      price: 549,
      compareAtPrice: 659,
      images: JSON.stringify(['/images/magna-play-magnets.jpg']),
      ageRange: '4-8 Years',
      shortDesc: '300 colorful round magnets with creative design patterns.',
    },
  ],
  '7-9y': [
    {
      id: 'fb-camera',
      name: 'Findo DIY Instant Print Kids Digital Camera',
      slug: 'kids-instant-print-digital-camera',
      price: 1499,
      compareAtPrice: 1600,
      images: JSON.stringify(['/images/instant-print-camera.jpg']),
      ageRange: '4-10 Years',
      shortDesc: 'Zero-ink instant thermal printing camera with HD photos.',
    },
    {
      id: 'fb-magna',
      name: 'Ekta Magna Play Magnetic Art & Puzzle Kit',
      slug: 'ekta-magna-play-magnetic-art-puzzle',
      price: 549,
      compareAtPrice: 659,
      images: JSON.stringify(['/images/magna-play-magnets.jpg']),
      ageRange: '4-8 Years',
      shortDesc: 'Design over 400+ mosaic pictures using colorful round magnets.',
    },
    {
      id: 'fb-solar',
      name: 'DIY Working Solar System Planetarium Model Kit',
      slug: 'diy-working-solar-system-model',
      price: 490,
      compareAtPrice: 588,
      images: JSON.stringify(['/images/solar-system-diy.jpg']),
      ageRange: '8+ Years',
      shortDesc: 'Paint and assemble 8 revolving orbital planets.',
    },
    {
      id: 'fb-chem',
      name: 'Explore STEM My Super Chemistry Lab Kit',
      slug: 'my-super-chemistry-lab',
      price: 975,
      compareAtPrice: 1100,
      images: JSON.stringify(['/images/super-chemistry-lab.jpg']),
      ageRange: '8+ Years',
      shortDesc: 'Safe hands-on STEM experiments and chemical reactions.',
    },
  ],
  '9-12y': [
    {
      id: 'fb-chem',
      name: 'Explore STEM My Super Chemistry Lab Kit',
      slug: 'my-super-chemistry-lab',
      price: 975,
      compareAtPrice: 1100,
      images: JSON.stringify(['/images/super-chemistry-lab.jpg']),
      ageRange: '8+ Years',
      shortDesc: 'Complete beginner laboratory with test tubes, goggles & beakers.',
    },
    {
      id: 'fb-solar',
      name: 'DIY Working Solar System Planetarium Model Kit',
      slug: 'diy-working-solar-system-model',
      price: 490,
      compareAtPrice: 588,
      images: JSON.stringify(['/images/solar-system-diy.jpg']),
      ageRange: '8+ Years',
      shortDesc: 'Motorized revolving solar planetary system with acrylic paints.',
    },
    {
      id: 'fb-microscope',
      name: 'Findo Kids Educational Microscope Science Kit (100X-450X)',
      slug: 'kids-educational-microscope-science-kit',
      price: 949,
      compareAtPrice: 1050,
      images: JSON.stringify(['/images/educational-microscope.jpg']),
      ageRange: '6-12 Years',
      shortDesc: 'Real working monocular microscope with specimen slides.',
    },
    {
      id: 'fb-3in1',
      name: 'Play Craft 3-in-1 Science Lab Experiment Kit',
      slug: '3-in-1-science-lab-kit',
      price: 1155,
      compareAtPrice: 1375,
      images: JSON.stringify(['/images/science-lab-3in1.jpg']),
      ageRange: '8+ Years',
      shortDesc: 'Over 155+ documented experiments in physics, chem & bio.',
    },
  ],
  '12plus': [
    {
      id: 'fb-3in1',
      name: 'Play Craft 3-in-1 Science Lab Experiment Kit',
      slug: '3-in-1-science-lab-kit',
      price: 1155,
      compareAtPrice: 1375,
      images: JSON.stringify(['/images/science-lab-3in1.jpg']),
      ageRange: '8+ Years',
      shortDesc: 'Advanced multi-experiment laboratory station for teenagers.',
    },
    {
      id: 'fb-microscope',
      name: 'Findo Kids Educational Microscope Science Kit (100X-450X)',
      slug: 'kids-educational-microscope-science-kit',
      price: 949,
      compareAtPrice: 1050,
      images: JSON.stringify(['/images/educational-microscope.jpg']),
      ageRange: '6-12 Years',
      shortDesc: 'Precision optics for examining plant cells, fibers & minerals.',
    },
    {
      id: 'fb-chem',
      name: 'Explore STEM My Super Chemistry Lab Kit',
      slug: 'my-super-chemistry-lab',
      price: 975,
      compareAtPrice: 1100,
      images: JSON.stringify(['/images/super-chemistry-lab.jpg']),
      ageRange: '8+ Years',
      shortDesc: 'Hands-on chemical reactions, crystal growth & molecular exploration.',
    },
    {
      id: 'fb-solar',
      name: 'DIY Working Solar System Planetarium Model Kit',
      slug: 'diy-working-solar-system-model',
      price: 490,
      compareAtPrice: 588,
      images: JSON.stringify(['/images/solar-system-diy.jpg']),
      ageRange: '8+ Years',
      shortDesc: 'Motorized revolving solar planetary system with acrylic paints.',
    },
  ],
};

function parseFirstImage(imagesField: string | string[] | undefined): string {
  if (!imagesField) return '/images/habit-tracker.jpg';
  if (Array.isArray(imagesField)) return imagesField[0] || '/images/habit-tracker.jpg';
  try {
    const parsed = JSON.parse(imagesField);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
  } catch {
    // raw string
  }
  return typeof imagesField === 'string' ? imagesField : '/images/habit-tracker.jpg';
}

export default function ShopByAgeSlider({ allProducts = [] }: { allProducts?: ProductItem[] }) {
  const [selectedAgeId, setSelectedAgeId] = useState<string>('3-5y');
  const [liveProducts, setLiveProducts] = useState<ProductItem[]>(allProducts);
  const scrollRef = useRef<HTMLDivElement>(null);
  const productsSectionRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  // Sync with allProducts passed from server/ISR page
  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      setLiveProducts(allProducts);
    }
  }, [allProducts]);

  const liveMap = useMemo(() => {
    const map = new Map<string, ProductItem>();
    (liveProducts || []).forEach((p) => {
      if (p.slug) map.set(p.slug, p);
    });
    return map;
  }, [liveProducts]);

  const activeCategory = AGE_CATEGORIES.find((c) => c.id === selectedAgeId) || AGE_CATEGORIES[2];

  // Filter products by active age query, merging live DB prices
  const filteredProducts = useMemo(() => {
    let list: ProductItem[] = [];

    if (liveProducts && liveProducts.length > 0) {
      const q = activeCategory.ageQuery.toLowerCase().replace(/[\s\-_]+/g, '');
      const matched = liveProducts.filter((p) => {
        if (!p.ageRange) return false;
        const pAge = p.ageRange.toLowerCase().replace(/[\s\-_]+/g, '');
        return pAge.includes(q) || q.includes(pAge);
      });
      if (matched.length > 0) {
        list = matched;
      }
    }

    if (list.length === 0) {
      list = DEFAULT_AGE_TOYS[selectedAgeId] || DEFAULT_AGE_TOYS['3-5y'];
    }

    // Merge live prices from DB
    return list.map((item) => {
      const live = liveMap.get(item.slug);
      if (live) {
        return {
          ...item,
          price: live.price,
          compareAtPrice: live.compareAtPrice ?? item.compareAtPrice,
          stock: live.stock ?? item.stock,
          images: live.images || item.images,
        };
      }
      return item;
    });
  }, [selectedAgeId, liveProducts, liveMap, activeCategory]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleAddToCart = (e: React.MouseEvent, product: ProductItem) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        images: typeof product.images === 'string' ? product.images : JSON.stringify(product.images),
        ageRange: product.ageRange || activeCategory.age,
        stock: product.stock ?? 10,
      },
      1
    );
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 select-none">
      
      {/* 1. SECTION TITLE (Modern, Joyful & Clean) */}
      <div className="text-center mb-6 sm:mb-10 space-y-2">
        <span className="font-heading text-xs uppercase tracking-widest text-[#5a9e2f] font-extrabold block">
          ★ AGE WORLDS • FIND THE PERFECT FIT
        </span>
        <h2 className="font-heading text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
          SHOP BY AGE
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto">
          Handpicked developmental toys tailored for every stage of your child's curiosity and growth.
        </p>
      </div>

      {/* 2. MODERN HORIZONTAL CAROUSEL TRACK */}
      <div className="relative group">
        
        {/* Left Circular Arrow Button */}
        <button
          onClick={() => scroll('left')}
          aria-label="Previous Age Group"
          className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center text-slate-800 hover:text-[#5a9e2f] hover:border-[#5a9e2f] hover:scale-110 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Scrollable Horizontal Age Track */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-3 sm:gap-5 overflow-x-auto scrollbar-none py-4 px-2 sm:px-3 scroll-smooth"
        >
          {AGE_CATEGORIES.map((item) => {
            const isSelected = item.id === selectedAgeId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedAgeId(item.id);
                  productsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }}
                type="button"
                className={`shrink-0 w-44 xs:w-48 sm:w-56 p-3.5 sm:p-4 rounded-3xl transition-all duration-300 relative group cursor-pointer text-left flex flex-col justify-between border-2 ${
                  isSelected
                    ? `bg-white shadow-xl -translate-y-2 border-[#5a9e2f] ring-4 ring-[#5a9e2f]/20 scale-102`
                    : 'bg-white hover:bg-slate-50/80 shadow-xs hover:shadow-lg hover:-translate-y-1 border-slate-200/90 hover:border-slate-300'
                }`}
                aria-label={`Filter by ${item.age}`}
              >
                {/* Top Badge: Age Icon + Short Label */}
                <div className="flex items-center justify-between gap-1 w-full">
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-2xs ${item.badgeBg}`}>
                    <span>{item.icon}</span>
                    <span className="font-heading font-black">{item.shortLabel}</span>
                  </span>

                  {isSelected && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#5a9e2f] bg-[#eef8ea] px-2 py-0.5 rounded-full border border-[#5a9e2f]/30">
                      ACTIVE
                    </span>
                  )}
                </div>

                {/* Center Hero Toy Photo in Playful Pastel Pedestal */}
                <div className={`relative w-full aspect-square my-3 rounded-2xl bg-gradient-to-br ${item.bgGradient} p-3 flex items-center justify-center overflow-hidden border border-black/5 group-hover:scale-103 transition-transform duration-300 shadow-inner`}>
                  <div className="relative w-full h-full">
                    <Image
                      src={item.toyImg}
                      alt={item.toyName}
                      fill
                      sizes="(max-width: 640px) 160px, 200px"
                      className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                      priority={item.id === '0-18m' || item.id === '3-5y'}
                    />
                  </div>
                  {/* Subtle Toy Label Pill at Bottom of Image */}
                  <span className="absolute bottom-1.5 left-2 right-2 text-center text-[10px] font-bold bg-white/95 backdrop-blur-xs py-0.5 px-2 rounded-md text-slate-800 truncate shadow-xs border border-black/5">
                    {item.toyName}
                  </span>
                </div>

                {/* Bottom Section: Clear Big Age Title + Subtitle */}
                <div className="w-full pt-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-black text-sm sm:text-base text-slate-900 leading-tight group-hover:text-[#5a9e2f] transition-colors">
                      {item.age}
                    </h3>
                    <ChevronRight className={`w-4 h-4 transition-transform shrink-0 ${isSelected ? 'text-[#5a9e2f] translate-x-1' : 'text-slate-400 group-hover:translate-x-1'}`} />
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                    {item.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Circular Arrow Button */}
        <button
          onClick={() => scroll('right')}
          aria-label="Next Age Group"
          className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center text-slate-800 hover:text-[#5a9e2f] hover:border-[#5a9e2f] hover:scale-110 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

      </div>

      {/* 3. DYNAMIC TOYS SECTION APPEARING RIGHT BELOW THE AGE CARDS */}
      <div
        ref={productsSectionRef}
        className="mt-8 bg-white rounded-3xl p-4 sm:p-8 border border-slate-200/90 shadow-sm transition-all duration-500"
      >
        
        {/* Dynamic Age Header with Quick Link */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#5a9e2f] text-xs font-bold uppercase tracking-wider">
              <span>{activeCategory.icon}</span>
              <span className="font-heading">Selected Stage: {activeCategory.age}</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
              Developmental Toys for {activeCategory.age}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              {activeCategory.desc}
            </p>
          </div>

          <Link
            href={activeCategory.href}
            className="font-heading shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5a9e2f] hover:bg-[#488224] text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all hover:scale-105"
          >
            <span>Explore All {activeCategory.shortLabel} Toys</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Quick Age Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-4 pb-2">
          <span className="text-xs font-bold text-slate-400 mr-1 shrink-0 font-heading">Quick Switch:</span>
          {AGE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedAgeId(cat.id)}
              type="button"
              className={`font-heading shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                cat.id === selectedAgeId
                  ? 'bg-[#5a9e2f] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.shortLabel}
            </button>
          ))}
        </div>

        {/* Dynamic Products Grid for this Age */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mt-6">
          {filteredProducts.map((product) => {
            const img = parseFirstImage(product.images);
            const comparePrice = product.compareAtPrice || Math.round(product.price * 1.5);
            const discountPercent = Math.round(((comparePrice - product.price) / comparePrice) * 100);
            const isAdded = addedId === product.id;
            const isTopSelling =
              product.slug?.includes('habit') ||
              product.slug?.includes('camera') ||
              product.name?.toLowerCase().includes('habit tracker') ||
              product.name?.toLowerCase().includes('camera');

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 hover:border-[#5a9e2f] hover:shadow-xl transition-all duration-300 overflow-hidden p-3 sm:p-4 relative"
              >
                {/* Discount Badge */}
                {discountPercent > 0 && (
                  <span className="font-heading absolute top-3 left-3 z-10 bg-rose-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md shadow-xs">
                    {discountPercent}% OFF
                  </span>
                )}

                {/* TOP SELLING Badge for Habit Tracker & DIY Camera */}
                {isTopSelling && (
                  <span className="font-heading absolute top-3 right-3 z-10 bg-gradient-to-r from-amber-500 to-rose-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                    🔥 TOP SELLING
                  </span>
                )}

                {/* Age Pill Badge */}
                {!isTopSelling && (
                  <span className="font-heading absolute top-3 right-3 z-10 bg-[#eef8ea] text-[#3d701e] border border-[#5a9e2f]/20 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {product.ageRange || activeCategory.age}
                  </span>
                )}

                {/* Product Photo */}
                <Link href={`/product/${product.slug}`} className="block relative w-full aspect-square rounded-xl overflow-hidden bg-slate-50 my-2 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={img}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                  />
                </Link>

                {/* Details */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/product/${product.slug}`}>
                      <h4 className="font-heading text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#5a9e2f] transition-colors line-clamp-2">
                        {product.name}
                      </h4>
                    </Link>
                  </div>

                  {/* Price Row */}
                  <div className="pt-1 flex items-baseline gap-2">
                    <span className="font-heading text-base sm:text-lg font-black text-slate-950">
                      ₹{product.price}
                    </span>
                    {comparePrice > product.price && (
                      <span className="text-xs text-slate-400 line-through font-medium">
                        ₹{comparePrice}
                      </span>
                    )}
                  </div>

                  {/* 1-Click Add To Bag */}
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    type="button"
                    className={`font-heading w-full mt-2 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                      isAdded
                        ? 'bg-[#5a9e2f] text-white'
                        : 'bg-slate-900 hover:bg-[#5a9e2f] text-white hover:shadow-md active:scale-95'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}

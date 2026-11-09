'use client';

import React, { useState, useRef } from 'react';
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
  title: string;
  desc: string;
  icon: string;
  bgGradient: string;
  ribbonColor: string;
  img: string;
  href: string;
  ageQuery: string;
}

const AGE_CATEGORIES: AgeCategory[] = [
  {
    id: '0-18m',
    age: '0-18 MONTHS',
    shortLabel: '0-18 M',
    title: 'Sensory & Discovery',
    desc: 'Tactile shapes, soft sorters & motor skills',
    icon: '👶',
    bgGradient: 'from-amber-100 via-orange-50 to-amber-200/60',
    ribbonColor: 'bg-rose-700',
    img: '/images/tangram-woodiness.jpg',
    href: '/shop?age=0-3%20Years',
    ageQuery: '0-3 Years',
  },
  {
    id: '18-36m',
    age: '18-36 MONTHS',
    shortLabel: '18-36 M',
    title: 'Toddlers & Montessori',
    desc: 'Chunky blocks, stacking & early logic',
    icon: '🧸',
    bgGradient: 'from-pink-100 via-rose-50 to-pink-200/60',
    ribbonColor: 'bg-rose-800',
    img: '/images/tetra-tower.jpg',
    href: '/shop?age=0-3%20Years',
    ageQuery: '0-3 Years',
  },
  {
    id: '3-5y',
    age: '3-5 YEARS',
    shortLabel: '3-5 Y',
    title: 'Preschool & Habits',
    desc: 'Daily routine boards & morning trackers',
    icon: '🎨',
    bgGradient: 'from-emerald-100 via-teal-50 to-emerald-200/60',
    ribbonColor: 'bg-emerald-800',
    img: '/images/habit-tracker.jpg',
    href: '/shop?age=3-5%20Years',
    ageQuery: '3-5 Years',
  },
  {
    id: '5-7y',
    age: '5-7 YEARS',
    shortLabel: '5-7 Y',
    title: 'Active & Building',
    desc: 'Magnetic tiles, balance games & puzzles',
    icon: '🧩',
    bgGradient: 'from-sky-100 via-blue-50 to-sky-200/60',
    ribbonColor: 'bg-blue-800',
    img: '/images/magna-play-magnets.jpg',
    href: '/shop?age=6-8%20Years',
    ageQuery: '6-8 Years',
  },
  {
    id: '7-9y',
    age: '7-9 YEARS',
    shortLabel: '7-9 Y',
    title: 'Creative Art & Photo',
    desc: 'DIY instant print thermal cameras & art',
    icon: '📷',
    bgGradient: 'from-purple-100 via-violet-50 to-purple-200/60',
    ribbonColor: 'bg-purple-800',
    img: '/images/instant-print-camera.jpg',
    href: '/shop?age=6-8%20Years',
    ageQuery: '6-8 Years',
  },
  {
    id: '9-12y',
    age: '9-12 YEARS',
    shortLabel: '9-12 Y',
    title: 'STEM Science Labs',
    desc: 'Solar system models & super chemistry sets',
    icon: '🔬',
    bgGradient: 'from-cyan-100 via-teal-50 to-cyan-200/60',
    ribbonColor: 'bg-cyan-900',
    img: '/images/super-chemistry-lab.jpg',
    href: '/shop?age=8%2B%20Years',
    ageQuery: '8+ Years',
  },
  {
    id: '12plus',
    age: '12+ YEARS',
    shortLabel: '12+ Y',
    title: 'Advanced Optics & Robotics',
    desc: '450X optical microscopes & robotic kits',
    icon: '🚀',
    bgGradient: 'from-indigo-100 via-blue-50 to-indigo-200/60',
    ribbonColor: 'bg-indigo-900',
    img: '/images/educational-microscope.jpg',
    href: '/shop?age=8%2B%20Years',
    ageQuery: '8+ Years',
  },
];

// Fallback curated toys by age group
const DEFAULT_AGE_TOYS: Record<string, ProductItem[]> = {
  '0-18m': [
    {
      id: 'fb-tangram',
      name: 'Montessori Geometric Tangram Wood Puzzle',
      slug: 'tangram-wooden-puzzle-set',
      price: 219,
      compareAtPrice: 349,
      images: JSON.stringify(['/images/tangram-woodiness.jpg']),
      ageRange: '0-3 Years',
      shortDesc: 'Smooth non-toxic wooden shape sorter for early grasping & logic.',
    },
    {
      id: 'fb-tetra',
      name: 'Tetra Tower Stacking & Balance Blocks',
      slug: 'balance-tower',
      price: 239,
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
  ],
  '18-36m': [
    {
      id: 'fb-tangram',
      name: 'Montessori Geometric Tangram Wood Puzzle',
      slug: 'tangram-wooden-puzzle-set',
      price: 219,
      compareAtPrice: 349,
      images: JSON.stringify(['/images/tangram-woodiness.jpg']),
      ageRange: '0-3 Years',
      shortDesc: 'Smooth non-toxic wooden shape sorter for early grasping & logic.',
    },
    {
      id: 'fb-tetra',
      name: 'Tetra Tower Stacking & Balance Blocks',
      slug: 'balance-tower',
      price: 239,
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
  ],
  '3-5y': [
    {
      id: 'fb-habit',
      name: 'Findo Kids Daily Routine & Habit Checklist Board',
      slug: 'habit-tracker',
      price: 229,
      compareAtPrice: 399,
      images: JSON.stringify(['/images/habit-tracker.jpg']),
      ageRange: '3-8 Years',
      shortDesc: 'Interactive slider board to build morning & evening routines.',
    },
    {
      id: 'fb-tetra',
      name: 'Tetra Tower Stacking & Balance Game',
      slug: 'balance-tower',
      price: 239,
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
      price: 219,
      compareAtPrice: 349,
      images: JSON.stringify(['/images/tangram-woodiness.jpg']),
      ageRange: '2-5 Years',
      shortDesc: 'Cognitive shape matching puzzle with smooth wooden finish.',
    },
  ],
  '5-7y': [
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
    {
      id: 'fb-camera',
      name: 'Findo DIY Instant Print Kids Digital Camera',
      slug: 'kids-instant-print-digital-camera',
      price: 1319,
      compareAtPrice: 1600,
      images: JSON.stringify(['/images/instant-print-camera.jpg']),
      ageRange: '4-10 Years',
      shortDesc: 'Zero-ink instant thermal printing camera with photo filters.',
    },
    {
      id: 'fb-drill',
      name: 'Creative Puzzle Box with Electric Drill (232 Pcs)',
      slug: 'creative-puzzle-box',
      price: 949,
      compareAtPrice: 1199,
      images: JSON.stringify(['/images/creative-puzzle-box.jpg']),
      ageRange: '3-8 Years',
      shortDesc: 'Hands-on engineering builder kit with safe tools.',
    },
    {
      id: 'fb-solar',
      name: 'DIY My Working Solar System Planetarium Model',
      slug: 'diy-working-solar-system-model',
      price: 490,
      compareAtPrice: 600,
      images: JSON.stringify(['/images/solar-system-diy.jpg']),
      ageRange: '6-12 Years',
      shortDesc: 'Rotating educational planetarium model kit.',
    },
  ],
  '7-9y': [
    {
      id: 'fb-camera',
      name: 'Findo DIY Instant Print Kids Digital Camera',
      slug: 'kids-instant-print-digital-camera',
      price: 1319,
      compareAtPrice: 1600,
      images: JSON.stringify(['/images/instant-print-camera.jpg']),
      ageRange: '4-10 Years',
      shortDesc: 'Instant printing zero-ink camera with video & memory card support.',
    },
    {
      id: 'fb-solar',
      name: 'DIY My Working Solar System Planetarium Model',
      slug: 'diy-working-solar-system-model',
      price: 490,
      compareAtPrice: 600,
      images: JSON.stringify(['/images/solar-system-diy.jpg']),
      ageRange: '6-12 Years',
      shortDesc: 'Hands-on astronomy model kit with glow-in-the-dark planets.',
    },
    {
      id: 'fb-chem',
      name: 'Explore STEM My Super Chemistry Lab Kit',
      slug: 'my-super-chemistry-lab',
      price: 975,
      compareAtPrice: 1100,
      images: JSON.stringify(['/images/super-chemistry-lab.jpg']),
      ageRange: '8+ Years',
      shortDesc: '55+ safe, thrilling chemical experiments for curious minds.',
    },
    {
      id: 'fb-microscope',
      name: 'Findo Kids Educational Microscope Science Kit',
      slug: 'kids-educational-microscope-science-kit',
      price: 949,
      compareAtPrice: 1050,
      images: JSON.stringify(['/images/educational-microscope.jpg']),
      ageRange: '6-12 Years',
      shortDesc: '100X to 450X optical magnification with specimen slides.',
    },
  ],
  '9-12y': [
    {
      id: 'fb-microscope',
      name: 'Findo Kids Educational Microscope Science Kit (100X-450X)',
      slug: 'kids-educational-microscope-science-kit',
      price: 949,
      compareAtPrice: 1050,
      images: JSON.stringify(['/images/educational-microscope.jpg']),
      ageRange: '6-12 Years',
      shortDesc: 'Real working optical microscope with slides and tweezers.',
    },
    {
      id: 'fb-chem',
      name: 'Explore STEM My Super Chemistry Lab Kit',
      slug: 'my-super-chemistry-lab',
      price: 975,
      compareAtPrice: 1100,
      images: JSON.stringify(['/images/super-chemistry-lab.jpg']),
      ageRange: '8+ Years',
      shortDesc: '55+ safe chemistry experiments with test tubes & chemicals.',
    },
    {
      id: 'fb-3in1',
      name: 'Play Craft 3-in-1 Science Lab Experiment Kit',
      slug: '3-in-1-science-lab-kit',
      price: 1155,
      compareAtPrice: 1375,
      images: JSON.stringify(['/images/science-lab-3in1.jpg']),
      ageRange: '8+ Years',
      shortDesc: 'All-in-one physics, chemistry, and biology starter lab.',
    },
    {
      id: 'fb-solar-robot',
      name: '6 in 1 Solar Educational Robotic Kit',
      slug: '6-in-1-solar-kit-educational-robotic',
      price: 840,
      compareAtPrice: 999,
      images: JSON.stringify(['/images/solar-system-diy.jpg']),
      ageRange: '8+ Years',
      shortDesc: 'Build 6 different moving solar-powered motorized models.',
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
      id: 'fb-solar-robot',
      name: '6 in 1 Solar Educational Robotic Kit',
      slug: '6-in-1-solar-kit-educational-robotic',
      price: 840,
      compareAtPrice: 999,
      images: JSON.stringify(['/images/solar-system-diy.jpg']),
      ageRange: '8+ Years',
      shortDesc: 'Gear-driven solar robot engineering kit with multiple builds.',
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const activeCategory = AGE_CATEGORIES.find((c) => c.id === selectedAgeId) || AGE_CATEGORIES[2];

  // Filter products by active age query, or use rich default age toys
  const filteredProducts = React.useMemo(() => {
    if (allProducts && allProducts.length > 0) {
      const q = activeCategory.ageQuery.toLowerCase().replace(/[\s\-_]+/g, '');
      const matched = allProducts.filter((p) => {
        if (!p.ageRange) return false;
        const pAge = p.ageRange.toLowerCase().replace(/[\s\-_]+/g, '');
        if (pAge.includes(q) || q.includes(pAge)) return true;
        if (q.includes('03') && (pAge.includes('03') || pAge.includes('25') || pAge.startsWith('0') || pAge.startsWith('2'))) return true;
        if (q.includes('35') && (pAge.includes('35') || pAge.includes('38') || pAge.includes('25'))) return true;
        if (q.includes('68') && (pAge.includes('48') || pAge.includes('68') || pAge.includes('612') || pAge.includes('410'))) return true;
        if (q.includes('8') && (pAge.includes('8') || pAge.includes('612'))) return true;
        return false;
      });
      if (matched.length > 0) return matched;
    }
    return DEFAULT_AGE_TOYS[selectedAgeId] || DEFAULT_AGE_TOYS['3-5y'];
  }, [allProducts, selectedAgeId, activeCategory]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -260 : 260;
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
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      {/* 1. SECTION TITLE (Hamleys Style Bold Header) */}
      <div className="text-center space-y-1.5 mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#5a9e2f] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Shop By Developmental Stage</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
          SHOP BY AGE
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg mx-auto">
          Tap an age below to immediately discover perfect, screen-free toys tailored for your child!
        </p>
      </div>

      {/* 2. AGE CAROUSEL TRACK WITH LEFT/RIGHT ARROWS */}
      <div className="relative group">
        
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll Left"
          className="hidden sm:flex absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 items-center justify-center text-slate-700 hover:text-slate-900 hover:scale-110 transition-all opacity-90 hover:opacity-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scrollable Horizontal Age Track */}
        <div
          ref={scrollRef}
          className="flex items-center gap-3 sm:gap-4 overflow-x-auto scrollbar-none py-3 px-1 scroll-smooth"
        >
          {AGE_CATEGORIES.map((item) => {
            const isSelected = item.id === selectedAgeId;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`shrink-0 w-36 sm:w-44 flex flex-col items-center text-center rounded-2xl overflow-hidden bg-white border-2 transition-all duration-300 group/card ${
                  isSelected
                    ? 'border-[#5a9e2f] ring-4 ring-[#5a9e2f]/20 shadow-xl -translate-y-1 scale-102'
                    : 'border-slate-200/90 shadow-xs hover:border-[#5a9e2f] hover:shadow-md hover:-translate-y-1'
                }`}
              >
                {/* Ribbon Header Tag (Hamleys Red/Burgundy/Green Style Ribbon) */}
                <div className={`w-full py-1.5 px-1 text-center ${item.ribbonColor} text-white shadow-xs`}>
                  <span className="font-heading text-[11px] sm:text-xs font-black tracking-wider uppercase block">
                    {item.age}
                  </span>
                </div>

                {/* Card Body with Warm Gradient & Toy Photo */}
                <div className={`w-full h-32 sm:h-40 bg-gradient-to-b ${item.bgGradient} flex items-center justify-center p-2.5 relative overflow-hidden`}>
                  <div className="relative w-22 h-22 sm:w-26 sm:h-26 rounded-xl overflow-hidden drop-shadow-md group-hover/card:scale-110 transition-transform duration-300">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Corner Emoji Pill */}
                  <span className="absolute bottom-1.5 right-1.5 text-base bg-white/90 backdrop-blur-xs rounded-full w-6 h-6 flex items-center justify-center shadow-xs">
                    {item.icon}
                  </span>
                </div>

                {/* Card Footer: Title & Explore Link */}
                <div className="p-2.5 w-full bg-white space-y-1 border-t border-slate-100">
                  <h3 className="font-heading text-xs font-bold truncate text-slate-900 group-hover/card:text-[#5a9e2f] transition-colors">
                    {item.title}
                  </h3>
                  <span className="font-heading text-[11px] font-bold text-[#5a9e2f] flex items-center justify-center gap-1 group-hover/card:underline">
                    <span>View Toys</span>
                    <ArrowRight className="w-3 h-3 group-hover/card:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll Right"
          className="hidden sm:flex absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 items-center justify-center text-slate-700 hover:text-slate-900 hover:scale-110 transition-all opacity-90 hover:opacity-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>

      {/* 3. DYNAMIC TOYS SECTION APPEARING RIGHT BELOW THE AGE CARDS */}
      {/* "SHOP BY AGE ITHNTE THAZHE ORU AGES NTEDUM ADUKUMBOL VARUNILLA" -> SOLVED! */}
      <div className="mt-8 bg-gradient-to-b from-white to-slate-50/60 rounded-3xl p-4 sm:p-8 border border-slate-200 shadow-sm transition-all duration-500 animate-fade-in">
        
        {/* Dynamic Age Header with Quick Selector Pills */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#5a9e2f] text-xs font-bold uppercase tracking-wider">
              <span>{activeCategory.icon}</span>
              <span className="font-heading">Age Category: {activeCategory.age}</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
              Top Toys for {activeCategory.age} ({activeCategory.title})
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

        {/* Quick Age Filter Pills so user can also switch preview right here */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-3 pb-1">
          <span className="text-xs font-bold text-slate-400 mr-1 shrink-0 font-heading">Switch Age:</span>
          {AGE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedAgeId(cat.id)}
              type="button"
              className={`font-heading shrink-0 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                cat.id === selectedAgeId
                  ? 'bg-[#5a9e2f] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-[#5a9e2f] hover:text-[#5a9e2f]'
              }`}
            >
              {cat.shortLabel}
            </button>
          ))}
        </div>

        {/* Dynamic Products Grid for this Age */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mt-5">
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

                {/* Age Pill Badge (if not top selling to avoid overlap) */}
                {!isTopSelling && (
                  <span className="font-heading absolute top-3 right-3 z-10 bg-emerald-50 text-[#5a9e2f] border border-emerald-200 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full">
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
                        ? 'bg-emerald-600 text-white'
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

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Lightbulb, Smile, MonitorOff, ShieldCheck, Flame, Compass, Star } from 'lucide-react';
import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import HeroEarshot from '@/components/HeroEarshot';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Live real-time updates for newly added/edited products

const FALLBACK_PRODUCTS = [
  {
    id: 'fb-1',
    name: 'Findo Kids Daily Routine Habit Tracker Board',
    slug: 'findo-kids-daily-routine-habit-tracker-board',
    shortDesc: 'Daily morning & evening habit checklist slider board for kids.',
    price: 229,
    compareAtPrice: 399,
    stock: 25,
    images: JSON.stringify(['/images/habit-tracker.jpg']),
    ageRange: '3-5 Years',
    isFeatured: true,
    isPublished: true,
    category: { name: 'Preschool & Routine', slug: 'preschool-routine' },
  },
  {
    id: 'fb-2',
    name: 'Tetra Tower Balance Stacking Game',
    slug: 'tetra-tower-balance-game',
    shortDesc: 'Exciting stacking and balancing game for focus and motor skills.',
    price: 239,
    compareAtPrice: 399,
    stock: 20,
    images: JSON.stringify(['/images/tetra-tower.jpg']),
    ageRange: '3-5 Years',
    isFeatured: true,
    isPublished: true,
    category: { name: 'Puzzles & Activity', slug: 'puzzles-activity' },
  },
  {
    id: 'fb-3',
    name: 'Findo DIY Instant Print Kids Camera',
    slug: 'findo-diy-instant-print-camera',
    shortDesc: 'Zero-ink instant thermal printing camera with video and photo effects.',
    price: 1319,
    compareAtPrice: 1999,
    stock: 15,
    images: JSON.stringify(['/images/instant-print-camera.jpg']),
    ageRange: '6-8 Years',
    isFeatured: true,
    isPublished: true,
    category: { name: 'Puzzles & Activity', slug: 'puzzles-activity' },
  },
  {
    id: 'fb-4',
    name: 'Super Chemistry Lab Experiment Set',
    slug: 'super-chemistry-lab',
    shortDesc: 'Exciting hands-on STEM experiments and safe chemical reactions.',
    price: 975,
    compareAtPrice: 1499,
    stock: 12,
    images: JSON.stringify(['/images/super-chemistry-lab.jpg']),
    ageRange: '8+ Years',
    isFeatured: true,
    isPublished: true,
    category: { name: 'STEM & Educational', slug: 'stem-educational' },
  },
  {
    id: 'fb-5',
    name: 'Montessori Geometric Tangram Puzzle',
    slug: 'montessori-geometric-puzzle',
    shortDesc: 'Chunky wooden shape sorter puzzle for early motor development.',
    price: 219,
    compareAtPrice: 349,
    stock: 30,
    images: JSON.stringify(['/images/tangram-woodiness.jpg']),
    ageRange: '0-3 Years',
    isFeatured: true,
    isPublished: true,
    category: { name: 'Montessori & Sensory', slug: 'montessori-sensory' },
  },
  {
    id: 'fb-6',
    name: 'Educational Optical Microscope 450X',
    slug: 'educational-microscope',
    shortDesc: 'Real working optical microscope with slides and specimen tools.',
    price: 849,
    compareAtPrice: 1299,
    stock: 10,
    images: JSON.stringify(['/images/educational-microscope.jpg']),
    ageRange: '8+ Years',
    isFeatured: true,
    isPublished: true,
    category: { name: 'STEM & Educational', slug: 'stem-educational' },
  },
];

async function getHomePageData() {
  try {
    const [featuredProducts, allProducts] = await Promise.all([
      prisma.product.findMany({
        where: { isFeatured: true, isPublished: true },
        take: 8,
        orderBy: { createdAt: 'desc' },
        include: { category: true },
      }),
      prisma.product.findMany({
        where: { isPublished: true },
        take: 12,
        orderBy: { createdAt: 'desc' },
        include: { category: true },
      }),
    ]);

    return {
      featuredProducts: featuredProducts.length > 0 ? featuredProducts : FALLBACK_PRODUCTS.slice(0, 4),
      catalogProducts: allProducts.length > 0 ? allProducts : FALLBACK_PRODUCTS,
    };
  } catch (error) {
    console.warn('Database temporarily unreachable during build/render, using fallback:', error);
    return {
      featuredProducts: FALLBACK_PRODUCTS.slice(0, 4),
      catalogProducts: FALLBACK_PRODUCTS,
    };
  }
}

export default async function HomePage() {
  const { featuredProducts, catalogProducts } = await getHomePageData();

  const expressiveDimensions = [
    {
      num: '01',
      title: 'Sensory Valley',
      stage: 'Sensory & Montessori (0–3 Y)',
      desc: 'Tactile shapes, Montessori geometric sorters, and early tactile motor skill essentials.',
      icon: '👶',
      badge: 'Sensory Focus',
      color: '#5a9e2f',
      href: '/shop?age=0-3%20Years',
    },
    {
      num: '02',
      title: 'Routine Village',
      stage: 'Habits & Preschool (3–5 Y)',
      desc: 'Interactive daily habit boards, morning routine sliders, and smart savings trackers.',
      icon: '🎨',
      badge: 'Best Seller',
      color: '#0284c7',
      href: '/shop?age=3-5%20Years',
    },
    {
      num: '03',
      title: 'Creative Forest',
      stage: 'Puzzles & Art (6–8 Y)',
      desc: 'Instant print kids digital cameras, 3D magnetic sticks, and Magna Play art kits.',
      icon: '🧩',
      badge: 'Creative Art',
      color: '#8b5cf6',
      href: '/shop?age=6-8%20Years',
    },
    {
      num: '04',
      title: 'Science Citadel',
      stage: 'STEM & Labs (8+ Y)',
      desc: 'Super chemistry labs, working solar systems, 6-in-1 solar robots, and 450X microscopes.',
      icon: '🔬',
      badge: 'STEM Science',
      color: '#10b981',
      href: '/shop?age=8%2B%20Years',
    },
  ];

  const curatedCoordinates = [
    { num: '01', name: 'Habit Tracker Board', age: '3-8 Y', price: '₹229', img: '/images/habit-tracker.jpg', href: '/product/findo-kids-daily-routine-habit-tracker-board' },
    { num: '02', name: 'Tetra Tower Balance', age: '2-5 Y', price: '₹239', img: '/images/tetra-tower.jpg', href: '/product/tetra-tower-balance-game' },
    { num: '03', name: 'Instant Print Camera', age: '4-10 Y', price: '₹1,319', img: '/images/instant-print-camera.jpg', href: '/product/findo-diy-instant-print-camera' },
    { num: '04', name: 'Super Chemistry Lab', age: '8+ Y', price: '₹975', img: '/images/super-chemistry-lab.jpg', href: '/product/super-chemistry-lab' },
    { num: '05', name: 'Montessori Tangram', age: '2-5 Y', price: '₹219', img: '/images/tangram-woodiness.jpg', href: '/product/montessori-geometric-puzzle' },
    { num: '06', name: 'Educational Microscope', age: '6-12 Y', price: '₹849', img: '/images/science-lab-3in1.jpg', href: '/product/educational-microscope' },
    { num: '07', name: 'Ekta Magna Play', age: '4-8 Y', price: '₹549', img: '/images/magna-play-magnets.jpg', href: '/product/magna-play-art-kit' },
    { num: '08', name: 'Solar System Model', age: '6-12 Y', price: '₹490', img: '/images/solar-system-diy.jpg', href: '/product/solar-system-model-kit' },
  ];

  return (
    <div className="bg-[#fafbf8] text-slate-900 min-h-screen space-y-16 sm:space-y-24 pb-28">

      {/* 1. EARSHOT RUNNER HERO SECTION WITH SQUIRREL MASCOT */}
      <HeroEarshot />

      {/* 2. AGE WORLDS & DEVELOPMENTAL MILESTONES */}
      <section id="age-worlds" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-black uppercase tracking-widest text-[#5a9e2f] bg-[#5a9e2f]/10 border border-[#5a9e2f]/30 px-3.5 py-1.5 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DISCOVERY WORLDS • AGES 0 TO 8+ YEARS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Designed for Curious Explorers.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5a9e2f] via-[#0284c7] to-[#8b5cf6]">
              Tactile Play That Replaces Mindless Screens.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Explore carefully curated developmental worlds crafted to celebrate each child’s natural curiosity — from tactile sensory discovery to creative labs.
          </p>
        </div>

        {/* 4 Interactive Age World Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {expressiveDimensions.map((dim) => (
            <Link
              key={dim.num}
              href={dim.href}
              className="group earshot-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between relative overflow-hidden bg-white shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-slate-500">
                  <span className="font-black text-[#5a9e2f]">({dim.num})</span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                    {dim.badge}
                  </span>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-[#5a9e2f]/10 border border-[#5a9e2f]/20 flex items-center justify-center font-bold text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all shadow-sm">
                  {dim.icon}
                </div>

                <div>
                  <span className="font-mono text-[10px] font-bold text-[#5a9e2f] uppercase tracking-wider block">
                    {dim.stage}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-[#5a9e2f] transition-colors mt-1">
                    {dim.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {dim.desc}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between font-mono text-xs font-black text-[#5a9e2f] uppercase tracking-wider">
                <span>Explore World</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. NEW ARRIVALS SPOTLIGHT (FEATURED COLLECTION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-widest text-[#5a9e2f] font-bold block">
              + [ FEATURED RELEASES ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-slate-900">
              Trending Discoveries
            </h2>
          </div>
          <Link
            href="/shop"
            className="font-mono text-xs font-bold uppercase tracking-wider text-[#5a9e2f] hover:underline flex items-center gap-1 group"
          >
            <span>See all catalog</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Column Product Cards with Clean Bright Theme */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} variant="light" />
          ))}
        </div>
      </section>

      {/* 4. THE ICONIC LETTER-INTEGRATED "C A [product] A L [product] O G" SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Giant Clean CATALOG Header with Real Integrated Product Cutouts */}
        <div className="text-center py-8 sm:py-14 border border-slate-200 select-none bg-white rounded-3xl shadow-xs px-4">
          <div className="flex items-center justify-center gap-1 sm:gap-3 text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tighter text-slate-950 leading-none">
            <span>C</span>
            <span>A</span>
            {/* Integrated Circular Product Visual 1 */}
            <div className="relative w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden border-2 sm:border-4 border-[#5a9e2f] shadow-md bg-white shrink-0 mx-1 animate-pulse-subtle">
              <Image
                src="/images/habit-tracker.jpg"
                alt="Findo Habit Tracker"
                fill
                className="object-cover"
              />
            </div>
            <span>A</span>
            <span>L</span>
            {/* Integrated Circular Product Visual 2 */}
            <div className="relative w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden border-2 sm:border-4 border-[#0284c7] shadow-md bg-white shrink-0 mx-1 animate-pulse-subtle">
              <Image
                src="/images/tangram-woodiness.jpg"
                alt="Montessori Puzzle"
                fill
                className="object-cover"
              />
            </div>
            <span>O</span>
            <span>G</span>
          </div>

          {/* Sub-Nav: Filter + & Sort by */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none w-full sm:w-auto pb-1">
              <span className="font-bold text-slate-400 mr-2">Filter +</span>
              <Link
                href="/shop"
                className="px-3.5 py-1.5 rounded-full bg-[#5a9e2f] text-white font-black text-[11px] shadow-xs"
              >
                All Products
              </Link>
              <Link
                href="/shop?age=0-3%20Years"
                className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:border-[#5a9e2f] hover:text-[#5a9e2f] text-[11px] transition-colors"
              >
                0-3 Y
              </Link>
              <Link
                href="/shop?age=3-5%20Years"
                className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:border-[#5a9e2f] hover:text-[#5a9e2f] text-[11px] transition-colors"
              >
                3-5 Y
              </Link>
              <Link
                href="/shop?age=6-8%20Years"
                className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:border-[#5a9e2f] hover:text-[#5a9e2f] text-[11px] transition-colors"
              >
                6-8 Y
              </Link>
              <Link
                href="/shop?age=8%2B%20Years"
                className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:border-[#5a9e2f] hover:text-[#5a9e2f] text-[11px] transition-colors"
              >
                8+ Y
              </Link>
            </div>

            <Link
              href="/shop"
              className="text-[#5a9e2f] font-bold hover:underline flex items-center gap-1 self-end sm:self-auto"
            >
              <span>Explore Complete Catalog ({catalogProducts.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Catalog Products Showcase */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
          {catalogProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} variant="light" />
          ))}
        </div>
      </section>

      {/* 5. "(HAVE FUN EXPLORING) Yeah! Curated Picks" COORDINATE GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-[#5a9e2f] font-bold block">
            (HAVE FUN EXPLORING)
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Yeah! Top Discoveries
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-mono">
            Hover & tap each discovery coordinate to explore child-safe favorites.
          </p>
        </div>

        {/* 8-Item Coordinate Grid with Bright Editorial aesthetic */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border border-slate-200 p-4 sm:p-6 bg-white rounded-3xl relative shadow-xs">

          <span className="absolute top-3 left-3 font-mono text-xs text-slate-300 select-none">+</span>
          <span className="absolute top-3 right-3 font-mono text-xs text-slate-300 select-none">+</span>
          <span className="absolute bottom-3 left-3 font-mono text-xs text-slate-300 select-none">+</span>
          <span className="absolute bottom-3 right-3 font-mono text-xs text-slate-300 select-none">+</span>

          {curatedCoordinates.map((item) => (
            <Link
              key={item.num}
              href={item.href}
              className="group p-4 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-[#5a9e2f] hover:bg-white hover:shadow-md transition-all flex flex-col justify-between items-center text-center relative overflow-hidden"
            >
              <div className="w-full flex items-center justify-between font-mono text-[10px] text-slate-500">
                <span className="font-black text-[#5a9e2f]">({item.num})</span>
                <span className="text-slate-400">{item.age}</span>
              </div>

              <div className="relative w-28 h-28 my-3 rounded-xl overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="w-full pt-2 border-t border-slate-100">
                <h4 className="font-mono text-xs font-bold text-slate-800 group-hover:text-[#5a9e2f] transition-colors truncate">
                  {item.name}
                </h4>
                <span className="font-mono text-xs font-black text-[#5a9e2f] block mt-0.5">
                  {item.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. CORE MANIFESTO 4-PILLAR GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-b border-slate-200">
        <div className="text-center mb-10 space-y-2">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#5a9e2f] font-bold">
            + [ CORE STANDARDS ]
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Made for curious minds.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <Link
            href="/shop?purpose=LEARN"
            className="p-6 space-y-3 rounded-2xl bg-white border border-slate-200 hover:border-[#5a9e2f] hover:shadow-md transition-all group block"
          >
            <span className="font-mono text-[10px] text-slate-400 block font-bold">(01)</span>
            <div className="w-12 h-12 rounded-full bg-[#5a9e2f]/10 border border-[#5a9e2f]/30 text-[#5a9e2f] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-xs">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-900 text-sm group-hover:text-[#5a9e2f] transition-colors">
              Learn through play
            </h3>
            <span className="font-mono text-[11px] text-[#5a9e2f] flex items-center justify-center gap-1 group-hover:underline">
              <span>View STEM & Logic</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <Link
            href={`/shop?purpose=${encodeURIComponent('BUILD HABITS')}`}
            className="p-6 space-y-3 rounded-2xl bg-white border border-slate-200 hover:border-[#5a9e2f] hover:shadow-md transition-all group block"
          >
            <span className="font-mono text-[10px] text-slate-400 block font-bold">(02)</span>
            <div className="w-12 h-12 rounded-full bg-[#5a9e2f]/10 border border-[#5a9e2f]/30 text-[#5a9e2f] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-xs">
              <Smile className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-900 text-sm group-hover:text-[#5a9e2f] transition-colors">
              Build better habits
            </h3>
            <span className="font-mono text-[11px] text-[#5a9e2f] flex items-center justify-center gap-1 group-hover:underline">
              <span>Trackers & Planners</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <Link
            href="/shop?purpose=CREATE"
            className="p-6 space-y-3 rounded-2xl bg-white border border-slate-200 hover:border-[#5a9e2f] hover:shadow-md transition-all group block"
          >
            <span className="font-mono text-[10px] text-slate-400 block font-bold">(03)</span>
            <div className="w-12 h-12 rounded-full bg-[#5a9e2f]/10 border border-[#5a9e2f]/30 text-[#5a9e2f] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-900 text-sm group-hover:text-[#5a9e2f] transition-colors">
              Explore creativity
            </h3>
            <span className="font-mono text-[11px] text-[#5a9e2f] flex items-center justify-center gap-1 group-hover:underline">
              <span>Art & Puzzles</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <Link
            href="/shop?purpose=PLAY"
            className="p-6 space-y-3 rounded-2xl bg-white border border-slate-200 hover:border-[#5a9e2f] hover:shadow-md transition-all group block"
          >
            <span className="font-mono text-[10px] text-slate-400 block font-bold">(04)</span>
            <div className="w-12 h-12 rounded-full bg-[#5a9e2f]/10 border border-[#5a9e2f]/30 text-[#5a9e2f] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-xs">
              <MonitorOff className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-900 text-sm group-hover:text-[#5a9e2f] transition-colors">
              Screen-free fun
            </h3>
            <span className="font-mono text-[11px] text-[#5a9e2f] flex items-center justify-center gap-1 group-hover:underline">
              <span>Active Play</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

      {/* 7. FINAL HEROIC CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-[#18392b] via-[#0d2218] to-[#08150f] text-white shadow-xl relative overflow-hidden border border-[#5a9e2f]/40">
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#5a9e2f]/25 rounded-full blur-3xl pointer-events-none" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#72bf44] font-black block mb-3">
            + [ FIND SMART PLAY ]
          </span>
          <h3 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
            More than toys.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#84d94b] to-[#5a9e2f]">
              Little tools for growing minds.
            </span>
          </h3>
          <p className="mt-4 text-sm text-slate-300 max-w-lg mx-auto font-mono">
            Join thousands of parents choosing screen-free discovery across India.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 py-4 px-10 rounded-full bg-[#5a9e2f] hover:bg-[#488224] text-white font-mono text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(90,158,47,0.5)] hover:scale-105"
            >
              <span>Explore Complete Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

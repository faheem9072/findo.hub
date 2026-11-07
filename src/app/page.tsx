import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Star, Lightbulb, Smile, MonitorOff, ShieldCheck, Heart } from 'lucide-react';
import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Live real-time updates for newly added/edited products

async function getHomePageData() {
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
    featuredProducts: featuredProducts.length >= 4 ? featuredProducts : allProducts.slice(0, 8),
    catalogProducts: allProducts,
  };
}

export default async function HomePage() {
  const { featuredProducts, catalogProducts } = await getHomePageData();

  const milestones = [
    { num: '01', range: '0–3 Y', label: 'Sensory & Toddler', href: '/shop?age=0-3%20Years' },
    { num: '02', range: '3–5 Y', label: 'Preschool & Routine', href: '/shop?age=3-5%20Years' },
    { num: '03', range: '6–8 Y', label: 'Logic & Explorers', href: '/shop?age=6-8%20Years' },
    { num: '04', range: '8+ Y', label: 'STEM & Science Labs', href: '/shop?age=8%2B%20Years' },
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

  const ageGroups = [
    {
      age: '0-3 Years',
      stage: 'Toddlers & Sensory',
      description: 'Tactile shapes, sensory sorters & early motor skill essentials.',
      icon: '👶',
    },
    {
      age: '3-5 Years',
      stage: 'Preschool & Routine',
      description: 'Habit trackers, drawing pads, magnetic boards & basic logic.',
      icon: '🎨',
    },
    {
      age: '6-8 Years',
      stage: 'Growing Explorers',
      description: 'Tower stacking, construction sets, creative art & word builders.',
      icon: '🧩',
    },
    {
      age: '8+ Years',
      stage: 'STEM & Science Labs',
      description: 'Robotics, solar kits, chemistry & crystal labs, advanced puzzles.',
      icon: '🔬',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-[#fafbf8] text-[#0d1b1e]">

      {/* SECTION 1 — VORS EDITORIAL HERO WITH ANIMATED/DYNAMIC BRAND NAME */}
      <section className="relative pt-6 sm:pt-10 border-b border-[#0d1b1e]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Micro-Manifesto & Milestone List (VORS Header Style) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-8 border-b border-[#0d1b1e]/10 items-start">
            
            {/* Left Manifesto */}
            <div className="md:col-span-5 space-y-2 text-xs text-slate-600">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#5a9e2f] block font-bold">
                + [ ONLINE STORE / EST. 2026 ]
              </span>
              <p className="leading-relaxed font-medium max-w-sm">
                The wonder of childhood. Screen-free toys and developmental essentials crafted with thoughtful care. Let curiosity lead the way.
              </p>
            </div>

            {/* Middle Crosshair / Coordinates */}
            <div className="hidden md:flex md:col-span-2 justify-center pt-1 text-slate-300 font-mono text-sm select-none">
              +&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;+
            </div>

            {/* Right Milestone Directory */}
            <div className="md:col-span-5 flex flex-col justify-end items-start md:items-end space-y-1 font-mono text-[11px] uppercase tracking-wider text-slate-500">
              {milestones.map((m) => (
                <Link
                  key={m.num}
                  href={m.href}
                  className="hover:text-[#5a9e2f] transition-colors flex items-center gap-2 group"
                >
                  <span className="text-slate-400 group-hover:text-[#5a9e2f]">({m.num})</span>
                  <span className="font-bold text-[#0d1b1e] group-hover:text-[#5a9e2f]">{m.range}</span>
                  <span className="text-slate-500 group-hover:underline">{m.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Centerpiece — GIANT DYNAMIC BRAND NAME [ F I N D O ] WITH SQUIRREL MASCOT & FLOATING ESSENTIALS */}
          <div className="relative py-12 sm:py-20 lg:py-24 select-none">
            
            {/* Editorial Corner Crosshairs */}
            <span className="absolute top-4 left-0 font-mono text-xs text-slate-300 select-none">+</span>
            <span className="absolute top-4 right-0 font-mono text-xs text-slate-300 select-none">+</span>
            <span className="absolute bottom-4 left-0 font-mono text-xs text-slate-300 select-none">+</span>
            <span className="absolute bottom-4 right-0 font-mono text-xs text-slate-300 select-none">+</span>

            {/* Left Floating Badge Sticker */}
            <div className="hidden sm:flex absolute left-4 lg:left-12 top-6 animate-float z-20">
              <div className="px-3.5 py-1.5 rounded-full bg-white border border-[#0d1b1e]/15 shadow-sm text-[11px] font-mono uppercase tracking-wider text-[#0d1b1e] flex items-center gap-1.5 backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-[#5a9e2f] animate-ping" />
                <span>100% Screen-Free</span>
              </div>
            </div>

            {/* Right Floating Badge Sticker */}
            <div className="hidden sm:flex absolute right-4 lg:right-12 bottom-8 animate-float-reverse z-20">
              <div className="px-3.5 py-1.5 rounded-full bg-[#eef8ea] border border-[#5a9e2f]/30 shadow-sm text-[11px] font-mono uppercase tracking-wider text-[#488224] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#5a9e2f]" />
                <span className="font-bold">Find Smart Play</span>
              </div>
            </div>

            {/* Giant Moving / Kinetic Brand Title: [ F I N D O ] */}
            <div className="text-center relative">
              <h1 className="text-7xl sm:text-9xl md:text-[11rem] lg:text-[14rem] font-black tracking-tighter leading-none text-[#0d1b1e] flex items-center justify-center gap-1 sm:gap-2">
                <span className="text-slate-300 font-light select-none">[</span>
                <span className="animate-letter-1 inline-block hover:text-[#5a9e2f] hover:-translate-y-2 transition-all cursor-pointer">
                  F
                </span>
                <span className="animate-letter-2 inline-block hover:text-[#5a9e2f] hover:-translate-y-2 transition-all cursor-pointer">
                  I
                </span>
                <span className="animate-letter-3 inline-block hover:text-[#5a9e2f] hover:-translate-y-2 transition-all cursor-pointer">
                  N
                </span>
                <span className="animate-letter-4 inline-block hover:text-[#5a9e2f] hover:-translate-y-2 transition-all cursor-pointer">
                  D
                </span>
                <span className="animate-letter-5 inline-block text-[#5a9e2f] hover:scale-105 transition-all cursor-pointer relative">
                  O
                  {/* Floating Mascot peeking out of the "O" */}
                  <span className="absolute -top-6 sm:-top-10 md:-top-16 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 pointer-events-none animate-float">
                    <Image
                      src="/logo.png"
                      alt="Findo Mascot"
                      fill
                      className="object-contain drop-shadow-md"
                    />
                  </span>
                </span>
                <span className="text-slate-300 font-light select-none">]</span>
              </h1>

              {/* Sub-Tagline Underneath the Big Letters */}
              <p className="mt-4 sm:mt-6 font-mono text-xs sm:text-sm uppercase tracking-widest text-slate-500 font-semibold">
                FINDO • FIND SMART PLAY • ESSENTIALS FOR CURIOUS MINDS
              </p>
            </div>

            {/* Hero Quick Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                className="py-3.5 px-8 rounded-full bg-[#0d1b1e] hover:bg-[#5a9e2f] text-white font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center gap-2 group"
              >
                <span>Shop Catalog</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#catalog-section"
                className="py-3.5 px-8 rounded-full bg-white hover:bg-slate-50 text-[#0d1b1e] font-mono text-xs font-bold uppercase tracking-widest border border-[#0d1b1e]/20 transition-all flex items-center gap-2"
              >
                <span>Explore Milestones</span>
              </Link>
            </div>

          </div>
        </div>

        {/* CONTINUOUS KINETIC MARQUEE RIBBON (VORS STYLE) */}
        <div className="w-full bg-[#0d1b1e] text-[#fafbf8] py-3 overflow-hidden border-t border-[#0d1b1e]">
          <div className="animate-marquee font-mono text-xs font-bold uppercase tracking-widest whitespace-nowrap">
            <span className="mx-6 text-[#5a9e2f]">✦</span>
            <span>FIND SMART PLAY</span>
            <span className="mx-6 text-[#5a9e2f]">✦</span>
            <span>100% SCREEN-FREE ESSENTIALS</span>
            <span className="mx-6 text-[#5a9e2f]">✦</span>
            <span>CURATED FOR CURIOUS MINDS</span>
            <span className="mx-6 text-[#5a9e2f]">✦</span>
            <span>AGES 0 TO 8+ YEARS</span>
            <span className="mx-6 text-[#5a9e2f]">✦</span>
            <span>MONTESSORI PUZZLES & STEM LABS</span>
            <span className="mx-6 text-[#5a9e2f]">✦</span>
            <span>CASH ON DELIVERY AVAILABLE</span>
            <span className="mx-6 text-[#5a9e2f]">✦</span>
            <span>DELIVERING ACROSS INDIA</span>
            <span className="mx-6 text-[#5a9e2f]">✦</span>
            <span>FIND SMART PLAY</span>
            <span className="mx-6 text-[#5a9e2f]">✦</span>
            <span>100% SCREEN-FREE ESSENTIALS</span>
            <span className="mx-6 text-[#5a9e2f]">✦</span>
            <span>CURATED FOR CURIOUS MINDS</span>
            <span className="mx-6 text-[#5a9e2f]">✦</span>
            <span>AGES 0 TO 8+ YEARS</span>
            <span className="mx-6 text-[#5a9e2f]">✦</span>
            <span>MONTESSORI PUZZLES & STEM LABS</span>
            <span className="mx-6 text-[#5a9e2f]">✦</span>
            <span>CASH ON DELIVERY AVAILABLE</span>
          </div>
        </div>
      </section>

      {/* SECTION 2 — VORS EDITORIAL "ABOUT" SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column — Tag & Coordinate */}
          <div className="lg:col-span-4 space-y-3 font-mono">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5a9e2f] bg-[#eef8ea] px-3 py-1 rounded-full border border-[#5a9e2f]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ABOUT FINDO</span>
            </div>
            <p className="text-[11px] text-slate-400 uppercase tracking-widest">
              + [ BRAND PHILOSOPHY / 2026 ]
            </p>
          </div>

          {/* Right Column — Large Editorial Statement */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl sm:text-4xl font-black text-[#0d1b1e] tracking-tight leading-snug">
              We are more than a store — we are an arena for curious young minds.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              At Findo, we curate screen-free essentials matched specifically to developmental milestones. Every Findo product is not merely a toy — it is a spark that brings imagination, focus, and joy to your home.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 font-mono text-[11px] uppercase tracking-wider text-slate-600">
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md">[ 100% SCREEN-FREE ]</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md">[ CHILD-SAFE MATERIALS ]</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md">[ MILESTONE-TESTED ]</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md">[ COD AVAILABLE ]</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3 — VORS "NEW COLLECTION" (FEATURED ARRIVALS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#0d1b1e]/10">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-[#0d1b1e]">
              New Collection
            </h2>
            <span className="font-mono text-xs text-slate-400 hidden sm:inline">
              (Handmade & Curated Essentials)
            </span>
          </div>
          <Link
            href="/shop"
            className="font-mono text-xs font-bold uppercase tracking-wider text-[#5a9e2f] hover:underline flex items-center gap-1 group"
          >
            <span>See all</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Column Product Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION 4 — ICONIC VORS LETTER-INTEGRATED "C A [product] A L [product] O G" SECTION */}
      <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Giant VORS CATALOG Header with Real Integrated Product Cutouts */}
        <div className="text-center py-6 sm:py-10 border-t border-b border-[#0d1b1e]/10 select-none">
          <div className="flex items-center justify-center gap-1 sm:gap-3 text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tighter text-[#0d1b1e] leading-none">
            <span>C</span>
            <span>A</span>
            {/* Integrated Circular Product Visual 1 */}
            <div className="relative w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden border-2 sm:border-4 border-[#5a9e2f] shadow-lg bg-white shrink-0 mx-1 animate-pulse-subtle">
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
            <div className="relative w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden border-2 sm:border-4 border-[#0d1b1e] shadow-lg bg-white shrink-0 mx-1 animate-pulse-subtle">
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

          {/* VORS Sub-Nav: Filter + & Sort by */}
          <div className="mt-8 pt-6 border-t border-[#0d1b1e]/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none w-full sm:w-auto pb-1">
              <span className="font-bold text-slate-400 mr-2">Filter +</span>
              <Link
                href="/shop"
                className="px-3 py-1.5 rounded-full bg-[#0d1b1e] text-white font-bold text-[11px]"
              >
                All Products
              </Link>
              <Link
                href="/shop?age=0-3%20Years"
                className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#5a9e2f] text-[11px]"
              >
                0-3 Y
              </Link>
              <Link
                href="/shop?age=3-5%20Years"
                className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#5a9e2f] text-[11px]"
              >
                3-5 Y
              </Link>
              <Link
                href="/shop?age=6-8%20Years"
                className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#5a9e2f] text-[11px]"
              >
                6-8 Y
              </Link>
              <Link
                href="/shop?age=8%2B%20Years"
                className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#5a9e2f] text-[11px]"
              >
                8+ Y
              </Link>
            </div>

            <Link
              href="/shop"
              className="text-[#5a9e2f] font-bold hover:underline flex items-center gap-1 self-end sm:self-auto"
            >
              <span>Explore All Products ({catalogProducts.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Catalog Products Showcase */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
          {catalogProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION 5 — VORS "(HAVE FUN EXPLORING) Yeah! Curated Picks" COORDINATE GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-2 mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-[#5a9e2f] font-bold block">
            (HAVE FUN EXPLORING)
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0d1b1e] tracking-tight">
            Yeah! Top Discoveries
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-mono">
            Hover & tap each discovery coordinate to explore child-safe favorites.
          </p>
        </div>

        {/* VORS Coordinate Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border border-[#0d1b1e]/15 p-4 sm:p-6 bg-white rounded-3xl relative shadow-xs">
          
          {/* Subtle Grid Crosshairs in Background */}
          <span className="absolute top-3 left-3 font-mono text-xs text-slate-300 select-none">+</span>
          <span className="absolute top-3 right-3 font-mono text-xs text-slate-300 select-none">+</span>
          <span className="absolute bottom-3 left-3 font-mono text-xs text-slate-300 select-none">+</span>
          <span className="absolute bottom-3 right-3 font-mono text-xs text-slate-300 select-none">+</span>

          {curatedCoordinates.map((item) => (
            <Link
              key={item.num}
              href={item.href}
              className="group p-4 rounded-2xl bg-[#fafbf8] border border-slate-200/80 hover:border-[#5a9e2f] hover:bg-white hover:shadow-md transition-all flex flex-col justify-between items-center text-center relative overflow-hidden"
            >
              <div className="w-full flex items-center justify-between font-mono text-[10px] text-slate-400">
                <span className="font-bold text-[#5a9e2f]">({item.num})</span>
                <span>{item.age}</span>
              </div>

              <div className="relative w-28 h-28 my-3 rounded-xl overflow-hidden group-hover:scale-108 transition-transform duration-300">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="w-full pt-2 border-t border-slate-100">
                <h4 className="font-mono text-xs font-bold text-[#0d1b1e] group-hover:text-[#5a9e2f] transition-colors truncate">
                  {item.name}
                </h4>
                <span className="font-mono text-xs font-extrabold text-[#5a9e2f] block mt-0.5">
                  {item.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 6 — SHOP BY CHILD'S AGE (EDITORIAL TILES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#0d1b1e]/10 gap-2">
          <div>
            <span className="font-mono text-[10px] font-bold text-[#5a9e2f] uppercase tracking-widest bg-[#eef8ea] px-3.5 py-1 rounded-full inline-block mb-2">
              Age-Wise Discovery
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0d1b1e] tracking-tight">
              Shop by Child&apos;s Age
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-mono">
              Curated screen-free essentials matched specifically to developmental milestones.
            </p>
          </div>
          <Link
            href="/shop"
            className="font-mono text-xs font-bold uppercase tracking-wider text-[#5a9e2f] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Explore All Ages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {ageGroups.map((group) => (
            <Link
              key={group.age}
              href={`/shop?age=${encodeURIComponent(group.age)}`}
              className="group p-5 sm:p-6 rounded-2xl bg-white border border-[#0d1b1e]/15 hover:border-[#5a9e2f] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center font-bold text-2xl group-hover:scale-110 transition-transform">
                  {group.icon}
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-[#5a9e2f] uppercase tracking-wider">
                    {group.stage}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-[#0d1b1e] group-hover:text-[#5a9e2f] transition-colors mt-0.5">
                    {group.age}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                    {group.description}
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between font-mono text-xs font-bold text-[#5a9e2f]">
                <span>View Products</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 7 — WHY FINDO (VORS 4-COLUMN MANIFESTO GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-b border-[#0d1b1e]/10">
        <div className="text-center mb-10 space-y-2">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#5a9e2f] font-bold">
            + [ CORE STANDARDS ]
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0d1b1e]">
            Made for curious minds.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <Link
            href="/shop?purpose=LEARN"
            className="p-5 space-y-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#5a9e2f] hover:shadow-xs transition-all group block"
          >
            <span className="font-mono text-[10px] text-slate-400 block font-bold">(01)</span>
            <div className="w-10 h-10 rounded-full bg-[#5a9e2f]/10 text-[#5a9e2f] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-[#0d1b1e] text-sm group-hover:text-[#5a9e2f] transition-colors">
              Learn through play
            </h3>
            <span className="font-mono text-[11px] text-[#5a9e2f] flex items-center justify-center gap-1 group-hover:underline">
              <span>View STEM & Logic</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <Link
            href={`/shop?purpose=${encodeURIComponent('BUILD HABITS')}`}
            className="p-5 space-y-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#5a9e2f] hover:shadow-xs transition-all group block"
          >
            <span className="font-mono text-[10px] text-slate-400 block font-bold">(02)</span>
            <div className="w-10 h-10 rounded-full bg-[#5a9e2f]/10 text-[#5a9e2f] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Smile className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-[#0d1b1e] text-sm group-hover:text-[#5a9e2f] transition-colors">
              Build better habits
            </h3>
            <span className="font-mono text-[11px] text-[#5a9e2f] flex items-center justify-center gap-1 group-hover:underline">
              <span>Trackers & Planners</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <Link
            href="/shop?purpose=CREATE"
            className="p-5 space-y-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#5a9e2f] hover:shadow-xs transition-all group block"
          >
            <span className="font-mono text-[10px] text-slate-400 block font-bold">(03)</span>
            <div className="w-10 h-10 rounded-full bg-[#5a9e2f]/10 text-[#5a9e2f] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-[#0d1b1e] text-sm group-hover:text-[#5a9e2f] transition-colors">
              Explore creativity
            </h3>
            <span className="font-mono text-[11px] text-[#5a9e2f] flex items-center justify-center gap-1 group-hover:underline">
              <span>Art & Puzzles</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <Link
            href="/shop?purpose=PLAY"
            className="p-5 space-y-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#5a9e2f] hover:shadow-xs transition-all group block"
          >
            <span className="font-mono text-[10px] text-slate-400 block font-bold">(04)</span>
            <div className="w-10 h-10 rounded-full bg-[#5a9e2f]/10 text-[#5a9e2f] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <MonitorOff className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-[#0d1b1e] text-sm group-hover:text-[#5a9e2f] transition-colors">
              Screen-free fun
            </h3>
            <span className="font-mono text-[11px] text-[#5a9e2f] flex items-center justify-center gap-1 group-hover:underline">
              <span>Active Play</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

      {/* SECTION 8 — FINAL STATEMENT BANNER */}
      <section className="max-w-5xl mx-auto px-4 text-center py-6">
        <div className="p-10 sm:p-14 rounded-3xl bg-[#0d1b1e] text-white shadow-xl relative overflow-hidden border border-[#0d1b1e]">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#5a9e2f]/20 rounded-full blur-2xl pointer-events-none" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#5a9e2f] font-bold block mb-3">
            + [ FIND SMART PLAY ]
          </span>
          <h3 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
            More than toys.<br />
            <span className="text-[#5a9e2f]">Little tools for growing minds.</span>
          </h3>
          <p className="mt-4 text-sm text-slate-300 max-w-lg mx-auto font-mono">
            Explore our curated catalog of habit trackers, puzzles, and science kits.
          </p>
          <div className="mt-8">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 py-4 px-10 rounded-full bg-[#5a9e2f] hover:bg-[#488224] text-white font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-md"
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

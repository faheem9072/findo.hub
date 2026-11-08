'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface AgeCategory {
  id: string;
  age: string;
  title: string;
  desc: string;
  icon: string;
  bgGradient: string;
  ribbonColor: string;
  img: string;
  href: string;
}

const AGE_CATEGORIES: AgeCategory[] = [
  {
    id: '0-18m',
    age: '0-18 MONTHS',
    title: 'Sensory & Discovery',
    desc: 'Tactile shapes, soft sorters & motor skills',
    icon: '👶',
    bgGradient: 'from-amber-100 via-orange-50 to-amber-200/60',
    ribbonColor: 'bg-rose-700',
    img: '/images/tangram-woodiness.jpg',
    href: '/shop?age=0-3%20Years',
  },
  {
    id: '18-36m',
    age: '18-36 MONTHS',
    title: 'Toddlers & Montessori',
    desc: 'Chunky blocks, stacking & early logic',
    icon: '🧸',
    bgGradient: 'from-pink-100 via-rose-50 to-pink-200/60',
    ribbonColor: 'bg-rose-800',
    img: '/images/tetra-tower.jpg',
    href: '/shop?age=0-3%20Years',
  },
  {
    id: '3-5y',
    age: '3-5 YEARS',
    title: 'Preschool & Habits',
    desc: 'Daily routine boards & morning trackers',
    icon: '🎨',
    bgGradient: 'from-emerald-100 via-teal-50 to-emerald-200/60',
    ribbonColor: 'bg-emerald-800',
    img: '/images/habit-tracker.jpg',
    href: '/shop?age=3-5%20Years',
  },
  {
    id: '5-7y',
    age: '5-7 YEARS',
    title: 'Active & Building',
    desc: 'Magnetic tiles, balance games & puzzles',
    icon: '🧩',
    bgGradient: 'from-sky-100 via-blue-50 to-sky-200/60',
    ribbonColor: 'bg-blue-800',
    img: '/images/magna-play-magnets.jpg',
    href: '/shop?age=6-8%20Years',
  },
  {
    id: '7-9y',
    age: '7-9 YEARS',
    title: 'Creative Art & Photo',
    desc: 'DIY instant print thermal cameras & art',
    icon: '📷',
    bgGradient: 'from-purple-100 via-violet-50 to-purple-200/60',
    ribbonColor: 'bg-purple-800',
    img: '/images/instant-print-camera.jpg',
    href: '/shop?age=6-8%20Years',
  },
  {
    id: '9-12y',
    age: '9-12 YEARS',
    title: 'STEM Science Labs',
    desc: 'Solar system models & super chemistry sets',
    icon: '🔬',
    bgGradient: 'from-cyan-100 via-teal-50 to-cyan-200/60',
    ribbonColor: 'bg-cyan-900',
    img: '/images/super-chemistry-lab.jpg',
    href: '/shop?age=8%2B%20Years',
  },
  {
    id: '12plus',
    age: '12+ YEARS',
    title: 'Advanced Optics & STEM',
    desc: '450X optical microscopes & complex kits',
    icon: '🚀',
    bgGradient: 'from-indigo-100 via-blue-50 to-indigo-200/60',
    ribbonColor: 'bg-indigo-900',
    img: '/images/educational-microscope.jpg',
    href: '/shop?age=8%2B%20Years',
  },
];

export default function ShopByAgeSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header matching Image 1: "SHOP BY AGE" */}
      <div className="text-center space-y-1 mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
          SHOP BY AGE
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Thoughtfully curated essentials matched to each developmental stage
        </p>
      </div>

      {/* Relative Carousel Container with Left/Right Arrows */}
      <div className="relative group">
        
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll Left"
          className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:scale-110 transition-all opacity-90 hover:opacity-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scrollable Horizontal Track */}
        <div
          ref={scrollRef}
          className="flex items-center gap-4 overflow-x-auto scrollbar-none py-2 px-1 scroll-smooth"
        >
          {AGE_CATEGORIES.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="shrink-0 w-38 sm:w-44 group/card flex flex-col items-center text-center rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-[#5a9e2f] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Ribbon Header Tag (Matching Image 1: Maroon/Dark Ribbon banner with age) */}
              <div className={`w-full py-1 text-center ${item.ribbonColor} text-white shadow-xs`}>
                <span className="font-mono text-[10px] sm:text-xs font-black tracking-wider uppercase block">
                  {item.age}
                </span>
              </div>

              {/* Card Body with Warm Gradient & Product/Avatar Visual */}
              <div className={`w-full h-36 sm:h-44 bg-gradient-to-b ${item.bgGradient} flex items-center justify-center p-3 relative overflow-hidden`}>
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden drop-shadow-md group-hover/card:scale-110 transition-transform duration-300">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Corner Emoji Pill */}
                <span className="absolute bottom-2 right-2 text-lg bg-white/80 backdrop-blur-xs rounded-full w-7 h-7 flex items-center justify-center shadow-xs">
                  {item.icon}
                </span>
              </div>

              {/* Card Footer: Title & Explore */}
              <div className="p-3 w-full bg-white space-y-0.5 border-t border-slate-100">
                <h3 className="font-black text-xs text-slate-900 group-hover/card:text-[#5a9e2f] transition-colors truncate">
                  {item.title}
                </h3>
                <span className="text-[10px] text-slate-500 font-semibold block truncate">
                  View Kits →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll Right"
          className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:scale-110 transition-all opacity-90 hover:opacity-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>
    </section>
  );
}

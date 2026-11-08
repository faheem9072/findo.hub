'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface SlideData {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  offerText: string;
  desc: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
  accentColor: string;
  productImg: string;
  productName: string;
  mrp: string;
  offerPrice: string;
  discount: string;
  squirrelTag?: string;
}

const SLIDES: SlideData[] = [
  {
    id: 'slide-1',
    badge: '🎉 SPECIAL MEGA OFFER',
    title: 'GLAM UP THE PLAY',
    highlight: 'UP TO 50% OFF*',
    offerText: 'ON SCREEN-FREE MONTESSORI & SENSORY TOYS',
    desc: 'Tactile wooden puzzles, shape sorters & cognitive essentials starting from just ₹219.',
    ctaText: 'SHOP NOW',
    ctaLink: '/shop?category=montessori-sensory',
    bgGradient: 'from-[#fff5eb] via-[#fed7aa]/50 to-[#ffedd5]',
    accentColor: '#ea580c',
    productImg: '/images/tangram-woodiness.jpg',
    productName: 'Montessori Geometric Puzzle',
    mrp: '₹349',
    offerPrice: '₹219',
    discount: '37% OFF',
    squirrelTag: 'Findo Mascot Favorite!',
  },
  {
    id: 'slide-2',
    badge: '✨ PARENTS NO.1 CHOICE',
    title: 'BUILD BETTER HABITS',
    highlight: 'FLAT 40% OFF*',
    offerText: 'ON DAILY ROUTINE TRACKERS & SLIDERS',
    desc: 'Help your children wake up, brush, study, and tidy up with zero screen tantrums.',
    ctaText: 'EXPLORE ROUTINE KITS',
    ctaLink: '/shop?category=preschool-routine',
    bgGradient: 'from-[#f0fdf4] via-[#bbf7d0]/40 to-[#dcfce7]',
    accentColor: '#16a34a',
    productImg: '/images/habit-tracker.jpg',
    productName: 'Daily Routine Habit Tracker',
    mrp: '₹399',
    offerPrice: '₹229',
    discount: '42% OFF',
    squirrelTag: 'Best Seller 2026',
  },
  {
    id: 'slide-3',
    badge: '🔬 YOUNG EXPLORERS SPECIAL',
    title: 'SPARK BIG IDEAS',
    highlight: 'UP TO 45% OFF*',
    offerText: 'ON STEM EXPERIMENTS & INSTANT CAMERAS',
    desc: 'Instant print zero-ink cameras, 450X microscopes and safe chemistry labs.',
    ctaText: 'DISCOVER STEM TOYS',
    ctaLink: '/shop?category=stem-educational',
    bgGradient: 'from-[#eff6ff] via-[#bfdbfe]/40 to-[#dbeafe]',
    accentColor: '#0284c7',
    productImg: '/images/instant-print-camera.jpg',
    productName: 'DIY Instant Print Kids Camera',
    mrp: '₹1,999',
    offerPrice: '₹1,319',
    discount: '34% OFF',
    squirrelTag: 'Hot New Arrival!',
  },
];

export default function HeroHamleysSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto slide every 5 seconds unless user hovers
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <div
      className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Hamleys Style Main Banner Frame */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 min-h-[460px] sm:min-h-[500px] md:min-h-[520px]">
        
        {SLIDES.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              } bg-gradient-to-br ${slide.bgGradient} flex flex-col justify-center`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 items-center h-full p-6 sm:p-10 lg:p-14 gap-6">
                
                {/* Left Text & Offer Copy (Hamleys Typography Style) */}
                <div className="md:col-span-7 space-y-3 sm:space-y-4 text-left">
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1 rounded-full shadow-xs border border-white">
                    <Sparkles className="w-3.5 h-3.5" style={{ color: slide.accentColor }} />
                    <span className="font-mono text-xs font-black tracking-wider uppercase" style={{ color: slide.accentColor }}>
                      {slide.badge}
                    </span>
                  </div>

                  {/* Main Promotional Title */}
                  <div className="space-y-1">
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.05]">
                      {slide.title}
                    </h2>
                    
                    {/* Big Bold Offer Callout (Hamleys "UPTO 60% OFF*") */}
                    <div className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight" style={{ color: slide.accentColor }}>
                      {slide.highlight}
                    </div>

                    <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
                      {slide.offerText}
                    </div>
                  </div>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed font-medium">
                    {slide.desc}
                  </p>

                  {/* Price Anchor Tag */}
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-xs text-slate-500 font-bold uppercase">Offer Deal:</span>
                    <span className="text-2xl font-black text-slate-900">{slide.offerPrice}</span>
                    <span className="text-sm text-slate-400 line-through font-semibold">{slide.mrp}</span>
                    <span className="text-xs font-black px-2 py-0.5 rounded-md text-white shadow-xs" style={{ backgroundColor: slide.accentColor }}>
                      {slide.discount}
                    </span>
                  </div>

                  {/* Hamleys Style Big Pill CTA Button */}
                  <div className="pt-2">
                    <Link
                      href={slide.ctaLink}
                      className="inline-flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-7 py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-xl transition-all hover:scale-105 group"
                    >
                      <span>{slide.ctaText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Right Visual Stage: Product Photo + Cute Mascot Buddy */}
                <div className="md:col-span-5 relative flex items-center justify-center">
                  
                  {/* Product Showcase Card with Offer Ring */}
                  <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden bg-white shadow-xl border-4 border-white p-3 group hover:scale-105 transition-transform duration-500">
                    <Image
                      src={slide.productImg}
                      alt={slide.productName}
                      fill
                      priority={idx === 0}
                      className="object-contain p-2"
                    />

                    {/* Offer Tag Badge */}
                    <div className="absolute top-3 left-3 bg-rose-600 text-white font-black text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      <span>{slide.discount}</span>
                    </div>

                    {/* Product Name footer pill */}
                    <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm text-center">
                      <span className="text-xs font-bold text-slate-800 truncate block">
                        {slide.productName}
                      </span>
                    </div>
                  </div>

                  {/* Cute Waving 3D Squirrel Mascot Buddy perched next to the product */}
                  <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-8 w-28 h-28 sm:w-36 sm:h-36 z-20 drop-shadow-[0_15px_15px_rgba(0,0,0,0.35)] animate-float">
                    <Image
                      src="/images/squirrel-buddy.png"
                      alt="Findo Cute 3D Mascot Buddy"
                      fill
                      className="object-contain"
                    />
                    
                    {/* Mascot Speech Bubble Tag */}
                    <div className="absolute -top-3 -right-6 sm:-right-8 bg-white text-slate-800 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md border border-slate-200 whitespace-nowrap hidden sm:block">
                      <span>{slide.squirrelTag || 'Findo Pick!'}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}

        {/* Circular Left Arrow (<) */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center border border-slate-200 transition-all hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Circular Right Arrow (>) */}
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center border border-slate-200 transition-all hover:scale-110"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Bottom Pagination Indicator Dots / Pills */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/25 backdrop-blur-md px-3 py-1.5 rounded-full">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

      </div>

      {/* Sub-Banner Ticker (Like Hamleys: "Thoughtfully Designed | 100% Screen-Free | Safe Materials") */}
      <div className="mt-3 bg-white rounded-xl border border-slate-200/80 px-4 py-2.5 shadow-xs flex flex-wrap items-center justify-around text-center gap-3 text-xs font-bold text-slate-700">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#5a9e2f]" />
          <span>100% Screen-Free Physical Play</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#5a9e2f]">★</span>
          <span>Child-Safe Non-Toxic Materials</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#5a9e2f]">🚚</span>
          <span>Fast Delivery Across India • Flat ₹79</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#5a9e2f]">💬</span>
          <span>WhatsApp Orders: +91 70253 87764</span>
        </div>
      </div>
    </div>
  );
}

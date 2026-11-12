'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface SlideData {
  id: string;
  productSlug: string;
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
}

const SLIDES: SlideData[] = [
  {
    id: 'slide-1',
    productSlug: 'tangram-wooden-puzzle-set',
    badge: '🎉 SPECIAL MEGA OFFER',
    title: 'GLAM UP THE PLAY',
    highlight: 'UP TO 50% OFF*',
    offerText: 'ON SCREEN-FREE MONTESSORI & SENSORY TOYS',
    desc: 'Tactile wooden puzzles, shape sorters & cognitive essentials starting from just ₹219.',
    ctaText: 'SHOP NOW',
    ctaLink: '/shop?category=montessori-sensory',
    bgGradient: 'from-[#fff7ed] via-[#ffedd5] to-[#fed7aa]/60',
    accentColor: '#ea580c',
    productImg: '/images/tangram-woodiness.jpg',
    productName: 'Montessori Geometric Puzzle Set',
    mrp: '₹349',
    offerPrice: '₹319',
    discount: '37% OFF',
  },
  {
    id: 'slide-2',
    productSlug: 'habit-tracker',
    badge: '🔥 TOP SELLING • PARENTS NO.1 CHOICE',
    title: 'BUILD BETTER HABITS',
    highlight: 'FLAT 42% OFF*',
    offerText: 'DAILY ROUTINE CHECKLIST & SLIDERS',
    desc: 'Help your children wake up, brush, study, and tidy up with zero screen tantrums.',
    ctaText: 'BUY HABIT TRACKER',
    ctaLink: '/product/habit-tracker',
    bgGradient: 'from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0]/60',
    accentColor: '#16a34a',
    productImg: '/images/habit-tracker.jpg',
    productName: 'Daily Routine Habit Tracker Board',
    mrp: '₹369',
    offerPrice: '₹349',
    discount: '42% OFF',
  },
  {
    id: 'slide-3',
    productSlug: 'kids-instant-print-digital-camera',
    badge: '🔥 TOP SELLING • HOT ARRIVAL',
    title: 'SPARK BIG IDEAS',
    highlight: 'UP TO 45% OFF*',
    offerText: 'ZERO-INK DIY INSTANT PRINT CAMERA',
    desc: 'Instant thermal printing camera with video, photo effects and zero ink refills.',
    ctaText: 'BUY INSTANT CAMERA',
    ctaLink: '/product/kids-instant-print-digital-camera',
    bgGradient: 'from-[#eff6ff] via-[#dbeafe] to-[#bfdbfe]/60',
    accentColor: '#0284c7',
    productImg: '/images/instant-print-camera.jpg',
    productName: 'Findo DIY Instant Print Kids Camera',
    mrp: '₹1,600',
    offerPrice: '₹1,499',
    discount: '34% OFF',
  },
];

export default function HeroHamleysSlider({ initialProducts = [] }: { initialProducts?: any[] }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [liveProducts, setLiveProducts] = useState<any[]>(initialProducts);
  const touchStartX = useRef<number | null>(null);

  // Sync with initialProducts passed from server/ISR page
  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setLiveProducts(initialProducts);
    }
  }, [initialProducts]);

  const productMap = React.useMemo(() => {
    const map = new Map<string, any>();
    (liveProducts || []).forEach((p) => {
      if (p.slug) map.set(p.slug, p);
    });
    return map;
  }, [liveProducts]);

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

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      // Swiped left -> next
      nextSlide();
    } else if (diff < -50) {
      // Swiped right -> prev
      prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-6 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Hamleys Style Main Banner Frame with Fluid Height for Mobile & Desktop */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 h-[520px] xs:h-[500px] sm:h-[480px] md:h-[490px] lg:h-[520px]">
        
        {SLIDES.map((slide, idx) => {
          const isActive = idx === current;
          const live = productMap.get(slide.productSlug);
          const currentOfferPrice = live ? `₹${live.price}` : slide.offerPrice;
          const currentMrp = live?.compareAtPrice ? `₹${live.compareAtPrice}` : slide.mrp;
          const currentDiscount = live && live.compareAtPrice && live.compareAtPrice > live.price
            ? `${Math.round(((live.compareAtPrice - live.price) / live.compareAtPrice) * 100)}% OFF`
            : slide.discount;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              } bg-gradient-to-br ${slide.bgGradient} flex flex-col justify-between p-4 sm:p-8 lg:p-12`}
            >
              
              {/* ==================== DESKTOP LAYOUT (md and up) ==================== */}
              <div className="hidden md:grid md:grid-cols-12 items-center h-full gap-6">
                
                {/* Left Text & Offer Copy */}
                <div className="md:col-span-7 space-y-3 lg:space-y-4 text-left">
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-xs border border-white">
                    <Sparkles className="w-4 h-4" style={{ color: slide.accentColor }} />
                    <span className="font-heading text-xs font-bold tracking-wider uppercase" style={{ color: slide.accentColor }}>
                      {slide.badge}
                    </span>
                  </div>

                  {/* Main Promotional Title */}
                  <div className="space-y-1">
                    <h2 className="font-heading text-4xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
                      {slide.title}
                    </h2>
                    
                    {/* Big Bold Offer Callout (Hamleys "UPTO 50% OFF*") */}
                    <div className="font-heading text-3xl lg:text-5xl font-black tracking-tight pt-1" style={{ color: slide.accentColor }}>
                      {slide.highlight}
                    </div>

                    <div className="text-xs lg:text-sm font-bold uppercase tracking-wider text-slate-700 pt-0.5">
                      {slide.offerText}
                    </div>
                  </div>

                  {/* Subtitle */}
                  <p className="text-sm text-slate-600 max-w-md leading-relaxed font-medium">
                    {slide.desc}
                  </p>

                  {/* Price Anchor Tag - Dynamically connected to live DB */}
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-xs text-slate-500 font-bold uppercase">Offer Deal:</span>
                    <span className="font-heading text-3xl font-black text-slate-900">{currentOfferPrice}</span>
                    <span className="text-base text-slate-400 line-through font-semibold">{currentMrp}</span>
                    <span className="font-heading text-xs font-bold px-2.5 py-1 rounded-lg text-white shadow-xs" style={{ backgroundColor: slide.accentColor }}>
                      {currentDiscount}
                    </span>
                  </div>

                  {/* Hamleys Style Big Pill CTA Button */}
                  <div className="pt-2">
                    <Link
                      href={slide.ctaLink}
                      className="font-heading inline-flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-xl transition-all hover:scale-105 group"
                    >
                      <span>{slide.ctaText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Right Visual Stage: Clean, Uncluttered Product Card (NO SQUIRREL) */}
                <div className="md:col-span-5 relative flex items-center justify-center">
                  <Link
                    href={slide.ctaLink}
                    className="block relative w-64 h-64 lg:w-80 lg:h-80 rounded-3xl overflow-hidden bg-white shadow-xl border-4 border-white p-3 group hover:scale-105 transition-transform duration-500 cursor-pointer"
                  >
                    <Image
                      src={slide.productImg}
                      alt={slide.productName}
                      fill
                      priority={idx === 0}
                      className="object-contain p-2"
                    />

                    {/* Offer Tag Badge */}
                    <div className="font-heading absolute top-3 left-3 bg-rose-600 text-white font-black text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{currentDiscount}</span>
                    </div>

                    {/* Product Name footer pill */}
                    <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm text-center">
                      <span className="font-heading text-xs font-bold text-slate-800 truncate block">
                        {slide.productName}
                      </span>
                    </div>
                  </Link>
                </div>

              </div>

              {/* ==================== MOBILE LAYOUT (< md) ==================== */}
              {/* Perfectly proportioned for clear reading & big product image with NO cutoffs */}
              <div className="flex md:hidden flex-col justify-between h-full text-center items-center py-1">
                
                {/* 1. Mobile Header & Offer */}
                <Link href={slide.ctaLink} className="space-y-1 w-full px-2 block cursor-pointer">
                  <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-xs border border-white mx-auto">
                    <Sparkles className="w-3 h-3" style={{ color: slide.accentColor }} />
                    <span className="font-heading text-[11px] font-bold tracking-wider uppercase" style={{ color: slide.accentColor }}>
                      {slide.badge}
                    </span>
                  </div>

                  <h2 className="font-heading text-2xl xs:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                    {slide.title}
                  </h2>

                  <div className="font-heading text-2xl xs:text-3xl font-black tracking-tight" style={{ color: slide.accentColor }}>
                    {slide.highlight}
                  </div>

                  <p className="text-[11px] font-semibold text-slate-600 truncate max-w-xs mx-auto">
                    {slide.offerText}
                  </p>
                </Link>

                {/* 2. Mobile Clean Product Card (Fully Visible, High Contrast, Centered, NO SQUIRREL) */}
                <Link
                  href={slide.ctaLink}
                  className="my-2 relative w-48 h-48 xs:w-52 xs:h-52 rounded-2xl overflow-hidden bg-white shadow-md border-3 border-white p-2 block cursor-pointer"
                >
                  <Image
                    src={slide.productImg}
                    alt={slide.productName}
                    fill
                    priority={idx === 0}
                    className="object-contain p-1"
                  />

                  {/* Bright discount badge */}
                  <div className="font-heading absolute top-2 left-2 bg-rose-600 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5" />
                    <span>{currentDiscount}</span>
                  </div>

                  {/* Product Name footer pill */}
                  <div className="absolute bottom-2 inset-x-2 bg-white/95 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-100 shadow-xs">
                    <span className="font-heading text-[11px] font-bold text-slate-800 truncate block">
                      {slide.productName}
                    </span>
                  </div>
                </Link>

                {/* 3. Mobile Price & CTA - Dynamically connected to live DB */}
                <div className="w-full flex flex-col items-center gap-2 pb-5">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[11px] text-slate-500 font-bold uppercase">Deal:</span>
                    <span className="font-heading text-2xl font-black text-slate-900">{currentOfferPrice}</span>
                    <span className="text-xs text-slate-400 line-through font-semibold">{currentMrp}</span>
                    <span className="font-heading text-[10px] font-bold px-2 py-0.5 rounded-md text-white" style={{ backgroundColor: slide.accentColor }}>
                      {currentDiscount}
                    </span>
                  </div>

                  <Link
                    href={slide.ctaLink}
                    className="font-heading inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-7 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

            </div>
          );
        })}

        {/* Circular Left Arrow (<) - Desktop Only to prevent mobile overlap */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="hidden sm:flex absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md items-center justify-center border border-slate-200 transition-all hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Circular Right Arrow (>) - Desktop Only to prevent mobile overlap */}
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="hidden sm:flex absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md items-center justify-center border border-slate-200 transition-all hover:scale-110"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Bottom Pagination Indicator Dots / Pills */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/25 backdrop-blur-md px-3 py-1.5 rounded-full">
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

      {/* Hamleys Style Category Navigation Bar (As shown in Image 3) */}
      <div className="mt-3 bg-white rounded-2xl border border-slate-200/90 py-2.5 px-4 shadow-xs overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-max gap-3 sm:gap-6 text-xs sm:text-sm font-bold text-slate-700 tracking-tight">
          <Link href="/shop" className="hover:text-rose-600 transition-colors whitespace-nowrap">
            📋 Routine & Habit Boards
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="/shop" className="hover:text-rose-600 transition-colors whitespace-nowrap">
            🧩 Montessori Wooden Toys
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="/shop" className="hover:text-rose-600 transition-colors whitespace-nowrap">
            🔬 STEM Science Kits
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="/shop" className="hover:text-rose-600 transition-colors whitespace-nowrap">
            📷 DIY Instant Print Cameras
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="/shop" className="hover:text-rose-600 transition-colors whitespace-nowrap">
            🧱 Magnetic Sticks & Blocks
          </Link>
        </div>
      </div>

      {/* Sub-Banner Ticker: Clean, Rounded, Stylish Hamleys Style */}
      <div className="mt-3 bg-white rounded-2xl border border-slate-200/90 px-4 py-3 shadow-xs flex flex-wrap items-center justify-around text-center gap-3 text-xs font-semibold text-slate-700">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#5a9e2f]" />
          <span>100% Screen-Free Toys</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#5a9e2f]">★</span>
          <span>Child-Safe Materials</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#5a9e2f]">🚚</span>
          <span>Fast Pan-India Express Delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#5a9e2f]">💬</span>
          <span>WhatsApp Orders: +91 70253 87764</span>
        </div>
      </div>
    </div>
  );
}

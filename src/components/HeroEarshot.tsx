'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Volume2, VolumeX, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

interface WorldConfig {
  id: string;
  num: string;
  code: string;
  name: string;
  age: string;
  headline: string;
  subhead: string;
  shortMobileSubhead: string;
  badge: string;
  bgImage: string;
  bgGradient: string;
  accentColor: string;
  accentBg: string;
  thumbnail: string;
  featuredKit: {
    name: string;
    age: string;
    price: string;
    originalPrice?: string;
    image: string;
    slug: string;
    tag: string;
  };
}

const WORLDS: WorldConfig[] = [
  {
    id: 'sensory',
    num: '01',
    code: 'UNIVERSE 01',
    name: 'Sensory Valley',
    age: '0–3 Y',
    headline: 'FIND SMART PLAY',
    subhead: 'Tactile shapes, Montessori geometry, and sensory sorters designed to ignite fine motor skills without screens.',
    shortMobileSubhead: 'Montessori sensory toys for fine motor skills.',
    badge: 'Montessori & Sensory',
    bgImage: '/images/earshot/village-road.jpg',
    bgGradient: 'from-amber-500/20 via-transparent to-emerald-950/40',
    accentColor: '#5a9e2f',
    accentBg: 'bg-[#5a9e2f]',
    thumbnail: '/images/tangram-woodiness.jpg',
    featuredKit: {
      name: 'Montessori Geometric Puzzle',
      age: '0–3 Y',
      price: '₹219',
      originalPrice: '₹349',
      image: '/images/tangram-woodiness.jpg',
      slug: 'montessori-geometric-puzzle',
      tag: 'Fine Motor Essential',
    },
  },
  {
    id: 'routine',
    num: '02',
    code: 'UNIVERSE 02',
    name: 'Routine Village',
    age: '3–5 Y',
    headline: 'BUILD DAILY HABITS',
    subhead: 'Interactive daily routine checklists, morning sliders, and tactile habit builders that make everyday responsibilities fun.',
    shortMobileSubhead: 'Habit slider boards & daily routine kits.',
    badge: 'Habits & Preschool',
    bgImage: '/images/earshot/village-road-alt.jpg',
    bgGradient: 'from-sky-500/20 via-transparent to-indigo-950/40',
    accentColor: '#0284c7',
    accentBg: 'bg-[#0284c7]',
    thumbnail: '/images/habit-tracker.jpg',
    featuredKit: {
      name: 'Daily Routine Habit Tracker',
      age: '3–5 Y',
      price: '₹229',
      originalPrice: '₹399',
      image: '/images/habit-tracker.jpg',
      slug: 'findo-kids-daily-routine-habit-tracker-board',
      tag: 'Best Seller',
    },
  },
  {
    id: 'creative',
    num: '03',
    code: 'UNIVERSE 03',
    name: 'Creative Forest',
    age: '6–8 Y',
    headline: 'UNLEASH IMAGINATION',
    subhead: 'Instant print kids cameras, 3D magnetic building sets, and vibrant Magna Play kits that turn big dreams into reality.',
    shortMobileSubhead: 'Instant print cameras & 3D art creators.',
    badge: 'Creativity & Art',
    bgImage: '/images/earshot/village-road.jpg',
    bgGradient: 'from-violet-500/20 via-transparent to-pink-950/40',
    accentColor: '#8b5cf6',
    accentBg: 'bg-[#8b5cf6]',
    thumbnail: '/images/instant-print-camera.jpg',
    featuredKit: {
      name: 'DIY Instant Print Camera',
      age: '6–8 Y',
      price: '₹1,319',
      originalPrice: '₹1,999',
      image: '/images/instant-print-camera.jpg',
      slug: 'findo-diy-instant-print-camera',
      tag: 'Creative Favorite',
    },
  },
  {
    id: 'science',
    num: '04',
    code: 'UNIVERSE 04',
    name: 'Science Citadel',
    age: '8+ Y',
    headline: 'SPARK BIG IDEAS',
    subhead: 'Real chemical laboratory sets, DIY solar systems, and 450X optical microscopes built for tomorrow’s young inventors.',
    shortMobileSubhead: 'Super chemistry labs & solar robotics.',
    badge: 'STEM & Robotics',
    bgImage: '/images/earshot/village-road-alt.jpg',
    bgGradient: 'from-emerald-500/20 via-transparent to-cyan-950/40',
    accentColor: '#10b981',
    accentBg: 'bg-[#10b981]',
    thumbnail: '/images/super-chemistry-lab.jpg',
    featuredKit: {
      name: 'Super Chemistry Lab Set',
      age: '8+ Y',
      price: '₹975',
      originalPrice: '₹1,499',
      image: '/images/super-chemistry-lab.jpg',
      slug: 'super-chemistry-lab',
      tag: 'STEM Approved',
    },
  },
];

export default function HeroEarshot() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [addedKit, setAddedKit] = useState(false);
  const { cartCount, addToCart, setIsCartOpen } = useCart();
  const audioCtxRef = useRef<AudioContext | null>(null);

  const activeWorld = WORLDS[activeIdx];

  // Auto-cycle through worlds every 6 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % WORLDS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Kid-friendly audio feedback
  const playSoundEffect = (freq = 520) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // Audio not permitted; safely ignore
    }
  };

  const handleSelectWorld = (idx: number) => {
    setActiveIdx(idx);
    playSoundEffect(480 + idx * 80);
  };

  const handleAddFeaturedKit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const kit = activeWorld.featuredKit;
    addToCart(
      {
        id: `hero-${activeWorld.id}`,
        name: kit.name,
        slug: kit.slug,
        price: parseInt(kit.price.replace(/[^\d]/g, ''), 10) || 299,
        compareAtPrice: parseInt(kit.originalPrice?.replace(/[^\d]/g, '') || '0', 10) || null,
        stock: 25,
        images: JSON.stringify([kit.image]),
        ageRange: activeWorld.age,
      },
      1
    );
    setAddedKit(true);
    playSoundEffect(660);
    setTimeout(() => setAddedKit(false), 2000);
  };

  return (
    <div className="relative max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-8 pt-2 sm:pt-4">
      {/* =========================================================================
          HERO STAGE VIEWPORT (Earshot Rounded Running Game Container)
      ========================================================================= */}
      <div
        className="relative min-h-[580px] sm:min-h-[640px] md:min-h-[700px] lg:min-h-[750px] rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/60 select-none flex flex-col justify-between p-3.5 sm:p-8 transition-all"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Scenic Background with crossfade between worlds */}
        {WORLDS.map((world, idx) => {
          const isActive = idx === activeIdx;
          return (
            <div
              key={world.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
              }`}
              style={{ transition: 'opacity 1s ease-in-out, transform 8s ease-out' }}
            >
              <Image
                src={world.bgImage}
                alt={world.name}
                fill
                priority={idx === 0}
                className="object-cover object-bottom"
                sizes="(max-width: 1440px) 100vw, 1440px"
              />
              {/* Subtle Atmospheric Gradient Overlay to enhance white text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/30" />
              <div className={`absolute inset-0 bg-gradient-to-r ${world.bgGradient} opacity-50`} />
            </div>
          );
        })}

        {/* Dynamic Cobblestone Road Speed Streaks (Forward Sprint Effect) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <div className="absolute left-[30%] sm:left-[35%] top-[55%] w-0.5 h-16 bg-white/40 blur-[1px] speed-streak-1" />
          <div className="absolute left-[50%] top-[50%] w-0.5 h-20 bg-amber-200/50 blur-[1px] speed-streak-2" />
          <div className="absolute left-[65%] sm:left-[60%] top-[58%] w-0.5 h-16 bg-white/40 blur-[1px] speed-streak-3" />

          {/* Floating Orange Blossom Petals / Leaves */}
          <div className="absolute left-[20%] top-[30%] w-3 h-3 rounded-full bg-amber-400/70 blur-[1px] animate-wind-leaf-1" />
          <div className="absolute left-[45%] top-[25%] w-2.5 h-2.5 rounded-full bg-orange-300/80 blur-[0.5px] animate-wind-leaf-2" />
          <div className="absolute right-[25%] top-[35%] w-3.5 h-3.5 rounded-full bg-pink-300/70 blur-[1px] animate-wind-leaf-3" />
        </div>

        {/* =========================================================================
            TOP FLOATING CAPSULE BAR (Earshot Nav Bar)
        ========================================================================= */}
        <div className="relative z-30 w-full flex items-center justify-between gap-2 sm:gap-3">
          {/* Brand Mark (Findo Squirrel Badge + Wordmark) */}
          <Link
            href="/"
            className="flex items-center gap-2 bg-white/90 hover:bg-white backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/80 shadow-md transition-transform hover:scale-105"
          >
            <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden bg-white shrink-0">
              <Image src="/logo.png" alt="Findo" fill className="object-contain" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-black text-xs sm:text-base tracking-tight text-slate-900 leading-none">
                FINDO
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#5a9e2f]" />
            </div>
          </Link>

          {/* Centered Capsule Navigation (Desktop) */}
          <div className="hidden md:flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full border border-white/80 shadow-md text-xs font-bold text-slate-700">
            <Link
              href="/"
              className="px-4 py-1.5 rounded-full bg-slate-900 text-white shadow-xs transition-all"
            >
              Home
            </Link>
            {WORLDS.map((w, idx) => (
              <button
                key={w.id}
                onClick={() => handleSelectWorld(idx)}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  idx === activeIdx
                    ? 'bg-[#5a9e2f] text-white shadow-xs'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                {w.age}
              </button>
            ))}
            <Link
              href="/shop"
              className="px-3 py-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
            >
              Catalog
            </Link>
            <Link
              href="/contact"
              className="px-3 py-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Right Action Capsule: Sound Toggle & Bag Cart Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const nextState = !soundEnabled;
                setSoundEnabled(nextState);
                if (nextState) playSoundEffect(580);
              }}
              title={soundEnabled ? 'Mute Adventure SFX' : 'Enable Adventure SFX'}
              className="inline-flex items-center gap-1.5 bg-white/90 hover:bg-white backdrop-blur-md text-slate-800 p-2 sm:px-3 sm:py-2 rounded-full border border-white/80 shadow-md text-xs font-bold transition-all hover:scale-105"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#5a9e2f] animate-pulse" />
                  <span className="hidden sm:inline">SFX On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">SFX Off</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/90 hover:bg-white backdrop-blur-md text-slate-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/80 shadow-md text-xs font-black transition-all hover:scale-105"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#5a9e2f]" />
              <span className="hidden sm:inline">Bag</span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#5a9e2f] text-white text-[10px] font-black leading-none">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            MOBILE-OPTIMIZED UPPER HEADLINE (Centered & Unobstructed above Runner)
        ========================================================================= */}
        <div className="md:hidden relative z-20 text-center pt-2 pb-1 space-y-2">
          {/* Universe Badge */}
          <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md border border-white/90 px-3 py-1 rounded-full shadow-md">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: activeWorld.accentColor }}
            />
            <span className="font-mono text-[10px] font-black uppercase tracking-wider text-slate-900">
              {activeWorld.code} • {activeWorld.badge}
            </span>
          </div>

          {/* Bold Mobile Headline */}
          <h1
            key={`mobile-${activeWorld.id}`}
            className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-none drop-shadow-[0_3px_16px_rgba(0,0,0,0.65)] animate-fade-in"
          >
            {activeWorld.headline}
          </h1>

          {/* Short Mobile Subhead */}
          <p className="text-xs text-slate-100 font-medium max-w-xs mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            {activeWorld.shortMobileSubhead}
          </p>

          {/* Quick CTA on Mobile */}
          <div className="pt-1 flex items-center justify-center gap-2">
            <Link
              href={`/shop?age=${encodeURIComponent(activeWorld.age.replace('–', '-'))}`}
              className="inline-flex items-center gap-1.5 bg-white text-slate-900 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-transform"
            >
              <span>Explore World</span>
              <ArrowRight className="w-3 h-3 text-[#5a9e2f]" />
            </Link>

            <button
              onClick={handleAddFeaturedKit}
              className="inline-flex items-center gap-1.5 bg-black/60 text-white border border-white/40 px-3 py-1.5 rounded-full text-xs font-bold shadow-md hover:scale-105 transition-transform"
            >
              {addedKit ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Kit {activeWorld.featuredKit.price}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* =========================================================================
            RUNNING SQUIRREL MASCOT (4-Frame Animated WebP Runner + Physics)
            On Mobile: Centered in Road Lane (Unobstructed & Huge)
            On Desktop: Over-the-shoulder in Left Lane
        ========================================================================= */}
        <div className="absolute left-1/2 -translate-x-1/2 md:left-[20%] lg:left-[24%] md:translate-x-0 bottom-18 sm:bottom-20 md:bottom-20 lg:bottom-24 z-20 pointer-events-none">
          <div className="relative animate-runner-stride">
            {/* 3D Animated Squirrel Mascot Running Down the Road */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-84 lg:h-84 drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)]">
              <Image
                src="/images/earshot/squirrel-running-loop.webp"
                alt="Findo 3D Squirrel Adventurer Running Forward"
                fill
                priority
                unoptimized
                className="object-contain"
              />
            </div>

            {/* Dynamic Footstep Ground Shadow beneath paws */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-36 sm:w-44 h-6 bg-black/45 rounded-full blur-md animate-runner-shadow" />

            {/* Left and Right Alternating Dust Puffs from Paws */}
            <div className="absolute -bottom-2 left-1/4 w-3.5 h-3.5 rounded-full bg-amber-100/90 blur-[1px] animate-dust-puff-left" />
            <div className="absolute -bottom-2 right-1/4 w-4 h-4 rounded-full bg-amber-200/90 blur-[1px] animate-dust-puff-right" />
          </div>
        </div>

        {/* =========================================================================
            DESKTOP HEADLINE & NARRATIVE OVERLAY (Right-Aligned Bold Typography)
        ========================================================================= */}
        <div className="hidden md:block relative z-20 max-w-xl ml-auto mt-auto mb-20 sm:mb-24 sm:pr-4 text-right space-y-3 sm:space-y-4">
          
          {/* Universe Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md border border-white/90 px-3.5 py-1 rounded-full shadow-lg">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: activeWorld.accentColor }}
            />
            <span className="font-mono text-xs font-black uppercase tracking-widest text-slate-900">
              {activeWorld.code} • {activeWorld.badge}
            </span>
          </div>

          {/* Massive Bold Headline (Earshot "PACK LIGHT" -> "FIND SMART PLAY") */}
          <h1
            key={`desktop-${activeWorld.id}`}
            className="text-5xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] transition-all animate-fade-in"
          >
            {activeWorld.headline}
          </h1>

          {/* Engaging Subhead */}
          <p className="text-sm md:text-base font-medium text-slate-100/95 max-w-md ml-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
            {activeWorld.subhead}
          </p>

          {/* Action Row: "Explore World →" Capsule Button + Kit Button */}
          <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
            <Link
              href={`/shop?age=${encodeURIComponent(activeWorld.age.replace('–', '-'))}`}
              className="inline-flex items-center gap-2.5 bg-white hover:bg-slate-50 text-slate-900 px-6 py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all hover:scale-105 group"
            >
              <span>Explore World</span>
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-white transition-transform group-hover:translate-x-1"
                style={{ backgroundColor: activeWorld.accentColor }}
              >
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            {/* Quick Kit Add Button */}
            <button
              onClick={handleAddFeaturedKit}
              className="inline-flex items-center gap-2 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/30 px-5 py-3 rounded-full text-xs font-bold transition-all hover:scale-105"
            >
              {addedKit ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Added to Bag!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Kit {activeWorld.featuredKit.price}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM WORLD SWITCHER (Earshot 4 Circular Thumbnail Bubbles)
        ========================================================================= */}
        <div className="relative z-30 w-full flex items-center justify-center pt-2">
          <div className="flex items-center gap-2 sm:gap-4 bg-black/45 backdrop-blur-xl p-1.5 sm:p-2.5 rounded-full border border-white/25 shadow-2xl">
            {WORLDS.map((world, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={world.id}
                  onClick={() => handleSelectWorld(idx)}
                  className={`group relative rounded-full transition-all duration-300 flex items-center justify-center ${
                    isActive
                      ? 'scale-110 sm:scale-115 ring-2 ring-white ring-offset-2 ring-offset-black/60 shadow-[0_0_20px_rgba(255,255,255,0.8)]'
                      : 'opacity-75 hover:opacity-100 hover:scale-105'
                  }`}
                  aria-label={`Switch to ${world.name} (${world.age})`}
                >
                  {/* Circular Thumbnail Avatar */}
                  <div className="relative w-9 h-9 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white/80 bg-white shadow-inner">
                    <Image
                      src={world.thumbnail}
                      alt={world.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* World Age Tag Pill (On Active) */}
                  {isActive && (
                    <span className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-slate-900 text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow-md animate-fade-in uppercase tracking-wider">
                      {world.age}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Distance & Milestone Marker (Earshot "2.4M" in bottom-right) */}
        <div className="absolute right-4 sm:right-8 bottom-3 sm:bottom-5 z-20 font-mono text-[9px] sm:text-xs text-white/80 font-bold uppercase tracking-widest hidden sm:block">
          <span>MILESTONES 0–8+ YEARS</span>
        </div>
      </div>
    </div>
  );
}

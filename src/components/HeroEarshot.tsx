'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Volume2, VolumeX, ShoppingBag, Compass, Flame, Check } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

interface WorldConfig {
  id: string;
  num: string;
  code: string;
  name: string;
  age: string;
  headline: string;
  subhead: string;
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
    badge: 'Montessori & Tactile',
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

  // Auto-cycle through worlds every 6 seconds unless user pauses / hovers
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % WORLDS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Cheerful kid-friendly audio feedback using Web Audio API
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
      // Audio not permitted or supported; safely ignore
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
    <div className="relative max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4">
      {/* =========================================================================
          HERO STAGE VIEWPORT (Earshot Rounded Running Game Container)
      ========================================================================= */}
      <div
        className="relative min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/60 select-none flex flex-col justify-between p-4 sm:p-8 transition-all"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/25" />
              <div className={`absolute inset-0 bg-gradient-to-r ${world.bgGradient} opacity-50`} />
            </div>
          );
        })}

        {/* Dynamic Motion Cobblestone Speed Particles (Subtle wind & sparkles) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="speed-particles" />
        </div>

        {/* =========================================================================
            TOP FLOATING CAPSULE BAR (Earshot Nav Bar)
        ========================================================================= */}
        <div className="relative z-30 w-full flex items-center justify-between gap-3">
          {/* Brand Mark (Findo Squirrel Badge + Wordmark) */}
          <Link
            href="/"
            className="flex items-center gap-2.5 bg-white/85 hover:bg-white backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/80 shadow-md transition-transform hover:scale-105"
          >
            <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden bg-white shrink-0">
              <Image src="/logo.png" alt="Findo" fill className="object-contain" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-black text-sm sm:text-base tracking-tight text-slate-900 leading-none">
                FINDO
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#5a9e2f]" />
            </div>
          </Link>

          {/* Centered Capsule Navigation (Earshot Style) */}
          <div className="hidden md:flex items-center gap-1 bg-white/85 backdrop-blur-md px-2 py-1 rounded-full border border-white/80 shadow-md text-xs font-bold text-slate-700">
            <Link
              href="/"
              className="px-4 py-1.5 rounded-full bg-slate-900 text-white shadow-sm transition-all"
            >
              Home
            </Link>
            {WORLDS.map((w, idx) => (
              <button
                key={w.id}
                onClick={() => handleSelectWorld(idx)}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  idx === activeIdx
                    ? 'bg-[#5a9e2f] text-white shadow-sm'
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
              className="hidden sm:inline-flex items-center gap-1.5 bg-white/85 hover:bg-white backdrop-blur-md text-slate-800 px-3 py-2 rounded-full border border-white/80 shadow-md text-xs font-bold transition-all hover:scale-105"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#5a9e2f] animate-pulse" />
                  <span>SFX On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  <span>SFX Off</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-2 bg-white/90 hover:bg-white backdrop-blur-md text-slate-900 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/80 shadow-md text-xs font-black transition-all hover:scale-105"
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
            RUNNING SQUIRREL MASCOT (Foreground 3D Character with Runner Physics)
        ========================================================================= */}
        <div className="absolute left-[8%] sm:left-[16%] md:left-[22%] bottom-16 sm:bottom-20 z-20 pointer-events-none">
          <div className="relative animate-runner-stride">
            {/* 3D Squirrel Mascot running away down the cobblestone road */}
            <div className="relative w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-84 lg:h-84 drop-shadow-[0_20px_25px_rgba(0,0,0,0.55)]">
              <Image
                src="/images/earshot/squirrel-runner-back.png"
                alt="Findo 3D Squirrel Adventurer Running Forward"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Dynamic Footstep Dust & Sparkles beneath paws */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black/35 rounded-full blur-md animate-runner-shadow" />
            <div className="absolute -bottom-1 left-1/3 w-3 h-3 rounded-full bg-amber-200/80 blur-[1px] animate-dust-puff" />
            <div className="absolute -bottom-2 right-1/3 w-4 h-4 rounded-full bg-amber-100/70 blur-[1px] animate-dust-puff-delay" />
          </div>
        </div>

        {/* =========================================================================
            HEADLINE & NARRATIVE OVERLAY (Earshot Right-Aligned Bold Typography)
        ========================================================================= */}
        <div className="relative z-20 max-w-xl ml-auto mt-auto mb-20 sm:mb-24 sm:pr-4 text-right space-y-3 sm:space-y-4">
          
          {/* Universe Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-white/80 px-3.5 py-1 rounded-full shadow-lg">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: activeWorld.accentColor }}
            />
            <span className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-900">
              {activeWorld.code} • {activeWorld.badge}
            </span>
          </div>

          {/* Massive Bold Headline (Earshot "PACK LIGHT" -> "FIND SMART PLAY") */}
          <h1
            key={activeWorld.id}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-all animate-fade-in"
          >
            {activeWorld.headline}
          </h1>

          {/* Engaging Subhead */}
          <p className="text-xs sm:text-sm md:text-base font-medium text-slate-100/95 max-w-md ml-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            {activeWorld.subhead}
          </p>

          {/* Action Row: "View Kit →" Capsule Button + Floating Featured Kit Preview */}
          <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
            <Link
              href={`/shop?age=${encodeURIComponent(activeWorld.age.replace('–', '-'))}`}
              className="inline-flex items-center gap-2.5 bg-white hover:bg-slate-50 text-slate-900 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all hover:scale-105 group"
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
              className="inline-flex items-center gap-2 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/30 px-4 py-2.5 sm:py-3 rounded-full text-xs font-bold transition-all hover:scale-105"
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
        <div className="relative z-30 w-full flex items-center justify-center pt-4">
          <div className="flex items-center gap-2.5 sm:gap-4 bg-black/40 backdrop-blur-xl p-2 sm:p-2.5 rounded-full border border-white/20 shadow-2xl">
            {WORLDS.map((world, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={world.id}
                  onClick={() => handleSelectWorld(idx)}
                  className={`group relative rounded-full transition-all duration-300 flex items-center justify-center ${
                    isActive
                      ? 'scale-110 sm:scale-115 ring-2 ring-white ring-offset-2 ring-offset-black/60 shadow-[0_0_20px_rgba(255,255,255,0.7)]'
                      : 'opacity-75 hover:opacity-100 hover:scale-105'
                  }`}
                  aria-label={`Switch to ${world.name} (${world.age})`}
                >
                  {/* Circular Thumbnail Avatar */}
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white/70 bg-white shadow-inner">
                    <Image
                      src={world.thumbnail}
                      alt={world.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* World Age Tag Pill (On Active) */}
                  {isActive && (
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md animate-fade-in uppercase tracking-wider">
                      {world.age}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Distance & Milestone Marker (Earshot "2.4M" in bottom-right) */}
        <div className="absolute right-4 sm:right-8 bottom-4 sm:bottom-6 z-20 font-mono text-[10px] sm:text-xs text-white/80 font-bold uppercase tracking-widest hidden sm:block">
          <span>MILESTONES 0–8+ YEARS</span>
        </div>
      </div>
    </div>
  );
}

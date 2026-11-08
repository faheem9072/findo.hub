'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Flame, Compass, Play } from 'lucide-react';

export default function HeroMogo() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen bg-[#070e10] text-white overflow-hidden flex flex-col justify-between pt-6 sm:pt-10 border-b border-emerald-950/40 select-none">
      
      {/* Ambient Radial Spotlight (Follows subtle mouse parallax) */}
      <div
        className="pointer-events-none absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          background: `radial-gradient(circle 600px at ${50 + mousePos.x * 15}% ${45 + mousePos.y * 15}%, rgba(90, 158, 47, 0.28) 0%, rgba(13, 27, 30, 0.8) 55%, #070e10 100%)`,
        }}
      />

      {/* Background Subtle Grid Coordinates & Plus Marks */}
      <div className="absolute inset-0 bg-[radial-gradient(#5a9e2f_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

      {/* Top Header Collab Bar (Mogo Style: "3000 x Abubakar Seitov" -> "FINDO 3000 x SMART PLAY") */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="flex items-center justify-between pb-6 border-b border-white/10 font-mono text-xs">
          
          {/* Left Tag */}
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#5a9e2f]/20 border border-[#5a9e2f]/40 text-[#72bf44] font-black text-[10px] tracking-widest uppercase">
              3D EDITION
            </span>
            <span className="text-slate-400 hidden sm:inline text-[11px] uppercase tracking-wider">
              Findo Official Playground
            </span>
          </div>

          {/* Center Brand Identity Collab Marker */}
          <div className="flex items-center gap-2 font-black tracking-widest uppercase text-xs sm:text-sm">
            <span className="text-emerald-400 font-extrabold text-sm sm:text-base">FINDO</span>
            <span className="text-slate-500 font-normal">✕</span>
            <span className="text-white">SMART PLAY</span>
          </div>

          {/* Right Meta */}
          <div className="text-[11px] text-slate-400 tracking-widest uppercase hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5a9e2f] animate-ping" />
            <span>Active Ecosystem 2026</span>
          </div>
        </div>
      </div>

      {/* Centerpiece Hero Stage: Giant Glowing 'findo' + 3D Mascot Character */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 sm:py-16 my-auto z-10 flex flex-col items-center justify-center text-center">
        
        {/* Floating Holographic Capsules (Mogo Aesthetic) */}
        <div
          className="hidden md:flex absolute left-8 top-12 z-20 transition-transform duration-500 ease-out"
          style={{ transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, 0)` }}
        >
          <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono uppercase tracking-wider text-emerald-300 flex items-center gap-2 shadow-xl animate-float">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold">100% Screen-Free</span>
          </div>
        </div>

        <div
          className="hidden md:flex absolute right-8 top-16 z-20 transition-transform duration-500 ease-out"
          style={{ transform: `translate3d(${mousePos.x * 18}px, ${mousePos.y * 18}px, 0)` }}
        >
          <div className="px-4 py-2 rounded-full bg-[#5a9e2f]/20 backdrop-blur-md border border-[#5a9e2f]/40 text-xs font-mono uppercase tracking-wider text-white flex items-center gap-2 shadow-xl animate-float-reverse">
            <Sparkles className="w-3.5 h-3.5 text-[#72bf44]" />
            <span className="font-bold">Ages 0 to 8+ Years</span>
          </div>
        </div>

        {/* Giant Glowing Typography (Mogo Style: Vibrant Organic Green) */}
        <div className="relative w-full flex items-center justify-center">
          
          <h1
            className="text-8xl sm:text-[11rem] md:text-[15rem] lg:text-[19rem] font-black tracking-tighter leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-[#84d94b] via-[#5a9e2f] to-[#2e6814] drop-shadow-[0_20px_50px_rgba(90,158,47,0.55)] transition-transform duration-300 ease-out"
            style={{
              transform: `perspective(1000px) rotateX(${mousePos.y * -4}deg) rotateY(${mousePos.x * 4}deg)`,
            }}
          >
            findo
          </h1>

          {/* 3D Mascot Character Layer (Sitting in Front & Interacting with the letters, exactly like Mogo character) */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 z-20 pointer-events-none transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(calc(-50% + ${mousePos.x * 25}px), calc(-50% + ${mousePos.y * 25}px), 0)`,
            }}
          >
            {/* Glowing Aura Behind Character */}
            <div className="absolute inset-0 rounded-full bg-[#5a9e2f]/35 blur-3xl" />
            
            <div className="relative w-full h-full animate-float">
              <Image
                src="/logo.png"
                alt="Findo 3D Squirrel Mascot"
                fill
                className="object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.85)] filter contrast-105"
                priority
              />
            </div>
          </div>
        </div>

        {/* Narrative Manifesto Micro-Copy */}
        <div className="max-w-xl mx-auto mt-6 sm:mt-10 space-y-3 z-30">
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            A playful world of tactile wonders, habit trackers, and Montessori logic kits.
            <span className="block text-[#72bf44] font-bold text-xs sm:text-sm uppercase tracking-wider mt-1">
              Find Smart Play • Loved by 10,000+ Kids & Parents
            </span>
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="w-full sm:w-auto py-4 px-8 rounded-full bg-[#5a9e2f] hover:bg-[#488224] text-white font-mono text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(90,158,47,0.5)] hover:shadow-[0_0_50px_rgba(90,158,47,0.8)] flex items-center justify-center gap-2 group"
            >
              <span>Explore 2026 Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="#mogo-showcase"
              className="w-full sm:w-auto py-4 px-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-widest border border-white/20 transition-all flex items-center justify-center gap-2 backdrop-blur-md"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Interactive Discoveries</span>
            </Link>
          </div>
        </div>

      </div>

      {/* CONTINUOUS HIGH-ENERGY NEON RUNNING MARQUEE (MOGO AESTHETIC) */}
      <div className="w-full bg-[#040809] border-t border-emerald-950/60 py-3.5 overflow-hidden z-20">
        <div className="animate-marquee font-mono text-xs font-black uppercase tracking-widest whitespace-nowrap text-white">
          <span className="mx-6 text-[#72bf44]">✦</span>
          <span>FIND SMART PLAY</span>
          <span className="mx-6 text-[#72bf44]">✦</span>
          <span>100% SCREEN-FREE ESSENTIALS</span>
          <span className="mx-6 text-[#72bf44]">✦</span>
          <span>CURATED BY MILESTONES</span>
          <span className="mx-6 text-[#72bf44]">✦</span>
          <span>MONTESSORI PUZZLES & STEM LABS</span>
          <span className="mx-6 text-[#72bf44]">✦</span>
          <span>FREE SHIPPING & COD AVAILABLE</span>
          <span className="mx-6 text-[#72bf44]">✦</span>
          <span>ALL-INDIA FAST DELIVERY</span>
          <span className="mx-6 text-[#72bf44]">✦</span>
          <span>FIND SMART PLAY</span>
          <span className="mx-6 text-[#72bf44]">✦</span>
          <span>100% SCREEN-FREE ESSENTIALS</span>
          <span className="mx-6 text-[#72bf44]">✦</span>
          <span>CURATED BY MILESTONES</span>
          <span className="mx-6 text-[#72bf44]">✦</span>
          <span>MONTESSORI PUZZLES & STEM LABS</span>
          <span className="mx-6 text-[#72bf44]">✦</span>
          <span>FREE SHIPPING & COD AVAILABLE</span>
        </div>
      </div>

    </section>
  );
}


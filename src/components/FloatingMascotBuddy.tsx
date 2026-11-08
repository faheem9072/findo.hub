'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, MessageCircle } from 'lucide-react';

export default function FloatingMascotBuddy() {
  const [bubbleOpen, setBubbleOpen] = useState(true);

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 select-none flex flex-col items-end pointer-events-auto">
      
      {/* Speech Bubble Tooltip */}
      {bubbleOpen && (
        <div className="relative mb-2 mr-2 bg-white text-slate-800 p-2.5 sm:p-3 rounded-2xl shadow-xl border border-slate-200/90 text-xs font-bold max-w-[200px] animate-fade-in">
          <button
            onClick={() => setBubbleOpen(false)}
            aria-label="Close message"
            className="absolute -top-1.5 -left-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
          >
            <X className="w-2.5 h-2.5" />
          </button>
          <p className="leading-snug">
            Hi! Need help choosing toys for your kid? Chat on WhatsApp! 💬
          </p>
          {/* Bubble tail */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-slate-200 rotate-45" />
        </div>
      )}

      {/* Floating 3D Squirrel Button */}
      <a
        href="https://wa.me/917025387764?text=Hello%20Findo!%20I%20would%20like%20to%20know%20more%20about%20your%20educational%20toys."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Findo Squirrel on WhatsApp"
        className="group relative flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
      >
        {/* Glow & Ring */}
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md group-hover:bg-emerald-500/35 transition-all animate-pulse" />
        
        {/* Squirrel Avatar Frame */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-white border-2 border-[#5a9e2f] shadow-lg p-0.5 animate-float flex items-center justify-center">
          <Image
            src="/images/squirrel-buddy.png"
            alt="Findo Mascot Buddy"
            fill
            className="object-contain p-1"
          />
        </div>

        {/* WhatsApp Mini Badge Icon */}
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-sm">
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
        </div>
      </a>
    </div>
  );
}

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShieldCheck, Sparkles, Award, ArrowRight, Lightbulb, Smile } from 'lucide-react';

export const metadata = {
  title: 'About Wooobey — Play. Learn. Create.',
  description: 'Learn about Wooobey: Our story, philosophy, and dedication to screen-free developmental toys and routine planners for curious growing minds.',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner in Brand Journey Violet / Purple Style */}
      <div className="bg-gradient-to-br from-[#5f3dc4] via-[#7048e8] to-[#4c2889] text-white p-10 sm:p-16 rounded-4xl text-center space-y-4 shadow-2xl border-2 border-white/20 relative overflow-hidden">
        <div className="absolute -left-16 -top-16 w-64 h-64 bg-[#ffb703]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#f25c38]/25 rounded-full blur-3xl pointer-events-none" />
        
        <span className="text-xs font-black text-[#ffb703] uppercase tracking-widest bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/25 font-heading">
          Our Brand Journey
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white font-heading tracking-tight">
          Keep Exploring. Keep Creating. Keep Growing.
        </h1>
        <p className="text-base sm:text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed font-medium">
          Every little discovery begins with a moment of curiosity. At Wooobey, we create screen-free toys, habit trackers, and STEM kits that inspire children to discover their best selves.
        </p>
      </div>

      {/* Brand Origin Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-[#f25c38] text-xs font-black uppercase tracking-wider font-heading">
            <Sparkles className="w-4 h-4 text-[#ffb703]" />
            <span>Why Wooobey Exists</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0b574f] leading-snug font-heading">
            Play. Learn. Create. — Smart Toys For Joyful Parenting
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            Wooobey was born from a simple passion: children thrive when they touch, build, create, and solve real-world challenges with their own two hands.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            Instead of passive phone screens and disposable plastic, we engineer <strong>purposeful developmental tools</strong> — from daily routine habit tracker boards that foster lifelong morning discipline to tactile zero-ink instant print cameras and Montessori balance puzzles.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 py-3 px-8 rounded-full bg-[#f25c38] hover:bg-[#ff5e36] text-white font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all font-heading"
            >
              <span>Explore The Wooobey Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 relative aspect-4/3 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-[#fffaf5] p-6 flex items-center justify-center">
          <Image
            src="/images/wooobey-brand-banner.jpg"
            alt="Wooobey Brand Journey"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      </div>

      {/* Core Values Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-[#0b574f]/15 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#e6f4f2] text-[#0b574f] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-[#0b574f]" />
          </div>
          <h3 className="text-lg font-black text-[#0b574f] font-heading">Child-Safe & Tested</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Every material is strictly tested for non-toxic, child-safe compliance so parents enjoy complete peace of mind.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#0b574f]/15 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#fef0ec] text-[#f25c38] flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-[#f25c38]" />
          </div>
          <h3 className="text-lg font-black text-[#0b574f] font-heading">100% Screen-Free</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            We prioritize physical, tactile, and problem-solving engagement that nurtures deep focus over mindless digital stimulation.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#0b574f]/15 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#fff9e6] text-[#d97706] flex items-center justify-center">
            <Smile className="w-6 h-6 text-[#ffb703]" />
          </div>
          <h3 className="text-lg font-black text-[#0b574f] font-heading">Made With Love In India</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Fast, reliable pan-India delivery, hassle-free replacements, and friendly WhatsApp support whenever parents need us.
          </p>
        </div>
      </div>
    </div>
  );
}

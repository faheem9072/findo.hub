import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShieldCheck, Sparkles, Award, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Us — Findo Kids Brand',
  description: 'Learn about Findo: Our story, safety mission, and commitment to creating unique products for curious young minds.',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0d1b1e] via-[#152e33] to-[#0d1b1e] text-white p-10 sm:p-16 rounded-3xl text-center space-y-4 shadow-xl border border-emerald-950/40 relative overflow-hidden">
        <div className="absolute -left-16 -top-16 w-64 h-64 bg-[#5a9e2f]/20 rounded-full blur-3xl pointer-events-none" />
        <span className="text-xs font-bold text-[#5a9e2f] uppercase tracking-widest bg-[#5a9e2f]/20 px-3.5 py-1.5 rounded-full border border-[#5a9e2f]/30">
          Our Brand Mission
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Find What You Need For Smart Parenting
        </h1>
        <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          At Findo, we build products that make kids smile, spark early learning, and give parents peace of mind through thoughtful innovation.
        </p>
      </div>

      {/* Brand Origin Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-[#5a9e2f] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Why Findo Exists</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#0d1b1e] leading-snug">
            Created By Parents, For Real Daily Parenting Challenges
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Findo started with a simple observation: most kids&apos; toys on the market are either generic plastic gadgets that end up discarded in days, or messy items that add work for parents.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            We set out to create a curated catalog of <strong>unique, problem-solving products</strong> — from 360-degree anti-spill bowls that save your floors to paperless LCD magic tablets that keep children creatively engaged without screen addiction.
          </p>
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#5a9e2f] hover:bg-[#488224] text-white font-bold text-sm shadow-md transition-all"
            >
              <span>Explore Our Unique Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 relative aspect-4/3 rounded-3xl overflow-hidden border-4 border-white shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1000"
            alt="Findo Brand Story"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Core Values Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#5a9e2f]/10 text-[#5a9e2f] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#0d1b1e]">Uncompromising Safety</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every material is strictly tested for BPA-free, non-toxic, and heavy-metal-free compliance before entering our catalog.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#5a9e2f]/10 text-[#5a9e2f] flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#0d1b1e]">Screen-Free Innovation</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We prioritize physical, tactile, and auditory exploration that fosters real-world motor development over passive screen consumption.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#5a9e2f]/10 text-[#5a9e2f] flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#0d1b1e]">Parent Satisfaction</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Backed by a 7-day hassle-free replacement guarantee and friendly 24/7 parent customer support across India.
          </p>
        </div>
      </div>
    </div>
  );
}

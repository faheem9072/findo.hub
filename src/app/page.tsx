import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Compass, Lightbulb, Smile, MonitorOff } from 'lucide-react';
import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';

export const revalidate = 60; // Revalidate every minute

async function getHomePageData() {
  const featuredProducts = await prisma.product.findMany({
    where: { isFeatured: true, isPublished: true },
    take: 6,
    orderBy: { createdAt: 'desc' },
    include: { category: true },
  });

  return { featuredProducts };
}

export default async function HomePage() {
  const { featuredProducts } = await getHomePageData();

  const purposes = [
    { title: 'PLAY', slug: 'PLAY', desc: 'Active & equilibrium games' },
    { title: 'LEARN', slug: 'LEARN', desc: 'STEM & early logic building' },
    { title: 'CREATE', slug: 'CREATE', desc: 'Art, puzzles & imagination' },
    { title: 'EXPLORE', slug: 'EXPLORE', desc: 'World discovery & maps' },
    { title: 'BUILD HABITS', slug: 'BUILD HABITS', desc: 'Routine planners & habit boards' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* SECTION 1 — HERO */}
      <section className="relative pt-8 sm:pt-16 pb-12 sm:pb-20 bg-[#fafbf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0d1b1e] tracking-tight leading-tight">
                Find What You Need.
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-lg mx-auto lg:mx-0">
                Thoughtfully chosen products for curious kids.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto py-3.5 px-8 rounded-lg bg-[#5a9e2f] hover:bg-[#488224] text-white font-bold text-base transition-colors text-center shadow-xs"
                >
                  Shop Now
                </Link>
                <Link
                  href="/about"
                  className="w-full sm:w-auto py-3.5 px-8 rounded-lg bg-white hover:bg-slate-50 text-[#0d1b1e] font-semibold text-base border border-slate-200 transition-colors text-center"
                >
                  Explore Findo
                </Link>
              </div>
            </div>

            {/* Right Product Lifestyle Visual */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-lg aspect-4/3 rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white">
                <Image
                  src="/images/habit-tracker.jpg"
                  alt="FINDO Kids Daily Routine & Habit Tracker Board"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2 — FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d1b1e]">
              Little things. Big discoveries.
            </h2>
          </div>
          <Link href="/shop" className="text-xs font-bold text-[#5a9e2f] hover:underline flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION 3 — SHOP BY PURPOSE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d1b1e]">
            Shop by Purpose
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {purposes.map((p) => (
            <Link
              key={p.slug}
              href={`/shop?purpose=${encodeURIComponent(p.slug)}`}
              className="p-5 rounded-xl bg-white border border-slate-200/80 hover:border-[#5a9e2f] hover:shadow-xs transition-all text-center group flex flex-col justify-center items-center"
            >
              <span className="text-sm font-extrabold tracking-wider text-[#0d1b1e] group-hover:text-[#5a9e2f] transition-colors">
                {p.title}
              </span>
              <span className="text-[11px] text-slate-400 mt-1">
                {p.desc}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 4 — WHY FINDO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-y border-slate-200/60">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d1b1e]">
            Made for curious minds.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-4 space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#5a9e2f]/10 text-[#5a9e2f] flex items-center justify-center mx-auto">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#0d1b1e] text-sm">Learn through play</h3>
          </div>

          <div className="p-4 space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#5a9e2f]/10 text-[#5a9e2f] flex items-center justify-center mx-auto">
              <Smile className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#0d1b1e] text-sm">Build better habits</h3>
          </div>

          <div className="p-4 space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#5a9e2f]/10 text-[#5a9e2f] flex items-center justify-center mx-auto">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#0d1b1e] text-sm">Explore creativity</h3>
          </div>

          <div className="p-4 space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#5a9e2f]/10 text-[#5a9e2f] flex items-center justify-center mx-auto">
              <MonitorOff className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#0d1b1e] text-sm">Screen-free fun</h3>
          </div>
        </div>
      </section>

      {/* SECTION 5 — BRAND STATEMENT */}
      <section className="max-w-4xl mx-auto px-4 text-center py-8">
        <div className="p-10 rounded-2xl bg-[#0d1b1e] text-white shadow-xs">
          <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug">
            More than toys.<br />
            <span className="text-[#5a9e2f]">Little tools for growing minds.</span>
          </h3>
        </div>
      </section>

      {/* SECTION 6 — FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b1e]">
          Find something they’ll love.
        </h2>
        <div>
          <Link
            href="/shop"
            className="inline-block py-4 px-10 rounded-lg bg-[#5a9e2f] hover:bg-[#488224] text-white font-bold text-base transition-colors shadow-xs"
          >
            Shop All Products
          </Link>
        </div>
      </section>

    </div>
  );
}

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Lightbulb, Smile, MonitorOff } from 'lucide-react';
import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import HeroHamleysSlider from '@/components/HeroHamleysSlider';
import ShopByAgeSlider from '@/components/ShopByAgeSlider';
import DealsProductSlider from '@/components/DealsProductSlider';
import FloatingMascotBuddy from '@/components/FloatingMascotBuddy';
import { FALLBACK_PRODUCTS } from '@/lib/fallback-data';

// Incremental Static Regeneration (1 hour ISR + on-demand instant purge via revalidatePath)
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Findo — Find Smart Play | Kids Developmental Toys & Learning',
  description:
    'Find Smart Play — Discover unique, screen-free, and child-safe developmental toys for kids across India. From habit tracker routine boards to instant print cameras and STEM science kits.',
  alternates: {
    canonical: 'https://www.getfindo.in',
  },
  openGraph: {
    title: 'Findo — Find Smart Play',
    description:
      'Find Smart Play — Screen-free, child-safe developmental toys, routine planners, and STEM kits for growing minds across India.',
    url: 'https://www.getfindo.in',
    siteName: 'Findo — Find Smart Play',
  },
};

async function getHomePageData() {
  try {
    const fetchDb = Promise.all([
      prisma.product.findMany({
        where: { isFeatured: true, isPublished: true },
        take: 12,
        orderBy: { createdAt: 'desc' },
        include: { category: true },
      }),
      prisma.product.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: 'desc' },
        include: { category: true },
      }),
    ]);

    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('DB Timeout')), 3000)
    );

    const [featuredProducts, allProducts] = await Promise.race([fetchDb, timeout]);

    return {
      featuredProducts: featuredProducts.length > 0 ? featuredProducts : FALLBACK_PRODUCTS.slice(0, 4),
      catalogProducts: allProducts.length > 0 ? allProducts : FALLBACK_PRODUCTS,
    };
  } catch (error) {
    console.warn('Database temporarily unreachable during build/render, using fallback:', error);
    return {
      featuredProducts: FALLBACK_PRODUCTS.slice(0, 4),
      catalogProducts: FALLBACK_PRODUCTS,
    };
  }
}

export default async function HomePage() {
  const { featuredProducts, catalogProducts } = await getHomePageData();

  // Create Deals items list with offer discounts
  const dealProducts = (catalogProducts.length > 0 ? catalogProducts : FALLBACK_PRODUCTS).map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    compareAtPrice: p.compareAtPrice || Math.round(p.price * 1.5),
    images: typeof p.images === 'string' ? p.images : JSON.stringify(p.images),
    ageRange: p.ageRange || 'All Ages',
    stock: p.stock,
  }));

  const productBySlug = new Map<string, any>(catalogProducts.map((p) => [p.slug, p]));

  const rawCoordinates = [
    { num: '01', name: 'Habit Tracker Board', age: '3-8 Y', slug: 'habit-tracker', defaultPrice: 349, img: '/images/habit-tracker.jpg', href: '/product/habit-tracker', badge: '🔥 TOP SELLING' },
    { num: '02', name: 'Tetra Tower Balance', age: '2-5 Y', slug: 'balance-tower', defaultPrice: 329, img: '/images/tetra-tower.jpg', href: '/product/balance-tower' },
    { num: '03', name: 'Instant Print Camera', age: '4-10 Y', slug: 'kids-instant-print-digital-camera', defaultPrice: 1499, img: '/images/instant-print-camera.jpg', href: '/product/kids-instant-print-digital-camera', badge: '🔥 TOP SELLING' },
    { num: '04', name: 'Super Chemistry Lab', age: '8+ Y', slug: 'my-super-chemistry-lab', defaultPrice: 975, img: '/images/super-chemistry-lab.jpg', href: '/product/my-super-chemistry-lab' },
    { num: '05', name: 'Montessori Tangram', age: '2-5 Y', slug: 'tangram-wooden-puzzle-set', defaultPrice: 319, img: '/images/tangram-woodiness.jpg', href: '/product/tangram-wooden-puzzle-set' },
    { num: '06', name: 'Educational Microscope', age: '6-12 Y', slug: 'kids-educational-microscope-science-kit', defaultPrice: 949, img: '/images/educational-microscope.jpg', href: '/product/kids-educational-microscope-science-kit' },
    { num: '07', name: 'Ekta Magna Play', age: '4-8 Y', slug: 'ekta-magna-play-magnetic-art-puzzle', defaultPrice: 549, img: '/images/magna-play-magnets.jpg', href: '/product/ekta-magna-play-magnetic-art-puzzle' },
    { num: '08', name: 'Solar System Model', age: '6-12 Y', slug: 'diy-working-solar-system-model', defaultPrice: 490, img: '/images/solar-system-diy.jpg', href: '/product/diy-working-solar-system-model' },
  ];

  const curatedCoordinates = rawCoordinates.map((item) => {
    const live = productBySlug.get(item.slug);
    const priceNum = live ? live.price : item.defaultPrice;
    return {
      ...item,
      price: `₹${priceNum}`,
    };
  });

  return (
    <div className="bg-[#fafbf8] text-slate-900 min-h-screen space-y-12 sm:space-y-16 pb-28">

      {/* 1. HAMLEYS-STYLE HERO PROMOTIONAL BANNER SLIDER WITH OFFER CALLOUTS */}
      <HeroHamleysSlider initialProducts={catalogProducts} />

      {/* 2. HAMLEYS "SHOP BY AGE" HORIZONTAL SLIDER WITH INSTANT ON-PAGE AGE FILTERING */}
      <ShopByAgeSlider allProducts={catalogProducts} />

      {/* 3. DEALS OF THE DAY / OFFER PRICES HORIZONTAL PRODUCT SLIDER ("products inghane neenghuka offer price und enn paranghitt") */}
      <DealsProductSlider products={dealProducts} />

      {/* 4. FEATURED PRODUCTS COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
          <div>
            <span className="font-heading text-xs uppercase tracking-wider text-[#5a9e2f] font-bold block">
              Find Smart Play
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Featured Toys & Best Sellers
            </h2>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            <Link
              href="/shop"
              className="font-heading px-4 py-1.5 rounded-full bg-[#5a9e2f] text-white font-bold text-xs shadow-xs shrink-0"
            >
              All Toys
            </Link>
            <Link
              href="/shop?age=0-3%20Years"
              className="font-heading px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#5a9e2f] hover:text-[#5a9e2f] text-xs font-bold transition-colors shrink-0"
            >
              0-3 Y
            </Link>
            <Link
              href="/shop?age=3-5%20Years"
              className="font-heading px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#5a9e2f] hover:text-[#5a9e2f] text-xs font-bold transition-colors shrink-0"
            >
              3-5 Y
            </Link>
            <Link
              href="/shop?age=6-8%20Years"
              className="font-heading px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#5a9e2f] hover:text-[#5a9e2f] text-xs font-bold transition-colors shrink-0"
            >
              6-8 Y
            </Link>
            <Link
              href="/shop?age=8%2B%20Years"
              className="font-heading px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#5a9e2f] hover:text-[#5a9e2f] text-xs font-bold transition-colors shrink-0"
            >
              8+ Y
            </Link>
            <Link
              href="/shop"
              className="font-heading ml-2 text-xs font-bold text-[#5a9e2f] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>View All ({catalogProducts.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Catalog Products Showcase */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {catalogProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} variant="light" />
          ))}
        </div>
      </section>

      {/* 5. "(HAVE FUN EXPLORING) Yeah! Curated Picks" COORDINATE GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="font-heading text-xs uppercase tracking-wider text-[#5a9e2f] font-bold block">
            ★ Have Fun Exploring
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Top Discoveries
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Hand-tested developmental favorites for screen-free play
          </p>
        </div>

        {/* 8-Item Discovery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border border-slate-200 p-4 sm:p-6 bg-white rounded-3xl relative shadow-xs">
          {curatedCoordinates.map((item) => (
            <Link
              key={item.num}
              href={item.href}
              className="group p-4 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-[#5a9e2f] hover:bg-white hover:shadow-md transition-all flex flex-col justify-between items-center text-center relative overflow-hidden"
            >
              <div className="w-full flex items-center justify-between text-[11px] text-slate-500 font-bold">
                <span className="font-heading font-black text-[#5a9e2f]">#{item.num}</span>
                {item.badge ? (
                  <span className="font-heading text-[10px] font-black bg-rose-600 text-white px-2 py-0.5 rounded-full shadow-xs">
                    {item.badge}
                  </span>
                ) : (
                  <span className="font-heading text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">{item.age}</span>
                )}
              </div>

              <div className="relative w-28 h-28 my-3 rounded-xl overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="w-full pt-2 border-t border-slate-100">
                <h4 className="font-heading text-xs font-bold text-slate-800 group-hover:text-[#5a9e2f] transition-colors truncate">
                  {item.name}
                </h4>
                <span className="font-heading text-xs font-black text-[#5a9e2f] block mt-0.5">
                  {item.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. CORE MANIFESTO 4-PILLAR GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-b border-slate-200">
        <div className="text-center mb-10 space-y-2">
          <span className="font-heading text-xs uppercase tracking-wider text-[#5a9e2f] font-bold">
            ★ Core Standards
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-black text-slate-900">
            Made for curious minds.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <Link
            href="/shop?purpose=LEARN"
            className="p-6 space-y-3 rounded-2xl bg-white border border-slate-200 hover:border-[#5a9e2f] hover:shadow-md transition-all group block"
          >
            <span className="font-heading text-xs text-slate-400 block font-bold">(01)</span>
            <div className="w-12 h-12 rounded-full bg-[#5a9e2f]/10 border border-[#5a9e2f]/30 text-[#5a9e2f] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-xs">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-black text-slate-900 text-sm group-hover:text-[#5a9e2f] transition-colors">
              Learn through play
            </h3>
            <span className="font-heading text-xs text-[#5a9e2f] font-bold flex items-center justify-center gap-1 group-hover:underline">
              <span>View STEM & Logic</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <Link
            href={`/shop?purpose=${encodeURIComponent('BUILD HABITS')}`}
            className="p-6 space-y-3 rounded-2xl bg-white border border-slate-200 hover:border-[#5a9e2f] hover:shadow-md transition-all group block"
          >
            <span className="font-heading text-xs text-slate-400 block font-bold">(02)</span>
            <div className="w-12 h-12 rounded-full bg-[#5a9e2f]/10 border border-[#5a9e2f]/30 text-[#5a9e2f] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-xs">
              <Smile className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-black text-slate-900 text-sm group-hover:text-[#5a9e2f] transition-colors">
              Build better habits
            </h3>
            <span className="font-heading text-xs text-[#5a9e2f] font-bold flex items-center justify-center gap-1 group-hover:underline">
              <span>Trackers & Planners</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <Link
            href="/shop?purpose=CREATE"
            className="p-6 space-y-3 rounded-2xl bg-white border border-slate-200 hover:border-[#5a9e2f] hover:shadow-md transition-all group block"
          >
            <span className="font-heading text-xs text-slate-400 block font-bold">(03)</span>
            <div className="w-12 h-12 rounded-full bg-[#5a9e2f]/10 border border-[#5a9e2f]/30 text-[#5a9e2f] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-black text-slate-900 text-sm group-hover:text-[#5a9e2f] transition-colors">
              Explore creativity
            </h3>
            <span className="font-heading text-xs text-[#5a9e2f] font-bold flex items-center justify-center gap-1 group-hover:underline">
              <span>Art & Puzzles</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <Link
            href="/shop?purpose=PLAY"
            className="p-6 space-y-3 rounded-2xl bg-white border border-slate-200 hover:border-[#5a9e2f] hover:shadow-md transition-all group block"
          >
            <span className="font-heading text-xs text-slate-400 block font-bold">(04)</span>
            <div className="w-12 h-12 rounded-full bg-[#5a9e2f]/10 border border-[#5a9e2f]/30 text-[#5a9e2f] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-xs">
              <MonitorOff className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-black text-slate-900 text-sm group-hover:text-[#5a9e2f] transition-colors">
              Screen-free fun
            </h3>
            <span className="font-heading text-xs text-[#5a9e2f] font-bold flex items-center justify-center gap-1 group-hover:underline">
              <span>Active Play</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

      {/* 7. FINAL HEROIC CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#18392b] via-[#0d2218] to-[#08150f] text-white shadow-xl relative overflow-hidden border border-[#5a9e2f]/40">
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#5a9e2f]/25 rounded-full blur-3xl pointer-events-none" />
          <span className="font-heading text-xs uppercase tracking-wider text-[#72bf44] font-bold block mb-2">
            ★ Find Smart Play
          </span>
          <h3 className="font-heading text-3xl sm:text-5xl font-black leading-tight tracking-tight">
            More than toys.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#84d94b] to-[#5a9e2f]">
              Little tools for growing minds.
            </span>
          </h3>
          <p className="mt-3 text-sm text-slate-300 max-w-lg mx-auto font-medium">
            Join thousands of parents choosing screen-free discovery across India.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="font-heading inline-flex items-center gap-2 py-3 px-8 rounded-full bg-[#5a9e2f] hover:bg-[#488224] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(90,158,47,0.5)] hover:scale-105"
            >
              <span>Explore Complete Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. CUTE FLOATING MASCOT BUDDY (Waving Squirrel Helper) */}
      <FloatingMascotBuddy />

    </div>
  );
}

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Lightbulb, Smile, MonitorOff, Heart, Star, CheckCircle, ShieldCheck, Truck } from 'lucide-react';
import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import HeroHamleysSlider from '@/components/HeroHamleysSlider';
import ShopByAgeSlider from '@/components/ShopByAgeSlider';
import DealsProductSlider from '@/components/DealsProductSlider';
import FloatingMascotBuddy from '@/components/FloatingMascotBuddy';
import { FALLBACK_PRODUCTS } from '@/lib/fallback-data';
import { sanitizeProducts } from '@/lib/image-utils';

// Incremental Static Regeneration (1 hour ISR + on-demand instant purge via revalidatePath)
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Wooobey — Play. Learn. Create. | Kids Developmental Toys & Learning',
  description:
    'Welcome to Wooobey! Discover screen-free, child-safe developmental toys, routine habit tracker boards, and STEM kits across India. Keep Exploring. Keep Creating. Keep Growing.',
  alternates: {
    canonical: 'https://www.getfindo.in',
  },
  openGraph: {
    title: 'Wooobey — Play. Learn. Create.',
    description:
      'Screen-free developmental toys, routine planners, and STEM kits for curious minds across India. Keep Exploring. Keep Creating. Keep Growing.',
    url: 'https://www.getfindo.in',
    siteName: 'Wooobey',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Wooobey' }],
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
      featuredProducts: sanitizeProducts((featuredProducts.length > 0 ? featuredProducts : FALLBACK_PRODUCTS.slice(0, 4)) as any),
      catalogProducts: sanitizeProducts((allProducts.length > 0 ? allProducts : FALLBACK_PRODUCTS) as any),
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
    <div className="bg-[#fffdfa] text-[#0e2a27] min-h-screen space-y-12 sm:space-y-16 pb-28">

      {/* 1. HAMLEYS-STYLE HERO PROMOTIONAL BANNER SLIDER WITH OFFER CALLOUTS */}
      <HeroHamleysSlider initialProducts={catalogProducts} />

      {/* 2. HAMLEYS "SHOP BY AGE" HORIZONTAL SLIDER WITH INSTANT ON-PAGE AGE FILTERING */}
      <ShopByAgeSlider allProducts={catalogProducts} />

      {/* 3. DEALS OF THE DAY / OFFER PRICES HORIZONTAL PRODUCT SLIDER */}
      <DealsProductSlider products={dealProducts} />

      {/* 4. THE WOOOBEY BRAND JOURNEY HERO (DIRECTLY FROM THE USER'S THEME REFERENCE SLIDE!) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl sm:rounded-4xl bg-gradient-to-br from-[#5f3dc4] via-[#7048e8] to-[#4c2889] text-white p-6 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border-2 border-white/20">

          {/* Playful Floating Sparkles & Clouds */}
          <div className="absolute top-4 right-8 w-48 h-48 bg-[#ffb703]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-60 h-60 bg-[#f25c38]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[#ffb703] text-xs font-black uppercase tracking-wider font-heading">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Brand Philosophy</span>
            </span>

            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight drop-shadow-sm">
              THANK YOU
              <span className="block text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#fff9e6] mt-1 font-sans">
                For Being Part of Our Journey
              </span>
            </h2>

            <p className="text-sm sm:text-lg text-purple-100 font-medium leading-relaxed max-w-2xl mx-auto">
              Every little discovery begins with a moment of curiosity.
              <span className="block font-black text-white mt-1 text-base sm:text-xl font-heading">
                Keep Exploring. Keep Creating. Keep Growing.
              </span>
            </p>

            {/* Glowing Brand Centerpiece */}
            <div className="pt-2 pb-4">
              <div className="inline-block px-8 py-3 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                <span className="font-heading text-3xl sm:text-5xl font-black text-white tracking-wider lowercase">
                  wooobey
                </span>
                <span className="block text-[11px] sm:text-xs font-bold text-[#ffb703] uppercase tracking-widest mt-0.5">
                  Play. Learn. Create.
                </span>
              </div>
            </div>

            {/* 5 Cloud Cards - Representing the Slide Collection */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 pt-6 text-[#0e2a27]">
              <Link
                href="/product/habit-tracker"
                className="group p-3 sm:p-4 rounded-2xl bg-white/95 hover:bg-white transition-all transform hover:-translate-y-1 shadow-lg text-center flex flex-col items-center justify-between"
              >
                <div className="w-8 h-8 rounded-full bg-[#fef0ec] text-[#f25c38] flex items-center justify-center font-black text-xs mb-2">
                  01
                </div>
                <h4 className="font-heading text-xs font-black leading-tight text-[#0b574f] group-hover:text-[#f25c38]">
                  HABIT TRACKER
                </h4>
                <span className="text-[10px] text-slate-500 font-bold block mt-1">Daily Routine Board</span>
              </Link>

              <Link
                href="/shop?category=montessori-sensory"
                className="group p-3 sm:p-4 rounded-2xl bg-white/95 hover:bg-white transition-all transform hover:-translate-y-1 shadow-lg text-center flex flex-col items-center justify-between"
              >
                <div className="w-8 h-8 rounded-full bg-[#e6f4f2] text-[#0b574f] flex items-center justify-center font-black text-xs mb-2">
                  02
                </div>
                <h4 className="font-heading text-xs font-black leading-tight text-[#0b574f] group-hover:text-[#f25c38]">
                  CREATIVE PUZZLE BOX
                </h4>
                <span className="text-[10px] text-slate-500 font-bold block mt-1">Montessori & Logic</span>
              </Link>

              <Link
                href="/shop?category=exploration-art"
                className="group p-3 sm:p-4 rounded-2xl bg-white/95 hover:bg-white transition-all transform hover:-translate-y-1 shadow-lg text-center flex flex-col items-center justify-between"
              >
                <div className="w-8 h-8 rounded-full bg-[#fff9e6] text-[#d97706] flex items-center justify-center font-black text-xs mb-2">
                  03
                </div>
                <h4 className="font-heading text-xs font-black leading-tight text-[#0b574f] group-hover:text-[#f25c38]">
                  CREATIVE PLAY TOYS
                </h4>
                <span className="text-[10px] text-slate-500 font-bold block mt-1">Art & Building</span>
              </Link>

              <Link
                href="/product/balance-tower"
                className="group p-3 sm:p-4 rounded-2xl bg-white/95 hover:bg-white transition-all transform hover:-translate-y-1 shadow-lg text-center flex flex-col items-center justify-between"
              >
                <div className="w-8 h-8 rounded-full bg-[#f3f0ff] text-[#7048e8] flex items-center justify-center font-black text-xs mb-2">
                  04
                </div>
                <h4 className="font-heading text-xs font-black leading-tight text-[#0b574f] group-hover:text-[#f25c38]">
                  BALANCE & STACKING
                </h4>
                <span className="text-[10px] text-slate-500 font-bold block mt-1">Tetra Tower Games</span>
              </Link>

              <Link
                href="/product/kids-instant-print-digital-camera"
                className="group p-3 sm:p-4 rounded-2xl bg-white/95 hover:bg-white transition-all transform hover:-translate-y-1 shadow-lg text-center flex flex-col items-center justify-between col-span-2 sm:col-span-1"
              >
                <div className="w-8 h-8 rounded-full bg-[#fef0ec] text-[#f25c38] flex items-center justify-center font-black text-xs mb-2">
                  05
                </div>
                <h4 className="font-heading text-xs font-black leading-tight text-[#0b574f] group-hover:text-[#f25c38]">
                  INSTANT DIGITAL CAMERA
                </h4>
                <span className="text-[10px] text-slate-500 font-bold block mt-1">Zero-Ink Printing</span>
              </Link>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                className="font-heading inline-flex items-center gap-2 py-3 px-8 rounded-full bg-[#f25c38] hover:bg-[#ff5e36] text-white text-xs font-black uppercase tracking-wider transition-all shadow-xl hover:scale-105"
              >
                <span>EXPLORE ALL WOOOBEY TOYS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-xs font-bold text-purple-200 tracking-wider">
                WWW.WOOOBEY.COM
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-[#0b574f]/15">
          <div>
            <span className="font-heading text-xs uppercase tracking-wider text-[#f25c38] font-black block">
              ★ Play. Learn. Create.
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-black text-[#0b574f] tracking-tight">
              Featured Toys & Best Sellers
            </h2>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            <Link
              href="/shop"
              className="font-heading px-4 py-1.5 rounded-full bg-[#0b574f] text-white font-bold text-xs shadow-xs shrink-0"
            >
              All Toys
            </Link>
            <Link
              href="/shop?age=0-3%20Years"
              className="font-heading px-3.5 py-1.5 rounded-full bg-white border border-[#0b574f]/20 text-[#0b574f] hover:border-[#f25c38] hover:text-[#f25c38] text-xs font-bold transition-colors shrink-0"
            >
              0-3 Y
            </Link>
            <Link
              href="/shop?age=3-5%20Years"
              className="font-heading px-3.5 py-1.5 rounded-full bg-white border border-[#0b574f]/20 text-[#0b574f] hover:border-[#f25c38] hover:text-[#f25c38] text-xs font-bold transition-colors shrink-0"
            >
              3-5 Y
            </Link>
            <Link
              href="/shop?age=6-8%20Years"
              className="font-heading px-3.5 py-1.5 rounded-full bg-white border border-[#0b574f]/20 text-[#0b574f] hover:border-[#f25c38] hover:text-[#f25c38] text-xs font-bold transition-colors shrink-0"
            >
              6-8 Y
            </Link>
            <Link
              href="/shop?age=8%2B%20Years"
              className="font-heading px-3.5 py-1.5 rounded-full bg-white border border-[#0b574f]/20 text-[#0b574f] hover:border-[#f25c38] hover:text-[#f25c38] text-xs font-bold transition-colors shrink-0"
            >
              8+ Y
            </Link>
            <Link
              href="/shop"
              className="font-heading ml-2 text-xs font-bold text-[#f25c38] hover:underline flex items-center gap-1 shrink-0"
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

      {/* 6. CURATED DISCOVERY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="font-heading text-xs uppercase tracking-wider text-[#f25c38] font-bold block">
            ★ Have Fun Exploring
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-[#0b574f] tracking-tight">
            Top Discoveries
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Hand-tested developmental favorites for screen-free play
          </p>
        </div>

        {/* 8-Item Discovery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border border-[#0b574f]/15 p-4 sm:p-6 bg-white rounded-3xl relative shadow-xs">
          {curatedCoordinates.map((item) => (
            <Link
              key={item.num}
              href={item.href}
              className="group p-4 rounded-2xl bg-[#fffdfa] border border-[#0b574f]/10 hover:border-[#f25c38] hover:shadow-md transition-all flex flex-col justify-between items-center text-center relative overflow-hidden"
            >
              <div className="w-full flex items-center justify-between text-[11px] text-slate-500 font-bold">
                <span className="font-heading font-black text-[#0b574f]">#{item.num}</span>
                {item.badge ? (
                  <span className="font-heading text-[10px] font-black bg-[#f25c38] text-white px-2 py-0.5 rounded-full shadow-xs">
                    {item.badge}
                  </span>
                ) : (
                  <span className="font-heading text-[#0b574f] bg-[#e6f4f2] px-2 py-0.5 rounded-full border border-[#0b574f]/15">
                    {item.age}
                  </span>
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
                <h4 className="font-heading text-xs font-bold text-slate-800 group-hover:text-[#f25c38] transition-colors truncate">
                  {item.name}
                </h4>
                <span className="font-heading text-xs font-black text-[#0b574f] block mt-0.5">
                  {item.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. CORE STANDARDS PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-b border-[#0b574f]/15">
        <div className="text-center mb-10 space-y-2">
          <span className="font-heading text-xs uppercase tracking-wider text-[#f25c38] font-black">
            ★ Core Standards
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-black text-[#0b574f]">
            Made for curious minds.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <Link
            href="/shop?purpose=LEARN"
            className="p-6 space-y-3 rounded-3xl bg-white border border-[#0b574f]/15 hover:border-[#f25c38] hover:shadow-lg transition-all group block"
          >
            <span className="font-heading text-xs text-slate-400 block font-bold">(01)</span>
            <div className="w-12 h-12 rounded-full bg-[#e6f4f2] border border-[#0b574f]/30 text-[#0b574f] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-xs">
              <Lightbulb className="w-5 h-5 text-[#0b574f]" />
            </div>
            <h3 className="font-heading font-black text-slate-900 text-sm group-hover:text-[#f25c38] transition-colors">
              Learn through play
            </h3>
            <span className="font-heading text-xs text-[#0b574f] font-bold flex items-center justify-center gap-1 group-hover:underline">
              <span>View STEM & Logic</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <Link
            href={`/shop?purpose=${encodeURIComponent('BUILD HABITS')}`}
            className="p-6 space-y-3 rounded-3xl bg-white border border-[#0b574f]/15 hover:border-[#f25c38] hover:shadow-lg transition-all group block"
          >
            <span className="font-heading text-xs text-slate-400 block font-bold">(02)</span>
            <div className="w-12 h-12 rounded-full bg-[#fef0ec] border border-[#f25c38]/30 text-[#f25c38] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-xs">
              <Smile className="w-5 h-5 text-[#f25c38]" />
            </div>
            <h3 className="font-heading font-black text-slate-900 text-sm group-hover:text-[#f25c38] transition-colors">
              Build better habits
            </h3>
            <span className="font-heading text-xs text-[#f25c38] font-bold flex items-center justify-center gap-1 group-hover:underline">
              <span>Trackers & Planners</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <Link
            href="/shop?purpose=CREATE"
            className="p-6 space-y-3 rounded-3xl bg-white border border-[#0b574f]/15 hover:border-[#f25c38] hover:shadow-lg transition-all group block"
          >
            <span className="font-heading text-xs text-slate-400 block font-bold">(03)</span>
            <div className="w-12 h-12 rounded-full bg-[#fff9e6] border border-[#ffb703]/40 text-[#d97706] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-xs">
              <Sparkles className="w-5 h-5 text-[#ffb703]" />
            </div>
            <h3 className="font-heading font-black text-slate-900 text-sm group-hover:text-[#f25c38] transition-colors">
              Explore creativity
            </h3>
            <span className="font-heading text-xs text-[#d97706] font-bold flex items-center justify-center gap-1 group-hover:underline">
              <span>Art & Puzzles</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <Link
            href="/shop?purpose=PLAY"
            className="p-6 space-y-3 rounded-3xl bg-white border border-[#0b574f]/15 hover:border-[#f25c38] hover:shadow-lg transition-all group block"
          >
            <span className="font-heading text-xs text-slate-400 block font-bold">(04)</span>
            <div className="w-12 h-12 rounded-full bg-[#f3f0ff] border border-[#7048e8]/30 text-[#7048e8] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-xs">
              <MonitorOff className="w-5 h-5 text-[#7048e8]" />
            </div>
            <h3 className="font-heading font-black text-slate-900 text-sm group-hover:text-[#f25c38] transition-colors">
              Screen-free fun
            </h3>
            <span className="font-heading text-xs text-[#7048e8] font-bold flex items-center justify-center gap-1 group-hover:underline">
              <span>Active Play</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

      {/* 8. FINAL HEROIC CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#072421] via-[#0b574f] to-[#072421] text-white shadow-xl relative overflow-hidden border border-[#0b574f]/40">
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#f25c38]/25 rounded-full blur-3xl pointer-events-none" />
          <span className="font-heading text-xs uppercase tracking-wider text-[#ffb703] font-bold block mb-2">
            ★ Play. Learn. Create.
          </span>
          <h3 className="font-heading text-3xl sm:text-5xl font-black leading-tight tracking-tight">
            More than toys.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffb703] to-[#f25c38]">
              Little tools for growing minds.
            </span>
          </h3>
          <p className="mt-3 text-sm text-slate-200 max-w-lg mx-auto font-medium">
            Join thousands of parents choosing screen-free discovery with Wooobey across India.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="font-heading inline-flex items-center gap-2 py-3 px-8 rounded-full bg-[#f25c38] hover:bg-[#ff5e36] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(242,92,56,0.5)] hover:scale-105"
            >
              <span>Explore Complete Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FLOATING MASCOT BUDDY */}
      <FloatingMascotBuddy />

    </div>
  );
}

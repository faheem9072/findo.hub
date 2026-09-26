import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Heart, Award, Star, Truck, CheckCircle2, Zap } from 'lucide-react';
import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';

export const revalidate = 60; // Revalidate every minute

async function getHomePageData() {
  const products = await prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: 'desc' },
    include: { category: true },
  });

  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

  return { products, categories };
}

export default async function HomePage() {
  const { products, categories } = await getHomePageData();

  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0d1b1e] via-[#152e33] to-[#0d1b1e] text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Ambient Decorative Shapes */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#5a9e2f]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#72bf44]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5a9e2f]/20 border border-[#5a9e2f]/40 text-[#72bf44] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 animate-spin-slow" />
                <span>India&apos;s #1 Unique Kids Products Brand</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Find What You Need For Your <span className="text-[#5a9e2f] underline decoration-[#5a9e2f]/40">Little Ones</span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Discover functional, screen-free, and child-safe products designed to make learning exciting, mealtime mess-free, and bedtime peaceful.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/products"
                  className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-[#5a9e2f] hover:bg-[#488224] text-white font-bold text-base shadow-lg shadow-[#5a9e2f]/30 hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#featured"
                  className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 backdrop-blur-xs transition-all text-center"
                >
                  View Best Sellers
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-700/60 max-w-lg mx-auto lg:mx-0 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5a9e2f]" />
                  <span>100% Non-Toxic</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5a9e2f]" />
                  <span>Free Ship ₹999+</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5a9e2f]" />
                  <span>7-Day Easy Returns</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card Stack */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border-4 border-[#5a9e2f] shadow-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=1000"
                  alt="Findo Kids Products"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b1e] via-transparent to-transparent opacity-80" />

                {/* Floating Product Highlight Tag */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white shadow-xl text-[#0d1b1e]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#5a9e2f]">Featured Innovation</span>
                      <h4 className="font-bold text-sm leading-tight text-[#0d1b1e]">Findo Magic LCD Tablet</h4>
                      <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>4.9 / 5.0 (280+ Reviews)</span>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-[#5a9e2f]">₹799</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY SHOWCASE GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-[#5a9e2f] uppercase tracking-widest bg-[#eef8ea] px-3.5 py-1.5 rounded-full inline-block">
            Curated Collections
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b1e]">
            Shop By Essential Category
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Explore products designed specifically for your child&apos;s developmental milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <Image
                  src={cat.image || 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800'}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b1e]/90 via-[#0d1b1e]/30 to-transparent" />
              </div>

              <div className="p-5 relative">
                <h3 className="text-lg font-bold text-[#0d1b1e] group-hover:text-[#5a9e2f] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {cat.description}
                </p>
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs font-bold text-[#5a9e2f]">
                  <span>Explore Items</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS CATALOG */}
      <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#5a9e2f] text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Trending Unique Products</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b1e] mt-1">
              Top 5 Featured Findo Products
            </h2>
          </div>
          <Link
            href="/products"
            className="py-2.5 px-5 rounded-full bg-[#0d1b1e] text-white hover:bg-[#5a9e2f] font-bold text-xs transition-colors flex items-center gap-2"
          >
            <span>View All Store Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* WHY PARENTS TRUST FINDO - VALUE STRIP */}
      <section className="bg-[#eef8ea] py-16 border-y border-emerald-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-[#5a9e2f] uppercase tracking-widest">
              The Findo Difference
            </span>
            <h2 className="text-3xl font-extrabold text-[#0d1b1e]">
              Designed With Safety & Purpose First
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#5a9e2f]/10 text-[#5a9e2f] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#0d1b1e] text-base">100% Non-Toxic</h3>
              <p className="text-xs text-slate-500">
                All products are crafted from BPA-free, food-grade, or natural non-toxic materials.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#5a9e2f]/10 text-[#5a9e2f] flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#0d1b1e] text-base">Screen-Free Learning</h3>
              <p className="text-xs text-slate-500">
                Fosters hands-on creativity, tactile motor skills, and independent exploration.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#5a9e2f]/10 text-[#5a9e2f] flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#0d1b1e] text-base">Parent Approved</h3>
              <p className="text-xs text-slate-500">
                Tested and verified by real parents for durability, ease of cleaning, and real utility.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#5a9e2f]/10 text-[#5a9e2f] flex items-center justify-center mx-auto">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#0d1b1e] text-base">Express Shipping</h3>
              <p className="text-xs text-slate-500">
                Fast dispatch across India with tracking updates directly sent to your phone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PARENT TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-[#5a9e2f] uppercase tracking-widest">
            Loved By 10,000+ Families
          </span>
          <h2 className="text-3xl font-extrabold text-[#0d1b1e]">
            What Parents Say About Findo
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              &quot;The 360 gyro snack bowl saved my rugs! My 2-year-old son carries it everywhere, and not a single raisin has spilled. Highly recommend Findo!&quot;
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#5a9e2f] text-white font-bold flex items-center justify-center text-xs">
                PS
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0d1b1e]">Priya Sharma</h4>
                <span className="text-[10px] text-slate-400">Mother of 2 • Mumbai</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              &quot;The duck tap light is my 4-year-old daughter&apos;s best friend. Soft to hold, auto-timer is perfect for bedtime, and charges quickly with USB!&quot;
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0d1b1e] text-emerald-400 font-bold flex items-center justify-center text-xs">
                AM
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0d1b1e]">Ananya Mehta</h4>
                <span className="text-[10px] text-slate-400">Mother of 1 • Bengaluru</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              &quot;The LCD magic tablet kept my son engaged throughout our 6-hour flight without needing an iPad screen. Amazing quality and zero mess!&quot;
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#5a9e2f] text-white font-bold flex items-center justify-center text-xs">
                RK
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0d1b1e]">Rohan Kapoor</h4>
                <span className="text-[10px] text-slate-400">Father of 3-year-old • Delhi</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

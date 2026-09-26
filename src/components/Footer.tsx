import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Truck, RefreshCw, Heart, Headset } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0d1b1e] text-slate-300 pt-16 pb-8 border-t-4 border-[#5a9e2f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Strip inside Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-emerald-950/60">
          <div className="flex items-center gap-3 bg-[#15292e]/60 p-4 rounded-xl border border-emerald-900/30">
            <Truck className="w-8 h-8 text-[#5a9e2f] shrink-0" />
            <div>
              <h4 className="text-white text-sm font-bold">Fast India Express</h4>
              <p className="text-xs text-slate-400">Free shipping above ₹999</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#15292e]/60 p-4 rounded-xl border border-emerald-900/30">
            <ShieldCheck className="w-8 h-8 text-[#5a9e2f] shrink-0" />
            <div>
              <h4 className="text-white text-sm font-bold">100% Child Safe</h4>
              <p className="text-xs text-slate-400">BPA Free & Certified</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#15292e]/60 p-4 rounded-xl border border-emerald-900/30">
            <RefreshCw className="w-8 h-8 text-[#5a9e2f] shrink-0" />
            <div>
              <h4 className="text-white text-sm font-bold">7-Day Easy Return</h4>
              <p className="text-xs text-slate-400">Hassle-free guarantee</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#15292e]/60 p-4 rounded-xl border border-emerald-900/30">
            <Headset className="w-8 h-8 text-[#5a9e2f] shrink-0" />
            <div>
              <h4 className="text-white text-sm font-bold">Parent Support</h4>
              <p className="text-xs text-slate-400">Friendly 24/7 assistance</p>
            </div>
          </div>
        </div>

        {/* Core Footer Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12">
          {/* Brand Info Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#5a9e2f]">
                <Image src="/logo.jpeg" alt="Findo Logo" fill className="object-cover" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                findo<span className="text-[#5a9e2f]">.</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Findo is your trusted brand for unique, high-quality kids&apos; products designed to trigger curiosity, early learning, and stress-free parenting.
            </p>
            <div className="text-xs text-[#5a9e2f] font-semibold tracking-wide">
              TAGLINE: &quot;Find What You Need&quot;
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white text-sm font-bold tracking-wide uppercase mb-4">Shop</h5>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/products" className="hover:text-[#5a9e2f] transition-colors">All Products</Link></li>
              <li><Link href="/products?category=learning-toys" className="hover:text-[#5a9e2f] transition-colors">Learning Toys</Link></li>
              <li><Link href="/products?category=feeding-tableware" className="hover:text-[#5a9e2f] transition-colors">Feeding & Tableware</Link></li>
              <li><Link href="/products?category=nursery-lights" className="hover:text-[#5a9e2f] transition-colors">Nursery & Nightlights</Link></li>
              <li><Link href="/products?category=activity-boards" className="hover:text-[#5a9e2f] transition-colors">Busy Boards</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h5 className="text-white text-sm font-bold tracking-wide uppercase mb-4">Company</h5>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-[#5a9e2f] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#5a9e2f] transition-colors">Contact Support</Link></li>
              <li><Link href="/shipping-returns" className="hover:text-[#5a9e2f] transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/faq" className="hover:text-[#5a9e2f] transition-colors">Parent FAQs</Link></li>
              <li><Link href="/admin/login" className="hover:text-[#5a9e2f] transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h5 className="text-white text-sm font-bold tracking-wide uppercase mb-4">Stay Connected</h5>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe for exclusive parent discounts, new unique product launches & parenting tips!
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#15292e] text-white placeholder-slate-500 border border-emerald-900/50 text-xs focus:outline-none focus:border-[#5a9e2f]"
              />
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-[#5a9e2f] text-white font-bold text-xs hover:bg-[#488224] transition-colors"
              >
                Join Findo Club
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Findo Kids Brand. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>for little explorers everywhere.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

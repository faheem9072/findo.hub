'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, User, Sparkles } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function Navbar({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();

  const navLinks = [
    { name: 'Shop All', href: '/shop' },
    { name: 'Age Worlds', href: '/#age-worlds' },
    { name: 'Brand Story', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fffdfa]/95 backdrop-blur-md border-b border-[#0b574f]/10 transition-all text-[#0e2a27] shadow-xs">
      {/* Top Announcement Bar in Wooobey Vibrant Gradient */}
      <div className="bg-gradient-to-r from-[#0b574f] via-[#7048e8] to-[#f25c38] text-white py-2 px-4 text-center text-[10px] sm:text-xs font-bold tracking-wide flex items-center justify-center gap-2 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-[#ffb703] animate-pulse" />
        <span className="font-heading tracking-wider">
          WELCOME TO WOOOBEY! • SCREEN-FREE SMART PLAY & STEM TOYS ACROSS INDIA • FREE DELIVERY OVER ₹999
        </span>
        <span className="hidden md:inline bg-white/20 text-[#fff9e6] px-2 py-0.5 rounded-full text-[10px] uppercase font-black">
          CODE: WOOOBEY10
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Wooobey Official Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-11 sm:h-13 w-36 sm:w-44 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Wooobey — Play. Learn. Create."
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest uppercase font-heading">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-all duration-200 hover:text-[#f25c38] hover:-translate-y-0.5 ${
                    isActive
                      ? 'text-[#f25c38] underline underline-offset-8 decoration-2 decoration-[#ffb703]'
                      : 'text-[#0b574f]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-2 text-[#0b574f] hover:text-[#f25c38] hover:bg-[#fef0ec] rounded-full transition-all flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider font-heading"
              aria-label="Search products"
              title="Search products"
            >
              <Search className="w-4 h-4 text-[#f25c38]" />
              <span className="hidden lg:inline text-[11px]">Search</span>
            </button>

            {/* Account Icon */}
            <Link
              href="/account"
              className="p-2 sm:px-3 sm:py-2 text-[#0b574f] hover:text-[#f25c38] hover:bg-[#fef0ec] rounded-full transition-all hidden sm:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider font-heading"
              aria-label="My Account"
              title="My Account"
            >
              <User className="w-4 h-4 text-[#0b574f]" />
              <span className="hidden lg:inline text-[11px]">Account</span>
            </Link>

            {/* Bag Cart Pill Button in Wooobey Coral/Teal style */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative py-2 px-3 sm:px-4 text-white bg-gradient-to-r from-[#0b574f] to-[#0e5b53] hover:from-[#f25c38] hover:to-[#ff5e36] rounded-full transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest shadow-md hover:shadow-lg hover:scale-105 group font-heading"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#ffb703] group-hover:text-white transition-colors" />
              <span>Cart ({cartCount})</span>
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#0b574f] hover:bg-[#e6f4f2] rounded-xl border border-[#0b574f]/20"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#f25c38]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fffdfa] border-b border-[#0b574f]/15 px-6 py-6 space-y-4 shadow-xl text-[#0e2a27] animate-fade-in">
          <Link
            href="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-[#0b574f] hover:text-[#f25c38] font-heading"
          >
            Shop All Toys
          </Link>

          {/* Shop by Age in Mobile Menu */}
          <div className="pt-2 pb-1 border-t border-[#0b574f]/10">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 font-heading">
              Shop by Age Worlds
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-heading">
              <Link
                href="/shop?age=0-3%20Years"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-white border border-[#0b574f]/15 text-[#0b574f] font-semibold hover:border-[#f25c38] flex items-center gap-1.5 shadow-2xs"
              >
                <span>👶</span>
                <span>0 - 3 Years</span>
              </Link>
              <Link
                href="/shop?age=3-5%20Years"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-white border border-[#0b574f]/15 text-[#0b574f] font-semibold hover:border-[#f25c38] flex items-center gap-1.5 shadow-2xs"
              >
                <span>🎨</span>
                <span>3 - 5 Years</span>
              </Link>
              <Link
                href="/shop?age=6-8%20Years"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-white border border-[#0b574f]/15 text-[#0b574f] font-semibold hover:border-[#f25c38] flex items-center gap-1.5 shadow-2xs"
              >
                <span>🧩</span>
                <span>6 - 8 Years</span>
              </Link>
              <Link
                href="/shop?age=8%2B%20Years"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-white border border-[#0b574f]/15 text-[#0b574f] font-semibold hover:border-[#f25c38] flex items-center gap-1.5 shadow-2xs"
              >
                <span>🔬</span>
                <span>8+ Years</span>
              </Link>
            </div>
          </div>
          <Link
            href="/account"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-700 hover:text-[#f25c38] font-heading"
          >
            My Account & Orders
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-700 hover:text-[#f25c38] font-heading"
          >
            About Wooobey
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-700 hover:text-[#f25c38] font-heading"
          >
            Contact & WhatsApp Support
          </Link>
          <div className="pt-4 border-t border-[#0b574f]/10 flex justify-between items-center text-xs text-slate-500 font-medium">
            <span className="font-heading font-black text-[#0b574f]">Wooobey</span>
            <span className="text-[11px] font-bold text-[#f25c38]">Play. Learn. Create.</span>
          </div>
        </div>
      )}
    </header>
  );
}

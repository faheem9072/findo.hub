'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function Navbar({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();

  const navLinks = [
    { name: 'Catalog', href: '/shop' },
    { name: 'Age Groups', href: '/#age-worlds' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all text-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* FINDO Logo with Squirrel Mascot */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[#5a9e2f] shadow-sm bg-white p-0.5 group-hover:scale-105 transition-transform">
              <Image
                src="/logo.png"
                alt="FINDO — Find Smart Play"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none">
                FINDO<span className="text-[#5a9e2f]">.</span>
              </span>
              <span className="text-[9px] tracking-widest text-[#5a9e2f] font-bold uppercase mt-1 hidden sm:block">
                Find Smart Play
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest uppercase">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors hover:text-[#5a9e2f] ${
                    isActive ? 'text-[#5a9e2f] underline underline-offset-8 decoration-2' : 'text-slate-600'
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
              className="p-2 sm:px-3 sm:py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
              aria-label="Search products"
              title="Search products"
            >
              <Search className="w-4 h-4 text-[#5a9e2f]" />
              <span className="hidden lg:inline text-[11px]">Search</span>
            </button>

            {/* Account Icon */}
            <Link
              href="/account"
              className="p-2 sm:px-3 sm:py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all hidden sm:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
              aria-label="My Account"
              title="My Account"
            >
              <User className="w-4 h-4 text-[#5a9e2f]" />
              <span className="hidden lg:inline text-[11px]">Account</span>
            </Link>

            {/* Bag Cart Pill Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative py-2 px-3 sm:px-4 text-slate-900 hover:text-white hover:bg-[#5a9e2f] rounded-full border border-slate-200 transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-white shadow-xs group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#5a9e2f] group-hover:text-white transition-colors" />
              <span>Bag ({cartCount})</span>
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl text-slate-800 animate-fade-in">
          <Link
            href="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-slate-900 hover:text-[#5a9e2f]"
          >
            Shop All Products
          </Link>

          {/* Shop by Age in Mobile Menu */}
          <div className="pt-2 pb-1 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Shop by Age Worlds
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/shop?age=0-3%20Years"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-semibold hover:border-[#5a9e2f] flex items-center gap-1.5"
              >
                <span>👶</span>
                <span>0 - 3 Years</span>
              </Link>
              <Link
                href="/shop?age=3-5%20Years"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-semibold hover:border-[#5a9e2f] flex items-center gap-1.5"
              >
                <span>🎨</span>
                <span>3 - 5 Years</span>
              </Link>
              <Link
                href="/shop?age=6-8%20Years"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-semibold hover:border-[#5a9e2f] flex items-center gap-1.5"
              >
                <span>🧩</span>
                <span>6 - 8 Years</span>
              </Link>
              <Link
                href="/shop?age=8%2B%20Years"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-semibold hover:border-[#5a9e2f] flex items-center gap-1.5"
              >
                <span>🔬</span>
                <span>8+ Years</span>
              </Link>
            </div>
          </div>
          <Link
            href="/account"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-700 hover:text-[#5a9e2f]"
          >
            My Account & Orders
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-700 hover:text-[#5a9e2f]"
          >
            About FINDO
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-700 hover:text-[#5a9e2f]"
          >
            Contact & WhatsApp Support
          </Link>
          <a
            href="https://www.instagram.com/findo.hub?psln=MWx5bGlnYzVjdXAwYQ=="
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#5a9e2f]"
          >
            <svg className="w-4 h-4 text-[#5a9e2f] fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Instagram (@findo.hub)</span>
          </a>
          <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
            <span>FINDO • Find Smart Play</span>
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="underline hover:text-[#5a9e2f]">
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

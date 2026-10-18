import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0d1b1e] text-slate-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#5a9e2f]/50">
                <Image src="/logo.jpeg" alt="FINDO Logo" fill className="object-cover" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                FINDO<span className="text-[#5a9e2f]">.</span>
              </span>
            </Link>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Thoughtfully chosen products for curious kids.
            </p>

            <div className="pt-2 flex items-center gap-4 text-slate-400">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs hover:text-[#5a9e2f] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#5a9e2f]" />
                <span>WhatsApp</span>
              </a>
              <a
                href="mailto:support@findo.com"
                className="inline-flex items-center gap-2 text-xs hover:text-[#5a9e2f] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#5a9e2f]" />
                <span>Email Support</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs hover:text-[#5a9e2f] transition-colors"
              >
                <svg className="w-4 h-4 text-[#5a9e2f] fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/shop" className="hover:text-white transition-colors">Shop All Products</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Findo</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Help & Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/shipping-returns" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/admin/login" className="text-slate-500 hover:text-slate-300 transition-colors">Admin Login</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} FINDO. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>Designed and Developed by</span>
            <span className="text-[#5a9e2f] font-bold tracking-wider">KORE</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

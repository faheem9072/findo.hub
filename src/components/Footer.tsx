import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Mail, Phone, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#072421] border-t border-[#0b574f]/30 text-slate-300 pt-16 pb-40 sm:pb-16 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7048e8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#f25c38]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block group">
              <div className="relative h-12 w-44 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo-white.png"
                  alt="Wooobey — Play. Learn. Create."
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm font-medium">
              Every little discovery begins with a moment of curiosity. Thoughtfully curated screen-free toys, habit trackers, and STEM kits matched to your child&apos;s developmental journey.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f25c38]/15 border border-[#f25c38]/30 text-[#f25c38] text-xs font-bold font-heading">
              <Sparkles className="w-3.5 h-3.5 text-[#ffb703]" />
              <span>Keep Exploring. Keep Creating. Keep Growing.</span>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-2.5 text-slate-300">
              <a
                href="https://wa.me/917025387764"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs hover:text-[#ffb703] transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#ffb703]" />
                <span>+91 70253 87764 (WhatsApp)</span>
              </a>
              <a
                href="tel:+919539740449"
                className="inline-flex items-center gap-1.5 text-xs hover:text-[#ffb703] transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-[#f25c38]" />
                <span>+91 95397 40449</span>
              </a>
              <a
                href="mailto:infowooobey@gmail.com"
                className="inline-flex items-center gap-1.5 text-xs hover:text-[#ffb703] transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 font-medium"
              >
                <Mail className="w-3.5 h-3.5 text-[#7048e8]" />
                <span>infowooobey@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#ffb703] mb-4 font-heading">Explore Toys</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link href="/shop" className="hover:text-white transition-colors">Shop All Products</Link></li>
              <li><Link href="/#age-worlds" className="hover:text-white transition-colors">Age Worlds (0 - 8+ Y)</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Wooobey</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#ffb703] mb-4 font-heading">Help & Legal</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link href="/shipping-returns" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/account" className="hover:text-white transition-colors">Track Order</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Directly Below It "Designed and Developed by KORE" */}
        <div className="pt-8 flex flex-col items-center justify-center text-center space-y-2">
          <p className="text-xs text-slate-400 font-medium">
            © {new Date().getFullYear()} WOOOBEY. All rights reserved.
          </p>
          <p className="flex items-center justify-center gap-2 text-xs text-slate-300 font-medium">
            <span>Designed and Developed by</span>
            <span className="text-[#ffb703] font-black tracking-widest text-sm uppercase font-heading">KORE</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      q: 'Are Findo products safe for toddlers and infants?',
      a: 'Yes, 100%! All Findo products are crafted using non-toxic, BPA-free, food-grade materials. Toys pass strict ASTM and EN71 child safety standards with zero sharp edges.',
    },
    {
      q: 'How does the 360° Anti-Spill Gyro Bowl work?',
      a: 'The Gyro Bowl incorporates clever gyroscopic center-of-gravity technology. The inner bowl rotates 360 degrees in response to movement, maintaining an upright orientation regardless of how your child tilts or turns the outer ring.',
    },
    {
      q: 'Are batteries included with electronic toys like the LCD Tablet & Flashcards?',
      a: 'Yes! The LCD Magic Tablet comes pre-installed with a replaceable CR2025 coin cell battery. The Talking Flashcard reader and Silicone Duck Night Light include built-in rechargeable Lithium batteries with USB charging cables provided.',
    },
    {
      q: 'What are the delivery timelines across India?',
      a: 'We deliver within 2 to 4 business days to metro cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata) and 4 to 7 business days to all other pin codes in India.',
    },
    {
      q: 'What is your replacement policy if an item arrives damaged?',
      a: 'We offer a 7-day hassle-free replacement guarantee! Simply share a photo/video of the damaged package with our support team at support@findostore.com or WhatsApp +91 98765 43210, and we will ship a fresh replacement free of charge.',
    },
    {
      q: 'Do you offer Cash on Delivery (COD)?',
      a: 'Yes, Cash on Delivery is available across 25,000+ pin codes in India! You can also pay online securely via UPI, Credit/Debit Cards, or NetBanking.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-[#5a9e2f] uppercase tracking-widest bg-[#eef8ea] px-3.5 py-1.5 rounded-full inline-block">
          Got Questions?
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b1e]">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Find answers to common questions about materials, shipping, battery life, and return policies.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search FAQs (e.g. safety, battery, COD, replacement)..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-[#0d1b1e] shadow-xs focus:outline-none focus:border-[#5a9e2f]"
        />
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between font-bold text-[#0d1b1e] text-sm hover:text-[#5a9e2f] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                    isOpen ? 'rotate-180 text-[#5a9e2f]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-[#fafbf8]">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Shipping & Returns Policy — Findo',
  description: 'Read Findo shipping timelines across India, 7-day easy replacement policy, and refund guidelines.',
};

export default function ShippingReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-[#5a9e2f] uppercase tracking-widest bg-[#eef8ea] px-3.5 py-1.5 rounded-full inline-block">
          Transparent Guarantees
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b1e]">
          Shipping & Returns Policy
        </h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Everything you need to know about how we package, ship, and support your purchases at Findo.
        </p>
      </div>

      {/* Shipping Section */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-[#5a9e2f] text-white flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0d1b1e]">Shipping Policy</h2>
            <p className="text-xs text-slate-500">Pan-India Express Delivery Details</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <div className="p-4 bg-[#eef8ea] rounded-2xl flex items-center justify-between text-[#0d1b1e] font-bold">
            <span>Free Express Delivery:</span>
            <span className="text-[#5a9e2f]">On all orders above ₹999</span>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-sm text-[#0d1b1e]">Delivery Timelines:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Metro Cities (Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata):</strong> 2 to 4 business days.</li>
              <li><strong>Rest of India:</strong> 4 to 7 business days.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-sm text-[#0d1b1e]">Order Dispatch:</h4>
            <p>Orders placed before 2:00 PM IST are dispatched on the same business day. Tracking details with live SMS/Email updates are sent upon shipment.</p>
          </div>
        </div>
      </div>

      {/* Returns & Replacement Section */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-[#0d1b1e] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0d1b1e]">7-Day Easy Replacement Policy</h2>
            <p className="text-xs text-slate-500">Hassle-free replacement for defective or damaged items</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p>
            Your satisfaction is our top priority. If you receive a product that is damaged in transit, defective, or missing components, you are covered by our <strong>7-Day Easy Replacement Policy</strong>.
          </p>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-sm text-[#0d1b1e]">How to Request a Replacement:</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Take a quick photo or 10-second video showing the issue.</li>
              <li>Email us at <strong>support@findostore.com</strong> or WhatsApp us at <strong>+91 98765 43210</strong> within 7 days of delivery.</li>
              <li>Our team will arrange a free reverse pickup and send a brand-new replacement immediately!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

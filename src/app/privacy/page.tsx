import React from 'react';
import Link from 'next/link';
import { Lock, ShieldCheck, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — Findo',
  description: 'Understand how Findo collects, protects, and uses customer information securely.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-[#5a9e2f] uppercase tracking-widest bg-[#eef8ea] px-3.5 py-1.5 rounded-full inline-block">
          Data Protection & Trust
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b1e]">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Effective Date: <strong className="text-slate-700">02 November 2026</strong>
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0d1b1e]">Your Privacy Is Our Priority</h2>
            <p className="text-xs text-slate-400">Findo (getfindo.in) Customer Data Protection Commitment</p>
          </div>
        </div>

        <p>
          Findo respects the privacy of every parent, guardian, and customer who visits our store.
          We are committed to maintaining the confidentiality, security, and accuracy of your personal data.
        </p>

        <div className="space-y-2">
          <h3 className="font-bold text-[#0d1b1e] text-sm">1. Information We Collect</h3>
          <p>When you place an order or contact us, we may collect:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Customer Name:</strong> To address you and dispatch orders.</li>
            <li><strong>Mobile Phone Number:</strong> For delivery coordination, OTPs, and courier SMS/WhatsApp tracking.</li>
            <li><strong>Email Address:</strong> For order receipts, digital invoices, and support updates.</li>
            <li><strong>Shipping & Billing Address:</strong> For doorstep package delivery.</li>
            <li><strong>Order Details & Payment Confirmation:</strong> Transaction reference IDs for billing.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-[#0d1b1e] text-sm">2. 100% Secure Payment Processing</h3>
          <p>
            All online transactions on Findo are processed through authorized, PCI-DSS compliant payment gateways
            (such as Razorpay) with 256-bit SSL encryption. <strong>Findo does not store or process your complete credit/debit card numbers, CVVs, or bank net-banking passwords.</strong>
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-[#0d1b1e] text-sm">3. We Do Not Sell Your Data</h3>
          <p>
            We strictly do not sell, rent, trade, or share your personal information with third-party advertisers. Information is only shared with logistics partners (couriers) and payment gateways to the extent necessary to deliver your order.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-[#0d1b1e] text-sm">4. Contact & Support</h3>
          <p>For any privacy queries, please reach out directly:</p>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
            <p><strong>Email:</strong> <a href="mailto:findohub7@gmail.com" className="text-[#5a9e2f] hover:underline">findohub7@gmail.com</a></p>
            <p><strong>WhatsApp Support:</strong> <a href="https://wa.me/917025387764" className="text-[#5a9e2f] hover:underline">+91 70253 87764</a></p>
            <p><strong>Grievance Officer:</strong> Refnise — +91 95397 40449</p>
          </div>
        </div>

        <div className="pt-2">
          <Link href="/terms" className="text-xs font-bold text-[#5a9e2f] hover:underline">
            ← View Complete Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
}

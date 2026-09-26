'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Query',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit message');

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: 'General Query', message: '' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#5a9e2f] uppercase tracking-widest bg-[#eef8ea] px-3.5 py-1.5 rounded-full inline-block">
          Parent Support Team
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b1e]">
          We&apos;re Here To Help You
        </h1>
        <p className="text-sm text-slate-500">
          Have a question about a product, delivery timeline, or bulk order? Send us a message and our support team will respond within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Information Sidebar */}
        <div className="lg:col-span-5 bg-[#0d1b1e] text-white p-8 rounded-3xl space-y-8 relative overflow-hidden shadow-xl border border-emerald-950/40">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Contact Details</h2>
            <p className="text-xs text-slate-300">
              Reach out to us directly through any of our support channels.
            </p>
          </div>

          <div className="space-y-6 text-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#5a9e2f] text-white flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-emerald-400 uppercase">Email Support</h4>
                <p className="text-sm font-semibold text-white">support@findostore.com</p>
                <p className="text-[11px] text-slate-400">Response within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#5a9e2f] text-white flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-emerald-400 uppercase">Phone & WhatsApp</h4>
                <p className="text-sm font-semibold text-white">+91 98765 43210</p>
                <p className="text-[11px] text-slate-400">Mon - Sat, 9am - 7pm IST</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#5a9e2f] text-white flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-emerald-400 uppercase">Headquarters</h4>
                <p className="text-xs text-slate-300">Findo Kids Brand HQ, Tech Park, Powai, Mumbai - 400076, MH, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          {success ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-[#eef8ea] text-[#5a9e2f] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#0d1b1e]">Message Received!</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Thank you for contacting Findo. Our support team has logged your query and will reply via email shortly.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="py-2.5 px-6 rounded-xl bg-[#5a9e2f] text-white font-bold text-xs hover:bg-[#488224]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-[#0d1b1e]">Send Us a Message</h3>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0d1b1e]">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#5a9e2f]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0d1b1e]">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rahul@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#5a9e2f]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0d1b1e]">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#5a9e2f]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0d1b1e]">Subject *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#5a9e2f]"
                  >
                    <option value="General Query">General Query</option>
                    <option value="Order Status">Order Status Inquiry</option>
                    <option value="Product Replacement">Returns / Replacement</option>
                    <option value="Bulk Order">Bulk / Gift Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0d1b1e]">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you today?"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#5a9e2f]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#5a9e2f] hover:bg-[#488224] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Query</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

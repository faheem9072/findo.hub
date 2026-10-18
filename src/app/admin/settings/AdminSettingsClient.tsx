'use client';

import React, { useState } from 'react';
import { Save, Check, Settings, Truck, PhoneCall, Mail, Bell } from 'lucide-react';

export default function AdminSettingsClient({ initialSettings }: { initialSettings: any }) {
  const [whatsappNumber, setWhatsappNumber] = useState(initialSettings.whatsappNumber || '');
  const [supportEmail, setSupportEmail] = useState(initialSettings.supportEmail || '');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(initialSettings.freeShippingThreshold || 999);
  const [flatShippingRate, setFlatShippingRate] = useState(initialSettings.flatShippingRate || 79);
  const [storeNotice, setStoreNotice] = useState(initialSettings.storeNotice || '');

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          whatsappNumber,
          supportEmail,
          freeShippingThreshold,
          flatShippingRate,
          storeNotice,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save settings');

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-extrabold text-[#0d1b1e]">Store Settings</h1>
        <p className="text-xs text-slate-500">Configure global shipping rates, contact info, and site banners.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Support Contact Settings */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-extrabold text-[#0d1b1e] flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-[#5a9e2f]" />
            <span>Support & Contact Channels</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Support Number</label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5a9e2f] outline-none"
                placeholder="+919876543210"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Customer Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5a9e2f] outline-none"
                placeholder="support@findo.com"
              />
            </div>
          </div>
        </div>

        {/* Shipping Settings */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-extrabold text-[#0d1b1e] flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#5a9e2f]" />
            <span>Shipping Policy Rules</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Free Shipping Threshold (₹)</label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5a9e2f] outline-none"
              />
              <p className="text-[10px] text-slate-400 mt-1">Orders at or above this subtotal get free shipping.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Flat Standard Shipping Rate (₹)</label>
              <input
                type="number"
                value={flatShippingRate}
                onChange={(e) => setFlatShippingRate(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5a9e2f] outline-none"
              />
              <p className="text-[10px] text-slate-400 mt-1">Applied when order total is below threshold.</p>
            </div>
          </div>
        </div>

        {/* Announcement Banner */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-extrabold text-[#0d1b1e] flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#5a9e2f]" />
            <span>Store Announcement Notice</span>
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Top Announcement Bar Text</label>
            <input
              type="text"
              value={storeNotice}
              onChange={(e) => setStoreNotice(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5a9e2f] outline-none"
              placeholder="e.g. Free Shipping across India on orders above ₹999!"
            />
          </div>
        </div>

        {error && <p className="text-xs font-bold text-red-600">{error}</p>}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="py-3 px-8 rounded-xl bg-[#5a9e2f] hover:bg-[#488224] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all disabled:opacity-50"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Settings Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Check, Settings, Truck, PhoneCall, Mail, Bell, Lock, KeyRound, ShieldCheck } from 'lucide-react';

export default function AdminSettingsClient({ initialSettings }: { initialSettings: any }) {
  const router = useRouter();
  const [whatsappNumber, setWhatsappNumber] = useState(initialSettings.whatsappNumber || '');
  const [supportEmail, setSupportEmail] = useState(initialSettings.supportEmail || '');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(initialSettings.freeShippingThreshold ?? 0);
  const [flatShippingRate, setFlatShippingRate] = useState(initialSettings.flatShippingRate ?? 0);
  const [storeNotice, setStoreNotice] = useState(initialSettings.storeNotice || '');

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwdUpdating, setPwdUpdating] = useState(false);
  const [pwdMsg, setPwdMsg] = useState('');
  const [pwdError, setPwdError] = useState('');

  React.useEffect(() => {
    fetch('/api/settings', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data?.settings) {
          if (data.settings.supportEmail) setSupportEmail(data.settings.supportEmail);
          if (data.settings.whatsappNumber) setWhatsappNumber(data.settings.whatsappNumber);
          if (typeof data.settings.freeShippingThreshold === 'number') {
            setFreeShippingThreshold(data.settings.freeShippingThreshold);
          }
          if (typeof data.settings.flatShippingRate === 'number') {
            setFlatShippingRate(data.settings.flatShippingRate);
          }
          if (data.settings.storeNotice !== undefined) {
            setStoreNotice(data.settings.storeNotice || '');
          }
        }
      })
      .catch((err) => console.error('Failed to sync settings in admin client:', err));
  }, []);

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
          freeShippingThreshold: Number(freeShippingThreshold),
          flatShippingRate: Number(flatShippingRate),
          storeNotice,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save settings');

      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdUpdating(true);
    setPwdMsg('');
    setPwdError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update password');
      setPwdMsg('Admin password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      setPwdError(err.message || 'Failed to update password');
    } finally {
      setPwdUpdating(false);
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
                placeholder="+917025387764"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Customer Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5a9e2f] outline-none"
                placeholder="findohub7@gmail.com"
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
              <p className="text-[10px] text-slate-400 mt-1">Orders at or above this subtotal get free shipping (0 = all orders qualify).</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Flat Standard Shipping Rate (₹)</label>
              <input
                type="number"
                value={flatShippingRate}
                onChange={(e) => setFlatShippingRate(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5a9e2f] outline-none"
              />
              <p className="text-[10px] text-slate-400 mt-1">Set to 0 for storewide 100% Free Shipping.</p>
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
              placeholder="e.g. 🎉 FREE SHIPPING ALL OVER INDIA ON ALL ORDERS!"
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

      {/* Admin Security & Password Change */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 pt-6 border-t-2 border-t-slate-100">
        <div>
          <h2 className="text-base font-extrabold text-[#0d1b1e] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#5a9e2f]" />
            <span>Admin Security & Password Change</span>
          </h2>
          <p className="text-xs text-slate-500">
            Update your admin portal login password. Never share your password or Master Security PIN.
          </p>
        </div>

        <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
          {pwdMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold">
              {pwdMsg}
            </div>
          )}

          {pwdError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-bold">
              {pwdError}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Current Password</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5a9e2f] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">New Strong Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5a9e2f] outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={pwdUpdating}
            className="py-2.5 px-6 rounded-xl bg-[#0d1b1e] hover:bg-[#1a3237] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all disabled:opacity-50"
          >
            <Lock className="w-3.5 h-3.5 text-[#5a9e2f]" />
            <span>{pwdUpdating ? 'Updating Password...' : 'Update Admin Password'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

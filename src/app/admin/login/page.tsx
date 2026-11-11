'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound, AlertTriangle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityPin, setSecurityPin] = useState('');
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Unlock readOnly after component mounts so browser autofill cannot inject values on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReadOnly(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          securityPin: securityPin.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials or Security PIN');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Access Denied. Check your credentials and security PIN.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070e10] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#5a9e2f]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#72bf44]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl space-y-6 relative z-10 border border-slate-200">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#5a9e2f] mx-auto shadow-md">
            <Image src="/logo.jpeg" alt="Findo Logo" fill className="object-cover" />
          </div>
          <h1 className="text-2xl font-black text-[#0d1b1e] tracking-tight">Findo Admin Access</h1>
          <p className="text-xs text-slate-500 font-medium">
            Authorized store administrators only.
          </p>
        </div>

        {/* Security Alert Badge */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="text-[11px] leading-tight">
            Protected area. Both valid credentials and the Admin Security PIN are required.
          </span>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl text-center animate-in shake duration-300">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
          {/* Decoy inputs to trap and neutralize browser autofill */}
          <input
            type="text"
            name="fakeusernameremembered"
            tabIndex={-1}
            aria-hidden="true"
            className="opacity-0 absolute -left-[9999px] w-0 h-0 pointer-events-none"
          />
          <input
            type="password"
            name="fakepasswordremembered"
            tabIndex={-1}
            aria-hidden="true"
            className="opacity-0 absolute -left-[9999px] w-0 h-0 pointer-events-none"
          />

          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0d1b1e] uppercase tracking-wider flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-[#5a9e2f]" /> Admin Email
            </label>
            <input
              type="email"
              required
              readOnly={isReadOnly}
              onFocus={() => setIsReadOnly(false)}
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-[#0d1b1e] focus:outline-none focus:border-[#5a9e2f]"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0d1b1e] uppercase tracking-wider flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-[#5a9e2f]" /> Admin Password
            </label>
            <input
              type="password"
              required
              readOnly={isReadOnly}
              onFocus={() => setIsReadOnly(false)}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-[#0d1b1e] focus:outline-none focus:border-[#5a9e2f]"
            />
          </div>

          {/* Admin Security PIN Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0d1b1e] uppercase tracking-wider flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-[#5a9e2f]" /> Security Passcode / PIN
            </label>
            <input
              type="password"
              required
              maxLength={10}
              readOnly={isReadOnly}
              onFocus={() => setIsReadOnly(false)}
              autoComplete="new-password"
              value={securityPin}
              onChange={(e) => setSecurityPin(e.target.value)}
              placeholder="Enter Master Security PIN"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold tracking-widest text-[#0d1b1e] focus:outline-none focus:border-[#5a9e2f]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-[#5a9e2f] hover:bg-[#488224] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? (
              <span>Verifying Credentials...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Verify & Enter Admin Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-[10px] text-center text-slate-400">
          Findo Admin Security System • Unauthorized attempts are strictly prohibited.
        </p>
      </div>
    </div>
  );
}

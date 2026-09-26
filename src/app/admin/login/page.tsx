'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@findo.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1b1e] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#5a9e2f]/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#72bf44]/15 rounded-full blur-3xl" />

      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl space-y-6 relative z-10 border border-slate-200">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#5a9e2f] mx-auto shadow-md">
            <Image src="/logo.jpeg" alt="Findo Logo" fill className="object-cover" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0d1b1e]">Findo Admin Portal</h1>
          <p className="text-xs text-slate-500">Log in to manage products, orders, and sales</p>
        </div>

        {/* Demo Credentials Box */}
        <div className="p-3.5 bg-[#eef8ea] border border-emerald-200 rounded-2xl text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-[#5a9e2f]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Default Seed Credentials:</span>
          </div>
          <p className="text-[#0d1b1e]">
            <strong>Email:</strong> admin@findo.com
          </p>
          <p className="text-[#0d1b1e]">
            <strong>Password:</strong> admin123
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0d1b1e] uppercase tracking-wider flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-[#5a9e2f]" /> Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@findo.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-[#0d1b1e] focus:outline-none focus:border-[#5a9e2f]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0d1b1e] uppercase tracking-wider flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-[#5a9e2f]" /> Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-[#0d1b1e] focus:outline-none focus:border-[#5a9e2f]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-[#5a9e2f] hover:bg-[#488224] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Admin Panel</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

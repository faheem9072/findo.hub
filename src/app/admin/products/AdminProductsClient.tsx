'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Edit3,
  Edit2,
  Trash2,
  Search,
  Star,
  ExternalLink,
  Check,
  AlertCircle,
  IndianRupee,
  Loader2,
} from 'lucide-react';

export default function AdminProductsClient({
  initialProducts,
  categories,
}: {
  initialProducts: any[];
  categories: any[];
}) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Price change states
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [priceInput, setPriceInput] = useState<string>('');
  const [compareAtPriceInput, setCompareAtPriceInput] = useState<string>('');
  const [savingPriceId, setSavingPriceId] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [priceSuccessId, setPriceSuccessId] = useState<string | null>(null);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleStartEditPrice = (product: any, e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setEditingPriceId(product.id);
    setPriceInput(String(product.price ?? ''));
    setCompareAtPriceInput(product.compareAtPrice != null ? String(product.compareAtPrice) : '');
    setPriceError(null);
  };

  const handleCancelEditPrice = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setEditingPriceId(null);
    setPriceInput('');
    setCompareAtPriceInput('');
    setPriceError(null);
  };

  const handleSavePrice = async (productId: string, e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const cleanPrice = priceInput.trim();
    if (!cleanPrice) {
      setPriceError('Selling price is required');
      return;
    }

    const numPrice = parseFloat(cleanPrice);
    if (isNaN(numPrice) || numPrice < 0) {
      setPriceError('Enter a valid price (>= 0)');
      return;
    }

    let numCompare: number | null = null;
    const cleanCompare = compareAtPriceInput.trim();
    if (cleanCompare !== '') {
      const val = parseFloat(cleanCompare);
      if (isNaN(val) || val < 0) {
        setPriceError('MRP must be a valid number (>= 0)');
        return;
      }
      numCompare = val;
    }

    setSavingPriceId(productId);
    setPriceError(null);

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: numPrice,
          compareAtPrice: numCompare,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update price');
      }

      // Optimistic update of local product list
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId
            ? {
                ...p,
                price: numPrice,
                compareAtPrice: numCompare,
              }
            : p
        )
      );

      setEditingPriceId(null);
      setPriceSuccessId(productId);
      setTimeout(() => {
        setPriceSuccessId((curr) => (curr === productId ? null : curr));
      }, 3000);

      router.refresh();
    } catch (err: any) {
      console.error(err);
      setPriceError(err.message || 'Error updating price');
    } finally {
      setSavingPriceId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}" from the store?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        router.refresh();
      } else {
        alert('Failed to delete product');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting product');
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleFeatured = async (product: any) => {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !product.isFeatured }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, isFeatured: !p.isFeatured } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0d1b1e]">Product Inventory Management</h1>
          <p className="text-xs text-slate-500">
            Add, edit, or adjust prices live on the Findo storefront.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="py-2.5 px-5 rounded-xl bg-[#5a9e2f] hover:bg-[#488224] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product title or category..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#5a9e2f]"
          />
        </div>
        <span className="text-xs font-bold text-slate-500">
          Total Products: <strong className="text-[#0d1b1e]">{filteredProducts.length}</strong>
        </span>
      </div>

      {/* Mobile View: Product Cards */}
      <div className="md:hidden space-y-3">
        {filteredProducts.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
            No products found matching your search.
          </div>
        ) : (
          filteredProducts.map((p) => {
            let img = '/logo.jpeg';
            try {
              const imgs = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
              if (Array.isArray(imgs) && imgs.length > 0) img = imgs[0];
            } catch {}

            return (
              <div key={p.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex gap-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-50">
                    <Image src={img} alt={p.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${p.slug}`}
                        target="_blank"
                        className="font-bold text-[#0d1b1e] text-xs leading-snug hover:text-[#5a9e2f] transition-colors line-clamp-2"
                      >
                        {p.name}
                      </Link>
                      <button
                        onClick={() => handleToggleFeatured(p)}
                        className={`p-1.5 rounded-lg border text-xs shrink-0 transition-all ${
                          p.isFeatured
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-slate-100 text-slate-400 border-slate-200'
                        }`}
                        title="Toggle Featured"
                      >
                        <Star className={`w-3.5 h-3.5 ${p.isFeatured ? 'fill-amber-400 text-amber-500' : ''}`} />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-[#eef8ea] text-[#5a9e2f] px-2 py-0.5 rounded-md text-[9px] font-bold">
                        {p.category?.name || 'General'}
                      </span>
                      <span className="text-[10px] text-slate-400">{p.ageRange}</span>
                    </div>
                  </div>
                </div>

                {/* Price and Actions Section (Mobile) */}
                <div className="pt-2 border-t border-slate-100">
                  {editingPriceId === p.id ? (
                    <div className="space-y-2 p-3 bg-emerald-50/90 rounded-xl border border-emerald-300">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-700 block mb-0.5">
                            Selling Price (₹) *
                          </label>
                          <div className="relative">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">
                              ₹
                            </span>
                            <input
                              type="number"
                              step="any"
                              min="0"
                              value={priceInput}
                              onChange={(e) => {
                                setPriceInput(e.target.value);
                                setPriceError(null);
                              }}
                              placeholder="599"
                              className="w-full pl-6 pr-2 py-1.5 text-xs font-bold bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#5a9e2f]"
                              autoFocus
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">
                            MRP / Strike (₹)
                          </label>
                          <div className="relative">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">
                              ₹
                            </span>
                            <input
                              type="number"
                              step="any"
                              min="0"
                              value={compareAtPriceInput}
                              onChange={(e) => {
                                setCompareAtPriceInput(e.target.value);
                                setPriceError(null);
                              }}
                              placeholder="Optional"
                              className="w-full pl-6 pr-2 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#5a9e2f]"
                            />
                          </div>
                        </div>
                      </div>

                      {priceError && (
                        <p className="text-[10px] font-bold text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{priceError}</span>
                        </p>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleSavePrice(p.id, e)}
                          disabled={savingPriceId === p.id}
                          className="flex-1 py-1.5 px-3 bg-[#5a9e2f] hover:bg-[#488224] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 shadow-xs cursor-pointer"
                        >
                          {savingPriceId === p.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Check className="w-3.5 h-3.5" />
                          )}
                          <span>{savingPriceId === p.id ? 'Updating...' : 'Save Price'}</span>
                        </button>
                        <button
                          onClick={(e) => handleCancelEditPrice(e)}
                          disabled={savingPriceId === p.id}
                          className="py-1.5 px-3 bg-white hover:bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg border border-slate-200 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="font-extrabold text-[#0d1b1e] text-sm">₹{p.price}</span>
                        {p.compareAtPrice && (
                          <span className="text-[10px] text-slate-400 line-through">₹{p.compareAtPrice}</span>
                        )}
                        <span
                          className={`ml-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            p.stock > 10
                              ? 'bg-emerald-100 text-emerald-800'
                              : p.stock > 0
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {p.stock} in stock
                        </span>
                        {priceSuccessId === p.id && (
                          <span className="ml-1 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">
                            <Check className="w-2.5 h-2.5" /> Live!
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => handleStartEditPrice(p, e)}
                          className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#5a9e2f] transition-colors cursor-pointer"
                          title="Change Price"
                        >
                          <IndianRupee className="w-4 h-4" />
                        </button>

                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0d1b1e] transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          disabled={deletingId === p.id}
                          className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors disabled:opacity-50 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop View: Products Table */}
      <div className="hidden md:block bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0d1b1e] text-white font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4 min-w-[210px]">Price (₹)</th>
                <th className="py-4 px-4">Stock</th>
                <th className="py-4 px-4">Featured</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-[#0d1b1e]">
              {filteredProducts.map((p) => {
                let img = '/logo.jpeg';
                try {
                  const imgs = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
                  if (Array.isArray(imgs) && imgs.length > 0) img = imgs[0];
                } catch {}

                return (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-50">
                          <Image src={img} alt={p.name} fill className="object-cover" />
                        </div>
                        <div>
                          <Link
                            href={`/products/${p.slug}`}
                            target="_blank"
                            className="font-bold text-[#0d1b1e] hover:text-[#5a9e2f] transition-colors flex items-center gap-1"
                          >
                            <span>{p.name}</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </Link>
                          <span className="text-[10px] text-slate-400">Age: {p.ageRange}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="bg-[#eef8ea] text-[#5a9e2f] px-2.5 py-1 rounded-full text-[10px] font-bold">
                        {p.category?.name || 'Uncategorized'}
                      </span>
                    </td>

                    {/* Price Column with Inline Editing */}
                    <td className="py-4 px-4">
                      {editingPriceId === p.id ? (
                        <div className="space-y-1.5 p-2.5 bg-emerald-50/90 rounded-2xl border border-emerald-300 shadow-sm max-w-[240px]">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-700 block">Selling Price (₹) *</label>
                            <div className="relative">
                              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">
                                ₹
                              </span>
                              <input
                                type="number"
                                step="any"
                                min="0"
                                value={priceInput}
                                onChange={(e) => {
                                  setPriceInput(e.target.value);
                                  setPriceError(null);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSavePrice(p.id, e);
                                  if (e.key === 'Escape') handleCancelEditPrice(e);
                                }}
                                placeholder="599"
                                className="w-full pl-6 pr-2 py-1 text-xs font-bold bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#5a9e2f] focus:ring-1 focus:ring-[#5a9e2f]"
                                autoFocus
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Original / Strike MRP (₹)</label>
                            <div className="relative">
                              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">
                                ₹
                              </span>
                              <input
                                type="number"
                                step="any"
                                min="0"
                                value={compareAtPriceInput}
                                onChange={(e) => {
                                  setCompareAtPriceInput(e.target.value);
                                  setPriceError(null);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSavePrice(p.id, e);
                                  if (e.key === 'Escape') handleCancelEditPrice(e);
                                }}
                                placeholder="Optional (e.g. 999)"
                                className="w-full pl-6 pr-2 py-1 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#5a9e2f]"
                              />
                            </div>
                          </div>

                          {priceError && (
                            <p className="text-[10px] font-bold text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 shrink-0" />
                              <span>{priceError}</span>
                            </p>
                          )}

                          <div className="flex items-center gap-1.5 pt-1">
                            <button
                              onClick={(e) => handleSavePrice(p.id, e)}
                              disabled={savingPriceId === p.id}
                              className="flex-1 py-1 px-2.5 bg-[#5a9e2f] hover:bg-[#488224] text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 transition-all disabled:opacity-50 shadow-xs cursor-pointer"
                            >
                              {savingPriceId === p.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Check className="w-3 h-3" />
                              )}
                              <span>{savingPriceId === p.id ? 'Saving...' : 'Save'}</span>
                            </button>
                            <button
                              onClick={(e) => handleCancelEditPrice(e)}
                              disabled={savingPriceId === p.id}
                              className="py-1 px-2 bg-white hover:bg-slate-100 text-slate-600 text-[11px] font-semibold rounded-lg border border-slate-200 transition-colors cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="group/price flex items-center gap-2">
                          <div>
                            <div className="font-extrabold text-sm text-[#0d1b1e] flex items-center gap-1.5">
                              <span>₹{p.price}</span>
                              {priceSuccessId === p.id && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 animate-in fade-in">
                                  <Check className="w-2.5 h-2.5" /> Live!
                                </span>
                              )}
                            </div>
                            {p.compareAtPrice && (
                              <div className="text-[10px] text-slate-400 line-through">₹{p.compareAtPrice}</div>
                            )}
                          </div>

                          <button
                            onClick={(e) => handleStartEditPrice(p, e)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[#5a9e2f] hover:bg-[#eef8ea] opacity-75 group-hover/price:opacity-100 transition-all cursor-pointer"
                            title="Change Price"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.stock > 10
                            ? 'bg-emerald-100 text-emerald-800'
                            : p.stock > 0
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {p.stock} in stock
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleFeatured(p)}
                        className={`p-1.5 rounded-lg border text-xs font-bold transition-all ${
                          p.isFeatured
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-slate-100 text-slate-400 border-slate-200'
                        }`}
                        title="Toggle Featured on Homepage"
                      >
                        <Star className={`w-4 h-4 ${p.isFeatured ? 'fill-amber-400 text-amber-500' : ''}`} />
                      </button>
                    </td>

                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={(e) => handleStartEditPrice(p, e)}
                        className="inline-flex p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#5a9e2f] transition-colors cursor-pointer"
                        title="Change Price"
                      >
                        <IndianRupee className="w-4 h-4" />
                      </button>

                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="inline-flex p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0d1b1e] transition-colors"
                        title="Edit Full Product"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        disabled={deletingId === p.id}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors disabled:opacity-50 cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


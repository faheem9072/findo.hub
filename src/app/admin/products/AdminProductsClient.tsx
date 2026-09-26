'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus, Edit3, Trash2, Search, Star, ExternalLink, Check, AlertCircle } from 'lucide-react';

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

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.name.toLowerCase().includes(search.toLowerCase())
  );

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
            Add, edit, or remove products live on the Findo storefront.
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

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0d1b1e] text-white font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Price</th>
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

                    <td className="py-4 px-4">
                      <div className="font-bold text-sm">₹{p.price}</div>
                      {p.compareAtPrice && (
                        <div className="text-[10px] text-slate-400 line-through">₹{p.compareAtPrice}</div>
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
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="inline-flex p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0d1b1e] transition-colors"
                        title="Edit Product"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        disabled={deletingId === p.id}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors disabled:opacity-50"
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

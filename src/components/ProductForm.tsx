'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Save, Plus, X, Image as ImageIcon, Sparkles } from 'lucide-react';

interface ProductFormProps {
  initialData?: any;
  categories: any[];
}

export default function ProductForm({ initialData, categories }: ProductFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialData);

  let defaultImages: string[] = [''];
  try {
    if (initialData?.images) {
      const parsed = typeof initialData.images === 'string' ? JSON.parse(initialData.images) : initialData.images;
      if (Array.isArray(parsed) && parsed.length > 0) defaultImages = parsed;
    }
  } catch {}

  let defaultBadges: string[] = ['Best Seller'];
  try {
    if (initialData?.badges) {
      const parsed = typeof initialData.badges === 'string' ? JSON.parse(initialData.badges) : initialData.badges;
      if (Array.isArray(parsed)) defaultBadges = parsed;
    }
  } catch {}

  let defaultSpecs: { key: string; value: string }[] = [{ key: 'Material', value: 'BPA-Free Food-Grade' }];
  try {
    if (initialData?.specs) {
      const parsed = typeof initialData.specs === 'string' ? JSON.parse(initialData.specs) : initialData.specs;
      if (typeof parsed === 'object') {
        defaultSpecs = Object.entries(parsed).map(([k, v]) => ({ key: k, value: String(v) }));
      }
    }
  } catch {}

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    shortDesc: initialData?.shortDesc || '',
    description: initialData?.description || '',
    price: initialData?.price || '',
    compareAtPrice: initialData?.compareAtPrice || '',
    stock: initialData?.stock || 10,
    categoryId: initialData?.categoryId || categories[0]?.id || '',
    ageRange: initialData?.ageRange || '3-8 Years',
    isFeatured: initialData?.isFeatured ?? true,
  });

  const [imageUrls, setImageUrls] = useState<string[]>(defaultImages);
  const [badges, setBadges] = useState<string[]>(defaultBadges);
  const [badgeInput, setBadgeInput] = useState('');
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>(defaultSpecs);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleImageChange = (index: number, value: string) => {
    const updated = [...imageUrls];
    updated[index] = value;
    setImageUrls(updated);
  };

  const addImageUrl = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const addBadge = () => {
    if (badgeInput.trim() && !badges.includes(badgeInput.trim())) {
      setBadges([...badges, badgeInput.trim()]);
      setBadgeInput('');
    }
  };

  const removeBadge = (badgeToRemove: string) => {
    setBadges(badges.filter((b) => b !== badgeToRemove));
  };

  const handleSpecChange = (index: number, field: 'key' | 'value', val: string) => {
    const updated = [...specs];
    updated[index][field] = val;
    setSpecs(updated);
  };

  const addSpecRow = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  const removeSpecRow = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const cleanImages = imageUrls.filter((img) => img.trim().length > 0);
    if (cleanImages.length === 0) {
      cleanImages.push('https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800');
    }

    const specsObject: Record<string, string> = {};
    specs.forEach((s) => {
      if (s.key.trim() && s.value.trim()) {
        specsObject[s.key.trim()] = s.value.trim();
      }
    });

    const payload = {
      ...formData,
      images: cleanImages,
      badges,
      specs: specsObject,
    };

    try {
      const url = isEditing ? `/api/products/${initialData.id}` : '/api/products';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save product');

      router.push('/admin/products');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#0d1b1e]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>

        <h1 className="text-xl font-extrabold text-[#0d1b1e]">
          {isEditing ? `Edit: ${initialData.name}` : 'Add New Product'}
        </h1>

        <button
          type="submit"
          disabled={loading}
          className="py-2.5 px-6 rounded-xl bg-[#5a9e2f] hover:bg-[#488224] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Saving...' : 'Save Product'}</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {/* Main Form Box */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-[#0d1b1e] uppercase tracking-wider">Product Core Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs font-bold text-[#0d1b1e]">Product Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Findo Smart Magic Drawing Tablet"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#5a9e2f]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0d1b1e]">Category *</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#5a9e2f]"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0d1b1e]">Age Group *</label>
            <select
              name="ageRange"
              value={formData.ageRange}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#5a9e2f]"
            >
              <option value="0-2 Years">0 - 2 Years</option>
              <option value="1-5 Years">1 - 5 Years</option>
              <option value="2-6 Years">2 - 6 Years</option>
              <option value="3-8 Years">3 - 8 Years</option>
              <option value="0-10 Years">0 - 10 Years</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0d1b1e]">Selling Price (₹) *</label>
            <input
              type="number"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
              placeholder="799"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#5a9e2f]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0d1b1e]">Original / Compare Price (₹)</label>
            <input
              type="number"
              name="compareAtPrice"
              value={formData.compareAtPrice}
              onChange={handleChange}
              placeholder="1499"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#5a9e2f]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0d1b1e]">Stock Quantity *</label>
            <input
              type="number"
              name="stock"
              required
              value={formData.stock}
              onChange={handleChange}
              placeholder="25"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#5a9e2f]"
            />
          </div>

          <div className="space-y-1 flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="w-4 h-4 text-[#5a9e2f] focus:ring-[#5a9e2f]"
            />
            <label htmlFor="isFeatured" className="text-xs font-bold text-[#0d1b1e] cursor-pointer">
              Feature this product on Homepage carousel
            </label>
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs font-bold text-[#0d1b1e]">Short Summary *</label>
            <input
              type="text"
              name="shortDesc"
              required
              value={formData.shortDesc}
              onChange={handleChange}
              placeholder="1-sentence eye-catching summary for product card"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#5a9e2f]"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs font-bold text-[#0d1b1e]">Full Detailed Description *</label>
            <textarea
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Complete features, benefits, safety details..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#5a9e2f]"
            />
          </div>
        </div>
      </div>

      {/* Image URLs Manager with Live Preview */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0d1b1e] uppercase tracking-wider flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#5a9e2f]" />
            <span>Product Images (Cloudinary / Direct URLs)</span>
          </h3>
          <button
            type="button"
            onClick={addImageUrl}
            className="text-xs font-bold text-[#5a9e2f] hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Image URL</span>
          </button>
        </div>

        <div className="space-y-3">
          {imageUrls.map((url, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shrink-0">
                {url ? (
                  <Image src={url} alt={`Preview ${idx}`} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 text-[10px]">
                    Preview
                  </div>
                )}
              </div>

              <input
                type="text"
                value={url}
                onChange={(e) => handleImageChange(idx, e.target.value)}
                placeholder="https://images.unsplash.com/... or Cloudinary URL"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-[#0d1b1e] focus:outline-none focus:border-[#5a9e2f]"
              />

              {imageUrls.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageUrl(idx)}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Badges & Specifications Builder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Badges */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#0d1b1e] uppercase tracking-wider">Highlight Badges</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={badgeInput}
              onChange={(e) => setBadgeInput(e.target.value)}
              placeholder="e.g. 100% Non-Toxic"
              className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#5a9e2f]"
            />
            <button
              type="button"
              onClick={addBadge}
              className="px-4 py-2 bg-[#5a9e2f] text-white font-bold text-xs rounded-xl"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {badges.map((b) => (
              <span
                key={b}
                className="bg-[#eef8ea] text-[#5a9e2f] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"
              >
                <span>{b}</span>
                <button type="button" onClick={() => removeBadge(b)} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Specifications Key-Value */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0d1b1e] uppercase tracking-wider">Specifications</h3>
            <button
              type="button"
              onClick={addSpecRow}
              className="text-xs font-bold text-[#5a9e2f] hover:underline"
            >
              + Add Row
            </button>
          </div>

          <div className="space-y-2">
            {specs.map((s, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={s.key}
                  onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                  placeholder="Key (e.g. Dimensions)"
                  className="w-1/2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                />
                <input
                  type="text"
                  value={s.value}
                  onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                  placeholder="Value (e.g. 17cm x 17cm)"
                  className="w-1/2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                />
                <button
                  type="button"
                  onClick={() => removeSpecRow(idx)}
                  className="text-slate-400 hover:text-red-500"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}

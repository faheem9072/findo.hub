'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Star,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  ChevronRight,
  ChevronDown,
  Heart,
  MessageSquare,
  Sparkles,
  BookOpen,
  Box,
  HelpCircle,
  Clock,
  Send,
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import ProductCard from '@/components/ProductCard';

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string | Date;
}

export default function ProductDetailClient({
  product,
  relatedProducts = [],
}: {
  product: any;
  relatedProducts?: any[];
}) {
  const { addToCart } = useCart();
  const router = useRouter();

  let parsedImages: string[] = ['/logo.jpeg'];
  try {
    parsedImages = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
    if (!Array.isArray(parsedImages) || parsedImages.length === 0) {
      parsedImages = ['/logo.jpeg'];
    }
  } catch {}

  let parsedBadges: string[] = [];
  try {
    parsedBadges = typeof product.badges === 'string' ? JSON.parse(product.badges) : product.badges;
  } catch {}

  let parsedSpecs: Record<string, string> = {};
  try {
    parsedSpecs = typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs;
  } catch {}

  const [selectedImage, setSelectedImage] = useState(parsedImages[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('why_love');
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Review Form State
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews || []);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerEmail, setReviewerEmail] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewMessage, setReviewMessage] = useState('');

  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  const toggleAccordion = (key: string) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewerComment || !reviewerEmail) {
      setReviewMessage('Please fill in all review fields.');
      return;
    }
    setSubmittingReview(true);
    setReviewMessage('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          customerName: reviewerName,
          customerEmail: reviewerEmail,
          rating: reviewerRating,
          comment: reviewerComment,
        }),
      });

      if (res.ok) {
        const newReview = await res.json();
        setReviewsList([newReview, ...reviewsList]);
        setReviewName('');
        setReviewerEmail('');
        setReviewerComment('');
        setReviewerRating(5);
        setReviewMessage('Thank you! Your review has been submitted.');
      } else {
        setReviewMessage('Failed to submit review. Please try again.');
      }
    } catch {
      setReviewMessage('Error submitting review.');
    } finally {
      setSubmittingReview(false);
    }
  };

  function setReviewName(arg0: string) {
    setReviewerName(arg0);
  }

  const accordionItems = [
    {
      id: 'why_love',
      title: 'Why Kids Love It',
      icon: Sparkles,
      content:
        product.shortDesc ||
        'Designed to turn everyday playtime into engaging discoveries. Children love the tactile feel, immediate visual feedback, and rewarding sense of personal accomplishment.',
    },
    {
      id: 'what_learn',
      title: 'What They Learn',
      icon: BookOpen,
      content:
        'Fosters key developmental milestones including spatial reasoning, fine motor precision, logical problem solving, independent routine management, and creative screen-free exploration.',
    },
    {
      id: 'whats_included',
      title: "What's Included",
      icon: Box,
      content: product.whatsIncluded || 'Main product unit, step-by-step parent activity guide, durable storage packaging.',
    },
    {
      id: 'how_to_use',
      title: 'How to Use',
      icon: HelpCircle,
      content:
        'Unbox and introduce the product during calm daily play windows. Follow the included starter guide to set achievable goals and build independent play habits.',
    },
    {
      id: 'age_rec',
      title: 'Age Recommendation',
      icon: Clock,
      content: `Recommended for ages ${product.ageRange || '3-10 Years'}. Designed with child ergonomics and safety in mind.`,
    },
    {
      id: 'specs',
      title: 'Product Specifications',
      icon: Box,
      content: (
        <div className="space-y-2 text-xs">
          <div className="flex justify-between border-b border-slate-100 py-1">
            <span className="font-semibold text-slate-500">Dimensions:</span>
            <span className="font-bold text-[#0d1b1e]">{product.dimensions || 'Standard'}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 py-1">
            <span className="font-semibold text-slate-500">Weight:</span>
            <span className="font-bold text-[#0d1b1e]">{product.weight || '350g'}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 py-1">
            <span className="font-semibold text-slate-500">Material:</span>
            <span className="font-bold text-[#0d1b1e]">{product.material || 'Child-Safe Non-Toxic ABS'}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-semibold text-slate-500">SKU:</span>
            <span className="font-bold text-[#0d1b1e]">{product.sku}</span>
          </div>
          {Object.entries(parsedSpecs).map(([k, v]) => (
            <div key={k} className="flex justify-between border-t border-slate-100 py-1">
              <span className="font-semibold text-slate-500">{k}:</span>
              <span className="font-bold text-[#0d1b1e]">{v}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'safety',
      title: 'Safety Information',
      icon: ShieldCheck,
      content:
        product.safetyInfo ||
        'Certified Child Safe (ASTM & EN71 compliant). Free from BPA, phthalates, and lead. Smooth rounded edges with zero sharp burrs.',
    },
    {
      id: 'shipping',
      title: 'Shipping Information',
      icon: Truck,
      content:
        'Ships within 24 hours from our Indian fulfillment centers. Free standard shipping across India on orders above ₹999. Express delivery options available at checkout.',
    },
    {
      id: 'returns',
      title: 'Returns & Replacement Policy',
      icon: RotateCcw,
      content:
        'Enjoy 7 days hassle-free replacement warranty for manufacturing defects or damaged items during transit. Contact support@findo.com for instant pickup.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-[#5a9e2f]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/shop" className="hover:text-[#5a9e2f]">Shop</Link>
        {product.category && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/shop?category=${product.category.slug}`} className="hover:text-[#5a9e2f]">
              {product.category.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#0d1b1e] font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* LEFT: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div
            className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs cursor-crosshair"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-200"
              style={
                isZoomed
                  ? {
                      transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                      transform: 'scale(1.8)',
                    }
                  : {}
              }
              priority
            />
            {discountPercent && (
              <span className="absolute top-4 left-4 bg-[#5a9e2f] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xs">
                -{discountPercent}% OFF
              </span>
            )}
            <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-600 px-2.5 py-1 rounded-md border border-slate-200 shadow-xs">
              Hover to Zoom
            </span>
          </div>

          {/* Thumbnails */}
          {parsedImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {parsedImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white ${
                    selectedImage === img
                      ? 'border-[#5a9e2f] ring-2 ring-[#5a9e2f]/20 scale-102'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`${product.name} photo ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Information */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {product.category && (
                <span className="text-xs font-bold text-[#5a9e2f] bg-[#eef8ea] px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.category.name}
                </span>
              )}
              <span className="text-xs font-bold text-[#0d1b1e] bg-slate-100 px-3 py-1 rounded-full">
                Age: {product.ageRange || '3-8 Years'}
              </span>
              {parsedBadges.map((badge: string, idx: number) => (
                <span
                  key={idx}
                  className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200"
                >
                  {badge}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b1e] tracking-tight leading-snug">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating || 5) ? 'fill-amber-400' : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-slate-900">{product.rating || 4.9}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600 font-medium">
                ({reviewsList.length} Customer Reviews)
              </span>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-xs">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-[#0d1b1e]">₹{product.price}</span>
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <span className="text-base text-slate-400 line-through">₹{product.compareAtPrice}</span>
                  )}
                </div>
                <p className="text-xs text-[#5a9e2f] font-semibold mt-0.5">
                  Taxes included. Free delivery on orders over ₹999.
                </p>
              </div>

              {/* Stock Status */}
              <div>
                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    In Stock ({product.stock})
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Short Description */}
            <p className="text-sm text-slate-600 leading-relaxed">{product.shortDesc}</p>
          </div>

          {/* Quantity & CTAs */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-[#0d1b1e] uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 hover:bg-slate-100 text-slate-700 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-[#0d1b1e]">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                  className="p-2.5 hover:bg-slate-100 text-slate-700 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`py-3.5 px-6 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
                  product.stock <= 0
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : added
                    ? 'bg-[#0d1b1e] text-[#5a9e2f]'
                    : 'bg-[#5a9e2f] hover:bg-[#488224] text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 text-[#5a9e2f]" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="py-3.5 px-6 rounded-lg bg-[#0d1b1e] hover:bg-[#182e33] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors disabled:opacity-50"
              >
                <Zap className="w-5 h-5 text-[#5a9e2f]" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Quick Trust Badges */}
          <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-700">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#5a9e2f] shrink-0" />
              <span className="font-semibold">Fast Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#5a9e2f] shrink-0" />
              <span className="font-semibold">Child Safe Materials</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#5a9e2f] shrink-0" />
              <span className="font-semibold">Easy Replacements</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accordions Section */}
      <div className="pt-8 border-t border-slate-200 space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0d1b1e] mb-6">Product Details & Info</h2>

        <div className="space-y-3">
          {accordionItems.map((item) => {
            const Icon = item.icon;
            const isOpen = activeAccordion === item.id;
            return (
              <div
                key={item.id}
                className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-[#0d1b1e] hover:bg-slate-50 transition-colors text-sm sm:text-base"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{item.title}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {typeof item.content === 'string' ? <p>{item.content}</p> : item.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="pt-10 border-t border-slate-200 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0d1b1e]">Customer Reviews</h2>
            <p className="text-xs text-slate-500 mt-1">Verified feedback from parents who bought this item.</p>
          </div>
          <div className="flex items-center gap-2 bg-[#eef8ea] px-4 py-2 rounded-xl border border-emerald-200">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm font-extrabold text-[#0d1b1e]">{product.rating || 4.9} out of 5</span>
          </div>
        </div>

        {/* Existing Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviewsList.map((rev) => (
            <div key={rev.id} className="p-5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0d1b1e]">{rev.customerName}</span>
                <span className="text-slate-400">Verified Buyer</span>
              </div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400' : 'text-slate-200'}`}
                  />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-600">{rev.comment}</p>
            </div>
          ))}
        </div>

        {/* Submit Review Form */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <h3 className="font-bold text-[#0d1b1e] text-base">Write a Review</h3>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#5a9e2f] outline-none"
                  placeholder="e.g. Priyo S."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Email *</label>
                <input
                  type="email"
                  required
                  value={reviewerEmail}
                  onChange={(e) => setReviewerEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#5a9e2f] outline-none"
                  placeholder="e.g. parent@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Rating</label>
              <select
                value={reviewerRating}
                onChange={(e) => setReviewerRating(Number(e.target.value))}
                className="w-full sm:w-48 px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#5a9e2f] outline-none"
              >
                <option value={5}>5 Stars - Excellent</option>
                <option value={4}>4 Stars - Great</option>
                <option value={3}>3 Stars - Good</option>
                <option value={2}>2 Stars - Average</option>
                <option value={1}>1 Star - Poor</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Review Comment *</label>
              <textarea
                required
                rows={3}
                value={reviewerComment}
                onChange={(e) => setReviewerComment(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#5a9e2f] outline-none"
                placeholder="Share how your child enjoyed this product..."
              />
            </div>

            {reviewMessage && (
              <p
                className={`text-xs font-bold ${
                  reviewMessage.includes('Thank') ? 'text-emerald-700' : 'text-rose-600'
                }`}
              >
                {reviewMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={submittingReview}
              className="py-2.5 px-6 rounded-lg bg-[#5a9e2f] hover:bg-[#488224] text-white font-bold text-xs flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submittingReview ? 'Submitting...' : 'Submit Review'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Related Products / You May Also Like */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-slate-200 space-y-6 pb-16 md:pb-0">
          <h2 className="text-2xl font-extrabold text-[#0d1b1e]">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Purchase Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between gap-3 shadow-xl pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex flex-col">
          <span className="text-base font-extrabold text-[#0d1b1e]">₹{product.price}</span>
          {product.compareAtPrice && product.compareAtPrice > product.price ? (
            <span className="text-[10px] text-slate-400 line-through">₹{product.compareAtPrice}</span>
          ) : (
            <span className="text-[10px] text-[#5a9e2f] font-semibold">In Stock</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`py-2 px-3 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs ${
              product.stock <= 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : added
                ? 'bg-[#0d1b1e] text-[#5a9e2f]'
                : 'bg-[#5a9e2f] hover:bg-[#488224] text-white'
            }`}
          >
            {added ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
            <span>{added ? 'Added' : 'Add'}</span>
          </button>

          <button
            onClick={handleBuyNow}
            disabled={product.stock <= 0}
            className="py-2 px-3.5 rounded-lg bg-[#0d1b1e] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs disabled:opacity-50"
          >
            <Zap className="w-3.5 h-3.5 text-[#5a9e2f]" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

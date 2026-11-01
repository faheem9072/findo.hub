'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface CartItem {
  id: string; // unique cart item id (product.id)
  productId: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  image: string;
  quantity: number;
  ageRange?: string;
  stock: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice?: number | null;
    images: string;
    ageRange?: string;
    stock: number;
  }, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  subtotal: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  flatShippingRate: number;
  shippingFee: number;
  refreshSettings: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const DEFAULT_FREE_SHIPPING_THRESHOLD = 999;
export const DEFAULT_FLAT_SHIPPING_RATE = 79;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState<number>(DEFAULT_FREE_SHIPPING_THRESHOLD);
  const [flatShippingRate, setFlatShippingRate] = useState<number>(DEFAULT_FLAT_SHIPPING_RATE);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/settings', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data?.settings) {
          if (typeof data.settings.freeShippingThreshold === 'number') {
            setFreeShippingThreshold(data.settings.freeShippingThreshold);
          }
          if (typeof data.settings.flatShippingRate === 'number') {
            setFlatShippingRate(data.settings.flatShippingRate);
          }
        }
      }
    } catch (e) {
      console.error('Failed to load store settings:', e);
    }
  }, []);

  // Fetch settings on mount
  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Load cart from localStorage on client mount & auto-sync prices
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('findo_cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCart(parsed);
          // Sync prices in background so cart always reflects admin price updates
          fetch('/api/products')
            .then((res) => res.json())
            .then((data) => {
              if (data?.products && Array.isArray(data.products)) {
                const productMap = new Map<string, any>(data.products.map((p: any) => [p.id, p]));
                setCart((current) =>
                  current.map((item) => {
                    const latest = productMap.get(item.productId);
                    if (latest) {
                      return {
                        ...item,
                        price: latest.price,
                        compareAtPrice: latest.compareAtPrice,
                        stock: latest.stock,
                        name: latest.name,
                      };
                    }
                    return item;
                  })
                );
              }
            })
            .catch((err) => console.error('Cart price sync failed:', err));
        }
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('findo_cart', JSON.stringify(cart));
      } catch (e) {
        console.error('Failed to save cart to localStorage:', e);
      }
    }
  }, [cart, isLoaded]);

  const addToCart = (product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice?: number | null;
    images: string;
    ageRange?: string;
    stock: number;
  }, quantityToAdd = 1) => {
    let parsedImage = '/logo.jpeg';
    try {
      const imgs = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        parsedImage = imgs[0];
      }
    } catch {
      if (typeof product.images === 'string' && product.images.startsWith('http')) {
        parsedImage = product.images;
      }
    }

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.productId === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = Math.min(updated[existingIndex].quantity + quantityToAdd, product.stock || 99);
        updated[existingIndex] = {
          ...updated[existingIndex],
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          quantity: newQty,
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            productId: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            image: parsedImage,
            quantity: quantityToAdd,
            ageRange: product.ageRange,
            stock: product.stock,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity: Math.min(newQty, item.stock || 99) } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = cart.length === 0 ? 0 : subtotal >= freeShippingThreshold ? 0 : flatShippingRate;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        subtotal,
        freeShippingThreshold,
        freeShippingRemaining,
        flatShippingRate,
        shippingFee,
        refreshSettings: fetchSettings,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

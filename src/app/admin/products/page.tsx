import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import AdminLayout from '@/components/AdminLayout';
import AdminProductsClient from './AdminProductsClient';

import { AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminProductsPage() {
  let products: any[] = [];
  let categories: any[] = [];
  let dbError: string | null = null;

  try {
    [products, categories] = await Promise.all([
      prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        include: { category: true },
      }),
      prisma.category.findMany({
        orderBy: { name: 'asc' },
      }),
    ]);
  } catch (error: any) {
    console.error('Admin Products DB Error:', error?.message);
    dbError = error?.message || 'Database connection error';
  }

  return (
    <AdminLayout>
      {dbError && (
        <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl text-amber-900 text-xs sm:text-sm space-y-1.5 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-amber-800">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Database Connection Notice</span>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            Unable to reach PostgreSQL database. If using Neon Free Tier, check your compute quota at{' '}
            <a href="https://console.neon.tech" target="_blank" rel="noopener noreferrer" className="underline font-bold text-amber-950">
              console.neon.tech
            </a>.
          </p>
        </div>
      )}
      <AdminProductsClient initialProducts={products} categories={categories} />
    </AdminLayout>
  );
}

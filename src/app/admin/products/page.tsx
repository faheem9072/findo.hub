import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import AdminLayout from '@/components/AdminLayout';
import AdminProductsClient from './AdminProductsClient';

export const revalidate = 0;

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: true },
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <AdminLayout>
      <AdminProductsClient initialProducts={products} categories={categories} />
    </AdminLayout>
  );
}

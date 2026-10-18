import React from 'react';
import prisma from '@/lib/prisma';
import AdminLayout from '@/components/AdminLayout';
import ProductForm from '@/components/ProductForm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <AdminLayout>
      <ProductForm categories={categories} />
    </AdminLayout>
  );
}

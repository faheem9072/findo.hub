import React from 'react';
import prisma from '@/lib/prisma';
import AdminLayout from '@/components/AdminLayout';
import ProductForm from '@/components/ProductForm';

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

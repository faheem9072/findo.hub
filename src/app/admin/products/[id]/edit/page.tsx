import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import AdminLayout from '@/components/AdminLayout';
import ProductForm from '@/components/ProductForm';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <AdminLayout>
      <ProductForm initialData={product} categories={categories} />
    </AdminLayout>
  );
}

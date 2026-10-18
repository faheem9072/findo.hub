import React from 'react';
import prisma from '@/lib/prisma';
import AdminLayout from '@/components/AdminLayout';
import AdminCategoryClient from './AdminCategoryClient';

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

  return (
    <AdminLayout>
      <AdminCategoryClient initialCategories={categories} />
    </AdminLayout>
  );
}

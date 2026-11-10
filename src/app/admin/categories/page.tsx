import React from 'react';
import prisma from '@/lib/prisma';
import AdminLayout from '@/components/AdminLayout';
import AdminCategoryClient from './AdminCategoryClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminCategoriesPage() {
  let categories: any[] = [];
  try {
    categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
  } catch (error) {
    console.error('Admin Categories DB Error:', error);
  }

  return (
    <AdminLayout>
      <AdminCategoryClient initialCategories={categories} />
    </AdminLayout>
  );
}

import React from 'react';
import prisma from '@/lib/prisma';
import AdminLayout from '@/components/AdminLayout';
import AdminReviewClient from './AdminReviewClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminReviewsPage() {
  let reviews: any[] = [];
  try {
    reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        product: { select: { name: true, slug: true } },
      },
    });
  } catch (error) {
    console.error('Admin Reviews DB Error:', error);
  }

  return (
    <AdminLayout>
      <AdminReviewClient initialReviews={reviews} />
    </AdminLayout>
  );
}

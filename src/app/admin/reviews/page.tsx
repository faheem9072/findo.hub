import React from 'react';
import prisma from '@/lib/prisma';
import AdminLayout from '@/components/AdminLayout';
import AdminReviewClient from './AdminReviewClient';

export const revalidate = 0;

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      product: { select: { name: true, slug: true } },
    },
  });

  return (
    <AdminLayout>
      <AdminReviewClient initialReviews={reviews} />
    </AdminLayout>
  );
}

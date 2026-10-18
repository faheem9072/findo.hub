import React from 'react';
import prisma from '@/lib/prisma';
import AdminLayout from '@/components/AdminLayout';
import AdminCouponClient from './AdminCouponClient';

export const revalidate = 0;

export default async function AdminCouponsPage() {
  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <AdminLayout>
      <AdminCouponClient initialCoupons={coupons} />
    </AdminLayout>
  );
}

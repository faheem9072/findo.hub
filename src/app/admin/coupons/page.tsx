import React from 'react';
import prisma from '@/lib/prisma';
import AdminLayout from '@/components/AdminLayout';
import AdminCouponClient from './AdminCouponClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminCouponsPage() {
  let coupons: any[] = [];
  try {
    coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Admin Coupons DB Error:', error);
  }

  return (
    <AdminLayout>
      <AdminCouponClient initialCoupons={coupons} />
    </AdminLayout>
  );
}

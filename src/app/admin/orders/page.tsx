import React from 'react';
import prisma from '@/lib/prisma';
import AdminLayout from '@/components/AdminLayout';
import AdminOrdersClient from './AdminOrdersClient';

export const revalidate = 0;

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      items: true,
    },
  });

  return (
    <AdminLayout>
      <AdminOrdersClient initialOrders={orders} />
    </AdminLayout>
  );
}

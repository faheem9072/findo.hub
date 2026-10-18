import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import OrderConfirmationClient from '@/app/orders/[id]/OrderConfirmationClient';

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

export default async function AccountOrderDetailPage({ params }: OrderPageProps) {
  const { id } = await params;
  const order = await prisma.order.findFirst({
    where: {
      OR: [{ orderNumber: id }, { id: id }],
    },
    include: {
      items: true,
    },
  });

  if (!order) {
    notFound();
  }

  return <OrderConfirmationClient order={order} />;
}

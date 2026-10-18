import React from 'react';
import prisma from '@/lib/prisma';
import AdminLayout from '@/components/AdminLayout';
import AdminSettingsClient from './AdminSettingsClient';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  let settings = await prisma.setting.findUnique({
    where: { id: 'default' },
  });

  if (!settings) {
    settings = {
      id: 'default',
      whatsappNumber: '+919876543210',
      supportEmail: 'support@findo.com',
      freeShippingThreshold: 999,
      flatShippingRate: 79,
      storeNotice: 'Free Shipping across India on orders above ₹999!',
      updatedAt: new Date(),
    };
  }

  return (
    <AdminLayout>
      <AdminSettingsClient initialSettings={settings} />
    </AdminLayout>
  );
}

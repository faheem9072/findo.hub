import React from 'react';
import prisma from '@/lib/prisma';
import AdminLayout from '@/components/AdminLayout';
import AdminSettingsClient from './AdminSettingsClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminSettingsPage() {
  let settings: any = null;
  try {
    settings = await prisma.setting.findUnique({
      where: { id: 'default' },
    });
  } catch (error) {
    console.error('Admin Settings DB Error:', error);
  }

  if (!settings) {
    settings = {
      id: 'default',
      whatsappNumber: '+917025387764',
      supportEmail: 'findohub7@gmail.com',
      freeShippingThreshold: 0,
      flatShippingRate: 0,
      storeNotice: '🎉 FREE SHIPPING ALL OVER INDIA ON ALL ORDERS!',
      updatedAt: new Date(),
    };
  }

  return (
    <AdminLayout>
      <AdminSettingsClient initialSettings={settings} />
    </AdminLayout>
  );
}

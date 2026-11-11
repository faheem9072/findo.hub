import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, createAdminToken, verifyAdminToken } from '@/lib/auth';
import { cookies } from 'next/headers';

const MASTER_PIN = (process.env.ADMIN_SECURITY_PIN || '9072').trim();

export async function POST(request: Request) {
  try {
    const { email, password, securityPin } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Verify Master Security PIN
    if (!securityPin || securityPin.trim() !== MASTER_PIN) {
      return NextResponse.json(
        { error: 'Invalid Security Passcode / PIN. Access denied.' },
        { status: 401 }
      );
    }

    const admin = await prisma.adminUser.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!admin) {
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }

    const hashedInput = hashPassword(password);
    if (admin.passwordHash !== hashedInput) {
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }

    const token = await createAdminToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
    });

    const cookieStore = await cookies();
    cookieStore.set('findo_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return NextResponse.json({
      success: true,
      admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('findo_admin_token')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const payload = await verifyAdminToken(token);
    if (!payload) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, admin: payload });
  } catch (error: any) {
    return NextResponse.json({ authenticated: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('findo_admin_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyAdminToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const admin = await prisma.adminUser.findUnique({
      where: { id: payload.id },
    });

    if (!admin) {
      return NextResponse.json({ error: 'Admin account not found' }, { status: 404 });
    }

    if (currentPassword) {
      const hashedCurrent = hashPassword(currentPassword);
      if (admin.passwordHash !== hashedCurrent) {
        return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
      }
    }

    const newHash = hashPassword(newPassword);
    await prisma.adminUser.update({
      where: { id: payload.id },
      data: { passwordHash: newHash },
    });

    return NextResponse.json({ success: true, message: 'Admin password updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('findo_admin_token');
    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

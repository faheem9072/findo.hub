import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id: id }, { slug: id }],
      },
      include: {
        category: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('findo_admin_token')?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const {
      name,
      slug,
      description,
      shortDesc,
      price,
      compareAtPrice,
      deliveryFee,
      stock,
      categoryId,
      images,
      isFeatured,
      ageRange,
      badges,
      specs,
    } = body;

    let parsedPrice: number | undefined = undefined;
    if (price !== undefined) {
      const num = typeof price === 'number' ? price : parseFloat(String(price).trim());
      if (isNaN(num) || num < 0) {
        return NextResponse.json({ error: 'Valid price (>= 0) is required' }, { status: 400 });
      }
      parsedPrice = num;
    }

    let parsedCompareAtPrice: number | null | undefined = undefined;
    if (compareAtPrice !== undefined) {
      if (compareAtPrice === null || compareAtPrice === '' || compareAtPrice === 0 || compareAtPrice === '0') {
        parsedCompareAtPrice = null;
      } else {
        const num = typeof compareAtPrice === 'number' ? compareAtPrice : parseFloat(String(compareAtPrice).trim());
        if (isNaN(num) || num < 0) {
          return NextResponse.json({ error: 'Original / Compare price must be a valid positive number' }, { status: 400 });
        }
        parsedCompareAtPrice = num;
      }
    }

    let parsedDeliveryFee: number | undefined = undefined;
    if (deliveryFee !== undefined) {
      if (deliveryFee === null || deliveryFee === '') {
        parsedDeliveryFee = 0;
      } else {
        const num = typeof deliveryFee === 'number' ? deliveryFee : parseFloat(String(deliveryFee).trim());
        parsedDeliveryFee = isNaN(num) || num < 0 ? 0 : num;
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(description !== undefined && { description }),
        ...(shortDesc !== undefined && { shortDesc }),
        ...(parsedPrice !== undefined && { price: parsedPrice }),
        ...(parsedCompareAtPrice !== undefined && { compareAtPrice: parsedCompareAtPrice }),
        ...(parsedDeliveryFee !== undefined && { deliveryFee: parsedDeliveryFee }),
        ...(stock !== undefined && { stock: parseInt(stock) }),
        ...(categoryId && { categoryId }),
        ...(images !== undefined && { images: typeof images === 'string' ? images : JSON.stringify(images) }),
        ...(isFeatured !== undefined && { isFeatured: Boolean(isFeatured) }),
        ...(ageRange && { ageRange }),
        ...(badges !== undefined && { badges: typeof badges === 'string' ? badges : JSON.stringify(badges) }),
        ...(specs !== undefined && { specs: typeof specs === 'string' ? specs : JSON.stringify(specs) }),
      },
    });

    // Invalidate caches so price changes are immediately reflected on storefront
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/shop');
      revalidatePath('/products');
      revalidatePath('/search');
      revalidatePath('/admin/products');
      if (product.slug) {
        revalidatePath(`/product/${product.slug}`);
        revalidatePath(`/products/${product.slug}`);
      }
    } catch (revalError) {
      console.error('Error revalidating paths after product update:', revalError);
    }

    return NextResponse.json({ product, success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('findo_admin_token')?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await prisma.product.delete({
      where: { id },
    });

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/shop');
      revalidatePath('/products');
      revalidatePath('/search');
      revalidatePath('/admin/products');
    } catch (revalError) {
      console.error('Error revalidating paths after product deletion:', revalError);
    }

    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

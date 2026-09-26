import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + 'findo_salt_2026').digest('hex');
}

async function main() {
  console.log('🌱 Starting Findo database seeding...');

  // Clean existing records if any
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.adminUser.deleteMany();
  await prisma.customerQuery.deleteMany();

  // Create Categories
  const catLearning = await prisma.category.create({
    data: {
      name: 'Learning & Creative Toys',
      slug: 'learning-toys',
      description: 'Interactive, screen-free educational toys designed to boost young minds and fine motor skills.',
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800',
    },
  });

  const catFeeding = await prisma.category.create({
    data: {
      name: 'Feeding & Tableware',
      slug: 'feeding-tableware',
      description: 'Smart, mess-free dinnerware and anti-spill solutions for stress-free mealtime with toddlers.',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    },
  });

  const catNursery = await prisma.category.create({
    data: {
      name: 'Nursery & Nightlights',
      slug: 'nursery-lights',
      description: 'Soothing bedtime buddies, dimmable tap night lights, and gentle nursery essentials.',
      image: 'https://images.unsplash.com/photo-1532330393533-443990a51d10?auto=format&fit=crop&q=80&w=800',
    },
  });

  const catActivity = await prisma.category.create({
    data: {
      name: 'Activity & Busy Boards',
      slug: 'activity-boards',
      description: 'Montessori-inspired wooden sensory boards for tactile exploration and problem-solving.',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800',
    },
  });

  console.log('✅ Categories created.');

  // Create Initial 5 Products
  const productsData = [
    {
      name: 'Findo Smart LCD Magic Drawing Tablet',
      slug: 'findo-smart-lcd-magic-drawing-tablet',
      shortDesc: '10-inch eye-protection LCD doodle board for creative kids with one-click clear button.',
      description:
        'Unleash your child’s imagination without paper mess or toxic ink! The Findo Smart LCD Magic Drawing Tablet features pressure-sensitive technology that lets kids draw, write, and erase instantly with a single button click. Equipped with anti-glare, zero-radiation eye safety screen technology.',
      price: 799,
      compareAtPrice: 1499,
      stock: 35,
      categoryId: catLearning.id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800',
      ]),
      isFeatured: true,
      ageRange: '3-8 Years',
      badges: JSON.stringify(['Best Seller', 'Eye-Protection', 'Paperless']),
      specs: JSON.stringify({
        'Screen Size': '10 Inches',
        Battery: 'CR2025 Replaceable Coin Cell',
        Material: 'BPA-Free Durable ABS Plastic',
        Weight: '180g',
      }),
    },
    {
      name: 'Findo 360° Anti-Spill Gyro Snack Bowl',
      slug: 'findo-anti-spill-gyro-snack-bowl',
      shortDesc: 'Inner bowl rotates 360 degrees to keep food inside no matter how your toddler tilts it!',
      description:
        'Say goodbye to messy floor cleanups! The Findo 360° Anti-Spill Gyro Snack Bowl uses clever gyroscopic gravity technology. The inner bowl stays upright 360 degrees no matter how violently your toddler shakes or turns it. Comes with a snap-on lid for travel.',
      price: 499,
      compareAtPrice: 999,
      stock: 42,
      categoryId: catFeeding.id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
      ]),
      isFeatured: true,
      ageRange: '1-5 Years',
      badges: JSON.stringify(['Parent Favorite', '100% Food-Grade', 'Dishwasher Safe']),
      specs: JSON.stringify({
        Dimensions: '17cm x 17cm',
        Material: 'BPA-Free Food-Grade Polypropylene',
        Care: 'Top-rack dishwasher safe',
        Capacity: '250ml',
      }),
    },
    {
      name: 'Findo Talking Flashcards Early Educational Audio Toy',
      slug: 'findo-talking-flashcards-educational-toy',
      shortDesc: 'Interactive card reader with 224 words across animals, foods, and transportation with real audio sounds.',
      description:
        'Transform early vocabulary learning into a fun sound adventure! Insert any of the 112 double-sided cards into the Findo audio reader, and it pronounces the word clearly with realistic animal/vehicle sound effects. Designed by child speech therapists.',
      price: 899,
      compareAtPrice: 1799,
      stock: 28,
      categoryId: catLearning.id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800',
      ]),
      isFeatured: true,
      ageRange: '2-6 Years',
      badges: JSON.stringify(['Montessori Approved', 'USB Rechargeable', '224 Sight Words']),
      specs: JSON.stringify({
        'Cards Included': '112 Double-Sided Cards (224 Words)',
        'Battery Life': 'Up to 4.5 Hours Active Use',
        'Volume Control': '5 Adjustable Levels',
        Charging: 'USB Type-C',
      }),
    },
    {
      name: 'Findo Silicon Duck Tap Night Light & Sleep Buddy',
      slug: 'findo-silicon-duck-tap-night-light',
      shortDesc: 'Soft BPA-free silicone bedside night light with 3 brightness tap controls and 30-min sleep timer.',
      description:
        'Help your little ones feel safe and drift off to sleep gently with the adorable Findo Duck Sleep Buddy. Made from squishy, food-grade silicone, tap its cute head to switch between warm ambient brightness levels. Includes an automatic 30-minute shutoff timer.',
      price: 999,
      compareAtPrice: 1999,
      stock: 50,
      categoryId: catNursery.id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1532330393533-443990a51d10?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800',
      ]),
      isFeatured: true,
      ageRange: '0-10 Years',
      badges: JSON.stringify(['Warm Ambient Light', '30-Min Auto Timer', 'Squishy Silicone']),
      specs: JSON.stringify({
        'Light Color': '3000K Soft Warm Yellow',
        'Battery Capacity': '1200mAh Lithium',
        Timer: '30-Minute Auto-Off Switch',
        Material: 'BPA-Free Soft Silicone',
      }),
    },
    {
      name: 'Findo Montessori Wooden Sensory Busy Board',
      slug: 'findo-montessori-wooden-sensory-busy-board',
      shortDesc: '14-in-1 tactile motor skills wooden board featuring latches, gears, zippers, shoelaces & clock.',
      description:
        'Keep curious young minds focused and developing fine motor coordination for hours! The Findo Wooden Busy Board features natural smooth birchwood loaded with real-world sensory locks, buckles, gears, zippers, and interactive elements based on Montessori self-directed learning principles.',
      price: 1299,
      compareAtPrice: 2499,
      stock: 19,
      categoryId: catActivity.id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=800',
      ]),
      isFeatured: true,
      ageRange: '1-4 Years',
      badges: JSON.stringify(['100% Natural Wood', '14 Fine Motor Activities', 'Screen-Free Fun']),
      specs: JSON.stringify({
        Dimensions: '30cm x 22.5cm',
        'Wood Type': 'Natural Birch Plywood',
        Paint: 'Non-Toxic Water-Based Safe Stains',
        'Safety Standard': 'ASTM F963 / EN71 Certified',
      }),
    },
  ];

  for (const item of productsData) {
    await prisma.product.create({ data: item });
  }

  console.log('✅ 5 Products seeded successfully.');

  // Create Default Admin User
  const adminEmail = 'admin@findo.com';
  const adminPasswordHash = hashPassword('admin123');

  await prisma.adminUser.create({
    data: {
      email: adminEmail,
      passwordHash: adminPasswordHash,
      name: 'Findo Store Admin',
      role: 'ADMIN',
    },
  });

  console.log(`✅ Default Admin user created (${adminEmail} / admin123).`);
  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

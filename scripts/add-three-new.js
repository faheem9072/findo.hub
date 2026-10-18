const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addThreeNewProducts() {
  console.log('🔄 Adding the 3 newly requested authentic products...');

  const categories = await prisma.category.findMany();
  const catExploration = categories.find((c) => c.slug === 'exploration-art') || categories[0];
  const catSTEM = categories.find((c) => c.slug === 'stem-construction') || categories[1];
  const catPuzzles = categories.find((c) => c.slug === 'puzzles-logic') || categories[2];

  const newProducts = [
    {
      slug: 'kids-instant-print-digital-camera',
      name: 'Findo DIY Instant Print Kids Digital Camera',
      shortDesc: 'Zero-ink instant thermal print camera with HD photo, 1080p video recording & built-in puzzle games.',
      description:
        'Capture childhood magic in an instant! The Findo DIY Instant Digital Camera allows young creators to take vibrant digital photos, record videos, and print instant black-and-white physical keepsake pictures in seconds using ink-free thermal printing technology. Includes fun built-in games, rechargeable battery, creative frames, and a safety neck strap.',
      price: 2499,
      compareAtPrice: 3999,
      stock: 25,
      sku: 'FND-CAM-008',
      categoryId: catExploration.id,
      purpose: 'CREATE',
      images: JSON.stringify(['/images/instant-print-camera.jpg']),
      isFeatured: true,
      isPublished: true,
      ageRange: '3-12 Years',
      weight: '260g',
      dimensions: '11cm x 9cm x 4.5cm',
      material: 'Drop-Resistant Soft-Touch ABS Polymer with BPA-Free Thermal Paper',
      whatsIncluded:
        '1 Findo Instant Print Camera, 3 Thermal Print Paper Rolls (over 180 photos), 1 USB-C Rechargeable Cable, 1 Neck Lanyard, 1 Sticker Sheet, User Manual',
      safetyInfo:
        'BPA & BPS Free thermal paper. Zero ink, toner, or harmful chemicals. Drop-tested shockproof shell.',
      rating: 5.0,
      reviewCount: 64,
      badges: JSON.stringify(['Instant Print', 'Zero Ink', 'HD Photo & Video', 'Rechargeable']),
      specs: JSON.stringify({
        'Printing Method': 'Zero-Ink Thermal Printing Technology',
        Screen: '2.4 Inch IPS Eye-Protection Color Screen',
        Functions: 'Dual Camera (Front & Selfie), 1080P Video, Games, MP3',
        Battery: 'Rechargeable 1000mAh Lithium-ion (USB-C Charging)',
      }),
      seoTitle: 'Findo DIY Instant Print Kids Digital Camera | Zero-Ink Thermal Camera',
      seoDescription:
        'Kids instant print camera with zero-ink thermal printing, HD photos, 1080p video recording, and creative sticker filters.',
    },
    {
      slug: 'diy-working-solar-system-model',
      name: 'DIY My Working Solar System Planetarium Model Kit',
      shortDesc: 'Hands-on motorized orbital solar system model with paint set to build, color & explore space.',
      description:
        'Bring the wonders of the cosmos to your tabletop! The DIY My Working Solar System kit lets curious kids assemble and paint all 8 planets and the central Sun on revolving orbital arms. Includes 6 vibrant paint colors, paintbrush, planet spheres with authentic ring details (like Saturn’s rings), and an illustrated guide detailing planet sizes, distances, and orbits.',
      price: 799,
      compareAtPrice: 1299,
      stock: 40,
      sku: 'FND-SS-009',
      categoryId: catSTEM.id,
      purpose: 'EXPLORE',
      images: JSON.stringify(['/images/solar-system-diy.jpg']),
      isFeatured: true,
      isPublished: true,
      ageRange: '8+ Years',
      weight: '480g',
      dimensions: '30cm x 22cm x 6cm',
      material: 'Non-Toxic Precision Engineered ABS & Washable Acrylic Paints',
      whatsIncluded:
        'Complete Solar System Planet Spheres & Sun, Central Pedestal Base with Rotating Orbital Arms, 6 Acrylic Paint Pots, Fine-Tip Paintbrush, Planet Rings, Assembly Manual & Astronomy Fact Guide',
      safetyInfo: 'Non-toxic water-based paints. ASTM & EN71 certified child safety.',
      rating: 4.8,
      reviewCount: 39,
      badges: JSON.stringify(['Assemble & Paint', 'Astronomy & Space', 'Hands-on STEM']),
      specs: JSON.stringify({
        'Planets Included': 'Sun, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune',
        Rotation: 'Manual 360-degree Rotating Orbital Arms',
        Colors: '6 Washable Non-Toxic Vibrant Paint Tubs with Brush',
        'Skill Focus': 'Astronomy Science, Fine Motor Painting, Spatial Awareness',
      }),
      seoTitle: 'DIY My Working Solar System Model Kit | Findo Kids',
      seoDescription:
        'Assemble, paint and learn with the DIY Working Solar System model kit. 360-degree rotating planets and full astronomy guide.',
    },
    {
      slug: 'ekta-magna-play-magnetic-art-puzzle',
      name: 'Ekta Magna Play Magnetic Art & Puzzle Kit (300 Round Magnets)',
      shortDesc: '300 vibrant colorful round magnets with magnetic canvas boards to create 400+ creative pictures & mosaics.',
      description:
        'Unleash endless artistic imagination with Magna Play by Ekta! Featuring 300 colorful round button magnets and multiple smooth magnetic display canvas tiles, children can design over 400+ delightful mosaic pictures—from animals, trains, and houses to geometric shapes and portraits. Promotes patience, focus, color perception, and fine motor coordination.',
      price: 649,
      compareAtPrice: 1099,
      stock: 45,
      sku: 'FND-MP-010',
      categoryId: catPuzzles.id,
      purpose: 'CREATE',
      images: JSON.stringify(['/images/magna-play-magnets.jpg']),
      isFeatured: true,
      isPublished: true,
      ageRange: '4+ Years',
      weight: '520g',
      dimensions: '28cm x 22cm x 5cm',
      material: 'Child-Safe Encapsulated Button Magnets & Coated Iron Canvas Plates',
      whatsIncluded:
        '300 Colorful Round Button Magnets, Multiple Magnetic Display Canvases, Idea Puzzle Pattern Book with 400+ Designs',
      safetyInfo: 'Encapsulated magnets that cannot dislodge or expose magnetic cores. Smooth edges and non-toxic dyes.',
      rating: 4.9,
      reviewCount: 47,
      badges: JSON.stringify(['300 Magnets', '400+ Designs', 'Mess-Free Art', 'Ekta Quality']),
      specs: JSON.stringify({
        'Magnet Count': '300 Vibrant Round Button Magnets',
        Canvases: 'Multiple Magnetic Black Canvas Boards',
        'Pattern Guide': 'Full-Color Booklet with 400+ Mosaic Challenges',
        'Core Benefits': 'Pattern Recognition, Color Theory, Creative Confidence',
      }),
      seoTitle: 'Ekta Magna Play Magnetic Art & Puzzle Kit (300 Magnets) | Findo',
      seoDescription:
        '300 colorful round magnetic pieces with pattern booklet for 400+ creative picture designs. Creative mosaic art game for kids.',
    },
  ];

  for (const prod of newProducts) {
    const existing = await prisma.product.findUnique({ where: { slug: prod.slug } });
    if (existing) {
      await prisma.product.update({
        where: { slug: prod.slug },
        data: {
          ...prod,
          createdAt: new Date(),
        },
      });
      console.log('✅ Updated: ' + prod.name);
    } else {
      await prisma.product.create({
        data: prod,
      });
      console.log('✅ Created: ' + prod.name);
    }
  }

  const count = await prisma.product.count();
  console.log('🎉 Total products in DB now:', count);
}

addThreeNewProducts()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

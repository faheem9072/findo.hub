const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addFourMoreProducts() {
  console.log('🔄 Adding the 4 newly requested authentic products...');

  const categories = await prisma.category.findMany();
  const catSTEM = categories.find((c) => c.slug === 'stem-construction') || categories[0];
  const catExploration = categories.find((c) => c.slug === 'exploration-art') || categories[1];
  const catPuzzles = categories.find((c) => c.slug === 'puzzles-logic') || categories[2];
  const catHabits = categories.find((c) => c.slug === 'habits-routines') || categories[3];

  const newProducts = [
    {
      slug: 'kids-educational-microscope-science-kit',
      name: 'Findo Kids Educational Microscope Science Kit (100X-450X)',
      shortDesc: 'Beginner optical lab microscope with 100X, 200X, 450X magnification, specimen slides & collection vials.',
      description:
        'Unveil the unseen microbial wonders of nature! The Findo Educational Microscope Kit features adjustable rotating lenses with 100X, 200X, and 450X magnification powers, dual lighting (LED and reflection mirror), focus adjustment wheel, glass-safe specimen slides, blank slides, and collection vials. Perfect for inquisitive junior biologists to study plant cells, insect wings, fibers, and microscopic crystals.',
      price: 899,
      compareAtPrice: 1499,
      stock: 35,
      sku: 'FND-MIC-011',
      categoryId: catSTEM.id,
      purpose: 'EXPLORE',
      images: JSON.stringify(['/images/educational-microscope.jpg']),
      isFeatured: true,
      isPublished: true,
      ageRange: '6+ Years',
      weight: '520g',
      dimensions: '24cm x 19cm x 9cm',
      material: 'Child-Safe Impact-Resistant ABS with Optical Lenses',
      whatsIncluded:
        '1 Monocular Microscope with 3 Objective Lenses (100X, 200X, 450X), 1 Prepared Specimen Slide, 4 Blank Glass Slides, 2 Collection Vials, 1 Tweezers, 1 Storage Box',
      safetyInfo: 'Rounded plastic edges, shatter-resistant acrylic slides for child safety.',
      rating: 4.9,
      reviewCount: 37,
      badges: JSON.stringify(['100X-450X Magnification', 'Specimen Kit', 'Junior Scientist']),
      specs: JSON.stringify({
        'Magnification Levels': '100X, 200X, 450X Multi-Power Objective Turret',
        Illumination: 'Built-In LED Light Source & Specimen Stage Clips',
        Accessories: 'Collection Vials, Specimen Slides & Tweezers Included',
        Focusing: 'Smooth Coaxial Coarse Adjustment Knobs',
      }),
      seoTitle: 'Findo Kids Educational Microscope Science Kit (100X-450X) | Findo',
      seoDescription:
        'Educational microscope for kids with 100X to 450X magnification, LED lighting, and specimen preparation toolkit.',
    },
    {
      slug: 'anmol-fashion-vanity-beauty-suitcase',
      name: 'Anmol "So, Fashion You!" Portable Vanity Beauty Suitcase (3+)',
      shortDesc: '2-in-1 portable wheeled vanity bus suitcase that opens into a glamorous pretend-play beauty dressing table.',
      description:
        'Inspire imaginative role-play with Anmol’s "So, Fashion You!" vanity playset! Shaped like an adorable pink rolling bus suitcase with handle, it pops open into a complete beauty salon dressing table with a heart-shaped mirror, toy hair dryer, play lipsticks, perfume bottle, hairbrush, colorful beaded necklaces, bracelets, and rings. Packs up tidily for travel or playdates!',
      price: 749,
      compareAtPrice: 1299,
      stock: 40,
      sku: 'FND-VAN-012',
      categoryId: catExploration.id,
      purpose: 'PLAY',
      images: JSON.stringify(['/images/fashion-vanity-suitcase.jpg']),
      isFeatured: true,
      isPublished: true,
      ageRange: '3+ Years',
      weight: '650g',
      dimensions: '28cm x 22cm x 11cm',
      material: '100% Non-Toxic Durable BPA-Free Plastic',
      whatsIncluded:
        '1 Rolling Bus Suitcase / Vanity Table with Heart Mirror, 1 Toy Hair Dryer, 2 Play Lipsticks, 1 Perfume Bottle, 1 Styling Comb, 2 Beaded Necklaces, 2 Bracelets, 3 Finger Rings, Decorative Stickers',
      safetyInfo:
        'Non-toxic smooth plastic with zero sharp edges. Pretend cosmetics contain zero real makeup or chemicals.',
      rating: 4.8,
      reviewCount: 44,
      badges: JSON.stringify(['2-in-1 Suitcase', 'Pretend Play', 'Wheeled Trolley', 'Cute Bus Design']),
      specs: JSON.stringify({
        'Play Features': 'Pretend Salon Vanity Table with Heart Mirror',
        Mobility: 'Rolling Wheels & Carry Handle (Suitcase Mode)',
        Pieces: '15+ Salon Grooming & Jewelry Accessories',
        'Age Group': 'Ages 3 to 7 Years',
      }),
      seoTitle: 'Anmol "So, Fashion You!" Vanity Beauty Bus Suitcase | Findo Kids',
      seoDescription:
        'Kids portable 2-in-1 vanity beauty dressing table suitcase with hair dryer, accessories, mirror, and jewelry.',
    },
    {
      slug: '36-pcs-magnetic-sticks-building-set',
      name: 'Findo 36-Piece 3D Magnetic Sticks & Balls STEM Building Set',
      shortDesc: '36-piece 3D magnetic building rod set with straight & curved magnetic bars and stainless steel spheres.',
      description:
        'Spark spatial intelligence, geometry, and mechanical intuition! This 36-piece Magnetic Sticks set features straight magnetic bars, curved arc rods, and non-magnetic stainless steel joint spheres in vibrant primary colors. Young builders can construct towers, geometric polyhedra, cars, animals, bridges, and abstract 3D sculptures with satisfying magnetic clicks.',
      price: 699,
      compareAtPrice: 1199,
      stock: 50,
      sku: 'FND-MAG-013',
      categoryId: catSTEM.id,
      purpose: 'CREATE',
      images: JSON.stringify(['/images/magnetic-sticks-36pcs.jpg']),
      isFeatured: true,
      isPublished: true,
      ageRange: '3+ Years',
      weight: '430g',
      dimensions: '23cm x 18cm x 5cm',
      material: 'Strong Permanent Neodymium Magnets Encapsulated in Food-Grade ABS Plastic',
      whatsIncluded:
        '36 Pieces: Straight Magnetic Sticks, Curved Magnetic Arcs, Solid Steel Connecting Balls, 1 Model Idea Blueprint Book',
      safetyInfo:
        'Ultrasonically welded double-sealed plastic casing to prevent magnet release. Anti-swallowing size standards.',
      rating: 5.0,
      reviewCount: 51,
      badges: JSON.stringify(['36 Magnetic Pieces', '3D STEM Building', 'Curved & Straight Rods']),
      specs: JSON.stringify({
        Components: 'Straight Magnetic Rods, Curved Rods & Steel Balls',
        'Magnet Type': 'Strong Permanent Sealed Neodymium',
        Design: 'Chunky Anti-Swallow Design for Toddler Safety',
        Skills: '3D Spatial Geometry, Architectural Balance, Hand-Eye Coordination',
      }),
      seoTitle: 'Findo 36-Piece 3D Magnetic Sticks & Balls STEM Building Set | Findo',
      seoDescription:
        '36-piece 3D magnetic building sticks and spheres toy. Construct arches, 3D structures, and creative geometric shapes.',
    },
    {
      slug: 'yes-baby-interlocking-eva-foam-puzzle-mat',
      name: 'Yes Baby Interlocking EVA Foam Number Puzzle Play Mat',
      shortDesc: 'ISI-certified non-toxic cushioned EVA foam interlocking floor tiles with pop-out numbers & vibrant colors.',
      description:
        'Create a safe, colorful, and educational learning floor for your baby! The Yes Baby EVA Foam Puzzle Mat features high-density, shock-absorbing soft interlocking tiles with pop-out numbers (0-9) and vibrant primary colors. Perfect for tummy time, crawling, first steps, building 3D cubes, and early number recognition. Water-resistant, wipe-clean, and ISI certified (IS 9873) for ultimate peace of mind.',
      price: 549,
      compareAtPrice: 899,
      stock: 60,
      sku: 'FND-EVA-014',
      categoryId: catPuzzles.id,
      purpose: 'LEARN',
      images: JSON.stringify(['/images/eva-foam-puzzle-mat.jpg']),
      isFeatured: true,
      isPublished: true,
      ageRange: '0-6 Years',
      weight: '580g',
      dimensions: 'Each tile 23cm x 23cm x 1cm (Interlocking to cover floor area)',
      material: 'High-Density Non-Toxic EVA Foam (Formamide-Free & BPA-Free)',
      whatsIncluded:
        'Interlocking EVA Foam Tiles with Removable Pop-Out Numbers, Protective Clean Polybag Packing',
      safetyInfo:
        'ISI Certified (IS 9873). 100% Non-Toxic, BPA-Free, Lead-Free, Odorless, and Shock-Absorbing.',
      rating: 4.9,
      reviewCount: 48,
      badges: JSON.stringify(['ISI Certified IS 9873', 'Pop-Out Numbers', 'Soft Floor Cushion', 'Wipe-Clean']),
      specs: JSON.stringify({
        Certification: 'Bureau of Indian Standards ISI Mark (IS 9873)',
        Feature: 'Pop-Out Number Inserts & Interlocking Teeth',
        Cleaning: '100% Water Resistant & Wipe-Clean Surface',
        'Use Cases': 'Play Floor Mat, Crawling Cushion, 3D Building Blocks',
      }),
      seoTitle: 'Yes Baby Interlocking EVA Foam Number Puzzle Play Mat | Findo',
      seoDescription:
        'ISI certified non-toxic EVA foam interlocking puzzle play mat for babies and toddlers. Removable pop-out number tiles.',
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

addFourMoreProducts()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

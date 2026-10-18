const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateProducts() {
  console.log('🔄 Updating Findo database with authentic branded products...');

  const categories = await prisma.category.findMany();
  const catHabits = categories.find((c) => c.slug === 'habits-routines') || categories[0];
  const catPuzzles = categories.find((c) => c.slug === 'puzzles-logic') || categories[1];
  const catSTEM = categories.find((c) => c.slug === 'stem-construction') || categories[2];

  const productsToUpsert = [
    {
      slug: 'habit-tracker',
      name: 'Findo Kids Daily Routine & Habit Tracker Board',
      shortDesc: 'Visual daily habit builder board with sliding completion toggles for morning & bedtime routines.',
      description:
        'Help your child build lifelong positive habits, discipline, and daily focus! The Findo Kids Habit Tracker features smooth sliding checkmark/cross toggles for daily tasks—like morning reading, calligraphy, homework, room cleanup, exercise, and bedtime reading. Equipped with weekly reward tracking, a sturdy tabletop kickstand, and refillable activity schedule cards.',
      price: 699,
      compareAtPrice: 1199,
      stock: 50,
      sku: 'FND-HT-001',
      categoryId: catHabits.id,
      purpose: 'BUILD HABITS',
      images: JSON.stringify(['/images/habit-tracker.jpg', '/habit-tracker.jpg']),
      isFeatured: true,
      isPublished: true,
      ageRange: '3-10 Years',
      weight: '320g',
      dimensions: '25cm x 18cm x 2cm',
      material: 'Durable BPA-free ABS Polymer & Reusable Schedule Cards',
      whatsIncluded:
        '1 Findo Habit Tracker Slider Board with Desk Stand, 10 Routine Schedule Cards, Weekly Achievement Tracker',
      safetyInfo:
        'Non-toxic, smooth rounded corners, ASTM & EN71 certified safe for toddlers and children.',
      rating: 4.9,
      reviewCount: 42,
      badges: JSON.stringify(['Bestseller', 'Focus & Discipline', 'Screen-Free']),
      specs: JSON.stringify({
        Display: 'Sliding Checkmark/Cross Buttons',
        Mounting: 'Foldable Desk Kickstand & Wall Mountable',
        Feature: 'Daily Routine + Weekly Score Tracking',
        'Included Tasks': 'Reading, Homework, Room Tidy, Exercise, Bedtime',
      }),
      seoTitle: 'Findo Kids Daily Routine & Habit Tracker Board | Visual Discipline Checklist',
      seoDescription:
        'Empower your child with daily focus and positive routines using the Findo visual habit tracker board with sliding check toggles.',
    },
    {
      slug: 'match-and-learn-mathematic-puzzle',
      name: "Ratna's Match & Learn Mathematic Puzzle Kit",
      shortDesc: '48-piece interactive self-correcting math puzzle for early number sense, counting & basic arithmetic.',
      description:
        "Make learning basic math a fun, hands-on game! Ratna's Match & Learn Mathematic is an educational first learners puzzle featuring 48 thick, colorful puzzle pieces. Children match quantities of everyday objects (balls, cups, fingers) with corresponding numerals and simple addition/subtraction equations. Boosts brain development, hand-eye coordination, and logical thinking.",
      price: 499,
      compareAtPrice: 799,
      stock: 40,
      sku: 'FND-ML-002',
      categoryId: catPuzzles.id,
      purpose: 'LEARN',
      images: JSON.stringify(['/images/math-puzzle-kit.jpg']),
      isFeatured: true,
      isPublished: true,
      ageRange: '3+ Years',
      weight: '420g',
      dimensions: '28cm x 20cm x 4cm',
      material: 'Sturdy Non-Toxic Laminated Hardboard',
      whatsIncluded:
        '48 Self-Correcting Math Puzzle Pieces, Free Digital Learning QR Code, Instruction Guide',
      safetyInfo: 'Child-safe vegetable-based inks, smooth edges, BIS certified.',
      rating: 4.8,
      reviewCount: 28,
      badges: JSON.stringify(['Early Learning', 'Brain Development', 'Hand-Eye Coordination']),
      specs: JSON.stringify({
        'Piece Count': '48 Jigsaw Puzzle Pieces',
        'Concepts Covered': 'Number Recognition, Object Counting, Addition & Subtraction',
        'Recommended Age': '3 to 7 Years',
        Bonus: 'Free Digital Interactive QR Content',
      }),
      seoTitle: "Ratna's Match & Learn Mathematic Puzzle | Findo Kids",
      seoDescription:
        '48-piece first learners math puzzle kit for kids ages 3+. Develops counting, number recognition, and arithmetic confidence.',
    },
    {
      slug: '3-in-1-science-lab-kit',
      name: 'Play Craft 3-in-1 Science Lab Experiment Kit',
      shortDesc: 'Comprehensive STEM laboratory with 155+ experiments across Physics, Chemistry & Biology.',
      description:
        'Turn your home into an exciting discovery lab! The Play Craft 3-in-1 Science Lab features over 155 thrilling hands-on experiments covering physics principles, chemical reactions, and biological wonders. Packed with 40+ real lab tools, test tubes, rack, pipettes, safe ingredients, and protective goggles. Perfect for young scientists exploring how the world works!',
      price: 1299,
      compareAtPrice: 1999,
      stock: 35,
      sku: 'FND-SL-003',
      categoryId: catSTEM.id,
      purpose: 'EXPLORE',
      images: JSON.stringify(['/images/science-lab-3in1.jpg']),
      isFeatured: true,
      isPublished: true,
      ageRange: '8+ Years',
      weight: '850g',
      dimensions: '34cm x 26cm x 7cm',
      material: 'High-Grade Laboratory Safe Plastic & Certified Ingredients',
      whatsIncluded:
        '40+ Lab Tools & Ingredients, Test Tubes, Test Tube Stand, Safety Goggles, Beakers, Pipettes, Detailed Step-by-Step Experiment Manual',
      safetyInfo:
        'Non-hazardous, child-friendly chemical reagents. Conforms to Indian and International STEM toy safety standards.',
      rating: 5.0,
      reviewCount: 36,
      badges: JSON.stringify(['155+ Experiments', 'Physics + Chem + Bio', 'Ultimate STEM Gift']),
      specs: JSON.stringify({
        'Experiment Count': '155+ Documented Experiments',
        Subjects: 'Physics, Chemistry, Biology',
        'Lab Equipment': '40+ Tools, Reagents & Apparatus',
        'Safety Goggles': 'Included in the Box',
      }),
      seoTitle: 'Play Craft 3-in-1 Science Lab Kit | 155+ Experiments | Findo',
      seoDescription:
        'Over 155+ exciting science experiments in Physics, Chemistry, and Biology. Complete hands-on STEM lab kit for curious kids 8+.',
    },
    {
      slug: 'my-super-chemistry-lab',
      name: 'Explore STEM My Super Chemistry Lab Kit',
      shortDesc: 'Hands-on beginner chemistry laboratory set for fun everyday chemical reaction experiments.',
      description:
        'Unleash your child’s inner scientist! My Super Chemistry Lab by Explore teaches the fundamentals of chemical reactions through safe, colorful, and fascinating experiments using lab apparatus and everyday household materials. Includes safety goggles, test tubes with stand, measuring beakers, balloons, pipettes, and illustrated guides explaining the science behind each reaction.',
      price: 899,
      compareAtPrice: 1499,
      stock: 45,
      sku: 'FND-CH-004',
      categoryId: catSTEM.id,
      purpose: 'LEARN',
      images: JSON.stringify(['/images/super-chemistry-lab.jpg']),
      isFeatured: true,
      isPublished: true,
      ageRange: '8+ Years',
      weight: '680g',
      dimensions: '30cm x 22cm x 6cm',
      material: 'BPA-Free Child-Safe Lab Polymers & Reagents',
      whatsIncluded:
        'Test Tubes, Test Tube Rack, Safety Glasses, Graduated Beakers, Pipettes, Measuring Spatulas, Reaction Chemicals, Full Color Manual',
      safetyInfo:
        '100% Non-Toxic & Skin-Safe Reagents. Adult supervision recommended for 8+.',
      rating: 4.9,
      reviewCount: 31,
      badges: JSON.stringify(['STEM Certified', 'Real Lab Gear', 'Hands-on Chemistry']),
      specs: JSON.stringify({
        'Focus Area': 'Color Changing Reactions, Gas Formation & Solutions',
        Apparatus: 'Full Chemistry Set with Rack & Beakers',
        'Safety Gear': 'Child-Size Eye Protection Glasses Included',
        'Skill Level': 'Beginner to Intermediate STEM',
      }),
      seoTitle: 'Explore STEM My Super Chemistry Lab Kit | Findo Kids',
      seoDescription:
        'Discover chemical magic with My Super Chemistry Lab. Safe hands-on science kit for curious kids ages 8 and above.',
    },
  ];

  for (const prod of productsToUpsert) {
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

  // Also verify total products
  const count = await prisma.product.count();
  console.log('🎉 Total products in DB:', count);
}

updateProducts()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

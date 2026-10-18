const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateAllProducts() {
  console.log('🔄 Upserting all 7 authentic branded Findo products...');

  const categories = await prisma.category.findMany();
  const catHabits = categories.find((c) => c.slug === 'habits-routines') || categories[0];
  const catPuzzles = categories.find((c) => c.slug === 'puzzles-logic') || categories[1];
  const catSTEM = categories.find((c) => c.slug === 'stem-construction') || categories[2];

  const products = [
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
      safetyInfo: 'Non-toxic, smooth rounded corners, ASTM & EN71 certified safe for toddlers and children.',
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
      slug: 'creative-puzzle-box',
      name: 'Han Bo DIY STEM Creative Puzzle Box with Electric Drill (232 Pcs)',
      shortDesc: '232-piece engineering toolbox with real battery-powered electric drill, screws & pegboard.',
      description:
        'Empower little builders with the Han Bo DIY STEM Creative Puzzle Box! Packed with 232 colorful building pieces, an electric toy drill with reversible rotation, manual screwdriver, spanner, nuts, bolts, and geometric plates. The compact space-themed suitcase doubles as both a sturdy work pegboard and an on-the-go storage box. Fosters fine motor skills, spatial engineering, and hours of creative construction.',
      price: 999,
      compareAtPrice: 1699,
      stock: 45,
      sku: 'FND-PB-002',
      categoryId: catSTEM.id,
      purpose: 'CREATE',
      images: JSON.stringify([
        '/images/creative-puzzle-box.jpg',
        '/images/creative-puzzle-box-2.jpg',
      ]),
      isFeatured: true,
      isPublished: true,
      ageRange: '3+ Years',
      weight: '750g',
      dimensions: '30cm x 24cm x 7cm',
      material: 'High-Impact BPA-Free Child-Safe ABS Polymer',
      whatsIncluded:
        '232 Pieces: 1 Multi-Use Tool Suitcase / Work Pegboard, 1 Electric Reversible Drill, 2 Drill Bits, 1 Screwdriver Handle, 1 Wrench, Colorful Geometric Peg Plates, Screws, Nuts, and 1 Pattern Idea Guidebook',
      safetyInfo: 'Smooth rounded edges, safe low-speed torque drill designed specifically for small hands.',
      rating: 4.9,
      reviewCount: 35,
      badges: JSON.stringify(['232 Pieces', 'Real Electric Drill', 'STEM Certified']),
      specs: JSON.stringify({
        'Piece Count': '232 Interlocking Components',
        'Power Tool': 'Dual-Direction Electric Screw Gun (Requires 2 AA Batteries)',
        Storage: 'Portable Space-Themed Suitcase & Activity Board',
        'Skills Developed': 'Fine Motor Grip, Spatial Engineering, Creativity',
      }),
      seoTitle: 'Han Bo DIY STEM Creative Puzzle Box with Electric Drill (232 Pcs) | Findo',
      seoDescription:
        '232-piece kids DIY puzzle toolbox with reversible electric toy drill, screws, and pegboard suitcase for young engineers.',
    },
    {
      slug: 'balance-tower',
      name: 'Tetra Tower Stacking & Balance Game (Building Blocks)',
      shortDesc: 'Exciting equilibrium stacking challenge with colorful geometric tetrominoes and wobble base.',
      description:
        'Test your nerve and balance with the Findo Tetra Tower! Designed for solo play or thrilling multiplayer family game nights, players draw challenge cards and take turns stacking vibrant geometric blocks atop a rocking equilibrium base. One wrong move and the tower wobbles and crashes! Teaches physics, gravity, patience, and fine motor precision.',
      price: 699,
      compareAtPrice: 1199,
      stock: 50,
      sku: 'FND-BT-003',
      categoryId: catPuzzles.id,
      purpose: 'PLAY',
      images: JSON.stringify(['/images/tetra-tower.jpg']),
      isFeatured: true,
      isPublished: true,
      ageRange: '3-99 Years',
      weight: '380g',
      dimensions: '22cm x 15cm x 6cm',
      material: 'Drop-Resistant Non-Toxic ABS Plastic',
      whatsIncluded:
        '1 Rocking Wobble Base, 1 Balancing Pedestal, 32 or 48 Vibrant Geometric Tetra Blocks, 1 Challenge Card Deck',
      safetyInfo: 'Smooth rounded edges, zero phthalates, non-toxic vibrant colors.',
      rating: 5.0,
      reviewCount: 56,
      badges: JSON.stringify(['Family Game Night', 'Viral Favorite', 'Balance & Focus']),
      specs: JSON.stringify({
        'Game Type': 'Physics Balancing & Stacking Board Game',
        Players: '1 to 4 Players',
        Blocks: 'Vibrant Geometric Tetromino Pieces',
        Cards: 'Deck of Placement Challenge Cards Included',
      }),
      seoTitle: 'Tetra Tower Stacking & Balance Game | Building Blocks | Findo',
      seoDescription:
        'Viral Tetra Tower equilibrium stacking and balance game with rocking base and challenge cards. Fun for kids and family game night.',
    },
    {
      slug: 'tangram-wooden-puzzle-set',
      name: 'Tangram Woodiness Montessori Geometric Puzzle Set',
      shortDesc: '7-piece natural wooden tangram puzzle with green playing mat and 30+ silhouette challenge guide.',
      description:
        'Introduce your child to the timeless ancient art of Tangram with a modern Montessori touch! Tangram Woodiness includes 7 beautifully polished, vibrant wooden polygons, a non-slip green puzzle board mat, and an illustrated challenge guide. Kids arrange triangles, squares, and parallelograms to build cats, swans, boats, trees, runners, and hundreds of imaginative silhouettes.',
      price: 599,
      compareAtPrice: 999,
      stock: 45,
      sku: 'FND-TG-007',
      categoryId: catPuzzles.id,
      purpose: 'CREATE',
      images: JSON.stringify(['/images/tangram-woodiness.jpg']),
      isFeatured: true,
      isPublished: true,
      ageRange: '3-8 Years',
      weight: '340g',
      dimensions: '20cm x 20cm x 3cm',
      material: 'Sustainably Sourced Natural Polished Wood & Water-Based Eco Stains',
      whatsIncluded:
        '7 Precision Wooden Tangram Blocks, 1 Green Display & Play Mat, 1 Multi-Page Pattern Idea & Challenge Booklet',
      safetyInfo: 'Splinter-free polished wood, child-safe water-based non-toxic colors.',
      rating: 4.8,
      reviewCount: 33,
      badges: JSON.stringify(['Montessori Wooden', 'Spatial Logic', 'Screen-Free Play']),
      specs: JSON.stringify({
        'Piece Count': '7 Precision Wooden Pieces',
        'Wood Type': 'Solid Natural Polished Beechwood',
        Board: 'Sturdy Non-Slip Framing Mat',
        Patterns: 'Booklet with 30+ Animal & Object Shape Targets',
      }),
      seoTitle: 'Tangram Woodiness Montessori Geometric Puzzle Set | Findo Kids',
      seoDescription:
        'Classic 7-piece Montessori wooden tangram puzzle set with puzzle mat and pattern booklet. Develops spatial geometry and creativity.',
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

  for (const prod of products) {
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

  const all = await prisma.product.findMany({ select: { id: true, name: true, slug: true, images: true } });
  console.log('🎉 Total products:', all.length);
}

updateAllProducts()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

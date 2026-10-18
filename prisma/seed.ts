import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + 'findo_salt_2026').digest('hex');
}

async function main() {
  console.log('🌱 Starting Findo database seeding...');

  // Clean existing records
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.adminUser.deleteMany();
  await prisma.customerQuery.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.setting.deleteMany();

  // Create Categories
  const catHabits = await prisma.category.create({
    data: {
      name: 'Habits & Routines',
      slug: 'habits-routines',
      description: 'Interactive boards and trackers that help children build independent daily routines and healthy habits.',
      image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800',
    },
  });

  const catPuzzles = await prisma.category.create({
    data: {
      name: 'Puzzles & Logic',
      slug: 'puzzles-logic',
      description: 'Tactile wooden puzzles and brain-teasers that develop critical thinking and spatial problem-solving.',
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800',
    },
  });

  const catSTEM = await prisma.category.create({
    data: {
      name: 'STEM & Construction',
      slug: 'stem-construction',
      description: 'Hands-on architectural and mechanical sets that introduce principles of engineering and science.',
      image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=800',
    },
  });

  const catExploration = await prisma.category.create({
    data: {
      name: 'Exploration & Art',
      slug: 'exploration-art',
      description: 'Screen-free maps, scratch pads, and creative kits that ignite curiosity about geography and nature.',
      image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800',
    },
  });

  console.log('✅ Categories created.');

  // Create authentic FINDO products
  const productsData = [
    {
      name: 'Findo Kids Daily Routine & Habit Tracker Board',
      slug: 'habit-tracker',
      shortDesc: 'Visual daily habit builder board with sliding completion toggles for morning & bedtime routines.',
      description:
        'Help your child build lifelong positive habits, discipline, and daily focus! The Findo Kids Habit Tracker features smooth sliding checkmark/cross toggles for daily tasks—like morning reading, calligraphy, homework, room cleanup, exercise, and bedtime reading. Equipped with weekly reward tracking, a sturdy tabletop kickstand, and refillable activity schedule cards.',
      price: 699,
      compareAtPrice: 1199,
      stock: 50,
      sku: 'FND-HT-001',
      categoryId: catHabits.id,
      purpose: 'BUILD HABITS',
      images: JSON.stringify([
        '/images/habit-tracker.jpg',
        '/habit-tracker.jpg',
      ]),
      isFeatured: true,
      isPublished: true,
      ageRange: '3-10 Years',
      weight: '320g',
      dimensions: '25cm x 18cm x 2cm',
      material: 'Durable BPA-free ABS Polymer & Reusable Schedule Cards',
      whatsIncluded: '1 Findo Habit Tracker Slider Board with Desk Stand, 10 Routine Schedule Cards, Weekly Achievement Tracker',
      safetyInfo: 'Non-toxic, smooth rounded corners, ASTM & EN71 certified safe for toddlers and children.',
      rating: 4.9,
      reviewCount: 42,
      badges: JSON.stringify(['Bestseller', 'Focus & Discipline', 'Screen-Free']),
      specs: JSON.stringify({
        'Display': 'Sliding Checkmark/Cross Buttons',
        'Mounting': 'Foldable Desk Kickstand & Wall Mountable',
        'Feature': 'Daily Routine + Weekly Score Tracking',
        'Included Tasks': 'Reading, Homework, Room Tidy, Exercise, Bedtime',
      }),
      seoTitle: 'Findo Kids Daily Routine & Habit Tracker Board | Visual Discipline Checklist',
      seoDescription: 'Empower your child with daily focus and positive routines using the Findo visual habit tracker board with sliding check toggles.',
    },
    {
      name: "Ratna's Match & Learn Mathematic Puzzle Kit",
      slug: 'match-and-learn-mathematic-puzzle',
      shortDesc: '48-piece interactive self-correcting math puzzle for early number sense, counting & basic arithmetic.',
      description:
        "Make learning basic math a fun, hands-on game! Ratna's Match & Learn Mathematic is an educational first learners puzzle featuring 48 thick, colorful puzzle pieces. Children match quantities of everyday objects (balls, cups, fingers) with corresponding numerals and simple addition/subtraction equations. Boosts brain development, hand-eye coordination, and logical thinking.",
      price: 499,
      compareAtPrice: 799,
      stock: 40,
      sku: 'FND-ML-002',
      categoryId: catPuzzles.id,
      purpose: 'LEARN',
      images: JSON.stringify([
        '/images/math-puzzle-kit.jpg',
      ]),
      isFeatured: true,
      isPublished: true,
      ageRange: '3+ Years',
      weight: '420g',
      dimensions: '28cm x 20cm x 4cm',
      material: 'Sturdy Non-Toxic Laminated Hardboard',
      whatsIncluded: '48 Self-Correcting Math Puzzle Pieces, Free Digital Learning QR Code, Instruction Guide',
      safetyInfo: 'Child-safe vegetable-based inks, smooth edges, BIS certified.',
      rating: 4.8,
      reviewCount: 28,
      badges: JSON.stringify(['Early Learning', 'Brain Development', 'Hand-Eye Coordination']),
      specs: JSON.stringify({
        'Piece Count': '48 Jigsaw Puzzle Pieces',
        'Concepts Covered': 'Number Recognition, Object Counting, Addition & Subtraction',
        'Recommended Age': '3 to 7 Years',
        'Bonus': 'Free Digital Interactive QR Content',
      }),
      seoTitle: "Ratna's Match & Learn Mathematic Puzzle | Findo Kids",
      seoDescription: '48-piece first learners math puzzle kit for kids ages 3+. Develops counting, number recognition, and arithmetic confidence.',
    },
    {
      name: 'Play Craft 3-in-1 Science Lab Experiment Kit',
      slug: '3-in-1-science-lab-kit',
      shortDesc: 'Comprehensive STEM laboratory with 155+ experiments across Physics, Chemistry & Biology.',
      description:
        'Turn your home into an exciting discovery lab! The Play Craft 3-in-1 Science Lab features over 155 thrilling hands-on experiments covering physics principles, chemical reactions, and biological wonders. Packed with 40+ real lab tools, test tubes, rack, pipettes, safe ingredients, and protective goggles. Perfect for young scientists exploring how the world works!',
      price: 1299,
      compareAtPrice: 1999,
      stock: 35,
      sku: 'FND-SL-003',
      categoryId: catSTEM.id,
      purpose: 'EXPLORE',
      images: JSON.stringify([
        '/images/science-lab-3in1.jpg',
      ]),
      isFeatured: true,
      isPublished: true,
      ageRange: '8+ Years',
      weight: '850g',
      dimensions: '34cm x 26cm x 7cm',
      material: 'High-Grade Laboratory Safe Plastic & Certified Ingredients',
      whatsIncluded: '40+ Lab Tools & Ingredients, Test Tubes, Test Tube Stand, Safety Goggles, Beakers, Pipettes, Detailed Step-by-Step Experiment Manual',
      safetyInfo: 'Non-hazardous, child-friendly chemical reagents. Conforms to Indian and International STEM toy safety standards.',
      rating: 5.0,
      reviewCount: 36,
      badges: JSON.stringify(['155+ Experiments', 'Physics + Chem + Bio', 'Ultimate STEM Gift']),
      specs: JSON.stringify({
        'Experiment Count': '155+ Documented Experiments',
        'Subjects': 'Physics, Chemistry, Biology',
        'Lab Equipment': '40+ Tools, Reagents & Apparatus',
        'Safety Goggles': 'Included in the Box',
      }),
      seoTitle: 'Play Craft 3-in-1 Science Lab Kit | 155+ Experiments | Findo',
      seoDescription: 'Over 155+ exciting science experiments in Physics, Chemistry, and Biology. Complete hands-on STEM lab kit for curious kids 8+.',
    },
    {
      name: 'Explore STEM My Super Chemistry Lab Kit',
      slug: 'my-super-chemistry-lab',
      shortDesc: 'Hands-on beginner chemistry laboratory set for fun everyday chemical reaction experiments.',
      description:
        'Unleash your child’s inner scientist! My Super Chemistry Lab by Explore teaches the fundamentals of chemical reactions through safe, colorful, and fascinating experiments using lab apparatus and everyday household materials. Includes safety goggles, test tubes with stand, measuring beakers, balloons, pipettes, and illustrated guides explaining the science behind each reaction.',
      price: 899,
      compareAtPrice: 1499,
      stock: 45,
      sku: 'FND-CH-004',
      categoryId: catSTEM.id,
      purpose: 'LEARN',
      images: JSON.stringify([
        '/images/super-chemistry-lab.jpg',
      ]),
      isFeatured: true,
      isPublished: true,
      ageRange: '8+ Years',
      weight: '680g',
      dimensions: '30cm x 22cm x 6cm',
      material: 'BPA-Free Child-Safe Lab Polymers & Reagents',
      whatsIncluded: 'Test Tubes, Test Tube Rack, Safety Glasses, Graduated Beakers, Pipettes, Measuring Spatulas, Reaction Chemicals, Full Color Manual',
      safetyInfo: '100% Non-Toxic & Skin-Safe Reagents. Adult supervision recommended for 8+.',
      rating: 4.9,
      reviewCount: 31,
      badges: JSON.stringify(['STEM Certified', 'Real Lab Gear', 'Hands-on Chemistry']),
      specs: JSON.stringify({
        'Focus Area': 'Color Changing Reactions, Gas Formation & Solutions',
        'Apparatus': 'Full Chemistry Set with Rack & Beakers',
        'Safety Gear': 'Child-Size Eye Protection Glasses Included',
        'Skill Level': 'Beginner to Intermediate STEM',
      }),
      seoTitle: 'Explore STEM My Super Chemistry Lab Kit | Findo Kids',
      seoDescription: 'Discover chemical magic with My Super Chemistry Lab. Safe hands-on science kit for curious kids ages 8 and above.',
    },
    {
      name: 'Han Bo DIY STEM Creative Puzzle Box with Electric Drill (232 Pcs)',
      slug: 'creative-puzzle-box',
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
        'Storage': 'Portable Space-Themed Suitcase & Activity Board',
        'Skills Developed': 'Fine Motor Grip, Spatial Engineering, Creativity',
      }),
      seoTitle: 'Han Bo DIY STEM Creative Puzzle Box with Electric Drill (232 Pcs) | Findo',
      seoDescription:
        '232-piece kids DIY puzzle toolbox with reversible electric toy drill, screws, and pegboard suitcase for young engineers.',
    },
    {
      name: 'Tetra Tower Stacking & Balance Game (Building Blocks)',
      slug: 'balance-tower',
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
        'Players': '1 to 4 Players',
        'Blocks': 'Vibrant Geometric Tetromino Pieces',
        'Cards': 'Deck of Placement Challenge Cards Included',
      }),
      seoTitle: 'Tetra Tower Stacking & Balance Game | Building Blocks | Findo',
      seoDescription:
        'Viral Tetra Tower equilibrium stacking and balance game with rocking base and challenge cards. Fun for kids and family game night.',
    },
    {
      name: 'Mini Map Pad',
      slug: 'mini-map-pad',
      shortDesc: 'Interactive scratch & color map pad for young world explorers and geography lovers.',
      description:
        'Ignite your child’s passion for world discovery! The Findo Mini Map Pad lets kids scratch away country boundaries to reveal vibrant hidden colors, landmarks, and animals underneath. Compact and travel-ready.',
      price: 549,
      compareAtPrice: 899,
      stock: 60,
      sku: 'FND-MM-004',
      categoryId: catExploration.id,
      purpose: 'EXPLORE',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800',
      ]),
      isFeatured: true,
      isPublished: true,
      ageRange: '5-12 Years',
      weight: '210g',
      dimensions: '28cm x 20cm',
      material: 'Heavyweight archival paper with safe scratch coating',
      whatsIncluded: '15 Map Sheets, 2 Wooden Scratch Stylus Pens, Sticker Sheet',
      safetyInfo: 'Odorless scratch coating, 100% child safe and clean.',
      rating: 4.7,
      reviewCount: 24,
      badges: JSON.stringify(['Geography Fun', 'Travel Companion', 'Scratch Art']),
      specs: JSON.stringify({
        'Sheets': '15 Scratchable Country & Continent Maps',
        'Stylus': 'Dual-tip wooden pen included',
        'Format': 'Spiral Bound Booklet',
      }),
      seoTitle: 'Findo Mini Map Pad | Interactive Geography Scratch Pad',
      seoDescription: 'Scratch and discover the world with the Findo Mini Map Pad for curious young explorers.',
    },
    {
      name: 'Daily Routine Planner Board',
      slug: 'daily-routine-planner-board',
      shortDesc: 'Magnetic visual schedule organizer designed for calm morning & bedtime transitions.',
      description:
        'Transform chaotic morning rushes into peaceful independent routines! The Findo Daily Routine Planner uses colorful magnetic activity tiles that empower children to manage their own morning, afternoon, and bedtime schedules.',
      price: 999,
      compareAtPrice: 1699,
      stock: 25,
      sku: 'FND-DP-005',
      categoryId: catHabits.id,
      purpose: 'BUILD HABITS',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800',
      ]),
      isFeatured: true,
      isPublished: true,
      ageRange: '3-9 Years',
      weight: '620g',
      dimensions: '35cm x 28cm x 1.5cm',
      material: 'Magnetic rubber sheet with beechwood frame',
      whatsIncluded: '1 Magnetic Board, 48 Visual Routine Tiles, 1 Storage Pouch',
      safetyInfo: 'Encapsulated magnets that cannot be swallowed. ASTM safety verified.',
      rating: 4.9,
      reviewCount: 46,
      badges: JSON.stringify(['Parent Must-Have', 'Visual Schedule', 'Encapsulated Magnets']),
      specs: JSON.stringify({
        'Tile Count': '48 Magnetic Activity Tokens',
        'Board Type': 'Dual-Sided (Morning & Evening)',
        'Frame': 'Natural Solid Wood',
      }),
      seoTitle: 'Findo Daily Routine Planner Board | Visual Kids Schedule',
      seoDescription: 'Empower toddlers and kids with independent routines using the magnetic Findo Daily Routine Planner.',
    },
    {
      name: 'STEM DIY Building Blocks',
      slug: 'stem-diy-building-blocks',
      shortDesc: 'Interlocking gear & motion engineering set to foster early problem-solving skills.',
      description:
        'Watch gears spin, chains move, and structures come alive! The Findo STEM DIY Building Blocks kit features interlocking gears, axles, and cranks that teach cause-and-effect mechanics through hands-on creative building.',
      price: 1199,
      compareAtPrice: 1999,
      stock: 35,
      sku: 'FND-ST-006',
      categoryId: catSTEM.id,
      purpose: 'LEARN',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800',
      ]),
      isFeatured: true,
      isPublished: true,
      ageRange: '4-10 Years',
      weight: '780g',
      dimensions: '30cm x 22cm x 8cm',
      material: 'High-density BPA-free Polypropylene',
      whatsIncluded: '82 Interlocking Gears & Axles, Hand Crank, Idea Blueprint Booklet',
      safetyInfo: 'Phthalate-free, lead-free, non-hazardous smooth plastics.',
      rating: 4.9,
      reviewCount: 31,
      badges: JSON.stringify(['STEM Certified', 'Gear Mechanics', 'Hands-On']),
      specs: JSON.stringify({
        'Pieces': '82 Construction Elements',
        'Mechanism': 'Manual Crank & Chain Drives',
        'Storage': 'Includes Snap-Tight Carrying Case',
      }),
      seoTitle: 'Findo STEM DIY Building Blocks | Gear Engineering Set',
      seoDescription: 'Inspire future engineers with the Findo STEM DIY gear building block kit.',
    },
    {
      name: 'Tangram Woodiness Montessori Geometric Puzzle Set',
      slug: 'tangram-wooden-puzzle-set',
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
        'Board': 'Sturdy Non-Slip Framing Mat',
        'Patterns': 'Booklet with 30+ Animal & Object Shape Targets',
      }),
      seoTitle: 'Tangram Woodiness Montessori Geometric Puzzle Set | Findo Kids',
      seoDescription:
        'Classic 7-piece Montessori wooden tangram puzzle set with puzzle mat and pattern booklet. Develops spatial geometry and creativity.',
    },
    {
      name: 'Findo DIY Instant Print Kids Digital Camera',
      slug: 'kids-instant-print-digital-camera',
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
        'Screen': '2.4 Inch IPS Eye-Protection Color Screen',
        'Functions': 'Dual Camera (Front & Selfie), 1080P Video, Games, MP3',
        'Battery': 'Rechargeable 1000mAh Lithium-ion (USB-C Charging)',
      }),
      seoTitle: 'Findo DIY Instant Print Kids Digital Camera | Zero-Ink Thermal Camera',
      seoDescription:
        'Kids instant print camera with zero-ink thermal printing, HD photos, 1080p video recording, and creative sticker filters.',
    },
    {
      name: 'DIY My Working Solar System Planetarium Model Kit',
      slug: 'diy-working-solar-system-model',
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
        'Rotation': 'Manual 360-degree Rotating Orbital Arms',
        'Colors': '6 Washable Non-Toxic Vibrant Paint Tubs with Brush',
        'Skill Focus': 'Astronomy Science, Fine Motor Painting, Spatial Awareness',
      }),
      seoTitle: 'DIY My Working Solar System Model Kit | Findo Kids',
      seoDescription:
        'Assemble, paint and learn with the DIY Working Solar System model kit. 360-degree rotating planets and full astronomy guide.',
    },
    {
      name: 'Ekta Magna Play Magnetic Art & Puzzle Kit (300 Round Magnets)',
      slug: 'ekta-magna-play-magnetic-art-puzzle',
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
        'Canvases': 'Multiple Magnetic Black Canvas Boards',
        'Pattern Guide': 'Full-Color Booklet with 400+ Mosaic Challenges',
        'Core Benefits': 'Pattern Recognition, Color Theory, Creative Confidence',
      }),
      seoTitle: 'Ekta Magna Play Magnetic Art & Puzzle Kit (300 Magnets) | Findo',
      seoDescription:
        '300 colorful round magnetic pieces with pattern booklet for 400+ creative picture designs. Creative mosaic art game for kids.',
    },
    {
      name: 'Findo Kids Educational Microscope Science Kit (100X-450X)',
      slug: 'kids-educational-microscope-science-kit',
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
        'Illumination': 'Built-In LED Light Source & Specimen Stage Clips',
        'Accessories': 'Collection Vials, Specimen Slides & Tweezers Included',
        'Focusing': 'Smooth Coaxial Coarse Adjustment Knobs',
      }),
      seoTitle: 'Findo Kids Educational Microscope Science Kit (100X-450X) | Findo',
      seoDescription:
        'Educational microscope for kids with 100X to 450X magnification, LED lighting, and specimen preparation toolkit.',
    },
    {
      name: 'Anmol "So, Fashion You!" Portable Vanity Beauty Suitcase (3+)',
      slug: 'anmol-fashion-vanity-beauty-suitcase',
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
        'Mobility': 'Rolling Wheels & Carry Handle (Suitcase Mode)',
        'Pieces': '15+ Salon Grooming & Jewelry Accessories',
        'Age Group': 'Ages 3 to 7 Years',
      }),
      seoTitle: 'Anmol "So, Fashion You!" Vanity Beauty Bus Suitcase | Findo Kids',
      seoDescription:
        'Kids portable 2-in-1 vanity beauty dressing table suitcase with hair dryer, accessories, mirror, and jewelry.',
    },
    {
      name: 'Findo 36-Piece 3D Magnetic Sticks & Balls STEM Building Set',
      slug: '36-pcs-magnetic-sticks-building-set',
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
        'Components': 'Straight Magnetic Rods, Curved Rods & Steel Balls',
        'Magnet Type': 'Strong Permanent Sealed Neodymium',
        'Design': 'Chunky Anti-Swallow Design for Toddler Safety',
        'Skills': '3D Spatial Geometry, Architectural Balance, Hand-Eye Coordination',
      }),
      seoTitle: 'Findo 36-Piece 3D Magnetic Sticks & Balls STEM Building Set | Findo',
      seoDescription:
        '36-piece 3D magnetic building sticks and spheres toy. Construct arches, 3D structures, and creative geometric shapes.',
    },
    {
      name: 'Yes Baby Interlocking EVA Foam Number Puzzle Play Mat',
      slug: 'yes-baby-interlocking-eva-foam-puzzle-mat',
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
        'Certification': 'Bureau of Indian Standards ISI Mark (IS 9873)',
        'Feature': 'Pop-Out Number Inserts & Interlocking Teeth',
        'Cleaning': '100% Water Resistant & Wipe-Clean Surface',
        'Use Cases': 'Play Floor Mat, Crawling Cushion, 3D Building Blocks',
      }),
      seoTitle: 'Yes Baby Interlocking EVA Foam Number Puzzle Play Mat | Findo',
      seoDescription:
        'ISI certified non-toxic EVA foam interlocking puzzle play mat for babies and toddlers. Removable pop-out number tiles.',
    },
  ];

  for (const item of productsData) {
    const createdProduct = await prisma.product.create({ data: item });
    
    // Add 2 reviews per product
    await prisma.review.create({
      data: {
        productId: createdProduct.id,
        customerName: 'Ananya S.',
        customerEmail: 'ananya@example.com',
        rating: 5,
        comment: `We love the ${createdProduct.name}! My kids spend hours using it every day without asking for screen time.`,
        isApproved: true,
        isVerifiedPurchase: true,
      },
    });

    await prisma.review.create({
      data: {
        productId: createdProduct.id,
        customerName: 'Vikram R.',
        customerEmail: 'vikram@example.com',
        rating: 5,
        comment: `Excellent build quality. Super smooth edges and safe for little hands. Fast delivery from Findo too!`,
        isApproved: true,
        isVerifiedPurchase: true,
      },
    });
  }

  console.log('✅ 7 Products & Customer Reviews seeded successfully.');

  // Create Store Coupons
  await prisma.coupon.create({
    data: {
      code: 'WELCOME10',
      discountType: 'PERCENTAGE',
      discountValue: 10,
      minOrderValue: 499,
      isActive: true,
    },
  });

  await prisma.coupon.create({
    data: {
      code: 'FREESHIP',
      discountType: 'FIXED',
      discountValue: 79,
      minOrderValue: 999,
      isActive: true,
    },
  });

  await prisma.coupon.create({
    data: {
      code: 'FINDO100',
      discountType: 'FIXED',
      discountValue: 100,
      minOrderValue: 699,
      isActive: true,
    },
  });

  console.log('✅ Store coupons seeded.');

  // Create Default Store Settings
  await prisma.setting.create({
    data: {
      id: 'default',
      whatsappNumber: '+919876543210',
      supportEmail: 'support@findo.com',
      freeShippingThreshold: 999,
      flatShippingRate: 79,
      storeNotice: 'Thoughtfully chosen products for curious kids. Free shipping over ₹999!',
    },
  });

  console.log('✅ Store Settings initialized.');

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

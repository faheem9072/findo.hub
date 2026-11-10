export interface FallbackCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface FallbackProduct {
  id: string;
  name: string;
  slug: string;
  shortDesc: string;
  description: string;
  price: number;
  compareAtPrice: number;
  stock: number;
  sku: string;
  categoryId: string;
  category: FallbackCategory;
  purpose: string;
  images: string;
  isFeatured: boolean;
  isPublished: boolean;
  ageRange: string;
  weight?: string;
  dimensions?: string;
  material?: string;
  whatsIncluded?: string;
  safetyInfo?: string;
  rating?: number;
  reviewCount?: number;
  badges?: string;
  specs?: string;
  reviews?: any[];
  deliveryFee?: number;
  seoTitle?: string;
  seoDescription?: string;
}

export const FALLBACK_CATEGORIES: FallbackCategory[] = [
  {
    id: 'cat-habits',
    name: 'Preschool & Routine',
    slug: 'preschool-routine',
    description: 'Interactive boards and trackers that help children build daily routines and healthy habits.',
  },
  {
    id: 'cat-puzzles',
    name: 'Puzzles & Activity',
    slug: 'puzzles-activity',
    description: 'Tactile wooden puzzles and brain-teasers that develop critical thinking and spatial logic.',
  },
  {
    id: 'cat-stem',
    name: 'STEM & Educational',
    slug: 'stem-educational',
    description: 'Hands-on architectural and science kits that introduce principles of engineering.',
  },
  {
    id: 'cat-montessori',
    name: 'Montessori & Sensory',
    slug: 'montessori-sensory',
    description: 'Tactile geometric puzzles and motor skill development toys.',
  },
  {
    id: 'cat-exploration',
    name: 'Exploration & Art',
    slug: 'exploration-art',
    description: 'Instant print cameras and creative kits that ignite curiosity.',
  },
];

export const FALLBACK_PRODUCTS: FallbackProduct[] = [
  {
    id: 'fb-1',
    name: 'Findo Kids Daily Routine & Habit Tracker Board',
    slug: 'habit-tracker',
    shortDesc: 'Visual daily habit builder board with sliding completion toggles for morning & bedtime routines.',
    description:
      'Help your child build lifelong positive habits, discipline, and daily focus! The Findo Kids Habit Tracker features smooth sliding checkmark/cross toggles for daily tasks—like morning reading, calligraphy, homework, room cleanup, exercise, and bedtime reading. Equipped with weekly reward tracking, a sturdy tabletop kickstand, and refillable activity schedule cards.',
    price: 349,
    compareAtPrice: 369,
    stock: 50,
    sku: 'FND-HT-001',
    categoryId: 'cat-habits',
    category: FALLBACK_CATEGORIES[0],
    purpose: 'BUILD HABITS',
    images: JSON.stringify(['/images/habit-tracker.jpg']),
    isFeatured: true,
    isPublished: true,
    ageRange: '3-8 Years',
    weight: '320g',
    dimensions: '25cm x 18cm x 2cm',
    material: 'Durable BPA-free ABS Polymer & Reusable Schedule Cards',
    whatsIncluded: '1 Findo Habit Tracker Slider Board with Desk Stand, 10 Routine Schedule Cards, Weekly Achievement Tracker',
    safetyInfo: 'Non-toxic, smooth rounded corners, ASTM & EN71 certified safe for toddlers and children.',
    rating: 4.9,
    reviewCount: 42,
    badges: '🔥 TOP SELLING',
    specs: JSON.stringify({
      Display: 'Sliding Checkmark/Cross Buttons',
      Mounting: 'Foldable Desk Kickstand & Wall Mountable',
      Feature: 'Daily Routine + Weekly Score Tracking',
      'Included Tasks': 'Reading, Homework, Room Tidy, Exercise, Bedtime',
    }),
    reviews: [
      {
        id: 'rev-1',
        customerName: 'Pooja Nair',
        rating: 5,
        comment: 'My 5-year old daughter loves sliding the buttons every morning! Highly recommended for every parent.',
        createdAt: '2026-03-12T09:00:00Z',
      },
      {
        id: 'rev-2',
        customerName: 'Rahul Menon',
        rating: 5,
        comment: 'Great quality plastic, no sharp edges, makes brushing and homework fun.',
        createdAt: '2026-03-08T14:30:00Z',
      },
    ],
    seoTitle: 'Findo Kids Daily Routine & Habit Tracker Board | Visual Discipline Checklist',
    seoDescription: 'Empower your child with daily focus and positive routines using the Findo visual habit tracker board.',
  },
  {
    id: 'fb-2',
    name: 'Tetra Tower Stacking & Balance Game (Building Blocks)',
    slug: 'balance-tower',
    shortDesc: 'Exciting equilibrium stacking challenge with colorful geometric tetrominoes and wobble base.',
    description:
      'Test your nerve and balance with the Findo Tetra Tower! Designed for solo play or thrilling multiplayer family game nights, players draw challenge cards and take turns stacking vibrant geometric blocks atop a rocking equilibrium base. One wrong move and the tower wobbles and crashes! Teaches physics, gravity, patience, and fine motor precision.',
    price: 329,
    compareAtPrice: 385,
    stock: 40,
    sku: 'FND-BT-002',
    categoryId: 'cat-puzzles',
    category: FALLBACK_CATEGORIES[1],
    purpose: 'PLAY',
    images: JSON.stringify(['/images/tetra-tower.jpg']),
    isFeatured: true,
    isPublished: true,
    ageRange: '2-5 Years',
    weight: '380g',
    dimensions: '22cm x 15cm x 6cm',
    material: 'Drop-Resistant Non-Toxic ABS Plastic',
    whatsIncluded: '1 Rocking Wobble Base, 1 Balancing Pedestal, 32 or 48 Vibrant Geometric Tetra Blocks, 1 Challenge Card Deck',
    safetyInfo: 'Smooth rounded edges, zero phthalates, non-toxic vibrant colors.',
    rating: 5.0,
    reviewCount: 56,
    badges: 'FAMILY GAME',
    specs: JSON.stringify({
      'Game Type': 'Physics Balancing & Stacking Board Game',
      Players: '1 to 4 Players',
      Blocks: 'Vibrant Geometric Tetromino Pieces',
    }),
    reviews: [
      {
        id: 'rev-3',
        customerName: 'Ananya Sharma',
        rating: 5,
        comment: 'Super engaging! Kept the kids away from TV all weekend.',
        createdAt: '2026-03-10T11:00:00Z',
      },
    ],
    seoTitle: 'Tetra Tower Stacking & Balance Game | Findo Kids',
    seoDescription: 'Viral Tetra Tower equilibrium stacking and balance game with rocking base.',
  },
  {
    id: 'fb-3',
    name: 'Findo DIY Instant Print Kids Digital Camera',
    slug: 'kids-instant-print-digital-camera',
    shortDesc: 'Zero-ink instant thermal print camera with HD photo, 1080p video recording & built-in puzzle games.',
    description:
      'Capture childhood magic in an instant! The Findo DIY Instant Digital Camera allows young creators to take vibrant digital photos, record videos, and print instant black-and-white physical keepsake pictures in seconds using ink-free thermal printing technology. Includes fun built-in games, rechargeable battery, creative frames, and a safety neck strap.',
    price: 1499,
    compareAtPrice: 1600,
    stock: 25,
    sku: 'FND-CAM-003',
    categoryId: 'cat-exploration',
    category: FALLBACK_CATEGORIES[4],
    purpose: 'CREATE',
    images: JSON.stringify(['/images/instant-print-camera.jpg']),
    isFeatured: true,
    isPublished: true,
    ageRange: '4-10 Years',
    weight: '260g',
    dimensions: '11cm x 9cm x 4.5cm',
    material: 'Drop-Resistant Soft-Touch ABS Polymer with BPA-Free Thermal Paper',
    whatsIncluded: '1 Findo Instant Print Camera, 3 Thermal Print Paper Rolls, 1 USB-C Cable, 1 Neck Lanyard, User Manual',
    safetyInfo: 'BPA & BPS Free thermal paper. Zero ink, toner, or harmful chemicals.',
    rating: 5.0,
    reviewCount: 64,
    badges: '🔥 TOP SELLING',
    specs: JSON.stringify({
      'Printing Method': 'Zero-Ink Thermal Printing',
      Screen: '2.4 Inch IPS Eye-Protection Color Screen',
      Functions: 'Dual Camera (Front & Selfie), 1080P Video, Games',
    }),
    reviews: [
      {
        id: 'rev-4',
        customerName: 'Deepak V.',
        rating: 5,
        comment: 'Worth every rupee! Prints photos instantly without any costly ink cartridges.',
        createdAt: '2026-03-05T16:00:00Z',
      },
    ],
    seoTitle: 'Findo DIY Instant Print Kids Digital Camera | Zero-Ink Thermal Camera',
    seoDescription: 'Kids instant print camera with zero-ink thermal printing, HD photos, 1080p video.',
  },
  {
    id: 'fb-4',
    name: 'Explore STEM My Super Chemistry Lab Kit',
    slug: 'my-super-chemistry-lab',
    shortDesc: 'Exciting hands-on STEM experiments and safe chemical reactions for curious kids.',
    description:
      'Unleash your child’s inner scientist! My Super Chemistry Lab teaches the fundamentals of chemical reactions through safe, colorful, and fascinating experiments using lab apparatus and everyday materials. Includes safety goggles, test tubes with stand, measuring beakers, balloons, pipettes, and illustrated guides explaining the science behind each reaction.',
    price: 975,
    compareAtPrice: 1100,
    stock: 30,
    sku: 'FND-CH-004',
    categoryId: 'cat-stem',
    category: FALLBACK_CATEGORIES[2],
    purpose: 'LEARN',
    images: JSON.stringify(['/images/super-chemistry-lab.jpg']),
    isFeatured: true,
    isPublished: true,
    ageRange: '8+ Years',
    weight: '680g',
    dimensions: '30cm x 22cm x 6cm',
    material: 'BPA-Free Child-Safe Lab Polymers & Reagents',
    whatsIncluded: 'Test Tubes, Test Tube Rack, Safety Glasses, Beakers, Pipettes, Spatulas, Reaction Chemicals, Manual',
    safetyInfo: '100% Non-Toxic & Skin-Safe Reagents. Adult supervision recommended.',
    rating: 4.9,
    reviewCount: 31,
    badges: 'STEM CERTIFIED',
    specs: JSON.stringify({
      'Focus Area': 'Color Changing Reactions & Solutions',
      Apparatus: 'Full Chemistry Set with Rack & Beakers',
    }),
    reviews: [],
    seoTitle: 'Explore STEM My Super Chemistry Lab Kit | Findo Kids',
    seoDescription: 'Discover chemical magic with My Super Chemistry Lab. Safe hands-on science kit.',
  },
  {
    id: 'fb-5',
    name: 'Tangram Woodiness Montessori Geometric Puzzle Set',
    slug: 'tangram-wooden-puzzle-set',
    shortDesc: '7-piece natural wooden tangram puzzle with green playing mat and 30+ silhouette challenge guide.',
    description:
      'Introduce your child to the timeless ancient art of Tangram with a modern Montessori touch! Tangram Woodiness includes 7 beautifully polished, vibrant wooden polygons, a non-slip green puzzle board mat, and an illustrated challenge guide. Kids arrange triangles, squares, and parallelograms to build cats, swans, boats, trees, runners, and hundreds of imaginative silhouettes.',
    price: 319,
    compareAtPrice: 329,
    stock: 45,
    sku: 'FND-TG-005',
    categoryId: 'cat-montessori',
    category: FALLBACK_CATEGORIES[3],
    purpose: 'CREATE',
    images: JSON.stringify(['/images/tangram-woodiness.jpg']),
    isFeatured: true,
    isPublished: true,
    ageRange: '2-5 Years',
    weight: '340g',
    dimensions: '20cm x 20cm x 3cm',
    material: 'Sustainably Sourced Natural Polished Wood & Water-Based Eco Stains',
    whatsIncluded: '7 Precision Wooden Tangram Blocks, 1 Green Play Mat, 1 Challenge Booklet',
    safetyInfo: 'Splinter-free polished wood, child-safe water-based non-toxic colors.',
    rating: 4.8,
    reviewCount: 33,
    badges: 'MONTESSORI',
    specs: JSON.stringify({
      'Piece Count': '7 Precision Wooden Pieces',
      'Wood Type': 'Solid Natural Polished Beechwood',
    }),
    reviews: [],
    seoTitle: 'Tangram Woodiness Montessori Geometric Puzzle Set | Findo Kids',
    seoDescription: 'Classic 7-piece Montessori wooden tangram puzzle set with puzzle mat.',
  },
  {
    id: 'fb-6',
    name: 'Findo Kids Educational Microscope Science Kit (100X-450X)',
    slug: 'kids-educational-microscope-science-kit',
    shortDesc: 'Beginner optical lab microscope with 100X, 200X, 450X magnification, specimen slides & collection vials.',
    description:
      'Unveil the unseen microbial wonders of nature! The Findo Educational Microscope Kit features adjustable rotating lenses with 100X, 200X, and 450X magnification powers, dual lighting (LED and reflection mirror), focus adjustment wheel, glass-safe specimen slides, blank slides, and collection vials.',
    price: 949,
    compareAtPrice: 1050,
    stock: 20,
    sku: 'FND-MIC-006',
    categoryId: 'cat-stem',
    category: FALLBACK_CATEGORIES[2],
    purpose: 'EXPLORE',
    images: JSON.stringify(['/images/educational-microscope.jpg']),
    isFeatured: true,
    isPublished: true,
    ageRange: '6-12 Years',
    weight: '520g',
    dimensions: '24cm x 19cm x 9cm',
    material: 'Child-Safe Impact-Resistant ABS with Optical Lenses',
    whatsIncluded: '1 Monocular Microscope with 3 Objective Lenses, 1 Prepared Slide, 4 Blank Slides, Vials, Tweezers',
    safetyInfo: 'Rounded plastic edges, shatter-resistant acrylic slides for child safety.',
    rating: 4.9,
    reviewCount: 37,
    badges: 'OPTICAL LAB',
    specs: JSON.stringify({
      Magnification: '100X, 200X, 450X',
      Illumination: 'Built-In LED Light Source',
    }),
    reviews: [],
    seoTitle: 'Findo Kids Educational Microscope Science Kit | Findo',
    seoDescription: 'Educational microscope for kids with 100X to 450X magnification.',
  },
  {
    id: 'fb-7',
    name: 'Ekta Magna Play Magnetic Art & Puzzle Kit (300 Round Magnets)',
    slug: 'ekta-magna-play-magnetic-art-puzzle',
    shortDesc: '300 vibrant colorful round magnets with magnetic canvas boards to create 400+ creative pictures & mosaics.',
    description:
      'Unleash endless artistic imagination with Magna Play by Ekta! Featuring 300 colorful round button magnets and multiple smooth magnetic display canvas tiles, children can design over 400+ delightful mosaic pictures—from animals, trains, and houses to geometric shapes and portraits.',
    price: 549,
    compareAtPrice: 799,
    stock: 35,
    sku: 'FND-MP-007',
    categoryId: 'cat-puzzles',
    category: FALLBACK_CATEGORIES[1],
    purpose: 'CREATE',
    images: JSON.stringify(['/images/magna-play-magnets.jpg']),
    isFeatured: true,
    isPublished: true,
    ageRange: '4-8 Years',
    weight: '520g',
    dimensions: '28cm x 22cm x 5cm',
    material: 'Child-Safe Encapsulated Button Magnets & Coated Iron Canvas Plates',
    whatsIncluded: '300 Colorful Round Button Magnets, Multiple Magnetic Display Canvases, Idea Puzzle Pattern Book',
    safetyInfo: 'Encapsulated magnets that cannot dislodge or expose magnetic cores.',
    rating: 4.9,
    reviewCount: 47,
    badges: '300 MAGNETS',
    specs: JSON.stringify({
      'Magnet Count': '300 Vibrant Round Button Magnets',
      Canvases: 'Multiple Magnetic Black Canvas Boards',
    }),
    reviews: [],
    seoTitle: 'Ekta Magna Play Magnetic Art & Puzzle Kit | Findo Kids',
    seoDescription: '300 colorful round magnetic pieces with pattern booklet for 400+ creative designs.',
  },
  {
    id: 'fb-8',
    name: 'DIY My Working Solar System Planetarium Model Kit',
    slug: 'diy-working-solar-system-model',
    shortDesc: 'Hands-on motorized orbital solar system model with paint set to build, color & explore space.',
    description:
      'Bring the wonders of the cosmos to your tabletop! The DIY My Working Solar System kit lets curious kids assemble and paint all 8 planets and the central Sun on revolving orbital arms. Includes 6 vibrant paint colors, paintbrush, planet spheres with authentic ring details, and an illustrated astronomy guide.',
    price: 490,
    compareAtPrice: 699,
    stock: 30,
    sku: 'FND-SS-008',
    categoryId: 'cat-stem',
    category: FALLBACK_CATEGORIES[2],
    purpose: 'EXPLORE',
    images: JSON.stringify(['/images/solar-system-diy.jpg']),
    isFeatured: true,
    isPublished: true,
    ageRange: '6-12 Years',
    weight: '480g',
    dimensions: '30cm x 22cm x 6cm',
    material: 'Non-Toxic Precision Engineered ABS & Washable Acrylic Paints',
    whatsIncluded: 'Solar System Planet Spheres & Sun, Central Pedestal Base with Rotating Arms, 6 Paint Pots, Brush',
    safetyInfo: 'Non-toxic water-based paints. ASTM & EN71 certified child safety.',
    rating: 4.8,
    reviewCount: 39,
    badges: 'SPACE SCIENCE',
    specs: JSON.stringify({
      Planets: 'Sun, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune',
      Rotation: 'Manual 360-degree Rotating Orbital Arms',
    }),
    reviews: [],
    seoTitle: 'DIY My Working Solar System Model Kit | Findo Kids',
    seoDescription: 'Assemble, paint and learn with the DIY Working Solar System model kit.',
  },
  {
    id: 'fb-9',
    name: 'Han Bo DIY STEM Creative Puzzle Box with Electric Drill (232 Pcs)',
    slug: 'creative-puzzle-box',
    shortDesc: '232-piece engineering toolbox with real battery-powered electric drill, screws & pegboard.',
    description:
      'Empower little builders with the Han Bo DIY STEM Creative Puzzle Box! Packed with 232 colorful building pieces, an electric toy drill with reversible rotation, manual screwdriver, spanner, nuts, bolts, and geometric plates.',
    price: 999,
    compareAtPrice: 1499,
    stock: 25,
    sku: 'FND-PB-009',
    categoryId: 'cat-stem',
    category: FALLBACK_CATEGORIES[2],
    purpose: 'CREATE',
    images: JSON.stringify(['/images/creative-puzzle-box.jpg', '/images/creative-puzzle-box-2.jpg']),
    isFeatured: true,
    isPublished: true,
    ageRange: '3-8 Years',
    weight: '750g',
    dimensions: '30cm x 24cm x 7cm',
    material: 'High-Impact BPA-Free Child-Safe ABS Polymer',
    whatsIncluded: '232 Pieces: Pegboard Suitcase, Electric Drill, Screwdriver, Wrench, Geometric Peg Plates, Screws, Nuts, Guidebook',
    safetyInfo: 'Smooth rounded edges, safe low-speed torque drill designed for small hands.',
    rating: 4.9,
    reviewCount: 35,
    badges: 'REAL DRILL',
    specs: JSON.stringify({
      'Piece Count': '232 Interlocking Components',
      'Power Tool': 'Dual-Direction Electric Screw Gun',
    }),
    reviews: [],
    seoTitle: 'Han Bo DIY STEM Creative Puzzle Box | Findo Kids',
    seoDescription: '232-piece kids DIY puzzle toolbox with reversible electric toy drill.',
  },
  {
    id: 'fb-10',
    name: "Ratna's Match & Learn Mathematic Puzzle Kit",
    slug: 'match-and-learn-mathematic-puzzle',
    shortDesc: '48-piece interactive self-correcting math puzzle for early number sense, counting & basic arithmetic.',
    description:
      "Make learning basic math a fun, hands-on game! Ratna's Match & Learn Mathematic is an educational first learners puzzle featuring 48 thick, colorful puzzle pieces. Children match quantities of everyday objects with numerals and equations.",
    price: 499,
    compareAtPrice: 699,
    stock: 40,
    sku: 'FND-ML-010',
    categoryId: 'cat-puzzles',
    category: FALLBACK_CATEGORIES[1],
    purpose: 'LEARN',
    images: JSON.stringify(['/images/math-puzzle-kit.jpg']),
    isFeatured: false,
    isPublished: true,
    ageRange: '3-7 Years',
    weight: '420g',
    dimensions: '28cm x 20cm x 4cm',
    material: 'Sturdy Non-Toxic Laminated Hardboard',
    whatsIncluded: '48 Self-Correcting Math Puzzle Pieces, Free Digital Learning QR Code, Instruction Guide',
    safetyInfo: 'Child-safe vegetable-based inks, smooth edges, BIS certified.',
    rating: 4.8,
    reviewCount: 28,
    badges: 'EARLY MATH',
    specs: JSON.stringify({
      'Piece Count': '48 Jigsaw Puzzle Pieces',
      Concepts: 'Number Recognition, Object Counting, Addition & Subtraction',
    }),
    reviews: [],
    seoTitle: "Ratna's Match & Learn Mathematic Puzzle | Findo Kids",
    seoDescription: '48-piece first learners math puzzle kit for kids ages 3+.',
  },
  {
    id: 'fb-11',
    name: 'Play Craft 3-in-1 Science Lab Experiment Kit (155+ Experiments)',
    slug: '3-in-1-science-lab-kit',
    shortDesc: 'Comprehensive STEM laboratory with 155+ experiments across Physics, Chemistry & Biology.',
    description:
      'Turn your home into an exciting discovery lab! The Play Craft 3-in-1 Science Lab features over 155 thrilling hands-on experiments covering physics principles, chemical reactions, and biological wonders.',
    price: 1299,
    compareAtPrice: 1699,
    stock: 20,
    sku: 'FND-SL-011',
    categoryId: 'cat-stem',
    category: FALLBACK_CATEGORIES[2],
    purpose: 'EXPLORE',
    images: JSON.stringify(['/images/science-lab-3in1.jpg']),
    isFeatured: true,
    isPublished: true,
    ageRange: '8+ Years',
    weight: '850g',
    dimensions: '34cm x 26cm x 7cm',
    material: 'High-Grade Laboratory Safe Plastic & Certified Ingredients',
    whatsIncluded: '40+ Lab Tools & Ingredients, Test Tubes, Stand, Safety Goggles, Beakers, Pipettes, Manual',
    safetyInfo: 'Non-hazardous, child-friendly chemical reagents.',
    rating: 5.0,
    reviewCount: 36,
    badges: '155+ EXPERIMENTS',
    specs: JSON.stringify({
      'Experiment Count': '155+ Documented Experiments',
      Subjects: 'Physics, Chemistry, Biology',
    }),
    reviews: [],
    seoTitle: 'Play Craft 3-in-1 Science Lab Kit | Findo Kids',
    seoDescription: 'Over 155+ exciting science experiments in Physics, Chemistry, and Biology.',
  },
  {
    id: 'fb-12',
    name: 'Anmol "So, Fashion You!" Portable Vanity Beauty Suitcase',
    slug: 'anmol-fashion-vanity-beauty-suitcase',
    shortDesc: '2-in-1 portable wheeled vanity bus suitcase that opens into a glamorous pretend-play beauty table.',
    description:
      'Inspire imaginative role-play with Anmol’s "So, Fashion You!" vanity playset! Shaped like an adorable pink rolling bus suitcase with handle, it pops open into a complete beauty salon dressing table with a heart-shaped mirror, toy hair dryer, play lipsticks, perfume bottle, and jewelry.',
    price: 749,
    compareAtPrice: 999,
    stock: 30,
    sku: 'FND-VAN-012',
    categoryId: 'cat-exploration',
    category: FALLBACK_CATEGORIES[4],
    purpose: 'PLAY',
    images: JSON.stringify(['/images/fashion-vanity-suitcase.jpg']),
    isFeatured: true,
    isPublished: true,
    ageRange: '3-7 Years',
    weight: '650g',
    dimensions: '28cm x 22cm x 11cm',
    material: '100% Non-Toxic Durable BPA-Free Plastic',
    whatsIncluded: 'Rolling Bus Suitcase, Vanity Table, Mirror, Hair Dryer, Play Cosmetics, Comb, Jewelry, Stickers',
    safetyInfo: 'Non-toxic smooth plastic with zero sharp edges. Pretend cosmetics contain zero real chemicals.',
    rating: 4.8,
    reviewCount: 44,
    badges: '2-IN-1 SUITCASE',
    specs: JSON.stringify({
      Mobility: 'Rolling Wheels & Carry Handle',
      Pieces: '15+ Salon Grooming & Jewelry Accessories',
    }),
    reviews: [],
    seoTitle: 'Anmol "So, Fashion You!" Vanity Beauty Bus Suitcase | Findo',
    seoDescription: 'Kids portable 2-in-1 vanity beauty dressing table suitcase.',
  },
];

export function getFallbackProductBySlug(slugOrId: string): FallbackProduct | null {
  const clean = slugOrId.trim().toLowerCase();
  return (
    FALLBACK_PRODUCTS.find((p) => p.slug.toLowerCase() === clean || p.id.toLowerCase() === clean) ||
    null
  );
}

export function getFallbackProductsByCategory(categorySlug: string): FallbackProduct[] {
  const clean = categorySlug.trim().toLowerCase();
  return FALLBACK_PRODUCTS.filter((p) => p.category.slug.toLowerCase() === clean);
}

export function searchFallbackProducts(query: string): FallbackProduct[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return FALLBACK_PRODUCTS;
  return FALLBACK_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(clean) ||
      p.shortDesc.toLowerCase().includes(clean) ||
      p.description.toLowerCase().includes(clean) ||
      (p.purpose && p.purpose.toLowerCase().includes(clean)) ||
      (p.badges && p.badges.toLowerCase().includes(clean))
  );
}


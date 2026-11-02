const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = [
  // 1-3 Years (Toddlers & Sensory)
  { slug: 'educational-shape-sorter', ageRange: '1-3 Years', purpose: 'LEARN', categorySlug: 'puzzles-logic' },
  
  // 3-6 Years (Preschoolers)
  { slug: 'learning-frame-sr', ageRange: '3-6 Years', purpose: 'LEARN', categorySlug: 'puzzles-logic' },
  { slug: 'little-master-board', ageRange: '3-6 Years', purpose: 'CREATE', categorySlug: 'exploration-art' },
  { slug: 'alpha-magnetic-board', ageRange: '3-6 Years', purpose: 'LEARN', categorySlug: 'puzzles-logic' },
  { slug: 'mini-map-pad', ageRange: '3-6 Years', purpose: 'EXPLORE', categorySlug: 'exploration-art' },
  { slug: 'tangram-wooden-puzzle-set', ageRange: '3-6 Years', purpose: 'CREATE', categorySlug: 'puzzles-logic' },
  { slug: 'balance-tower', ageRange: '3-6 Years', purpose: 'PLAY', categorySlug: 'puzzles-logic' },
  
  // 3-8 Years (Early Learners & Construction)
  { slug: 'creative-puzzle-box', ageRange: '3-8 Years', purpose: 'CREATE', categorySlug: 'stem-construction' },
  { slug: '36-pcs-magnetic-sticks-building-set', ageRange: '3-8 Years', purpose: 'CREATE', categorySlug: 'stem-construction' },
  { slug: 'habit-tracker', ageRange: '3-8 Years', purpose: 'BUILD HABITS', categorySlug: 'habits-routines' },
  
  // 4-8 Years & 4-10 Years
  { slug: 'hopscotch', ageRange: '4-8 Years', purpose: 'PLAY', categorySlug: 'exploration-art' },
  { slug: 'spell-a-word-interactive-word-building-kit-for-kids', ageRange: '4-8 Years', purpose: 'LEARN', categorySlug: 'puzzles-logic' },
  { slug: 'ekta-magna-play-magnetic-art-puzzle', ageRange: '4-8 Years', purpose: 'CREATE', categorySlug: 'puzzles-logic' },
  { slug: 'smart-savings-money-box', ageRange: '4-10 Years', purpose: 'BUILD HABITS', categorySlug: 'habits-routines' },
  { slug: 'kids-instant-print-digital-camera', ageRange: '4-10 Years', purpose: 'CREATE', categorySlug: 'exploration-art' },
  
  // 5-10 Years
  { slug: 'graphic-designer', ageRange: '5-10 Years', purpose: 'CREATE', categorySlug: 'exploration-art' },
  { slug: 'amusement-park-jumbo-build-create-enjoy', ageRange: '5-10 Years', purpose: 'CREATE', categorySlug: 'stem-construction' },
  
  // 6-12 Years (Middle Explorers & STEM)
  { slug: 'magic-box-52-amazing-tips', ageRange: '6-12 Years', purpose: 'PLAY', categorySlug: 'exploration-art' },
  { slug: 'make-your-own-glow-in-the-dark-smile', ageRange: '6-12 Years', purpose: 'CREATE', categorySlug: 'exploration-art' },
  { slug: 'my-candy-making-lab', ageRange: '6-12 Years', purpose: 'LEARN', categorySlug: 'stem-construction' },
  { slug: 'diy-working-solar-system-model', ageRange: '6-12 Years', purpose: 'EXPLORE', categorySlug: 'stem-construction' },
  { slug: 'kids-educational-microscope-science-kit', ageRange: '6-12 Years', purpose: 'EXPLORE', categorySlug: 'stem-construction' },
  
  // 7-14 Years
  { slug: 'mec-o-tec-set-2', ageRange: '7-14 Years', purpose: 'CREATE', categorySlug: 'stem-construction' },
  { slug: 'premium-crossword-think-concentrate-explore-play', ageRange: '7+ Years', purpose: 'LEARN', categorySlug: 'puzzles-logic' },
  { slug: 'decode-the-top-secret-word-game', ageRange: '7+ Years', purpose: 'PLAY', categorySlug: 'puzzles-logic' },
  
  // 8+ Years (Pre-Teens Science & Robotics)
  { slug: '6-in-1-solar-kit-educational-robotic', ageRange: '8+ Years', purpose: 'LEARN', categorySlug: 'stem-construction' },
  { slug: '7-in-1-educational-reachargable-solar-energy-kit', ageRange: '8+ Years', purpose: 'LEARN', categorySlug: 'stem-construction' },
  { slug: 'perfume-making-kit', ageRange: '8+ Years', purpose: 'LEARN', categorySlug: 'stem-construction' },
  { slug: 'my-crystal-making-lab', ageRange: '8+ Years', purpose: 'LEARN', categorySlug: 'stem-construction' },
  { slug: 'lip-balm-making-kit', ageRange: '8+ Years', purpose: 'LEARN', categorySlug: 'stem-construction' },
  { slug: 'my-super-chemistry-lab', ageRange: '8+ Years', purpose: 'LEARN', categorySlug: 'stem-construction' },
  { slug: '3-in-1-science-lab-kit', ageRange: '8+ Years', purpose: 'EXPLORE', categorySlug: 'stem-construction' }
];

async function run() {
  const categories = await prisma.category.findMany();
  const catMap = Object.fromEntries(categories.map(c => [c.slug, c.id]));
  
  let count = 0;
  for (const item of updates) {
    const data = {
      ageRange: item.ageRange,
      purpose: item.purpose
    };
    if (item.categorySlug && catMap[item.categorySlug]) {
      data.categoryId = catMap[item.categorySlug];
    }
    
    try {
      const res = await prisma.product.updateMany({
        where: { slug: item.slug },
        data
      });
      if (res.count > 0) {
        count += res.count;
        console.log(`Updated [${res.count}]: ${item.slug} -> ${item.ageRange} (${data.purpose}, ${item.categorySlug || 'same'})`);
      } else {
        console.warn(`Not found: ${item.slug}`);
      }
    } catch(e) {
      console.error(`Error updating ${item.slug}:`, e.message);
    }
  }
  console.log(`\n🎉 Total products successfully updated: ${count}`);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

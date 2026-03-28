const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning up existing products...');
  await prisma.orderItem.deleteMany();
  await prisma.product.deleteMany();

  const products = [
    {
      name: 'Memory Photo Box',
      price: 1499,
      featured: true,
      category: 'Keepsakes',
      description: 'A handcrafted wooden box featuring your favorite memories. Perfect for storing letters, photos, and small trinkets.',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800&q=80'
    },
    {
      name: 'Handwritten Love Letter',
      price: 799,
      featured: true,
      category: 'Letters',
      description: 'Sincere words on premium vintage paper, sealed with wax. A classic way to express your deepest emotions.',
      image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&q=80'
    },
    {
      name: 'Photo Collage Frame',
      price: 1999,
      featured: true,
      category: 'Frames',
      description: 'Your best moments gathered in one elegant frame. A beautiful addition to any room.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80'
    },
    {
      name: 'Surprise Gift Hamper',
      price: 2499,
      featured: true,
      category: 'Hampers',
      description: 'A curated collection of delightful surprises, including chocolates, a custom mug, and a small plush.',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80'
    },
    {
      name: 'Engraved Keepsake Box',
      price: 1799,
      featured: true,
      category: 'Keepsakes',
      description: 'Timeless storage for small treasures with a custom engraving of your choice.',
      image: 'https://images.unsplash.com/photo-1512909006721-3d6018887183?w=800&q=80'
    },
    {
      name: 'Custom Scrapbook',
      price: 2299,
      featured: true,
      category: 'Books',
      description: 'A handcrafted book designed to tell your unique story. Every page is a journey through your best times.',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80'
    },
    {
      name: 'Personalized Star Map',
      price: 1299,
      featured: true,
      category: 'Decor',
      description: 'The exact alignment of the stars as they were on your special night. A truly celestial gift.',
      image: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&q=80'
    },
    {
      name: 'Luxury Fragrance Set',
      price: 3499,
      featured: false,
      category: 'Luxury',
      description: 'A set of premium scents curated for an unforgettable sensory experience.',
      image: 'https://images.unsplash.com/photo-1547881338-6cfefe334208?w=800&q=80'
    },
    {
      name: 'Vintage Pocket Watch',
      price: 1899,
      featured: false,
      category: 'Classic',
      description: 'A classic timepiece with an antique finish, perfect for those who appreciate old-world charm.',
      image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ad5?w=800&q=80'
    },
    {
      name: 'Hand-Painted Portrait',
      price: 4999,
      featured: true,
      category: 'Art',
      description: 'A custom portrait hand-painted by our artists from your favorite photograph.',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80'
    },
    {
      name: 'Eternal Rose in Glass',
      price: 2799,
      featured: true,
      category: 'Decor',
      description: 'A real rose that lasts forever, encased in a beautiful glass dome with delicate LED lights.',
      image: 'https://images.unsplash.com/photo-1533633031006-2580a8277be5?w=800&q=80'
    },
    {
      name: 'Custom Couple Hoodies',
      price: 1599,
      featured: false,
      category: 'Apparel',
      description: 'Matching hoodies for couples, personalized with your anniversary date or initials.',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80'
    },
    {
      name: 'Gourmet Chocolate Box',
      price: 1249,
      featured: false,
      category: 'Food',
      description: 'A selection of artisanal chocolates handcrafted by master chocolatiers.',
      image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=80'
    },
    {
      name: 'Silver Projection Necklace',
      price: 899,
      featured: true,
      category: 'Jewelry',
      description: 'A necklace that projects "I Love You" in 100 languages when light shines through it.',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80'
    },
    {
      name: 'Personalized Music Plaque',
      price: 699,
      featured: false,
      category: 'Decor',
      description: 'An acrylic plaque featuring your favorite song and a personal photograph. Scannable Spotify code included.',
      image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80'
    }
  ];

  console.log(`Seeding ${products.length} products...`);
  
  for (const productData of products) {
    await prisma.product.create({
      data: productData
    });
  }

  console.log('Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

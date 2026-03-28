import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const products = [
        { name: 'Memory Photo Box', price: 1499, featured: true, description: 'A beautiful box for your memories' },
        { name: 'Handwritten Love Letter', price: 799, featured: true, description: 'Sincere words on premium paper' },
        { name: 'Photo Collage Frame', price: 1999, featured: true, description: 'Your best moments in one frame' },
        { name: 'Surprise Gift Hamper', price: 2499, featured: true, description: 'A collection of delightful surprises' },
        { name: 'Engraved Keepsake Box', price: 1799, featured: true, description: 'Timeless storage for small treasures' },
        { name: 'Custom Scrapbook', price: 1299, featured: true, description: 'Handcrafted book for your stories' },
        { name: 'Personalized Star Map', price: 999, featured: true, description: 'The stars as they were on your special night' },
        { name: 'Luxury Gift Box', price: 2999, featured: true, description: 'Premium selection for ultimate gifting' },
    ];
    console.log('Seeding products...');
    for (const p of products) {
        await prisma.product.create({
            data: p
        });
    }
    console.log('Seeding finished.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map
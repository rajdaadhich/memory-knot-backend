import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  try {
    const products = await prisma.product.findMany()
    console.log('Products:', products)
  } catch (e) {
    console.error('Prisma Error:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()

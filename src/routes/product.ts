import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(products);
  } catch (error) {
    console.error("API Error [GET /]:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get featured products
router.get("/featured", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { featured: true },
    });
    res.json(products);
  } catch (error) {
    console.error("API Error [GET /featured]:", error);
    res.status(500).json({ error: "Failed to fetch featured products" });
  }
});

export default router;

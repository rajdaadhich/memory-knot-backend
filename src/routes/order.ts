import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// Create an order
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, address, totalAmount, items } = req.body;

    if (!name || !phone || !address || !items || items.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const order = await prisma.order.create({
      data: {
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        address,
        totalAmount,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Export the router
export default router;

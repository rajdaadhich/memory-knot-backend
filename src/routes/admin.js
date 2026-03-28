import { Router } from "express";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
// Middleware to verify admin token
const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        return res.status(401).json({ error: "Unauthorized" });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};
// Simple admin login (hardcoded simple password check for demonstration)
router.post("/login", (req, res) => {
    const { password } = req.body;
    if (password === JWT_SECRET) {
        const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1d" });
        res.json({ token });
    }
    else {
        res.status(401).json({ error: "Invalid password" });
    }
});
// Admin product endpoints
router.post("/products", verifyAdmin, async (req, res) => {
    try {
        const product = await prisma.product.create({ data: req.body });
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create product" });
    }
});
router.put("/products/:id", verifyAdmin, async (req, res) => {
    try {
        const product = await prisma.product.update({
            where: { id: req.params.id },
            data: req.body,
        });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update product" });
    }
});
router.delete("/products/:id", verifyAdmin, async (req, res) => {
    try {
        await prisma.product.delete({ where: { id: req.params.id } });
        res.json({ message: "Product deleted" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete product" });
    }
});
// Get all orders
router.get("/orders", verifyAdmin, async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: { items: { include: { product: true } } },
            orderBy: { createdAt: "desc" },
        });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});
// Get all missing contacts
router.get("/contacts", verifyAdmin, async (req, res) => {
    try {
        const contacts = await prisma.contactMessage.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(contacts);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch contact messages" });
    }
});
export default router;
//# sourceMappingURL=admin.js.map
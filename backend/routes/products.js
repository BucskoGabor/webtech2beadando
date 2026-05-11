const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Get all products
router.get('/', auth, async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new product
router.post('/', auth, async (req, res) => {
    try {
        const { name, price, category, description, stock } = req.body;

        // Validation
        if (!name || !price || !category) {
            return res.status(400).json({ message: 'Name, price and category are required' });
        }

        if (isNaN(price) || price < 0) {
            return res.status(400).json({ message: 'Price must be a positive number' });
        }

        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({ message: 'Product already exists' });
        }

        const product = new Product({ name, price, category, description, stock });
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update product
router.put('/:id', auth, async (req, res) => {
    try {
        const { name, price, category, description, stock } = req.body;

        // Validation
        if (price !== undefined && (isNaN(price) || price < 0)) {
            return res.status(400).json({ message: 'Price must be a positive number' });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, category, description, stock },
            { new: true, runValidators: true }
        );

        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete product
router.delete('/:id', auth, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

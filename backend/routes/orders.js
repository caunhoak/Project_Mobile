const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new order
router.post('/', async (req, res) => {
    const { user, restaurant, items, totalPrice, status } = req.body;
    const order = new Order({
        user,
        restaurant,
        items,
        totalPrice,
        status
    });
    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

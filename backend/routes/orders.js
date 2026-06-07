const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');

// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// POST /api/orders - Place order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const order = new Order({
      user: req.user.userId,
      ...req.body
    });
    await order.save();
    res.status(201).json({ success: true, message: 'Order placed!', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
});

// GET /api/orders/my - Get my orders
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
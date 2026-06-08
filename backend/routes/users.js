const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');

const adminMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// GET /api/users/all
router.get('/all', adminMiddleware, async (req, res) => {
  try {
    const users = await User.find({ role: 'user' })
      .select('-password')
      .sort({ createdAt: -1 });

    const usersWithStats = await Promise.all(users.map(async (user) => {
      const orderCount = await Order.countDocuments({ user: user._id });
      const totalSpent = await Order.aggregate([
        { $match: { user: user._id } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]);
      return {
        ...user.toObject(),
        orderCount,
        totalSpent: totalSpent[0]?.total || 0
      };
    }));

    res.json({ success: true, users: usersWithStats });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/users/:id/orders — NEW 👇
router.get('/:id/orders', adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    const orders = await Order.find({ user: req.params.id }).sort({ createdAt: -1 });
    res.json({ success: true, user, orders });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
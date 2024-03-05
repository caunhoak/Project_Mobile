const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new user
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a user
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.username != null) {
        res.user.username = req.body.username;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.phone != null) {
        res.user.phone = req.body.phone;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// // Delete a user
router.delete('/', async (req, res) => {
    try {
        const userIdToDelete = req.body.userId; // Lấy ID của người dùng cần xóa từ body
        if (!userIdToDelete) {
            return res.status(400).json({ message: 'Missing userId' });
        }

        const userToDelete = await User.findByIdAndDelete(userIdToDelete); // Tìm và xóa người dùng
        if (!userToDelete) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getUser(req, res, next) {
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
}

module.exports = router;

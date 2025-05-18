const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Get a single user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { name,address,mobileno,gender,email,password } = req.body;
    const user = new User({
      name,
      address,
      mobileno,
      gender,
      email,
      password
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user' });
  }
});

// Update an user
router.put('/:id', async (req, res) => {
  try {
    const { name,address,mobileno,gender,email,password } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name,address,mobileno,gender,email,password },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user' });
  }
});

// Update an user
router.patch('/:id', async (req, res) => {
  try {
    const {name,address,mobileno,gender,email,password} = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name,address,mobileno,gender,email,password },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user' });
  }
});

// Delete an user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'user deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router; 
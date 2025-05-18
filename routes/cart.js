const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// Get all items
router.get('/', async (req, res) => {
  try {
    const cart = await Cart.find();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
});

// Get a single item
router.get('/:id', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
});

// Create a new item
router.post('/', async (req, res) => {
  try {
    const { foodname, description, price, category } = req.body;
    const cart = new Cart({
      foodname,
      description,
      price,
      category
    });
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ message: 'Error creating cart' });
  }
});

// Update an item
router.put('/:id', async (req, res) => {
  try {
    const { foodname, description, price, category } = req.body;
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { foodname, description, price, category },
      { new: true }
    );
    if (!cart) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: 'Error updating cart' });
  }
});

// Update an item
router.patch('/:id', async (req, res) => {
  try {
    const { foodname, description, price, category } = req.body;
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { foodname, description, price, category },
      { new: true }
    );
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: 'Error updating cart' });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cart' });
  }
});

module.exports = router; 

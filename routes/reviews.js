const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Get all items
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching review' });
  }
});

// Get a single review
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching review' });
  }
});

// Create a new review
router.post('/', async (req, res) => {
  try {
    const { user,product,rating,emoji,description } = req.body;
    const review = new Review({
      user,
      product,
      rating,
      emoji,
      description,
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: 'Error creating review' });
  }
});

// Update an review
router.put('/:id', async (req, res) => {
  try {
    const { user,product,rating,emoji,description } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { user,product,rating,emoji,description },
      { new: true }
    );
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: 'Error updating review' });
  }
});

// Update an review
router.patch('/:id', async (req, res) => {
  try {
    const { user,product,rating,emoji,description } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { user,product,rating,emoji,description },
      { new: true }
    );
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: 'Error updating review' });
  }
});

// Delete an review
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'review not found' });
    }
    res.json({ message: 'review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review' });
  }
});

module.exports = router; 